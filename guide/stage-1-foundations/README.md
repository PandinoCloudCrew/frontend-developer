# Etapa 1: Fundamentos

[Inicio](../README.md) > Etapa 1

> La plataforma antes del framework. Domina HTML, CSS, JavaScript, TypeScript y accesibilidad antes de tocar cualquier framework.

**Prerrequisitos:** Ninguno. Esta etapa comienza desde cero — la primera actividad te guía para instalar todo lo que necesitas.

**Por qué esta etapa importa:** Todo framework (Angular, React, Vue) se compila a HTML, CSS y JavaScript. Si no entiendes lo que pasa en esa capa, vas a luchar contra el framework en lugar de usarlo. Los desarrolladores que se saltan los fundamentos terminan copiando código sin entender por qué funciona — y no saben qué hacer cuando falla.

> **Lectura recomendada antes de empezar:** [Pilares de Diseño para Aplicaciones Frontend](./lecturas/00-pilares-de-diseno.md) — los 7 principios de calidad (Usabilidad, Resiliencia, Rendimiento, Seguridad, Accesibilidad, Mantenibilidad, Observabilidad) que guían toda la guía.

---

## Progreso

**Esenciales:** 0/10 | **Recomendadas:** 0/2 | **Avanzadas:** 0/3

---

## Actividades Esenciales 🟢

| # | Actividad | Duración | Estado |
|:-:|-----------|:--------:|:------:|
| 1.0 | [Preparar tu entorno de desarrollo](#10--preparar-tu-entorno-de-desarrollo) | ~45 min | ☐ |
| 1.1 | [Construir un documento HTML con estructura semántica](#11--construir-un-documento-html-con-estructura-semántica) | ~55 min | ☐ |
| 1.2 | [Agregar formularios con validación nativa](#12--agregar-formularios-con-validación-nativa) | ~50 min | ☐ |
| 1.3 | [Entender el box model y construir layouts con Flexbox](#13--entender-el-box-model-y-construir-layouts-con-flexbox) | ~55 min | ☐ |
| 1.4 | [Construir layouts con CSS Grid](#14--construir-layouts-con-css-grid) | ~60 min | ☐ |
| 1.5 | [JavaScript moderno: módulos, destructuring y async/await](#15--javascript-moderno) | ~55 min | ☐ |
| 1.6 | [Escribir un transformador de datos en TypeScript](#16--escribir-un-transformador-de-datos-en-typescript) | ~60 min | ☐ |
| 1.6b | [Escribir tus primeros tests unitarios](#16b--escribir-tus-primeros-tests-unitarios) | ~50 min | ☐ |
| 1.7 | [Auditar accesibilidad con teclado](#17--auditar-accesibilidad-con-teclado) | ~50 min | ☐ |
| 1.8 | [Interactividad con el DOM](#18--interactividad-con-el-dom) | ~55 min | ☐ |

## Actividades Recomendadas 🟡

| # | Actividad | Duración | Estado |
|:-:|-----------|:--------:|:------:|
| 1.9 | [Métodos de array y closures](#19--métodos-de-array-y-closures) | ~50 min | ☐ |
| 1.10 | [Reproducir un mockup completo con Flexbox + Grid](#110--reproducir-un-mockup-completo) | ~60 min | ☐ |

## Actividades Avanzadas 🔴

| # | Actividad | Duración | Estado |
|:-:|-----------|:--------:|:------:|
| 1.11 | [Event loop y Map/Set/WeakMap](#111--event-loop-y-mapsetweakmap) | ~50 min | ☐ |
| 1.12 | [Stacking context y z-index](#112--stacking-context-y-z-index) | ~45 min | ☐ |
| 1.13 | [Validación integral de Etapa 1](#113--validación-integral) | ~55 min | ☐ |

---

## Detalle de actividades

### 1.0 — Preparar tu entorno de desarrollo

**Por qué:** Sin las herramientas correctas, cada actividad siguiente será frustrante. Este paso te ahorra horas de problemas.

| | |
|---|---|
| **Requiere** | Saber instalar programas en tu computadora |
| **Aprenderás** | Instalar VS Code, Node.js y extensiones. Usar la terminal y configurar un linter que detecta errores |
| **Al completar** | Tu computadora está lista para programar. Puedes crear archivos, ejecutar comandos y el linter te avisa cuando cometes errores |

[→ Ir a la actividad](./actividades/1.0-entorno-de-desarrollo.md)

---

### 1.1 — Construir un documento HTML con estructura semántica

**Por qué:** HTML es el esqueleto de toda página web. Usar los elementos correctos (`<nav>`, `<main>`, `<article>`) hace que tu página sea accesible para personas con discapacidades, mejor indexada por Google, y más fácil de mantener. Un `<div>` para todo funciona visualmente pero pierdes todo esto.

| | |
|---|---|
| **Requiere** | Actividad 1.0 completada (VS Code + Live Server instalados) |
| **Aprenderás** | La estructura de un documento HTML, los elementos semánticos, la diferencia entre `<div>` y elementos con significado, cómo el navegador interpreta tu HTML |
| **Al completar** | Tienes una página de perfil personal que pasa validación HTML, tiene jerarquía de encabezados correcta, y usa cero `<div>` para estructura |

[→ Ir a la actividad](./actividades/1.1-perfil-semantico.md)

---

### 1.2 — Agregar formularios con validación nativa

**Por qué:** Los formularios son la forma principal en que los usuarios envían datos en la web. HTML tiene validación integrada (`required`, `type="email"`, `pattern`) que funciona sin JavaScript — pero la mayoría de desarrolladores no la conoce y reinventa la rueda con código.

| | |
|---|---|
| **Requiere** | Actividad 1.1 completada (página de perfil) |
| **Aprenderás** | Crear formularios con `<form>`, agrupar campos con `<fieldset>`/`<legend>`, asociar labels a inputs, y usar validación nativa del navegador |
| **Al completar** | Tu página de perfil tiene un formulario de contacto que valida datos sin una sola línea de JavaScript |

[→ Ir a la actividad](./actividades/1.2-formulario-contacto.md)

---

### 1.3 — Entender el box model y construir layouts con Flexbox

**Por qué:** Todo elemento en CSS es una caja. Si no entiendes cómo funciona el box model, tu layout se romperá de formas misteriosas (elementos más anchos de lo esperado, márgenes que se colapsan). Flexbox resuelve el 80% de los problemas de layout que antes requerían hacks.

| | |
|---|---|
| **Requiere** | Actividades 1.1 y 1.2 completadas. Saber crear y abrir archivos HTML |
| **Aprenderás** | Qué es CSS y cómo conectarlo a HTML, el box model (`content-box` vs `border-box`), Flexbox (ejes, alineación, `gap`, `wrap`), unidades relativas (`rem` en lugar de `px`) |
| **Al completar** | Tienes 3 patrones de layout con Flexbox: navbar horizontal, grid de tarjetas con wrap, y centering perfecto. Todo sin valores en píxeles |

[→ Ir a la actividad](./actividades/1.3-box-model-flexbox.md)

---

### 1.4 — Construir layouts con CSS Grid

**Por qué:** Flexbox es para layouts de una dimensión (fila O columna). CSS Grid es para layouts de dos dimensiones (filas Y columnas). Un dashboard con sidebar, header y área de contenido es un problema de Grid, no de Flexbox. Ambos se complementan.

| | |
|---|---|
| **Requiere** | Actividad 1.3 completada (entiendes CSS y Flexbox) |
| **Aprenderás** | CSS Grid: definir filas y columnas, `grid-template-areas`, `auto-fill`/`auto-fit` con `minmax` para grids responsivos, cuándo usar Grid vs Flexbox |
| **Al completar** | Tienes un dashboard con sidebar + header + área de contenido + grid de tarjetas que se adapta a 3 tamaños de pantalla. Sin media queries para las tarjetas |

[→ Ir a la actividad](./actividades/1.4-css-grid.md)

---

### 1.5 — JavaScript moderno

**Por qué:** JavaScript es lo que hace que una página sea interactiva. HTML es el esqueleto, CSS es la piel, JavaScript es el cerebro. Sin él, tu página es un documento estático. JavaScript moderno (ES2020+) es muy diferente al JavaScript de hace 10 años — más legible, más seguro, más expresivo.

| | |
|---|---|
| **Requiere** | Actividades 1.1-1.4 completadas. Tener Node.js instalado (Actividad 1.0) |
| **Aprenderás** | Módulos (`import`/`export`), `let`/`const`, destructuring, spread, optional chaining, `async`/`await`, manejo de errores con `try`/`catch` |
| **Al completar** | Tienes un módulo JavaScript que obtiene datos de una API pública, los transforma y maneja errores. Cero uso de `var`, todo modular |

[→ Ir a la actividad](./actividades/1.5-javascript-moderno.md)

---

### 1.6 — Escribir un transformador de datos en TypeScript

**Por qué:** TypeScript es JavaScript con verificación de tipos. Atrapa errores antes de ejecutar el código — por ejemplo, te avisa si intentas acceder a una propiedad que no existe. En 2026, el 82% de las ofertas de trabajo frontend piden TypeScript. No es opcional.

| | |
|---|---|
| **Requiere** | Actividad 1.5 completada (entiendes módulos, async/await, fetch) |
| **Aprenderás** | Qué es TypeScript, cómo configurar un proyecto con `strict: true`, interfaces, tipos, por qué `any` derrota el propósito, cómo `unknown` es la alternativa segura |
| **Al completar** | Tienes un transformador de datos que compila sin errores con `strict: true`, usa cero `any`, y muestra un mensaje de error significativo cuando la red falla |

[→ Ir a la actividad](./actividades/1.6-typescript-transformador.md)

---

### 1.6b — Escribir tus primeros tests unitarios

**Por qué:** Has escrito un transformador de datos que funciona — ¿pero cómo lo sabes? Lo verificaste manualmente. Cuando tu proyecto tenga 50 funciones, verificar todo a mano es imposible. Los tests automatizan esa verificación: los escribes una vez y los ejecutas cada vez que cambias algo. Si un test falla, sabes exactamente qué se rompió.

| | |
|---|---|
| **Requiere** | Actividad 1.6 completada (proyecto TypeScript con funciones de transformación) |
| **Aprenderás** | Instalar Vitest, los principios FIRST (Fast, Isolated, Repeatable, Self-validating, Timely), el patrón AAA (Arrange-Act-Assert), testear casos límite |
| **Al completar** | Tu transformador tiene 4+ tests que pasan en menos de 1 segundo. Sabes que si rompes algo, un test te avisa |

[→ Ir a la actividad](./actividades/1.6b-testing-basico.md)

---

### 1.7 — Auditar accesibilidad con teclado

**Por qué:** El 15% de la población mundial tiene alguna discapacidad. Si tu página no se puede navegar con teclado, estás excluyendo a millones de personas. Además, es un requisito legal en la UE (European Accessibility Act, vigente desde junio 2025). Y sorpresa: los elementos semánticos de la Actividad 1.1 te dan accesibilidad gratis.

| | |
|---|---|
| **Requiere** | Actividades 1.1 y 1.2 completadas (página con formulario) |
| **Aprenderás** | Navegar una página solo con teclado (Tab, Enter, Space, Escape), identificar elementos inaccesibles, ejecutar auditorías con Lighthouse y pa11y |
| **Al completar** | Has navegado tu página sin tocar el ratón, documentado los fallos, corregido los 3 más críticos, y tu Lighthouse Accessibility está por encima de 90 |

[→ Ir a la actividad](./actividades/1.7-accesibilidad-teclado.md)

---

### 1.8 — Interactividad con el DOM

**Por qué:** Hasta ahora tu JavaScript obtiene datos pero no modifica la página. El DOM (Document Object Model) es la representación de tu HTML en memoria que JavaScript puede manipular — cambiar texto, agregar elementos, responder a clicks. Esto es lo que hace una página "interactiva".

| | |
|---|---|
| **Requiere** | Actividades 1.5 y 1.6 completadas (entiendes JavaScript y TypeScript) |
| **Aprenderás** | Seleccionar elementos con `getElementById`/`querySelector`, escuchar eventos con `addEventListener`, crear y modificar elementos, construir una lista de tareas interactiva |
| **Al completar** | Tienes una lista de tareas donde puedes agregar, completar y eliminar items — todo con JavaScript manipulando el DOM |

[→ Ir a la actividad](./actividades/1.8-interactividad-dom.md)

---

### 1.9 — Métodos de array y closures

**Por qué:** En frontend, casi todo son listas de datos: lista de productos, lista de usuarios, lista de notificaciones. Los métodos de array (`map`, `filter`, `reduce`) son la forma idiomática de transformar estas listas. Los closures son el mecanismo que hace funcionar los hooks de React y los composables de Vue — entenderlos previene bugs difíciles de rastrear.

| | |
|---|---|
| **Requiere** | Actividad 1.5 completada |
| **Aprenderás** | `map`, `filter`, `reduce`, `find`, `some`, `every`, closures, scope léxico, por qué `forEach` no es lo mismo que `map` |
| **Al completar** | Puedes transformar datos de APIs con cadenas de métodos funcionales y entiendes cómo los closures capturan variables |

[→ Ir a la actividad](./actividades/1.9-arrays-closures.md)

---

### 1.10 — Reproducir un mockup completo

**Por qué:** En un trabajo real, recibirás diseños (mockups) que debes implementar fielmente con HTML y CSS. Esta actividad simula ese flujo: tienes una imagen de referencia y debes reproducirla combinando todo lo aprendido (Flexbox + Grid + unidades relativas).

| | |
|---|---|
| **Requiere** | Actividades 1.3 y 1.4 completadas |
| **Aprenderás** | Integrar Flexbox y Grid en un layout real, usar `clamp()` para tipografía fluida, tomar decisiones de cuándo usar Flexbox vs Grid |
| **Al completar** | Has reproducido un dashboard completo que funciona en 3 tamaños de pantalla sin un solo valor en `px` para espaciado |

[→ Ir a la actividad](./actividades/1.10-mockup-dashboard.md)

---

### 1.11 — Event loop y Map/Set/WeakMap

**Por qué:** JavaScript es single-threaded pero maneja operaciones asíncronas. El event loop es el mecanismo que lo hace posible. Si no lo entiendes, bugs como "mi callback se ejecuta antes de que los datos estén listos" serán misteriosos. `Map`/`Set`/`WeakMap` son estructuras de datos que resuelven problemas que los objetos/arrays no pueden.

| | |
|---|---|
| **Requiere** | Actividades 1.5 y 1.9 completadas |
| **Aprenderás** | Cómo funciona el event loop, microtasks vs macrotasks, `Map` como alternativa a objetos, `Set` para valores únicos, `WeakMap` para datos privados sin memory leaks |
| **Al completar** | Puedes predecir el orden de ejecución de código asíncrono y usas la estructura de datos correcta para cada problema |

[→ Ir a la actividad](./actividades/1.11-event-loop.md)

---

### 1.12 — Stacking context y z-index

**Por qué:** `z-index: 9999` es el signo de un developer que no entiende cómo funciona el apilamiento en CSS. Los stacking contexts determinan qué elemento aparece encima de cuál, y `z-index` solo funciona dentro de su contexto. Sin entender esto, los dropdowns quedan detrás de modals y los tooltips desaparecen.

| | |
|---|---|
| **Requiere** | Actividad 1.3 completada |
| **Aprenderás** | Qué crea un stacking context, por qué `z-index: 9999` puede no funcionar, cómo diagnosticar problemas de apilamiento en DevTools |
| **Al completar** | Puedes explicar por qué un elemento con `z-index` alto queda atrapado dentro de su contexto padre |

[→ Ir a la actividad](./actividades/1.12-stacking-context.md)

---

### 1.13 — Validación integral

**Por qué:** Antes de avanzar a la Etapa 2, necesitas confirmar que dominas todos los fundamentos. Esta actividad ejecuta todos los criterios de aceptación de la etapa y te ayuda a identificar y cerrar cualquier brecha.

| | |
|---|---|
| **Requiere** | Todas las actividades esenciales (1.0-1.8) completadas |
| **Aprenderás** | Cómo ejecutar scripts de validación, interpretar resultados, y corregir fallos restantes |
| **Al completar** | Todos los criterios de aceptación de la etapa pasan: HTML válido, TypeScript strict, linting limpio, accesibilidad verificada |

[→ Ir a la actividad](./actividades/1.13-validacion-integral.md)

---

## Material de lectura

| Archivo | Contenido |
|---------|-----------|
| [00-pilares-de-diseño.md](./lecturas/00-pilares-de-diseno.md) | **Los 7 pilares de calidad**: Usabilidad, Resiliencia, Rendimiento, Seguridad, Accesibilidad, Mantenibilidad, Observabilidad |
| [01-html-semántico.md](./lecturas/01-html-semantico.md) | HTML semántico, estructura del documento, elementos semánticos y el DOM |
| [02-formularios-nativos.md](./lecturas/02-formularios-nativos.md) | Formularios HTML, validación nativa, fieldset y legend |
| [03-css-box-model.md](./lecturas/03-css-box-model.md) | CSS box model, border-box, stacking context y z-index |
| [04-css-flexbox.md](./lecturas/04-css-flexbox.md) | CSS Flexbox: ejes, alineación, wrap y patrones comunes |
| [05-css-grid.md](./lecturas/05-css-grid.md) | CSS Grid: tracks, areas, auto-fill/auto-fit y minmax |
| [06-javascript-moderno.md](./lecturas/06-javascript-moderno.md) | JavaScript ES2020+: módulos, destructuring, spread, optional chaining, async/await |
| [07-arrays-closures-event-loop.md](./lecturas/07-arrays-closures-event-loop.md) | Métodos de array, closures, event loop, Map/Set/WeakMap |
| [08-typescript-básico.md](./lecturas/08-typescript-basico.md) | TypeScript básico: interfaces, tipos, strict mode, generics |
| [09-accesibilidad-fundamentos.md](./lecturas/09-accesibilidad-fundamentos.md) | Accesibilidad: navegación por teclado, ARIA, WCAG |
| [10-entorno-de-desarrollo.md](./lecturas/10-entorno-de-desarrollo.md) | Entorno de desarrollo: linters, DevTools, herramientas DX |
| [11-testing-básico.md](./lecturas/11-testing-basico.md) | Testing básico: Vitest, principios FIRST, patrón AAA, tu primer test |

---

[← Inicio](../README.md) | [Siguiente: Etapa 2 →](../stage-2-component-architecture/)
