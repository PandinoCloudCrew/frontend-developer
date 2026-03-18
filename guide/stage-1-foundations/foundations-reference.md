# Etapa 1: Referencia de Fundamentos

> La plataforma antes del framework. Todo framework se compila a HTML, CSS y JavaScript. Si no entiendes lo que sucede en esa capa, lucharas contra el framework en lugar de utilizarlo.

---

## 1. HTML Semantico y el DOM

### Por que esto importa

HTML no es un lenguaje de formato. Es una **descripcion estructural** de tu contenido. Cuando eliges el elemento correcto, obtienes comportamiento gratis: los lectores de pantalla anuncian las secciones correctamente, los motores de busqueda entienden la jerarquia de tu pagina, y los navegadores aplican estilos predeterminados sensatos. Cuando eliges el elemento equivocado, pasas horas reimplementando lo que el navegador ya proporciona.

### Estructura del documento

Todo documento HTML sigue el mismo esqueleto:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="A brief summary of this page for search engines">
  <title>Page Title — Site Name</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <!-- All visible content goes here -->
</body>
</html>
```

Que hace cada parte:

- **`<!DOCTYPE html>`** le dice al navegador que use el modo estandar, no el modo quirks. Siempre incluyelo.
- **`<html lang="en">`** declara el idioma del documento. Los lectores de pantalla lo usan para elegir el motor de pronunciacion correcto.
- **`<meta charset="UTF-8">`** debe ser el primer elemento en `<head>`. Sin el, los caracteres fuera de ASCII pueden mostrarse como basura.
- **`<meta name="viewport">`** hace que la pagina sea responsiva en moviles. Sin el, los telefonos renderizan la pagina con un ancho de escritorio y la encogen.
- **`<title>`** aparece en la pestana del navegador, los marcadores y los resultados de busqueda. Cada pagina debe tener un titulo unico y descriptivo.
- **`<meta name="description">`** es el fragmento que se muestra en los resultados de busqueda. Mantenlo bajo 160 caracteres.

### Elementos semanticos

Los elementos semanticos describen **que es el contenido**, no como se ve. Estos son los que usaras constantemente:

```html
<body>
  <header>
    <nav aria-label="Main">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <article>
      <h1>Article Title</h1>
      <time datetime="2026-03-17">March 17, 2026</time>
      <p>Article content...</p>

      <figure>
        <img src="chart.png" alt="Bar chart showing monthly revenue growth">
        <figcaption>Revenue grew 40% quarter over quarter.</figcaption>
      </figure>
    </article>

    <aside>
      <h2>Related Articles</h2>
      <ul>
        <li><a href="/post-2">Another post</a></li>
      </ul>
    </aside>
  </main>

  <footer>
    <p>&copy; 2026 My Company</p>
  </footer>
</body>
```

Referencia de elementos:

| Elemento | Proposito |
|---------|---------|
| `<header>` | Contenido introductorio para su ancestro de seccion mas cercano (pagina o articulo) |
| `<nav>` | Un grupo de enlaces de navegacion. Agrega `aria-label` cuando tengas multiples elementos `<nav>` |
| `<main>` | El contenido dominante de la pagina. Solo uno por pagina |
| `<section>` | Una agrupacion tematica de contenido, tipicamente con un encabezado |
| `<article>` | Contenido autocontenido que podria funcionar por si solo (publicacion de blog, comentario, tarjeta de producto) |
| `<aside>` | Contenido tangencialmente relacionado con el contenido circundante (barra lateral, nota destacada) |
| `<footer>` | Pie de pagina para su ancestro de seccion mas cercano |
| `<figure>` / `<figcaption>` | Una imagen, diagrama o fragmento de codigo con una leyenda opcional |
| `<time>` | Una fecha u hora. Usa el atributo `datetime` para el formato legible por maquinas |
| `<mark>` | Texto resaltado (coincidencia en resultados de busqueda, por ejemplo) |
| `<details>` / `<summary>` | Un widget de revelacion nativo — clic para expandir/colapsar. No se necesita JavaScript |

### La decision entre `<div>` y elementos semanticos

Usa este proceso de decision:

1. **¿Este contenido tiene un significado especifico?** (navegacion, articulo, barra lateral, encabezado, pie de pagina) → Usa el elemento semantico correspondiente.
2. **¿Es una agrupacion tematica con un encabezado?** → Usa `<section>`.
3. **¿Es contenido autocontenido?** → Usa `<article>`.
4. **¿Necesito un contenedor generico puramente para estilos o layout?** → Usa `<div>`.

La regla es simple: **`<div>` es el ultimo recurso, no el valor por defecto.** Un `<div>` no le dice nada al navegador ni a la tecnologia asistiva sobre el contenido dentro de el. Cuando usas `<nav>`, los lectores de pantalla anuncian "navegacion". Cuando usas `<div>`, no anuncian nada.

### Formularios (Forms)

Los formularios son donde HTML te da mas comportamiento gratuito — si lo usas correctamente.

```html
<form action="/signup" method="post">
  <fieldset>
    <legend>Account Information</legend>

    <label for="email">Email</label>
    <input
      type="email"
      id="email"
      name="email"
      required
      autocomplete="email"
    >

    <label for="password">Password</label>
    <input
      type="password"
      id="password"
      name="password"
      required
      minlength="8"
      maxlength="128"
    >
  </fieldset>

  <fieldset>
    <legend>Preferences</legend>

    <label for="age">Age</label>
    <input type="number" id="age" name="age" min="13" max="150">

    <label for="website">Website</label>
    <input
      type="url"
      id="website"
      name="website"
      pattern="https://.*"
      placeholder="https://example.com"
    >
  </fieldset>

  <button type="submit">Create Account</button>
</form>
```

Conceptos clave:

- **`<label>`** debe estar asociado con su input mediante la coincidencia `for`/`id`. Al hacer clic en la etiqueta se enfoca el input. Los lectores de pantalla leen la etiqueta cuando el input esta enfocado.
- **`<fieldset>` / `<legend>`** agrupa inputs relacionados y le da al grupo un nombre visible y accesible.
- **Atributos de validacion nativos** — `required`, `pattern`, `min`, `max`, `minlength`, `maxlength`, `type="email"` — te dan validacion del lado del cliente con cero JavaScript. El navegador muestra mensajes de error, previene el envio y resalta los campos invalidos automaticamente.
- **Los atributos `autocomplete`** le dicen al navegador que datos guardados sugerir (por ejemplo, `autocomplete="email"`, `autocomplete="new-password"`).
- **`<button type="submit">`** es el boton de envio estandar dentro de un formulario. Nunca uses `<div onclick>` para el envio de formularios.

Tipos comunes de `<input>` y lo que proporcionan:

| Tipo | Proporciona |
|------|----------|
| `text` | Entrada de texto estandar |
| `email` | Teclado de email en movil, valida formato de email |
| `password` | Enmascara la entrada, activa gestores de contrasenas |
| `number` | Teclado numerico en movil, valida entrada numerica |
| `tel` | Teclado telefonico en movil |
| `url` | Teclado de URL en movil, valida formato de URL |
| `date` | Selector de fecha nativo |
| `search` | Boton de limpiar, teclado de busqueda en movil |
| `checkbox` | Alternador booleano |
| `radio` | Seleccion de uno entre varios (agrupar por `name`) |

### El modelo mental del DOM

El DOM (Document Object Model) es la representacion en vivo que el navegador hace de tu HTML como un arbol de objetos. Cada elemento se convierte en un **nodo** en este arbol.

```
document
└── html
    ├── head
    │   ├── meta
    │   ├── title
    │   └── link
    └── body
        ├── header
        │   └── nav
        │       └── ul
        │           ├── li → a
        │           └── li → a
        ├── main
        │   └── article
        │       ├── h1
        │       └── p
        └── footer
            └── p
```

Relaciones:

- **Padre (Parent)**: el nodo directamente arriba. `<ul>` es el padre de `<li>`.
- **Hijo (Child)**: un nodo directamente debajo. `<li>` es un hijo de `<ul>`.
- **Hermano (Sibling)**: nodos que comparten el mismo padre. Dos elementos `<li>` dentro del mismo `<ul>` son hermanos.

El DOM no es tu codigo fuente HTML. El navegador analiza el HTML, corrige errores y construye el DOM. JavaScript puede modificar el DOM en tiempo de ejecucion — agregando, eliminando o cambiando nodos. Cuando un framework "re-renderiza", esta actualizando el arbol DOM (o una representacion virtual del mismo).

### Errores comunes

**Sopa de divs** — usar `<div>` para todo:

```html
<!-- Bad: meaningless structure -->
<div class="header">
  <div class="nav">
    <div class="nav-item"><a href="/">Home</a></div>
  </div>
</div>

<!-- Good: semantic structure -->
<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>
```

**Etiquetas de formulario faltantes** — inputs sin etiquetas asociadas:

```html
<!-- Bad: screen readers say "edit text, blank" -->
<input type="email" placeholder="Enter email">

<!-- Good: screen readers say "Email, edit text" -->
<label for="email">Email</label>
<input type="email" id="email">
```

**Saltar niveles de encabezado** — pasar de `<h1>` a `<h3>`:

```html
<!-- Bad: screen reader users navigate by heading level -->
<h1>Page Title</h1>
<h3>Section Title</h3>

<!-- Good: sequential heading hierarchy -->
<h1>Page Title</h1>
<h2>Section Title</h2>
```

**Tabla para layout** — usar `<table>` para organizar elementos de la pagina. Las tablas son para datos tabulares (filas y columnas de valores relacionados). Usa CSS Grid o Flexbox para layout.

**Span para estructura** — usar `<span>` donde se necesita un elemento semantico de bloque. `<span>` es para texto en linea dentro de una oracion, no para envolver secciones de contenido.

### Puntos clave

- HTML describe la estructura del contenido, no la apariencia visual. Elige elementos por su significado, no por como se ven.
- `<div>` es un contenedor de estilos. Usalo solo cuando ningun elemento semantico encaje.
- Los elementos nativos de formulario te dan validacion, accesibilidad y teclados moviles gratis. Usalos.
- El DOM es un arbol en vivo de objetos que el navegador construye a partir de tu HTML. JavaScript y los frameworks manipulan este arbol.
- Cada `<input>` necesita un `<label>`. Cada pagina necesita exactamente un `<h1>`. Los encabezados deben descender secuencialmente.

---

## 2. Modelo de caja CSS y Display

### Por que esto importa

Cada elemento en una pagina web es una caja rectangular. El modelo de caja determina que tan grande es cada caja, cuanto espacio ocupa y como interactua con las cajas vecinas. Malinterpretar el modelo de caja es la fuente mas comun de errores tipo "¿por que esto es 20px mas ancho de lo que esperaba?".

### `content-box` vs `border-box`

Por defecto, CSS usa `content-box`. Cuando estableces `width: 200px`, esos 200px aplican solo al area de contenido. El padding y el borde se agregan *encima*:

```
content-box: total width = width + padding-left + padding-right + border-left + border-right
```

Entonces `width: 200px` + `padding: 20px` + `border: 1px solid` = **242px** en total. Esto casi nunca es lo que quieres.

`border-box` incluye el padding y el borde *dentro* del ancho especificado:

```
border-box: total width = width (padding and border are subtracted from this)
```

Ahora `width: 200px` significa 200px en total, siempre. El area de contenido se reduce para acomodar el padding y el borde.

### El reset universal

Todo proyecto moderno comienza con esto:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

Esto aplica `border-box` a cada elemento, incluyendo pseudo-elementos. Sin esto, lucharas constantemente contra dimensiones inesperadas. Agregalo al inicio de tu CSS y nunca vuelvas a pensar en `content-box`.

### Margin Collapse (Colapso de margenes)

El margin collapse es un comportamiento de CSS donde los margenes verticales adyacentes se combinan en un solo margen en lugar de apilarse. Es el comportamiento de CSS mas malinterpretado.

**Cuando sucede:**

Hermanos adyacentes — el margen inferior de un elemento y el margen superior del siguiente colapsan en el que sea mayor:

```css
.box-a { margin-bottom: 20px; }
.box-b { margin-top: 30px; }
/* Gap between them: 30px, not 50px */
```

Padre-hijo — si un padre no tiene padding, borde ni configuracion de `overflow`, el margen superior del hijo "escapa" y se convierte en el margen superior del padre:

```css
/* The h1's margin-top collapses through the parent */
.parent { /* no padding or border */ }
.parent h1 { margin-top: 40px; }
/* The 40px appears ABOVE .parent, not inside it */
```

**Cuando NO sucede:**

- Hijos de flex o grid — los margenes nunca colapsan dentro de un contenedor flex o grid
- Elementos con `overflow` establecido en cualquier cosa diferente a `visible`
- Elementos flotados
- Elementos posicionados absolutamente
- Elementos separados por padding o borde

La solucion para el caso padre-hijo: agrega `padding: 1px` (o cualquier valor) al padre, usa `overflow: auto`, o convierte al padre en un contenedor flex/grid.

### Modos de display

La propiedad `display` controla como un elemento participa en el layout:

**`block`** — ocupa todo el ancho disponible, comienza en una nueva linea. `<div>`, `<p>`, `<h1>`-`<h6>`, `<section>`, `<article>` son block por defecto.

```css
.card {
  display: block;
  width: 300px; /* width and height are respected */
  padding: 16px; /* padding works on all sides */
}
```

**`inline`** — fluye dentro del texto, ocupa solo el ancho de su contenido. `<span>`, `<a>`, `<strong>`, `<em>` son inline por defecto.

```css
.tag {
  display: inline;
  /* width and height are IGNORED */
  /* vertical padding/margin do NOT push other lines away */
  padding: 4px 8px; /* horizontal padding works, vertical padding overflows */
}
```

**`inline-block`** — fluye en linea como texto pero respeta width, height y padding/margin vertical. Lo mejor de ambos:

```css
.badge {
  display: inline-block;
  width: 80px; /* respected */
  padding: 4px 8px; /* all sides work correctly */
}
```

**`none` vs `visibility: hidden`**:

```css
.hidden-removed {
  display: none;
  /* Element is removed from the document flow entirely.
     Takes no space. Screen readers ignore it. */
}

.hidden-invisible {
  visibility: hidden;
  /* Element is invisible but still takes up space.
     Screen readers still see it. Layout is preserved. */
}
```

Usa `display: none` para eliminar algo completamente. Usa `visibility: hidden` cuando necesites preservar el espacio del layout (por ejemplo, para prevenir desplazamientos de layout al alternar contenido).

### Propiedades de ancho y alto (Width y Height)

```css
.container {
  width: 100%;          /* fill parent's content area */
  max-width: 1200px;    /* but never wider than 1200px */
  min-width: 320px;     /* and never narrower than 320px */

  min-height: 100vh;    /* at least full viewport height */
  /* Do NOT set a fixed height on content that can grow */
}
```

- **`width`** / **`height`**: establecen un tamano explicito
- **`max-width`** / **`max-height`**: establecen un limite superior (anula `width` / `height`)
- **`min-width`** / **`min-height`**: establecen un limite inferior (anula `max-width` / `max-height`)

El orden de prioridad es: `min-*` gana sobre `max-*`, que gana sobre `width`/`height`.

### Stacking Context (Contexto de apilamiento) y `z-index`

`z-index` controla que elementos aparecen encima de otros — pero solo funciona dentro de un **stacking context**.

**¿Cuando funciona `z-index`?**

`z-index` no tiene efecto en elementos con posicion static. Solo funciona en elementos con `position` establecido en `relative`, `absolute`, `fixed` o `sticky`. Tambien funciona en hijos de flex/grid.

**¿Que crea un nuevo stacking context?**

Un nuevo stacking context es creado por cualquiera de estos:

- `position: relative/absolute/fixed/sticky` combinado con un valor de `z-index` diferente de `auto`
- `opacity` menor que `1`
- `transform`, `filter`, `perspective`, `clip-path` establecidos en cualquier valor
- `isolation: isolate`

**Por que esto importa:** los elementos dentro de un stacking context solo pueden competir por el orden z *dentro* de ese contexto. Un `z-index: 9999` dentro de un stacking context con `z-index: 1` seguira apareciendo detras de un hermano con `z-index: 2`:

```css
/* Parent A creates stacking context at z-index: 1 */
.sidebar { position: relative; z-index: 1; }
.sidebar .tooltip { position: absolute; z-index: 9999; } /* trapped at level 1 */

/* Parent B at z-index: 2 covers everything in Parent A */
.main-content { position: relative; z-index: 2; }
```

El 9999 del tooltip es irrelevante — no puede escapar del stacking context de su padre. La solucion: reestructura para que el tooltip no este anidado dentro de un stacking context inferior, o usa `isolation: isolate` deliberadamente.

### Errores comunes

**Usar `px` para todo:**

```css
/* Bad: doesn't respect user's font size preferences */
.card { padding: 16px; font-size: 14px; margin-bottom: 24px; }

/* Good: scales with user preferences */
.card { padding: 1rem; font-size: 0.875rem; margin-bottom: 1.5rem; }
```

**Cadenas de `!important`** — usar `!important` para ganar batallas de especificidad:

```css
/* This spiral has no exit */
.button { color: blue !important; }
.button.primary { color: red !important; }
.nav .button.primary { color: green !important; }
```

Si necesitas `!important`, significa que tu arquitectura de especificidad esta rota. Corrige los selectores, usa CSS layers (`@layer`), o reestructura tu nomenclatura de clases.

**Establecer alturas explicitas en contenido:**

```css
/* Bad: content overflows when text is longer than expected */
.card { height: 200px; }

/* Good: card grows with content, has a minimum size */
.card { min-height: 200px; }
```

**Sobreescribir estilos del framework con hacks de especificidad:**

```css
/* Bad: fragile, breaks on framework updates */
body div.MuiButton-root.MuiButton-contained {
  background: blue;
}

/* Good: use the framework's theming API or CSS custom properties */
:root {
  --primary-color: blue;
}
```

### Puntos clave

- Siempre usa `box-sizing: border-box` globalmente. Hace que `width` signifique lo que crees que significa.
- El margin collapse solo sucede verticalmente, solo entre elementos block, y nunca dentro de contenedores flex/grid.
- `display: none` elimina del flujo; `visibility: hidden` oculta pero mantiene el espacio.
- `z-index` solo funciona en elementos posicionados y solo compite dentro del mismo stacking context.
- Usa `min-height` en lugar de `height` para contenedores de contenido. El contenido crece; las alturas fijas desbordan.

---

## 3. CSS Flexbox

### Por que esto importa

Flexbox es el sistema de layout para organizar elementos a lo largo de un **solo eje** — ya sea una fila o una columna. Antes de Flexbox, centrar un elemento verticalmente requeria hacks. Distribuir espacio equitativamente entre elementos era doloroso. Flexbox resolvio todo esto con un conjunto pequeno y aprendible de propiedades.

### Contenedor vs elementos (Container vs Items)

Flexbox tiene dos roles: el **flex container** (padre) y los **flex items** (hijos directos).

```css
.container {
  display: flex; /* This element is now a flex container */
}
```

Solo los hijos directos del contenedor se convierten en flex items. Los nietos no se ven afectados.

```html
<div class="container">     <!-- flex container -->
  <div class="item">A</div> <!-- flex item -->
  <div class="item">B</div> <!-- flex item -->
  <div class="item">        <!-- flex item -->
    <span>Not a flex item — this is a grandchild</span>
  </div>
</div>
```

### Eje principal vs eje cruzado (Main Axis vs Cross Axis)

Flexbox opera en dos ejes:

- **Eje principal (Main axis)**: la direccion en la que fluyen los elementos. Horizontal por defecto (`flex-direction: row`).
- **Eje cruzado (Cross axis)**: perpendicular al eje principal. Vertical por defecto.

```
flex-direction: row (default)
Main axis:  ← ─ ─ ─ ─ ─ ─ ─ →
Cross axis: ↑
             |
             ↓

flex-direction: column
Main axis:  ↑
             |
             ↓
Cross axis: ← ─ ─ ─ ─ ─ ─ ─ →
```

Esta distincion es critica: `justify-content` siempre controla el eje **principal**. `align-items` siempre controla el eje **cruzado**. Cuando cambias `flex-direction`, cual eje es horizontal y cual es vertical se intercambian.

### `flex-direction`

```css
.row         { flex-direction: row; }            /* left to right (default) */
.column      { flex-direction: column; }         /* top to bottom */
.row-rev     { flex-direction: row-reverse; }    /* right to left */
.col-rev     { flex-direction: column-reverse; }  /* bottom to top */
```

### `justify-content` (Eje principal)

Controla como se distribuyen los elementos a lo largo del eje principal:

```css
.container { display: flex; justify-content: flex-start; }
/* |A B C                    | */

.container { display: flex; justify-content: center; }
/* |         A B C           | */

.container { display: flex; justify-content: flex-end; }
/* |                    A B C| */

.container { display: flex; justify-content: space-between; }
/* |A         B         C| */

.container { display: flex; justify-content: space-around; }
/* |  A      B      C  | */
/* (equal space around each item — edges get half) */

.container { display: flex; justify-content: space-evenly; }
/* |   A     B     C   | */
/* (equal space everywhere, including edges) */
```

### `align-items` (Eje cruzado)

Controla como se posicionan los elementos a lo largo del eje cruzado:

```css
.container { display: flex; align-items: stretch; }
/* Default. Items stretch to fill the container's cross-axis size. */

.container { display: flex; align-items: flex-start; }
/* Items align to the start of the cross axis (top for row). */

.container { display: flex; align-items: center; }
/* Items are vertically centered (for row direction). */

.container { display: flex; align-items: flex-end; }
/* Items align to the end of the cross axis (bottom for row). */

.container { display: flex; align-items: baseline; }
/* Items align by their text baseline. Useful for mixed font sizes. */
```

### `align-self`

Sobreescribe `align-items` para un solo elemento:

```css
.container { display: flex; align-items: flex-start; }
.special-item { align-self: center; } /* only this item is centered */
```

### `flex-wrap`

Por defecto, todos los elementos se comprimen en una sola linea, encogiendose segun sea necesario:

```css
.container { display: flex; flex-wrap: nowrap; }  /* default: single line */
.container { display: flex; flex-wrap: wrap; }     /* items wrap to new lines */
```

Con `wrap`, los elementos pasan a la siguiente linea cuando no pueden caber. Esto es esencial para layouts responsivos.

### La propiedad abreviada `flex`

La propiedad `flex` en los elementos controla como crecen, se encogen y su tamano base:

```css
.item { flex: 1; }
/* Shorthand for: flex-grow: 1; flex-shrink: 1; flex-basis: 0%; */
/* Item will grow to fill available space */
```

Los tres componentes:

- **`flex-grow`**: cuanto del espacio restante debe tomar este elemento. `0` significa no crecer. `1` significa tomar una parte igual. `2` significa tomar el doble de la parte de los elementos con `1`.
- **`flex-shrink`**: cuanto debe encogerse este elemento cuando el espacio es limitado. `0` significa no encogerse. `1` es el valor por defecto.
- **`flex-basis`**: el tamano inicial antes de crecer o encogerse. Puede ser una longitud (`200px`, `30%`) o `auto` (usa el tamano del contenido del elemento o `width`).

```css
.sidebar { flex: 0 0 250px; }  /* don't grow, don't shrink, always 250px */
.content { flex: 1; }          /* take all remaining space */
```

### `gap`

Espaciado entre flex items sin usar margenes:

```css
.container {
  display: flex;
  gap: 16px;       /* equal gap in all directions */
  /* or */
  gap: 16px 24px;  /* row-gap column-gap */
}
```

`gap` es mas limpio que los margenes porque solo aplica *entre* elementos, nunca en los bordes exteriores.

### Patrones comunes

**Centrado en ambos ejes** (el caso de uso mas famoso de Flexbox):

```css
.center-everything {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
```

**Barra de navegacion:**

```css
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
}
.nav-links { display: flex; gap: 1.5rem; }
```

**Fila de tarjetas que se envuelve:**

```css
.card-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.card { flex: 1 1 300px; } /* grow, shrink, minimum 300px */
```

**Footer fijo** (el footer se pega al fondo incluso cuando el contenido es corto):

```css
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main { flex: 1; } /* main grows to push footer down */
footer { /* stays at bottom naturally */ }
```

**Layout con barra lateral:**

```css
.layout {
  display: flex;
  gap: 2rem;
}
.sidebar { flex: 0 0 250px; }
.content { flex: 1; min-width: 0; } /* min-width: 0 prevents overflow */
```

### Errores comunes

**Anidar Flexbox 5 niveles de profundidad:**

```css
/* Bad: hard to debug, hard to maintain */
.page { display: flex; }
  .section { display: flex; }
    .row { display: flex; }
      .col { display: flex; }
        .item { display: flex; }
```

Si necesitas contenedores flex profundamente anidados, tu estructura HTML probablemente esta sobrecomplicada. Aplanala o usa Grid para el layout exterior.

**Usar Flexbox para layouts 2D:**

```css
/* Bad: Flexbox for a grid of cards with aligned rows and columns */
.card-grid {
  display: flex;
  flex-wrap: wrap;
}
.card { width: calc(33.333% - 1rem); } /* manual math, fragile */

/* Good: Grid is designed for 2D */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}
```

**Confundir `flex-basis` y `width`:**

Cuando `flex-direction` es `row`, `flex-basis` y `width` ambos establecen el tamano horizontal. Pero `flex-basis` gana — sobreescribe `width` cuando ambos estan definidos. Cuando `flex-direction` es `column`, `flex-basis` controla la **altura**, no el ancho. Usa `flex-basis` en layouts flex, y `width`/`height` fuera de ellos.

**Desbordamiento con `flex: 1`:**

```css
/* Bug: long text in a flex child overflows the container */
.content { flex: 1; }

/* Fix: allow the flex item to shrink below its content size */
.content { flex: 1; min-width: 0; }
```

Los flex items tienen un `min-width: auto` implicito, lo que significa que se niegan a encogerse por debajo del tamano de su contenido. Establece `min-width: 0` para anular esto.

### Puntos clave

- `justify-content` controla el eje principal; `align-items` controla el eje cruzado. Cambiar `flex-direction` intercambia que direccion fisica controla cada uno.
- `flex: 1` significa "crecer para llenar el espacio disponible". `flex: 0 0 250px` significa "quedarse exactamente en 250px".
- Usa `gap` en lugar de margenes para espaciado entre flex items.
- Establece `min-width: 0` en flex items que contengan texto u otro contenido que pueda desbordar.
- Si necesitas elementos alineados tanto en filas COMO en columnas, usa Grid en lugar de Flexbox.

---

## 4. CSS Grid

### Por que esto importa

CSS Grid es el sistema de layout para **layouts bidimensionales** — controlando filas y columnas simultaneamente. Flexbox maneja un eje a la vez. Grid maneja ambos. Con Grid, puedes construir layouts de pagina, cuadriculas de tarjetas y dashboards con menos codigo, menos matematicas y mejor responsividad que cualquier otra tecnica CSS.

### Contenedor vs elementos (Container vs Items)

Al igual que Flexbox, Grid tiene un contenedor y elementos:

```css
.grid {
  display: grid;
}
```

Los hijos directos del contenedor grid se convierten en grid items.

### Definir columnas y filas

```css
.grid {
  display: grid;
  grid-template-columns: 200px 1fr 200px;  /* 3 columns */
  grid-template-rows: auto 1fr auto;        /* 3 rows */
}
```

Esto crea una cuadricula de 3 columnas y 3 filas. La primera y tercera columnas miden 200px de ancho. La columna del medio toma todo el espacio restante (`1fr`). Las filas se dimensionan por contenido (`auto`) para la primera y la ultima, y la fila del medio llena la altura restante.

### La unidad `fr`

`fr` significa "fraccion del espacio disponible". Distribuye el espacio restante proporcionalmente:

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  /* First column: 25% of space
     Second column: 50% of space
     Third column: 25% of space */
}
```

`fr` se calcula *despues* de que las columnas de tamano fijo y los gaps se restan. Entonces en `200px 1fr 1fr`, las dos columnas `1fr` dividen lo que queda despues de la columna de 200px y cualquier gap.

### `repeat()`

Evita la repeticion:

```css
/* Instead of: */
grid-template-columns: 1fr 1fr 1fr 1fr;

/* Write: */
grid-template-columns: repeat(4, 1fr);
```

### `minmax()`

Establece un rango de tamano para los tracks:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  /* Each column is at least 200px, at most 1fr */
}
```

### `auto-fill` vs `auto-fit`

Ambos crean tantas columnas como quepan. La diferencia es que sucede con el espacio sobrante:

```css
/* auto-fill: creates empty tracks for leftover space */
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

/* auto-fit: collapses empty tracks, existing items stretch to fill */
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
```

Con 3 elementos en un contenedor ancho:

- **`auto-fill`**: 3 elementos con un ancho de aproximadamente 200px, los tracks vacios llenan el resto. Los elementos NO se estiran mas alla de su minimo.
- **`auto-fit`**: 3 elementos se estiran para llenar todo el ancho del contenedor. Sin tracks vacios.

**Usa `auto-fit`** cuando quieras que los elementos crezcan y llenen el espacio disponible (lo mas comun). **Usa `auto-fill`** cuando quieras que los elementos mantengan un tamano consistente sin importar el ancho del contenedor.

### `gap`

```css
.grid {
  display: grid;
  gap: 1rem;              /* equal row and column gap */
  /* or */
  row-gap: 1rem;
  column-gap: 2rem;
}
```

### Colocar elementos (Placing Items)

Los elementos se colocan automaticamente por defecto (en orden, llenando cada fila). Puedes colocar elementos explicitamente:

```css
.header {
  grid-column: 1 / -1;  /* span all columns (1 to last) */
}

.sidebar {
  grid-column: 1 / 2;   /* first column */
  grid-row: 2 / 4;      /* span rows 2 and 3 */
}

.card {
  grid-column: span 2;  /* span 2 columns from current position */
}
```

Las lineas del grid se numeran empezando en 1. Los numeros negativos cuentan desde el final (`-1` es la ultima linea).

### Areas de grid con nombre (Named Grid Areas)

La forma mas legible de definir layouts:

```css
.page {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header  header"
    "sidebar content"
    "footer  footer";
  min-height: 100vh;
}

.page-header  { grid-area: header; }
.page-sidebar { grid-area: sidebar; }
.page-content { grid-area: content; }
.page-footer  { grid-area: footer; }
```

Cada cadena en `grid-template-areas` representa una fila. Cada palabra representa una columna en esa fila. Repetir un nombre extiende el elemento a traves de esas columnas/filas. Usa `.` para celdas vacias.

### Grids implicitos vs explicitos (Implicit vs Explicit Grids)

El **grid explicito** es lo que defines con `grid-template-columns` y `grid-template-rows`. Si tienes mas elementos que celdas, Grid crea nuevas filas automaticamente — esto es el **grid implicito**.

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* Only columns defined. Rows are created implicitly. */
  grid-auto-rows: minmax(150px, auto);
  /* Control the size of implicitly created rows */
}
```

`grid-auto-rows` y `grid-auto-columns` controlan el tamano de los tracks en el grid implicito.

### Patrones comunes

**Layout holy grail:**

```css
.layout {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header  header"
    "left   content right"
    "footer footer  footer";
  min-height: 100vh;
  gap: 1rem;
}
```

**Cuadricula de tarjetas responsiva (sin media queries):**

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
```

Esta unica declaracion crea una cuadricula responsiva: 1 columna en pantallas pequenas, 2 en medianas, 3+ en grandes. No se necesitan breakpoints.

**Layout de dashboard:**

```css
.dashboard {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(150px, auto);
  gap: 1rem;
}
.widget-wide { grid-column: span 2; }
.widget-tall { grid-row: span 2; }
.widget-full { grid-column: 1 / -1; }
```

**Layout estilo revista:**

```css
.magazine {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 200px;
  gap: 1rem;
}
.feature {
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}
```

### Flexbox vs Grid: cuando usar cual

**Una dimension (fila O columna)** → Flexbox

```
Navigation bar: [Logo] [Home] [About] [Contact] [Login]
```

**Dos dimensiones (filas Y columnas)** → Grid

```
┌──────────────────────────────────┐
│           Header                  │
├─────────┬────────────────────────┤
│ Sidebar │      Content            │
│         │                         │
├─────────┴────────────────────────┤
│           Footer                  │
└──────────────────────────────────┘
```

Ambas herramientas trabajan juntas. Usa Grid para el layout de la pagina y Flexbox para componentes dentro de las celdas del grid (por ejemplo, una navegacion flex dentro de un header en grid).

### Errores comunes

**Evitar Grid porque "Flexbox es mas simple":**

Grid no es mas dificil que Flexbox — resuelve problemas diferentes. Una cuadricula de tarjetas responsiva en Flexbox requiere calculos manuales de ancho y hacks de margenes. En Grid es una sola linea: `repeat(auto-fit, minmax(280px, 1fr))`.

**Codificar el numero de columnas:**

```css
/* Bad: breaks on small screens, requires media queries */
.grid { grid-template-columns: repeat(4, 1fr); }

/* Good: adapts automatically to any container width */
.grid { grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
```

**Usar Grid para layouts simples de un solo eje:**

```css
/* Overkill: Grid for a row of buttons */
.button-group {
  display: grid;
  grid-template-columns: repeat(3, auto);
}

/* Better: Flexbox for a row of items */
.button-group {
  display: flex;
  gap: 0.5rem;
}
```

**Olvidar `min-width: 0` o `min-height: 0`:**

Los grid items, al igual que los flex items, tienen minimos implicitos. El contenido puede desbordar las celdas del grid si no tienes esto en cuenta:

```css
/* Fix for text overflow in grid items */
.grid-item {
  min-width: 0;       /* allow shrinking below content width */
  overflow-wrap: break-word; /* break long words if needed */
}
```

### Puntos clave

- `repeat(auto-fit, minmax(250px, 1fr))` es la linea individual mas util en CSS. Crea una cuadricula completamente responsiva con cero media queries.
- Usa `grid-template-areas` para layouts a nivel de pagina — se lee como un diagrama ASCII de tu pagina.
- `auto-fit` colapsa tracks vacios (los elementos se estiran). `auto-fill` mantiene tracks vacios (los elementos mantienen su tamano).
- Usa Grid para layouts 2D (estructura de pagina, cuadriculas de tarjetas, dashboards). Usa Flexbox para layouts 1D (barras de navegacion, grupos de botones, centrado).
- Define grids explicitos para la estructura que conoces. Usa `grid-auto-rows` para manejar las filas implicitas que no conoces.

---

## 5. Esenciales de JavaScript (ES2020+)

### Por que esto importa

JavaScript moderno es el lenguaje que escribiras a diario. Los frameworks abstraen parte de el, pero no pueden ocultarlo — necesitas closures para hooks, destructuring para props, async/await para la obtencion de datos, y metodos de array para transformar datos. Fundamentos debiles de JavaScript son el predictor #1 de dificultades con los frameworks.

### Modulos: `import` / `export`

Los modulos son la base de la organizacion del codigo. Cada archivo es un modulo con su propio scope.

**Named exports** — exportar multiples valores por nombre:

```js
// math.js
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }

// main.js
import { add, subtract } from './math.js';
```

**Default export** — uno por modulo, importado con cualquier nombre:

```js
// logger.js
export default function log(msg) { console.log(msg); }

// main.js
import log from './logger.js';
import myLogger from './logger.js'; // same thing, different name
```

**Re-exportar** — agregar modulos:

```js
// utils/index.js
export { add, subtract } from './math.js';
export { default as log } from './logger.js';
```

**`import()` dinamico** — cargar modulos bajo demanda para code splitting:

```js
button.addEventListener('click', async () => {
  const { renderChart } = await import('./chart.js');
  renderChart(data);
});
```

Los imports dinamicos devuelven una promesa y son la base de la carga diferida (lazy loading) en todos los frameworks.

### `let` / `const` vs `var`

`var` tiene scope de funcion. `let` y `const` tienen scope de bloque.

```js
if (true) {
  var x = 1;   // accessible outside the block
  let y = 2;   // only accessible inside this block
  const z = 3; // only accessible inside this block, cannot be reassigned
}
console.log(x); // 1
console.log(y); // ReferenceError
```

**Zona muerta temporal (Temporal dead zone)**: `let` y `const` existen en su bloque desde el inicio pero no pueden ser accedidos antes de su linea de declaracion. Acceder a ellos antes lanza un `ReferenceError`:

```js
console.log(name); // ReferenceError: Cannot access 'name' before initialization
let name = 'Alice';
```

`var` silenciosamente devolveria `undefined` aqui, lo cual oculta errores. Por eso `let`/`const` son mejores.

**Regla**: Usa `const` por defecto. Usa `let` cuando necesites reasignar. Nunca uses `var`.

### Destructuring

Extrae valores de objetos y arrays en variables:

**Destructuring de objetos:**

```js
const user = { name: 'Alice', age: 30, role: 'admin' };
const { name, age } = user;            // name = 'Alice', age = 30
const { role: userRole } = user;       // rename: userRole = 'admin'
const { city = 'Unknown' } = user;     // default: city = 'Unknown'
```

**Destructuring de arrays:**

```js
const [first, second] = [10, 20, 30];    // first = 10, second = 20
const [, , third] = [10, 20, 30];        // skip elements: third = 30
const [head, ...rest] = [1, 2, 3, 4];    // head = 1, rest = [2, 3, 4]
```

**Destructuring anidado:**

```js
const response = { data: { users: [{ name: 'Alice' }] } };
const { data: { users: [{ name }] } } = response;
// name = 'Alice'
```

Usa destructuring anidado con moderacion — los patrones profundamente anidados se vuelven dificiles de leer.

**Destructuring en parametros de funcion:**

```js
function greet({ name, greeting = 'Hello' }) {
  return `${greeting}, ${name}!`;
}
greet({ name: 'Alice' }); // "Hello, Alice!"
```

### Spread y Rest

**Spread** (`...`) expande un iterable en elementos individuales:

```js
// Arrays
const a = [1, 2];
const b = [...a, 3, 4]; // [1, 2, 3, 4]

// Objects (shallow copy)
const original = { x: 1, y: 2 };
const copy = { ...original, y: 3 }; // { x: 1, y: 3 } — y overridden
```

**Rest** (`...`) recopila los elementos restantes en un array u objeto:

```js
// Function parameters
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4); // 10

// Object rest
const { id, ...attrs } = { id: 1, name: 'Alice', age: 30 };
// id = 1, attrs = { name: 'Alice', age: 30 }
```

### Template Literals

Interpolacion de cadenas y cadenas multilinea:

```js
const name = 'Alice';
const greeting = `Hello, ${name}!`;         // "Hello, Alice!"
const multiline = `
  First line
  Second line
`;
```

**Tagged templates** — funciones que procesan template literals:

```js
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) =>
    result + str + (values[i] ? `<mark>${values[i]}</mark>` : ''), ''
  );
}
const query = 'flexbox';
highlight`Search results for ${query} in CSS`
// "Search results for <mark>flexbox</mark> in CSS"
```

Los tagged templates son usados por librerias como `styled-components` y `graphql-tag`.

### Optional Chaining (`?.`) y Nullish Coalescing (`??`)

**Optional chaining** accede de forma segura a propiedades anidadas que podrian ser `null` o `undefined`:

```js
const user = { address: { city: 'Paris' } };
const city = user.address?.city;     // 'Paris'
const zip = user.address?.zip;       // undefined (not an error)
const country = user.location?.country; // undefined (not an error)

// Works on methods and arrays too
const result = obj.method?.();       // calls method if it exists
const item = arr?.[0];               // accesses index if arr is not null
```

**Nullish coalescing** proporciona un valor por defecto solo para `null` o `undefined` (no para `0`, `''` o `false`):

```js
const port = config.port ?? 3000;    // 3000 only if port is null/undefined
const port2 = config.port || 3000;   // 3000 if port is null, undefined, 0, '', or false

// This matters:
const count = 0;
count ?? 10;  // 0 — correct, 0 is a valid count
count || 10;  // 10 — wrong, treats 0 as falsy
```

**Regla**: Usa `??` cuando `0`, `''` o `false` son valores validos. Usa `||` solo cuando todos los valores falsy deberian activar el valor por defecto.

### `async` / `await`

Promesas hechas legibles:

```js
// Promise chain (harder to follow)
fetchUser(id)
  .then(user => fetchPosts(user.id))
  .then(posts => renderPosts(posts))
  .catch(err => showError(err));

// async/await (reads top-to-bottom)
async function loadUserPosts(id) {
  try {
    const user = await fetchUser(id);
    const posts = await fetchPosts(user.id);
    renderPosts(posts);
  } catch (err) {
    showError(err);
  }
}
```

**Ejecucion en paralelo** — cuando las peticiones son independientes:

```js
// Bad: sequential — each waits for the previous
const user = await fetchUser(id);
const posts = await fetchPosts(id);
const comments = await fetchComments(id);

// Good: parallel — all start simultaneously
const [user, posts, comments] = await Promise.all([
  fetchUser(id),
  fetchPosts(id),
  fetchComments(id),
]);
```

**`Promise.all` vs `Promise.allSettled`**:

```js
// Promise.all: fails fast — if ANY promise rejects, the whole thing rejects
await Promise.all([fetchA(), fetchB(), fetchC()]);

// Promise.allSettled: waits for ALL promises, never rejects
const results = await Promise.allSettled([fetchA(), fetchB(), fetchC()]);
results.forEach(r => {
  if (r.status === 'fulfilled') console.log(r.value);
  if (r.status === 'rejected') console.log(r.reason);
});
```

Usa `Promise.all` cuando necesitas todos los resultados para proceder. Usa `Promise.allSettled` cuando algunos fallos son aceptables (por ejemplo, cargar widgets de dashboard independientemente).

### Metodos de Array

Estos metodos devuelven nuevos arrays — no modifican el original.

```js
const numbers = [1, 2, 3, 4, 5];

// map: transform each element
numbers.map(n => n * 2);               // [2, 4, 6, 8, 10]

// filter: keep elements that pass a test
numbers.filter(n => n > 3);            // [4, 5]

// find: first element that passes a test
numbers.find(n => n > 3);              // 4

// findIndex: index of first element that passes a test
numbers.findIndex(n => n > 3);         // 3

// some: does at least one element pass?
numbers.some(n => n > 4);              // true

// every: do all elements pass?
numbers.every(n => n > 0);             // true

// reduce: accumulate into a single value
numbers.reduce((sum, n) => sum + n, 0); // 15

// flat: flatten nested arrays
[[1, 2], [3, [4]]].flat();             // [1, 2, 3, [4]]
[[1, 2], [3, [4]]].flat(Infinity);     // [1, 2, 3, 4]

// flatMap: map then flatten one level
['hello world', 'foo bar'].flatMap(s => s.split(' '));
// ['hello', 'world', 'foo', 'bar']
```

**Encadenarlos** para transformaciones de datos:

```js
const activeAdmins = users
  .filter(u => u.active)
  .filter(u => u.role === 'admin')
  .map(u => u.name);
```

### Closures

Un closure es una funcion que recuerda las variables del scope donde fue creada, incluso despues de que ese scope haya terminado de ejecutarse:

```js
function createCounter() {
  let count = 0;                  // this variable is "closed over"
  return {
    increment: () => ++count,
    getCount: () => count,
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.getCount();  // 2
```

Las funciones internas `increment` y `getCount` "encierran" la variable `count`. Cada llamada a `createCounter()` crea un nuevo `count` independiente.

**El error de closure obsoleto en React:**

```js
function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      // BUG: this closure captures the initial count (0) and never updates
      console.log(count); // always 0
      setCount(count + 1); // always sets to 1
    }, 1000);
    return () => clearInterval(id);
  }, []); // empty deps = effect runs once, closure is never refreshed
}
```

La solucion — usar la forma de funcion de `setState`:

```js
setCount(prev => prev + 1); // always uses the latest value
```

Este es el error mas comun en React, y se origina por no entender los closures.

### El Event Loop

JavaScript es de un solo hilo (single-threaded). Ejecuta codigo usando un call stack y dos colas:

1. **Call stack**: ejecuta funciones una a la vez, sincronamente.
2. **Cola de microtareas (Microtask queue)**: promesas (`.then`, `await`), `queueMicrotask`. Se procesan despues de cada elemento del call stack, antes de la siguiente macrotarea.
3. **Cola de tareas (Task queue / macrotask queue)**: `setTimeout`, `setInterval`, eventos del DOM. Se procesan una a la vez, despues de que la cola de microtareas este vacia.

```js
console.log('1');                          // call stack

setTimeout(() => console.log('2'), 0);     // task queue

Promise.resolve().then(() => console.log('3')); // microtask queue

console.log('4');                          // call stack

// Output: 1, 4, 3, 2
```

Incluso `setTimeout(fn, 0)` no es instantaneo. El callback va a la cola de tareas y espera hasta que:
1. El call stack actual este vacio
2. Todas las microtareas (promesas) hayan sido procesadas

Por eso los timeouts de "cero retraso" aun se ejecutan despues de los callbacks de promesas.

### `Map`, `Set`, `WeakMap`, `WeakSet`

**`Map`** — pares clave-valor donde las claves pueden ser de cualquier tipo (no solo strings):

```js
const cache = new Map();
cache.set(userObj, 'cached-data');   // object as key — impossible with plain objects
cache.get(userObj);                  // 'cached-data'
cache.has(userObj);                  // true
cache.size;                         // 1
```

**`Set`** — una coleccion de valores unicos:

```js
const unique = new Set([1, 2, 2, 3, 3]);
[...unique]; // [1, 2, 3]

unique.add(4);
unique.has(2);    // true
unique.delete(2); // removes 2
```

**`WeakMap` / `WeakSet`** — igual que Map/Set pero las claves (WeakMap) o valores (WeakSet) se mantienen de forma debil y son recolectadas por el garbage collector cuando no existe otra referencia. Usalos para asociar metadatos con objetos sin prevenir la recoleccion de basura:

```js
const metadata = new WeakMap();
function process(element) {
  if (!metadata.has(element)) {
    metadata.set(element, { processed: true });
  }
}
// When `element` is removed from the DOM and dereferenced,
// the metadata entry is automatically garbage collected.
```

**Cuando usar en lugar de objetos/arrays simples:**

| Caso de uso | Usa |
|----------|-----|
| Busquedas simples con claves string | Objeto simple `{}` |
| Claves no-string, agregar/eliminar frecuente, necesitas `.size` | `Map` |
| Deduplicacion | `Set` |
| Metadatos privados que no deben prevenir el GC | `WeakMap` |
| Rastrear objetos sin fugas de memoria | `WeakSet` |

### Errores comunes

**Mutar argumentos de funciones:**

```js
// Bad: caller's object is modified unexpectedly
function addAdmin(users) {
  users.push({ name: 'Admin', role: 'admin' });
  return users;
}

// Good: return a new array
function addAdmin(users) {
  return [...users, { name: 'Admin', role: 'admin' }];
}
```

**Olvidar `await`:**

```js
// Bug: deleteUser returns a promise, doesn't actually wait
async function cleanup(userId) {
  deleteUser(userId);        // missing await — fire and forget
  console.log('Deleted');    // runs before deletion completes
}

// Fix:
async function cleanup(userId) {
  await deleteUser(userId);
  console.log('Deleted');
}
```

**`for...in` en arrays:**

```js
const arr = ['a', 'b', 'c'];

// Bad: for...in iterates over property KEYS (strings), includes prototype properties
for (const i in arr) { console.log(i); } // "0", "1", "2" (strings, not numbers)

// Good: for...of iterates over VALUES
for (const val of arr) { console.log(val); } // "a", "b", "c"

// Also good: array methods
arr.forEach(val => console.log(val));
```

**`==` vs `===`:**

```js
// == performs type coercion — surprising results
0 == '';       // true
0 == false;    // true
'' == false;   // true
null == undefined; // true

// === checks value AND type — predictable
0 === '';      // false
0 === false;   // false
```

Siempre usa `===`. El unico `==` aceptable es `value == null` para verificar tanto `null` como `undefined` simultaneamente, e incluso eso es una eleccion de estilo.

**Callback hell (anidar cadenas `.then`):**

```js
// Bad: nested promises — just as bad as callback hell
fetchUser(id).then(user => {
  fetchPosts(user.id).then(posts => {
    fetchComments(posts[0].id).then(comments => {
      render(user, posts, comments);
    });
  });
});

// Good: flat async/await
async function loadData(id) {
  const user = await fetchUser(id);
  const posts = await fetchPosts(user.id);
  const comments = await fetchComments(posts[0].id);
  render(user, posts, comments);
}
```

**Usar `var`:**

`var` se eleva (hoisted) al scope de la funcion y puede ser accedido antes de su declaracion (como `undefined`). Esto causa errores silenciosos. No hay razon para usar `var` en JavaScript moderno.

### Puntos clave

- Usa `const` por defecto, `let` cuando se necesite reasignacion, nunca `var`.
- Destructuring y spread no son azucar sintactico — son la forma en que trabajas con props, state y respuestas de APIs en todos los frameworks.
- `?.` y `??` eliminan cadenas defensivas de `if`. Usa `??` en lugar de `||` cuando `0` o `''` son valores validos.
- `async`/`await` es azucar sintactico sobre promesas. Usa `Promise.all` para operaciones en paralelo, `Promise.allSettled` cuando el fallo parcial es aceptable.
- Los closures capturan variables por referencia. En los hooks de React, esto significa valores obsoletos si tu array de dependencias es incorrecto. Usa la forma de funcion de `setState` al actualizar basandote en el estado previo.
