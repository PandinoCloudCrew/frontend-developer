# Etapa 8: Arquitectura a Escala

> Patrones para equipos y aplicaciones grandes.

**Prerrequisitos:** Etapa 7 completada.

---

## Progreso

**Esenciales:** 0/1 | **Recomendadas:** 0/4 | **Avanzadas:** 0/3

---

## Actividades Esenciales

### 🟢 Actividad 8.1 — Organizar código por features

- [ ] Completada

**Duración:** ~60 min

**Lectura:** Consultar las secciones de organización de carpetas y Feature-Sliced Design en el documento de principios (~15 min)

**Práctica:** Refactorizar estructura plana (components/, hooks/, services/) a organización por feature. Verificar cero imports circulares con `npx madge --circular src/` (~35 min)

**Validación:** `madge --circular` -> cero ciclos; eliminar un feature no rompe otros (~10 min)

**Criterios de aceptación:**
- [ ] Cero dependencias circulares entre features
- [ ] Cada feature contiene sus componentes, hooks y tipos
- [ ] Eliminar un feature directory solo rompe imports a su API pública

---

## Actividades Recomendadas

### 🟡 Actividad 8.2 — Clean Architecture en frontend (4 capas)

- [ ] Completada

**Duración:** ~55 min

**Lectura:** Consultar las secciones de Clean Architecture en el documento de principios (~10 min)

**Práctica:** Reorganizar una feature compleja en 4 capas (Presentation -> Application -> Domain -> Infrastructure). La lógica de dominio debe ser agnóstica de framework (~35 min)

**Validación:** Domain layer no importa React/Vue/Angular; tests de dominio pasan sin UI (~10 min)

**Criterios de aceptación:**
- [ ] Domain layer no importa ningún framework
- [ ] Tests de dominio se ejecutan sin renderizar UI
- [ ] Infrastructure layer es intercambiable

---

### 🟡 Actividad 8.3 — Extraer un design system

- [ ] Completada

**Duración:** ~60 min

**Lectura:** Consultar las secciones de design systems en el documento del ecosistema (~10 min)

**Práctica:** Extraer 5 componentes reutilizables en un paquete de design system con design tokens para colores, espaciado y tipografía (~40 min)

**Validación:** El paquete compila independientemente; cambiar un token actualiza todos los componentes (~10 min)

**Criterios de aceptación:**
- [ ] Design system compila independientemente
- [ ] Exporta componentes, tokens y tipos
- [ ] Cambiar un token de color se propaga a todos los componentes

---

### 🟡 Actividad 8.4 — Implementar capa de API type-safe

- [ ] Completada

**Duración:** ~60 min

**Lectura:** Consultar las secciones de patrones de API en el documento del ecosistema (~10 min)

**Práctica:** Implementar capa de API con tRPC. Cambiar tipo de respuesta backend -> `npx tsc --noEmit` falla en frontend (~40 min)

**Validación:** Cambiar tipo backend -> error de tipos en frontend (~10 min)

**Criterios de aceptación:**
- [ ] Type safety end-to-end
- [ ] Breaking change backend produce error de tipos en frontend
- [ ] `npx tsc --noEmit` detecta el cambio

---

### 🟡 Actividad 8.5 — Elegir estrategia de renderizado (SSR/SSG/ISR)

- [ ] Completada

**Duración:** ~60 min

**Lectura:** Consultar las secciones de meta-frameworks y estrategias de renderizado en el documento del ecosistema (~10 min)

**Práctica:** Para 3 páginas (blog, dashboard, e-commerce listing), elegir e implementar la estrategia correcta con justificación escrita (~40 min)

**Validación:** Blog = HTML estático; dashboard = SSR; listing = ISR con cache headers (~10 min)

**Criterios de aceptación:**
- [ ] Cada estrategia coincide con el tipo de contenido
- [ ] La justificación referencia frecuencia de datos, SEO, personalización y TTI

---

## Actividades Avanzadas

### 🔴 Actividad 8.6 — Configurar Vite y entender el build

- [ ] Completada

**Duración:** ~45 min

**Lectura:** Consultar las secciones de build tools en el documento del ecosistema (~10 min)

**Práctica:** Configurar Vite con aliases y env vars. Verificar que el build produce chunks por feature (~30 min)

**Validación:** `npx vite build` -> chunks nombrados por feature (~5 min)

**Criterios de aceptación:**
- [ ] Build produce chunks separados por feature
- [ ] No es un único bundle monolítico

---

### 🔴 Actividad 8.7 — Entender monorepos y micro-frontends

- [ ] Completada

**Duración:** ~45 min

**Lectura:** [Micro-frontends](./micro-frontends.md) — Descripción general, trade-offs y cuándo usar/no usar (~10 min)

**Práctica:** Documentar decisión: el proyecto justifica monorepo/micro-frontends? Con trade-offs listados (~30 min)

**Validación:** La decisión referencia al menos 3 trade-offs concretos (~5 min)

**Criterios de aceptación:**
- [ ] Decisión documentada con justificación
- [ ] Al menos 3 trade-offs por enfoque
- [ ] No se adopta por "porque Netflix lo usa"

---

### 🔴 Actividad 8.8 — Validación integral de Etapa 8

- [ ] Completada

**Duración:** ~55 min

**Lectura:** Revisar los criterios de aceptación de toda la etapa (~5 min)

**Práctica:** Verificar todos los criterios 8.1-8.8 (~40 min)

**Validación:** Los 8 criterios pasan (~10 min)

**Criterios de aceptación:**
- [ ] Todos los criterios 8.1-8.8 se cumplen

---

## Material de lectura en esta etapa

| Archivo | Contenido |
|---------|-----------|
| [micro-frontends.md](./micro-frontends.md) | Qué son los micro-frontends, cuándo tienen sentido, cuándo NO, enfoques de implementación (Module Federation, iframes, SSI, build-time), trade-offs detallados |

---

[← Etapa anterior: Testing](../stage-7-testing-and-quality/) | [Volver al índice](../README.md)
