# Guía para Desarrolladores Frontend

Una guía práctica, agnóstica de framework, para aprender desarrollo frontend desde los fundamentos hasta arquitectura a escala. Enfatiza principios de desarrollo de software, usabilidad y cómo las cosas funcionan **y cómo fallan**.

## Para quién es

- **Principiantes** que quieren aprender frontend con bases sólidas antes de saltar a React/Angular/Vue
- **Desarrolladores** que ya usan un framework pero quieren entender los principios detrás de lo que hacen
- **Equipos** que buscan material de referencia adaptable a cualquier stack

## Cómo empezar

Abre la guía:

**[Ir a la guía →](./guide/)**

La guía te lleva paso a paso desde HTML semántico hasta arquitectura a escala en 8 etapas progresivas. Cada actividad dura 45-60 minutos.

No necesitas completar todo — elige tu ruta:

| Ruta | Actividades | Horas | Para quién |
|------|:-----------:|:-----:|------------|
| **Principiante** | 32 | ~27h | Lo esencial para ser productivo |
| **Profesional** | 52 | ~44h | Calidad de código y patrones avanzados |
| **Senior/Lead** | 69 | ~58h | Arquitectura, escala y decisiones de equipo |

## Las 8 etapas

| # | Etapa | Qué cubre |
|:-:|-------|-----------|
| 1 | [Fundamentos](./guide/stage-1-foundations/) | HTML semántico, CSS (Flexbox, Grid), JavaScript ES2020+, TypeScript, accesibilidad |
| 2 | [Arquitectura de Componentes](./guide/stage-2-component-architecture/) | Modelo mental de componentes, SOLID, composición, compound components, hooks |
| 3 | [Estado y Flujo de Datos](./guide/stage-3-state-and-data/) | Data fetching (4 estados), URL state, form state, server vs client state |
| 4 | [Usabilidad y Diseño](./guide/stage-4-usability-and-design/) | Tipografía, color, espaciado, heurísticas de Nielsen, responsive, formularios |
| 5 | [Rendimiento](./guide/stage-5-performance/) | Core Web Vitals, lazy loading, code splitting, virtualización, bundles |
| 6 | [Seguridad y Resiliencia](./guide/stage-6-security-and-resilience/) | XSS, CSRF, auth seguro, error boundaries, optimistic updates, retry |
| 7 | [Testing y Calidad](./guide/stage-7-testing-and-quality/) | Testing Library, MSW, Playwright, code review, CI pipelines |
| 8 | [Arquitectura a Escala](./guide/stage-8-architecture-at-scale/) | Organización por features, design systems, API patterns, meta-frameworks |

## Qué hace diferente a esta guía

- **Principios, no frameworks**: Cada concepto se enseña de forma agnóstica y luego se mapea a React, Angular, Vue, Svelte
- **Caminos positivos Y negativos**: Cada tema cubre cómo hacerlo bien y los anti-patterns comunes (qué NO hacer y por qué)
- **Actividades de 45-60 minutos**: Lectura (~15 min) + práctica (~30 min) + validación (~5 min)
- **Criterios de aceptación verificables**: Cada actividad tiene condiciones concretas que el estudiante verifica por sí mismo
- **3 niveles progresivos**: Esencial (🟢), Recomendado (🟡), Avanzado (🔴) — el estudiante elige cuánto profundizar

## Estructura del proyecto

```
guide/                          ← La guía (empieza aquí)
  README.md                     ← Punto de entrada para el estudiante
  stage-1-foundations/           ← Etapa 1: actividades + material de lectura
  stage-2-component-architecture/
  stage-3-state-and-data/
  stage-4-usability-and-design/
  stage-5-performance/
  stage-6-security-and-resilience/
  stage-7-testing-and-quality/
  stage-8-architecture-at-scale/

frontend-ecosystem-2026.md      ← Investigación: estado del ecosistema
frontend-principles-and-best-practices.md  ← Investigación: principios + anti-patterns

_internal/                      ← Documentos internos del proyecto
  PLAN.md                       ← Plan con criterios de aceptación detallados
  CONTENT-MAP.md                ← Mapeo de contenido a etapas
  ACTIVIDADES.md                ← Lista plana de las 69 actividades
```

## Contenido de referencia

Además de la guía, el proyecto incluye dos documentos de investigación que sirven como material de referencia profundo:

- **[Ecosistema Frontend 2026](./frontend-ecosystem-2026.md)** — Estado actual de frameworks (React, Angular, Vue, Svelte, Solid, Qwik), herramientas de build, meta-frameworks, CSS, TypeScript, testing, rendimiento, accesibilidad, design systems, API patterns y developer experience. Con anti-patterns por sección.

- **[Principios y Mejores Prácticas](./frontend-principles-and-best-practices.md)** — SOLID en frontend, diseño de componentes, separación de responsabilidades, gestión de estado, usabilidad (Nielsen, Fitts, Hick, Gestalt), rendimiento, manejo de errores, seguridad, código limpio y accesibilidad. Con anti-patterns por sección.

## Licencia

Este material es para uso educativo.
