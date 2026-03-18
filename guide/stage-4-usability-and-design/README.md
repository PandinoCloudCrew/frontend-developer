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

**Lectura:**
- [Tipografía y Jerarquía Visual](./lecturas/01-tipografia-y-jerarquia.md) (~10 min)
- [Color para UI](./lecturas/02-color-para-ui.md) (~10 min)

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

**Lectura:**
- [Sistema de Espaciado](./lecturas/03-sistema-de-espaciado.md) (~10 min)
- [Diseño de Formularios](./lecturas/04-diseno-de-formularios.md) (~10 min)

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

**Lectura:**
- [Heurísticas de Nielsen](./lecturas/05-heuristicas-de-nielsen.md) (~15 min)

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

**Lectura:**
- [Mobile-First y Responsive](./lecturas/07-mobile-first-y-responsive.md) (~5 min)

**Angular:**
- [Angular Material y CDK](./angular/01-angular-material-y-cdk.md) (~10 min)

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

**Lectura:**
- [Fitts, Hick y Gestalt](./lecturas/06-fitts-hick-gestalt.md) (~10 min)

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

**Lectura:**
- [Data Fetching: 4 Estados](../stage-3-state-and-data/lecturas/01-data-fetching-4-estados.md) (sección skeletons, ~10 min)

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

**Lectura:**
- [Anti-patterns de Usabilidad](./lecturas/08-anti-patterns-de-usabilidad.md) (~10 min)

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

**Lectura:**
- [Color para UI](./lecturas/02-color-para-ui.md) (sección contraste y accesibilidad, ~10 min)

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

### Lecturas generales

| Archivo | Contenido |
|---------|-----------|
| [01-tipografia-y-jerarquia.md](./lecturas/01-tipografia-y-jerarquia.md) | Tipografía: type scale, jerarquía visual, custom properties |
| [02-color-para-ui.md](./lecturas/02-color-para-ui.md) | Color para UI: paletas, contraste, accesibilidad, dark mode |
| [03-sistema-de-espaciado.md](./lecturas/03-sistema-de-espaciado.md) | Sistema de espaciado: grid 8px, tokens, consistencia |
| [04-diseno-de-formularios.md](./lecturas/04-diseno-de-formularios.md) | Diseño de formularios: labels, validación inline, wizards |
| [05-heuristicas-de-nielsen.md](./lecturas/05-heuristicas-de-nielsen.md) | Las 10 heurísticas de Nielsen con ejemplos |
| [06-fitts-hick-gestalt.md](./lecturas/06-fitts-hick-gestalt.md) | Leyes de Fitts, Hick y principios Gestalt |
| [07-mobile-first-y-responsive.md](./lecturas/07-mobile-first-y-responsive.md) | Mobile-first, responsive design, breakpoints por contenido |
| [08-anti-patterns-de-usabilidad.md](./lecturas/08-anti-patterns-de-usabilidad.md) | Anti-patterns de usabilidad: dark patterns, toast fatigue |

### Material de Angular

| Archivo | Contenido |
|---------|-----------|
| [01-angular-material-y-cdk.md](./angular/01-angular-material-y-cdk.md) | Angular Material, CDK y componentes de UI |

---

[← Etapa anterior: Estado](../stage-3-state-and-data/) | [Volver al índice](../README.md) | [Etapa siguiente: Rendimiento →](../stage-5-performance/)
