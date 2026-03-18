# Plan de Actividades — Guía para Desarrolladores Frontend

> Actividades de 45-60 minutos organizadas en 8 etapas progresivas.
> Cada actividad tiene: lectura (~15-20 min), práctica (~30-35 min) y validación (~5-10 min).

---

## Niveles

El contenido está clasificado en 3 niveles. Un principiante solo necesita completar el nivel **Esencial** para ser productivo.

| Nivel | Icono | Qué cubre | Para quién |
|-------|:-----:|-----------|------------|
| **Esencial** | 🟢 | Lo mínimo para ser un desarrollador frontend funcional | Todos — completar primero |
| **Recomendado** | 🟡 | Profundiza en calidad, patrones y herramientas profesionales | Cuando quieras mejorar tu código |
| **Avanzado** | 🔴 | Arquitectura, escala y decisiones de equipo | Seniors, leads, o curiosos |

---

## Resumen por nivel

| Nivel | Actividades | Horas |
|-------|:-----------:|:-----:|
| 🟢 Esencial | 32 | ~27h |
| 🟡 Recomendado | 20 | ~17h |
| 🔴 Avanzado | 17 | ~14h |
| **Total** | **69** | **~58h** |

### Ruta mínima viable: solo 🟢 Esencial

| Etapa | Actividades 🟢 | Horas |
|-------|:--------------:|:-----:|
| 1 - Fundamentos | 8 | ~7h |
| 2 - Componentes | 4 | ~3.5h |
| 3 - Estado | 5 | ~4.5h |
| 4 - Usabilidad | 4 | ~3.5h |
| 5 - Rendimiento | 3 | ~2.5h |
| 6 - Seguridad | 4 | ~3.5h |
| 7 - Testing | 3 | ~2.5h |
| 8 - Arquitectura | 1 | ~1h |
| **Total** | **32** | **~27h** |

---

## Formato de cada actividad

```
🟢/🟡/🔴 Nombre de la actividad (~XX min)
├── Lectura: qué leer y dónde
├── Práctica: qué construir
├── Validación: cómo verificar
└── Criterios de aceptación: 2-4 condiciones verificables
```

---

## Etapa 1: Fundamentos

> La plataforma antes del framework. 8 esenciales + 3 recomendadas + 3 avanzadas.

---

🟢 **1.1 — Construir un documento HTML con estructura semántica** (~55 min)
- Lectura: foundations-reference.md L7-273 (~20 min)
- Práctica: Construir una página de perfil personal usando solo HTML semántico — `nav`, `header`, `main`, `section`, `article`, `aside`, `footer`. Sin `div` para estructura. Incluir un `h1` y jerarquía de encabezados correcta (~30 min)
- Validación: Buscar `<div>` en DevTools; ejecutar `npx html-validate` (~5 min)
- Criterios de aceptación:
  1. Cero `div` usados para layout estructural
  2. Pasa html-validate sin errores
  3. Exactamente un `h1`, jerarquía sin saltos

🟢 **1.2 — Agregar formularios con validación nativa** (~50 min)
- Lectura: foundations-reference.md L110-181 (~10 min)
- Práctica: Agregar formulario de contacto a la página de perfil con `fieldset`, `legend`, `label` asociados y atributos de validación nativa (`required`, `pattern`, `type="email"`) (~35 min)
- Validación: Enviar vacío, verificar mensajes nativos; verificar labels en DevTools (~5 min)
- Criterios de aceptación:
  1. Cada `input` tiene un `label` asociado (for/id)
  2. Los campos requeridos muestran error nativo al enviar vacío
  3. El `fieldset` agrupa campos relacionados con `legend`

🟢 **1.3 — Entender el box model y construir layouts con Flexbox** (~55 min)
- Lectura: foundations-reference.md L274-503 (box model, ~10 min) + L504-784 (flexbox, ~15 min)
- Práctica: Aplicar reset `border-box`. Construir 3 patrones con Flexbox: navbar horizontal, card row con wrap, centering perfecto. Todo con `rem` y `gap` (~25 min)
- Validación: Verificar box model en DevTools; verificar en 3 anchos de viewport (~5 min)
- Criterios de aceptación:
  1. Reset universal `box-sizing: border-box` aplicado
  2. Los 3 patrones usan `gap`, no margin entre items
  3. Sin valores `px` para espaciado (solo `rem`/`em`)

🟢 **1.4 — Construir layouts con CSS Grid** (~60 min)
- Lectura: foundations-reference.md L785-1082 (~20 min)
- Práctica: Implementar layout de dashboard con Grid: sidebar + header + contenido principal + grid de tarjetas responsivo con `auto-fill`/`minmax` (~35 min)
- Validación: Verificar en 320px, 768px, 1280px sin overflow (~5 min)
- Criterios de aceptación:
  1. El layout usa CSS Grid con areas nombradas
  2. Las tarjetas usan `auto-fill`/`auto-fit` con `minmax` (responsivas sin media queries)
  3. Funciona en 3 anchos sin scroll horizontal

🟢 **1.5 — Dominar JavaScript moderno: módulos, destructuring y async/await** (~55 min)
- Lectura: foundations-reference.md L1083-1384 (~20 min)
- Práctica: Crear un módulo que haga fetch a una API pública, use destructuring para extraer datos, spread para copias inmutables, optional chaining para datos anidados, y `async`/`await` con `try`/`catch` (~30 min)
- Validación: Cero `var`; cada llamada async tiene manejo de error (~5 min)
- Criterios de aceptación:
  1. Todos los módulos usan `import`/`export`
  2. Cero uso de `var`
  3. Cada llamada async tiene `try`/`catch` explícito
  4. Se usa spread para copias (no mutación directa)

🟢 **1.6 — Escribir un transformador de datos en TypeScript** (~60 min)
- Lectura: PLAN.md L66-71 + ecosystem TypeScript section (~15 min)
- Práctica: Implementar módulo que obtiene JSON de API pública, define interfaces TypeScript para la forma de datos, transforma los datos y maneja errores. `strict: true`, cero `any` (~35 min)
- Validación: `npx tsc --noEmit`; `grep ": any" src/`; probar offline (~10 min)
- Criterios de aceptación:
  1. Compila con `strict: true` sin errores
  2. `grep ": any"` devuelve cero resultados
  3. En modo offline muestra mensaje de error significativo

🟢 **1.7 — Auditar accesibilidad con teclado** (~50 min)
- Lectura: principles L817-886 (~10 min)
- Práctica: Desconectar el ratón. Navegar toda la página solo con teclado (Tab, Enter, Space, Escape). Documentar cada fallo. Corregir los 3 más críticos (~30 min)
- Validación: `npx pa11y http://localhost:3000`; Lighthouse Accessibility (~10 min)
- Criterios de aceptación:
  1. Todo elemento interactivo alcanzable con Tab y activable con Enter/Space
  2. Foco visible en cada elemento enfocable
  3. Lighthouse Accessibility > 90

🟢 **1.8 — Configurar entorno de desarrollo** (~45 min)
- Lectura: PLAN.md L79-83 + ecosystem s.12 (~10 min)
- Práctica: Configurar proyecto con linter (ESLint o Biome). Verificar que detecta `var`, variables no usadas y `console.log`. Explorar DevTools: Elements, Console, Network (~30 min)
- Validación: Introducir 3 errores, verificar que el linter los marca (~5 min)
- Criterios de aceptación:
  1. El linter marca `var`, variables no usadas y `console.log`
  2. El estudiante inspecciona un elemento en DevTools Elements
  3. `npx eslint/biome check` pasa con cero warnings en código limpio

🟡 **1.9 — Dominar métodos de array y closures** (~50 min)
- Lectura: foundations-reference.md L1339-1502 (~15 min)
- Práctica: Implementar transformaciones de datos usando cadenas de `map`/`filter`/`reduce`; crear un closure práctico (counter factory, event handler con contexto) (~30 min)
- Validación: Verificar que no se usa `forEach` donde `map`/`filter` aplica (~5 min)
- Criterios de aceptación:
  1. Se usan al menos 3 métodos funcionales de array
  2. Se demuestra un closure funcional
  3. No hay mutación de arrays originales

🟡 **1.10 — Reproducir un mockup completo con Flexbox + Grid** (~60 min)
- Lectura: Revisar puntos clave Flexbox vs Grid (~5 min)
- Práctica: Reproducir mockup de dashboard completo combinando Flexbox y Grid, 3 breakpoints, solo `rem`/`clamp()` (~45 min)
- Validación: `grep -rn "[0-9]px" src/**/*.css`; verificar 320px, 768px, 1280px (~10 min)
- Criterios de aceptación:
  1. El layout reproduce el mockup proporcionado
  2. `grep px` devuelve solo bordes/sombras
  3. Toda la tipografía es fluida (`clamp` o `rem`)

🔴 **1.11 — Entender el event loop y Map/Set/WeakMap** (~50 min)
- Lectura: foundations-reference.md L1460-1598 (~15 min)
- Práctica: Predecir el orden de ejecución de 3 snippets con `setTimeout`, Promises y microtasks. Implementar un caché con `Map` y un registro de observers con `WeakMap` (~30 min)
- Validación: Verificar predicciones ejecutando los snippets (~5 min)
- Criterios de aceptación:
  1. Las 3 predicciones de orden de ejecución son correctas
  2. El caché con `Map` funciona correctamente
  3. El `WeakMap` no impide garbage collection

🔴 **1.12 — Stacking context y z-index en profundidad** (~45 min)
- Lectura: foundations-reference.md L416-503 (~10 min)
- Práctica: Crear una demo con 3 stacking contexts anidados. Demostrar que `z-index: 9999` puede quedar atrapado dentro de un contexto padre con `z-index` menor (~30 min)
- Validación: Verificar en DevTools Layers (~5 min)
- Criterios de aceptación:
  1. Se demuestra que un `z-index` alto falla dentro de un contexto padre
  2. Se identifica qué propiedades CSS crean un stacking context

🔴 **1.13 — Validación integral de Etapa 1** (~55 min)
- Lectura: PLAN.md L106-128 (~5 min)
- Práctica: Ejecutar los 6 comandos del script de validación. Corregir cualquier fallo restante (~40 min)
- Validación: Los 6 comandos pasan (~10 min)
- Criterios de aceptación:
  1. `html-validate` pasa sin errores
  2. `tsc --noEmit --strict` pasa
  3. Lint check pasa con cero warnings
  4. `pa11y` no reporta errores críticos

---

## Etapa 2: Arquitectura de Componentes

> Pensar en componentes. 4 esenciales + 2 recomendadas + 2 avanzadas.

---

🟢 **2.1 — Entender qué es un componente y descomponer una UI** (~55 min)
- Lectura: suppl-comp L7-196 (~15 min)
- Práctica: Dado un mockup de una página de producto, documentar cada componente (nombre, props, children, responsabilidad). Dibujar el árbol de componentes con al menos 3 niveles (~35 min)
- Validación: Verificar al menos 3 niveles; ningún componente con más de 10 props (~5 min)
- Criterios de aceptación:
  1. El árbol tiene al menos 3 niveles (atom/molecule/organism)
  2. Cada componente se describe como función Input→Output
  3. Ningún componente tiene más de una responsabilidad

🟢 **2.2 — Diseñar APIs de componentes y construir una biblioteca de 3 niveles** (~55 min)
- Lectura: suppl-comp L197-476 (~15 min)
- Práctica: Definir interfaces TypeScript para Button (atom), SearchBar (molecule) y ProductCard (organism). Implementar los 3 con props tipados, defaults razonables y composición (Button dentro de SearchBar dentro de ProductCard) (~35 min)
- Validación: TypeScript compila; los componentes componen sin conflictos (~5 min)
- Criterios de aceptación:
  1. Cada componente tiene interfaz TypeScript para sus props
  2. Button funciona dentro de SearchBar, SearchBar dentro de ProductCard
  3. Ninguno excede 150 líneas
  4. Ningún componente hace fetch de datos directamente

🟢 **2.3 — Aplicar SRP y refactorizar un componente dios** (~60 min)
- Lectura: principles L85-174 (SOLID, ~10 min)
- Práctica: Dado un componente de 400 líneas que hace fetch, filtrado, ordenamiento, paginación y renderizado — refactorizarlo en componentes + hooks separados, cada uno con una sola responsabilidad (~40 min)
- Validación: `wc -l`; `grep "fetch|axios" src/components/`; output idéntico al original (~10 min)
- Criterios de aceptación:
  1. Ningún componente excede 150 líneas
  2. `grep "fetch|axios"` en components/ devuelve cero
  3. Cada hook extraído es testeable de forma aislada
  4. La salida refactorizada es idéntica a la original

🟢 **2.4 — Construir un Compound Component (Tabs)** (~60 min)
- Lectura: principles L136-174 (compound components + render props, ~10 min)
- Práctica: Construir `<Tabs>`, `<TabList>`, `<Tab>` y `<TabPanel>` que comparten estado implícitamente vía context. Navegación con flechas de teclado (~40 min)
- Validación: Reordenar Tab/TabPanel, verificar que sigue funcionando; probar flechas de teclado (~10 min)
- Criterios de aceptación:
  1. Las flechas Izquierda/Derecha cambian el tab activo
  2. Los children pueden reordenarse sin romperse
  3. El foco visible está presente en el tab activo

🟡 **2.5 — Aplicar OCP, LSP e ISP a componentes existentes** (~50 min)
- Lectura: principles L41-110 (~15 min)
- Práctica: Revisar los componentes construidos contra cada principio SOLID. Documentar una violación y corregirla. Crear una variante de componente que sea sustituible (LSP) (~30 min)
- Validación: Reemplazar un componente base por su variante sin romper nada (~5 min)
- Criterios de aceptación:
  1. Los componentes son extensibles vía composición (OCP)
  2. Las variantes son sustituibles sin romper funcionalidad (LSP)
  3. Ningún componente tiene más de 10 props (ISP)

🟡 **2.6 — Separación de responsabilidades con hooks/composables** (~50 min)
- Lectura: principles L202-264 + suppl-comp L327-476 (~15 min)
- Práctica: Extraer lógica de UI a hooks reutilizables. Implementar ref forwarding y controlled vs uncontrolled pattern (~30 min)
- Validación: Los hooks funcionan sin renderizar un componente (~5 min)
- Criterios de aceptación:
  1. La lógica de negocio vive en hooks, no en componentes
  2. Los hooks son testeables de forma aislada
  3. Al menos un componente controlled y uno uncontrolled

🔴 **2.7 — Atomic Design y cuándo NO usarlo** (~45 min)
- Lectura: principles L173-200 (~10 min)
- Práctica: Clasificar todos los componentes construidos en la jerarquía Atomic Design. Documentar dónde la clasificación se vuelve ambigua y por qué Feature-Sliced Design puede ser mejor para apps complejas (~30 min)
- Validación: La documentación identifica al menos 2 debilidades de Atomic Design (~5 min)
- Criterios de aceptación:
  1. Los componentes están clasificados en niveles atómicos
  2. Se identifican al menos 2 casos ambiguos (¿molécula u organismo?)
  3. Se propone cuándo Atomic Design ayuda vs cuándo estorba

🔴 **2.8 — Validación integral de Etapa 2** (~55 min)
- Lectura: PLAN.md L154-167 (~5 min)
- Práctica: Verificar todos los criterios: props tipados, componentes < 150 líneas, cero fetch en componentes, Tabs con flechas, composición funcional (~40 min)
- Validación: Los 10 criterios del PLAN pasan (~10 min)
- Criterios de aceptación:
  1. Todos los criterios 2.1-2.10 del PLAN se cumplen

---

## Etapa 3: Estado y Flujo de Datos

> Dominar los datos que impulsan la UI. 5 esenciales + 2 recomendadas + 2 avanzadas.

---

🟢 **3.1 — Implementar los 4 estados de UI para data fetching** (~55 min)
- Lectura: suppl-comp L477-775 (~18 min)
- Práctica: Construir un componente que consume una API y muestra los 4 estados: skeleton (loading), datos (success), mensaje + reintentar (error), guía útil (empty) (~30 min)
- Validación: Probar Slow 3G, bloquear API, devolver array vacío (~7 min)
- Criterios de aceptación:
  1. Skeleton/spinner visible en conexión lenta
  2. Error con botón reintentar al bloquear API
  3. Empty state descriptivo con array vacío
  4. Sin flash de contenido entre estados

🟢 **3.2 — Gestionar estado en la URL** (~60 min)
- Lectura: suppl-comp L776-999 (~15 min)
- Práctica: Construir una lista filtrable, ordenable y paginada donde filtro, orden y página viven en la URL. Compartir la URL debe reproducir la vista exacta (~35 min)
- Validación: Copiar URL → incógnito → misma vista; botón atrás 3 veces (~10 min)
- Criterios de aceptación:
  1. Filtros, orden y página están en query params de la URL
  2. Compartir la URL reproduce la vista exacta en incógnito
  3. El botón atrás restaura cada estado previo

🟢 **3.3 — Gestionar estado de formularios con validación** (~55 min)
- Lectura: suppl-comp L1000-1321 (~15 min)
- Práctica: Implementar formulario con validación basada en schema (Zod) y estrategia on-blur. Prevenir double-submit con estado de loading en el botón (~35 min)
- Validación: Verificar errores al blur, no al submit; verificar que el botón se deshabilita al enviar (~5 min)
- Criterios de aceptación:
  1. Validación on-blur (no en cada keystroke)
  2. Se usa schema de validación (Zod/Valibot)
  3. El botón de envío muestra loading y se deshabilita durante el submit

🟢 **3.4 — Distinguir tipos de estado y migrar a server state** (~55 min)
- Lectura: principles L331-414 (~15 min)
- Práctica: Auditar el estado de la app: clasificar cada pieza como local, servidor, derivado o URL. Reemplazar `useState`+`useEffect` para data fetching por TanStack Query (~30 min)
- Validación: `grep "setState\|dispatch" src/` — cero actualizaciones de datos del servidor; cache funciona (~10 min)
- Criterios de aceptación:
  1. Ningún dato del servidor almacenado en estado del cliente
  2. Los datos del servidor fluyen por TanStack Query
  3. Ningún estado derivado almacenado como `useState`
  4. La cache funciona (navegar ida y vuelta sin re-fetch)

🟢 **3.5 — Construir un wizard multi-paso con validación por paso** (~55 min)
- Lectura: suppl-comp L1194-1321 (~10 min)
- Práctica: Construir flujo de checkout (carrito → envío → pago → confirmación) con preservación de datos entre pasos y navegación atrás (~35 min)
- Validación: Avanzar, retroceder, verificar datos preservados; intentar saltar pasos (~10 min)
- Criterios de aceptación:
  1. El wizard muestra progreso (Paso X de N)
  2. El botón atrás preserva datos
  3. No se puede avanzar sin validación del paso actual

🟡 **3.6 — Implementar state machine para flujo complejo (XState)** (~55 min)
- Lectura: principles L368-381 (~5 min)
- Práctica: Integrar XState al wizard de checkout. Definir máquina con estados y transiciones. Impedir transiciones inválidas (~40 min)
- Validación: Intentar saltar de carrito a pago; intentar volver de confirmación a carrito (~10 min)
- Criterios de aceptación:
  1. La máquina impide saltar pasos
  2. Los estados imposibles son imposibles por definición
  3. Las transiciones requieren validación

🟡 **3.7 — Optimistic updates con rollback y retry** (~55 min)
- Lectura: principles L610-637 (~10 min)
- Práctica: Implementar like/unlike optimista. En fallo: rollback visible + error toast. Implementar retry con backoff exponencial (~35 min)
- Validación: Like → bloquear API → rollback visible; verificar intervalos crecientes de retry (~10 min)
- Criterios de aceptación:
  1. Optimistic update aparece inmediatamente
  2. En fallo, se revierte con mensaje de error visible
  3. Los intervalos de retry son crecientes (~1s, ~2s, ~4s)

🔴 **3.8 — Inmutabilidad, stale closures y rendimiento de estado** (~50 min)
- Lectura: principles L331-414 (inmutabilidad + anti-patterns, ~15 min)
- Práctica: Demostrar un bug de stale closure (click rápido 10 veces ≠ 10). Corregirlo. Demostrar el costo de spread en objetos grandes a 60fps vs useRef (~30 min)
- Validación: Click rápido 10 veces = 10; sin jank en animación (~5 min)
- Criterios de aceptación:
  1. Click rápido 10 veces produce conteo = 10
  2. Se demuestra cuándo `useRef` es mejor que `useState` para animaciones

🔴 **3.9 — Validación integral de Etapa 3** (~55 min)
- Lectura: PLAN.md L194-204 (~5 min)
- Práctica: Verificar todos los criterios 3.1-3.8 del PLAN (~40 min)
- Validación: Los 8 criterios pasan (~10 min)
- Criterios de aceptación:
  1. Todos los criterios 3.1-3.8 del PLAN se cumplen

---

## Etapa 4: Usabilidad y Principios de Diseño

> Interfaces que la gente quiere usar. 4 esenciales + 3 recomendadas + 2 avanzadas.

---

🟢 **4.1 — Construir sistema tipográfico y paleta de color** (~55 min)
- Lectura: suppl-visual L7-470 (~20 min)
- Práctica: Definir type scale con CSS custom properties usando ratio 1.25 y `clamp()`. Crear paleta de 3 capas (brand, neutral, semantic) con dark mode via `prefers-color-scheme` (~30 min)
- Validación: Cero `px` para font sizes; contraste WCAG AA en DevTools (~5 min)
- Criterios de aceptación:
  1. Type scale definido con custom properties
  2. Paleta con las 3 capas en custom properties
  3. Dark mode funciona con `prefers-color-scheme`
  4. Contraste texto/fondo cumple WCAG AA (4.5:1)

🟢 **4.2 — Implementar sistema de espaciado y diseñar formularios** (~55 min)
- Lectura: suppl-visual L471-969 (~20 min)
- Práctica: Definir tokens de espaciado (grid 8px). Rediseñar un formulario de 20 campos como wizard multi-paso con validación inline on-blur, labels arriba del input, y valores por defecto (~30 min)
- Validación: Todo espaciado usa tokens; validación inline funciona (~5 min)
- Criterios de aceptación:
  1. Tokens de espaciado definidos con custom properties
  2. El wizard muestra progreso y permite retroceder
  3. Validación ocurre al blur, no al submit
  4. Botón de envío deshabilitado cuando hay campos inválidos

🟢 **4.3 — Dominar las heurísticas de Nielsen** (~55 min)
- Lectura: suppl-visual L970-1114 + principles L417-435 (~15 min)
- Práctica: Auditoría heurística: dado un mockup con 10 violaciones (una por heurística), identificar cada violación, nombrar la heurística y proponer solución (~35 min)
- Validación: Comparar con clave de respuestas: 10/10 identificadas (~5 min)
- Criterios de aceptación:
  1. 10/10 violaciones identificadas correctamente
  2. Cada una nombra la heurística correcta
  3. Cada solución es accionable

🟢 **4.4 — Construir dashboard responsivo con mobile-first** (~60 min)
- Lectura: principles L486-516 (~5 min)
- Práctica: Dashboard que funciona en móvil (1 columna), tablet (2 columnas), escritorio (sidebar + main). Breakpoints basados en contenido, no dispositivos (~45 min)
- Validación: Redimensionar 320px→1920px suavemente; verificar touch targets ≥ 44x44px (~10 min)
- Criterios de aceptación:
  1. Breakpoints basados en contenido (no en 768px/1024px)
  2. Usable en cada ancho entre 320px y 1920px
  3. Todo touch target ≥ 44x44px en móvil

🟡 **4.5 — Aplicar Fitts, Hick y Gestalt** (~45 min)
- Lectura: principles L436-477 (~10 min)
- Práctica: Revisar el dashboard: agrupar elementos relacionados (Gestalt proximidad), reducir opciones visibles (Hick), verificar tamaño de targets (Fitts) (~30 min)
- Validación: Ejecutar script de medición de touch targets (~5 min)
- Criterios de aceptación:
  1. Elementos relacionados agrupados visualmente
  2. Se aplica progressive disclosure (max 2 niveles)
  3. Acciones frecuentes son las más accesibles

🟡 **4.6 — Implementar skeleton screens que coincidan con el layout** (~50 min)
- Lectura: suppl-comp L700-775 (~10 min)
- Práctica: Mejorar los skeletons de la app: que reflejen la forma del contenido real, con animación de pulse, sin skeleton para el elemento LCP (~35 min)
- Validación: Comparar skeleton vs contenido cargado — formas similares (~5 min)
- Criterios de aceptación:
  1. Los skeletons reflejan la forma del contenido real
  2. Animación de pulse/shimmer
  3. El elemento LCP no tiene skeleton

🟡 **4.7 — Auditar y corregir dark patterns** (~45 min)
- Lectura: principles L441-451 (anti-patterns de usabilidad, ~10 min)
- Práctica: Revisión por pares de la app: verificar que no hay confirm-shaming, misdirection, costos ocultos. Verificar que toda notificación es necesaria (no toast fatigue) (~30 min)
- Validación: Otra persona confirma cero dark patterns (~5 min)
- Criterios de aceptación:
  1. Cero dark patterns identificados por el revisor
  2. Los toasts se usan solo para resultados inciertos/asíncronos
  3. Todo botón deshabilitado explica por qué

🔴 **4.8 — Diseño de color para accesibilidad y prefers-reduced-motion** (~45 min)
- Lectura: suppl-visual L370-470 + principles L816-821 (~10 min)
- Práctica: Verificar que ningún estado usa solo color como indicador (WCAG 1.4.1). Implementar `prefers-reduced-motion` para desactivar animaciones (~30 min)
- Validación: Ver la app en modo daltónico (DevTools); activar reduced-motion (~5 min)
- Criterios de aceptación:
  1. Todo estado tiene indicador no-cromático (texto, icono)
  2. `prefers-reduced-motion` elimina animaciones
  3. La app es comprensible en simulación de daltonismo

🔴 **4.9 — Validación integral de Etapa 4** (~55 min)
- Lectura: PLAN.md L230-241 (~5 min)
- Práctica: Verificar todos los criterios 4.1-4.8 del PLAN (~40 min)
- Validación: Los 8 criterios pasan (~10 min)
- Criterios de aceptación:
  1. Todos los criterios 4.1-4.8 del PLAN se cumplen

---

## Etapa 5: Rendimiento

> Enviar rápido, mantener rápido. 3 esenciales + 2 recomendadas + 2 avanzadas.

---

🟢 **5.1 — Entender Core Web Vitals y corregir problemas de rendimiento** (~55 min)
- Lectura: principles L517-591 + ecosystem L371-414 (~15 min)
- Práctica: Ejecutar Lighthouse en una app lenta. Documentar hallazgos, priorizar por impacto, corregir los 3 principales (LCP, CLS, bundle size) (~35 min)
- Validación: Lighthouse Performance ≥ 90 en móvil (~5 min)
- Criterios de aceptación:
  1. Lighthouse Performance ≥ 90
  2. LCP < 2.5s en Slow 4G
  3. CLS = 0 (sin layout shifts)

🟢 **5.2 — Implementar lazy loading y code splitting** (~55 min)
- Lectura: principles L535-591 + PLAN L253-258 (~10 min)
- Práctica: Agregar code splitting por ruta. Agregar `loading="lazy"` a imágenes below-the-fold. Asegurar que la imagen hero tiene `fetchpriority="high"` y NO `loading="lazy"` (~35 min)
- Validación: Verificar chunks separados en build; inspeccionar hero en DevTools (~10 min)
- Criterios de aceptación:
  1. Cada ruta tiene su propio chunk JS
  2. La imagen hero NO tiene `loading="lazy"`
  3. La imagen hero tiene `fetchpriority="high"`

🟢 **5.3 — Analizar y reducir el bundle** (~55 min)
- Lectura: principles L570-591 (~5 min)
- Práctica: Ejecutar bundle analyzer. Identificar las 3 dependencias más grandes. Implementar al menos una reducción (tree shaking, reemplazo de librería, eliminación de import innecesario) (~40 min)
- Validación: Comparar tamaño antes vs después — al menos 20% menos (~10 min)
- Criterios de aceptación:
  1. Bundle reducido al menos 20%
  2. Se identifican las 3 dependencias más grandes
  3. Al menos una optimización implementada

🟡 **5.4 — Construir una lista virtualizada de 10,000 elementos** (~55 min)
- Lectura: principles L543-551 (~5 min)
- Práctica: Usar `@tanstack/virtual` o `react-window` para renderizar 10,000 elementos sin jank (~40 min)
- Validación: DevTools Performance → scroll rápido → frame rate > 55fps (~10 min)
- Criterios de aceptación:
  1. Scroll a 60fps con 10,000 elementos
  2. Ningún frame mayor a 16ms
  3. Solo los elementos visibles se renderizan en el DOM

🟡 **5.5 — Memoización: cuándo sí y cuándo NO** (~50 min)
- Lectura: principles L552-579 + anti-patterns L517-526 (~15 min)
- Práctica: Identificar un re-render costoso con React Profiler. Aplicar `React.memo`/`useMemo`. Luego demostrar cómo un inline object rompe la memoización silenciosamente (~30 min)
- Validación: Documentar qué se midió como costoso antes de memoizar (~5 min)
- Criterios de aceptación:
  1. Cada memoización tiene una justificación medida
  2. Se demuestra cómo un inline object rompe `React.memo`
  3. "Podría ser lento" NO es justificación aceptable

🔴 **5.6 — Medir rendimiento real vs sintético** (~50 min)
- Lectura: ecosystem L403-414 (anti-patterns rendimiento, ~10 min)
- Práctica: Comparar Lighthouse (sintético) vs `web-vitals` library (real). Auditar impacto de scripts de terceros con DevTools. Documentar diferencias (~30 min)
- Validación: El análisis identifica al menos una discrepancia sintético vs real (~10 min)
- Criterios de aceptación:
  1. Se instala y configura `web-vitals` para métricas reales
  2. Se identifican scripts de terceros y su impacto
  3. Se documenta al menos una diferencia Lighthouse vs RUM

🔴 **5.7 — Validación integral de Etapa 5** (~55 min)
- Lectura: PLAN.md L270-279 (~5 min)
- Práctica: Verificar todos los criterios 5.1-5.8 del PLAN (~40 min)
- Validación: Los 8 criterios pasan (~10 min)
- Criterios de aceptación:
  1. Todos los criterios 5.1-5.8 del PLAN se cumplen

---

## Etapa 6: Seguridad y Resiliencia

> Proteger usuarios y manejar fallos. 4 esenciales + 2 recomendadas + 1 avanzada.

---

🟢 **6.1 — Prevenir XSS y entender auto-escaping** (~55 min)
- Lectura: principles L577-635 (XSS, CSRF, CSP, ~15 min)
- Práctica: En una app con 5 vulnerabilidades XSS (innerHTML, eval, URL injection, template injection, stored XSS), encontrar y corregir las 5 (~35 min)
- Validación: Ingresar `<img src=x onerror=alert(1)>` en cada input — cero alerts (~5 min)
- Criterios de aceptación:
  1. Cero XSS vulnerabilities restantes
  2. Cada `dangerouslySetInnerHTML`/`v-html` usa DOMPurify o está justificado
  3. Cero uso de `eval` o `new Function`

🟢 **6.2 — Implementar los 4 estados de error para toda vista con datos** (~55 min)
- Lectura: principles L592-637 (~10 min)
- Práctica: Para cada vista con data fetching, implementar: skeleton (loading), datos (success), mensaje + retry (error), empty state útil. Agregar error boundaries estratégicos (~35 min)
- Validación: Slow 3G → skeleton; bloquear API → error + retry; retry funciona; array vacío → empty state (~10 min)
- Criterios de aceptación:
  1. Skeleton visible en carga lenta
  2. Error con botón reintentar funcional
  3. Empty state con orientación al usuario
  4. Error boundaries en secciones independientes (no solo root)

🟢 **6.3 — Implementar autenticación segura** (~60 min)
- Lectura: principles L671-701 (~10 min)
- Práctica: Implementar login con OAuth + PKCE. Access token en memoria (no localStorage), refresh token en HttpOnly cookie, renovación automática (~40 min)
- Validación: Verificar que no hay tokens en localStorage/sessionStorage (~10 min)
- Criterios de aceptación:
  1. Cero tokens visibles en localStorage/sessionStorage
  2. Access token en memoria
  3. Refresh token en HttpOnly cookie
  4. Renovación automática funciona

🟢 **6.4 — Validación doble: cliente + servidor** (~50 min)
- Lectura: principles L664-670 (~5 min)
- Práctica: Agregar validación con Zod (cliente) + validación independiente en servidor. Saltear validación cliente vía DevTools → el servidor debe rechazar (~35 min)
- Validación: Desactivar validación cliente → enviar datos inválidos → servidor rechaza (~10 min)
- Criterios de aceptación:
  1. Validación en cliente con schema
  2. Servidor rechaza datos inválidos independientemente
  3. `grep "sk_\|api_key\|secret\|password" dist/` devuelve cero (sin secretos en bundle)

🟡 **6.5 — Configurar CSP y protección CSRF** (~45 min)
- Lectura: principles L593-612 (~10 min)
- Práctica: Configurar CSP header restrictivo (sin `*` ni `unsafe-inline`). Configurar SameSite cookies (~30 min)
- Validación: Verificar CSP en response headers; verificar SameSite en cookies (~5 min)
- Criterios de aceptación:
  1. CSP header presente y restrictivo
  2. No contiene `*` ni `unsafe-inline` para `script-src`
  3. SameSite cookies configuradas

🟡 **6.6 — Optimistic updates con rollback y retry con backoff** (~55 min)
- Lectura: principles L610-637 (~10 min)
- Práctica: Like optimista → bloquear API → rollback visible + error toast. Retry con intervalos crecientes (~35 min)
- Validación: Verificar rollback visible; verificar intervalos ~1s, ~2s, ~4s en Network (~10 min)
- Criterios de aceptación:
  1. Optimistic update se revierte visiblemente en caso de fallo
  2. Error toast aparece al fallar
  3. Intervalos de retry son crecientes (exponential backoff)

🔴 **6.7 — Validación integral de Etapa 6** (~55 min)
- Lectura: PLAN.md L309-318 (~5 min)
- Práctica: Verificar todos los criterios 6.1-6.8 del PLAN (~40 min)
- Validación: Los 8 criterios pasan (~10 min)
- Criterios de aceptación:
  1. Todos los criterios 6.1-6.8 del PLAN se cumplen

---

## Etapa 7: Testing y Calidad

> Confianza en cada deploy. 3 esenciales + 3 recomendadas + 2 avanzadas.

---

🟢 **7.1 — Aprender a escribir buenos tests con Testing Library** (~55 min)
- Lectura: suppl-testing L7-460 (~20 min)
- Práctica: Escribir tests para SearchBar con Testing Library: renderiza, acepta input, llama `onSearch` al submit, muestra error al submit vacío. Cero `getByTestId` — solo `getByRole`/`getByLabelText`/`getByText` (~30 min)
- Validación: `grep "getByTestId\|querySelector" src/**/*.test.*` → cero resultados (~5 min)
- Criterios de aceptación:
  1. Tests siguen patrón Arrange-Act-Assert
  2. Cero `getByTestId` o `querySelector`
  3. Tests verifican comportamiento, no implementación
  4. Se usa `userEvent`, no `fireEvent`

🟢 **7.2 — Testear data fetching con MSW** (~60 min)
- Lectura: suppl-testing L460-724 (~15 min)
- Práctica: Escribir tests de integración para un hook de data fetching usando MSW. Testear: loading, success, error, retry. Los mocks coinciden con tipos TypeScript de la API (~35 min)
- Validación: Todos los tests pasan; las formas de MSW coinciden con tipos TS (~10 min)
- Criterios de aceptación:
  1. MSW handlers para success, error y retry
  2. Los tests verifican los 4 estados
  3. Las formas de respuesta MSW coinciden con tipos TypeScript

🟢 **7.3 — Escribir test E2E del camino crítico con Playwright** (~60 min)
- Lectura: suppl-testing L725-1084 (~20 min)
- Práctica: E2E del camino crítico: login → buscar → ver detalle → agregar al carrito. Usar Page Object Model. Auth vía API, no UI (~30 min)
- Validación: El test completa en < 30s; usa POM (~10 min)
- Criterios de aceptación:
  1. Test E2E completa el camino crítico en < 30 segundos
  2. Se usa Page Object Model
  3. Locators usan `getByRole`/`getByLabel`, no CSS selectors

🟡 **7.4 — Prácticas de code review** (~50 min)
- Lectura: suppl-testing L1085-1315 (~15 min)
- Práctica: Realizar code review de un PR proporcionado. Escribir al menos 5 comentarios accionables, distinguiendo `nit:` vs `blocking:`, usando "nosotros" (~30 min)
- Validación: Los comentarios son específicos y constructivos (~5 min)
- Criterios de aceptación:
  1. Al menos 5 comentarios accionables
  2. Se distingue `blocking` vs `nit`
  3. Lenguaje constructivo ("podríamos..." no "deberías...")

🟡 **7.5 — Configurar pipeline de CI** (~55 min)
- Lectura: principles L702-816 + ecosystem s.7 (~15 min)
- Práctica: Configurar GitHub Actions: lint → unit tests → component tests → E2E (solo si anteriores pasan). Verificar que un error de lint falla el pipeline (~30 min)
- Validación: Push commit con error → pipeline falla en lint (~10 min)
- Criterios de aceptación:
  1. Pipeline ejecuta lint → unit → E2E en orden
  2. E2E tiene `needs: [unit-tests]`
  3. Error de lint falla el pipeline antes de tests

🟡 **7.6 — Testing de accesibilidad en CI** (~45 min)
- Lectura: ecosystem L415-451 (~10 min)
- Práctica: Agregar axe-core al pipeline de CI. Introducir un `<button>` sin nombre accesible → verificar que CI falla (~30 min)
- Validación: CI falla ante violación de accesibilidad (~5 min)
- Criterios de aceptación:
  1. axe-core integrado en CI
  2. Un botón sin nombre accesible falla el build
  3. Coverage ≥ 80% para hooks/services/utils

🔴 **7.7 — Tests avanzados: snapshots, flaky tests y contract testing** (~50 min)
- Lectura: suppl-testing L555-724 + ecosystem L335-366 (anti-patterns, ~15 min)
- Práctica: Demostrar cuándo un snapshot es útil (< 10 líneas) vs dañino (componente completo). Identificar y corregir un test flaky. Validar que mocks MSW coinciden con contratos (~30 min)
- Validación: Snapshots pequeños; test flaky corregido; contract validation pasa (~5 min)
- Criterios de aceptación:
  1. Snapshots solo en output pequeño y estable
  2. Se identifica y corrige la causa raíz de un test flaky
  3. Mocks MSW validados contra tipos TypeScript

🔴 **7.8 — Validación integral de Etapa 7** (~55 min)
- Lectura: PLAN.md L346-355 (~5 min)
- Práctica: Verificar todos los criterios 7.1-7.8 del PLAN (~40 min)
- Validación: Los 8 criterios pasan (~10 min)
- Criterios de aceptación:
  1. Todos los criterios 7.1-7.8 del PLAN se cumplen

---

## Etapa 8: Arquitectura a Escala

> Patrones para equipos y apps grandes. 1 esencial + 4 recomendadas + 3 avanzadas.

---

🟢 **8.1 — Organizar código por features** (~60 min)
- Lectura: principles L723-816 (~15 min)
- Práctica: Refactorizar estructura plana (components/, hooks/, services/) a organización por feature. Verificar cero imports circulares con `npx madge --circular src/` (~35 min)
- Validación: `madge --circular` → cero ciclos; eliminar un feature no rompe otros (~10 min)
- Criterios de aceptación:
  1. Cero dependencias circulares entre features
  2. Cada feature contiene sus componentes, hooks y tipos
  3. Eliminar un feature directory solo rompe imports a su API pública

🟡 **8.2 — Clean Architecture en frontend (4 capas)** (~55 min)
- Lectura: principles L298-328 (~10 min)
- Práctica: Reorganizar una feature compleja en 4 capas (Presentation → Application → Domain → Infrastructure). La lógica de dominio debe ser agnóstica de framework (~35 min)
- Validación: Domain layer no importa React/Vue/Angular; tests de dominio pasan sin UI (~10 min)
- Criterios de aceptación:
  1. Domain layer no importa ningún framework
  2. Tests de dominio se ejecutan sin renderizar UI
  3. Infrastructure layer es intercambiable

🟡 **8.3 — Extraer un design system** (~60 min)
- Lectura: ecosystem L454-494 (~10 min)
- Práctica: Extraer 5 componentes reutilizables en un paquete de design system con design tokens para colores, espaciado y tipografía (~40 min)
- Validación: El paquete compila independientemente; cambiar un token actualiza todos los componentes (~10 min)
- Criterios de aceptación:
  1. Design system compila independientemente
  2. Exporta componentes, tokens y tipos
  3. Cambiar un token de color se propaga a todos los componentes

🟡 **8.4 — Implementar capa de API type-safe** (~60 min)
- Lectura: ecosystem L495-534 (~10 min)
- Práctica: Implementar capa de API con tRPC. Cambiar tipo de respuesta backend → `npx tsc --noEmit` falla en frontend (~40 min)
- Validación: Cambiar tipo backend → error de tipos en frontend (~10 min)
- Criterios de aceptación:
  1. Type safety end-to-end
  2. Breaking change backend produce error de tipos en frontend
  3. `npx tsc --noEmit` detecta el cambio

🟡 **8.5 — Elegir estrategia de renderizado (SSR/SSG/ISR)** (~60 min)
- Lectura: ecosystem L177-235 (~10 min)
- Práctica: Para 3 páginas (blog, dashboard, e-commerce listing), elegir e implementar la estrategia correcta con justificación escrita (~40 min)
- Validación: Blog = HTML estático; dashboard = SSR; listing = ISR con cache headers (~10 min)
- Criterios de aceptación:
  1. Cada estrategia coincide con el tipo de contenido
  2. La justificación referencia frecuencia de datos, SEO, personalización y TTI

🔴 **8.6 — Configurar Vite y entender el build** (~45 min)
- Lectura: ecosystem L134-176 (~10 min)
- Práctica: Configurar Vite con aliases y env vars. Verificar que el build produce chunks por feature (~30 min)
- Validación: `npx vite build` → chunks nombrados por feature (~5 min)
- Criterios de aceptación:
  1. Build produce chunks separados por feature
  2. No es un único bundle monolítico

🔴 **8.7 — Entender monorepos y micro-frontends** (~45 min)
- Lectura: PLAN.md L372 + suppl-testing L1316-1388 (~10 min)
- Práctica: Documentar decisión: ¿el proyecto justifica monorepo/micro-frontends? Con trade-offs listados (~30 min)
- Validación: La decisión referencia al menos 3 trade-offs concretos (~5 min)
- Criterios de aceptación:
  1. Decisión documentada con justificación
  2. Al menos 3 trade-offs por enfoque
  3. No se adopta por "porque Netflix lo usa"

🔴 **8.8 — Validación integral de Etapa 8** (~55 min)
- Lectura: PLAN.md L383-392 (~5 min)
- Práctica: Verificar todos los criterios 8.1-8.8 del PLAN (~40 min)
- Validación: Los 8 criterios pasan (~10 min)
- Criterios de aceptación:
  1. Todos los criterios 8.1-8.8 del PLAN se cumplen

---

## Resumen por nivel y etapa

| Etapa | 🟢 Esencial | 🟡 Recomendado | 🔴 Avanzado | Total |
|-------|:-----------:|:-------------:|:-----------:|:-----:|
| 1 - Fundamentos | 8 (~7h) | 2 (~1.8h) | 3 (~2.5h) | 13 |
| 2 - Componentes | 4 (~3.8h) | 2 (~1.7h) | 2 (~1.7h) | 8 |
| 3 - Estado | 5 (~4.7h) | 2 (~1.8h) | 2 (~1.7h) | 9 |
| 4 - Usabilidad | 4 (~3.8h) | 3 (~2.3h) | 2 (~1.7h) | 9 |
| 5 - Rendimiento | 3 (~2.8h) | 2 (~1.8h) | 2 (~1.8h) | 7 |
| 6 - Seguridad | 4 (~3.7h) | 2 (~1.7h) | 1 (~0.9h) | 7 |
| 7 - Testing | 3 (~2.9h) | 3 (~2.5h) | 2 (~1.8h) | 8 |
| 8 - Arquitectura | 1 (~1h) | 4 (~3.9h) | 3 (~2.4h) | 8 |
| **Total** | **32 (~27h)** | **20 (~17h)** | **17 (~14h)** | **69** |

### Rutas sugeridas

**Principiante (solo 🟢):** 32 actividades, ~27 horas. Cubre todo lo necesario para ser productivo como desarrollador frontend.

**Profesional (🟢 + 🟡):** 52 actividades, ~44 horas. Agrega calidad de código, patrones avanzados, testing profesional y arquitectura.

**Senior/Lead (🟢 + 🟡 + 🔴):** 69 actividades, ~58 horas. Cubre arquitectura a escala, decisiones técnicas de equipo, métricas reales y validación exhaustiva.
