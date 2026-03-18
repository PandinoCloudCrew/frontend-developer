# Etapa 5: Rendimiento

> Enviar rápido, mantener rápido. Cada milisegundo cuenta.

**Prerrequisitos:** Etapa 4 completada.

---

## Progreso

**Esenciales:** 0/3 | **Recomendadas:** 0/2 | **Avanzadas:** 0/2

---

## Actividades Esenciales

### 🟢 Actividad 5.1 — Entender Core Web Vitals y corregir problemas de rendimiento

- [ ] Completada

**Duración:** ~55 min

**Lectura:** Consultar las secciones de Core Web Vitals y rendimiento en los documentos de principios y ecosistema (~15 min)

**Práctica:** Ejecutar Lighthouse en una app lenta. Documentar hallazgos, priorizar por impacto, corregir los 3 principales (LCP, CLS, bundle size) (~35 min)

**Validación:** Lighthouse Performance >= 90 en móvil (~5 min)

**Criterios de aceptación:**
- [ ] Lighthouse Performance >= 90
- [ ] LCP < 2.5s en Slow 4G
- [ ] CLS = 0 (sin layout shifts)

---

### 🟢 Actividad 5.2 — Implementar lazy loading y code splitting

- [ ] Completada

**Duración:** ~55 min

**Lectura:** Consultar las secciones de lazy loading y code splitting en los documentos de principios y ecosistema (~10 min)

**Práctica:** Agregar code splitting por ruta. Agregar `loading="lazy"` a imágenes below-the-fold. Asegurar que la imagen hero tiene `fetchpriority="high"` y NO `loading="lazy"` (~35 min)

**Validación:** Verificar chunks separados en build; inspeccionar hero en DevTools (~10 min)

**Criterios de aceptación:**
- [ ] Cada ruta tiene su propio chunk JS
- [ ] La imagen hero NO tiene `loading="lazy"`
- [ ] La imagen hero tiene `fetchpriority="high"`

---

### 🟢 Actividad 5.3 — Analizar y reducir el bundle

- [ ] Completada

**Duración:** ~55 min

**Lectura:** Consultar las secciones de optimización de bundle en el documento de principios (~5 min)

**Práctica:** Ejecutar bundle analyzer. Identificar las 3 dependencias más grandes. Implementar al menos una reducción (tree shaking, reemplazo de librería, eliminación de import innecesario) (~40 min)

**Validación:** Comparar tamaño antes vs después — al menos 20% menos (~10 min)

**Criterios de aceptación:**
- [ ] Bundle reducido al menos 20%
- [ ] Se identifican las 3 dependencias más grandes
- [ ] Al menos una optimización implementada

---

## Actividades Recomendadas

### 🟡 Actividad 5.4 — Construir una lista virtualizada de 10,000 elementos

- [ ] Completada

**Duración:** ~55 min

**Lectura:** Consultar las secciones de virtualización en el documento de principios (~5 min)

**Práctica:** Usar `@tanstack/virtual` o `react-window` para renderizar 10,000 elementos sin jank (~40 min)

**Validación:** DevTools Performance -> scroll rápido -> frame rate > 55fps (~10 min)

**Criterios de aceptación:**
- [ ] Scroll a 60fps con 10,000 elementos
- [ ] Ningún frame mayor a 16ms
- [ ] Solo los elementos visibles se renderizan en el DOM

---

### 🟡 Actividad 5.5 — Memoización: cuándo sí y cuándo NO

- [ ] Completada

**Duración:** ~50 min

**Lectura:** Consultar las secciones de memoización y anti-patterns en el documento de principios (~15 min)

**Práctica:** Identificar un re-render costoso con React Profiler. Aplicar `React.memo`/`useMemo`. Luego demostrar cómo un inline object rompe la memoización silenciosamente (~30 min)

**Validación:** Documentar qué se midió como costoso antes de memoizar (~5 min)

**Criterios de aceptación:**
- [ ] Cada memoización tiene una justificación medida
- [ ] Se demuestra cómo un inline object rompe `React.memo`
- [ ] "Podría ser lento" NO es justificación aceptable

---

## Actividades Avanzadas

### 🔴 Actividad 5.6 — Medir rendimiento real vs sintético

- [ ] Completada

**Duración:** ~50 min

**Lectura:** Consultar las secciones de anti-patterns de rendimiento en el documento del ecosistema (~10 min)

**Práctica:** Comparar Lighthouse (sintético) vs `web-vitals` library (real). Auditar impacto de scripts de terceros con DevTools. Documentar diferencias (~30 min)

**Validación:** El análisis identifica al menos una discrepancia sintético vs real (~10 min)

**Criterios de aceptación:**
- [ ] Se instala y configura `web-vitals` para métricas reales
- [ ] Se identifican scripts de terceros y su impacto
- [ ] Se documenta al menos una diferencia Lighthouse vs RUM

---

### 🔴 Actividad 5.7 — Validación integral de Etapa 5

- [ ] Completada

**Duración:** ~55 min

**Lectura:** Revisar los criterios de aceptación de toda la etapa (~5 min)

**Práctica:** Verificar todos los criterios 5.1-5.8 (~40 min)

**Validación:** Los 8 criterios pasan (~10 min)

**Criterios de aceptación:**
- [ ] Todos los criterios 5.1-5.8 se cumplen

---

## Material de lectura en esta etapa

> Esta etapa se apoya en las secciones de rendimiento de los documentos de referencia generales (principios y ecosistema). El material cubre Core Web Vitals, RAIL, lazy loading, code splitting, virtualización, memoización y medición de rendimiento.

---

[← Etapa anterior: Usabilidad](../stage-4-usability-and-design/) | [Volver al índice](../README.md) | [Etapa siguiente: Seguridad →](../stage-6-security-and-resilience/)
