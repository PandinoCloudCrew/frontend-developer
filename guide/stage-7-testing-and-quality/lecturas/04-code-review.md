# Prácticas de Code Review

> Cómo hacer y recibir code reviews efectivos. Cubre qué buscar, tamaño de PRs, dar y recibir feedback, y checklists por tipo de PR.

---

## Por Qué Esto Importa

El code review es la actividad de mayor impacto en un equipo. Una revisión de 30 minutos puede prevenir un bug que costaría un día en depurar, compartir conocimiento que previene tres errores futuros y mejorar un diseño que causaría dolor durante meses.

El code review no es gatekeeping. Sus propósitos:

1. **Detectar bugs** antes de que lleguen a los usuarios.
2. **Compartir conocimiento** en todo el equipo (sin puntos únicos de fallo).
3. **Hacer cumplir estándares** para que el codebase se mantenga consistente.
4. **Mejorar el diseño** a través del pensamiento colaborativo.

---

## Qué Buscar

Revisa en este orden de prioridad. No dediques 20 minutos debatiendo nombres de variables mientras pasas por alto un agujero de seguridad.

### 1. Correctitud

¿El código realmente hace lo que dice hacer?

- ¿Maneja casos extremos? ¿Qué sucede con entrada vacía, valores nulos, arrays de longitud cero?
- ¿Qué sucede cuando la petición de red falla? ¿Cuando el usuario hace doble clic?
- ¿Hay errores de off-by-one, condiciones de carrera o llamadas `await` faltantes?
- ¿Funciona el happy path Y los unhappy paths degradan de forma elegante?

### 2. Seguridad

- ¿Se sanitiza la entrada del usuario antes de renderizar? (`dangerouslySetInnerHTML`, `v-html`, `[innerHTML]`)
- ¿Están los controles de autenticación y autorización en su lugar? ¿Pueden los usuarios acceder a recursos a los que no deberían?
- ¿Hay API keys, tokens o secrets expuestos en código del lado del cliente?
- ¿Están los tokens CSRF presentes en las peticiones que cambian estado?
- ¿Se están registrando o almacenando de forma insegura datos sensibles (contraseñas, tokens)?

### 3. Diseño

- ¿Son correctos los límites de los componentes? ¿Este componente está intentando hacer tres cosas?
- ¿Está el estado en el lugar correcto? ¿Se está elevando estado local a global sin razón?
- ¿Esto introduce acoplamiento fuerte entre features que deberían ser independientes?
- ¿Es la API pública (props, funciones, exports) mínima y clara?
- ¿Este patrón escalará, o causará dolor a 10x del uso actual?

### 4. Rendimiento

- ¿Hay re-renders innecesarios? ¿Se está recreando un objeto o array en cada render?
- ¿Falta `useMemo` o `useCallback` donde prevendría recálculos costosos?
- ¿Este PR agrega una dependencia grande? ¿Cuál es el impacto en el tamaño del bundle?
- ¿Hay un cuello de botella de renderizado (listas largas sin virtualización, cómputo pesado síncrono)?

### 5. Accesibilidad

- ¿Es el HTML semántico? ¿Botones para acciones, links para navegación, headings en orden?
- ¿Se puede usar la feature solo con teclado? ¿Orden de Tab, activación con Enter/Space, Escape para cerrar?
- ¿Son correctos los atributos ARIA? ¿`aria-label` donde no hay texto visible, `aria-expanded` para colapsables?
- ¿Las imágenes tienen texto `alt` significativo?

### 6. Legibilidad

- ¿Los nombres son claros y descriptivos? ¿Puedes entender `processUserData` sin leer la implementación?
- ¿Es razonable la complejidad? Una función de 200 líneas probablemente debería dividirse.
- ¿Los comentarios explican el *por qué*, no el *qué*? (El código dice qué. Los comentarios deberían decir por qué.)
- ¿Es el código consistente con el resto del codebase?

### 7. Tests

- ¿Hay tests? ¿Testean comportamiento significativo, no solo coverage?
- ¿Los tests cubren las rutas importantes --- happy path, estados de error, casos extremos?
- ¿Son legibles los tests? ¿Puedes entender qué se está testeando solo por el nombre del test?
- Para correcciones de bugs: ¿hay un regression test que fallaría si el bug reapareciera?

---

## Qué NO Revisar

No desperdicies tiempo de revisión en cosas que linters y formateadores deberían manejar:

- Formateo (largo de línea, indentación, comas finales)
- Orden de imports
- Punto y coma vs sin punto y coma
- Comillas simples vs comillas dobles

Si tu equipo debate estas cosas en PRs, no tienes un problema de estilo de código --- tienes un problema de configuración de herramientas. Configura ESLint/Biome y Prettier, ejecútalos en CI, y nunca más discutas formateo en una revisión.

---

## Tamaño de PR

**Apunta a menos de 400 líneas de cambios reales** (excluyendo archivos generados, lockfiles y fixtures de test).

Por qué importan los PRs pequeños:

- Un PR de 200 líneas recibe una revisión exhaustiva en 20 minutos.
- Un PR de 2000 líneas recibe una lectura superficial en 40 minutos. Los bugs se esconden a plena vista.
- Las investigaciones muestran consistentemente que la calidad de la revisión se degrada bruscamente más allá de 400 líneas.

Para features grandes, usa **stacked PRs**:

```
PR 1: Add API types and data fetching hook (120 lines)
PR 2: Build UserProfile component with loading/error states (180 lines)
PR 3: Add UserProfile page with routing and integration (150 lines)
PR 4: Add tests for UserProfile flow (200 lines)
```

Cada PR es revisable, desplegable y se revierte limpiamente.

---

## Dar Feedback

### Sé Específico

```
# Bad — vague concern
"This might have performance issues."

# Good — specific problem with specific solution
"This re-renders the entire list on every keystroke because `items` is
recreated each render. Consider `useMemo` with `[rawItems, filter]` as
dependencies, or move the filtering into the `useItems` hook."
```

### Usa "Nosotros" en Vez de "Tú"

```
# Confrontational
"You forgot error handling here."

# Collaborative
"We should add error handling here — if the API returns 500, the
component will render `undefined` as the user's name."
```

### Distingue Blocking vs Non-Blocking

```
# Non-blocking suggestion — can be addressed later
nit: Rename `data` to `users` for clarity.

# Non-blocking suggestion with reasoning
suggestion: Consider extracting this into a `useUserPermissions` hook.
It would make the component easier to test and the logic reusable.

# Required change — must be fixed before merge
blocking: This renders user-provided HTML without sanitization.
Use DOMPurify.sanitize() or use textContent instead of innerHTML.
```

### Ofrece Alternativas

```
# Bad — criticism without direction
"This is hard to follow."

# Good — alternative with reasoning
"Instead of nested ternaries, consider early returns:

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  if (users.length === 0) return <EmptyState />;
  return <UserList users={users} />;

Each state is handled explicitly and the render logic reads top-to-bottom."
```

### Aprueba con Comentarios Menores

No todo comentario necesita bloquear el PR. Cuando el código es sólido pero tiene mejoras menores:

```
"LGTM — ship it. One nit: rename `handleClick` to `handleAddToCart`
for clarity, but not blocking."
```

---

## Recibir Feedback

- **No lo tomes personal.** Se está revisando el código, no a ti. Un comentario que dice "esto tiene un bug" no está diciendo "eres un mal desarrollador."
- **Haz preguntas aclaratorias.** Si el feedback no es claro, pregunta: "¿Puedes dar un ejemplo de cómo esto fallaría?" o "¿Qué escenario te preocupa?"
- **Responde con razonamiento.** Si no estás de acuerdo, explica por qué: "Consideré `useMemo` aquí pero lo medí --- la lista nunca tiene más de 20 elementos y el filtro se ejecuta en <1ms. La sobrecarga de memoización no lo vale." Los revisores no son infalibles. Un buen cuestionamiento mejora el entendimiento del equipo.
- **No solo cumplas.** Aceptar ciegamente cada sugerencia sin entender produce peor código y previene el aprendizaje. Entiende el razonamiento y luego decide.

---

## Checklists de Revisión por Tipo de PR

### Nuevo Componente

- [ ] Los props están completamente tipados (sin `any`, sin tipos implícitos)
- [ ] El componente es navegable por teclado (Tab, Enter, Space, Escape)
- [ ] Los elementos interactivos tienen nombres accesibles (texto visible o `aria-label`)
- [ ] Los estados de carga, error y vacío están manejados
- [ ] El componente funciona con diferentes longitudes de contenido (nombres largos, strings vacíos)
- [ ] Los tests cubren las interacciones principales del usuario
- [ ] No hay lógica de negocio en el componente (extraer a hooks/services)

### Corrección de Bug

- [ ] La causa raíz está identificada (no solo el síntoma parcheado)
- [ ] Se agrega un regression test que falla sin la corrección y pasa con ella
- [ ] Se revisa código relacionado por el mismo patrón de bug
- [ ] La corrección no introduce nuevos casos extremos
- [ ] El mensaje de commit o la descripción del PR explica qué causó el bug

### Refactor

- [ ] El comportamiento no cambia (las mismas entradas producen las mismas salidas)
- [ ] Todos los tests existentes pasan sin modificación
- [ ] No se mezclan cambios de features (refactor y cambios de features son PRs separados)
- [ ] El refactor mejora la claridad, reduce duplicación o simplifica la arquitectura
- [ ] Sin scope creep (refactorizar el mundo cuando se arregla un módulo)

### Actualización de Dependencia

- [ ] Se revisa el CHANGELOG o guía de migración por breaking changes
- [ ] Se verifica el impacto en el tamaño del bundle (antes y después de `npm run build`)
- [ ] Se revisan avisos de seguridad (`npm audit`)
- [ ] La nueva versión de la dependencia es compatible con otras dependencias
- [ ] Se hace smoke-test de la aplicación con la nueva versión

---

## Errores Comunes

- **Aprobar sin revisar.** Aprobar sin leer. "LGTM" sin comentarios en un PR de 500 líneas significa que nadie lo revisó realmente. Si no tienes tiempo para revisar correctamente, dilo y deja que otra persona revise.
- **Bikeshedding.** Dedicar 30 minutos debatiendo si una variable debería llamarse `userData` o `userInfo` mientras una condición de carrera pasa desapercibida tres líneas más abajo. Revisa en orden de prioridad.
- **Bloquear por preferencia personal.** "Yo lo habría escrito diferente" no es razón para bloquear un PR. Bloquea solo por correctitud, seguridad o estándares establecidos del equipo. El gusto no es un criterio de merge.
- **Revisar PRs de 2000 líneas.** Te perderás bugs. Leerás por encima. El autor debería haber dividido esto en PRs más pequeños. Pídele que lo divida antes de revisar.
- **Sin comentarios de revisión.** Si revisaste un PR y no encontraste nada que comentar, o el código es perfecto (poco probable) o no revisaste cuidadosamente. Incluso un comentario como "Me gusta cómo manejas el estado de error aquí" demuestra compromiso.
- **Revisar solo el diff.** El diff muestra qué cambió, pero no el contexto. Si se modifica una función, lee los callers. Si cambian los props de un componente, verifica dónde se usa. El código circundante importa.
- **Hacer nitpicking sin etiquetar.** Si tienes 15 sugerencias menores y 1 problema crítico, el problema crítico se ahoga. Etiqueta tus comentarios: `nit:`, `suggestion:`, `blocking:`, `question:`.

---

## Puntos Clave

- Revisa en orden de prioridad: correctitud, seguridad, diseño, rendimiento, accesibilidad, legibilidad, tests.
- Mantén los PRs bajo 400 líneas. Los PRs grandes reciben revisiones superficiales.
- Sé específico en el feedback: nombra el problema, explica por qué y ofrece una alternativa.
- Etiqueta los comentarios como `nit:`, `suggestion:`, `blocking:` o `question:` para que el autor sepa qué priorizar.
- Recibir feedback: separa tu ego de tu código. Haz preguntas. Responde con razonamiento cuando no estés de acuerdo.
