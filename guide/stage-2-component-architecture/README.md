# Etapa 2: Arquitectura de Componentes

[Inicio](../README.md) > Etapa 2

> Pensar en componentes — el bloque de construccion universal de los frontends modernos.

**Prerrequisitos:** Etapa 1 completada.

**Por que esta etapa importa:** Los componentes son la abstraccion fundamental de todo framework moderno (Angular, React, Vue, Svelte). Entender como descomponer una UI, disenar APIs de props, aplicar SOLID y componer componentes determina si tu código escala o se convierte en una marana de archivos de 500 lineas que nadie quiere tocar. Los desarrolladores que se saltan estos principios terminan refactorizando todo despues — o peor, construyendo sobre una base fragil.

> **Pilares de diseño que se profundizan en esta etapa:** [Mantenibilidad](../stage-1-foundations/lecturas/00-pilares-de-diseno.md) (componentes con una sola responsabilidad, extensibles via composicion), [Accesibilidad](../stage-1-foundations/lecturas/00-pilares-de-diseno.md) (navegación por teclado en compound components, roles ARIA).

---

## Progreso

**Esenciales:** 0/5 | **Recomendadas:** 0/2 | **Avanzadas:** 0/2

---

## Actividades Esenciales 🟢

| # | Actividad | Duracion | Estado |
|:-:|-----------|:--------:|:------:|
| 2.0 | [Configurar tu primer proyecto Angular](#20--configurar-tu-primer-proyecto-angular) | ~45 min | ☐ |
| 2.1 | [Descomponer una UI en componentes](#21--descomponer-una-ui-en-componentes) | ~55 min | ☐ |
| 2.2 | [Construir una biblioteca de componentes de 3 niveles](#22--construir-una-biblioteca-de-componentes-de-3-niveles) | ~55 min | ☐ |
| 2.3 | [Aplicar SRP y refactorizar un componente dios](#23--aplicar-srp-y-refactorizar-un-componente-dios) | ~60 min | ☐ |
| 2.4 | [Construir un Compound Component (Tabs)](#24--construir-un-compound-component-tabs) | ~60 min | ☐ |

## Actividades Recomendadas 🟡

| # | Actividad | Duracion | Estado |
|:-:|-----------|:--------:|:------:|
| 2.5 | [Aplicar OCP, LSP e ISP a componentes existentes](#25--aplicar-ocp-lsp-e-isp-a-componentes-existentes) | ~50 min | ☐ |
| 2.6 | [Separacion de responsabilidades con servicios y signals](#26--separacion-de-responsabilidades-con-servicios-y-signals) | ~50 min | ☐ |

## Actividades Avanzadas 🔴

| # | Actividad | Duracion | Estado |
|:-:|-----------|:--------:|:------:|
| 2.7 | [Atomic Design y cuando NO usarlo](#27--atomic-design-y-cuando-no-usarlo) | ~45 min | ☐ |
| 2.8 | [Validación integral de Etapa 2](#28--validación-integral-de-etapa-2) | ~55 min | ☐ |

---

## Detalle de actividades

### 2.0 — Configurar tu primer proyecto Angular

**Por que:** Sin un proyecto Angular funcionando, no puedes practicar nada de esta etapa. Este paso te da la base sobre la que construiras todo: CLI instalado, estructura de proyecto clara, hot reload funcionando.

| | |
|---|---|
| **Requiere** | Etapa 1 completada (Node.js, npm, VS Code, TypeScript básico) |
| **Aprenderas** | Instalar Angular CLI, crear un proyecto con `ng new`, entender la estructura de archivos, crear un componente standalone, ejecutar `ng serve` con hot reload |
| **Al completar** | Tienes un proyecto Angular funcionando con un componente que muestra "Hola Mundo" y responde a cambios en tiempo real |

[→ Ir a la actividad](./actividades/2.0-setup-angular.md)

---

### 2.1 — Descomponer una UI en componentes

**Por que:** Antes de escribir código, necesitas aprender a *ver* una interfaz como un arbol de componentes. Si no sabes descomponer una UI, terminaras con componentes gigantes que mezclan todo. "Pensar en componentes" es la habilidad #1 de todo developer frontend moderno.

| | |
|---|---|
| **Requiere** | Actividad 2.0 completada (proyecto Angular funcionando) |
| **Aprenderas** | Identificar componentes en un mockup, documentar sus props y responsabilidades, dibujar el arbol de componentes, aplicar el modelo mental Input → Output |
| **Al completar** | Tienes un documento con el arbol de componentes de una página de producto, donde cada componente tiene nombre, props y una sola responsabilidad |

[→ Ir a la actividad](./actividades/2.1-descomponer-ui.md)

---

### 2.2 — Construir una biblioteca de componentes de 3 niveles

**Por que:** Identificar componentes en papel es el primer paso. Ahora necesitas construirlos con props tipados, defaults razonables y composicion real. Un Button dentro de un SearchBar, un SearchBar dentro de un ProductCard — así es como funciona la composicion en produccion.

| | |
|---|---|
| **Requiere** | Actividad 2.1 completada (descomposicion de UI documentada) |
| **Aprenderas** | Definir interfaces TypeScript para props, usar `input()` y `output()` en Angular, componer componentes dentro de otros, disenar APIs con defaults razonables |
| **Al completar** | Tienes 3 componentes Angular (Button, SearchBar, ProductCard) que componen entre si, con props tipados y TypeScript compilando sin errores |

[→ Ir a la actividad](./actividades/2.2-biblioteca-componentes.md)

---

### 2.3 — Aplicar SRP y refactorizar un componente dios

**Por que:** En proyectos reales, los componentes crecen hasta convertirse en monstruos de 400+ lineas que hacen fetch, filtran, ordenan, paginan y renderizan en un mismo archivo. Un cambio en la lógica de filtrado puede romper el renderizado. SRP te enseña a separar responsabilidades para que cada pieza pueda cambiar independientemente.

| | |
|---|---|
| **Requiere** | Actividad 2.2 completada (experiencia construyendo componentes) |
| **Aprenderas** | Identificar violaciones de SRP, extraer lógica a servicios Angular, separar componentes de presentacion de lógica, refactorizar sin romper funcionalidad |
| **Al completar** | Has refactorizado un componente monolitico en multiples componentes y servicios, cada uno con una sola responsabilidad, y la salida es identica a la original |

[→ Ir a la actividad](./actividades/2.3-srp-refactorizar.md)

---

### 2.4 — Construir un Compound Component (Tabs)

**Por que:** Las bibliotecas de UI profesionales (Angular Material, Radix UI) usan compound components: multiples componentes que comparten estado implícito. En lugar de un `<Tabs>` con 20 props, creas `<TabGroup>`, `<Tab>`, `<TabPanel>` que se combinan libremente. Este patrón te prepara para entender y construir componentes de calidad profesional.

| | |
|---|---|
| **Requiere** | Actividades 2.2 y 2.3 completadas (composicion, servicios) |
| **Aprenderas** | El patrón compound component, compartir estado con un servicio scoped, navegación por teclado (flechas), content projection con `<ng-content>` |
| **Al completar** | Tienes un componente Tabs funcional con navegación por teclado y reordenamiento sin romper funcionalidad |

[→ Ir a la actividad](./actividades/2.4-compound-component.md)

---

### 2.5 — Aplicar OCP, LSP e ISP a componentes existentes

**Por que:** SRP es solo uno de los 5 principios SOLID. OCP previene que agregar variantes rompa el componente base. LSP asegura que las variantes sean intercambiables. ISP evita APIs infladas con props innecesarios. Detectar y corregir estas violaciones en componentes existentes es una habilidad directamente transferible a proyectos reales.

| | |
|---|---|
| **Requiere** | Actividades 2.2-2.4 completadas (componentes para auditar) |
| **Aprenderas** | OCP (extender via composicion), LSP (variantes intercambiables), ISP (APIs minimas), detectar y corregir violaciones |
| **Al completar** | Has documentado violaciones, corregido al menos una, y creado una variante sustituible |

[→ Ir a la actividad](./actividades/2.5-ocp-lsp-isp.md)

---

### 2.6 — Separacion de responsabilidades con servicios y signals

**Por que:** Si la lógica de negocio vive en el componente, solo puedes probarla renderizando UI. Si la extraes a un servicio, puedes probarla directamente. Esto acelera los tests, facilita la reutilizacion y simplifica los componentes hasta que sean casi solo template.

| | |
|---|---|
| **Requiere** | Actividades 2.3 y 2.4 completadas (servicios, refactorizacion) |
| **Aprenderas** | Extraer lógica a servicios reutilizables, controlled vs uncontrolled, testear servicios sin UI |
| **Al completar** | La lógica de filtrado vive en un servicio testeable, tienes componentes controlled y uncontrolled, y los tests pasan sin renderizar UI |

[→ Ir a la actividad](./actividades/2.6-separacion-hooks.md)

---

### 2.7 — Atomic Design y cuando NO usarlo

**Por que:** Atomic Design es popular pero tiene limitaciones reales. Clasificar tus componentes revela las ambiguedades ("¿es molecule u organism?") y te enseña cuando esta metodologia ayuda y cuando estorba. En equipos reales, esta decision de organizacion puede ahorrar — o desperdiciar — horas de debate.

| | |
|---|---|
| **Requiere** | Actividades 2.0-2.4 completadas (componentes para clasificar) |
| **Aprenderas** | Los 5 niveles de Atomic Design, clasificar componentes, identificar ambiguedades, evaluar Feature-Sliced Design como alternativa |
| **Al completar** | Tienes un documento con clasificacion, ambiguedades y conclusion fundamentada |

[→ Ir a la actividad](./actividades/2.7-atomic-design.md)

---

### 2.8 — Validación integral de Etapa 2

**Por que:** Antes de avanzar a la Etapa 3, necesitas confirmar que dominas la arquitectura de componentes. Esta actividad es tu "code review" propio: ejecutas todos los criterios de aceptacion y cierras brechas.

| | |
|---|---|
| **Requiere** | Todas las actividades esenciales (2.0-2.4) completadas |
| **Aprenderas** | Ejecutar scripts de validación, interpretar resultados, corregir fallos restantes |
| **Al completar** | Todos los criterios de aceptacion de la etapa pasan |

[→ Ir a la actividad](./actividades/2.8-validacion-integral.md)

---

## Material de lectura

| Archivo | Contenido |
|---------|-----------|
| [01-que-es-un-componente.md](./lecturas/01-que-es-un-componente.md) | Modelo mental de componentes: Input → Output, encapsulacion, composicion, arbol de componentes |
| [02-api-de-componentes.md](./lecturas/02-api-de-componentes.md) | Diseño de APIs: props, children/slots, ref forwarding, controlled vs uncontrolled |
| [03-solid-en-componentes.md](./lecturas/03-solid-en-componentes.md) | SOLID aplicado a componentes: SRP, OCP, LSP, ISP, DIP |
| [04-compound-components-y-patrones.md](./lecturas/04-compound-components-y-patrones.md) | Compound components, render props, composicion sobre herencia |
| [05-separacion-de-responsabilidades.md](./lecturas/05-separacion-de-responsabilidades.md) | Separacion de lógica: hooks, composables, presentational vs container |
| [06-atomic-design.md](./lecturas/06-atomic-design.md) | Atomic Design: atoms, molecules, organisms, cuando usar y cuando no |

## Material de Angular

| Archivo | Contenido |
|---------|-----------|
| [00-setup-angular.md](./angular/00-setup-angular.md) | Setup de proyecto Angular: CLI, estructura, standalone components |
| [01-componentes-en-angular.md](./angular/01-componentes-en-angular.md) | Componentes en Angular: templates, standalone, signals, `@if`/`@for`, content projection |
| [02-api-de-componentes-angular.md](./angular/02-api-de-componentes-angular.md) | APIs de componentes en Angular: `input()`, `output()`, `model()`, `viewChild`, `host` |

---

[← Etapa anterior: Fundamentos](../stage-1-foundations/) | [Siguiente: Etapa 3 →](../stage-3-state-and-data/)
