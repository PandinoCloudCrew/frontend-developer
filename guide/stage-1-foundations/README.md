# Etapa 1: Fundamentos

> La plataforma antes del framework. Domina HTML, CSS, JavaScript, TypeScript y accesibilidad antes de tocar cualquier framework.

**Prerrequisitos:** Ninguno.

---

## Progreso

**Esenciales:** 0/8 | **Recomendadas:** 0/2 | **Avanzadas:** 0/3

---

## Actividades Esenciales

### 🟢 Actividad 1.1 — Construir un documento HTML con estructura semántica

- [ ] Completada

**Duración:** ~55 min

**Lectura:**
- [HTML Semántico y el DOM](./lecturas/01-html-semantico.md) (~20 min)

**Práctica:** Construir una página de perfil personal usando solo HTML semántico — `nav`, `header`, `main`, `section`, `article`, `aside`, `footer`. Sin `div` para estructura. Incluir un `h1` y jerarquía de encabezados correcta (~30 min)

**Validación:** Buscar `<div>` en DevTools; ejecutar `npx html-validate` (~5 min)

**Criterios de aceptación:**
- [ ] Cero `div` usados para layout estructural
- [ ] Pasa html-validate sin errores
- [ ] Exactamente un `h1`, jerarquía sin saltos

---

### 🟢 Actividad 1.2 — Agregar formularios con validación nativa

- [ ] Completada

**Duración:** ~50 min

**Lectura:**
- [Formularios Nativos](./lecturas/02-formularios-nativos.md) (~10 min)

**Práctica:** Agregar formulario de contacto a la página de perfil con `fieldset`, `legend`, `label` asociados y atributos de validación nativa (`required`, `pattern`, `type="email"`) (~35 min)

**Validación:** Enviar vacío, verificar mensajes nativos; verificar labels en DevTools (~5 min)

**Criterios de aceptación:**
- [ ] Cada `input` tiene un `label` asociado (for/id)
- [ ] Los campos requeridos muestran error nativo al enviar vacío
- [ ] El `fieldset` agrupa campos relacionados con `legend`

---

### 🟢 Actividad 1.3 — Entender el box model y construir layouts con Flexbox

- [ ] Completada

**Duración:** ~55 min

**Lectura:**
- [CSS Box Model](./lecturas/03-css-box-model.md) (~10 min)
- [CSS Flexbox](./lecturas/04-css-flexbox.md) (~15 min)

**Práctica:** Aplicar reset `border-box`. Construir 3 patrones con Flexbox: navbar horizontal, card row con wrap, centering perfecto. Todo con `rem` y `gap` (~25 min)

**Validación:** Verificar box model en DevTools; verificar en 3 anchos de viewport (~5 min)

**Criterios de aceptación:**
- [ ] Reset universal `box-sizing: border-box` aplicado
- [ ] Los 3 patrones usan `gap`, no margin entre items
- [ ] Sin valores `px` para espaciado (solo `rem`/`em`)

---

### 🟢 Actividad 1.4 — Construir layouts con CSS Grid

- [ ] Completada

**Duración:** ~60 min

**Lectura:**
- [CSS Grid](./lecturas/05-css-grid.md) (~20 min)

**Práctica:** Implementar layout de dashboard con Grid: sidebar + header + contenido principal + grid de tarjetas responsivo con `auto-fill`/`minmax` (~35 min)

**Validación:** Verificar en 320px, 768px, 1280px sin overflow (~5 min)

**Criterios de aceptación:**
- [ ] El layout usa CSS Grid con areas nombradas
- [ ] Las tarjetas usan `auto-fill`/`auto-fit` con `minmax` (responsivas sin media queries)
- [ ] Funciona en 3 anchos sin scroll horizontal

---

### 🟢 Actividad 1.5 — Dominar JavaScript moderno: módulos, destructuring y async/await

- [ ] Completada

**Duración:** ~55 min

**Lectura:**
- [JavaScript Moderno](./lecturas/06-javascript-moderno.md) (~20 min)

**Práctica:** Crear un módulo que haga fetch a una API pública, use destructuring para extraer datos, spread para copias inmutables, optional chaining para datos anidados, y `async`/`await` con `try`/`catch` (~30 min)

**Validación:** Cero `var`; cada llamada async tiene manejo de error (~5 min)

**Criterios de aceptación:**
- [ ] Todos los módulos usan `import`/`export`
- [ ] Cero uso de `var`
- [ ] Cada llamada async tiene `try`/`catch` explícito
- [ ] Se usa spread para copias (no mutación directa)

---

### 🟢 Actividad 1.6 — Escribir un transformador de datos en TypeScript

- [ ] Completada

**Duración:** ~60 min

**Lectura:**
- [TypeScript Básico](./lecturas/08-typescript-basico.md) (~15 min)

**Práctica:** Implementar módulo que obtiene JSON de API pública, define interfaces TypeScript para la forma de datos, transforma los datos y maneja errores. `strict: true`, cero `any` (~35 min)

**Validación:** `npx tsc --noEmit`; `grep ": any" src/`; probar offline (~10 min)

**Criterios de aceptación:**
- [ ] Compila con `strict: true` sin errores
- [ ] `grep ": any"` devuelve cero resultados
- [ ] En modo offline muestra mensaje de error significativo

---

### 🟢 Actividad 1.7 — Auditar accesibilidad con teclado

- [ ] Completada

**Duración:** ~50 min

**Lectura:**
- [Accesibilidad Fundamentos](./lecturas/09-accesibilidad-fundamentos.md) (~10 min)

**Práctica:** Desconectar el ratón. Navegar toda la página solo con teclado (Tab, Enter, Space, Escape). Documentar cada fallo. Corregir los 3 más críticos (~30 min)

**Validación:** `npx pa11y http://localhost:3000`; Lighthouse Accessibility (~10 min)

**Criterios de aceptación:**
- [ ] Todo elemento interactivo alcanzable con Tab y activable con Enter/Space
- [ ] Foco visible en cada elemento enfocable
- [ ] Lighthouse Accessibility > 90

---

### 🟢 Actividad 1.8 — Configurar entorno de desarrollo

- [ ] Completada

**Duración:** ~45 min

**Lectura:**
- [Entorno de Desarrollo](./lecturas/10-entorno-de-desarrollo.md) (~10 min)

**Práctica:** Configurar proyecto con linter (ESLint o Biome). Verificar que detecta `var`, variables no usadas y `console.log`. Explorar DevTools: Elements, Console, Network (~30 min)

**Validación:** Introducir 3 errores, verificar que el linter los marca (~5 min)

**Criterios de aceptación:**
- [ ] El linter marca `var`, variables no usadas y `console.log`
- [ ] El estudiante inspecciona un elemento en DevTools Elements
- [ ] `npx eslint/biome check` pasa con cero warnings en código limpio

---

## Actividades Recomendadas

### 🟡 Actividad 1.9 — Dominar métodos de array y closures

- [ ] Completada

**Duración:** ~50 min

**Lectura:**
- [Arrays, Closures y Event Loop](./lecturas/07-arrays-closures-event-loop.md) (~15 min)

**Práctica:** Implementar transformaciones de datos usando cadenas de `map`/`filter`/`reduce`; crear un closure práctico (counter factory, event handler con contexto) (~30 min)

**Validación:** Verificar que no se usa `forEach` donde `map`/`filter` aplica (~5 min)

**Criterios de aceptación:**
- [ ] Se usan al menos 3 métodos funcionales de array
- [ ] Se demuestra un closure funcional
- [ ] No hay mutación de arrays originales

---

### 🟡 Actividad 1.10 — Reproducir un mockup completo con Flexbox + Grid

- [ ] Completada

**Duración:** ~60 min

**Lectura:**
- [CSS Flexbox](./lecturas/04-css-flexbox.md) (repaso, ~5 min)
- [CSS Grid](./lecturas/05-css-grid.md) (repaso, ~5 min)

**Práctica:** Reproducir mockup de dashboard completo combinando Flexbox y Grid, 3 breakpoints, solo `rem`/`clamp()` (~45 min)

**Validación:** `grep -rn "[0-9]px" src/**/*.css`; verificar 320px, 768px, 1280px (~10 min)

**Criterios de aceptación:**
- [ ] El layout reproduce el mockup proporcionado
- [ ] `grep px` devuelve solo bordes/sombras
- [ ] Toda la tipografía es fluida (`clamp` o `rem`)

---

## Actividades Avanzadas

### 🔴 Actividad 1.11 — Entender el event loop y Map/Set/WeakMap

- [ ] Completada

**Duración:** ~50 min

**Lectura:**
- [Arrays, Closures y Event Loop](./lecturas/07-arrays-closures-event-loop.md) (secciones de event loop y Map/Set, ~15 min)

**Práctica:** Predecir el orden de ejecución de 3 snippets con `setTimeout`, Promises y microtasks. Implementar un caché con `Map` y un registro de observers con `WeakMap` (~30 min)

**Validación:** Verificar predicciones ejecutando los snippets (~5 min)

**Criterios de aceptación:**
- [ ] Las 3 predicciones de orden de ejecución son correctas
- [ ] El caché con `Map` funciona correctamente
- [ ] El `WeakMap` no impide garbage collection

---

### 🔴 Actividad 1.12 — Stacking context y z-index en profundidad

- [ ] Completada

**Duración:** ~45 min

**Lectura:**
- [CSS Box Model](./lecturas/03-css-box-model.md) (sección de stacking context, ~10 min)

**Práctica:** Crear una demo con 3 stacking contexts anidados. Demostrar que `z-index: 9999` puede quedar atrapado dentro de un contexto padre con `z-index` menor (~30 min)

**Validación:** Verificar en DevTools Layers (~5 min)

**Criterios de aceptación:**
- [ ] Se demuestra que un `z-index` alto falla dentro de un contexto padre
- [ ] Se identifica qué propiedades CSS crean un stacking context

---

### 🔴 Actividad 1.13 — Validación integral de Etapa 1

- [ ] Completada

**Duración:** ~55 min

**Lectura:** Revisar los criterios de aceptación de toda la etapa (~5 min)

**Práctica:** Ejecutar los 6 comandos del script de validación. Corregir cualquier fallo restante (~40 min)

```bash
# 1. HTML validation
npx html-validate dist/index.html

# 2. No `any` in TypeScript
grep -rn ": any" src/ && echo "FAIL: found 'any'" || echo "PASS: no 'any' found"

# 3. TypeScript strict compilation
npx tsc --noEmit --strict

# 4. Lint check
npx eslint src/ --max-warnings=0

# 5. Accessibility quick check
npx pa11y http://localhost:3000

# 6. Search for px values in CSS
grep -rn "[0-9]px" src/**/*.css | grep -v "border\|shadow\|1px"
```

**Validación:** Los 6 comandos pasan (~10 min)

**Criterios de aceptación:**
- [ ] `html-validate` pasa sin errores
- [ ] `tsc --noEmit --strict` pasa
- [ ] Lint check pasa con cero warnings
- [ ] `pa11y` no reporta errores críticos

---

## Material de lectura en esta etapa

| Archivo | Contenido |
|---------|-----------|
| [01-html-semantico.md](./lecturas/01-html-semantico.md) | HTML semántico, estructura del documento, elementos semánticos y el DOM |
| [02-formularios-nativos.md](./lecturas/02-formularios-nativos.md) | Formularios HTML, validación nativa, fieldset y legend |
| [03-css-box-model.md](./lecturas/03-css-box-model.md) | CSS box model, border-box, stacking context y z-index |
| [04-css-flexbox.md](./lecturas/04-css-flexbox.md) | CSS Flexbox: ejes, alineación, wrap y patrones comunes |
| [05-css-grid.md](./lecturas/05-css-grid.md) | CSS Grid: tracks, areas, auto-fill/auto-fit y minmax |
| [06-javascript-moderno.md](./lecturas/06-javascript-moderno.md) | JavaScript ES2020+: módulos, destructuring, spread, optional chaining, async/await |
| [07-arrays-closures-event-loop.md](./lecturas/07-arrays-closures-event-loop.md) | Métodos de array, closures, event loop, Map/Set/WeakMap |
| [08-typescript-basico.md](./lecturas/08-typescript-basico.md) | TypeScript básico: interfaces, tipos, strict mode, generics |
| [09-accesibilidad-fundamentos.md](./lecturas/09-accesibilidad-fundamentos.md) | Accesibilidad: navegación por teclado, ARIA, WCAG |
| [10-entorno-de-desarrollo.md](./lecturas/10-entorno-de-desarrollo.md) | Entorno de desarrollo: linters, DevTools, herramientas DX |

---

[Volver al índice](../README.md) | [Etapa siguiente: Componentes →](../stage-2-component-architecture/)
