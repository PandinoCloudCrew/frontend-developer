# Lineamientos para Actividades y Lecturas

> Estándar de formato, tono y estructura para todo el contenido de la guía. Todo contribuyente debe seguir estos lineamientos para mantener uniformidad entre etapas.

---

## Pilares de diseño (Frontend Well-Architected)

La guía está organizada alrededor de **7 pilares de calidad**, inspirados en el Well-Architected Framework de AWS, el Cloud Adoption Framework de Azure y el Architecture Framework de GCP — adaptados a desarrollo frontend.

| Pilar | Pregunta clave | Dónde se profundiza |
|-------|---------------|---------------------|
| **Usabilidad** | ¿El usuario puede completar su tarea sin frustrarse? | Etapa 4 |
| **Resiliencia** | ¿Qué pasa cuando algo falla? | Etapa 6 |
| **Rendimiento** | ¿La aplicación responde en menos de 200ms? | Etapa 5 |
| **Seguridad** | ¿Los datos del usuario están protegidos? | Etapa 6 |
| **Accesibilidad** | ¿Todas las personas pueden usar la aplicación? | Etapas 1, 4 |
| **Mantenibilidad** | ¿Puedo cambiar este código en 6 meses sin romper todo? | Etapas 2, 7, 8 |
| **Observabilidad** | ¿Puedo saber qué pasa cuando algo sale mal en producción? | Etapas 6, 7 |

Los pilares se introducen en la **lectura 00 de la Etapa 1** como marco mental. Cada etapa posterior profundiza en pilares específicos. Al crear actividades, siempre indiquen **qué pilares ejercita la actividad**.

Lectura de referencia: `guide/stage-1-foundations/lecturas/00-pilares-de-diseno.md`

---

## Principios transversales

Estos temas NO son exclusivos de una etapa — se introducen temprano y se profundizan progresivamente:

| Tema | Se introduce en | Se profundiza en | Principios clave |
|------|----------------|------------------|-----------------|
| **Pilares de diseño** | Etapa 1 (lectura 00 — los 7 pilares) | Todas las etapas | Usabilidad, Resiliencia, Rendimiento, Seguridad, Accesibilidad, Mantenibilidad, Observabilidad |
| **Testing** | Etapa 1 (1.6b — testing básico con Vitest) | Etapa 7 (component testing, E2E, CI) | FIRST (Fast, Isolated, Repeatable, Self-validating, Timely) + AAA (Arrange-Act-Assert) |
| **Accesibilidad** | Etapa 1 (1.7 — auditoría con teclado) | Etapa 4 (contraste, motion) + Etapa 7 (a11y en CI) | Semantic HTML first, WCAG, prefers-reduced-motion |
| **TypeScript** | Etapa 1 (1.6 — transformador) | Etapa 2+ (props tipados, APIs) | strict: true, cero any, interfaces para contratos |

Cuando crees actividades para cualquier etapa:
- Indica **qué pilares de diseño** ejercita la actividad
- Verifica si se puede incluir una referencia natural a testing, accesibilidad o TypeScript
- Las preguntas de los pilares ("¿Qué pasa cuando falla?") pueden usarse como criterios de aceptación

---

## Audiencia

El estudiante es una persona con **poca experiencia en desarrollo**. No asumas que sabe:
- Qué es una terminal ni cómo abrirla
- Qué es npm, npx, o Node.js
- Cómo funciona DevTools
- Qué significa "compilar", "bundlear" o "servir"
- La diferencia entre un editor de texto y un procesador de palabras

**Sí puedes asumir** que sabe usar una computadora, instalar programas, y navegar en internet.

---

## Idioma

- **Prosa en español**
- **Jargon técnico en inglés**: props, hooks, signals, components, state, fetch, render, deploy, build, bundle, lint, commit, push, merge, pull request
- **Nombres de herramientas en inglés**: VS Code, DevTools, Angular, TypeScript, ESLint, Playwright
- **Código siempre en inglés**: nombres de variables, funciones, archivos, comandos
- **No traducir**: términos que el estudiante encontrará en inglés en la documentación oficial y Stack Overflow

---

## Navegación

El estudiante navega documentos markdown que pueden ser largos. Sin navegación clara, se pierde. Estas reglas aplican a **todos** los documentos (actividades, lecturas, READMEs).

### Regla general

Cada documento debe permitir al estudiante responder estas preguntas en menos de 3 segundos:
1. **¿Dónde estoy?** → Título claro con número de actividad/etapa
2. **¿Cómo vuelvo?** → Link visible al índice de la etapa
3. **¿Qué sigue?** → Link a la siguiente actividad/sección

### Links de navegación obligatorios

**Inicio del documento:**
```markdown
[← Volver a Etapa N](../README.md)
```

**Final del documento:**
```markdown
---
[← Actividad anterior](./X.Z-nombre.md) | [Siguiente →](./X.W-nombre.md)
```

**En lecturas largas (>150 líneas):** Agregar una tabla de contenido al inicio con anchors:
```markdown
## Contenido
- [Subtema 1](#subtema-1)
- [Subtema 2](#subtema-2)
- [Anti-patterns](#anti-patterns)
```

### Anchors en secciones largas

Si una sección de práctica tiene más de 6 pasos, agregar un mini-índice al inicio:
```markdown
## Práctica paso a paso

> **Pasos:** [1. Crear carpeta](#paso-1) · [2. Escribir esqueleto](#paso-2) · [3. Header](#paso-3) · [4. Nav](#paso-4) · [5. Main](#paso-5) · [6. Aside y footer](#paso-6)
```

Cada paso debe ser un heading linkeable:
```markdown
### Paso 1 — Crear la carpeta y el archivo {#paso-1}
```

### Breadcrumb en READMEs de etapa

Los READMEs de etapa deben incluir un breadcrumb al inicio:
```markdown
[Inicio](../README.md) > Etapa 1: Fundamentos
```

---

## Bloques de código HTML

### El problema

Cuando el estudiante ve un archivo `.md` en GitHub o en VS Code con preview, los bloques marcados como ` ```html ` se **renderizan como HTML real** en lugar de mostrar el código fuente. El estudiante ve el resultado visual en vez del código que debe copiar. Esto es confuso y hace imposible seguir los pasos.

### La solución

**NUNCA** uses ` ```html ` para bloques de código que el estudiante debe copiar. Usa ` ```text ` o simplemente ` ``` ` (sin lenguaje) y agrega un comentario indicando que es HTML:

**Mal** (se renderiza como HTML en preview):
````
```html
<header>
  <h1>Mi Nombre</h1>
</header>
```
````

**Bien** (se muestra como código copiable):
````
```text
<!-- HTML: agrega esto dentro de <body> -->
<header>
  <h1>Mi Nombre</h1>
</header>
```
````

### Cuándo SÍ usar ```html

Solo cuando el bloque es un **ejemplo ilustrativo** en una lectura que NO necesita ser copiado. Si el estudiante debe copiar o escribir el código, usar ` ```text `.

### Para otros lenguajes

TypeScript, CSS y JavaScript no tienen este problema — ` ```typescript `, ` ```css ` y ` ```javascript ` se muestran correctamente como código en preview. Solo HTML se renderiza.

---

## Estructura de una actividad

Cada actividad es un archivo markdown independiente en `actividades/`. Debe seguir esta estructura exacta:

````markdown
# 🟢 Actividad X.Y — Nombre accionable de la actividad

[Inicio](../../README.md) > [Etapa N](../README.md) > Actividad X.Y

- [ ] Completada

**Duración:** ~XX min

## Por qué esta actividad

Explicación en 2-3 oraciones de POR QUÉ el estudiante está haciendo esto.
No qué va a hacer (eso viene después), sino qué problema resuelve, qué
consecuencia tiene no saber esto, o qué beneficio real obtiene al dominarlo.
El estudiante debe entender la motivación ANTES de empezar a trabajar.

| | |
|---|---|
| **Requiere** | Actividades previas necesarias y habilidades específicas |
| **Aprenderás** | Lista concreta de habilidades que se obtienen al completar esta actividad |
| **Al completar** | Descripción del resultado tangible — qué tiene el estudiante al terminar |

**Lectura:**
- [Nombre del tema](../lecturas/XX-nombre.md) (~X min)

**Angular:** *(solo si aplica)*
- [Nombre del tema en Angular](../angular/XX-nombre.md) (~X min)

## Antes de empezar

Qué necesita el estudiante antes de iniciar esta actividad:
- Qué actividades previas debe haber completado
- Qué herramientas debe tener instaladas
- Conceptos clave explicados en 2-3 oraciones simples (qué es X y para qué sirve)

## Práctica paso a paso

> **Pasos:** [1. Título](#paso-1--título) · [2. Título](#paso-2--título) · [3. Título](#paso-3--título)

### Paso 1 — Título del paso

1. Instrucción específica con ruta exacta o comando exacto
2. Instrucción siguiente

Bloques de código HTML usar ```text (NO ```html):

```text
<!-- HTML: agrega esto dentro de <body> -->
<header>
  <h1>Mi Nombre</h1>
</header>
```

> 💡 **Nota:** Explicación breve de por qué se hace esto (opcional)

### Paso 2 — Título del paso

1. Instrucción...
2. ...

*(Repetir para cada paso lógico. Generalmente 4-8 pasos por actividad.)*

## Qué puede salir mal

- **"Descripción del error que el estudiante ve"** → Explicación de la causa y cómo solucionarlo.
- **"Otro error común"** → Solución.
- **"Tercer error frecuente"** → Solución.

*(2-4 errores comunes por actividad. Enfocarse en los que un principiante realmente encontrará.)*

## Resultado esperado

Descripción en texto de qué debe ver el estudiante al terminar. Si hay mockup:

![Resultado esperado](../mockups/X.Y-nombre.png)

*(Solo incluir mockup para actividades con resultado visual en el navegador.)*

**Criterios de aceptación:**
- [ ] Criterio verificable 1
- [ ] Criterio verificable 2
- [ ] Criterio verificable 3

---

[← Actividad anterior](./X.Z-nombre.md) | [Siguiente →](./X.W-nombre.md)
````

---

## Reglas para la Práctica paso a paso

### Nivel de detalle

Cada instrucción debe ser **ejecutable sin ambigüedad**. El estudiante debe poder seguir los pasos sin tener que adivinar ni buscar en Google.

**Mal:**
```
Crea un componente Angular y agrégale un input.
```

**Bien:**
```
1. En la terminal, ejecuta: `ng generate component perfil`
2. Abre el archivo `src/app/perfil/perfil.component.ts`
3. Dentro de la clase, agrega un input signal:
   ```typescript
   nombre = input<string>('');
   ```
4. En `perfil.component.html`, muestra el nombre:
   ```html
   <h1>{{ nombre() }}</h1>
   ```
```

### Rutas y comandos

- Siempre especificar la **ruta completa del archivo** relativa al proyecto: `src/app/perfil/perfil.component.ts`, no "el archivo del componente"
- Siempre mostrar el **comando completo**: `ng generate component perfil --standalone`, no "genera un componente"
- Siempre indicar **dónde ejecutar el comando**: "En la terminal de VS Code" o "En la terminal, dentro de la carpeta del proyecto"

### Código

- Mostrar el **bloque de código completo** que el estudiante debe escribir, no solo la línea nueva
- Si el archivo ya tiene contenido, mostrar las líneas de contexto alrededor del cambio
- Indicar **dónde insertar** el código: "Después de la línea `import`, agrega:" o "Reemplaza el contenido de `template` por:"

### Cuándo NO dar paso a paso

Las actividades 🔴 (Avanzadas) pueden tener instrucciones menos granulares porque el estudiante ya tiene experiencia de las etapas previas. Aun así deben ser claras y sin ambigüedad.

---

## Reglas para "Antes de empezar"

- Siempre listar las **actividades previas requeridas** por número: "Necesitas haber completado la **Actividad 2.1**"
- Explicar **qué es** cualquier concepto nuevo que se introduce (1-3 oraciones)
- No asumir que el estudiante recuerda todos los conceptos de actividades anteriores — un recordatorio de una línea es suficiente

---

## Reglas para "Qué puede salir mal"

- Usar la **voz del estudiante**: "No me aparece nada en pantalla", "El comando dice 'not found'", "Veo un error rojo en la consola"
- Dar la **causa real** del error, no solo la solución
- Si el error requiere un comando, mostrar el comando exacto
- Enfocarse en errores **reales de principiantes**, no en edge cases

---

## Reglas para Criterios de aceptación

- Cada criterio debe ser **binario**: pasa o no pasa, sin juicio subjetivo
- Preferir criterios **verificables con un comando o acción**: "Ejecuta `npx tsc --noEmit` — cero errores" sobre "El código está bien tipado"
- Si requiere verificación visual, describir exactamente qué buscar: "En DevTools → Elements, busca `<div>`. No debe haber ninguno usado para layout"
- 2-4 criterios por actividad. Ni más ni menos.

---

## Reglas para Mockups

### Cuándo incluir mockup
- La actividad produce un **resultado visual en el navegador** (HTML, CSS, componente renderizado)
- El mockup ayuda al estudiante a saber **si va por buen camino**
- **Toda actividad visual necesita mockup** — sin excepción. Si el estudiante construye algo que se ve en pantalla, debe poder comparar su resultado con una referencia

### Cuándo NO incluir mockup
- La actividad es de **código puro** (TypeScript, JavaScript, tests)
- La actividad es de **configuración** (instalar herramientas, configurar linter)
- La actividad es de **auditoría** (revisar accesibilidad, revisar rendimiento)
- La actividad es de **documentación** (clasificar componentes, escribir decisiones)

### Mockups por etapa

| Etapa | Mockups necesarios | Estilo |
|-------|-------------------|--------|
| **1 — Fundamentos** | HTML sin CSS, formulario nativo, dashboard Grid | Browser defaults (serif, sin estilos). Barra del navegador con `file:///` |
| **2 — Componentes** | Componente Angular, biblioteca de 3 niveles, Tabs | Angular + Tailwind CSS (spartan/ui). Resultado de `ng serve` |
| **3 — Estado** | 4 estados de data fetching, lista filtrable, wizard | Angular + Tailwind. Mostrar cada estado (loading, error, success, empty) |
| **4 — Usabilidad** | Type scale, paleta de color, dashboard responsivo (3 viewports), skeletons | Tailwind con design tokens. Mostrar 3 anchos para responsive |
| **5 — Rendimiento** | Lighthouse score, lazy loading waterfall | Captura de DevTools / Lighthouse (no diseño, herramientas reales) |
| **6 — Seguridad** | 4 estados de error, flujo de auth | Angular + Tailwind |
| **7-8** | Generalmente no necesitan | Son etapas de código, testing, y arquitectura |

### Librería de UI estandarizada

Para que los mockups sean **reproducibles** por el estudiante, la guía estandariza una stack de UI:

- **Angular CDK** — comportamiento headless (a11y, overlay, drag-drop, virtual scroll)
- **Tailwind CSS v4** — utility-first styling con design tokens vía `@theme`
- **spartan/ui** — componentes copy-paste para Angular, construidos sobre CDK + Tailwind. Equivalente Angular de shadcn/ui

Esta stack permite que:
1. Los mockups de Pencil usen los mismos tokens de Tailwind (colores, espaciado, tipografía)
2. El estudiante use spartan/ui para obtener componentes que se ven igual al mockup
3. Los mockups y la implementación converjan visualmente

**Introducción de la stack:**
- **Etapa 1**: HTML y CSS puros (sin framework, sin Tailwind)
- **Etapa 2 (actividad 2.0)**: Se introduce Angular + Tailwind CSS
- **Etapa 2 (actividad 2.2)**: Se introduce spartan/ui para la biblioteca de componentes
- **Etapa 4+**: Se usa la stack completa (CDK + Tailwind + spartan/ui)

### Estilo del mockup por etapa

**Etapa 1 (HTML/CSS puro):**
- Browser defaults: serif font, links azules, inputs con borde gris
- Barra del navegador con URL `file:///`
- Sin tipografía de diseño, sin colores de marca

**Etapas 2-4 (Angular + Tailwind + spartan/ui):**
- Diseño limpio basado en Tailwind defaults
- Componentes de spartan/ui (botones, inputs, tabs, cards)
- Colores neutros de Tailwind (slate, zinc) + un accent color
- El mockup debe ser **reproducible** usando las clases de Tailwind que se indican en la actividad

**Etapas 5-6 (herramientas + estados):**
- Para Lighthouse/DevTools: capturas de las herramientas reales, no diseños
- Para estados de UI: mismo estilo que etapas 2-4

### Reglas de diseño para mockups en Pencil

Cuando diseñes mockups en Pencil para etapas 2+:
- Usar la style guide de Tailwind (`get_style_guide` con tags de webapp)
- Colores: `slate-50` para fondos, `slate-900` para texto, `slate-200` para bordes, un accent color
- Tipografía: Inter (sans-serif), mismos tamaños que Tailwind defaults (14px base, 12px small, 18px lg)
- Bordes redondeados: `4px` (Tailwind `rounded`), no sharp corners
- Espaciado: múltiplos de 4px (4, 8, 12, 16, 24, 32) — coincide con Tailwind spacing scale
- Inputs: borde `slate-300`, padding 8px 12px, border-radius 4px
- Botones: fondo `slate-900` texto blanco para primary, borde `slate-300` para secondary

---

## Estructura de una lectura

Las lecturas están en `lecturas/`. Cada una cubre un solo tema y se introduce cuando la actividad la necesita.

### Formato

```markdown
# Título del Tema

[← Volver a Etapa N](../README.md)

Introducción de 2-3 oraciones: qué es, para qué sirve, por qué importa.

## Contenido *(solo si >150 líneas)*
- [Subtema 1](#subtema-1)
- [Subtema 2](#subtema-2)
- [Anti-patterns](#anti-patterns)

---

## Subtema 1

Explicación con ejemplos de código.

## Subtema 2

...

## Anti-patterns

- **Nombre del anti-pattern.** Descripción y por qué es problemático.

## Puntos clave

- Bullet 1
- Bullet 2
- Bullet 3

---

[← Volver a Etapa N](../README.md)
```

### Reglas de longitud
- **50-300 líneas** por lectura
- Si supera 300 líneas, dividir en dos lecturas
- Cada lectura debe poder leerse en **5-15 minutos**

### Reglas de contenido
- Empezar con el **concepto**, luego los **ejemplos**
- Los ejemplos de código deben ser **copiables y ejecutables**
- Siempre incluir al menos un **anti-pattern** por lectura
- Terminar con **3-5 puntos clave** (bullets concisos)

---

## Estructura de contenido Angular

Los archivos Angular están en `angular/`. Enseñan cómo implementar los conceptos de la lectura usando Angular.

### Formato

```markdown
# Título del Tema en Angular

Introducción: cómo Angular implementa el concepto que se acaba de leer.

---

## Implementación

Código Angular concreto con explicación.

## Anti-patterns en Angular

- **Anti-pattern específico de Angular.** Por qué y qué hacer en su lugar.

## Puntos clave

- Bullet 1
- Bullet 2
```

### Reglas
- **Asumir que el estudiante ya leyó la lectura agnóstica** — no repetir la teoría
- Ir directo a la **implementación práctica en Angular**
- Usar **Angular 19+**: standalone components, signals, new control flow (`@if`, `@for`), `input()`, `output()`
- No usar APIs legacy: `@Input()` decorator, `NgModule`, `*ngIf`, `*ngFor`

---

## Estructura del índice global (guide/README.md)

El índice global lista las 8 etapas. Cada etapa debe tener:
- **Título** con link a la etapa
- **Qué aprenderás** — lista de temas
- **Por qué importa** — 1-2 oraciones de motivación real
- **Al completar** — resultado tangible que el estudiante puede verificar

El estudiante debe poder leer el índice y entender el viaje completo antes de empezar.

---

## Estructura de un README de etapa

Cada etapa tiene un `README.md` que es un **índice enriquecido**. Tiene dos partes:
1. **Tabla de progreso** — vista rápida con links a anchors en la misma página
2. **Detalle de actividades** — una tarjeta por actividad con "Por qué", "Requiere", "Aprenderás", "Al completar" y link al archivo

El estudiante puede escanear la tabla para ver el panorama, o leer los detalles para entender por qué cada actividad existe antes de empezar.

```markdown
# Etapa N: Nombre

[Inicio](../README.md) > Etapa N

> Descripción de una línea.

**Prerrequisitos:** Etapa N-1 completada.

**Por qué esta etapa importa:** 2-3 oraciones explicando qué problema
resuelve esta etapa y qué consecuencia tiene saltársela.

---

## Progreso

**Esenciales:** 0/X | **Recomendadas:** 0/Y | **Avanzadas:** 0/Z

---

## Actividades Esenciales 🟢

| # | Actividad | Duración | Estado |
|:-:|-----------|:--------:|:------:|
| N.0 | [Nombre](#n0--nombre-descriptivo) | ~45 min | ☐ |

*(Los links van a anchors en la misma página, no directamente al archivo)*

## Actividades Recomendadas 🟡
...

## Actividades Avanzadas 🔴
...

---

## Detalle de actividades

### N.0 — Nombre descriptivo

**Por qué:** 1-2 oraciones de motivación.

| | |
|---|---|
| **Requiere** | Actividades previas, habilidades |
| **Aprenderás** | Habilidades concretas que se obtienen |
| **Al completar** | Resultado tangible |

[→ Ir a la actividad](./actividades/N.0-slug.md)

---

*(Repetir para cada actividad)*

---

## Material de lectura

| Archivo | Contenido |
|---------|-----------|
| [01-tema.md](./lecturas/01-tema.md) | Descripción |

## Material de Angular

| Archivo | Contenido |
|---------|-----------|
| [01-tema.md](./angular/01-tema.md) | Descripción |

---

[← Etapa anterior](../stage-N-1/) | [Siguiente: Etapa N+1 →](../stage-N+1/)
```

---

## Nomenclatura de archivos

| Tipo | Patrón | Ejemplo |
|------|--------|---------|
| Actividad | `N.X-slug-descriptivo.md` | `2.3-solid-en-componentes.md` |
| Lectura | `XX-slug-descriptivo.md` | `03-css-box-model.md` |
| Angular | `XX-slug-descriptivo.md` | `01-componentes-en-angular.md` |
| Mockup | `N.X-slug-descriptivo.png` | `1.4-css-grid-dashboard.png` |

- Slugs en **kebab-case**, sin acentos, sin caracteres especiales
- Numeración con **cero-padding** para lecturas y angular (01, 02, 03...) pero NO para actividades (1.1, 1.2, 2.0...)

---

## Checklist antes de publicar una actividad

### Estructura
- [ ] Sigue la estructura exacta de este documento
- [ ] Tiene breadcrumb al inicio: `[Inicio] > [Etapa N] > Actividad X.Y`
- [ ] Tiene navegación al final: `← Anterior | Siguiente →`
- [ ] Si tiene más de 6 pasos, tiene mini-índice de pasos con anchors

### Propósito y contexto
- [ ] Tiene sección "Por qué esta actividad" que explica la motivación (no el qué, sino el por qué)
- [ ] Tiene tabla con Requiere / Aprenderás / Al completar
- [ ] "Al completar" describe un resultado tangible y verificable

### Contenido
- [ ] "Antes de empezar" lista actividades previas requeridas
- [ ] Cada paso de la práctica es ejecutable sin ambigüedad
- [ ] Los comandos incluyen la ruta o contexto donde ejecutarse
- [ ] Los bloques de código son completos y copiables
- [ ] "Qué puede salir mal" tiene 2-4 errores reales de principiantes
- [ ] Los criterios de aceptación son binarios y verificables

### Código HTML
- [ ] Los bloques de HTML que el estudiante debe copiar usan ` ```text `, NO ` ```html `
- [ ] Los bloques incluyen un comentario indicando qué son: `<!-- HTML: agrega esto dentro de <body> -->`

### Visual
- [ ] Si hay mockup, muestra lo que el estudiante realmente obtendrá
- [ ] Si NO hay mockup, el "Resultado esperado" describe en texto qué debe verse

### Links
- [ ] Los links a lecturas usan `../lecturas/` (ruta relativa correcta)
- [ ] Los links a angular usan `../angular/` (ruta relativa correcta)
- [ ] La navegación ← Anterior | Siguiente → apunta a los archivos correctos

## Checklist antes de publicar una lectura

- [ ] Tiene entre 50-300 líneas
- [ ] Cubre un solo tema
- [ ] Si supera 150 líneas, tiene tabla de contenido con anchors
- [ ] Incluye al menos un anti-pattern
- [ ] Termina con "Puntos clave" (3-5 bullets)
- [ ] Los ejemplos de HTML usan ` ```text ` si el estudiante debe copiarlos
