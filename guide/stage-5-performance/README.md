# Etapa 5: Rendimiento

[Inicio](../README.md) > Etapa 5

> Enviar rápido, mantener rápido. Cada milisegundo cuenta.

**Prerrequisitos:** Etapa 4 completada.

**Por que esta etapa importa:** Un sitio puede tener la mejor arquitectura y el diseño mas pulido, pero si tarda 5 segundos en cargar o el scroll se siente lento, los usuarios se van. El rendimiento no es un bonus — es una funcionalidad. Entender Core Web Vitals, lazy loading, bundle optimization y memoizacion te permite diagnosticar cuellos de botella reales con datos, no con suposiciones, y aplicar las correcciones que realmente importan. Los desarrolladores que optimizan "por si acaso" desperdician esfuerzo; los que miden primero y optimizan despues entregan experiencias rápidas de verdad.

> **Pilares de diseño que se profundizan en esta etapa:** [Rendimiento](../stage-1-foundations/lecturas/00-pilares-de-diseno.md) (Core Web Vitals, lazy loading, bundle optimization, memoizacion), [Observabilidad](../stage-1-foundations/lecturas/00-pilares-de-diseno.md) (medicion real vs sintetica, profiling con Angular DevTools).

---

## Progreso

**Esenciales:** 0/3 | **Recomendadas:** 0/2 | **Avanzadas:** 0/2

---

## Actividades Esenciales 🟢

| # | Actividad | Pilares | Duracion | Estado |
|:-:|-----------|---------|:--------:|:------:|
| 5.1 | [Core Web Vitals](#51--entender-core-web-vitals-y-corregir-problemas-de-rendimiento) | Rendimiento, Observabilidad | ~55 min | ☐ |
| 5.2 | [Lazy loading y code splitting](#52--implementar-lazy-loading-y-code-splitting) | Rendimiento | ~55 min | ☐ |
| 5.3 | [Bundle optimization](#53--analizar-y-reducir-el-bundle) | Rendimiento | ~55 min | ☐ |

## Actividades Recomendadas 🟡

| # | Actividad | Pilares | Duracion | Estado |
|:-:|-----------|---------|:--------:|:------:|
| 5.4 | [Virtualizacion](#54--construir-una-lista-virtualizada-de-10000-elementos) | Rendimiento | ~55 min | ☐ |
| 5.5 | [Memoizacion](#55--memoizacion-cuando-si-y-cuando-no) | Rendimiento | ~50 min | ☐ |

## Actividades Avanzadas 🔴

| # | Actividad | Pilares | Duracion | Estado |
|:-:|-----------|---------|:--------:|:------:|
| 5.6 | [Medicion real vs sintetica](#56--medir-rendimiento-real-vs-sintetico) | Rendimiento, Observabilidad | ~50 min | ☐ |
| 5.7 | [Validacion integral](#57--validacion-integral-de-etapa-5) | Todos | ~55 min | ☐ |

---

## Detalle de actividades

### 5.1 — Entender Core Web Vitals y corregir problemas de rendimiento

**Por que:** LCP, CLS e INP son las metricas que Google usa para evaluar la experiencia real de los usuarios. Si no sabes medirlas ni corregirlas, no puedes saber si tu aplicación es rápida o solo lo parece en tu maquina de desarrollo. Este ejercicio te obliga a diagnosticar y corregir problemas reales con Lighthouse.

| | |
|---|---|
| **Requiere** | Etapa 4 completada, proyecto Angular funcionando |
| **Aprenderas** | Ejecutar Lighthouse, interpretar LCP/CLS/INP, priorizar correcciones por impacto, aplicar `fetchpriority="high"` y eliminar layout shifts |
| **Al completar** | Lighthouse Performance >= 90 en movil, LCP < 2.5s en Slow 4G, CLS = 0 |

[→ Ir a la actividad](./actividades/5.1-core-web-vitals.md)

---

### 5.2 — Implementar lazy loading y code splitting

**Por que:** Enviar todo el JavaScript de golpe penaliza la carga inicial. Code splitting por ruta y lazy loading de imagenes son las optimizaciones de mayor impacto con menor esfuerzo. En Angular, las rutas lazy-loaded con `loadComponent` y `@defer` son la forma idiomatica de dividir el bundle.

| | |
|---|---|
| **Requiere** | Actividad 5.1 completada |
| **Aprenderas** | Code splitting por ruta con `loadComponent`, `@defer` para componentes pesados, `loading="lazy"` para imagenes below-the-fold, `fetchpriority="high"` para la imagen hero |
| **Al completar** | Cada ruta tiene su propio chunk JS, la imagen hero no tiene `loading="lazy"` y tiene `fetchpriority="high"` |

[→ Ir a la actividad](./actividades/5.2-lazy-loading.md)

---

### 5.3 — Analizar y reducir el bundle

**Por que:** Un bundle inflado con dependencias innecesarias o tree shaking roto es una de las causas mas comunes de carga lenta. Ejecutar un bundle analyzer y actuar sobre los hallazgos es una habilidad que se usa en todo proyecto profesional.

| | |
|---|---|
| **Requiere** | Actividad 5.2 completada |
| **Aprenderas** | Ejecutar bundle analyzer, identificar dependencias pesadas, aplicar tree shaking, reemplazar librerias pesadas por alternativas ligeras |
| **Al completar** | Bundle reducido al menos 20%, con las 3 dependencias mas grandes identificadas y al menos una optimizacion implementada |

[→ Ir a la actividad](./actividades/5.3-bundle-optimization.md)

---

### 5.4 — Construir una lista virtualizada de 10,000 elementos

**Por que:** Renderizar miles de elementos en el DOM destruye el rendimiento de scroll y consume memoria. La virtualizacion renderiza solo los elementos visibles, y `@angular/cdk/scrolling` (CDK Virtual Scroll) es la solucion idiomatica en Angular. Saber cuando y como virtualizar es esencial para cualquier interfaz con listas largas.

| | |
|---|---|
| **Requiere** | Actividades 5.1-5.3 completadas |
| **Aprenderas** | Usar `@angular/cdk/scrolling` para virtualizar listas, medir frame rate con DevTools Performance, entender los compromisos de accesibilidad |
| **Al completar** | Scroll a 60fps con 10,000 elementos, ningun frame mayor a 16ms, solo los elementos visibles en el DOM |

[→ Ir a la actividad](./actividades/5.4-virtualizacion.md)

---

### 5.5 — Memoizacion: cuando si y cuando NO

**Por que:** La memoizacion mal aplicada es peor que no memoizar — anade overhead sin beneficio. En Angular, `OnPush` change detection y `computed()` signals son las herramientas idiomaticas para evitar re-renders innecesarios. Este ejercicio te ensena a medir primero con Angular DevTools y optimizar solo lo que realmente importa.

| | |
|---|---|
| **Requiere** | Actividades 5.1-5.3 completadas |
| **Aprenderas** | Identificar re-renders costosos con Angular DevTools, aplicar `OnPush` change detection, usar `computed()` signals para valores derivados, justificar cada optimizacion con datos |
| **Al completar** | Cada memoizacion tiene una justificacion medida, se demuestra cuando `OnPush` + signals evita re-renders innecesarios |

[→ Ir a la actividad](./actividades/5.5-memoizacion.md)

---

### 5.6 — Medir rendimiento real vs sintetico

**Por que:** Una puntuacion de Lighthouse de 100 en tu maquina no dice nada sobre usuarios reales en telefonos lentos. Comparar metricas sinteticas con Real User Monitoring (RUM) y auditar scripts de terceros te da la imagen completa del rendimiento en produccion.

| | |
|---|---|
| **Requiere** | Actividades 5.1-5.5 completadas |
| **Aprenderas** | Configurar `web-vitals` para RUM, comparar Lighthouse vs datos reales, auditar impacto de scripts de terceros con DevTools, documentar discrepancias |
| **Al completar** | `web-vitals` configurado, scripts de terceros auditados, al menos una discrepancia sintetico vs real documentada |

[→ Ir a la actividad](./actividades/5.6-medicion-real.md)

---

### 5.7 — Validacion integral de Etapa 5

**Por que:** Antes de avanzar a la Etapa 6, necesitas confirmar que dominas rendimiento. Esta actividad es tu "code review" propio: verificas todos los criterios de aceptacion de la etapa y cierras brechas.

| | |
|---|---|
| **Requiere** | Todas las actividades esenciales (5.1-5.3) completadas |
| **Aprenderas** | Ejecutar la validacion completa, interpretar resultados, corregir fallos restantes |
| **Al completar** | Todos los criterios de aceptacion de la etapa pasan |

[→ Ir a la actividad](./actividades/5.7-validacion-integral.md)

---

## Material de lectura

### Lecturas generales

| Archivo | Contenido |
|---------|-----------|
| [01-core-web-vitals-y-rail.md](./lecturas/01-core-web-vitals-y-rail.md) | Core Web Vitals (LCP, CLS, INP), modelo RAIL, Lighthouse |
| [02-lazy-loading-y-code-splitting.md](./lecturas/02-lazy-loading-y-code-splitting.md) | Lazy loading, code splitting por ruta, dynamic imports |
| [03-bundle-optimization.md](./lecturas/03-bundle-optimization.md) | Análisis de bundle, tree shaking, optimización de dependencias |
| [04-virtualizacion.md](./lecturas/04-virtualizacion.md) | Virtualización de listas largas con CDK Virtual Scroll / TanStack Virtual |
| [05-memoizacion.md](./lecturas/05-memoizacion.md) | Memoización: `computed()` signals, `OnPush`, cuándo optimizar y cuándo no |
| [06-anti-patterns-de-rendimiento.md](./lecturas/06-anti-patterns-de-rendimiento.md) | Anti-patterns de rendimiento, RUM vs sintético, scripts de terceros |

### Material de Angular

| Archivo | Contenido |
|---------|-----------|
| [01-rendimiento-en-angular.md](./angular/01-rendimiento-en-angular.md) | Rendimiento en Angular: OnPush, Signals, lazy loading de rutas, change detection |

---

[← Etapa anterior: Usabilidad](../stage-4-usability-and-design/) | [Volver al índice](../README.md) | [Etapa siguiente: Seguridad →](../stage-6-security-and-resilience/)
