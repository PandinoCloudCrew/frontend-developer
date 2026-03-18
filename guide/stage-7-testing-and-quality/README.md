# Etapa 7: Testing y Calidad

> Confianza en cada deploy.

**Prerrequisitos:** Etapa 6 completada.

---

## Progreso

**Esenciales:** 0/3 | **Recomendadas:** 0/3 | **Avanzadas:** 0/2

---

## Actividades Esenciales

### 🟢 Actividad 7.1 — Aprender a escribir buenos tests con Testing Library

- [ ] Completada

**Duración:** ~55 min

**Lectura:** [Escribir Buenos Tests](./testing-y-code-review.md) — Sección 1: Estructura y principios de tests + Sección 2: Component testing (~20 min)

**Práctica:** Escribir tests para SearchBar con Testing Library: renderiza, acepta input, llama `onSearch` al submit, muestra error al submit vacío. Cero `getByTestId` — solo `getByRole`/`getByLabelText`/`getByText` (~30 min)

**Validación:** `grep "getByTestId\|querySelector" src/**/*.test.*` -> cero resultados (~5 min)

**Criterios de aceptación:**
- [ ] Tests siguen patrón Arrange-Act-Assert
- [ ] Cero `getByTestId` o `querySelector`
- [ ] Tests verifican comportamiento, no implementación
- [ ] Se usa `userEvent`, no `fireEvent`

---

### 🟢 Actividad 7.2 — Testear data fetching con MSW

- [ ] Completada

**Duración:** ~60 min

**Lectura:** [Component Testing con MSW](./testing-y-code-review.md) — Sección 2: Patrones avanzados de component testing (~15 min)

**Práctica:** Escribir tests de integración para un hook de data fetching usando MSW. Testear: loading, success, error, retry. Los mocks coinciden con tipos TypeScript de la API (~35 min)

**Validación:** Todos los tests pasan; las formas de MSW coinciden con tipos TS (~10 min)

**Criterios de aceptación:**
- [ ] MSW handlers para success, error y retry
- [ ] Los tests verifican los 4 estados
- [ ] Las formas de respuesta MSW coinciden con tipos TypeScript

---

### 🟢 Actividad 7.3 — Escribir test E2E del camino crítico con Playwright

- [ ] Completada

**Duración:** ~60 min

**Lectura:** [E2E Testing con Playwright](./testing-y-code-review.md) — Sección 3: Patrones de E2E testing (~20 min)

**Práctica:** E2E del camino crítico: login -> buscar -> ver detalle -> agregar al carrito. Usar Page Object Model. Auth vía API, no UI (~30 min)

**Validación:** El test completa en < 30s; usa POM (~10 min)

**Criterios de aceptación:**
- [ ] Test E2E completa el camino crítico en < 30 segundos
- [ ] Se usa Page Object Model
- [ ] Locators usan `getByRole`/`getByLabel`, no CSS selectors

---

## Actividades Recomendadas

### 🟡 Actividad 7.4 — Prácticas de code review

- [ ] Completada

**Duración:** ~50 min

**Lectura:** [Prácticas de Code Review](./testing-y-code-review.md) — Sección 4: Cómo dar y recibir feedback (~15 min)

**Práctica:** Realizar code review de un PR proporcionado. Escribir al menos 5 comentarios accionables, distinguiendo `nit:` vs `blocking:`, usando "nosotros" (~30 min)

**Validación:** Los comentarios son específicos y constructivos (~5 min)

**Criterios de aceptación:**
- [ ] Al menos 5 comentarios accionables
- [ ] Se distingue `blocking` vs `nit`
- [ ] Lenguaje constructivo ("podríamos..." no "deberías...")

---

### 🟡 Actividad 7.5 — Configurar pipeline de CI

- [ ] Completada

**Duración:** ~55 min

**Lectura:** Consultar las secciones de CI/CD en los documentos de principios y ecosistema (~15 min)

**Práctica:** Configurar GitHub Actions: lint -> unit tests -> component tests -> E2E (solo si anteriores pasan). Verificar que un error de lint falla el pipeline (~30 min)

**Validación:** Push commit con error -> pipeline falla en lint (~10 min)

**Criterios de aceptación:**
- [ ] Pipeline ejecuta lint -> unit -> E2E en orden
- [ ] E2E tiene `needs: [unit-tests]`
- [ ] Error de lint falla el pipeline antes de tests

---

### 🟡 Actividad 7.6 — Testing de accesibilidad en CI

- [ ] Completada

**Duración:** ~45 min

**Lectura:** Consultar las secciones de testing de accesibilidad en el documento del ecosistema (~10 min)

**Práctica:** Agregar axe-core al pipeline de CI. Introducir un `<button>` sin nombre accesible -> verificar que CI falla (~30 min)

**Validación:** CI falla ante violación de accesibilidad (~5 min)

**Criterios de aceptación:**
- [ ] axe-core integrado en CI
- [ ] Un botón sin nombre accesible falla el build
- [ ] Coverage >= 80% para hooks/services/utils

---

## Actividades Avanzadas

### 🔴 Actividad 7.7 — Tests avanzados: snapshots, flaky tests y contract testing

- [ ] Completada

**Duración:** ~50 min

**Lectura:** Consultar las secciones avanzadas de testing en el material de lectura + anti-patterns en el documento del ecosistema (~15 min)

**Práctica:** Demostrar cuándo un snapshot es útil (< 10 líneas) vs dañino (componente completo). Identificar y corregir un test flaky. Validar que mocks MSW coinciden con contratos (~30 min)

**Validación:** Snapshots pequeños; test flaky corregido; contract validation pasa (~5 min)

**Criterios de aceptación:**
- [ ] Snapshots solo en output pequeño y estable
- [ ] Se identifica y corrige la causa raíz de un test flaky
- [ ] Mocks MSW validados contra tipos TypeScript

---

### 🔴 Actividad 7.8 — Validación integral de Etapa 7

- [ ] Completada

**Duración:** ~55 min

**Lectura:** Revisar los criterios de aceptación de toda la etapa (~5 min)

**Práctica:** Verificar todos los criterios 7.1-7.8 (~40 min)

**Validación:** Los 8 criterios pasan (~10 min)

**Criterios de aceptación:**
- [ ] Todos los criterios 7.1-7.8 se cumplen

---

## Material de lectura en esta etapa

| Archivo | Contenido |
|---------|-----------|
| [testing-y-code-review.md](./testing-y-code-review.md) | Cómo escribir buenos tests (Arrange-Act-Assert, naming, qué testear), patrones de component testing con Testing Library y MSW, E2E testing con Playwright (Page Object Model, locators, datos de prueba), prácticas de code review |

---

[← Etapa anterior: Seguridad](../stage-6-security-and-resilience/) | [Volver al índice](../README.md) | [Etapa siguiente: Arquitectura →](../stage-8-architecture-at-scale/)
