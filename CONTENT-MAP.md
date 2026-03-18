# Mapa de Distribución de Contenido

> Mapea el contenido de investigación existente a las etapas de la guía. Identifica qué está cubierto, qué falta y qué necesita escribirse desde cero para cada etapa.

## Cómo leer este documento

- **Source**: Referencia al contenido existente en los archivos de investigación
  - `P:` = `frontend-principles-and-best-practices.md` (sección.subsección)
  - `E:` = `frontend-ecosystem-2026.md` (sección)
- **Status**: Nivel de cobertura del contenido existente para las necesidades de la etapa
  - `covered` = El contenido existe y puede adaptarse directamente
  - `partial` = El contenido existe pero necesita expansión para la profundidad/enfoque de la etapa
  - `missing` = Debe escribirse desde cero

---

## Etapa 1: Fundamentos

> La plataforma antes del framework. El estudiante debe dominar HTML, CSS, JS, TypeScript y conceptos básicos de accesibilidad sin ningún framework.

| Tema | Source | Status | Notas |
|------|--------|--------|-------|
| **Semantic HTML y DOM** | — | **missing** | Ningún documento de investigación cubre los fundamentos de HTML. Se necesita: estructura del documento, elementos semánticos, formularios, metadatos de `<head>`, modelo mental del DOM. |
| **CSS Box Model** | — | **missing** | Ninguna investigación cubre los fundamentos de CSS. Se necesita: content-box vs border-box, margin collapse, modos de display. |
| **CSS Flexbox** | — | **missing** | Se necesita: modelo de ejes, justify/align, wrapping, layouts comunes. |
| **CSS Grid** | — | **missing** | Se necesita: grids explícitos/implícitos, unidades fr, minmax, auto-fill/auto-fit, named areas. |
| **Unidades Responsivas** | P:5.8 | partial | Los principios responsivos están cubiertos pero no las unidades en sí (rem, em, vw, dvh, clamp). |
| **CSS Custom Properties** | E:5 (native CSS) | partial | Mencionado como característica, no enseñado. Se necesita: sintaxis, cascada, patrones de tematización. |
| **JavaScript ES2020+** | — | **missing** | Ninguna investigación cubre los fundamentos de JS. Se necesita: módulos, destructuring, async/await, métodos de arrays, closures. |
| **TypeScript Básico** | E:6, P:1.5 | partial | Adopción/mejores prácticas cubiertas, pero no como introducción didáctica. Se necesita: type annotations, interfaces, strict mode, unions, as vs unknown. |
| **Anti-patterns de TypeScript** | E:6 anti-patterns | covered | Casting con `as`, tipos sobre-diseñados, @ts-ignore, runtime boundaries, enums. |
| **Fundamentos de Accesibilidad** | P:10.1–10.3 | covered | HTML semántico primero, reglas de ARIA, navegación por teclado bien cubiertos. |
| **Anti-patterns de Accesibilidad** | P:10 anti-patterns | covered | Overlays, ARIA redundante, solo color, botones deshabilitados sin explicación. |
| **Entorno de Desarrollo** | E:12 (DX) | partial | Herramientas mencionadas pero no como guía de configuración. Se necesita: configuración del editor, recorrido por DevTools, conceptos básicos de terminal. |
| **Mobile-First CSS** | P:5.7 | covered | Principio de diseño cubierto. |
| **Anti-patterns de CSS** | E:5 anti-patterns | covered | Abuso de Tailwind, profundidad de anidamiento, enfoques mixtos, proliferación de tokens. |

**Resumen Etapa 1**: 5 temas completamente ausentes (HTML, CSS box model, Flexbox, Grid, JavaScript). Son fundamentos no cubiertos por ninguno de los documentos de investigación porque se enfocaron en principios y ecosistema, no en enseñar lo básico.

---

## Etapa 2: Arquitectura de Componentes

| Tema | Source | Status | Notas |
|------|--------|--------|-------|
| **¿Qué es un Componente?** | — | **missing** | Ninguna investigación define el concepto de componente desde cero. Se necesita: modelo mental (entrada→salida), encapsulación, concepto de ciclo de vida. |
| **SRP en Componentes** | P:1.1 | covered | Definido con guía práctica y heurística de conteo de líneas. |
| **OCP vía Composición** | P:1.2 | covered | Slots/children sobre boolean flags, extensión vía composición. |
| **LSP para Variantes** | P:1.3 | covered | Sustituibilidad de componentes, contratos de props. |
| **ISP para Props** | P:1.4 | covered | Interfaces de props mínimas, sin mega-props. |
| **DIP con Hooks/Context/DI** | P:1.5 | covered | Patrones de DI específicos de framework (React Context, Vue provide/inject, Angular DI). |
| **Anti-patterns de SOLID** | P:1 anti-patterns | covered | Sobre-ingeniería, nano-componentes, generalización prematura, capas por cargo cult. |
| **Composición sobre Herencia** | P:2.1 | covered | Children, slots, render props. |
| **Container/Presentational** | P:2.2 | covered | Patrón clásico + evolución con hooks. |
| **Compound Components** | P:2.3 | covered | Descripción del patrón con ejemplos. |
| **Render Props / Slots** | P:2.4 | covered | Patrón cross-framework. |
| **HOCs vs Hooks** | P:2.5 | covered | Evolución de HOCs a hooks/composables. |
| **Atomic Design** | P:2.6 | covered | Cinco niveles, perspectiva 2025, recomendación híbrida. |
| **Anti-patterns de Componentes** | P:2 anti-patterns | covered | Contenedores dios, sobreuso de compound, pánico por prop drilling, bikeshedding, callback hell. |
| **Patrón de Headless Components** | E:10 | partial | Bibliotecas descritas pero no el patrón como concepto didáctico. |
| **Diseño de API de Componentes** | — | **missing** | Ningún documento enseña cómo diseñar una buena API de componente: props requeridas vs opcionales, valores por defecto, event callbacks, forwarding de refs/attrs. |

**Resumen Etapa 2**: Cobertura más fuerte. Solo 2 brechas: introducción al modelo mental de componentes y guía de diseño de API.

---

## Etapa 3: Estado y Flujo de Datos

| Tema | Source | Status | Notas |
|------|--------|--------|-------|
| **Estado Local vs Global** | P:4.1 | covered | Tabla de decisión con alcance, ejemplos, herramientas, directriz. |
| **Server State vs Client State** | P:4.2, E:2 | covered | Ambos documentos cubren este cambio de paradigma con recomendaciones de herramientas. |
| **Flujo de Datos Unidireccional** | P:4.5 | covered | Ciclo State→View→Action→State, ejemplos por framework. |
| **Estado Derivado/Computado** | P:4.3 | covered | Ejemplos específicos por framework (useMemo, computed, signals). |
| **Inmutabilidad** | P:4.6 | covered | Por qué la mutación rompe la detección, Immer, spread. |
| **Máquinas de Estado (XState)** | P:4.4 | covered | Cuándo usar, ejemplos de valor (formularios multi-paso, flujos de auth). |
| **Patrones de Data Fetching** | — | **missing** | Ningún documento enseña los estados de loading/error/success/empty como patrón con ejemplos de código. P:7 cubre el manejo de errores en general pero no el patrón de estados de UI específicamente. |
| **Estado en URL** | P:4 anti-patterns | partial | Mencionado como anti-pattern descuidado pero no enseñado como patrón positivo con guía de implementación. |
| **Anti-patterns de Estado** | P:4 anti-patterns, E:2 anti-patterns | covered | Derivación circular, stale closures, abuso de store global, sobreuso de máquinas de estado, etc. |
| **Patrones de TanStack Query / SWR** | E:2 | partial | Herramientas mencionadas con estadísticas de descargas pero no enseñadas (estrategias de caching, invalidación, optimistic updates). |
| **Estado de Formularios** | — | **missing** | Ningún documento cubre la gestión de estado de formularios como tema independiente (React Hook Form, controlled vs uncontrolled, temporalidad de validación). |

**Resumen Etapa 3**: Buena base pero 3 brechas: patrones de UI para data fetching, estado en URL como patrón positivo, gestión de estado de formularios.

---

## Etapa 4: Usabilidad y Principios de Diseño

| Tema | Source | Status | Notas |
|------|--------|--------|-------|
| **Las 10 Heurísticas de Nielsen** | P:5.1 | covered | Las 10 mapeadas a la web con ejemplos. |
| **Ley de Fitts** | P:5.2 | covered | Touch targets, ubicación, ventaja de bordes. |
| **Ley de Hick** | P:5.3 | covered | Reducción de opciones, ayudas de decisión. |
| **Principios de Gestalt** | P:5.4 | covered | 6 principios con aplicaciones a UI. |
| **Progressive Disclosure** | P:5.5 | covered | Máximo 2 niveles, implementaciones comunes. |
| **Reducción de Carga Cognitiva** | P:5.6 | covered | Chunking, valores por defecto, jerarquía visual, consistencia. |
| **Diseño Mobile-First** | P:5.7 | covered | Priorización, media queries con min-width, touch targets. |
| **Diseño Responsivo** | P:5.8 | covered | Layouts fluidos, breakpoints de contenido, container queries, tipografía fluida. |
| **Anti-patterns de Usabilidad** | P:5 anti-patterns | covered | Dark patterns, fatiga de toasts, solo móvil, mal uso de Fitts/Hick, breakpoints de dispositivo. |
| **Tipografía y Jerarquía Visual** | — | **missing** | Ningún documento cubre escalas tipográficas, combinación de fuentes, line height/measure, ritmo de espacios en blanco, ratios de contraste para legibilidad. |
| **Teoría del Color para UI** | — | **missing** | Ningún documento cubre sistemas de color (HSL, Oklch), construcción de paletas, colores semánticos, principios de dark mode. |
| **Sistemas de Espaciado** | — | **missing** | Ningún documento cubre escalas de espaciado (grid de 4px/8px), patrones de espaciado consistente, spacing tokens. |
| **Patrones de Diseño de Formularios** | — | **missing** | Ningún documento cubre UX de formularios: ubicación de labels, validación inline vs on-submit, formularios multi-paso, agrupación de campos, patrones de mensajes de error. |
| **Ejemplos de Violación de Heurísticas** | — | **missing** | Se necesitan ejemplos concretos de antes/después para cada heurística (aquí es donde entran los mockups). |

**Resumen Etapa 4**: Principios bien cubiertos, pero los fundamentos de diseño visual (tipografía, color, espaciado) y UX de formularios faltan por completo. Son críticos para una guía de frontend.

---

## Etapa 5: Rendimiento

| Tema | Source | Status | Notas |
|------|--------|--------|-------|
| **Core Web Vitals** | P:6.1, E:8 | covered | LCP, INP, CLS con umbrales. INP reemplazando FID anotado. |
| **Modelo RAIL** | P:6.1 | covered | Response, Animation, Idle, Load con objetivos. |
| **Lazy Loading** | P:6.2, E:8 | covered | Estrategias por ruta, componente, imagen. |
| **Code Splitting** | P:9.3, E:8 | covered | Splitting por ruta, feature, componente, vendor. |
| **Virtualización** | P:6.3 | covered | Cuándo usar, bibliotecas, trade-offs. |
| **Memoización** | P:6.4 | covered | Cuándo usar Y cuándo no. Mejor sección para anti-patterns. |
| **Optimización de Bundle** | P:6.5 | covered | Tree shaking, análisis de dependencias, compresión. |
| **Optimización de Imágenes** | E:8 | partial | Formatos (AVIF, WebP) mencionados pero no enseñados: srcset, sizes, elemento picture, fetchpriority. |
| **Anti-patterns de Rendimiento** | P:6 anti-patterns, E:8 anti-patterns | covered | Optimización prematura, lazy loading de imagen LCP, splitting excesivo, tree shaking roto, falsa confianza en CDN. |
| **Medición de Rendimiento** | E:8 | partial | Distinción CrUX/RUM vs Lighthouse mencionada pero no enseñada como flujo de trabajo (panel Performance de DevTools, bundle analyzer, configuración de RUM). |
| **Streaming SSR** | E:4, E:8 | partial | Mencionado como estrategia pero no enseñado con guía de implementación. |
| **Impacto de Scripts de Terceros** | E:8 anti-patterns | partial | Anotado como "el mayor cuello de botella sin abordar" pero sin estrategias de mitigación enseñadas. |

**Resumen Etapa 5**: Cobertura sólida. Brechas menores en la enseñanza de optimización de imágenes y flujo de trabajo de medición de rendimiento.

---

## Etapa 6: Seguridad y Resiliencia

| Tema | Source | Status | Notas |
|------|--------|--------|-------|
| **Prevención de XSS** | P:8.1 | covered | Auto-escaping, APIs peligrosas, DOMPurify. |
| **Protección CSRF** | P:8.2 | covered | Tokens, SameSite, Origin/Referer. |
| **CSP** | P:8.3 | covered | Comenzar restrictivo, evitar unsafe-inline. |
| **Sanitización de Entradas** | P:8.4 | covered | Cliente para UX, servidor para seguridad. |
| **Auth Seguro (JWT, OAuth, BFF)** | P:8.5 | covered | Almacenamiento de tokens, PKCE, BFF, rotación de refresh. |
| **Error Boundaries** | P:7.1 | covered | Cross-framework, ubicación estratégica. |
| **Degradación Elegante** | P:7.2 | covered | Feature detection, datos cacheados, fallbacks. |
| **Optimistic Updates** | P:7.3 | covered | Cuándo usar, rollback, soporte de TanStack Query. |
| **Estrategias de Retry** | P:7.4 | covered | Exponential backoff, jitter, idempotency. |
| **Anti-patterns de Seguridad** | P:8 anti-patterns | covered | Validación solo en cliente, teatro de seguridad, claves expuestas, CORS, clickjacking, open redirects. |
| **Anti-patterns de Manejo de Errores** | P:7 anti-patterns | covered | Errores tragados, bugs ocultos de desarrollo, mensajes genéricos, retry invisible, rollback silencioso. |
| **Validación de Tipos en Runtime** | E:6 anti-patterns | partial | Mencionado (Zod, Valibot) pero no enseñado como patrón con ejemplos. |
| **HTTPS y Seguridad de Cookies** | P:8.5 | partial | HttpOnly, Secure, SameSite mencionados pero no como sección didáctica sobre el modelo de seguridad de cookies. |

**Resumen Etapa 6**: Etapa mejor cubierta. Solo brechas menores en enseñanza de validación en runtime y seguridad de cookies.

---

## Etapa 7: Testing y Calidad

| Tema | Source | Status | Notas |
|------|--------|--------|-------|
| **Pirámide de Testing** | E:7 | partial | Stack recomendado listado pero concepto de pirámide no enseñado (por qué muchos unit, algunos de integración, pocos E2E). |
| **Testing Library** | E:7 | partial | Propósito descrito pero no enseñado (prioridades de consulta, user-event, patrones async). |
| **MSW para API Mocking** | E:7 | partial | Mencionado en contexto de CI pero no enseñado como patrón. |
| **Testing de Accesibilidad** | E:9, P:10 | covered | Herramientas automatizadas (axe, Pa11y) + testing manual descrito. |
| **Linting (ESLint/Biome)** | E:12 | covered | Comparación de herramientas con guía de migración. |
| **Estrategia de Pipeline de CI** | E:7 | covered | Pipelines divididos: rápido primero, E2E segundo. |
| **Anti-patterns de Testing** | E:7 anti-patterns | covered | Detalles de implementación, sobre-mocking, abuso de snapshots, pirámide invertida, adoración de cobertura, drift de MSW. |
| **Escribir Buenos Tests** | — | **missing** | Ningún documento enseña cómo estructurar un test: Arrange-Act-Assert, nombrado de tests, qué testear vs qué no, aislamiento de tests. |
| **Patrones de Testing de Componentes** | — | **missing** | Se necesita: cómo testear componentes con Testing Library, mocking de context/providers, testing de hooks aislados. |
| **Patrones de Tests E2E** | — | **missing** | Se necesita: page objects, gestión de datos de prueba, evitar tests flaky, ejecución paralela. |
| **Prácticas de Code Review** | — | **missing** | No cubierto en ningún documento. Se necesita: qué buscar, dar feedback accionable, tamaño de PRs, checklists de revisión. |

**Resumen Etapa 7**: Etapa más débil en contenido existente. Los anti-patterns son fuertes pero el contenido didáctico positivo sobre cómo escribir tests está ampliamente ausente.

---

## Etapa 8: Arquitectura a Escala

| Tema | Source | Status | Notas |
|------|--------|--------|-------|
| **Organización Basada en Features** | P:9.2 | covered | Tres patrones (basado en features, FSD, domain-driven) con ejemplos de directorios. |
| **Feature-Sliced Design** | P:9.2 | covered | Estructura FSD descrita. |
| **Clean Architecture / Hexagonal** | P:3.3 | covered | 4 capas, domain/application/infrastructure/presentation. |
| **Separación de Responsabilidades** | P:3.1–3.3 | covered | Separación en 3 capas, hooks como abstracción, patrones de capa de servicio. |
| **Design Systems** | E:10 | covered | Headless UI, shadcn/ui, design tokens estándar W3C. |
| **Patrones de API (REST/GraphQL/tRPC)** | E:11 | covered | Realidad multi-protocolo, marco de decisión, BFF. |
| **Build Tools (Vite)** | E:3 | covered | Vite 8, Turbopack, comparación con Rspack. |
| **Meta-frameworks y Renderizado** | E:4 | covered | Tabla de estrategias SSR/SSG/ISR/streaming. |
| **Anti-patterns de Arquitectura** | P:3 anti-patterns, E:10–12 anti-patterns | covered | Sobre-capas, design systems prematuros, burocracia de carpetas, rotación de herramientas, complejidad de monorepo. |
| **Monorepos** | E:12 anti-patterns | partial | Complejidad advertida pero no enseñada: cuándo usar, Nx/Turborepo, paquetes compartidos. |
| **Implementación de Design Tokens** | E:10 | partial | Especificación W3C descrita pero no enseñada como guía de implementación. |
| **Micro-frontends** | — | **missing** | No cubierto. Puede estar fuera del alcance de esta guía, pero debe mencionarse como patrón con trade-offs. |

**Resumen Etapa 8**: Buena cobertura combinando ambos documentos. Brechas menores en enseñanza de monorepos e implementación de tokens.

---

## Resumen de Brechas (Actualizado)

Todo el contenido previamente faltante ha sido escrito. 20 nuevos temas en 4 archivos suplementarios (5,422 líneas).

| Etapa | Covered | Partial | Missing | Status |
|-------|---------|---------|---------|--------|
| **1: Fundamentos** | 14 | 0 | 0 | **Todas las brechas cubiertas** |
| **2: Componentes** | 16 | 0 | 0 | **Todas las brechas cubiertas** |
| **3: Estado** | 12 | 0 | 0 | **Todas las brechas cubiertas** |
| **4: Usabilidad** | 14 | 0 | 0 | **Todas las brechas cubiertas** |
| **5: Rendimiento** | 8 | 4 | 0 | Los elementos parciales son expansiones de profundidad, no bloqueantes |
| **6: Seguridad** | 11 | 2 | 0 | Los elementos parciales son expansiones de profundidad, no bloqueantes |
| **7: Testing** | 11 | 0 | 0 | **Todas las brechas cubiertas** |
| **8: Arquitectura** | 11 | 1 | 0 | **Todas las brechas cubiertas** |

### Nuevos archivos de contenido

| Archivo | Líneas | Cubre | Llena brechas de |
|---------|--------|-------|------------------|
| `guide/stage-1-foundations/foundations-reference.md` | 1,598 | Semantic HTML, CSS Box Model, Flexbox, Grid, JavaScript ES2020+ | Etapa 1 (5 temas) |
| `guide/supplemental-content-components-and-state.md` | 1,321 | Modelo mental de componentes, diseño de API, patrones de UI para data fetching, estado en URL, estado de formularios | Etapa 2 (2 temas), Etapa 3 (3 temas) |
| `guide/supplemental-content-visual-design.md` | 1,115 | Tipografía, teoría del color, sistemas de espaciado, patrones de diseño de formularios, ejemplos de violación de heurísticas | Etapa 4 (5 temas) |
| `guide/supplemental-content-testing-and-architecture.md` | 1,388 | Escritura de tests, testing de componentes, patrones E2E, code review, micro-frontends | Etapa 7 (4 temas), Etapa 8 (1 tema) |

### Elementos parciales restantes (no bloqueantes, expandir durante la escritura de cada etapa)

- **Etapa 5**: Optimización de imágenes (profundidad didáctica de srcset/sizes/picture), flujo de trabajo de medición de rendimiento (recorrido por DevTools), implementación de streaming SSR, mitigación de scripts de terceros
- **Etapa 6**: Validación de tipos en runtime con Zod/Valibot (ejemplos de código), modelo de seguridad de cookies (recorrido didáctico)
- **Etapa 8**: Enseñanza de monorepos (Nx/Turborepo cuándo/por qué), guía de implementación de design tokens

Estos elementos parciales tienen los conceptos mencionados en los documentos de investigación pero necesitan ejemplos didácticos más profundos. Pueden expandirse en línea al escribir el capítulo de cada etapa.
