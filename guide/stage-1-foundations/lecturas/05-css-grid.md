# CSS Grid

CSS Grid es el sistema de layout para **layouts bidimensionales** — controlando filas y columnas simultaneamente. Flexbox maneja un eje a la vez; Grid maneja ambos. Con Grid puedes construir layouts de página, cuadriculas de tarjetas y dashboards con menos código, menos matematicas y mejor responsividad que cualquier otra técnica CSS.

---

## Contenedor vs elementos (Container vs Items)

Al igual que Flexbox, Grid tiene un contenedor y elementos:

```css
.grid {
  display: grid;
}
```

Los hijos directos del contenedor grid se convierten en grid items.

---

## Definir columnas y filas

```css
.grid {
  display: grid;
  grid-template-columns: 200px 1fr 200px;  /* 3 columns */
  grid-template-rows: auto 1fr auto;        /* 3 rows */
}
```

Esto crea una cuadricula de 3 columnas y 3 filas. La primera y tercera columnas miden 200px de ancho. La columna del medio toma todo el espacio restante (`1fr`). Las filas se dimensionan por contenido (`auto`) para la primera y la ultima, y la fila del medio llena la altura restante.

---

## La unidad `fr`

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

`fr` se calcula *despues* de que las columnas de tamaño fijo y los gaps se restan. Entonces en `200px 1fr 1fr`, las dos columnas `1fr` dividen lo que queda despues de la columna de 200px y cualquier gap.

---

## `repeat()`

Evita la repeticion:

```css
/* Instead of: */
grid-template-columns: 1fr 1fr 1fr 1fr;

/* Write: */
grid-template-columns: repeat(4, 1fr);
```

---

## `minmax()`

Establece un rango de tamaño para los tracks:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  /* Each column is at least 200px, at most 1fr */
}
```

---

## `auto-fill` vs `auto-fit`

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

**Usa `auto-fit`** cuando quieras que los elementos crezcan y llenen el espacio disponible (lo mas comun). **Usa `auto-fill`** cuando quieras que los elementos mantengan un tamaño consistente sin importar el ancho del contenedor.

---

## `gap`

```css
.grid {
  display: grid;
  gap: 1rem;              /* equal row and column gap */
  /* or */
  row-gap: 1rem;
  column-gap: 2rem;
}
```

---

## Colocar elementos (Placing Items)

Los elementos se colocan automáticamente por defecto (en orden, llenando cada fila). Puedes colocar elementos explicitamente:

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

---

## Areas de grid con nombre (Named Grid Areas)

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

---

## Grids implicitos vs explicitos (Implicit vs Explicit Grids)

El **grid explícito** es lo que defines con `grid-template-columns` y `grid-template-rows`. Si tienes mas elementos que celdas, Grid crea nuevas filas automáticamente — esto es el **grid implícito**.

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* Only columns defined. Rows are created implicitly. */
  grid-auto-rows: minmax(150px, auto);
  /* Control the size of implicitly created rows */
}
```

`grid-auto-rows` y `grid-auto-columns` controlan el tamaño de los tracks en el grid implícito.

---

## Patrones comunes

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

Esta única declaración crea una cuadricula responsiva: 1 columna en pantallas pequenas, 2 en medianas, 3+ en grandes. No se necesitan breakpoints.

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

---

## Flexbox vs Grid: cuando usar cual

**Una dimensión (fila O columna)** → Flexbox

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

Ambas herramientas trabajan juntas. Usa Grid para el layout de la página y Flexbox para componentes dentro de las celdas del grid (por ejemplo, una navegación flex dentro de un header en grid).

---

## Errores comunes

**Evitar Grid porque "Flexbox es mas simple":**

Grid no es mas difícil que Flexbox — resuelve problemas diferentes. Una cuadricula de tarjetas responsiva en Flexbox requiere calculos manuales de ancho y hacks de margenes. En Grid es una sola linea: `repeat(auto-fit, minmax(280px, 1fr))`.

**Codificar el número de columnas:**

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

---

## Puntos clave

- `repeat(auto-fit, minmax(250px, 1fr))` es la linea individual mas útil en CSS. Crea una cuadricula completamente responsiva con cero media queries.
- Usa `grid-template-areas` para layouts a nivel de página — se lee como un diagrama ASCII de tu página.
- `auto-fit` colapsa tracks vacios (los elementos se estiran). `auto-fill` mantiene tracks vacios (los elementos mantienen su tamaño).
- Usa Grid para layouts 2D (estructura de página, cuadriculas de tarjetas, dashboards). Usa Flexbox para layouts 1D (barras de navegación, grupos de botones, centrado).
- Define grids explicitos para la estructura que conoces. Usa `grid-auto-rows` para manejar las filas implicitas que no conoces.
