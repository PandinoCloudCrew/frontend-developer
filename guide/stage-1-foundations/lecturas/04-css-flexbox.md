# CSS Flexbox

Flexbox es el sistema de layout para organizar elementos a lo largo de un **solo eje** — ya sea una fila o una columna. Antes de Flexbox, centrar un elemento verticalmente requeria hacks y distribuir espacio equitativamente entre elementos era doloroso. Flexbox resolvio todo esto con un conjunto pequeno y aprendible de propiedades.

---

## Contenedor vs elementos (Container vs Items)

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

---

## Eje principal vs eje cruzado (Main Axis vs Cross Axis)

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

---

## `flex-direction`

```css
.row         { flex-direction: row; }            /* left to right (default) */
.column      { flex-direction: column; }         /* top to bottom */
.row-rev     { flex-direction: row-reverse; }    /* right to left */
.col-rev     { flex-direction: column-reverse; }  /* bottom to top */
```

---

## `justify-content` (Eje principal)

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

---

## `align-items` (Eje cruzado)

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

---

## `align-self`

Sobreescribe `align-items` para un solo elemento:

```css
.container { display: flex; align-items: flex-start; }
.special-item { align-self: center; } /* only this item is centered */
```

---

## `flex-wrap`

Por defecto, todos los elementos se comprimen en una sola linea, encogiendose segun sea necesario:

```css
.container { display: flex; flex-wrap: nowrap; }  /* default: single line */
.container { display: flex; flex-wrap: wrap; }     /* items wrap to new lines */
```

Con `wrap`, los elementos pasan a la siguiente linea cuando no pueden caber. Esto es esencial para layouts responsivos.

---

## La propiedad abreviada `flex`

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

---

## `gap`

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

---

## Patrones comunes

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

---

## Errores comunes

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

---

## Puntos clave

- `justify-content` controla el eje principal; `align-items` controla el eje cruzado. Cambiar `flex-direction` intercambia que direccion fisica controla cada uno.
- `flex: 1` significa "crecer para llenar el espacio disponible". `flex: 0 0 250px` significa "quedarse exactamente en 250px".
- Usa `gap` en lugar de margenes para espaciado entre flex items.
- Establece `min-width: 0` en flex items que contengan texto u otro contenido que pueda desbordar.
- Si necesitas elementos alineados tanto en filas COMO en columnas, usa Grid en lugar de Flexbox.
