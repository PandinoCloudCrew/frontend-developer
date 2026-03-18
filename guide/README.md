# Guia para Desarrolladores Frontend

> Una referencia agnóstica de framework, basada en principios, para construir aplicaciones web modernas.

---

## Empieza aquí

Esta guía te lleva de los fundamentos de la plataforma web hasta arquitectura a escala en 8 etapas progresivas. Cada etapa tiene actividades de 45-60 minutos con lectura, práctica y validación concreta.

No necesitas completar todo. Elige tu ruta según tu nivel actual y objetivos.

---

## Los 3 niveles

Cada actividad está marcada con un nivel. Un principiante solo necesita completar las actividades **Esenciales** para ser productivo.

| Nivel | Icono | Qué cubre | Para quién |
|-------|:-----:|-----------|------------|
| **Esencial** | 🟢 | Lo mínimo para ser un desarrollador frontend funcional | Todos — completar primero |
| **Recomendado** | 🟡 | Profundiza en calidad, patrones y herramientas profesionales | Cuando quieras mejorar tu código |
| **Avanzado** | 🔴 | Arquitectura, escala y decisiones de equipo | Seniors, leads, o curiosos |

---

## Rutas de aprendizaje

| Ruta | Actividades | Horas | Qué incluye |
|------|:-----------:|:-----:|-------------|
| **Principiante** (solo 🟢) | 32 | ~27h | Todo lo necesario para ser productivo como desarrollador frontend |
| **Profesional** (🟢 + 🟡) | 52 | ~44h | Calidad de código, patrones avanzados, testing profesional y arquitectura |
| **Senior/Lead** (🟢 + 🟡 + 🔴) | 69 | ~58h | Arquitectura a escala, decisiones técnicas de equipo, métricas reales y validación exhaustiva |

---

## Tu Progreso

| Etapa | 🟢 Esencial | 🟡 Recomendado | 🔴 Avanzado | Ir |
|-------|:-----------:|:-------------:|:-----------:|:--:|
| 1 - Fundamentos | 0/8 | 0/2 | 0/3 | [→](./stage-1-foundations/) |
| 2 - Componentes | 0/5 | 0/2 | 0/2 | [→](./stage-2-component-architecture/) |
| 3 - Estado y Datos | 0/5 | 0/2 | 0/2 | [→](./stage-3-state-and-data/) |
| 4 - Usabilidad y Diseño | 0/4 | 0/3 | 0/2 | [→](./stage-4-usability-and-design/) |
| 5 - Rendimiento | 0/3 | 0/2 | 0/2 | [→](./stage-5-performance/) |
| 6 - Seguridad y Resiliencia | 0/4 | 0/2 | 0/1 | [→](./stage-6-security-and-resilience/) |
| 7 - Testing y Calidad | 0/3 | 0/3 | 0/2 | [→](./stage-7-testing-and-quality/) |
| 8 - Arquitectura a Escala | 0/1 | 0/4 | 0/3 | [→](./stage-8-architecture-at-scale/) |
| **Total** | **0/33** | **0/20** | **0/17** | |

---

## Las 8 Etapas

### [Etapa 1: Fundamentos](./stage-1-foundations/)
> La plataforma antes del framework.

**Qué aprenderás:** HTML semántico, CSS (box model, Flexbox, Grid), JavaScript ES2020+, TypeScript, accesibilidad y entorno de desarrollo.

**Por qué importa:** Todo framework se compila a HTML, CSS y JavaScript. Si no entiendes la plataforma, lucharás contra el framework en lugar de usarlo.

**Al completar:** Puedes construir páginas web completas, responsivas y accesibles sin ningún framework.

---

### [Etapa 2: Arquitectura de Componentes](./stage-2-component-architecture/)
> Pensar en componentes — el bloque de construcción universal.

**Qué aprenderás:** Modelo mental de componentes, SOLID aplicado a UI, composición, compound components, hooks/composables. Configuras tu primer proyecto Angular.

**Por qué importa:** Los componentes son la abstracción fundamental de todo framework moderno. Entender cómo diseñarlos, dividirlos y componerlos determina si tu código escala o se convierte en una maraña.

**Al completar:** Sabes descomponer cualquier UI en componentes, diseñar APIs de props limpias, y aplicar SOLID para mantener cada componente enfocado.

---

### [Etapa 3: Estado y Flujo de Datos](./stage-3-state-and-data/)
> Dominar los datos que impulsan tu UI.

**Qué aprenderás:** Data fetching (loading/error/success/empty), URL state, form state, server vs client state, máquinas de estado, optimistic updates.

**Por qué importa:** La mayoría de bugs en aplicaciones frontend son bugs de estado: datos desincronizados, estados imposibles, formularios que pierden datos. Entender los tipos de estado y dónde debe vivir cada uno previene estas categorías enteras de bugs.

**Al completar:** Tus aplicaciones manejan correctamente los 4 estados de datos, los filtros viven en la URL, los formularios validan con schema, y el servidor nunca se sincroniza a mano.

---

### [Etapa 4: Usabilidad y Principios de Diseño](./stage-4-usability-and-design/)
> Construir interfaces que la gente quiera usar.

**Qué aprenderás:** Tipografía, color, espaciado, heurísticas de Nielsen, leyes de Fitts/Hick/Gestalt, mobile-first, responsive design, diseño de formularios.

**Por qué importa:** Un developer que solo sabe programar pero no entiende usabilidad construye interfaces que funcionan técnicamente pero frustran al usuario. Estos principios son la diferencia entre "funciona" y "es un placer usarlo".

**Al completar:** Sabes crear sistemas de tipografía, color y espaciado consistentes. Puedes auditar una interfaz con las heurísticas de Nielsen e identificar violaciones.

---

### [Etapa 5: Rendimiento](./stage-5-performance/)
> Cada milisegundo cuenta.

**Qué aprenderás:** Core Web Vitals (LCP, INP, CLS), lazy loading, code splitting, virtualización, memoización, optimización de bundles.

**Por qué importa:** Una página que tarda 5 segundos en cargar pierde el 90% de sus usuarios. Google penaliza páginas lentas en el ranking de búsqueda. Y en dispositivos móviles con conexión lenta, cada kilobyte de JavaScript cuenta.

**Al completar:** Tu Lighthouse Performance supera 90, sabes cuándo lazy-load vs cuándo no, y puedes reducir el tamaño del bundle en al menos 20%.

---

### [Etapa 6: Seguridad y Resiliencia](./stage-6-security-and-resilience/)
> Proteger a tus usuarios y manejar fallos con elegancia.

**Qué aprenderás:** XSS, CSRF, CSP, autenticación segura (JWT, OAuth+PKCE), error boundaries, graceful degradation, optimistic updates, retry con backoff.

**Por qué importa:** Una vulnerabilidad XSS puede exponer los datos de todos tus usuarios. Un token JWT en localStorage puede ser robado por cualquier script de terceros. Y una app que muestra una pantalla en blanco cuando el servidor falla pierde la confianza del usuario.

**Al completar:** Tu app no tiene vulnerabilidades XSS, los tokens están seguros, cada vista maneja los 4 estados de error, y las operaciones fallidas se reintentan con backoff.

---

### [Etapa 7: Testing y Calidad](./stage-7-testing-and-quality/)
> Confianza en cada deploy.

**Qué aprenderás:** Testing Library, MSW para mocking, Playwright para E2E, code review, pipeline de CI, testing de accesibilidad.

**Por qué importa:** Sin tests, cada cambio es un acto de fe. Los tests no son un lujo — son la diferencia entre "creo que funciona" y "sé que funciona". Y una pipeline de CI que corre automáticamente te protege de tus propios errores.

**Al completar:** Tienes tests que verifican comportamiento (no implementación), mocks a nivel de red, un E2E del camino crítico, y una pipeline de CI que falla ante errores.

---

### [Etapa 8: Arquitectura a Escala](./stage-8-architecture-at-scale/)
> Patrones para equipos y aplicaciones grandes.

**Qué aprenderás:** Organización por features, Clean Architecture, design systems, APIs type-safe (tRPC), estrategias de renderizado (SSR/SSG/ISR), micro-frontends.

**Por qué importa:** Todo lo anterior funciona para una app pequeña. Cuando la app crece a 50+ componentes y 3+ developers, necesitas estructura: dónde va cada archivo, cómo evitar que un cambio en una feature rompa otra, cómo compartir componentes entre proyectos.

**Al completar:** Sabes organizar código por features, extraer un design system, elegir la estrategia de renderizado correcta, y tomar decisiones arquitectónicas con trade-offs documentados.

---

## Cómo usar esta guía

1. **Ve a la etapa que te corresponde.** Si eres principiante, empieza por la [Etapa 1](./stage-1-foundations/). Si ya tienes experiencia, salta a la etapa que necesites.
2. **Lee el README de la etapa.** Ahí encontrarás las actividades con sus lecturas, prácticas y criterios de aceptación.
3. **Haz las actividades.** Cada una toma 45-60 minutos: ~15-20 min de lectura, ~30-35 min de práctica, ~5-10 min de validación.
4. **Marca tu progreso.** Cada actividad tiene un checkbox `- [ ] Completada` que puedes marcar.
5. **Avanza a la siguiente etapa** cuando hayas completado las actividades esenciales (🟢) de la etapa actual.

### Para principiantes
Ve etapa por etapa, completando al menos todas las actividades 🟢 antes de avanzar.

### Para profesionales con experiencia
Salta a la etapa que necesites. Cada etapa es autocontenida con sus propias lecturas.

### Framework: Angular

Esta edición de la guía incluye implementación específica para **Angular**. Cada etapa (a partir de la 2) tiene un directorio `angular/` con material que enseña cómo aplicar los conceptos del stage usando Angular (standalone components, Signals, Reactive Forms, `@defer`, CDK, etc.).

Los principios se enseñan primero de forma agnóstica. El material de Angular los implementa. El soporte para React, Vue y Svelte puede agregarse en el futuro siguiendo la misma estructura (`react/`, `vue/`, `svelte/`).
