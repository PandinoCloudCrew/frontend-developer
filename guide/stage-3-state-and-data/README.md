# Etapa 3: Estado y Flujo de Datos

[Inicio](../README.md) > Etapa 3

> Dominar los datos que impulsan la UI. Aprende a obtener, almacenar, clasificar y validar el estado de tu aplicación — con resiliencia ante fallos y claridad ante la complejidad.

**Prerrequisitos:** Etapa 2 completada (sabes crear componentes Angular standalone, usar signals, y componer UIs con `@if`/`@for`).

**Por qué esta etapa importa:** Una aplicación frontend es, en esencia, una función del estado: `UI = f(state)`. Si no sabes de dónde viene cada dato, quién lo actualiza, y qué pasa cuando falla, terminarás con una app que "a veces funciona". Los bugs más costosos en producción no son de CSS — son datos inconsistentes, formularios que se envían doble, y pantallas en blanco cuando la API no responde.

---

## Progreso

**Esenciales:** 0/5 | **Recomendadas:** 0/2 | **Avanzadas:** 0/2

---

## Actividades Esenciales 🟢

| # | Actividad | Duración | Estado |
|:-:|-----------|:--------:|:------:|
| 3.1 | [Implementar los 4 estados de UI para data fetching](#31--implementar-los-4-estados-de-ui-para-data-fetching) | ~55 min | ☐ |
| 3.2 | [Gestionar estado en la URL](#32--gestionar-estado-en-la-url) | ~60 min | ☐ |
| 3.3 | [Gestionar estado de formularios con validación](#33--gestionar-estado-de-formularios-con-validación) | ~55 min | ☐ |
| 3.4 | [Distinguir tipos de estado y separar responsabilidades](#34--distinguir-tipos-de-estado-y-separar-responsabilidades) | ~55 min | ☐ |
| 3.5 | [Construir un wizard multi-paso con validación por paso](#35--construir-un-wizard-multi-paso-con-validación-por-paso) | ~55 min | ☐ |

## Actividades Recomendadas 🟡

| # | Actividad | Duración | Estado |
|:-:|-----------|:--------:|:------:|
| 3.6 | [Implementar state machine para flujo complejo](#36--implementar-state-machine-para-flujo-complejo) | ~55 min | ☐ |
| 3.7 | [Optimistic updates con rollback y retry](#37--optimistic-updates-con-rollback-y-retry) | ~55 min | ☐ |

## Actividades Avanzadas 🔴

| # | Actividad | Duración | Estado |
|:-:|-----------|:--------:|:------:|
| 3.8 | [Inmutabilidad, stale closures y rendimiento de estado](#38--inmutabilidad-stale-closures-y-rendimiento-de-estado) | ~50 min | ☐ |
| 3.9 | [Validación integral de Etapa 3](#39--validación-integral-de-etapa-3) | ~55 min | ☐ |

---

## Detalle de actividades

### 3.1 — Implementar los 4 estados de UI para data fetching

**Por qué:** Cuando tu app obtiene datos de un servidor, la respuesta no llega al instante. Si no manejas ese tiempo de espera, el usuario ve una pantalla vacía y piensa que la app está rota. Los 4 estados (loading, success, error, empty) son la diferencia entre una app profesional y una abandonada.

| | |
|---|---|
| **Requiere** | Etapa 2 completada (componentes Angular, signals, `@if`/`@for`) |
| **Aprenderás** | Representar los 4 estados de una petición HTTP en la UI, usar `HttpClient`, mostrar skeletons, manejar errores con reintentar, diseñar empty states |
| **Al completar** | Un componente que consume una API y muestra correctamente loading, success, error y empty |

[→ Ir a la actividad](./actividades/3.1-data-fetching-4-estados.md)

---

### 3.2 — Gestionar estado en la URL

**Por qué:** Si guardas filtros y paginación en signals, al recargar se pierden. La URL es el gestor de estado más poderoso y más ignorado: es persistente, compartible, y el botón "Atrás" funciona gratis.

| | |
|---|---|
| **Requiere** | Actividad 3.1 completada |
| **Aprenderás** | Usar query params como fuente de verdad para filtros, orden y paginación. Sincronizar URL con vista usando el Router de Angular |
| **Al completar** | Una lista filtrable donde compartir la URL reproduce la vista exacta en incógnito |

[→ Ir a la actividad](./actividades/3.2-url-state.md)

---

### 3.3 — Gestionar estado de formularios con validación

**Por qué:** Los formularios son la forma principal de enviar datos. Si muestras errores mientras el usuario escribe, si permites doble submit, o si la validación está dispersa en 10 archivos, tu UX sufre y tu código se vuelve inmantenible.

| | |
|---|---|
| **Requiere** | Actividades 3.1 y 3.2 completadas |
| **Aprenderás** | Reactive Forms de Angular, validación con schema Zod, estrategia on-blur, prevenir double-submit |
| **Al completar** | Un formulario con validación on-blur, errores claros por campo, y botón que se deshabilita mientras envía |

[→ Ir a la actividad](./actividades/3.3-form-state.md)

---

### 3.4 — Distinguir tipos de estado y separar responsabilidades

**Por qué:** Meter todo el estado en el componente funciona al principio. Cuando la app crece, el componente se vuelve un monstruo de 300 líneas. Separar por tipo (local, servidor, derivado, URL) te da claridad y reutilización.

| | |
|---|---|
| **Requiere** | Actividades 3.1-3.3 completadas |
| **Aprenderás** | Clasificar estado por tipo, mover datos del servidor a servicios con cache, usar `computed()` para estado derivado |
| **Al completar** | Tu app tiene estado organizado: servidor en servicios, derivado en `computed()`, local en el componente, filtros en la URL |

[→ Ir a la actividad](./actividades/3.4-tipos-de-estado.md)

---

### 3.5 — Construir un wizard multi-paso con validación por paso

**Por qué:** Un formulario largo es abrumador. Un wizard lo divide en pasos manejables — pero si los datos desaparecen al retroceder o el usuario puede saltar pasos, la confianza se destruye. Este patrón es estándar en checkout, registro y onboarding.

| | |
|---|---|
| **Requiere** | Actividad 3.3 completada (Reactive Forms y validación) |
| **Aprenderás** | Flujo multi-paso con componentes por paso, preservar datos en un servicio, validar antes de avanzar, mostrar progreso |
| **Al completar** | Un wizard de checkout de 4 pasos con datos preservados, validación por paso, y progreso visible |

[→ Ir a la actividad](./actividades/3.5-wizard-multi-paso.md)

---

### 3.6 — Implementar state machine para flujo complejo

**Por qué:** Un wizard controlado con `if`/`switch` permite estados imposibles — como "en pago sin datos de envío". Una state machine define qué transiciones son válidas y elimina bugs de estado por diseño, no por código defensivo.

| | |
|---|---|
| **Requiere** | Actividad 3.5 completada (wizard funcionando) |
| **Aprenderás** | Qué es una state machine, definir estados y transiciones con XState, integrar XState con Angular, impedir transiciones inválidas por definición |
| **Al completar** | Tu wizard usa una state machine donde saltar pasos es literalmente imposible |

[→ Ir a la actividad](./actividades/3.6-state-machine.md)

---

### 3.7 — Optimistic updates con rollback y retry

**Por qué:** Cuando el usuario hace click en "Like", espera que el corazón se llene inmediatamente, no 500ms después. Los optimistic updates actualizan la UI primero y manejan el error si el servidor falla.

| | |
|---|---|
| **Requiere** | Actividades 3.1 y 3.4 completadas |
| **Aprenderás** | Optimistic updates, rollback en fallo, feedback de error con toast, retry con backoff exponencial |
| **Al completar** | Un sistema de likes que responde instantáneamente, revierte si falla, y reintenta con intervalos crecientes |

[→ Ir a la actividad](./actividades/3.7-optimistic-updates.md)

---

### 3.8 — Inmutabilidad, stale closures y rendimiento de estado

**Por qué:** Los bugs más difíciles de rastrear son de estado invisible: clicks que se pierden, mutaciones que el framework no detecta, animaciones que tiemblan. Entender por qué ocurren te ahorra horas de debugging.

| | |
|---|---|
| **Requiere** | Actividades 3.1-3.5 completadas. Actividad 1.9 recomendada (closures) |
| **Aprenderás** | Reproducir y corregir stale closures, entender inmutabilidad y detección de cambios, medir costo de spread, alternativas a signals para animaciones |
| **Al completar** | Has reproducido bugs de stale closure y mutación invisible, los has corregido, y sabes cuándo signals no son la herramienta correcta |

[→ Ir a la actividad](./actividades/3.8-inmutabilidad-closures.md)

---

### 3.9 — Validación integral de Etapa 3

**Por qué:** Antes de avanzar a la Etapa 4, necesitas confirmar que dominas estado y flujo de datos. Esta actividad recorre todos los criterios y te ayuda a cerrar brechas.

| | |
|---|---|
| **Requiere** | Actividades esenciales 3.1-3.5 completadas |
| **Aprenderás** | Verificar sistemáticamente tus conocimientos, detectar brechas, reforzar patrones clave |
| **Al completar** | Todos los criterios de aceptación de la etapa pasan. Estás listo para la Etapa 4 |

[→ Ir a la actividad](./actividades/3.9-validacion-integral.md)

---

## Material de lectura

| Archivo | Contenido |
|---------|-----------|
| [01-data-fetching-4-estados.md](./lecturas/01-data-fetching-4-estados.md) | Los 4 estados de data fetching: loading, success, error, empty |
| [02-url-state.md](./lecturas/02-url-state.md) | La URL como gestor de estado: query params, navegación, deep linking |
| [03-form-state.md](./lecturas/03-form-state.md) | Estado de formularios: validación, schemas, wizards multi-paso |
| [04-tipos-de-estado.md](./lecturas/04-tipos-de-estado.md) | Tipos de estado: local, servidor, derivado, URL |
| [05-flujo-unidireccional-e-inmutabilidad.md](./lecturas/05-flujo-unidireccional-e-inmutabilidad.md) | Flujo unidireccional de datos e inmutabilidad |
| [06-maquinas-de-estado.md](./lecturas/06-maquinas-de-estado.md) | Máquinas de estado con XState |
| [07-anti-patterns-de-estado.md](./lecturas/07-anti-patterns-de-estado.md) | Anti-patterns de estado: stale closures, prop drilling, estado derivado innecesario |

## Material de Angular

| Archivo | Contenido |
|---------|-----------|
| [01-signals-y-estado.md](./angular/01-signals-y-estado.md) | Signals y estado reactivo en Angular |
| [02-servicios-e-inyección.md](./angular/02-servicios-e-inyeccion.md) | Servicios, inyección de dependencias y estado compartido |
| [03-http-y-data-fetching.md](./angular/03-http-y-data-fetching.md) | HttpClient, interceptors y data fetching en Angular |
| [04-reactive-forms.md](./angular/04-reactive-forms.md) | Reactive Forms: FormGroup, FormControl, validación |
| [05-router-y-url-state.md](./angular/05-router-y-url-state.md) | Router, query params y URL state en Angular |

---

[← Etapa anterior: Componentes](../stage-2-component-architecture/) | [Siguiente: Etapa 4 →](../stage-4-usability-and-design/)
