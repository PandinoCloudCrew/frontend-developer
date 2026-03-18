# Guía para Desarrolladores Frontend — Plan del Proyecto

## Visión

Una guía de referencia agnóstica de framework, basada en principios, para desarrolladores frontend. Enfatiza **cómo funcionan las cosas Y cómo fallan**. Enseña principios de desarrollo de software, usabilidad y mejores prácticas que pueden adaptarse a React, Angular, Vue, Svelte, o cualquier framework basado en componentes.

## Enfoque

- **Formato híbrido**: Capítulos en Markdown (conceptos + anti-patterns) + mockups visuales (archivos .pen exportados como imágenes)
- **Implementación guiada por el estudiante**: Los mockups sirven como objetivos de diseño — el estudiante construye el código real
- **Ambos caminos cubiertos**: Cada concepto incluye el camino positivo (cómo hacerlo) Y el camino negativo (cómo falla, errores comunes, anti-patterns)
- **Agnóstico de framework primero**: Los principios se enseñan sin sesgo hacia ningún framework, luego se mapean a implementaciones específicas
- **Basado en aceptación**: Cada etapa tiene criterios claros que el estudiante debe cumplir y pasos de validación concretos para verificar

## Entregables por Etapa

Cada etapa produce:
1. **Documento del capítulo** (`stage-N-name/README.md`) — conceptos, principios, anti-patterns, ejercicios
2. **Mockups** (diseñados en `guide/frontend-guide.pen`) — referencias visuales exportadas como imágenes en cada directorio de etapa
3. **Ejercicios** — tareas prácticas con entregables claros
4. **Criterios de aceptación** — condiciones específicas y verificables para considerar "completado"
5. **Lista de verificación de validación** — pasos concretos que el estudiante ejecuta para demostrar dominio

## Cómo Funcionan los Criterios de Aceptación

Cada etapa define:
- **Criterios de aceptación**: Resultados observables que el trabajo del estudiante debe demostrar. Escritos como declaraciones "La implementación del estudiante debe..."
- **Pasos de validación**: Acciones específicas que el estudiante realiza para verificar cada criterio. Son concretos: ejecutar un comando, abrir una herramienta, realizar una acción y observar un resultado específico. Nada vago como "entender X" — siempre "hacer X y observar Y."

---

## Desglose de Etapas

---

### Etapa 1: Fundamentos

**Objetivo**: Dominar la plataforma web antes de tocar un framework.
**Prerrequisitos**: Ninguno.

#### Esquema de Contenido

1. **Semantic HTML y el DOM**
   - Estructura del documento: `doctype`, `html`, `head`, `body`
   - Elementos semánticos: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`
   - Cuándo usar `div` vs elementos semánticos (árbol de decisión)
   - Formularios: `label`, `fieldset`, `legend`, atributos de validación nativa
   - Anti-pattern: div-soup — construir interfaces completas con `div` y `span`

2. **Fundamentos de CSS**
   - Box model: `content-box` vs `border-box`, margin collapse
   - Flexbox: modelo de ejes, alineación, distribución, wrapping
   - Grid: grids explícitos vs implícitos, unidades `fr`, `minmax`, `auto-fill`/`auto-fit`
   - Unidades responsivas: `rem`, `em`, `vw`, `vh`, `dvh`, `clamp()`
   - Custom properties (CSS variables) y tematización
   - Anti-pattern: pixel-everything, guerras de specificity, cadenas de `!important`

3. **JavaScript Esencial (ES2020+)**
   - Módulos: `import`/`export`, `import()` dinámico
   - Destructuring, spread, rest, optional chaining, nullish coalescing
   - `async`/`await`, Promises, manejo de errores con `try`/`catch`
   - Métodos de arrays: `map`, `filter`, `reduce`, `find`, `some`, `every`
   - Closures y scope — cómo funcionan y errores comunes
   - Anti-pattern: callback hell, mutación de estado compartido, uso de `var`

4. **TypeScript Básico**
   - Type annotations, interfaces, type aliases
   - `strict: true` desde el primer día
   - Union types, literal types, discriminated unions
   - `unknown` vs `any` — por qué `any` anula el propósito
   - Anti-pattern: casting con `as` para silenciar errores, proliferación de `@ts-ignore`

5. **Fundamentos de Accesibilidad**
   - Los elementos semánticos proporcionan comportamiento de forma gratuita
   - Navegación por teclado: Tab, Enter, Space, Escape, teclas de flecha
   - Labels, alt text, jerarquía de encabezados
   - Anti-pattern: `<div onClick>` como botón, `outline: none` sin reemplazo

6. **Entorno de Desarrollo**
   - Configuración del editor: integración con TypeScript, ESLint/Biome, Prettier
   - Browser DevTools: paneles de Elements, Console, Network, Performance, Accessibility
   - Conceptos básicos de terminal: gestores de paquetes (npm/pnpm/bun), scripts

#### Ejercicios

1. **Página de Perfil Semántica**: Construir una página de perfil personal usando solo HTML semántico (sin `div` para estructura). Incluir un nav, header con nombre/rol, main con secciones de biografía, aside con información de contacto y un footer.
2. **Desafío de Layout CSS**: Reproducir un mockup proporcionado (layout de dashboard) usando Flexbox y Grid. Debe funcionar en 3 anchos de viewport (móvil, tablet, escritorio) usando solo `rem`/`clamp()` — sin valores en píxeles para espaciado.
3. **Transformador de Datos TypeScript**: Escribir un módulo que obtenga JSON de una API pública, valide la forma con tipos de TypeScript, transforme los datos y maneje errores. No se permite `any`.
4. **Auditoría de Navegación por Teclado**: Tomar la página de perfil del Ejercicio 1, desconectar el ratón y completar cada interacción usando solo el teclado. Documentar cada fallo.

#### Criterios de Aceptación

| # | Criterio | Cómo verificar |
|---|----------|----------------|
| 1.1 | La página usa cero elementos `div` para layout estructural (solo elementos semánticos) | Abrir DevTools → panel Elements. Buscar `<div>`. Solo se permiten divs decorativos/de estilo, ninguno para estructura de la página (nav, headers, secciones, footers). |
| 1.2 | La página pasa la validación HTML sin errores | Ejecutar la página a través del [W3C Validator](https://validator.w3.org/) o `npx html-validate`. Cero errores. |
| 1.3 | El layout CSS no usa valores en píxeles para espaciado o dimensionamiento | Buscar en todos los archivos CSS por `px`. Solo permitido en bordes (`1px solid`) y sombras. Todo el espaciado, dimensionamiento y tipografía usa `rem`, `em`, `clamp()`, `%`, o unidades de viewport. |
| 1.4 | El layout funciona a anchos de 320px, 768px y 1280px | Abrir DevTools → Device toolbar. Establecer el ancho a cada valor. Sin barra de desplazamiento horizontal. Sin contenido superpuesto. Sin texto menor al equivalente de 16px. |
| 1.5 | El proyecto TypeScript compila con `strict: true` y cero `any` | Ejecutar `npx tsc --noEmit`. Cero errores. `grep -r ": any" src/` devuelve cero resultados. |
| 1.6 | El transformador TypeScript maneja errores de API con elegancia | Desconectar la red (DevTools → Network → Offline). Ejecutar el transformador. Debe registrar un mensaje de error significativo, no fallar con un rechazo no manejado. |
| 1.7 | Todo elemento interactivo es alcanzable y operable solo con teclado | Navegar con Tab por toda la página. Cada enlace, botón y campo de formulario debe recibir foco visible y ser activable con Enter o Space. |
| 1.8 | La página tiene una jerarquía de encabezados lógica | Ejecutar `document.querySelectorAll('h1,h2,h3,h4,h5,h6')` en la Console. Los encabezados deben descender en orden (sin saltos como h1→h3). Exactamente un `h1`. |
| 1.9 | Todas las imágenes tienen `alt` text apropiado | Ejecutar Lighthouse → Accessibility. "Image elements have [alt] attributes" debe pasar. Las imágenes decorativas usan `alt=""`. |
| 1.10 | El entorno de desarrollo produce errores de linting para errores comunes | Introducir una declaración `var`, una variable sin usar y un `console.log`. El linter debe marcar los tres. |

#### Script de Validación

El estudiante ejecuta estas comprobaciones después de completar todos los ejercicios:

```bash
# 1. HTML validation
npx html-validate dist/index.html

# 2. No `any` in TypeScript
grep -rn ": any" src/ && echo "FAIL: found 'any'" || echo "PASS: no 'any' found"

# 3. TypeScript strict compilation
npx tsc --noEmit --strict

# 4. Lint check
npx eslint src/ --max-warnings=0   # or: npx biome check src/

# 5. Accessibility quick check (if using a live server)
npx pa11y http://localhost:3000

# 6. Search for px values in CSS (manual review)
grep -rn "[0-9]px" src/**/*.css | grep -v "border\|shadow\|1px"
```

---

### Etapa 2: Arquitectura de Componentes

**Objetivo**: Pensar en componentes — el bloque de construcción universal.
**Prerrequisitos**: Etapa 1 completada.

#### Esquema de Contenido

1. **¿Qué es un componente?** — Entrada (props/datos) → Salida (UI). Encapsulación. Reutilización. Modelo mental agnóstico de framework.
2. **SOLID aplicado a componentes** — SRP (una razón para cambiar), OCP (extender vía composición), LSP (las variantes son sustituibles), ISP (interfaces de props mínimas), DIP (depender de abstracciones).
3. **Composición sobre herencia** — Children/slots, render props, compound components. Por qué `extends BaseComponent` falla.
4. **Props, slots y contratos de componentes** — Tipos de props como contratos de API. Requeridos vs opcionales. Valores por defecto. Event callbacks.
5. **Atomic Design** — Atoms → Molecules → Organisms → Templates → Pages. Cuándo ayuda, cuándo causa bikeshedding.
6. **Compound components** — Estado implícito compartido vía context. Patrones de `<Select>`, `<Tabs>`, `<Accordion>`.
7. **Hooks / Composables** — Extracción de lógica con estado. Composición de hooks. Cuándo los HOCs todavía tienen sentido.

#### Ejercicios

1. **Descomposición de Componentes**: Dado un mockup de una página de listado de productos, identificar y documentar cada componente (nombre, props, children, responsabilidad). Dibujar el árbol de componentes.
2. **Construir una Biblioteca de Componentes (3 niveles)**: Construir Button (atom), SearchBar (molecule) y ProductCard (organism). Cada uno debe aceptar props con tipos de TypeScript, tener valores por defecto razonables y ser componible.
3. **Refactorizar un Componente Dios**: Dado un componente de 400 líneas que maneja data fetching, filtrado, ordenamiento, paginación y renderizado — refactorizarlo en componentes y hooks separados, cada uno con una sola responsabilidad.
4. **Compound Component**: Construir un compound component `<Tabs>` donde `<Tabs>`, `<TabList>`, `<Tab>` y `<TabPanel>` comparten estado implícitamente.

#### Criterios de Aceptación

| # | Criterio | Cómo verificar |
|---|----------|----------------|
| 2.1 | La descomposición de componentes identifica al menos 3 niveles de anidamiento (atom/molecule/organism o equivalente) | Revisar el documento del árbol de componentes. Debe mostrar al menos 3 niveles distintos de composición. |
| 2.2 | Cada componente tiene una interfaz TypeScript para sus props | `grep -rn "interface.*Props" src/components/` devuelve un resultado por cada archivo de componente. |
| 2.3 | Ningún componente excede 150 líneas (excluyendo imports y tipos) | `wc -l src/components/**/*.tsx` — ningún archivo excede 150 líneas de JSX/lógica. |
| 2.4 | Ningún componente acepta más de 10 props | Revisar cada interfaz de props. Máximo 10 propiedades por interfaz. Si se necesitan más, el componente probablemente viola SRP. |
| 2.5 | El componente dios refactorizado produce una salida idéntica al original | Renderizar ambos lado a lado (snapshot o diff visual). El comportamiento debe ser idéntico. |
| 2.6 | Cada hook extraído es testeable de forma aislada | Escribir un test por hook que se ejecute sin renderizar un componente. Todos los tests pasan. |
| 2.7 | El compound component `<Tabs>` gestiona el foco con teclas de flecha | Renderizar los Tabs. Presionar Tab para enfocar la lista de tabs. Presionar las flechas Izquierda/Derecha para cambiar el tab activo. El anillo de foco debe ser visible en el tab activo. |
| 2.8 | Los children del compound `<Tabs>` pueden reordenarse sin romperse | Mover los elementos `<Tab>` y `<TabPanel>` a diferentes posiciones. El componente sigue funcionando correctamente. |
| 2.9 | Los componentes son componibles — Button funciona dentro de SearchBar, SearchBar funciona dentro de ProductCard | Renderizar ProductCard conteniendo SearchBar conteniendo Button. Sin conflictos de props, sin fugas de estilos. |
| 2.10 | Ningún componente obtiene datos directamente (separación de responsabilidades) | `grep -rn "fetch\|axios\|useQuery" src/components/` devuelve cero resultados. El data fetching vive en hooks o services. |

---

### Etapa 3: Estado y Flujo de Datos

**Objetivo**: Dominar los datos que impulsan la UI.
**Prerrequisitos**: Etapa 2 completada.

#### Esquema de Contenido

1. **Estado local vs global** — Árbol de decisión: "¿Necesita otro componente esto?" Si no → local. Si sí → elevar o compartir.
2. **Server state vs client state** — El cambio de paradigma. Por qué existen TanStack Query/SWR. Cache invalidation, refetching, optimistic updates.
3. **Flujo de datos unidireccional** — State → View → Action → State. Por qué los bindings bidireccionales causan errores.
4. **Estado derivado/computado** — Nunca almacenes lo que puedes calcular. `useMemo`, `computed()`, selectors.
5. **Inmutabilidad** — Por qué la mutación rompe la detección de cambios. Spread, Immer, structural sharing.
6. **Máquinas de estado** — XState para flujos con >3 estados. Eliminación de estados imposibles.
7. **Patrones de data fetching** — Estados de loading/error/success. Skeleton screens. Empty states.

#### Ejercicios

1. **Auditoría de Estado**: Dada una aplicación con todo el estado en un único store global, identificar qué estado es local, cuál es de servidor, cuál es derivado y cuál pertenece a la URL. Refactorizar.
2. **Migración de Server State**: Reemplazar data fetching manual con `useEffect` + `useState` por TanStack Query (o equivalente del framework). Agregar caching, manejo de errores y estados de carga.
3. **Formulario Multi-paso con Máquina de Estado**: Construir un flujo de checkout (carrito → envío → pago → confirmación) usando XState. Cada paso tiene validación que debe pasar antes de avanzar.
4. **Sincronización de Estado con URL**: Construir una lista filtrable, ordenable y paginada donde todo el estado de filtro/ordenamiento/página vive en la URL. Compartir la URL debe reproducir la vista exacta.

#### Criterios de Aceptación

| # | Criterio | Cómo verificar |
|---|----------|----------------|
| 3.1 | Ningún dato del servidor almacenado en bibliotecas de estado del cliente (Zustand/Redux/Pinia) | `grep -rn "setState\|dispatch\|store.set" src/` — ninguno de estos actualiza datos obtenidos del servidor. Los datos del servidor fluyen a través de TanStack Query / SWR / equivalente del framework. |
| 3.2 | Sin estado derivado duplicado — sin `useState` para valores calculables de otro estado | Buscar variables de estado. Para cada una, preguntar: "¿Se puede computar a partir de otro estado?" Si sí → debe ser un valor `useMemo`/`computed`/derivado, no estado almacenado. |
| 3.3 | Cada llamada de data fetching tiene estados explícitos de loading, error y vacío | Navegar a cada vista dependiente de datos. Para cada una: (1) limitar la red a Slow 3G → debe aparecer skeleton/spinner de carga. (2) Bloquear la solicitud de API → debe aparecer mensaje de error con opción de reintentar. (3) Devolver array vacío → debe aparecer mensaje de empty state. |
| 3.4 | La máquina de estado hace imposibles los estados imposibles | En el flujo de checkout: intentar avanzar de carrito a pago (saltando envío). Intentar volver de confirmación a carrito. La máquina de estado debe rechazar ambas transiciones. |
| 3.5 | El estado en la URL es la fuente de verdad para filtros/ordenamiento/paginación | Copiar la URL con filtros activos. Abrirla en una ventana de incógnito. La misma vista exacta (filtros, orden, número de página) debe renderizarse. |
| 3.6 | El botón de retroceso del navegador funciona correctamente con el estado en la URL | Aplicar filtros, cambiar página, cambiar orden. Presionar Atrás 3 veces. Cada pulsación restaura el estado anterior. |
| 3.7 | Sin errores de stale closure | Abrir la aplicación. Hacer clic rápidamente en un botón de contador 10 veces. El conteo debe ser igual a 10, no un número menor (lo que indicaría un stale closure). |
| 3.8 | El optimistic update se revierte en caso de fallo | Agregar un elemento (debe aparecer inmediatamente). Simular un error del servidor. El elemento debe desaparecer y debe aparecer un mensaje de error. |

---

### Etapa 4: Usabilidad y Principios de Diseño

**Objetivo**: Construir interfaces que la gente realmente quiera usar.
**Prerrequisitos**: Etapa 3 completada.

#### Esquema de Contenido

1. **Las 10 Heurísticas de Nielsen** — Cada heurística aplicada a la web, con ejemplos de violación (mockups de antes/después).
2. **Ley de Fitts y Ley de Hick** — Dimensionamiento de objetivos, ubicación de acciones, reducción de opciones.
3. **Principios de Gestalt** — Proximidad, similitud, cierre, continuidad, región común.
4. **Progressive Disclosure** — Mostrar lo esencial primero. Máximo 2 niveles de divulgación.
5. **Reducción de Carga Cognitiva** — Chunking, valores por defecto, jerarquía visual, patrones consistentes.
6. **Mobile-First y Responsive** — Estilos base → mejora. Breakpoints de contenido, no breakpoints de dispositivo.
7. **Diseño de Formularios** — Labels, temporalidad de la validación, mensajes de error, formularios multi-paso.

#### Ejercicios

1. **Auditoría Heurística**: Dado un mockup con 10 violaciones deliberadas de usabilidad (una por heurística), identificar cada violación, nombrar la heurística violada y proponer una solución.
2. **Dashboard Responsivo**: Construir un dashboard que funcione en móvil (columna única, tarjetas apiladas), tablet (grid de 2 columnas) y escritorio (sidebar + contenido principal). Sin breakpoints basados en ancho de dispositivo.
3. **Rediseño de Formulario**: Dado un formulario de una sola página con 20 campos, rediseñarlo usando progressive disclosure (wizard multi-paso), validación inline y valores por defecto razonables.
4. **Auditoría de Touch Targets**: Medir cada elemento interactivo en una vista móvil. Marcar y corregir cualquier objetivo menor a 44x44px.

#### Criterios de Aceptación

| # | Criterio | Cómo verificar |
|---|----------|----------------|
| 4.1 | El estudiante identifica correctamente las 10 violaciones heurísticas en la auditoría | Comparar la auditoría del estudiante con la clave de respuestas. 10/10 identificadas, con la heurística correcta nombrada y una solución accionable propuesta. |
| 4.2 | Los breakpoints del dashboard están basados en contenido, no en dispositivo | Redimensionar lentamente el navegador de 320px a 1920px. El layout debe adaptarse suavemente en los puntos de quiebre naturales del contenido. Sin saltos en 768px o 1024px específicamente. |
| 4.3 | El dashboard es usable en cada ancho entre 320px y 1920px | En ningún ancho el contenido se desborda, superpone o se vuelve ilegible. |
| 4.4 | El wizard del formulario muestra progreso y permite navegación hacia atrás | Completar el paso 1 y avanzar. Un indicador de progreso muestra "Paso 2 de N." Un botón de retroceso regresa al paso 1 con todos los datos preservados. |
| 4.5 | El formulario valida inline al perder el foco, no al enviar | Llenar un campo con datos inválidos y tabular al siguiente. El mensaje de error aparece inmediatamente debajo del campo. No enviar el formulario. |
| 4.6 | El botón de envío del formulario está deshabilitado con explicación visible cuando es inválido | Con campos requeridos vacíos, el botón de envío debe estar deshabilitado. Al pasar el cursor o enfocar debe mostrar qué campos necesitan atención. |
| 4.7 | Cada touch target en móvil mide al menos 44x44px | En la vista móvil de DevTools, usar la herramienta "Measure" o ejecutar un script: `document.querySelectorAll('button,a,input,[role=button]').forEach(el => { const r = el.getBoundingClientRect(); if (r.width < 44 || r.height < 44) console.warn('Too small:', el, r.width, r.height) })`. Cero advertencias. |
| 4.8 | No hay dark patterns presentes | Revisión por pares: otra persona revisa el flujo del formulario y confirma que no hay confirm-shaming, misdirection, costos ocultos ni preguntas trampa. |

---

### Etapa 5: Rendimiento

**Objetivo**: Enviar rápido, mantener rápido.
**Prerrequisitos**: Etapa 4 completada.

#### Esquema de Contenido

1. **Core Web Vitals** — LCP (<2.5s), INP (<200ms), CLS (<0.1). Qué miden y por qué importan.
2. **Modelo RAIL** — Marco mental de Response, Animation, Idle, Load.
3. **Lazy Loading** — Basado en rutas (automático), a nivel de componente (`React.lazy`, `defineAsyncComponent`), imágenes (`loading="lazy"`, NO en el elemento LCP).
4. **Code Splitting** — Splitting por ruta, por funcionalidad, de vendors. Cuándo el splitting excesivo perjudica.
5. **Virtualización** — `@tanstack/virtual`, `react-window`. Cuándo usar (>100 elementos), trade-offs (a11y).
6. **Memoización** — Cuándo ayuda, cuándo desperdicia memoria, cuándo falla silenciosamente (objetos inline).
7. **Optimización de Imágenes** — WebP/AVIF, `srcset`, `sizes`, `fetchpriority="high"` para el hero.
8. **Medición** — Lighthouse vs métricas de usuarios reales (CrUX), panel de Performance en DevTools, análisis de bundles.

#### Ejercicios

1. **Auditoría de Rendimiento**: Ejecutar Lighthouse en una aplicación lenta proporcionada. Documentar cada hallazgo, priorizar por impacto, corregir los 5 principales.
2. **Implementación de Lazy Loading**: Agregar code splitting a nivel de ruta y lazy loading de imágenes. Asegurar que la imagen hero NO tenga lazy loading.
3. **Lista Virtualizada**: Construir una lista que renderice 10,000 elementos sin jank. El scroll debe mantenerse a 60fps.
4. **Análisis de Bundle**: Ejecutar bundle analyzer en un proyecto proporcionado. Identificar las 3 dependencias más grandes. Proponer e implementar al menos una reducción de tamaño.

#### Criterios de Aceptación

| # | Criterio | Cómo verificar |
|---|----------|----------------|
| 5.1 | Puntuación de Performance en Lighthouse >= 90 en simulación móvil | Ejecutar `npx lighthouse http://localhost:3000 --preset=perf --emulated-form-factor=mobile`. La puntuación debe ser >= 90. |
| 5.2 | LCP < 2.5 segundos en conexión limitada | DevTools → Performance → Iniciar grabación → Recargar con throttling "Slow 4G". El marcador LCP debe aparecer antes de 2.5s. |
| 5.3 | CLS = 0 (sin layout shifts) | DevTools → Performance → grabar una carga completa de página. El CLS debe ser 0.00. Alternativa: `new PerformanceObserver(l => l.getEntries().forEach(e => console.log('CLS:', e.value))).observe({type: 'layout-shift', buffered: true})`. |
| 5.4 | La imagen hero/LCP NO tiene `loading="lazy"` | Inspeccionar la imagen hero en DevTools. No debe tener `loading="lazy"`. Debe tener `fetchpriority="high"`. |
| 5.5 | El code splitting a nivel de ruta produce chunks separados | Compilar el proyecto. Verificar el directorio de salida. Cada ruta debe tener su propio chunk JS (no todo en un solo bundle). |
| 5.6 | La lista virtualizada scrollea a 60fps con 10,000 elementos | DevTools → Performance → grabar mientras se hace scroll rápido. La tasa de frames debe mantenerse por encima de 55fps. Ningún frame mayor a 16ms. |
| 5.7 | Tamaño del bundle reducido al menos un 20% después de la optimización | Comparar tamaños de salida del build antes y después de la optimización. `ls -la dist/assets/*.js` — el tamaño total de JS debe ser al menos un 20% menor. |
| 5.8 | Sin `React.memo` / `useMemo` / `useCallback` sin justificación medida | Para cada uso de memoización, el estudiante debe documentar qué re-render o cálculo midió como costoso. "Podría ser lento" no es aceptable. |

---

### Etapa 6: Seguridad y Resiliencia

**Objetivo**: Proteger a los usuarios y manejar los fallos con elegancia.
**Prerrequisitos**: Etapa 5 completada.

#### Esquema de Contenido

1. **Prevención de XSS** — Auto-escaping del framework. `dangerouslySetInnerHTML`/`v-html` son señales de alerta. DOMPurify para cuando se debe renderizar HTML.
2. **CSRF** — SameSite cookies, tokens anti-CSRF, validación de Origin/Referer.
3. **CSP** — Escribir una política real. Por qué `default-src *` es inútil.
4. **Auth** — Almacenamiento de JWT (memoria, no localStorage). OAuth + PKCE para SPAs. Patrón BFF. Rotación de refresh tokens.
5. **Validación de Entradas** — Cliente para UX, servidor para seguridad. Zod/Valibot para validación de tipos en tiempo de ejecución.
6. **Error Boundaries** — Ubicación estratégica. No solo en la raíz de la app. No por componente.
7. **Degradación Elegante** — UI de fallback, indicadores de datos obsoletos, feature detection.
8. **Optimistic Updates** — Cuándo usar (bajo riesgo), cuándo no (pagos). Rollback con notificación.
9. **Retry** — Exponential backoff + jitter. Idempotency keys. Máximo de reintentos. Estado de retry visible.

#### Ejercicios

1. **Desafío XSS**: Dada una aplicación con 5 vulnerabilidades XSS (innerHTML, eval, URL injection, template injection, stored XSS), encontrar y corregir las 5.
2. **Implementación de Estados de Error**: Para una página basada en datos, implementar los 4 estados de UI: cargando (skeleton), éxito (datos), error (mensaje + botón de reintentar), vacío (empty state útil).
3. **Flujo de Auth**: Implementar login con OAuth + PKCE con access token en memoria, refresh token en HttpOnly cookie y renovación automática de tokens.
4. **Test de Resiliencia**: Simular fallo de red durante una operación. Verificar que el rollback optimista, los mensajes de error y el comportamiento de retry funcionan correctamente.

#### Criterios de Aceptación

| # | Criterio | Cómo verificar |
|---|----------|----------------|
| 6.1 | Cero vulnerabilidades XSS restantes | Ejecutar una prueba manual: ingresar `<img src=x onerror=alert(1)>` en cada input de texto y campo visible al usuario. No debe aparecer ningún cuadro de alerta. Buscar en el código `dangerouslySetInnerHTML`, `v-html`, `innerHTML`, `eval` — cada ocurrencia debe usar DOMPurify o estar justificada. |
| 6.2 | Sin secretos en el bundle del cliente | Compilar el proyecto. `grep -r "sk_\|api_key\|secret\|password\|private" dist/` debe devolver cero resultados. |
| 6.3 | Los 4 estados de UI implementados para cada vista con data fetching | (1) Limitar a Slow 3G → skeleton/spinner. (2) Bloquear API → error + botón de reintentar. (3) El botón de reintentar funciona. (4) Devolver datos vacíos → empty state con orientación. |
| 6.4 | Los tokens de auth no están en localStorage ni sessionStorage | En DevTools → Application → Local Storage y Session Storage. No deben ser visibles JWTs, access tokens ni refresh tokens. |
| 6.5 | Un optimistic update fallido muestra error y se revierte | Dar like a un elemento. Bloquear la API. El like debe revertirse y debe aparecer un toast/mensaje de error. |
| 6.6 | El retry usa exponential backoff | En DevTools → Network, fallar una API 3 veces. Los intervalos de retry deben incrementarse (ej., ~1s, ~2s, ~4s), no ser idénticos. |
| 6.7 | El header CSP está presente y no es permisivo | En DevTools → Network → Response headers del documento HTML. `Content-Security-Policy` debe estar presente. NO debe contener `*` ni `unsafe-inline` para `script-src`. |
| 6.8 | Cada formulario valida tanto en cliente como en servidor | Enviar un formulario con datos válidos del lado del cliente pero inválidos del lado del servidor (saltear la validación del cliente vía DevTools). El servidor debe rechazar con un error claro. |

---

### Etapa 7: Testing y Calidad

**Objetivo**: Confianza en cada deploy.
**Prerrequisitos**: Etapa 6 completada.

#### Esquema de Contenido

1. **Pirámide de Testing** — Muchos tests unitarios, algunos de integración, pocos E2E. Por qué la inversa falla.
2. **Testing Library** — Testear comportamiento del usuario, no implementación. Consultar por role/label/text, no por class/id.
3. **MSW** — Mock a nivel de red. Mantener los mocks honestos con contract tests.
4. **Testing de Accesibilidad** — axe-core en CI. Test manual de teclado + screen reader.
5. **Linting** — ESLint flat config o Biome. Automatizar lo que se pueda.
6. **Pipeline de CI** — Unit rápidos → E2E más lentos. Fallar rápido. Paralelizar.
7. **Code Review** — Qué buscar. Cómo dar feedback accionable.

#### Ejercicios

1. **Testear un Componente**: Escribir tests para un componente `SearchBar` usando Testing Library. Testear: renderiza, acepta input, llama a onSearch al enviar, muestra error al enviar vacío. Cero consultas al DOM por class name o test ID.
2. **Testear Data Fetching**: Escribir tests de integración para un hook/composable de data fetching usando MSW. Testear: estado de carga, estado de éxito, estado de error, comportamiento de retry.
3. **E2E del Camino Crítico**: Escribir un test de Playwright para el recorrido de usuario más crítico (ej., login → buscar → ver detalle → agregar al carrito → checkout).
4. **Configuración de Pipeline de CI**: Configurar un pipeline de GitHub Actions que ejecute lint → unit tests → component tests → E2E (solo si los anteriores pasan).

#### Criterios de Aceptación

| # | Criterio | Cómo verificar |
|---|----------|----------------|
| 7.1 | Todos los tests pasan sin `getByTestId` ni consultas por clase del DOM | `grep -rn "getByTestId\|querySelector\|className" src/**/*.test.*` debe devolver cero resultados. Todas las consultas usan `getByRole`, `getByLabelText`, `getByText` o `getByPlaceholderText`. |
| 7.2 | Cobertura de tests >= 80% para lógica de negocio, sin adoración de cobertura para UI | Ejecutar `npx vitest --coverage`. `src/hooks/`, `src/services/`, `src/utils/` deben tener >= 80% de cobertura de líneas. Sin objetivo para `src/components/` — testear comportamiento, no markup. |
| 7.3 | Los mocks de MSW coinciden con el contrato real de la API | Ejecutar validación de contrato de API: las formas de respuesta de los handlers de MSW deben coincidir con los tipos TypeScript de la API. Una discrepancia de tipos falla el build. |
| 7.4 | El test E2E completa el camino crítico en menos de 30 segundos | Ejecutar `npx playwright test`. El test del camino crítico debe pasar en < 30s. |
| 7.5 | El pipeline de CI falla ante errores de lint | Hacer push de un commit con un error de ESLint/Biome. El pipeline debe fallar en el paso de lint, antes de ejecutar tests. |
| 7.6 | El pipeline de CI ejecuta E2E solo después de que pasen los unit tests | Revisar el YAML de GitHub Actions. El job de E2E debe tener `needs: [unit-tests]` o equivalente. |
| 7.7 | La verificación de accesibilidad en CI detecta violaciones | Introducir un `<button>` sin nombre accesible. axe-core o pa11y en CI debe marcarlo y fallar el build. |
| 7.8 | Ningún test hace mock de detalles de implementación | Revisar los archivos de test. Sin mocking de estado interno, métodos privados ni internos de hooks. Solo se mockean dependencias externas (APIs vía MSW, timers vía `vi.useFakeTimers`). |

---

### Etapa 8: Arquitectura a Escala

**Objetivo**: Patrones para equipos y aplicaciones grandes.
**Prerrequisitos**: Etapa 7 completada.

#### Esquema de Contenido

1. **Organización de Carpetas** — Basada en features, Feature-Sliced Design, domain-driven. Trade-offs de cada una.
2. **Clean Architecture en Frontend** — 4 capas: Presentation → Application → Domain → Infrastructure. Cuándo es excesivo.
3. **Design Systems** — Headless components (Radix, Ark UI), design tokens (estándar W3C), modelo copy-paste de shadcn/ui.
4. **Patrones de API** — REST (público), tRPC (interno TS), GraphQL (BFF). Marco de decisión.
5. **Build Tools** — Configuración de Vite. Entender qué hace el bundler.
6. **Meta-frameworks** — SSR, SSG, ISR, streaming. Elegir la estrategia de renderizado correcta.
7. **Monorepos** — Cuándo ayudan, cuándo no. Paquetes compartidos.

#### Ejercicios

1. **Refactorización por Features**: Tomar una estructura de carpetas plana (todo en `components/`, `hooks/`, `services/`) y reorganizar por feature. Asegurar que no haya imports circulares entre features.
2. **Extracción de Design System**: De una aplicación existente, extraer 5 componentes reutilizables en un paquete de design system con design tokens para colores, espaciado y tipografía.
3. **Capa de API**: Implementar una capa de API type-safe con tRPC (o equivalente). Los cambios de tipos del backend deben producir errores de tipos en el frontend en tiempo de compilación.
4. **Decisión de Estrategia de Renderizado**: Dados 3 tipos diferentes de página (artículo de blog, dashboard de usuario, listado de productos e-commerce), elegir e implementar la estrategia de renderizado apropiada para cada uno, con justificación escrita.

#### Criterios de Aceptación

| # | Criterio | Cómo verificar |
|---|----------|----------------|
| 8.1 | Sin imports circulares entre features | Ejecutar `npx madge --circular src/`. Cero dependencias circulares entre directorios de features. |
| 8.2 | El directorio de feature es autocontenido | Eliminar un directorio de feature. El resto de la aplicación debe compilar con solo errores de import apuntando a la API pública de la feature eliminada, no a archivos internos. |
| 8.3 | Los componentes del design system funcionan sin la aplicación padre | El paquete del design system se compila independientemente (`cd packages/design-system && npm run build`). Exporta componentes, tokens y tipos. |
| 8.4 | Los design tokens producen tematización consistente | Cambiar el valor de un token de color. Cada componente que usa ese token debe actualizarse. Verificar visualmente en 3+ componentes. |
| 8.5 | La seguridad de tipos de API detecta breaking changes en tiempo de compilación | Cambiar un tipo de respuesta del backend (agregar/eliminar un campo). Ejecutar `npx tsc --noEmit` en el frontend. Debe producir un error de tipo señalando el código que lo consume. |
| 8.6 | La estrategia de renderizado coincide con el tipo de contenido | Artículo de blog: pre-renderizado en tiempo de compilación (verificar archivo HTML estático). Dashboard: renderizado en servidor por solicitud (verificar headers de respuesta del servidor). Listado de productos: ISR con revalidación (verificar headers de cache). |
| 8.7 | La justificación de cada estrategia de renderizado hace referencia a trade-offs | La justificación escrita para cada tipo de página debe mencionar al menos: (1) con qué frecuencia cambian los datos, (2) si se necesita personalización, (3) requisitos de SEO, (4) impacto en time-to-interactive. |
| 8.8 | El build produce chunks separados por feature | Ejecutar `npx vite build`. La salida muestra chunks nombrados que mapean a features, no un único bundle monolítico. |

---

## Estructura de Archivos

```
frontend-developer/
  PLAN.md                                    # This file
  frontend-ecosystem-2026.md                 # Research: current ecosystem state
  frontend-principles-and-best-practices.md  # Research: principles + anti-patterns
  guide/
    README.md                                # Guide index and overview
    frontend-guide.pen                       # All mockups (Pencil file)
    stage-1-foundations/
      README.md                              # Chapter content + exercises + acceptance criteria
      mockups/                               # Exported images
    stage-2-component-architecture/
      README.md
      mockups/
    stage-3-state-and-data/
      README.md
      mockups/
    stage-4-usability-and-design/
      README.md
      mockups/
    stage-5-performance/
      README.md
      mockups/
    stage-6-security-and-resilience/
      README.md
      mockups/
    stage-7-testing-and-quality/
      README.md
      mockups/
    stage-8-architecture-at-scale/
      README.md
      mockups/
```

## Estado Actual

| Fase | Status | Notas |
|------|--------|-------|
| Investigación: Ecosistema | Done | 572 líneas, 12 secciones, 60+ fuentes |
| Investigación: Principios | Done | 921 líneas, 10 secciones, 60+ fuentes |
| Auditoría de anti-patterns | Done | 157 brechas identificadas, todas abordadas |
| Adiciones de anti-patterns | Done | 23 subsecciones agregadas en ambos documentos |
| Plan con criterios de aceptación | Done | Este archivo |
| Estructura de directorios de etapas | Done | 8 directorios de etapas creados |
| README de la guía | Done | Resumen + descripciones de etapas |
| Capítulo Etapa 1 | Not started | |
| Mockups Etapa 1 | Not started | |
| Etapas 2-8 | Not started | |

## Principios para la Escritura

1. **Mostrar ambos caminos**: Cada concepto recibe "cómo hacerlo bien" Y "cómo sale mal"
2. **Concreto sobre abstracto**: Ejemplos de código reales y escenarios de fallo reales, no descripciones teóricas
3. **Agnóstico de framework primero**: Enseñar el principio, luego mostrar los mapeos específicos de cada framework
4. **Complejidad progresiva**: Cada etapa asume dominio de las etapas anteriores
5. **Visual + textual**: Mockups para conceptos espaciales/de diseño, markdown para todo lo demás
6. **Ejercicios accionables**: No "leer sobre X" sino "construir Y aplicando X"
7. **Aceptación medible**: Cada ejercicio tiene criterios que el estudiante puede verificar por sí mismo
8. **Validación sobre confianza**: Los estudiantes ejecutan comprobaciones concretas, no autoevaluaciones
