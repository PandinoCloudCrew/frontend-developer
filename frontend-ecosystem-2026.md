# Ecosistema de Desarrollo Frontend - Estado del Arte (Principios de 2026)

> Estado actual del ecosistema de desarrollo frontend a principios de 2026. Cubre frameworks, herramientas, patrones y sus compromisos. Compilado a partir de más de 60 fuentes autorizadas.

---

## Tabla de Contenidos

1. [Frameworks y Bibliotecas Principales](#1-frameworks-y-bibliotecas-principales) — React 19, Angular 19, Vue 3.6, Svelte 5, Solid, Qwik
2. [Gestión de Estado](#2-gestión-de-estado) — Server/client split, TanStack Query, Zustand, Pinia, Signals
3. [Herramientas de Compilación y Bundlers](#3-herramientas-de-compilación-y-bundlers) — Vite 8, Turbopack, Rspack, Bun, esbuild
4. [Meta-frameworks](#4-meta-frameworks) — Next.js, Remix, Nuxt, SvelteKit, Astro, Analog
5. [CSS y Estilos](#5-css-y-estilos) — Tailwind v4, CSS nativo, declive de CSS-in-JS, Panda CSS
6. [TypeScript](#6-typescript) — Adopción, rol, mejores prácticas
7. [Testing](#7-testing) — Vitest, Playwright, Cypress, Testing Library, estrategia de CI
8. [Rendimiento](#8-rendimiento) — Core Web Vitals, estrategias de optimización
9. [Accesibilidad (a11y)](#9-accesibilidad-a11y) — WCAG 2.2, EAA, testing automatizado
10. [Sistemas de Diseño y Bibliotecas de Componentes](#10-sistemas-de-diseño-y-bibliotecas-de-componentes) — Headless UI, shadcn/ui, design tokens
11. [Patrones de API](#11-patrones-de-api) — REST, tRPC, GraphQL, BFF
12. [Experiencia del Desarrollador](#12-experiencia-del-desarrollador) — Biome, ESLint, HMR, gestores de paquetes
13. [Principios Transversales](#principios-transversales-agnósticos-del-framework) — 10 principios agnósticos del framework + meta anti-patrones

---

## 1. Frameworks y Bibliotecas Principales

### Panorama del Mercado

React mantiene su posición dominante con aproximadamente el 60% de los nuevos inicios de proyectos JavaScript. Angular tiene entre el 12-15%, Vue entre el 12-15%, y Svelte junto con otros se reparten el resto. Por segmento de empresa: las startups favorecen React (~70%), las empresas medianas diversifican (React 55%, Angular 20%, Vue 15%), y las grandes empresas se inclinan hacia Angular (35%) y React (45%).

### React (19.x)

React 19 se lanzó en diciembre de 2024 y ahora es completamente estable con la versión 19.2.4 (enero de 2026). Características principales:

- **Server Components & Server Actions**: Completamente estandarizados (ya no son experimentales). Los componentes pueden ejecutarse en el servidor, reduciendo el JavaScript del lado del cliente.
- **React Compiler**: Optimiza automáticamente los componentes en JavaScript eficiente, reduciendo re-renders innecesarios y eliminando en gran medida la necesidad de `useMemo`/`useCallback` manuales.
- **Nuevos Hooks**: `useActionState` (seguimiento de acciones asíncronas), `useOptimistic` (actualizaciones optimistas de la UI), `useFormStatus` (estado del formulario sin prop drilling), `useEvent` (referencias estables de event handlers).
- **Partial Pre-rendering (19.2)**: Pre-renderiza las partes estáticas desde un CDN, luego reanuda el renderizado del contenido dinámico en el cliente.
- **Document Metadata**: Soporte nativo de `<title>`, `<link>` y `<meta>` con hoisting al `<head>` sin bibliotecas de terceros.

### Angular (19+)

Angular 19 representa un cambio fundamental de arquitectura:

- **Standalone por defecto**: Todos los componentes, directivas y pipes son standalone por defecto. Los NgModules son opcionales/legacy.
- **Signals**: El modelo de reactividad recomendado. Componentes basados en signals con `input()`, `output()` y `model()` reemplazan los decoradores `@Input()`/`@Output()`.
- **Detección de cambios sin Zone.js**: Los effects se ejecutan como parte del ciclo de detección de cambios del componente, eliminando la necesidad de Zone.js.
- **Características experimentales**: Integración con Nitro, componentes sin selector en el horizonte.

### Vue (3.x + Vapor Mode)

- **Vue 3.6 Vapor Mode** (estabilizándose a mediados de 2026): Compila componentes single-file a operaciones directas del DOM, evitando completamente el Virtual DOM. Bundles base de menos de 10KB. Opt-in por componente, permitiendo árboles mixtos de VDOM y Vapor.
- Limitación actual: Vapor sigue siendo de calidad beta, carece de soporte para Suspense y solo funciona con la sintaxis `<script setup>`.

### Svelte (5.x)

- **Sistema de Runes** (`$state`, `$derived`, `$effect`): Reemplaza la reactividad implícita de nivel superior con signals explícitos que funcionan en cualquier lugar: dentro de componentes, stores o funciones utilitarias.
- Se espera una creciente adopción empresarial durante 2026. Los tamaños de bundle más pequeños y el modelo mental más simple son los diferenciadores clave.
- Limitación: Las Runes solo funcionan en archivos `.svelte` o `.svelte.ts`, a diferencia de Vue/Solid que permiten reactividad en cualquier archivo JS.

### Solid.js

- **Solid 1.9.x** es la versión estable actual; **Solid 2.0** está en desarrollo experimental con transiciones concurrentes, SSR basado en pull y error boundaries auto-reparables.
- **SolidStart 2.0** en alpha (febrero de 2026), reemplazando Vinxi con una arquitectura pura basada en Vite.
- El paradigma de reactividad granular/signals de Solid ha influenciado a Angular, Vue y React, y es candidato del TC39 para el propio lenguaje JavaScript.

### Qwik

- En la versión 2.0.0-beta.29 (marzo de 2026). La innovación central es la **resumability**: el servidor serializa el estado de la aplicación y el cliente lo reanuda sin hydration, logrando JavaScript inicial cercano a cero.
- Adopción creciente en sitios de e-commerce y contenido obsesionados con el rendimiento.
- Desafíos: ecosistema más pequeño, curva de aprendizaje de la sintaxis con signo de dólar, requiere un cambio de modelo mental respecto a los frameworks basados en hydration.

### Tendencia de Convergencia

Todos los frameworks principales están convergiendo hacia reactividad granular (signals), optimizaciones impulsadas por compilador y renderizado server-first. Las diferencias filosóficas se están reduciendo mientras que la DX y la madurez del ecosistema siguen siendo los diferenciadores principales.

### Errores Comunes y Anti-patrones

- **Cambio prematuro de framework basado en benchmarks o hype.** Migrar un codebase en producción al último "framework más rápido" basándose en benchmarks sintéticos desperdicia meses y ofrece ganancias marginales en el mundo real. Evalúa los frameworks por la madurez del ecosistema, el pool de contratación y la experiencia del equipo, no por demos de conferencias.
- **Aplicar patrones de un framework en otro.** La inyección de servicios al estilo Angular en React, el pensamiento de hooks al estilo React en Svelte, o las suposiciones de two-way binding al estilo Vue en Solid producen código no idiomático y difícil de mantener. Aprende el modelo mental del framework que elegiste.
- **Construir producción sobre APIs pre-estables.** Solid 2.0 es experimental, Vue Vapor es beta, Qwik es beta: estos son adecuados para experimentación y proyectos secundarios, no para lanzamientos en producción con plazos de entrega. Espera a las versiones estables o acepta el costo completo de ser un adoptante temprano (breaking changes, documentación faltante, respuestas escasas de la comunidad).
- **Tratar React Compiler como una solución para mal diseño de componentes.** El compilador optimiza código que ya es correcto memorizando referencias estables automáticamente. No arregla componentes que hacen fetch de datos en el render, mutan estado durante el render o tienen cadenas de props profundamente acopladas. Arregla la arquitectura primero.
- **Uso excesivo de `"use client"` en React 19.** Marcar cada componente como componente de cliente derrota el propósito entero de Server Components. Usa server components por defecto; solo agrega `"use client"` en el límite más bajo donde la interactividad realmente se necesita (event handlers, hooks, APIs del navegador).

---

## 2. Gestión de Estado

### La Separación entre Server State y Client State

El cambio más significativo en la gestión de estado: **server state y client state son ahora disciplinas claramente separadas**.

- **Server state** (datos de APIs/bases de datos): Manejado por **TanStack Query** (~5M descargas semanales) o **SWR**. Estos gestionan caching, refetching, actualizaciones en segundo plano y estados de loading/error.
- **Client state** (estado de la UI, preferencias del usuario, tokens de autenticación): Manejado por stores más ligeros.

### Ecosistema React

| Biblioteca | Descargas Semanales | Mejor Para |
|---------|-----------------|----------|
| Redux Toolkit | ~4M | Grandes aplicaciones empresariales con patrones estrictos, time-travel debugging |
| Zustand | ~4M (crecimiento >30% interanual) | Client state general, API simple, boilerplate mínimo |
| Jotai | Creciendo | Estado atómico, estado complejo interdependiente, estado de formularios |
| TanStack Query | ~5M | Server state (caching, fetching, sincronización) |

**Stack recomendado para la mayoría de las aplicaciones en 2026**: TanStack Query + Zustand + React Hook Form. Esto cubre más del 90% de las necesidades de gestión de estado.

Redux Toolkit sigue siendo dominante en grandes aplicaciones empresariales, pero rara vez se elige para proyectos nuevos.

### Ecosistema Vue

- **Pinia**: El gestor de estado oficial de Vue. Simple, type-safe, integrado con devtools.

### Ecosistema Angular

- **Signals**: Primitiva de reactividad de primera clase, reemplazando cada vez más a NgRx para estado local/de componentes.
- **NgRx**: Todavía se usa para gestión de estado empresarial compleja con patrones tipo Redux.

### Comparación de Rendimiento

Signals logra actualizaciones directas del DOM en ~3ms frente a Zustand con ~12ms, Jotai con ~14ms y Redux Toolkit con ~18ms.

### Errores Comunes y Anti-patrones

- **Poner todo en el estado global.** Los valores de campos de formulario, estados de toggle de la UI, estados de hover y otros datos efímeros no pertenecen a Zustand, Redux ni a ningún store global. Usa `useState` local o bibliotecas de formularios para estado transitorio. El estado global debería reservarse para datos que genuinamente necesitan compartirse entre partes distantes del árbol de componentes.
- **Duplicar server state en stores del cliente.** Hacer fetch de datos de la API y almacenarlos manualmente en Redux o Zustand significa que estás reimplementando caching, invalidación, refetching y manejo de race conditions, y lo haces pobremente. Usa TanStack Query o SWR para server state; resuelven estos problemas de forma nativa.
- **Agregar una biblioteca de estado cuando `useState` es suficiente.** Zustand, Jotai y Redux son herramientas para problemas específicos. Una aplicación pequeña con un puñado de valores compartidos no los necesita. Agregar una biblioteca de estado a una aplicación simple introduce indirección sin beneficio. Comienza con el estado integrado de React; agrega una biblioteca cuando sientas el dolor.
- **Usar React Context para estado que se actualiza frecuentemente.** Context re-renderiza cada consumidor en cada cambio, sin forma de suscribirse a actualizaciones parciales. Usarlo para valores que cambian a menudo (p. ej., posición del mouse, frames de animación, contadores que se actualizan rápidamente) causa re-renders en cascada. Usa Zustand o Jotai para estado compartido de alta frecuencia.
- **Copiar ciegamente signals basándose en números de benchmarks.** La diferencia de 3ms vs. 18ms en micro-benchmarks es irrelevante para la mayoría de las aplicaciones. Los usuarios no pueden percibir diferencias por debajo de ~100ms. Elige tu modelo de estado basándote en la ergonomía del desarrollador y los idiomas de tu framework, no en benchmarks sintéticos de actualización.
- **No modelar los estados de loading y error explícitamente.** Representar datos asíncronos como `data | null` sin rastrear `isLoading`, `isError` y `error` lleva a estados imposibles, pantallas en blanco y fallos silenciosos. Usa uniones discriminadas (`{ status: 'loading' } | { status: 'success', data: T } | { status: 'error', error: E }`) o deja que TanStack Query modele estos por ti.
- **Bugs de stale closure en React hooks.** Referenciar estado o props dentro de `useEffect`, `useCallback` o event handlers sin incluirlos en los arrays de dependencias captura valores obsoletos. Esto produce bugs sutiles donde la UI muestra datos desactualizados o los handlers actúan sobre estado antiguo. React Compiler mitiga esto, pero entender closures sigue siendo esencial.

---

## 3. Herramientas de Compilación y Bundlers

### Vite (Estándar Dominante)

- **Vite 8** se lanzó el 12 de marzo de 2026, reemplazando Rollup con **Rolldown** (basado en Rust), logrando builds de producción 10-30x más rápidos.
- Actualizaciones de HMR en menos de 50ms independientemente del tamaño de la aplicación mediante ES modules nativos.
- Más de 800 plugins. Potencia todos los frameworks frontend principales (React, Vue, Svelte, Solid, Angular vía Analog).
- El estándar de la comunidad para nuevos proyectos.

### Turbopack

- Sucesor de Webpack basado en Rust de Vercel. Actualizaciones de HMR en menos de 10ms.
- Todavía optimizado principalmente para Next.js. Madurez beta para uso general.
- Excelentes tiempos de arranque en frío.

### Rspack

- Bundler basado en Rust, compatible con Webpack. Builds 5-10x más rápidos que Webpack.
- La mejor opción para equipos que migran grandes codebases de Webpack que necesitan compatibilidad de configuración.
- HMR en el rango de 50-200ms.

### Bun

- No es un competidor directo de Vite sino una capa complementaria. La configuración recomendada en 2026 es **Bun + Vite juntos**: Bun como gestor de paquetes y runtime, Vite como herramienta de compilación.

### esbuild

- Sigue siendo importante como el motor de transformación interno de Vite. Rara vez se usa de forma independiente para aplicaciones completas.

### Recomendación

**Comienza con Vite para cualquier nuevo proyecto frontend**. Usa Rspack si estás migrando un codebase de Webpack. Turbopack si estás atado al ecosistema de Next.js.

### Errores Comunes y Anti-patrones

- **Sobre-configurar las herramientas de compilación.** La configuración por defecto de Vite funciona para el 90% de los proyectos. Agregar opciones personalizadas de Rollup, división manual de chunks y alias de resolución a medida antes de tener un problema real crea builds frágiles difíciles de actualizar. Comienza con cero configuración y agrega solo lo que los problemas medidos demanden.
- **Infierno de plugins.** Instalar docenas de plugins de Vite/Webpack lleva a conflictos de versiones, plugins abandonados que bloquean actualizaciones y una carga de mantenimiento que se acumula con el tiempo. Cada plugin es una dependencia con su propio ciclo de lanzamiento. Audita tu lista de plugins regularmente y elimina todo lo que no esté resolviendo activamente un problema actual.
- **Archivos barrel (`index.ts` con re-exports) que derrotan el tree-shaking.** Un archivo barrel que re-exporta todo desde un directorio fuerza al bundler a incluir todo el grafo de módulos detrás de él, incluso si importas una sola función. Esto infla los tamaños de bundle y ralentiza los builds. Importa directamente desde el archivo fuente en su lugar.
- **Tratar el bundler como una caja negra.** Cuando los builds fallan o los bundles son inesperadamente grandes, los desarrolladores que nunca aprendieron cómo funciona su bundler no pueden diagnosticar el problema. Entiende los fundamentos: entry points, loaders/transforms, chunk splitting y el grafo de módulos. Usa `vite-bundle-visualizer` o `webpack-bundle-analyzer` para inspeccionar la salida.
- **Migración prematura de Webpack a Vite para codebases grandes.** Migrar un proyecto grande y muy personalizado de Webpack a Vite puede tomar meses debido a incompatibilidades de plugins, reemplazos de loaders personalizados y casos extremos en la resolución de módulos. Si el build existente de Webpack funciona, considera Rspack (compatible con Webpack, 5-10x más rápido) como un camino de menor riesgo antes de una migración completa a Vite.

---

## 4. Meta-frameworks

### Next.js (15-16)

- **67% de cuota de mercado** entre los meta-frameworks. App Router es el estándar.
- Next.js 16 estabilizó Turbopack para builds de producción y graduó Partial Prerendering hacia GA.
- Server Components + Server Actions son el modelo mental por defecto.
- Mejor para: aplicaciones React full-stack, equipos empresariales, despliegues en Vercel.

### Remix / React Router v7

- Remix se fusionó en React Router v7, trayendo sus patrones de carga de datos server-first al ecosistema React más amplio.
- Remix 3 está siendo reimaginado como un framework con baterías incluidas y sin bundler.
- Mejor para: proyectos React enfocados en estándares web, progressive enhancement.

### Nuxt (3.x)

- El meta-framework de Vue. Soporte completo de SSR/SSG/ISR, auto-imports, enrutamiento basado en archivos.
- Mejor para: equipos Vue que necesitan una solución full-stack.

### SvelteKit

- Maduró con el sistema de runes de Svelte 5. Obteniendo contratos empresariales.
- Reduce el JavaScript enviado en más de un 50% en comparación con Next.js, reduciendo a la mitad el retraso de interactividad.
- Mejor para: aplicaciones SaaS sensibles al rendimiento.

### Astro (5.x)

- **Cloudflare adquirió Astro en enero de 2026**, cambiando fundamentalmente su trayectoria.
- Arquitectura orientada al contenido. Los sitios estáticos cargan en menos de 500ms con métricas de LCP un 40-70% más bajas que Next.js optimizado con SSG.
- Arquitectura de islands: no envía JS por defecto, solo hidrata los componentes interactivos.
- Mejor para: sitios orientados al contenido, páginas de marketing, blogs, documentación.

### Analog (2.0)

- El meta-framework de Angular. Potenciado por Vite y Nitro.
- Enrutamiento basado en archivos, rutas de API, carga de datos del lado del servidor.
- Soporta Angular v17-v20 (v21 próximamente), Vite 6.x/7.x incluyendo Rolldown-Vite.

### Resumen de Estrategias de Renderizado

| Estrategia | Cuándo Usar |
|----------|-------------|
| **SSG** (Static Site Generation) | Contenido que rara vez cambia. Mejor LCP. |
| **SSR** (Server-Side Rendering) | Contenido personalizado, páginas autenticadas. |
| **ISR** (Incremental Static Regeneration) | Contenido que cambia periódicamente. Lo mejor de ambos mundos. |
| **Streaming SSR** | Páginas largas donde el contenido above-the-fold puede enviarse inmediatamente. |
| **Partial Prerendering** | Shell estático + huecos dinámicos. Específico de Next.js 16+. |

### Errores Comunes y Anti-patrones

- **Usar un meta-framework cuando no necesitas SSR.** Los dashboards internos, paneles de administración y aplicaciones detrás de autenticación no se benefician del server-side rendering (sin SEO, sin preocupación de primera carga pública). Una SPA simple con Vite es más sencilla, más rápida de desarrollar y más fácil de desplegar. No agregues la complejidad de SSR, infraestructura de servidor y bugs de hydration para una aplicación que solo usan empleados.
- **Vendor lock-in de Next.js con características específicas de Vercel.** Depender de optimizaciones específicas de Vercel (edge middleware, servicio de optimización de imágenes, integración de analytics) hace costoso o difícil migrar a otros proveedores de hosting. Si la portabilidad de plataforma importa, quédate con las características estándar de Next.js y evita las APIs exclusivas de Vercel.
- **Aplicar mal las estrategias de renderizado.** Usar SSG para datos que cambian cada pocos minutos significa contenido obsoleto o rebuilds constantes. Usar SSR para una página de marketing que nunca cambia desperdicia recursos del servidor. Ajusta la estrategia de renderizado a la frecuencia real de actualización de los datos y los requisitos de personalización usando la tabla de estrategias anterior.
- **Sobre-ingeniería con streaming SSR.** Streaming SSR agrega complejidad significativa (Suspense boundaries, estados de loading, error boundaries, diseño del shell) y solo es beneficioso cuando una página tiene una división clara entre above-the-fold y below-the-fold con dependencias de datos lentas. Para la mayoría de las páginas que cargan en menos de 1-2 segundos con SSR estándar, streaming agrega complejidad sin mejora perceptible.
- **La arquitectura de islands de Astro se desmorona cuando la mayor parte de la página es interactiva.** Astro sobresale cuando una página es mayormente contenido estático con algunos widgets interactivos. Si tu página es un 80% de componentes interactivos (dashboards, editores ricos, características en tiempo real), las islands se convierten en la mayoría en lugar de la excepción, y pierdes la ventaja central de Astro mientras luchas contra sus suposiciones orientadas al contenido. Usa un framework SPA completo en su lugar.

---

## 5. CSS y Estilos

### Tailwind CSS v4

Tailwind CSS v4 es el framework CSS utility-first dominante:

- **Oxide Engine**: Compilador incremental basado en Rust (Lightning CSS). Rebuilds completos en menos de 100ms (antes 3.5s en v3). Builds incrementales en milisegundos de un solo dígito.
- **Configuración CSS-first**: Toda la configuración del tema mediante directivas `@theme` en CSS. No se requieren archivos de configuración JavaScript.
- **Breaking changes**: `bg-linear-to-*` reemplaza a `bg-gradient-to-*`; dark mode usa por defecto `prefers-color-scheme` en lugar de basado en clases.
- **Migración**: `npx @tailwindcss/upgrade` maneja ~90% de los cambios mecánicos automáticamente.

### CSS Nativo (Listo para Producción)

Características importantes de CSS ahora soportadas en todos los navegadores evergreen (94%+ de cobertura global):

- **Container Queries**: Los componentes responden al tamaño de su contenedor, no del viewport. 85-95% de soporte global.
- **Selector `:has()`**: Selectores de padre que eliminaron cientos de líneas de JavaScript para toggling de clases.
- **Nesting nativo**: Anidamiento tipo Sass sin preprocesadores. Chrome 120+, Firefox 117+, Safari 17.2+.
- **`@layer`**: Capas de cascade para gestionar especificidad.
- **`color-mix()`**: Manipulación dinámica de colores en CSS.
- **Scroll-driven animations**: Animaciones vinculadas al scroll nativas de CSS sin JavaScript.

### Panorama de CSS-in-JS

- **CSS-in-JS con runtime en declive**: Styled Components y Emotion están perdiendo terreno debido al overhead de rendimiento en runtime y la incompatibilidad con React Server Components.
- **Alternativas de zero-runtime en crecimiento**:
  - **Panda CSS**: CSS-in-JS en tiempo de compilación del equipo de Chakra UI. Type-safe, agnóstico del framework, design tokens estructurados. ~5.8K estrellas en GitHub.
  - **vanilla-extract**: Zero-runtime, TypeScript-first CSS. Buen soporte de design tokens.
- **CSS Modules**: Sigue siendo una opción sólida, agnóstica del framework y zero-runtime.

### Recomendación

Tailwind CSS v4 para la mayoría de los proyectos. Características nativas de CSS para sitios simples. Panda CSS o vanilla-extract si necesitas estilos type-safe con design tokens. Evita nuevos proyectos con CSS-in-JS con runtime.

### Errores Comunes y Anti-patrones

- **Proliferación de clases de Tailwind.** Cuando un solo elemento tiene más de 15 clases utilitarias, la legibilidad colapsa y el mantenimiento se convierte en adivinanza. Extrae patrones repetidos en componentes (el componente de React/Vue/Svelte es la capa de abstracción), o usa `@theme` con utilidades personalizadas. El precipicio de legibilidad es real: si no puedes escanear el estilo de un elemento en 2 segundos, refactoriza.
- **El anti-patrón `@apply`.** Usar `@apply` extensivamente para componer clases de Tailwind en clases CSS derrota el propósito utility-first. Terminas con un framework CSS a medida que es más difícil de mantener que CSS vanilla. Si te encuentras escribiendo `@apply` en la mayoría de los componentes, quizás realmente no quieres CSS utility-first.
- **Mezclar múltiples enfoques de estilos en el mismo proyecto.** Tailwind para algunos componentes, CSS Modules para otros y estilos inline para un tercer conjunto crea sobrecarga cognitiva e inconsistencia. Elige un enfoque principal y úsalo consistentemente. Un enfoque secundario es aceptable para casos extremos, pero tres o más crean confusión.
- **Profundidad de anidamiento CSS.** El anidamiento nativo de CSS y el anidamiento de Sass tienen el mismo problema: los selectores profundamente anidados (4+ niveles) se vuelven frágiles, excesivamente específicos y difíciles de sobrescribir. Mantén el anidamiento a 2-3 niveles máximo. Si necesitas más, tu componente probablemente es demasiado grande y debería descomponerse.
- **Proliferación de design tokens.** Crear un token para cada valor en píxeles, tono de color e incremento de espaciado produce un sistema de tokens que es tan difícil de navegar como los valores CSS crudos. Los tokens deberían representar decisiones de diseño significativas (colores de marca, pasos de escala de espaciado, escala tipográfica), no mapeos exhaustivos a nivel de píxel. Limita el conjunto de tokens a lo que el sistema de diseño realmente usa.

---

## 6. TypeScript

### Adopción

- **El 48.8% de todos los desarrolladores profesionales** usan TypeScript (Stack Overflow 2025).
- **Tasa de satisfacción del 84.1%** entre los usuarios actuales.
- **78% de adopción en proyectos React** específicamente.
- **El 82% de las ofertas de trabajo frontend** requieren o prefieren TypeScript.
- TypeScript superó a Python y JavaScript para convertirse en **el lenguaje más usado en GitHub** en agosto de 2025.

### Rol en 2026

TypeScript es la línea base para el desarrollo frontend profesional. Escribir JavaScript plano para producción se considera un enfoque legacy. Aspectos clave:

- **Type safety de extremo a extremo**: TypeScript conecta frontend y backend mediante herramientas como tRPC, proporcionando inferencia de tipos completa a través de los límites de la API.
- **Integración con React Compiler**: React Compiler entiende los tipos de TypeScript para una mejor optimización.
- **Alineación con frameworks**: Todos los frameworks principales (React, Angular, Vue, Svelte, Solid) tienen soporte de primera clase para TypeScript.

### Mejores Prácticas

- Usa `strict: true` en `tsconfig.json`.
- Prefiere la inferencia de tipos sobre las anotaciones explícitas donde los tipos son obvios.
- Usa uniones discriminadas para el modelado de estado.
- Aprovecha el operador `satisfies` para verificación de tipos sin widening.
- Usa template literal types para validación de patrones de cadenas.
- Evita `any`; usa `unknown` cuando el tipo es genuinamente desconocido.

### Errores Comunes y Anti-patrones

- **Aserciones de tipo con `as` como muleta para silenciar errores.** Escribir `data as User` le dice al compilador "confía en mí" sin ninguna validación en runtime. Si los datos no coinciden con el tipo, obtienes errores en runtime sin advertencia en tiempo de compilación: lo peor de ambos mundos. Usa type guards, bibliotecas de validación (Zod, Valibot) o narrowing de tipos adecuado en su lugar.
- **Sobre-ingeniería de tipos genéricos.** Una firma de tipo como `type Merge<T extends object, U extends object> = Omit<T, keyof U> & U extends infer O ? { [K in keyof O]: O[K] } : never` puede ser técnicamente correcta pero es ilegible para la mayoría de los miembros del equipo. Si un tipo genérico requiere un doctorado para entenderse, simplifícalo o agrega documentación exhaustiva. La legibilidad supera a la astucia.
- **Proliferación de `@ts-ignore` / `@ts-expect-error`.** Cada supresión es un agujero en tu red de seguridad de tipos. Un codebase con docenas de estas directivas ha cambiado el valor de TypeScript por la sobrecarga de TypeScript. Registra estos como deuda técnica, corrígelos incrementalmente y bloquea nuevos en la revisión de código a menos que vayan acompañados de un comentario de justificación.
- **Confiar en los tipos en los límites del runtime.** Los tipos de TypeScript se borran en runtime. Los datos de APIs, `localStorage`, parámetros de URL, `JSON.parse` y `postMessage` son `unknown` en runtime independientemente de lo que digan tus tipos. Valida los datos externos en el límite usando Zod, Valibot o Arktype, y luego deja que TypeScript infiera el tipo validado.
- **Peculiaridades de Enum: prefiere `as const` o uniones de string literals.** Los enums de TypeScript tienen comportamiento sorprendente: los enums numéricos permiten mapeo inverso y aceptan cualquier número, `const enum` es incompatible con `isolatedModules`, y los enums son nominales (no estructuralmente compatibles). Usa objetos `as const` o tipos de unión de string literals (`type Status = 'active' | 'inactive'`) para un comportamiento más simple y predecible.
- **No habilitar `strict: true` desde el inicio.** Adaptar el modo estricto a un codebase existente significa corregir cientos o miles de errores de una vez, lo que los equipos inevitablemente posponen para siempre. Comienza cada nuevo proyecto con `strict: true` en `tsconfig.json`. El costo de la estrictez es bajo cuando se adopta desde el primer día; es enorme cuando se adapta retroactivamente.

---

## 7. Testing

### Stack Recomendado

| Capa | Herramienta | Propósito |
|-------|------|---------|
| **Tests unitarios** | Vitest | Lógica de negocio, utilidades, hooks |
| **Tests de componentes** | Vitest + Testing Library | Comportamiento de componentes de UI |
| **Tests de integración** | Vitest + MSW | Integración con API con servicios mockeados |
| **Tests E2E** | Playwright | Rutas críticas del usuario, cross-browser |

### Vitest

- El test runner estándar para tests unitarios/de componentes en proyectos basados en Vite. Ejecución casi instantánea con soporte de HMR.
- Los tests de componentes en Browser Mode ejecutan tests en navegadores reales usando Playwright o WebdriverIO.
- Compatible con la API de Jest, haciendo la migración directa.

### Playwright

- El framework E2E de Microsoft. Soporte multi-navegador (Chromium, Firefox, WebKit).
- Intercepción de red avanzada para mockear, modificar y bloquear peticiones HTTP.
- Mejor para testing cross-browser y escenarios E2E complejos.

### Cypress

- Sigue siendo fuerte para equipos que priorizan la experiencia del desarrollador y la depuración visual.
- Mejor para aplicaciones SPA-heavy con equipos centrados en JavaScript.
- Más lento que Playwright para pipelines de CI.

### Testing Library

- Agnóstico del framework (@testing-library/react, /vue, /svelte, etc.).
- Fomenta el testing desde la perspectiva del usuario (consultas por rol, etiqueta, texto).
- El estándar para testing de componentes en todos los frameworks.

### Estrategia de CI

Divide los pipelines: tests rápidos unitarios/de integración (Vitest, Testing Library, MSW) en el primer job, tests E2E más lentos (Playwright) en un segundo job que solo se ejecuta si el primero pasa.

### Errores Comunes y Anti-patrones

- **Testear detalles de implementación en lugar de comportamiento del usuario.** Testear que una función interna específica fue llamada, que el estado se estableció a un valor particular o que una clase CSS fue toggled acopla los tests a la implementación. Cuando refactorizas, cada test se rompe aunque el comportamiento no cambió. Testea lo que el usuario ve y hace: texto renderizado, envío de formularios, resultados de navegación.
- **Sobre-mockeo.** Cuando cada dependencia está mockeada, los tests pasan en aislamiento pero la aplicación está rota en producción porque los mocks no coinciden con la realidad. Mockea solo lo que debes (llamadas de red, timers, servicios de terceros) y deja que el resto se ejecute como código real. Los tests de integración con MSW son preferibles a tests unitarios con 15 imports mockeados.
- **Abuso del snapshot testing.** Los snapshots grandes de componentes se convierten en ruido que se aprueba mecánicamente: los desarrolladores ejecutan `--update` sin revisar el diff. Los snapshots son útiles para output pequeño y estable (datos serializados, mensajes de error). Para componentes de UI, usa tests basados en aserciones que verifican elementos y contenido de texto específicos.
- **Pirámide de testing invertida.** Tener muchos tests E2E lentos y pocos tests unitarios rápidos significa que la suite de tests toma más de 30 minutos, los desarrolladores dejan de ejecutarla localmente y el CI se convierte en un cuello de botella. La mayoría de los tests deberían ser tests rápidos unitarios y de componentes. Los tests E2E deberían cubrir solo los recorridos críticos del usuario (registro, checkout, flujos principales).
- **Tests inestables por dependencias de timing y race conditions asíncronas.** Los tests que usan `setTimeout`, `waitFor` con timeouts insuficientes o dependen de animation frames son inherentemente inestables. Usa las consultas `findBy` de Testing Library (que sondean el DOM), la auto-espera integrada de Playwright y timers deterministas (`vi.useFakeTimers`) en lugar de delays arbitrarios.
- **Perseguir métricas de cobertura en lugar de testear comportamiento significativo.** 100% de cobertura de código no significa código correcto: significa que cada línea fue ejecutada, no que cada comportamiento fue verificado. Un test que renderiza un componente y asevera que no lanza una excepción logra cobertura sin testear nada. Enfócate en testear lógica de negocio, casos extremos y manejo de errores.
- **Mocks de MSW que se desvían de los contratos reales de la API.** Si tus handlers de MSW retornan formas de datos que ya no coinciden con la API real, tus tests se convierten en ficción. Valida los mocks de MSW contra especificaciones OpenAPI o definiciones de esquema compartidas. Cuando la API cambia, los tests deberían fallar porque los mocks se actualizan primero.

---

## 8. Rendimiento

### Core Web Vitals (2026)

| Métrica | Qué Mide | Umbral Bueno |
|--------|-----------------|----------------|
| **LCP** (Largest Contentful Paint) | Velocidad de carga | < 2.5s |
| **INP** (Interaction to Next Paint) | Capacidad de respuesta | < 200ms |
| **CLS** (Cumulative Layout Shift) | Estabilidad visual | < 0.1 |

**INP ha reemplazado completamente a FID** como Core Web Vital, midiendo la capacidad de respuesta durante toda la visita a la página en lugar de solo la primera interacción.

### Estrategias Clave de Optimización

**Renderizado**:
- SSR/SSG reduce el LCP drásticamente (de ~4s a ~1.5s en migraciones del mundo real).
- Streaming SSR sirve el contenido above-the-fold inmediatamente mientras el resto carga.
- Partial Pre-rendering (Next.js) combina un shell estático con huecos de contenido dinámico.

**Code Splitting**:
- La división basada en rutas es la línea base. Todos los meta-frameworks lo hacen automáticamente.
- Lazy loading a nivel de componente mediante `React.lazy()`, `import()` dinámico o equivalentes del framework.

**Imágenes**:
- Formatos modernos: AVIF y WebP2 entregan archivos 40-60% más pequeños que JPEG/PNG.
- `loading="lazy"` para imágenes below-the-fold (soporte nativo del navegador).
- `fetchpriority="high"` para imágenes hero above-the-fold.
- Imágenes responsive con atributos `srcset` y `sizes`.

**JavaScript**:
- Envía menos JavaScript. Astro no envía nada por defecto. Qwik usa resumability.
- Tree-shaking mediante bundlers modernos elimina código muerto.
- React Compiler reduce los re-renders automáticamente.

### Errores Comunes y Anti-patrones

- **Optimización prematura: perfila antes de optimizar.** Memorizar cada componente, dividir cada ruta y virtualizar cada lista sin perfilar primero desperdicia tiempo de desarrollo en no-cuellos de botella. Usa el panel de Performance de las DevTools del navegador, React DevTools Profiler o Lighthouse para identificar los cuellos de botella reales antes de escribir código de optimización.
- **`loading="lazy"` en imágenes above-the-fold.** Aplicar lazy-loading a la imagen hero o al elemento LCP retrasa su descarga hasta que el intersection observer del navegador se dispara, perjudicando directamente tu puntuación de Largest Contentful Paint. Las imágenes above-the-fold deberían usar `fetchpriority="high"` y carga eager (el valor por defecto). Reserva `loading="lazy"` para imágenes below-the-fold.
- **Sobre-dividir el código (cascada de chunks pequeños).** La división agresiva de código crea una cascada: el navegador descarga el chunk A, que importa el chunk B, que importa el chunk C. Cada round-trip agrega latencia. Un bundle de 80KB carga más rápido que cuatro bundles de 20KB descargados secuencialmente. Divide por ruta, no por componente. Usa el analizador de tu bundler para detectar cascadas de chunks.
- **Benchmarks sintéticos (Lighthouse) vs. métricas de usuarios reales (CrUX/RUM).** Una puntuación de Lighthouse de 100 en tu máquina de desarrollo no dice nada sobre usuarios reales en teléfonos lentos y redes congestionadas. Usa datos del Chrome UX Report (CrUX) y Real User Monitoring (biblioteca web-vitals, tu plataforma de analytics) para entender el rendimiento real. Optimiza para el P75 de usuarios reales, no para puntuaciones sintéticas de laboratorio.
- **Scripts de terceros como el mayor cuello de botella de rendimiento sin abordar.** Analytics, widgets de chat, A/B testing, scripts de anuncios y embeds sociales a menudo contribuyen más al rendimiento deficiente que el código de tu aplicación. Audita el impacto de terceros con la insignia "Third-party" de Chrome DevTools, carga scripts no críticos con `async`/`defer` o tras la interacción del usuario, y elimina scripts que nadie usa.
- **Causas de layout shift: imágenes sin dimensiones, contenido inyectado dinámicamente, carga de fuentes.** Siempre establece los atributos `width` y `height` (o `aspect-ratio` en CSS) en imágenes y videos. Reserva espacio para anuncios y embeds con contenedores explícitos. Usa `font-display: swap` con `size-adjust` o `font-display: optional` para prevenir layout shifts por la carga de fuentes web.
- **React Compiler no es una bala mágica para mala arquitectura.** El compilador optimiza el rendimiento de renderizado auto-memorizando, pero no puede arreglar jerarquías de componentes fundamentalmente defectuosas, re-renders innecesarios causados por mal uso de context o data fetching en rutas de renderizado. Perfila primero, corrige los problemas de arquitectura, y luego deja que el compilador optimice lo que queda.

---

## 9. Accesibilidad (a11y)

### Panorama de Estándares

- **WCAG 2.2** (octubre de 2023): El estándar actual del W3C. 9 nuevos criterios de éxito mejorando la accesibilidad para discapacidades cognitivas, baja visión y usuarios móviles.
- **European Accessibility Act (EAA)**: La aplicación a nivel de la UE comenzó el 28 de junio de 2025. Requiere conformidad con EN 301 549 (que se está actualizando para incluir WCAG 2.2).
- **WCAG 3.0**: En desarrollo (esperado para 2026+). Renombrado a "W3C Accessibility Guidelines" para cubrir más que contenido web. Introduce un nuevo modelo de conformidad con requisitos fundamentales y suplementarios.

### Herramientas de Testing Automatizado

| Herramienta | Tipo | Mejor Para |
|------|------|----------|
| **axe DevTools** | Extensión de navegador / CI | Verificaciones WCAG en el navegador, biblioteca axe-core |
| **Playwright + axe** | Integración CI | Verificaciones de a11y automatizadas en tests E2E |
| **Pa11y** | CLI / CI | Monitoreo continuo, dashboards |
| **Accessibility Insights** | Toolkit de Microsoft | Evaluaciones manuales guiadas |
| **WAVE** | Extensión de navegador | Evaluación visual de accesibilidad |
| **Storybook a11y addon** | A nivel de componente | Testing de accesibilidad durante el desarrollo |

### Mejores Prácticas

- Ejecuta verificaciones automatizadas de a11y en cada PR en CI (captura ~30-40% de los problemas).
- Complementa con testing manual estructurado usando Accessibility Insights.
- Testea con tecnologías asistivas reales: NVDA, JAWS, VoiceOver.
- Usa elementos HTML semánticos en lugar de `<div>` genéricos con roles ARIA.
- Asegura la navegabilidad por teclado para todos los elementos interactivos.
- Mantén ratios de contraste de color (4.5:1 para texto normal, 3:1 para texto grande).

### Errores Comunes y Anti-patrones

- **El mal uso de ARIA es peor que no usar ARIA.** Agregar roles, estados o propiedades ARIA incorrectos confunde activamente a los lectores de pantalla y empeora la experiencia respecto a no tener ARIA en absoluto. La primera regla de ARIA es: no uses ARIA si un elemento HTML nativo proporciona la semántica que necesitas. Usa `<button>` en lugar de `<div role="button">`, `<nav>` en lugar de `<div role="navigation">`.
- **Los overlays de accesibilidad (AccessiBe, UserWay) no funcionan y pueden empeorar las cosas.** Estas herramientas afirman corregir la accesibilidad automáticamente mediante un widget JavaScript. En la práctica, rompen las características de accesibilidad existentes, confunden a los lectores de pantalla y no logran conformidad con WCAG. La National Federation of the Blind y otras organizaciones de discapacidad se han opuesto públicamente a ellos. Corrige tu markup real en su lugar.
- **Fallos en la gestión del foco en SPAs.** Cuando una single-page app cambia de rutas, abre modales o carga contenido dinámicamente, el foco a menudo se queda en el elemento anterior o se pierde por completo. Los usuarios de lectores de pantalla quedan abandonados. Gestiona el foco explícitamente: mueve el foco al encabezado de la nueva página en el cambio de ruta, atrapa el foco dentro de los modales y devuelve el foco al elemento disparador cuando los modales se cierran.
- **Transmisión de información solo mediante color.** Usar color solo para indicar errores (borde rojo), estado (verde = éxito) o campos obligatorios falla para los usuarios daltónicos (~8% de los hombres). Siempre complementa el color con texto, iconos o patrones. Los mensajes de error deberían ser texto explícito, no solo un borde rojo en un input.
- **`outline: none` sin una alternativa de foco visible.** Eliminar el outline de foco por defecto por razones estéticas hace la interfaz inutilizable para usuarios que solo usan teclado y no pueden ver qué elemento tiene el foco. Si eliminas el outline por defecto, debes proporcionar un indicador de foco visible personalizado (p. ej., `outline: 2px solid`, box-shadow, o un cambio de borde visible en `:focus-visible`).
- **No testear con usuarios reales con discapacidades.** Las herramientas automatizadas capturan el 30-40% de los problemas de accesibilidad. El testing manual del desarrollador captura más pero pierde la experiencia vivida. Presupuesta pruebas de usabilidad con usuarios reales de lectores de pantalla, usuarios que solo usan teclado y usuarios con discapacidades motoras al menos una vez por lanzamiento de característica importante. Su feedback revela problemas que ninguna herramienta puede detectar.

---

## 10. Sistemas de Diseño y Bibliotecas de Componentes

### Patrón Headless UI

El patrón dominante en 2026: **primitivas de componentes sin estilo y accesibles** que tú mismo estilizas.

| Biblioteca | Soporte de Frameworks | Notas |
|---------|-------------------|-------|
| **Radix UI** | Solo React | 130M descargas mensuales. La biblioteca headless más grande. La cadencia de actualizaciones se ralentizó tras la adquisición por WorkOS. |
| **Base UI** | React | Respaldada por MUI, ingeniería dedicada a tiempo completo. Alternativa creciente a Radix. |
| **Ark UI** | React, Vue, Solid | Máquinas de estado basadas en XState. La mejor biblioteca headless cross-framework. |
| **Headless UI** | React, Vue | Proyecto de Tailwind Labs. Enfocada en la integración con Tailwind. |
| **React Aria** | React | Primitivas accessibility-first de Adobe. La cobertura de a11y más completa. |

### shadcn/ui

- **75K estrellas en GitHub** y creciendo. No es una biblioteca de componentes: es una colección de componentes de copiar y pegar que tú posees.
- Ahora soporta tanto Radix como Base UI como capas de primitivas (no está atado a ninguno).
- Se agregó un Visual Builder para generar componentes.
- Originó el patrón de "UI de copiar y pegar" que muchas otras bibliotecas ahora siguen.

### Design Tokens (Estándar W3C)

La **Design Tokens Specification (2025.10)** alcanzó su primera versión estable en octubre de 2025:

- Formato agnóstico del proveedor para compartir decisiones de diseño entre herramientas y plataformas.
- Soporta tematización, multi-marca, modos claro/oscuro, variantes de accesibilidad.
- Soporte completo para espacios de color Display P3, Oklch y CSS Color Module 4.
- Cross-platform: un archivo de tokens genera código para iOS, Android, web y Flutter.
- Adoptado por Figma, Penpot, Sketch, Framer, Supernova, zeroheight y otros.

### Errores Comunes y Anti-patrones

- **Creación prematura de sistema de diseño.** Construir un sistema de diseño antes de tener suficiente superficie de producto significa codificar suposiciones que estarán equivocadas. Necesitas al menos 3-5 superficies de producto distintas usando patrones similares antes de que las abstracciones se vuelvan claras. Comienza con una carpeta de componentes compartidos; formaliza en un sistema de diseño cuando los patrones se repitan entre equipos.
- **El equipo del sistema de diseño convirtiéndose en un cuello de botella de bloqueo.** Cuando cada cambio de componente requiere un PR al repositorio del sistema de diseño, revisión por el equipo del sistema de diseño y un ciclo de lanzamiento, los equipos de producto se ralentizan enormemente. Habilita la contribución de los equipos de producto con guías claras, testing automatizado y un proceso de revisión rápido. El equipo del sistema de diseño debería ser un habilitador, no un gatekeeper.
- **Deriva de componentes de copiar y pegar (patrón shadcn sin gobernanza).** El modelo de shadcn de poseer componentes copiados es poderoso, pero sin gobernanza lleva a 15 variantes diferentes de Button entre equipos, cada una desviándose del original. Establece un mecanismo de sincronización: auditorías periódicas, un upstream compartido o verificaciones automatizadas que señalen la divergencia de la implementación canónica.
- **Mal uso de componentes headless: eliminando comportamiento de accesibilidad durante la estilización personalizada.** Los componentes headless como Radix, React Aria y Ark UI proporcionan manejo de teclado, gestión de foco y atributos ARIA de forma nativa. Cuando los desarrolladores sobrescriben o eliminan estos comportamientos durante la estilización personalizada (eliminando event handlers, sobrescribiendo roles, ocultando indicadores de foco), el componente se vuelve menos accesible que un simple `<div>`. Preserva la capa de comportamiento del componente headless; solo personaliza la capa visual.
- **Riesgo de dependencia de biblioteca de componentes.** Construir todo tu producto sobre una biblioteca de componentes de terceros crea un punto único de fallo. Las bibliotecas se adquieren (Radix/WorkOS), se abandonan o cambian de dirección. Mitiga esto con una capa de abstracción (tu propia API de componentes que envuelve la biblioteca), para que intercambiar la implementación subyacente no requiera reescribir cada consumidor.

---

## 11. Patrones de API

### La Realidad Multi-Protocolo

La mayoría de las aplicaciones en 2026 usan una combinación de enfoques de API:

| Patrón | Mejor Para | Adopción |
|---------|----------|----------|
| **REST** | APIs públicas, webhooks, integraciones de terceros | Estándar universal |
| **tRPC** | APIs internas con frontend/backend en TypeScript | 15% de las ofertas de trabajo, creciendo rápido |
| **GraphQL** | Patrón BFF, móvil/web con diferentes necesidades de datos | Maduro, adopción estable |
| **gRPC** | Servicio a servicio, microservicios de alto rendimiento | Enfocado en backend |

### Arquitectura Típica de 2026

- **tRPC** para la API principal de la aplicación (operaciones autenticadas orientadas al usuario): proporciona type safety de extremo a extremo con cero generación de código.
- **REST** para asuntos externos (webhooks, callbacks de OAuth, health checks, datos públicos).
- **GraphQL** como BFF (Backend for Frontend) cuando móvil y web necesitan formas de datos fundamentalmente diferentes.

### Patrón BFF (Backend for Frontend)

- Reconoce que los clientes móviles y web tienen necesidades diferentes.
- Móvil: payloads pequeños y distintos (conservación de batería/datos).
- Web: cargas de datos más ricas, capacidades de prefetching.
- GraphQL sobresale aquí al permitir que cada cliente solicite exactamente lo que necesita.

### Recomendación

Para la mayoría de las aplicaciones full-stack en TypeScript: **tRPC para proyectos nuevos**. Para APIs públicas o consumidores multi-lenguaje: REST. Para escenarios complejos con múltiples clientes: GraphQL como capa BFF.

### Errores Comunes y Anti-patrones

- **Queries N+1 de GraphQL y ataques de complejidad de queries.** Sin limitación de profundidad de queries y patrones de dataloader, una sola query de GraphQL puede desencadenar cientos de consultas a la base de datos (problema N+1) o permitir que clientes maliciosos creen queries profundamente anidadas que sobrecarguen el servidor. Implementa análisis de complejidad de queries, límites de profundidad y dataloaders desde el primer día, no después de incidentes en producción.
- **tRPC filtrando detalles de implementación del backend a través del límite de tipos.** La type safety de extremo a extremo de tRPC es su fortaleza, pero también puede exponer esquemas internos de base de datos, estructuras de error y detalles de implementación al frontend si los tipos no se curan deliberadamente. Define tipos de entrada/salida explícitos para tus procedures en lugar de pasar tipos crudos de Prisma/Drizzle al cliente.
- **Sobre-ingeniería de la capa de API.** Usar GraphQL para una aplicación CRUD simple con un solo tipo de cliente agrega definición de esquemas, boilerplate de resolvers, generación de código y complejidad de caching que REST maneja trivialmente. GraphQL rinde frutos cuando múltiples clientes necesitan diferentes formas de datos. Para un solo frontend web hablando con un solo backend, tRPC o REST es más simple y suficiente.
- **Ejecutar demasiados patrones de API simultáneamente.** Tener REST, GraphQL, tRPC y WebSockets todos sirviendo al mismo frontend crea sobrecarga cognitiva para cada desarrollador. Cada patrón tiene sus propias convenciones, manejo de errores, estrategias de caching y herramientas de depuración. Limita a dos patrones máximo (p. ej., tRPC para la API de la app + REST para webhooks/externo) y ten reglas claras sobre cuándo usar cada uno.
- **Errores de REST: nombrado inconsistente, códigos de estado incorrectos, APIs charlatanas.** Mezclar `camelCase` y `snake_case`, devolver 200 para errores, crear endpoints para cada vista de la UI (API charlatana) y formatos de paginación inconsistentes hacen que las APIs REST sean dolorosas de consumir. Sigue una guía de estilo (JSON:API, Google API Design Guide), usa códigos de estado HTTP correctos y diseña endpoints orientados a recursos.

---

## 12. Experiencia del Desarrollador

### Linting y Formateo

**Biome** es el retador emergente de ESLint + Prettier:

- Un solo binario, un archivo de configuración (`biome.json`), reemplaza ESLint + Prettier + sus plugins.
- **10-25x más rápido**: Linting de 10K archivos en 0.8s (vs 45.2s de ESLint). Formateo de 10K archivos en 0.3s (vs 12.1s de Prettier).
- 423+ reglas de lint en v2.x, incluyendo linting type-aware.
- Funcionalidad completa para proyectos React/TypeScript.

**ESLint v10** (febrero de 2026):

- Flat config (`eslint.config.js`) es el único formato soportado. `.eslintrc` está completamente deprecado.
- La nueva API de language plugins permite soporte de primera clase para lenguajes no-JavaScript.
- El ecosistema más fuerte de plugins sigue siendo su ventaja clave sobre Biome.

**Recomendación**: Biome para proyectos nuevos que buscan simplicidad y velocidad. ESLint para equipos que necesitan reglas personalizadas o soporte de plugins de nicho.

### Dev Servers y HMR

- El dev server de Vite con ES modules nativos proporciona HMR en menos de 50ms independientemente del tamaño del proyecto.
- React Fast Refresh, Vue HMR, Svelte HMR funcionan perfectamente a través de Vite.
- Turbopack logra HMR en menos de 10ms dentro de Next.js.

### Gestión de Paquetes

- **Bun** como gestor de paquetes: los tiempos de instalación más rápidos, ejecución integrada de TypeScript.
- **pnpm**: uso eficiente del disco mediante content-addressable storage, gestión estricta de dependencias.
- **npm**: estándar universal, aún el más compatible.

### Errores Comunes y Anti-patrones

- **Fatiga por cambio constante de herramientas.** Cambiar de ESLint a Biome, luego al siguiente linter, mientras también se migra de Jest a Vitest y de npm a pnpm a Bun, todo en el mismo trimestre, quema la energía del equipo en yak-shaving en lugar de entregar funcionalidades. Evalúa los costos de cambio frente a las ganancias marginales. Migra herramientas de una en una, solo cuando la herramienta actual es un cuello de botella medible.
- **Sobre-linting.** Cuando los desarrolladores pasan más tiempo luchando contra el linter que escribiendo código, el linter se ha vuelto contraproducente. Las reglas que imponen preferencias de estilo arbitrarias (sin ternarios, longitud máxima de línea de 80, destructuring forzado) generan ruido sin detectar bugs. Mantén las reglas de lint enfocadas en corrección y consistencia; deja que el formateador maneje el estilo. Desactiva las reglas que el equipo sobrescribe consistentemente.
- **Falsa confianza del HMR.** El código que funciona perfectamente con Hot Module Replacement puede romperse en un refresh completo de página porque HMR preserva el estado a nivel de módulo, closures y el orden de inicialización que un arranque en frío no preserva. Haz refreshes completos periódicamente durante el desarrollo. El CI siempre debería testear contra builds frescos, no contra estado actualizado por HMR.
- **Dependencias fantasma.** npm y Bun permiten importar paquetes que no están en tu `package.json` si resultan estar hoisted desde una dependencia transitiva. Esto funciona hasta que la dependencia transitiva se actualiza o se elimina, y entonces tu build se rompe sin causa obvia. El modo estricto de pnpm detecta esto. Si usas npm o Bun, audita las importaciones contra `package.json` periódicamente.
- **Complejidad de monorepo adoptada sin entender los compromisos.** Los monorepos (Turborepo, Nx, pnpm workspaces) resuelven problemas reales para organizaciones multi-paquete, pero introducen complejidad de orquestación de builds, gestión de caché de CI y requisitos de herramientas que los equipos pequeños no necesitan. Un monorepo para un equipo de 3 trabajando en una sola aplicación es sobrecarga sin beneficio. Comienza con un repositorio simple; adopta un monorepo cuando tengas múltiples paquetes con dependencias compartidas.

---

## Principios Transversales (Agnósticos del Framework)

1. **Envía menos JavaScript**: Cada byte de JS tiene un costo. Usa server rendering, code splitting y tree-shaking agresivamente.
2. **Tipifica todo**: TypeScript ya no es opcional para el trabajo profesional.
3. **Separa server state de client state**: Usa herramientas dedicadas para cada uno (TanStack Query + Zustand/Pinia/signals).
4. **Testea en capas**: Tests unitarios rápidos para lógica, tests de componentes para comportamiento, E2E mínimo para rutas críticas.
5. **Accesibilidad desde el primer día**: Es más barato construir accesible que adaptar después. Automatiza lo que puedas, testea manualmente el resto.
6. **Usa la plataforma**: Las características nativas de CSS (nesting, container queries, `:has()`) reducen la dependencia de herramientas.
7. **Abraza lo server-first**: Server Components, streaming SSR y edge rendering son la dirección de la industria.
8. **Los sistemas de diseño escalan equipos**: Primitivas headless + design tokens + componentes de copiar y pegar (patrón shadcn) es la fórmula ganadora.
9. **Compiladores sobre convenciones**: React Compiler, el compilador de Svelte, Vue Vapor: deja que la herramienta optimice en lugar del desarrollador.
10. **Progressive enhancement**: Construye para la línea base, mejora por capacidad. Funciona tanto para rendimiento como para accesibilidad.

### Meta Anti-patrones

- **Desarrollo impulsado por el currículum.** Elegir tecnologías porque quedan bien en el currículum en lugar de porque resuelven los problemas reales del proyecto lleva a sistemas sobre-ingenierizados y difíciles de mantener. El equipo que entrega una aplicación React bien construida supera al equipo que lucha con un stack de última generación que eligieron por señalización profesional. Optimiza para el proyecto, no para tu perfil de LinkedIn.
- **Presupuesto de complejidad.** Cada herramienta, biblioteca, abstracción y patrón tiene un costo: curva de aprendizaje, carga de mantenimiento, fricción de actualizaciones y sobrecarga cognitiva. Trata la complejidad como un presupuesto finito. Agregar GraphQL, un sistema de diseño, un monorepo y micro-frontends a un nuevo proyecto gasta todo el presupuesto antes de que se entregue la primera funcionalidad. Cada adición debe justificar su costo frente a la alternativa de no agregarla.
- **La trampa de la reescritura.** Las reescrituras completas consistentemente entregan menos de lo prometido y se exceden en plazo. El codebase existente codifica años de casos extremos, correcciones de bugs y conocimiento del dominio que el equipo de reescritura redescubrirá por las malas. Prefiere la migración incremental (patrón strangler fig): reemplaza un módulo, ruta o capa a la vez mientras mantienes el sistema existente funcionando. Las reescrituras solo se justifican cuando el sistema existente no puede cambiarse incrementalmente (p. ej., framework muerto, sin tests, sin autores originales).
- **Ignorar el nivel de habilidad del equipo.** La mejor herramienta es la que el equipo puede usar efectivamente. Adoptar herramientas basadas en Rust, patrones de programación funcional o generics avanzados de TypeScript cuando el equipo carece de experiencia en esas áreas produce peores resultados que usar herramientas más simples que el equipo ya conoce. Invierte en capacitación antes de adoptar tecnología desconocida, o elige tecnología que coincida con las capacidades actuales del equipo.
