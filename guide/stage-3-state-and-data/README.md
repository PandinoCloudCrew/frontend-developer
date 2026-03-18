# Etapa 3: Estado y Flujo de Datos

> Dominar los datos que impulsan la UI.

**Prerrequisitos:** Etapa 2 completada.

---

## Progreso

**Esenciales:** 0/5 | **Recomendadas:** 0/2 | **Avanzadas:** 0/2

---

## Actividades Esenciales

### 🟢 Actividad 3.1 — Implementar los 4 estados de UI para data fetching

- [ ] Completada

**Duración:** ~55 min

**Lectura:**
- [Data Fetching: 4 Estados](./lecturas/01-data-fetching-4-estados.md) (~18 min)

**Angular:**
- [HTTP y Data Fetching en Angular](./angular/03-http-y-data-fetching.md) (~10 min)

**Práctica:** Construir un componente que consume una API y muestra los 4 estados: skeleton (loading), datos (success), mensaje + reintentar (error), guía útil (empty) (~30 min)

**Validación:** Probar Slow 3G, bloquear API, devolver array vacío (~7 min)

**Criterios de aceptación:**
- [ ] Skeleton/spinner visible en conexión lenta
- [ ] Error con botón reintentar al bloquear API
- [ ] Empty state descriptivo con array vacío
- [ ] Sin flash de contenido entre estados

---

### 🟢 Actividad 3.2 — Gestionar estado en la URL

- [ ] Completada

**Duración:** ~60 min

**Lectura:**
- [URL State](./lecturas/02-url-state.md) (~15 min)

**Angular:**
- [Router y URL State en Angular](./angular/05-router-y-url-state.md) (~10 min)

**Práctica:** Construir una lista filtrable, ordenable y paginada donde filtro, orden y página viven en la URL. Compartir la URL debe reproducir la vista exacta (~35 min)

**Validación:** Copiar URL -> incógnito -> misma vista; botón atrás 3 veces (~10 min)

**Criterios de aceptación:**
- [ ] Filtros, orden y página están en query params de la URL
- [ ] Compartir la URL reproduce la vista exacta en incógnito
- [ ] El botón atrás restaura cada estado previo

---

### 🟢 Actividad 3.3 — Gestionar estado de formularios con validación

- [ ] Completada

**Duración:** ~55 min

**Lectura:**
- [Form State](./lecturas/03-form-state.md) (~15 min)

**Angular:**
- [Reactive Forms en Angular](./angular/04-reactive-forms.md) (~10 min)

**Práctica:** Implementar formulario con validación basada en schema (Zod) y estrategia on-blur. Prevenir double-submit con estado de loading en el botón (~35 min)

**Validación:** Verificar errores al blur, no al submit; verificar que el botón se deshabilita al enviar (~5 min)

**Criterios de aceptación:**
- [ ] Validación on-blur (no en cada keystroke)
- [ ] Se usa schema de validación (Zod/Valibot)
- [ ] El botón de envío muestra loading y se deshabilita durante el submit

---

### 🟢 Actividad 3.4 — Distinguir tipos de estado y migrar a server state

- [ ] Completada

**Duración:** ~55 min

**Lectura:**
- [Tipos de Estado](./lecturas/04-tipos-de-estado.md) (~15 min)

**Angular:**
- [Signals y Estado en Angular](./angular/01-signals-y-estado.md) (~10 min)
- [Servicios e Inyección](./angular/02-servicios-e-inyeccion.md) (~10 min)

**Práctica:** Auditar el estado de la app: clasificar cada pieza como local, servidor, derivado o URL. Reemplazar `useState`+`useEffect` para data fetching por TanStack Query (~30 min)

**Validación:** `grep "setState\|dispatch" src/` — cero actualizaciones de datos del servidor; cache funciona (~10 min)

**Criterios de aceptación:**
- [ ] Ningún dato del servidor almacenado en estado del cliente
- [ ] Los datos del servidor fluyen por TanStack Query
- [ ] Ningún estado derivado almacenado como `useState`
- [ ] La cache funciona (navegar ida y vuelta sin re-fetch)

---

### 🟢 Actividad 3.5 — Construir un wizard multi-paso con validación por paso

- [ ] Completada

**Duración:** ~55 min

**Lectura:**
- [Form State](./lecturas/03-form-state.md) (sección wizards, ~10 min)

**Práctica:** Construir flujo de checkout (carrito -> envío -> pago -> confirmación) con preservación de datos entre pasos y navegación atrás (~35 min)

**Validación:** Avanzar, retroceder, verificar datos preservados; intentar saltar pasos (~10 min)

**Criterios de aceptación:**
- [ ] El wizard muestra progreso (Paso X de N)
- [ ] El botón atrás preserva datos
- [ ] No se puede avanzar sin validación del paso actual

---

## Actividades Recomendadas

### 🟡 Actividad 3.6 — Implementar state machine para flujo complejo (XState)

- [ ] Completada

**Duración:** ~55 min

**Lectura:**
- [Máquinas de Estado](./lecturas/06-maquinas-de-estado.md) (~5 min)

**Práctica:** Integrar XState al wizard de checkout. Definir máquina con estados y transiciones. Impedir transiciones inválidas (~40 min)

**Validación:** Intentar saltar de carrito a pago; intentar volver de confirmación a carrito (~10 min)

**Criterios de aceptación:**
- [ ] La máquina impide saltar pasos
- [ ] Los estados imposibles son imposibles por definición
- [ ] Las transiciones requieren validación

---

### 🟡 Actividad 3.7 — Optimistic updates con rollback y retry

- [ ] Completada

**Duración:** ~55 min

**Lectura:**
- [Anti-patterns de Estado](./lecturas/07-anti-patterns-de-estado.md) (~10 min)
- [Flujo Unidireccional e Inmutabilidad](./lecturas/05-flujo-unidireccional-e-inmutabilidad.md) (~10 min)

**Práctica:** Implementar like/unlike optimista. En fallo: rollback visible + error toast. Implementar retry con backoff exponencial (~35 min)

**Validación:** Like -> bloquear API -> rollback visible; verificar intervalos crecientes de retry (~10 min)

**Criterios de aceptación:**
- [ ] Optimistic update aparece inmediatamente
- [ ] En fallo, se revierte con mensaje de error visible
- [ ] Los intervalos de retry son crecientes (~1s, ~2s, ~4s)

---

## Actividades Avanzadas

### 🔴 Actividad 3.8 — Inmutabilidad, stale closures y rendimiento de estado

- [ ] Completada

**Duración:** ~50 min

**Lectura:**
- [Flujo Unidireccional e Inmutabilidad](./lecturas/05-flujo-unidireccional-e-inmutabilidad.md) (~10 min)
- [Anti-patterns de Estado](./lecturas/07-anti-patterns-de-estado.md) (~5 min)

**Práctica:** Demostrar un bug de stale closure (click rápido 10 veces != 10). Corregirlo. Demostrar el costo de spread en objetos grandes a 60fps vs useRef (~30 min)

**Validación:** Click rápido 10 veces = 10; sin jank en animación (~5 min)

**Criterios de aceptación:**
- [ ] Click rápido 10 veces produce conteo = 10
- [ ] Se demuestra cuándo `useRef` es mejor que `useState` para animaciones

---

### 🔴 Actividad 3.9 — Validación integral de Etapa 3

- [ ] Completada

**Duración:** ~55 min

**Lectura:** Revisar los criterios de aceptación de toda la etapa (~5 min)

**Práctica:** Verificar todos los criterios 3.1-3.8 (~40 min)

**Validación:** Los 8 criterios pasan (~10 min)

**Criterios de aceptación:**
- [ ] Todos los criterios 3.1-3.8 se cumplen

---

## Material de lectura en esta etapa

### Lecturas generales

| Archivo | Contenido |
|---------|-----------|
| [01-data-fetching-4-estados.md](./lecturas/01-data-fetching-4-estados.md) | Los 4 estados de data fetching: loading, success, error, empty |
| [02-url-state.md](./lecturas/02-url-state.md) | La URL como gestor de estado: query params, navegación, deep linking |
| [03-form-state.md](./lecturas/03-form-state.md) | Estado de formularios: validación, schemas, wizards multi-paso |
| [04-tipos-de-estado.md](./lecturas/04-tipos-de-estado.md) | Tipos de estado: local, servidor, derivado, URL |
| [05-flujo-unidireccional-e-inmutabilidad.md](./lecturas/05-flujo-unidireccional-e-inmutabilidad.md) | Flujo unidireccional de datos e inmutabilidad |
| [06-maquinas-de-estado.md](./lecturas/06-maquinas-de-estado.md) | Máquinas de estado con XState |
| [07-anti-patterns-de-estado.md](./lecturas/07-anti-patterns-de-estado.md) | Anti-patterns de estado: stale closures, prop drilling, estado derivado innecesario |

### Material de Angular

| Archivo | Contenido |
|---------|-----------|
| [01-signals-y-estado.md](./angular/01-signals-y-estado.md) | Signals y estado reactivo en Angular |
| [02-servicios-e-inyeccion.md](./angular/02-servicios-e-inyeccion.md) | Servicios, inyección de dependencias y estado compartido |
| [03-http-y-data-fetching.md](./angular/03-http-y-data-fetching.md) | HttpClient, interceptors y data fetching en Angular |
| [04-reactive-forms.md](./angular/04-reactive-forms.md) | Reactive Forms: FormGroup, FormControl, validación |
| [05-router-y-url-state.md](./angular/05-router-y-url-state.md) | Router, query params y URL state en Angular |

---

[← Etapa anterior: Componentes](../stage-2-component-architecture/) | [Volver al índice](../README.md) | [Etapa siguiente: Usabilidad →](../stage-4-usability-and-design/)
