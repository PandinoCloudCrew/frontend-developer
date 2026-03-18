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
| 2 - Componentes | 0/4 | 0/2 | 0/2 | [→](./stage-2-component-architecture/) |
| 3 - Estado y Datos | 0/5 | 0/2 | 0/2 | [→](./stage-3-state-and-data/) |
| 4 - Usabilidad y Diseño | 0/4 | 0/3 | 0/2 | [→](./stage-4-usability-and-design/) |
| 5 - Rendimiento | 0/3 | 0/2 | 0/2 | [→](./stage-5-performance/) |
| 6 - Seguridad y Resiliencia | 0/4 | 0/2 | 0/1 | [→](./stage-6-security-and-resilience/) |
| 7 - Testing y Calidad | 0/3 | 0/3 | 0/2 | [→](./stage-7-testing-and-quality/) |
| 8 - Arquitectura a Escala | 0/1 | 0/4 | 0/3 | [→](./stage-8-architecture-at-scale/) |
| **Total** | **0/32** | **0/20** | **0/17** | |

---

## Las 8 Etapas

### [Etapa 1: Fundamentos](./stage-1-foundations/)
> La base que todo desarrollador frontend debe dominar antes de tocar un framework.

Semantic HTML, CSS (box model, Flexbox, Grid), JavaScript ES2020+, TypeScript, accesibilidad y entorno de desarrollo.

### [Etapa 2: Arquitectura de Componentes](./stage-2-component-architecture/)
> Pensar en componentes — el bloque de construcción universal de los frontends modernos.

Modelo mental de componentes, SOLID aplicado a UI, composición, compound components, hooks y composables.

### [Etapa 3: Estado y Flujo de Datos](./stage-3-state-and-data/)
> Dominar los datos que impulsan tu UI.

Data fetching (los 4 estados), URL state, form state, server state vs client state, máquinas de estado.

### [Etapa 4: Usabilidad y Principios de Diseño](./stage-4-usability-and-design/)
> Construir interfaces que la gente realmente quiera usar.

Tipografía, color, espaciado, heurísticas de Nielsen, Fitts/Hick/Gestalt, mobile-first, diseño de formularios.

### [Etapa 5: Rendimiento](./stage-5-performance/)
> Cada milisegundo cuenta — enviar rápido, mantener rápido.

Core Web Vitals, lazy loading, code splitting, virtualización, memoización, optimización de bundles.

### [Etapa 6: Seguridad y Resiliencia](./stage-6-security-and-resilience/)
> Proteger a tus usuarios y manejar lo inesperado con elegancia.

XSS, CSRF, CSP, auth seguro, error boundaries, optimistic updates, retry con backoff.

### [Etapa 7: Testing y Calidad](./stage-7-testing-and-quality/)
> Confianza en cada deploy.

Testing Library, MSW, Playwright E2E, code review, pipeline de CI, testing de accesibilidad.

### [Etapa 8: Arquitectura a Escala](./stage-8-architecture-at-scale/)
> Patrones para equipos y aplicaciones grandes.

Organización por features, Clean Architecture, design systems, APIs type-safe, SSR/SSG/ISR, micro-frontends.

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

### Agnóstico de framework
Cada concepto se enseña primero de forma agnóstica y luego se muestra cómo se mapea a React, Vue, Angular y Svelte.
