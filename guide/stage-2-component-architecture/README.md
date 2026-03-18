# Etapa 2: Arquitectura de Componentes

> Pensar en componentes — el bloque de construcción universal de los frontends modernos.

**Prerrequisitos:** Etapa 1 completada.

---

## Progreso

**Esenciales:** 0/5 | **Recomendadas:** 0/2 | **Avanzadas:** 0/2

---

## Actividades Esenciales

### 🟢 Actividad 2.0 — Configurar tu primer proyecto Angular

- [ ] Completada

**Duración:** ~45 min

**Lectura:**
- [Setup Angular](./angular/00-setup-angular.md) (~15 min)
- [Componentes en Angular](./angular/01-componentes-en-angular.md) (~15 min)

**Práctica:** Crear un nuevo proyecto Angular con `ng new`. Explorar la estructura del proyecto. Crear un componente standalone que muestre "Hola Mundo" con un input para el nombre del usuario. Ejecutar con `ng serve` y verificar hot reload (~15 min)

**Validación:** El proyecto compila y se ejecuta; el componente es standalone; hot reload funciona

**Criterios de aceptación:**
- [ ] `ng new` ejecutado exitosamente
- [ ] Un componente standalone creado y funcionando
- [ ] `ng serve` ejecuta sin errores
- [ ] Cambiar texto en el template se refleja automáticamente en el navegador

---

### 🟢 Actividad 2.1 — Entender qué es un componente y descomponer una UI

- [ ] Completada

**Duración:** ~55 min

**Lectura:**
- [¿Qué es un Componente?](./lecturas/01-que-es-un-componente.md) (~15 min)

**Angular:**
- [Setup Angular](./angular/00-setup-angular.md) (~5 min, repaso)
- [Componentes en Angular](./angular/01-componentes-en-angular.md) (~10 min)

**Práctica:** Dado un mockup de una página de producto, documentar cada componente (nombre, props, children, responsabilidad). Dibujar el árbol de componentes con al menos 3 niveles (~35 min)

**Validación:** Verificar al menos 3 niveles; ningún componente con más de 10 props (~5 min)

**Criterios de aceptación:**
- [ ] El árbol tiene al menos 3 niveles (atom/molecule/organism)
- [ ] Cada componente se describe como función Input->Output
- [ ] Ningún componente tiene más de una responsabilidad

---

### 🟢 Actividad 2.2 — Diseñar APIs de componentes y construir una biblioteca de 3 niveles

- [ ] Completada

**Duración:** ~55 min

**Lectura:**
- [API de Componentes](./lecturas/02-api-de-componentes.md) (~15 min)

**Angular:**
- [API de Componentes en Angular](./angular/02-api-de-componentes-angular.md) (~10 min)

**Práctica:** Definir interfaces TypeScript para Button (atom), SearchBar (molecule) y ProductCard (organism). Implementar los 3 con props tipados, defaults razonables y composición (Button dentro de SearchBar dentro de ProductCard) (~35 min)

**Validación:** TypeScript compila; los componentes componen sin conflictos (~5 min)

**Criterios de aceptación:**
- [ ] Cada componente tiene interfaz TypeScript para sus props
- [ ] Button funciona dentro de SearchBar, SearchBar dentro de ProductCard
- [ ] Ninguno excede 150 líneas
- [ ] Ningún componente hace fetch de datos directamente

---

### 🟢 Actividad 2.3 — Aplicar SRP y refactorizar un componente dios

- [ ] Completada

**Duración:** ~60 min

**Lectura:**
- [SOLID en Componentes](./lecturas/03-solid-en-componentes.md) (~10 min)

**Práctica:** Dado un componente de 400 líneas que hace fetch, filtrado, ordenamiento, paginación y renderizado — refactorizarlo en componentes + hooks separados, cada uno con una sola responsabilidad (~40 min)

**Validación:** `wc -l`; `grep "fetch|axios" src/components/`; output idéntico al original (~10 min)

**Criterios de aceptación:**
- [ ] Ningún componente excede 150 líneas
- [ ] `grep "fetch|axios"` en components/ devuelve cero
- [ ] Cada hook extraído es testeable de forma aislada
- [ ] La salida refactorizada es idéntica a la original

---

### 🟢 Actividad 2.4 — Construir un Compound Component (Tabs)

- [ ] Completada

**Duración:** ~60 min

**Lectura:**
- [Compound Components y Patrones](./lecturas/04-compound-components-y-patrones.md) (~10 min)

**Práctica:** Construir `<Tabs>`, `<TabList>`, `<Tab>` y `<TabPanel>` que comparten estado implícitamente vía context. Navegación con flechas de teclado (~40 min)

**Validación:** Reordenar Tab/TabPanel, verificar que sigue funcionando; probar flechas de teclado (~10 min)

**Criterios de aceptación:**
- [ ] Las flechas Izquierda/Derecha cambian el tab activo
- [ ] Los children pueden reordenarse sin romperse
- [ ] El foco visible está presente en el tab activo

---

## Actividades Recomendadas

### 🟡 Actividad 2.5 — Aplicar OCP, LSP e ISP a componentes existentes

- [ ] Completada

**Duración:** ~50 min

**Lectura:**
- [SOLID en Componentes](./lecturas/03-solid-en-componentes.md) (secciones OCP/LSP/ISP, ~15 min)

**Práctica:** Revisar los componentes construidos contra cada principio SOLID. Documentar una violación y corregirla. Crear una variante de componente que sea sustituible (LSP) (~30 min)

**Validación:** Reemplazar un componente base por su variante sin romper nada (~5 min)

**Criterios de aceptación:**
- [ ] Los componentes son extensibles vía composición (OCP)
- [ ] Las variantes son sustituibles sin romper funcionalidad (LSP)
- [ ] Ningún componente tiene más de 10 props (ISP)

---

### 🟡 Actividad 2.6 — Separación de responsabilidades con hooks/composables

- [ ] Completada

**Duración:** ~50 min

**Lectura:**
- [Separación de Responsabilidades](./lecturas/05-separacion-de-responsabilidades.md) (~15 min)

**Práctica:** Extraer lógica de UI a hooks reutilizables. Implementar ref forwarding y controlled vs uncontrolled pattern (~30 min)

**Validación:** Los hooks funcionan sin renderizar un componente (~5 min)

**Criterios de aceptación:**
- [ ] La lógica de negocio vive en hooks, no en componentes
- [ ] Los hooks son testeables de forma aislada
- [ ] Al menos un componente controlled y uno uncontrolled

---

## Actividades Avanzadas

### 🔴 Actividad 2.7 — Atomic Design y cuándo NO usarlo

- [ ] Completada

**Duración:** ~45 min

**Lectura:**
- [Atomic Design](./lecturas/06-atomic-design.md) (~10 min)

**Práctica:** Clasificar todos los componentes construidos en la jerarquía Atomic Design. Documentar dónde la clasificación se vuelve ambigua y por qué Feature-Sliced Design puede ser mejor para apps complejas (~30 min)

**Validación:** La documentación identifica al menos 2 debilidades de Atomic Design (~5 min)

**Criterios de aceptación:**
- [ ] Los componentes están clasificados en niveles atómicos
- [ ] Se identifican al menos 2 casos ambiguos (molecule u organism?)
- [ ] Se propone cuándo Atomic Design ayuda vs cuándo estorba

---

### 🔴 Actividad 2.8 — Validación integral de Etapa 2

- [ ] Completada

**Duración:** ~55 min

**Lectura:** Revisar los criterios de aceptación de toda la etapa (~5 min)

**Práctica:** Verificar todos los criterios: props tipados, componentes < 150 líneas, cero fetch en componentes, Tabs con flechas, composición funcional (~40 min)

**Validación:** Los 10 criterios pasan (~10 min)

**Criterios de aceptación:**
- [ ] Todos los criterios 2.0-2.7 se cumplen

---

## Material de lectura en esta etapa

### Lecturas generales

| Archivo | Contenido |
|---------|-----------|
| [01-que-es-un-componente.md](./lecturas/01-que-es-un-componente.md) | Modelo mental de componentes: Input->Output, encapsulación, composición |
| [02-api-de-componentes.md](./lecturas/02-api-de-componentes.md) | Diseño de APIs: props, children/slots, ref forwarding, controlled vs uncontrolled |
| [03-solid-en-componentes.md](./lecturas/03-solid-en-componentes.md) | SOLID aplicado a componentes: SRP, OCP, LSP, ISP, DIP |
| [04-compound-components-y-patrones.md](./lecturas/04-compound-components-y-patrones.md) | Compound components, render props y patrones de composición |
| [05-separacion-de-responsabilidades.md](./lecturas/05-separacion-de-responsabilidades.md) | Separación de lógica: hooks, composables, presentational vs container |
| [06-atomic-design.md](./lecturas/06-atomic-design.md) | Atomic Design: atoms, molecules, organisms, cuándo usar y cuándo no |

### Material de Angular

| Archivo | Contenido |
|---------|-----------|
| [00-setup-angular.md](./angular/00-setup-angular.md) | Setup de proyecto Angular: CLI, estructura, standalone components |
| [01-componentes-en-angular.md](./angular/01-componentes-en-angular.md) | Componentes en Angular: templates, decorators, lifecycle hooks |
| [02-api-de-componentes-angular.md](./angular/02-api-de-componentes-angular.md) | APIs de componentes en Angular: @Input, @Output, content projection |

---

[← Etapa anterior: Fundamentos](../stage-1-foundations/) | [Volver al índice](../README.md) | [Etapa siguiente: Estado →](../stage-3-state-and-data/)
