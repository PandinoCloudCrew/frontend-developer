# HTML Semántico y el DOM

HTML no es un lenguaje de formato visual. Es una **descripción estructural** de tu contenido que proporciona significado a navegadores, lectores de pantalla y motores de busqueda. Elegir los elementos correctos te da comportamiento gratis; elegir los equivocados te hace reimplementar lo que el navegador ya provee.

---

## Estructura del documento

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
- **`<meta name="viewport">`** hace que la página sea responsiva en moviles. Sin el, los telefonos renderizan la página con un ancho de escritorio y la encogen.
- **`<title>`** aparece en la pestana del navegador, los marcadores y los resultados de busqueda. Cada página debe tener un titulo único y descriptivo.
- **`<meta name="description">`** es el fragmento que se muestra en los resultados de busqueda. Mantenlo bajo 160 caracteres.

---

## Elementos semanticos

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
| `<header>` | Contenido introductorio para su ancestro de sección mas cercano (página o articulo) |
| `<nav>` | Un grupo de enlaces de navegación. Agrega `aria-label` cuando tengas multiples elementos `<nav>` |
| `<main>` | El contenido dominante de la página. Solo uno por página |
| `<section>` | Una agrupacion tematica de contenido, tipicamente con un encabezado |
| `<article>` | Contenido autocontenido que podria funcionar por si solo (publicacion de blog, comentario, tarjeta de producto) |
| `<aside>` | Contenido tangencialmente relacionado con el contenido circundante (barra lateral, nota destacada) |
| `<footer>` | Pie de página para su ancestro de sección mas cercano |
| `<figure>` / `<figcaption>` | Una imagen, diagrama o fragmento de código con una leyenda opcional |
| `<time>` | Una fecha u hora. Usa el atributo `datetime` para el formato legible por maquinas |
| `<mark>` | Texto resaltado (coincidencia en resultados de busqueda, por ejemplo) |
| `<details>` / `<summary>` | Un widget de revelacion nativo — clic para expandir/colapsar. No se necesita JavaScript |

---

## La decision entre `<div>` y elementos semanticos

Usa este proceso de decision:

1. **¿Este contenido tiene un significado específico?** (navegación, articulo, barra lateral, encabezado, pie de página) → Usa el elemento semántico correspondiente.
2. **¿Es una agrupacion tematica con un encabezado?** → Usa `<section>`.
3. **¿Es contenido autocontenido?** → Usa `<article>`.
4. **¿Necesito un contenedor generico puramente para estilos o layout?** → Usa `<div>`.

La regla es simple: **`<div>` es el ultimo recurso, no el valor por defecto.** Un `<div>` no le dice nada al navegador ni a la tecnologia asistiva sobre el contenido dentro de el. Cuando usas `<nav>`, los lectores de pantalla anuncian "navegación". Cuando usas `<div>`, no anuncian nada.

---

## El modelo mental del DOM

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

El DOM no es tu código fuente HTML. El navegador analiza el HTML, corrige errores y construye el DOM. JavaScript puede modificar el DOM en tiempo de ejecución — agregando, eliminando o cambiando nodos. Cuando un framework "re-renderiza", esta actualizando el arbol DOM (o una representacion virtual del mismo).

---

## Errores comunes

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

**Saltar niveles de encabezado** — pasar de `<h1>` a `<h3>`:

```html
<!-- Bad: screen reader users navigate by heading level -->
<h1>Page Title</h1>
<h3>Section Title</h3>

<!-- Good: sequential heading hierarchy -->
<h1>Page Title</h1>
<h2>Section Title</h2>
```

**Tabla para layout** — usar `<table>` para organizar elementos de la página. Las tablas son para datos tabulares (filas y columnas de valores relacionados). Usa CSS Grid o Flexbox para layout.

**Span para estructura** — usar `<span>` donde se necesita un elemento semántico de bloque. `<span>` es para texto en linea dentro de una oracion, no para envolver secciones de contenido.

---

## Puntos clave

- HTML describe la estructura del contenido, no la apariencia visual. Elige elementos por su significado, no por como se ven.
- `<div>` es un contenedor de estilos. Usalo solo cuando ningun elemento semántico encaje.
- El DOM es un arbol en vivo de objetos que el navegador construye a partir de tu HTML. JavaScript y los frameworks manipulan este arbol.
- Cada página necesita exactamente un `<h1>`. Los encabezados deben descender secuencialmente.
