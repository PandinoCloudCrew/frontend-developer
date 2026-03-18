# Etapa 7: Testing y Calidad

[Inicio](../README.md) > Etapa 7

> Confianza en cada deploy. Aprende a verificar automáticamente que tu código funciona — desde componentes individuales hasta el flujo completo del usuario.

**Prerrequisitos:** Etapa 6 completada.

**Por qué esta etapa importa:** En la Actividad 1.6b aprendiste a escribir tests unitarios para funciones puras con Vitest, usando los principios FIRST y el patrón AAA. Eso cubre la lógica — pero tu aplicación es mucho más que funciones. Tiene componentes con botones e inputs, flujos que cruzan múltiples páginas, y se despliega a producción donde cualquier bug afecta a usuarios reales. Esta etapa profundiza en testing: verificas componentes como los usa el usuario (Testing Library), mockeas APIs sin depender del servidor (MSW), pruebas flujos completos en un navegador real (Playwright), y automatizas todo en un pipeline de CI que bloquea errores antes de que lleguen a producción. Si te saltas esta etapa, harás deploy con los dedos cruzados.

---

## Progreso

**Esenciales:** 0/3 | **Recomendadas:** 0/3 | **Avanzadas:** 0/2

---

## Actividades Esenciales 🟢

| # | Actividad | Duración | Estado |
|:-:|-----------|:--------:|:------:|
| 7.1 | [Escribir tests de componentes con Testing Library](#71--escribir-tests-de-componentes-con-testing-library) | ~55 min | ☐ |
| 7.2 | [Testear data fetching con MSW](#72--testear-data-fetching-con-msw) | ~60 min | ☐ |
| 7.3 | [Escribir test E2E del camino crítico con Playwright](#73--escribir-test-e2e-del-camino-crítico-con-playwright) | ~60 min | ☐ |

## Actividades Recomendadas 🟡

| # | Actividad | Duración | Estado |
|:-:|-----------|:--------:|:------:|
| 7.4 | [Prácticas de code review](#74--prácticas-de-code-review) | ~50 min | ☐ |
| 7.5 | [Configurar pipeline de CI](#75--configurar-pipeline-de-ci) | ~55 min | ☐ |
| 7.6 | [Testing de accesibilidad en CI](#76--testing-de-accesibilidad-en-ci) | ~45 min | ☐ |

## Actividades Avanzadas 🔴

| # | Actividad | Duración | Estado |
|:-:|-----------|:--------:|:------:|
| 7.7 | [Tests avanzados: snapshots, flaky tests y contract testing](#77--tests-avanzados-snapshots-flaky-tests-y-contract-testing) | ~50 min | ☐ |
| 7.8 | [Validación integral de Etapa 7](#78--validación-integral-de-etapa-7) | ~55 min | ☐ |

---

## Detalle de actividades

### 7.1 — Escribir tests de componentes con Testing Library

**Por qué:** En la Actividad 1.6b testeaste funciones puras. Pero tus componentes tienen botones, inputs y texto que el usuario interactúa. Testing Library te permite testear componentes de la misma forma que un usuario los usa — buscando por roles accesibles, no por IDs internos. Tests que verifican comportamiento (no implementación) sobreviven refactorizaciones.

| | |
|---|---|
| **Requiere** | Actividad 1.6b completada (patrón AAA y Vitest), Etapa 2 completada, Etapa 6 completada |
| **Aprenderás** | Instalar `@testing-library/angular`, buscar elementos por rol y label, simular interacciones con `userEvent`, verificar comportamiento desde la perspectiva del usuario |
| **Al completar** | Tienes tests para un componente `SearchBar` que verifican renderizado, input, submit y error. Cero `getByTestId` o `querySelector` |

[→ Ir a la actividad](./actividades/7.1-testing-library.md)

---

### 7.2 — Testear data fetching con MSW

**Por qué:** Tus componentes obtienen datos de APIs. Si tus tests llaman al servidor real, son lentos y frágiles. MSW intercepta peticiones HTTP a nivel de red y responde con datos que tú controlas — tu código hace `fetch` normalmente pero MSW intercepta. Esto te permite testear loading, success, error y retry de forma confiable.

| | |
|---|---|
| **Requiere** | Actividad 7.1 completada, conocimiento de `fetch` y `async/await` (Actividad 1.5) |
| **Aprenderás** | Instalar y configurar MSW, crear handlers para simular respuestas, testear los 4 estados de data fetching, validar que mocks coincidan con tipos TypeScript |
| **Al completar** | Tests de integración con MSW handlers para success, error y retry. Respuestas MSW tipadas con TypeScript |

[→ Ir a la actividad](./actividades/7.2-msw-data-fetching.md)

---

### 7.3 — Escribir test E2E del camino crítico con Playwright

**Por qué:** Tests unitarios verifican funciones, tests de componentes verifican UI. Pero ninguno verifica que el flujo completo funciona: login -> buscar -> ver detalle -> acción principal. Un test E2E abre un navegador real y recorre el camino que un usuario recorre. Si el flujo crítico se rompe, lo sabes antes del deploy.

| | |
|---|---|
| **Requiere** | Actividades 7.1 y 7.2 completadas, una aplicación Angular con al menos 2-3 páginas navegables |
| **Aprenderás** | Instalar Playwright, escribir un test E2E del camino crítico, usar Page Object Model, autenticación vía API (no UI) |
| **Al completar** | Test E2E del camino crítico en menos de 30 segundos, usando Page Object Model y locators accesibles |

[→ Ir a la actividad](./actividades/7.3-e2e-playwright.md)

---

### 7.4 — Prácticas de code review

**Por qué:** En equipos profesionales, todo código pasa por code review antes de integrarse. Un buen review detecta bugs, mejora legibilidad y comparte conocimiento. Un mal review genera conflictos. La diferencia está en cómo comunicas: "Podríamos..." en lugar de "Deberías...".

| | |
|---|---|
| **Requiere** | Actividades 7.1-7.3 completadas, cuenta de GitHub |
| **Aprenderás** | Revisar un PR paso a paso, distinguir `nit:` de `blocking:`, escribir feedback constructivo, recibir feedback sin tomártelo personal |
| **Al completar** | Has revisado un PR con al menos 5 comentarios accionables usando convenciones `nit:`/`blocking:` con lenguaje constructivo |

[→ Ir a la actividad](./actividades/7.4-code-review.md)

---

### 7.5 — Configurar pipeline de CI

**Por qué:** Ejecutar tests manualmente no escala. Un pipeline de CI ejecuta automáticamente lint, tests y E2E cada vez que alguien sube código. Si algo falla, el merge se bloquea. No hay forma de romper el proyecto sin que el pipeline te lo diga.

| | |
|---|---|
| **Requiere** | Actividades 7.1-7.3 completadas, repositorio en GitHub |
| **Aprenderás** | Qué es CI y por qué existe, configurar GitHub Actions con YAML, definir jobs en orden con dependencias, verificar que errores bloquean el pipeline |
| **Al completar** | Pipeline de CI: lint -> unit tests -> E2E en cada push. Error de lint bloquea el pipeline antes de tests |

[→ Ir a la actividad](./actividades/7.5-ci-pipeline.md)

---

### 7.6 — Testing de accesibilidad en CI

**Por qué:** Las auditorías manuales de accesibilidad dependen de que alguien se acuerde de ejecutarlas. Integrar axe-core en CI automatiza la detección: si un botón no tiene nombre accesible, el build falla — igual que falla si hay un error de lint.

| | |
|---|---|
| **Requiere** | Actividad 7.5 completada (pipeline de CI), Actividad 1.7 completada (accesibilidad) |
| **Aprenderás** | Qué es axe-core, integrar axe-core en tests de componentes, verificar que violaciones fallan el build |
| **Al completar** | Pipeline de CI con verificaciones de accesibilidad. Un botón sin nombre accesible falla el build |

[→ Ir a la actividad](./actividades/7.6-a11y-ci.md)

---

### 7.7 — Tests avanzados: snapshots, flaky tests y contract testing

**Por qué:** Tres trampas comunes: snapshots de componentes enteros que generan falsos positivos, tests flaky que destruyen la confianza en el pipeline, y mocks desincronizados del servidor real. Esta actividad te enseña a evitar las tres.

| | |
|---|---|
| **Requiere** | Actividades 7.1 y 7.2 completadas |
| **Aprenderás** | Cuándo un snapshot es útil vs dañino, diagnosticar y corregir tests flaky, validar que mocks MSW coinciden con tipos TypeScript |
| **Al completar** | Snapshots solo en output pequeño, test flaky corregido en su causa raíz, mocks MSW pasan `npx tsc --noEmit` |

[→ Ir a la actividad](./actividades/7.7-snapshots-flaky.md)

---

### 7.8 — Validación integral de Etapa 7

**Por qué:** Antes de avanzar a la Etapa 8, confirma que dominas testing y calidad. Esta actividad ejecuta todos los criterios de aceptación de la etapa y cierra brechas.

| | |
|---|---|
| **Requiere** | Actividades 7.1-7.7 completadas |
| **Aprenderás** | Ejecutar validación integral de la suite de testing, interpretar resultados y corregir fallos |
| **Al completar** | Todos los criterios 7.1-7.7 se cumplen. Tests automatizados en CI cubren componentes, integración, E2E y accesibilidad |

[→ Ir a la actividad](./actividades/7.8-validacion-integral.md)

---

## Material de lectura

| Archivo | Contenido |
|---------|-----------|
| [01-escribir-buenos-tests.md](./lecturas/01-escribir-buenos-tests.md) | Estructura de tests: Arrange-Act-Assert, naming, qué testear, snapshots |
| [02-component-testing.md](./lecturas/02-component-testing.md) | Component testing con Testing Library, MSW, async patterns, contract testing |
| [03-e2e-con-playwright.md](./lecturas/03-e2e-con-playwright.md) | E2E testing con Playwright: Page Object Model, locators, datos de prueba |
| [04-code-review.md](./lecturas/04-code-review.md) | Prácticas de code review: cómo dar y recibir feedback |

## Material de Angular

| Archivo | Contenido |
|---------|-----------|
| [01-testing-en-angular.md](./angular/01-testing-en-angular.md) | Testing en Angular: TestBed, component harnesses, mocking de servicios |

---

[← Etapa anterior: Seguridad](../stage-6-security-and-resilience/) | [Siguiente: Etapa 8 →](../stage-8-architecture-at-scale/)
