# CSS Box Model y Display

Cada elemento en una página web es una caja rectangular. El box model determina que tan grande es cada caja, cuanto espacio ocupa y como interactua con las cajas vecinas. Malinterpretar el box model es la fuente mas comun de errores tipo "¿por que esto es 20px mas ancho de lo que esperaba?".

---

## `content-box` vs `border-box`

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

---

## El reset universal

Todo proyecto moderno comienza con esto:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

Esto aplica `border-box` a cada elemento, incluyendo pseudo-elementos. Sin esto, lucharas constantemente contra dimensiones inesperadas. Agregalo al inicio de tu CSS y nunca vuelvas a pensar en `content-box`.

---

## Margin Collapse (Colapso de margenes)

El margin collapse es un comportamiento de CSS donde los margenes verticales adyacentes se combinan en un solo margen en lugar de apilarse. Es el comportamiento de CSS mas malinterpretado.

**Cuando sucede:**

Hermanos adyacentes — el margen inferior de un elemento y el margen superior del siguiente colapsan en el que sea mayor:

```css
.box-a { margin-bottom: 20px; }
.box-b { margin-top: 30px; }
/* Gap between them: 30px, not 50px */
```

Padre-hijo — si un padre no tiene padding, borde ni configuración de `overflow`, el margen superior del hijo "escapa" y se convierte en el margen superior del padre:

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

La solución para el caso padre-hijo: agrega `padding: 1px` (o cualquier valor) al padre, usa `overflow: auto`, o convierte al padre en un contenedor flex/grid.

---

## Modos de display

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

---

## Propiedades de ancho y alto (Width y Height)

```css
.container {
  width: 100%;          /* fill parent's content area */
  max-width: 1200px;    /* but never wider than 1200px */
  min-width: 320px;     /* and never narrower than 320px */

  min-height: 100vh;    /* at least full viewport height */
  /* Do NOT set a fixed height on content that can grow */
}
```

- **`width`** / **`height`**: establecen un tamaño explícito
- **`max-width`** / **`max-height`**: establecen un limite superior (anula `width` / `height`)
- **`min-width`** / **`min-height`**: establecen un limite inferior (anula `max-width` / `max-height`)

El orden de prioridad es: `min-*` gana sobre `max-*`, que gana sobre `width`/`height`.

---

## Stacking Context (Contexto de apilamiento) y `z-index`

`z-index` controla que elementos aparecen encima de otros — pero solo funciona dentro de un **stacking context**.

**¿Cuando funciona `z-index`?**

`z-index` no tiene efecto en elementos con posición static. Solo funciona en elementos con `position` establecido en `relative`, `absolute`, `fixed` o `sticky`. También funciona en hijos de flex/grid.

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

El 9999 del tooltip es irrelevante — no puede escapar del stacking context de su padre. La solución: reestructura para que el tooltip no este anidado dentro de un stacking context inferior, o usa `isolation: isolate` deliberadamente.

---

## Errores comunes

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

---

## Puntos clave

- Siempre usa `box-sizing: border-box` globalmente. Hace que `width` signifique lo que crees que significa.
- El margin collapse solo sucede verticalmente, solo entre elementos block, y nunca dentro de contenedores flex/grid.
- `display: none` elimina del flujo; `visibility: hidden` oculta pero mantiene el espacio.
- `z-index` solo funciona en elementos posicionados y solo compite dentro del mismo stacking context.
- Usa `min-height` en lugar de `height` para contenedores de contenido. El contenido crece; las alturas fijas desbordan.
