# Sistema de Espaciado

El espaciado inconsistente es la razon numero uno por la que las interfaces construidas por desarrolladores se ven "mal." Un sistema de espaciado elimina este problema restringiendo todo el espaciado a un conjunto predeterminado de valores, de la misma manera que un type scale restringe los tamanos de fuente. Tambien acelera el desarrollo: en lugar de debatir si un gap deberia ser 14px o 16px, eliges el valor mas cercano de tu escala y sigues adelante.

---

## La Cuadricula de 4px / 8px

La mayoria de los design systems derivan el espaciado de multiplos de 4px (0.25rem) u 8px (0.5rem). La base de 4px proporciona suficiente granularidad para control detallado; la base de 8px es mas simple pero ocasionalmente demasiado gruesa para componentes pequenos.

**Una escala practica (base de 4px):**

| Token       | Valor   | rem     | Caso de uso                           |
|-------------|---------|---------|---------------------------------------|
| `--space-0` | 0       | 0       | Sin espaciado                         |
| `--space-1` | 4px     | 0.25rem | Ajustado: gap de icono a etiqueta     |
| `--space-2` | 8px     | 0.5rem  | Compacto: gaps de elementos inline    |
| `--space-3` | 12px    | 0.75rem | Default: padding interno de form fields |
| `--space-4` | 16px    | 1rem    | Estandar: padding de cards, padding de inputs |
| `--space-5` | 20px    | 1.25rem | Comodo: entre grupos de formulario    |
| `--space-6` | 24px    | 1.5rem  | Espacioso: entre secciones de contenido |
| `--space-8` | 32px    | 2rem    | Espaciado de seccion                  |
| `--space-10`| 40px    | 2.5rem  | Separaciones de seccion grandes       |
| `--space-12`| 48px    | 3rem    | Divisores de seccion de pagina        |
| `--space-16`| 64px    | 4rem    | Landmarks principales                 |
| `--space-20`| 80px    | 5rem    | Secciones hero/feature                |
| `--space-24`| 96px    | 6rem    | Padding superior/inferior de pagina   |

```css
:root {
  --space-1:  0.25rem;
  --space-2:  0.5rem;
  --space-3:  0.75rem;
  --space-4:  1rem;
  --space-5:  1.25rem;
  --space-6:  1.5rem;
  --space-8:  2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
}
```

Nota que la escala no es lineal -- salta de `--space-6` a `--space-8`, omitiendo el 7. En valores mas grandes, la diferencia perceptual entre 28px y 32px es insignificante, asi que puedes omitir pasos intermedios. En valores mas pequenos (4, 8, 12, 16), cada paso importa.

---

## Named Tokens vs Numbered Tokens

Dos estrategias comunes de nomenclatura:

**Numbered** (estilo Tailwind): `--space-1` hasta `--space-24`. Directo, sin ambiguedad, extensible.

**Named** (semantico): `--space-xs`, `--space-sm`, `--space-md`, `--space-lg`, `--space-xl`, `--space-2xl`. Mas legible en codigo, pero mas dificil de extender (que viene despues de `--space-3xl`?).

Cualquiera funciona. Elige uno y hazlo cumplir. El peor resultado es un codigo que usa ambos sistemas de forma inconsistente.

---

## Padding vs Margin vs Gap

Estas tres propiedades sirven para propositos diferentes:

- **Padding:** Espaciado interno -- el espacio entre el borde de un componente y su contenido. Se usa dentro de botones, cards, inputs, celdas de tabla.
- **Margin:** Espaciado externo -- el espacio entre un componente y sus hermanos. Se usa para separar elementos.
- **Gap:** Espaciado de layout -- el espacio entre items en un contenedor Flex o Grid. El reemplazo moderno del espaciado basado en margin entre hermanos.

**Prefiere `gap` sobre `margin` para espaciado de layout:**

```css
/* MARGIN APPROACH: fragile, causes margin collapse, requires :last-child override */
.card-list .card {
  margin-bottom: 1rem;
}
.card-list .card:last-child {
  margin-bottom: 0;
}

/* GAP APPROACH: clean, no edge cases, no collapse */
.card-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
```

`gap` no agrega espacio antes del primer item ni despues del ultimo. No colapsa. Funciona en ambos ejes simultaneamente en Grid (`gap: 1rem 2rem`). No hay razon para usar margin para espaciado de items dentro de un contenedor Flex o Grid.

**Reserva margin para:**
- Espaciado entre secciones independientes que no estan en un contenedor de layout compartido.
- Ajustes de utilidad (`margin-top: auto` para empujar un footer al fondo de un contenedor flex).

---

## Espaciado Consistente de Componentes

Una vez que tienes una escala de espaciado, aplicala a nivel de componente:

```css
/* All cards use the same internal spacing */
.card {
  padding: var(--space-6);
}
.card__title {
  margin-bottom: var(--space-2);
}
.card__body {
  margin-bottom: var(--space-4);
}

/* All form fields use the same vertical spacing */
.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.form-field label {
  margin-bottom: var(--space-1);
}

/* All page sections use the same vertical rhythm */
.section {
  padding-block: var(--space-16);
}
.section + .section {
  border-top: 1px solid var(--border);
}
```

---

## Espaciado Responsivo con `clamp()`

El espaciado, al igual que la tipografia, puede escalar fluidamente con el viewport:

```css
:root {
  --space-section: clamp(2rem, 1rem + 5vw, 6rem);
  --space-card-padding: clamp(1rem, 0.5rem + 2vw, 2rem);
}

.section {
  padding-block: var(--space-section);
}

.card {
  padding: var(--space-card-padding);
}
```

Esto es particularmente efectivo para espaciado a nivel de seccion, donde los layouts de escritorio necesitan espacio en blanco generoso pero los layouts moviles necesitan conservar espacio vertical.

Para espaciado a nivel de componente (gaps de form fields, padding de botones), valores fijos de tokens con overrides ocasionales de media queries suelen ser mas simples que `clamp()`.

---

## Espacio en Blanco como Elemento de Diseno

El espacio en blanco no es espacio vacio -- es un elemento estructural que comunica jerarquia y calidad.

- **Mas espacio en blanco** entre elementos senala separacion e importancia. Le da al contenido espacio para respirar y crea una sensacion premium, editorial.
- **Menos espacio en blanco** senala agrupacion y densidad. Es apropiado para interfaces con muchos datos (dashboards, tablas, paneles de administracion) donde el espacio de pantalla es limitado.

El principio de proximidad de Gestalt gobierna esto: los elementos que estan cerca se perciben como relacionados. Si la etiqueta de tu formulario tiene el mismo espaciado arriba y abajo, la etiqueta parece flotar entre dos campos en lugar de estar adjunta a uno. Dale a la etiqueta menos espacio abajo (hacia su campo) y mas espacio arriba (lejos del campo anterior).

```css
.form-field + .form-field {
  margin-top: var(--space-6); /* space between groups */
}

.form-field label {
  margin-bottom: var(--space-1); /* tight to its input */
}
```

---

## Errores Comunes

- **Valores de espaciado arbitrarios:** Si tu CSS contiene `margin: 23px`, `padding: 17px`, `gap: 11px`, no tienes un sistema de espaciado. Cada valor de espaciado deberia venir de tu escala.
- **Mezclar margin y gap en el mismo eje:** Si un contenedor Flex usa `gap: 1rem` y sus hijos tambien tienen `margin-bottom: 0.5rem`, el espaciado se duplica. Usa un mecanismo por eje.
- **Margin collapse:** Los margins verticales en elementos de bloque adyacentes colapsan en un unico margin (el mayor de los dos). Este es un comportamiento de la especificacion CSS, no un bug, pero toma por sorpresa a los desarrolladores. `gap` no colapsa. Padding no colapsa. Los hijos de Flexbox y Grid no tienen margin collapse.
- **Sin escala de espaciado:** Cuando cada componente inventa sus propios valores de espaciado, el resultado es una interfaz que se ve inconsistente incluso si cada componente se ve bien en aislamiento.
- **Padding "por si acaso":** Agregar padding a cada elemento por costumbre crea espaciado innecesario que se acumula y empuja el contenido lejos de donde deberia estar. Solo agrega espaciado cuando hay una razon visual para ello.

---

## Puntos Clave

- Construye una escala de espaciado a partir de multiplos de 4px (`0.25rem`) y restringe todo el espaciado a valores de la escala.
- Usa `gap` para espaciado entre items en contenedores Flex/Grid. Reserva `margin` para espaciado entre secciones independientes.
- Usa `clamp()` para espaciado a nivel de seccion que escala con el viewport.
- Aplica el principio de proximidad: las etiquetas deben estar mas cerca de sus campos asociados que del campo anterior.
- El espacio en blanco comunica jerarquia. Mas espacio = mas separacion = mas importancia.
