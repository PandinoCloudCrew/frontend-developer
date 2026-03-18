# Tipografia y Jerarquia Visual

La tipografia es la interfaz principal de la web: aproximadamente el 90% del contenido web es texto. Un desarrollador que entiende los sistemas tipograficos producira interfaces mas legibles, mas profesionales y mas accesibles que uno que elige fuentes y tamanos al azar.

---

## Type Scale

Un type scale es un conjunto de tamanos de fuente predeterminados derivados de una proporción matematica. En lugar de adivinar tamanos, eliges un tamaño base y una proporción, luego multiplicas hacia arriba y divides hacia abajo.

**Proporciones comunes:**

| Ratio Name      | Value | Caracter                              |
|-----------------|-------|---------------------------------------|
| Minor Third     | 1.2   | Compacto, jerarquia sutil             |
| Major Third     | 1.25  | Equilibrado, proposito general        |
| Perfect Fourth  | 1.333 | Jerarquia fuerte, editorial           |
| Golden Ratio    | 1.618 | Dramatico, layouts orientados a display |

**Escala de ejemplo con proporción 1.25 (base 16px):**

| Step | Size   | Caso de uso           |
|------|--------|-----------------------|
| -1   | 12.8px | Subtitulos, letra pequena |
| 0    | 16px   | Texto body (base)     |
| 1    | 20px   | H4 / body grande      |
| 2    | 25px   | H3                    |
| 3    | 31.25px| H2                    |
| 4    | 39px   | H1                    |
| 5    | 48.8px | Display / hero        |

Limitante a 5-7 pasos en una escala. Si necesitas mas de 7 tamanos de fuente distintos, tu diseño tiene un problema de jerarquia, no un problema tipografico.

**Herramientas:** [utopia.fyi](https://utopia.fyi) genera type scales fluidos con `clamp()`. [type-scale.com](https://type-scale.com) te permite previsualizar proporciones visualmente.

```css
:root {
  --text-xs:   clamp(0.75rem, 0.7rem + 0.25vw, 0.8rem);
  --text-sm:   clamp(0.8rem, 0.75rem + 0.3vw, 0.875rem);
  --text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --text-lg:   clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
  --text-xl:   clamp(1.563rem, 1.3rem + 1.3vw, 2rem);
  --text-2xl:  clamp(1.953rem, 1.5rem + 2.25vw, 2.75rem);
  --text-3xl:  clamp(2.441rem, 1.8rem + 3.2vw, 3.5rem);
}
```

---

## Font Pairing

La regla es simple: combina una fuente display/heading con una fuente body. Dos fuentes cubren el 95% de los layouts web. Tres es el maximo practico -- cualquier cosa mas alla de tres crea ruido visual.

**Estrategias de combinacion:**

- **Serif headings + sans-serif body:** Sensacion editorial clasica. Ejemplo: Playfair Display + Source Sans Pro.
- **Sans-serif headings + sans-serif body:** Limpio y moderno. Ejemplo: Inter para ambos (usando weight para contraste).
- **Monospace headings + sans-serif body:** Tecnico u orientado a desarrolladores. Ejemplo: JetBrains Mono + Inter.

**System font stacks como base:** Antes de cargar fuentes personalizadas, considera si las fuentes del sistema son suficientes. Cuestan cero bytes y se renderizan instantaneamente.

```css
body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
}

code {
  font-family:
    ui-monospace, "Cascadia Code", "Source Code Pro",
    Menlo, Consolas, "DejaVu Sans Mono", monospace;
}
```

---

## Tamaño de Fuente: Usa `rem`

Establece los tamanos de fuente en `rem`, no en `px`. La unidad `rem` es relativa al tamaño de fuente del root (`<html>`), que por defecto es 16px en todos los navegadores. Cuando un usuario cambia el tamaño de fuente predeterminado de su navegador (una configuración de accesibilidad comun), los valores en `rem` escalan con el. Los valores en pixeles no.

```css
/* WRONG: breaks user zoom preferences */
body { font-size: 14px; }

/* RIGHT: respects user settings */
body { font-size: 1rem; }     /* = 16px at default settings */
h1   { font-size: 2.441rem; } /* = ~39px at default settings */
```

Nunca establezcas `font-size` en `<html>` con un valor en pixeles como `html { font-size: 10px; }` (a veces hecho para facilitar las matematicas de rem). Esto sobreescribe las preferencias del usuario y es una falla de accesibilidad.

---

## Line Height

`line-height` controla el espaciado entre lineas de texto. Es el ajuste tipografico individual mas impactante para la legibilidad.

- **Texto body:** `line-height: 1.5` (minimo de WCAG para legibilidad)
- **Headings:** `line-height: 1.1` a `1.3` (los headings necesitan menos porque son mas grandes y generalmente mas cortos)
- **Texto pequeno:** `line-height: 1.6` a `1.7` (el texto mas pequeno se beneficia de mas espaciado)

Siempre usa valores sin unidad. Un `line-height` sin unidad es un multiplicador del tamaño de fuente del propio elemento, lo que significa que escala correctamente cuando es heredado por elementos hijos. Un `line-height` establecido en `px` no lo hace.

```css
/* WRONG: px line-height doesn't scale with font size */
p  { font-size: 16px; line-height: 24px; }
h1 { font-size: 39px; line-height: 24px; } /* disastrous — lines overlap */

/* RIGHT: unitless multiplier scales with each element */
p  { font-size: 1rem;     line-height: 1.5; }  /* effective: 24px */
h1 { font-size: 2.441rem; line-height: 1.2; }  /* effective: ~47px */
```

---

## Letter Spacing

`letter-spacing` (tracking) ajusta el espacio entre todos los caracteres en un bloque de texto.

- **Headings:** Ajustar ligeramente: `letter-spacing: -0.02em` a `-0.03em`. El texto grande tiene un espaciado visual naturalmente amplio.
- **Texto body:** Dejar en el valor predeterminado (`letter-spacing: normal`). El texto body ya esta optimizado por el disenador tipografico.
- **Mayusculas / small caps:** Abrir: `letter-spacing: 0.05em` a `0.1em`. El texto todo en mayusculas se ve apretado sin tracking adicional.

```css
h1 { letter-spacing: -0.025em; }
.label-uppercase {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: var(--text-xs);
}
```

---

## Measure (Longitud de Linea)

Measure es el ancho de un bloque de texto, contado en caracteres por linea. La investigacion muestra consistentemente que 45-75 caracteres por linea es optimo para la comodidad de lectura. Lineas mas cortas que 45 caracteres causan saltos de linea excesivos; lineas mas largas que 75 caracteres dificultan que el ojo regrese al inicio de la siguiente linea.

La unidad `ch` en CSS es igual al ancho del caracter `0` en la fuente actual. Proporciona una manera confiable de limitar la longitud de linea.

```css
p, li, blockquote {
  max-width: 65ch;
}
```

Esta única regla hace mas por la legibilidad que casi cualquier otro CSS que puedas escribir.

---

## Font Weight para Jerarquia

`font-weight` es una herramienta principal para establecer jerarquia dentro de una sola tipografia. Una variable font bien elegida (como Inter o Source Sans) te da un rango continuo de 100 a 900.

| Weight | Nombre      | Uso                                      |
|--------|-------------|------------------------------------------|
| 300    | Light       | Usar con moderacion, solo en tamanos grandes |
| 400    | Regular     | Texto body                               |
| 500    | Medium      | Body enfatizado, etiquetas de UI         |
| 600    | Semibold    | Subheadings, elementos de UI importantes |
| 700    | Bold        | Headings, enfasis fuerte                 |
| 900    | Black       | Headlines hero, texto display            |

Evita usar weights por debajo de 300 para cualquier cosa menor de 24px -- las fuentes delgadas en tamanos pequenos son ilegibles.

---

## Tipografia Fluida con `clamp()`

`clamp()` permite que el tamaño de fuente escale suavemente entre un minimo y un maximo basado en el ancho del viewport, eliminando la necesidad de media queries basadas en breakpoints.

```css
/* Syntax: clamp(minimum, preferred, maximum) */

h1 {
  /* Minimum 1.5rem (24px), grows with viewport, caps at 3rem (48px) */
  font-size: clamp(1.5rem, 1rem + 2.5vw, 3rem);
}

p {
  /* Minimum 1rem (16px), slight growth, caps at 1.125rem (18px) */
  font-size: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
}
```

**Como calcular el valor preferido:** La formula es `clamp(min, v + r, max)` donde `v` y `r` se eligen para que el valor preferido sea igual a `min` en tu viewport mas pequeno y `max` en tu viewport mas grande. utopia.fyi genera estos valores por ti.

---

## Ritmo Vertical

Ritmo vertical significa mantener una cuadricula base consistente a lo largo de toda la página. El enfoque practico: elige una unidad de espaciado base derivada de tu body `line-height`, luego usa multiplos de ella para todo el espaciado vertical.

Con texto body a `1rem` y `line-height: 1.5`, la unidad base es `1.5rem` (24px). Todo el espaciado entre bloques de texto deberia ser un multiplo de esta unidad.

```css
:root {
  --rhythm: 1.5rem; /* base line-height * base font-size */
}

h1 { margin-top: calc(var(--rhythm) * 3); margin-bottom: var(--rhythm); }
h2 { margin-top: calc(var(--rhythm) * 2); margin-bottom: var(--rhythm); }
p  { margin-bottom: var(--rhythm); }
```

El ritmo vertical perfecto es difícil de mantener a lo largo de una página entera con contenido mixto. El objetivo es consistencia, no perfeccion -- apegate a la cuadricula donde sea posible y acepta desviaciones menores en los limites de los componentes.

---

## Tecnicas de Jerarquia Visual

Cuando necesitas hacer que un elemento destaque o se retire, usa estas propiedades en orden de efectividad:

1. **Tamaño** -- El diferenciador mas poderoso. Un heading de 39px es inconfundiblemente mas importante que un texto body de 16px.
2. **Weight** -- Bold vs regular crea separacion clara sin cambiar el tamaño.
3. **Color** -- Un color mas oscuro o de mayor saturacion atrae la mirada. Un gris mas claro se retira.
4. **Espaciado** -- Mas espacio alrededor de un elemento le da importancia (el efecto de "espacio para respirar").
5. **Capitalizacion** -- Etiquetas en mayusculas o small caps para información terciaria.

Usa la menor cantidad necesaria. Si el tamaño por si solo establece jerarquia, no necesitas ademas poner bold, colorear y capitalizar.

---

## Errores Comunes

- **Demasiadas familias tipograficas (>3):** Cada fuente adicional incrementa el peso de la página, crea inconsistencia visual y ralentiza el renderizado. Dos es ideal. Tres es el tope.
- **Demasiados tamanos de fuente (>7):** Si tu página usa 12 tamanos de fuente diferentes, no hay jerarquia discernible. Apegate a tu type scale.
- **Texto gris claro sobre fondos blancos:** Una eleccion estetica comun que no cumple los requisitos de contraste. `#999` sobre `#fff` tiene una proporción de 2.85:1, muy por debajo del minimo WCAG de 4.5:1. El gris mas claro usable sobre blanco es aproximadamente `#767676` (4.54:1).
- **Texto justificado en la web:** A diferencia de la impresion, la web no tiene separacion silabica por defecto. El texto justificado crea espacios desiguales entre palabras ("rios de espacio en blanco") que perjudican la legibilidad. Usa `text-align: left`.
- **Usar `px` para `font-size`:** Esto sobreescribe la configuración del navegador del usuario y es una falla de accesibilidad. Siempre usa `rem`.
- **Establecer `html { font-size: 62.5% }` o `html { font-size: 10px }`:** Estos resets de "conveniencia" rompen las preferencias de tamaño de fuente del usuario.

---

## Puntos Clave

- Construye un type scale a partir de una proporción (1.25 es un valor seguro por defecto) y limitante a 5-7 tamanos.
- Usa `rem` para tamanos de fuente, valores sin unidad para `line-height` y `em` para `letter-spacing`.
- Limita la longitud de linea a 45-75 caracteres con `max-width: 65ch`.
- Usa `clamp()` para tipografia fluida que se adapta sin breakpoints.
- La jerarquia viene del tamaño primero, weight segundo, color tercero -- usa la menor cantidad de propiedades necesarias.
