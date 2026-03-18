# Etapa 4: Usabilidad y Principios de Diseño

> Construir interfaces que la gente realmente quiera usar.

**Prerrequisitos:** Etapa 3 completada.

---

## Progreso

**Esenciales:** 0/4 | **Recomendadas:** 0/3 | **Avanzadas:** 0/2

---

## Actividades Esenciales

### 🟢 Actividad 4.1 — Construir sistema tipográfico y paleta de color

- [ ] Completada

**Duración:** ~55 min

**Lectura:** [Tipografía y Jerarquía Visual + Teoría del Color](./diseno-visual-fundamentos.md) — Secciones 1 y 2 (~20 min)

**Práctica:** Definir type scale con CSS custom properties usando ratio 1.25 y `clamp()`. Crear paleta de 3 capas (brand, neutral, semantic) con dark mode via `prefers-color-scheme` (~30 min)

**Validación:** Cero `px` para font sizes; contraste WCAG AA en DevTools (~5 min)

**Criterios de aceptación:**
- [ ] Type scale definido con custom properties
- [ ] Paleta con las 3 capas en custom properties
- [ ] Dark mode funciona con `prefers-color-scheme`
- [ ] Contraste texto/fondo cumple WCAG AA (4.5:1)

---

### 🟢 Actividad 4.2 — Implementar sistema de espaciado y diseñar formularios

- [ ] Completada

**Duración:** ~55 min

**Lectura:** [Sistemas de Espaciado + Patrones de Formularios](./diseno-visual-fundamentos.md) — Secciones 3 y 4 (~20 min)

**Práctica:** Definir tokens de espaciado (grid 8px). Rediseñar un formulario de 20 campos como wizard multi-paso con validación inline on-blur, labels arriba del input, y valores por defecto (~30 min)

**Validación:** Todo espaciado usa tokens; validación inline funciona (~5 min)

**Criterios de aceptación:**
- [ ] Tokens de espaciado definidos con custom properties
- [ ] El wizard muestra progreso y permite retroceder
- [ ] Validación ocurre al blur, no al submit
- [ ] Botón de envío deshabilitado cuando hay campos inválidos

---

### 🟢 Actividad 4.3 — Dominar las heurísticas de Nielsen

- [ ] Completada

**Duración:** ~55 min

**Lectura:** [Ejemplos de violación de heurísticas](./diseno-visual-fundamentos.md) — Sección 5 + las secciones de heurísticas de Nielsen en el documento de principios (~15 min)

**Práctica:** Auditoría heurística: dado un mockup con 10 violaciones (una por heurística), identificar cada violación, nombrar la heurística y proponer solución (~35 min)

**Validación:** Comparar con clave de respuestas: 10/10 identificadas (~5 min)

**Criterios de aceptación:**
- [ ] 10/10 violaciones identificadas correctamente
- [ ] Cada una nombra la heurística correcta
- [ ] Cada solución es accionable

---

### 🟢 Actividad 4.4 — Construir dashboard responsivo con mobile-first

- [ ] Completada

**Duración:** ~60 min

**Lectura:** Consultar las secciones de mobile-first y responsivo en el documento de principios (~5 min)

**Práctica:** Dashboard que funciona en móvil (1 columna), tablet (2 columnas), escritorio (sidebar + main). Breakpoints basados en contenido, no dispositivos (~45 min)

**Validación:** Redimensionar 320px->1920px suavemente; verificar touch targets >= 44x44px (~10 min)

**Criterios de aceptación:**
- [ ] Breakpoints basados en contenido (no en 768px/1024px)
- [ ] Usable en cada ancho entre 320px y 1920px
- [ ] Todo touch target >= 44x44px en móvil

---

## Actividades Recomendadas

### 🟡 Actividad 4.5 — Aplicar Fitts, Hick y Gestalt

- [ ] Completada

**Duración:** ~45 min

**Lectura:** Consultar las secciones de Fitts, Hick y Gestalt en el documento de principios (~10 min)

**Práctica:** Revisar el dashboard: agrupar elementos relacionados (Gestalt proximidad), reducir opciones visibles (Hick), verificar tamaño de targets (Fitts) (~30 min)

**Validación:** Ejecutar script de medición de touch targets (~5 min)

**Criterios de aceptación:**
- [ ] Elementos relacionados agrupados visualmente
- [ ] Se aplica progressive disclosure (max 2 niveles)
- [ ] Acciones frecuentes son las más accesibles

---

### 🟡 Actividad 4.6 — Implementar skeleton screens que coincidan con el layout

- [ ] Completada

**Duración:** ~50 min

**Lectura:** Consultar la sección de skeleton screens en el material de la Etapa 3 (~10 min)

**Práctica:** Mejorar los skeletons de la app: que reflejen la forma del contenido real, con animación de pulse, sin skeleton para el elemento LCP (~35 min)

**Validación:** Comparar skeleton vs contenido cargado — formas similares (~5 min)

**Criterios de aceptación:**
- [ ] Los skeletons reflejan la forma del contenido real
- [ ] Animación de pulse/shimmer
- [ ] El elemento LCP no tiene skeleton

---

### 🟡 Actividad 4.7 — Auditar y corregir dark patterns

- [ ] Completada

**Duración:** ~45 min

**Lectura:** Consultar las secciones de anti-patterns de usabilidad en el documento de principios (~10 min)

**Práctica:** Revisión por pares de la app: verificar que no hay confirm-shaming, misdirection, costos ocultos. Verificar que toda notificación es necesaria (no toast fatigue) (~30 min)

**Validación:** Otra persona confirma cero dark patterns (~5 min)

**Criterios de aceptación:**
- [ ] Cero dark patterns identificados por el revisor
- [ ] Los toasts se usan solo para resultados inciertos/asíncronos
- [ ] Todo botón deshabilitado explica por qué

---

## Actividades Avanzadas

### 🔴 Actividad 4.8 — Diseño de color para accesibilidad y prefers-reduced-motion

- [ ] Completada

**Duración:** ~45 min

**Lectura:** [Diseño de color accesible](./diseno-visual-fundamentos.md) — Sección 2, parte de accesibilidad + secciones de accesibilidad en principios (~10 min)

**Práctica:** Verificar que ningún estado usa solo color como indicador (WCAG 1.4.1). Implementar `prefers-reduced-motion` para desactivar animaciones (~30 min)

**Validación:** Ver la app en modo daltónico (DevTools); activar reduced-motion (~5 min)

**Criterios de aceptación:**
- [ ] Todo estado tiene indicador no-cromático (texto, icono)
- [ ] `prefers-reduced-motion` elimina animaciones
- [ ] La app es comprensible en simulación de daltonismo

---

### 🔴 Actividad 4.9 — Validación integral de Etapa 4

- [ ] Completada

**Duración:** ~55 min

**Lectura:** Revisar los criterios de aceptación de toda la etapa (~5 min)

**Práctica:** Verificar todos los criterios 4.1-4.8 (~40 min)

**Validación:** Los 8 criterios pasan (~10 min)

**Criterios de aceptación:**
- [ ] Todos los criterios 4.1-4.8 se cumplen

---

## Material de lectura en esta etapa

| Archivo | Contenido |
|---------|-----------|
| [diseno-visual-fundamentos.md](./diseno-visual-fundamentos.md) | Tipografía y jerarquía visual, teoría del color para UI, sistemas de espaciado, patrones de diseño de formularios, ejemplos de violación de heurísticas de Nielsen |

---

[← Etapa anterior: Estado](../stage-3-state-and-data/) | [Volver al índice](../README.md) | [Etapa siguiente: Rendimiento →](../stage-5-performance/)
