# Lineamientos para Actividades y Lecturas

> Estándar de formato, tono y estructura para todo el contenido de la guía. Todo contribuyente debe seguir estos lineamientos para mantener uniformidad entre etapas.

---

## Audiencia

El estudiante es una persona con **poca experiencia en desarrollo**. No asumas que sabe:
- Qué es una terminal ni cómo abrirla
- Qué es npm, npx, o Node.js
- Cómo funciona DevTools
- Qué significa "compilar", "bundlear" o "servir"
- La diferencia entre un editor de texto y un procesador de palabras

**Sí puedes asumir** que sabe usar una computadora, instalar programas, y navegar en internet.

---

## Idioma

- **Prosa en español**
- **Jargon técnico en inglés**: props, hooks, signals, components, state, fetch, render, deploy, build, bundle, lint, commit, push, merge, pull request
- **Nombres de herramientas en inglés**: VS Code, DevTools, Angular, TypeScript, ESLint, Playwright
- **Código siempre en inglés**: nombres de variables, funciones, archivos, comandos
- **No traducir**: términos que el estudiante encontrará en inglés en la documentación oficial y Stack Overflow

---

## Estructura de una actividad

Cada actividad es un archivo markdown independiente en `actividades/`. Debe seguir esta estructura exacta:

```markdown
# 🟢 Actividad X.Y — Nombre accionable de la actividad

[← Volver a Etapa N](../README.md)

- [ ] Completada

**Duración:** ~XX min

**Lectura:**
- [Nombre del tema](../lecturas/XX-nombre.md) (~X min)

**Angular:** *(solo si aplica)*
- [Nombre del tema en Angular](../angular/XX-nombre.md) (~X min)

## Antes de empezar

Qué necesita el estudiante antes de iniciar esta actividad:
- Qué actividades previas debe haber completado
- Qué herramientas debe tener instaladas
- Conceptos clave explicados en 2-3 oraciones simples (qué es X y para qué sirve)

## Práctica paso a paso

**Paso 1 — Título del paso**

1. Instrucción específica con ruta exacta o comando exacto
2. Instrucción siguiente
3. ...

> 💡 **Nota:** Explicación breve de por qué se hace esto (opcional, solo si no es obvio)

**Paso 2 — Título del paso**

1. Instrucción...
2. ...

*(Repetir para cada paso lógico. Generalmente 4-8 pasos por actividad.)*

## Qué puede salir mal

- **"Descripción del error que el estudiante ve"** → Explicación de la causa y cómo solucionarlo.
- **"Otro error común"** → Solución.
- **"Tercer error frecuente"** → Solución.

*(2-4 errores comunes por actividad. Enfocarse en los que un principiante realmente encontrará.)*

## Resultado esperado

Descripción en texto de qué debe ver el estudiante al terminar. Si hay mockup:

![Resultado esperado](../mockups/X.Y-nombre.png)

*(Solo incluir mockup para actividades que producen un resultado visual en el navegador.
Actividades de código, configuración o auditoría NO necesitan mockup.)*

**Criterios de aceptación:**
- [ ] Criterio verificable 1
- [ ] Criterio verificable 2
- [ ] Criterio verificable 3

---

[← Actividad anterior](./X.Z-nombre.md) | [Siguiente →](./X.W-nombre.md)
```

---

## Reglas para la Práctica paso a paso

### Nivel de detalle

Cada instrucción debe ser **ejecutable sin ambigüedad**. El estudiante debe poder seguir los pasos sin tener que adivinar ni buscar en Google.

**Mal:**
```
Crea un componente Angular y agrégale un input.
```

**Bien:**
```
1. En la terminal, ejecuta: `ng generate component perfil`
2. Abre el archivo `src/app/perfil/perfil.component.ts`
3. Dentro de la clase, agrega un input signal:
   ```typescript
   nombre = input<string>('');
   ```
4. En `perfil.component.html`, muestra el nombre:
   ```html
   <h1>{{ nombre() }}</h1>
   ```
```

### Rutas y comandos

- Siempre especificar la **ruta completa del archivo** relativa al proyecto: `src/app/perfil/perfil.component.ts`, no "el archivo del componente"
- Siempre mostrar el **comando completo**: `ng generate component perfil --standalone`, no "genera un componente"
- Siempre indicar **dónde ejecutar el comando**: "En la terminal de VS Code" o "En la terminal, dentro de la carpeta del proyecto"

### Código

- Mostrar el **bloque de código completo** que el estudiante debe escribir, no solo la línea nueva
- Si el archivo ya tiene contenido, mostrar las líneas de contexto alrededor del cambio
- Indicar **dónde insertar** el código: "Después de la línea `import`, agrega:" o "Reemplaza el contenido de `template` por:"

### Cuándo NO dar paso a paso

Las actividades 🔴 (Avanzadas) pueden tener instrucciones menos granulares porque el estudiante ya tiene experiencia de las etapas previas. Aun así deben ser claras y sin ambigüedad.

---

## Reglas para "Antes de empezar"

- Siempre listar las **actividades previas requeridas** por número: "Necesitas haber completado la **Actividad 2.1**"
- Explicar **qué es** cualquier concepto nuevo que se introduce (1-3 oraciones)
- No asumir que el estudiante recuerda todos los conceptos de actividades anteriores — un recordatorio de una línea es suficiente

---

## Reglas para "Qué puede salir mal"

- Usar la **voz del estudiante**: "No me aparece nada en pantalla", "El comando dice 'not found'", "Veo un error rojo en la consola"
- Dar la **causa real** del error, no solo la solución
- Si el error requiere un comando, mostrar el comando exacto
- Enfocarse en errores **reales de principiantes**, no en edge cases

---

## Reglas para Criterios de aceptación

- Cada criterio debe ser **binario**: pasa o no pasa, sin juicio subjetivo
- Preferir criterios **verificables con un comando o acción**: "Ejecuta `npx tsc --noEmit` — cero errores" sobre "El código está bien tipado"
- Si requiere verificación visual, describir exactamente qué buscar: "En DevTools → Elements, busca `<div>`. No debe haber ninguno usado para layout"
- 2-4 criterios por actividad. Ni más ni menos.

---

## Reglas para Mockups

### Cuándo incluir mockup
- La actividad produce un **resultado visual en el navegador** (HTML, CSS, componente renderizado)
- El mockup ayuda al estudiante a saber **si va por buen camino**

### Cuándo NO incluir mockup
- La actividad es de **código puro** (TypeScript, JavaScript, tests)
- La actividad es de **configuración** (instalar herramientas, configurar linter)
- La actividad es de **auditoría** (revisar accesibilidad, revisar rendimiento)

### Estilo del mockup
- Debe mostrar **exactamente lo que el estudiante obtendrá** siguiendo los pasos
- Si la actividad es HTML sin CSS → mockup con browser defaults (serif font, links azules, sin layout)
- Si la actividad incluye CSS → mockup con el CSS simple que se pide, no un diseño refinado
- Incluir la **barra del navegador** con la URL `file:///` para que se vea como una captura real
- No usar tipografía de diseño (Space Grotesk, etc.) a menos que la actividad la pida explícitamente

---

## Estructura de una lectura

Las lecturas están en `lecturas/`. Cada una cubre un solo tema y se introduce cuando la actividad la necesita.

### Formato

```markdown
# Título del Tema

Introducción de 2-3 oraciones: qué es, para qué sirve, por qué importa.

---

## Subtema 1

Explicación con ejemplos de código.

## Subtema 2

...

## Anti-patterns

- **Nombre del anti-pattern.** Descripción y por qué es problemático.

## Puntos clave

- Bullet 1
- Bullet 2
- Bullet 3
```

### Reglas de longitud
- **50-300 líneas** por lectura
- Si supera 300 líneas, dividir en dos lecturas
- Cada lectura debe poder leerse en **5-15 minutos**

### Reglas de contenido
- Empezar con el **concepto**, luego los **ejemplos**
- Los ejemplos de código deben ser **copiables y ejecutables**
- Siempre incluir al menos un **anti-pattern** por lectura
- Terminar con **3-5 puntos clave** (bullets concisos)

---

## Estructura de contenido Angular

Los archivos Angular están en `angular/`. Enseñan cómo implementar los conceptos de la lectura usando Angular.

### Formato

```markdown
# Título del Tema en Angular

Introducción: cómo Angular implementa el concepto que se acaba de leer.

---

## Implementación

Código Angular concreto con explicación.

## Anti-patterns en Angular

- **Anti-pattern específico de Angular.** Por qué y qué hacer en su lugar.

## Puntos clave

- Bullet 1
- Bullet 2
```

### Reglas
- **Asumir que el estudiante ya leyó la lectura agnóstica** — no repetir la teoría
- Ir directo a la **implementación práctica en Angular**
- Usar **Angular 19+**: standalone components, signals, new control flow (`@if`, `@for`), `input()`, `output()`
- No usar APIs legacy: `@Input()` decorator, `NgModule`, `*ngIf`, `*ngFor`

---

## Estructura de un README de etapa

Cada etapa tiene un `README.md` que es un **índice conciso** (~60-80 líneas), no el contenido completo.

```markdown
# Etapa N: Nombre

> Descripción de una línea.

**Prerrequisitos:** Etapa N-1 completada.

---

## Progreso

**Esenciales:** 0/X | **Recomendadas:** 0/Y | **Avanzadas:** 0/Z

---

## Actividades Esenciales 🟢

| # | Actividad | Duración | Estado |
|:-:|-----------|:--------:|:------:|
| N.0 | [Nombre](./actividades/N.0-slug.md) | ~45 min | ☐ |

## Actividades Recomendadas 🟡
...

## Actividades Avanzadas 🔴
...

---

## Material de lectura

| Archivo | Contenido |
|---------|-----------|
| [01-tema.md](./lecturas/01-tema.md) | Descripción |

## Material de Angular

| Archivo | Contenido |
|---------|-----------|
| [01-tema.md](./angular/01-tema.md) | Descripción |

---

[← Etapa anterior](../stage-N-1/) | [Siguiente: Etapa N+1 →](../stage-N+1/)
```

---

## Nomenclatura de archivos

| Tipo | Patrón | Ejemplo |
|------|--------|---------|
| Actividad | `N.X-slug-descriptivo.md` | `2.3-solid-en-componentes.md` |
| Lectura | `XX-slug-descriptivo.md` | `03-css-box-model.md` |
| Angular | `XX-slug-descriptivo.md` | `01-componentes-en-angular.md` |
| Mockup | `N.X-slug-descriptivo.png` | `1.4-css-grid-dashboard.png` |

- Slugs en **kebab-case**, sin acentos, sin caracteres especiales
- Numeración con **cero-padding** para lecturas y angular (01, 02, 03...) pero NO para actividades (1.1, 1.2, 2.0...)

---

## Checklist antes de publicar una actividad

- [ ] Sigue la estructura exacta de este documento
- [ ] "Antes de empezar" lista actividades previas requeridas
- [ ] Cada paso de la práctica es ejecutable sin ambigüedad
- [ ] Los comandos incluyen la ruta o contexto donde ejecutarse
- [ ] Los bloques de código son completos y copiables
- [ ] "Qué puede salir mal" tiene 2-4 errores reales de principiantes
- [ ] Los criterios de aceptación son binarios y verificables
- [ ] Si hay mockup, muestra lo que el estudiante realmente obtendrá
- [ ] Los links a lecturas y angular usan rutas relativas correctas (`../lecturas/`, `../angular/`)
- [ ] La navegación ← Anterior | Siguiente → apunta a los archivos correctos
