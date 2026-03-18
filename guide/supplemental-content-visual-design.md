# Fundamentos de Diseño Visual para Desarrolladores Frontend

Este suplemento cubre el conocimiento de diseño visual que todo desarrollador frontend necesita pero rara vez aprende formalmente. Estos no son opiniones estéticas — son principios medibles, basados en evidencia, que afectan directamente la usabilidad, la accesibilidad y la calidad percibida.

---

## 1. Tipografía y Jerarquía Visual

### Por Qué Esto Importa

Aproximadamente el 90% del contenido web es texto. La tipografía no es decoración — es la interfaz principal. Un desarrollador que entiende los sistemas tipográficos producirá interfaces más legibles, más profesionales y más accesibles que uno que elige fuentes y tamaños al azar. La mala tipografía también es la forma más rápida de hacer que una UI funcional se sienta amateur.

### Type Scale

Un type scale es un conjunto de tamaños de fuente predeterminados derivados de una proporción matemática. En lugar de adivinar tamaños, eliges un tamaño base y una proporción, luego multiplicas hacia arriba y divides hacia abajo.

**Proporciones comunes:**

| Ratio Name      | Value | Carácter                              |
|-----------------|-------|---------------------------------------|
| Minor Third     | 1.2   | Compacto, jerarquía sutil             |
| Major Third     | 1.25  | Equilibrado, propósito general        |
| Perfect Fourth  | 1.333 | Jerarquía fuerte, editorial           |
| Golden Ratio    | 1.618 | Dramático, layouts orientados a display |

**Escala de ejemplo con proporción 1.25 (base 16px):**

| Step | Size   | Caso de uso           |
|------|--------|-----------------------|
| -1   | 12.8px | Subtítulos, letra pequeña |
| 0    | 16px   | Texto body (base)     |
| 1    | 20px   | H4 / body grande      |
| 2    | 25px   | H3                    |
| 3    | 31.25px| H2                    |
| 4    | 39px   | H1                    |
| 5    | 48.8px | Display / hero        |

Limítate a 5-7 pasos en una escala. Si necesitas más de 7 tamaños de fuente distintos, tu diseño tiene un problema de jerarquía, no un problema tipográfico.

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

### Font Pairing

La regla es simple: combina una fuente display/heading con una fuente body. Dos fuentes cubren el 95% de los layouts web. Tres es el máximo práctico — cualquier cosa más allá de tres crea ruido visual.

**Estrategias de combinación:**

- **Serif headings + sans-serif body:** Sensación editorial clásica. Ejemplo: Playfair Display + Source Sans Pro.
- **Sans-serif headings + sans-serif body:** Limpio y moderno. Ejemplo: Inter para ambos (usando weight para contraste).
- **Monospace headings + sans-serif body:** Técnico u orientado a desarrolladores. Ejemplo: JetBrains Mono + Inter.

**System font stacks como base:** Antes de cargar fuentes personalizadas, considera si las fuentes del sistema son suficientes. Cuestan cero bytes y se renderizan instantáneamente.

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

### Tamaño de Fuente: Usa `rem`

Establece los tamaños de fuente en `rem`, no en `px`. La unidad `rem` es relativa al tamaño de fuente del root (`<html>`), que por defecto es 16px en todos los navegadores. Cuando un usuario cambia el tamaño de fuente predeterminado de su navegador (una configuración de accesibilidad común), los valores en `rem` escalan con él. Los valores en píxeles no.

```css
/* WRONG: breaks user zoom preferences */
body { font-size: 14px; }

/* RIGHT: respects user settings */
body { font-size: 1rem; }     /* = 16px at default settings */
h1   { font-size: 2.441rem; } /* = ~39px at default settings */
```

Nunca establezcas `font-size` en `<html>` con un valor en píxeles como `html { font-size: 10px; }` (a veces hecho para facilitar las matemáticas de rem). Esto sobreescribe las preferencias del usuario y es una falla de accesibilidad.

### Line Height

`line-height` controla el espaciado entre líneas de texto. Es el ajuste tipográfico individual más impactante para la legibilidad.

- **Texto body:** `line-height: 1.5` (mínimo de WCAG para legibilidad)
- **Headings:** `line-height: 1.1` a `1.3` (los headings necesitan menos porque son más grandes y generalmente más cortos)
- **Texto pequeño:** `line-height: 1.6` a `1.7` (el texto más pequeño se beneficia de más espaciado)

Siempre usa valores sin unidad. Un `line-height` sin unidad es un multiplicador del tamaño de fuente del propio elemento, lo que significa que escala correctamente cuando es heredado por elementos hijos. Un `line-height` establecido en `px` no lo hace.

```css
/* WRONG: px line-height doesn't scale with font size */
p  { font-size: 16px; line-height: 24px; }
h1 { font-size: 39px; line-height: 24px; } /* disastrous — lines overlap */

/* RIGHT: unitless multiplier scales with each element */
p  { font-size: 1rem;     line-height: 1.5; }  /* effective: 24px */
h1 { font-size: 2.441rem; line-height: 1.2; }  /* effective: ~47px */
```

### Letter Spacing

`letter-spacing` (tracking) ajusta el espacio entre todos los caracteres en un bloque de texto.

- **Headings:** Ajustar ligeramente: `letter-spacing: -0.02em` a `-0.03em`. El texto grande tiene un espaciado visual naturalmente amplio.
- **Texto body:** Dejar en el valor predeterminado (`letter-spacing: normal`). El texto body ya está optimizado por el diseñador tipográfico.
- **Mayúsculas / small caps:** Abrir: `letter-spacing: 0.05em` a `0.1em`. El texto todo en mayúsculas se ve apretado sin tracking adicional.

```css
h1 { letter-spacing: -0.025em; }
.label-uppercase {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: var(--text-xs);
}
```

### Measure (Longitud de Línea)

Measure es el ancho de un bloque de texto, contado en caracteres por línea. La investigación muestra consistentemente que 45-75 caracteres por línea es óptimo para la comodidad de lectura. Líneas más cortas que 45 caracteres causan saltos de línea excesivos; líneas más largas que 75 caracteres dificultan que el ojo regrese al inicio de la siguiente línea.

La unidad `ch` en CSS es igual al ancho del carácter `0` en la fuente actual. Proporciona una manera confiable de limitar la longitud de línea.

```css
p, li, blockquote {
  max-width: 65ch;
}
```

Esta única regla hace más por la legibilidad que casi cualquier otro CSS que puedas escribir.

### Font Weight para Jerarquía

`font-weight` es una herramienta principal para establecer jerarquía dentro de una sola tipografía. Una variable font bien elegida (como Inter o Source Sans) te da un rango continuo de 100 a 900.

| Weight | Nombre      | Uso                                      |
|--------|-------------|------------------------------------------|
| 300    | Light       | Usar con moderación, solo en tamaños grandes |
| 400    | Regular     | Texto body                               |
| 500    | Medium      | Body enfatizado, etiquetas de UI         |
| 600    | Semibold    | Subheadings, elementos de UI importantes |
| 700    | Bold        | Headings, énfasis fuerte                 |
| 900    | Black       | Headlines hero, texto display            |

Evita usar weights por debajo de 300 para cualquier cosa menor de 24px — las fuentes delgadas en tamaños pequeños son ilegibles.

### Tipografía Fluida con `clamp()`

`clamp()` permite que el tamaño de fuente escale suavemente entre un mínimo y un máximo basado en el ancho del viewport, eliminando la necesidad de media queries basadas en breakpoints.

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

**Cómo calcular el valor preferido:** La fórmula es `clamp(min, v + r, max)` donde `v` y `r` se eligen para que el valor preferido sea igual a `min` en tu viewport más pequeño y `max` en tu viewport más grande. utopia.fyi genera estos valores por ti.

### Ritmo Vertical

Ritmo vertical significa mantener una cuadrícula base consistente a lo largo de toda la página. El enfoque práctico: elige una unidad de espaciado base derivada de tu body `line-height`, luego usa múltiplos de ella para todo el espaciado vertical.

Con texto body a `1rem` y `line-height: 1.5`, la unidad base es `1.5rem` (24px). Todo el espaciado entre bloques de texto debería ser un múltiplo de esta unidad.

```css
:root {
  --rhythm: 1.5rem; /* base line-height * base font-size */
}

h1 { margin-top: calc(var(--rhythm) * 3); margin-bottom: var(--rhythm); }
h2 { margin-top: calc(var(--rhythm) * 2); margin-bottom: var(--rhythm); }
p  { margin-bottom: var(--rhythm); }
```

El ritmo vertical perfecto es difícil de mantener a lo largo de una página entera con contenido mixto. El objetivo es consistencia, no perfección — apégate a la cuadrícula donde sea posible y acepta desviaciones menores en los límites de los componentes.

### Técnicas de Jerarquía Visual

Cuando necesitas hacer que un elemento destaque o se retire, usa estas propiedades en orden de efectividad:

1. **Tamaño** — El diferenciador más poderoso. Un heading de 39px es inconfundiblemente más importante que un texto body de 16px.
2. **Weight** — Bold vs regular crea separación clara sin cambiar el tamaño.
3. **Color** — Un color más oscuro o de mayor saturación atrae la mirada. Un gris más claro se retira.
4. **Espaciado** — Más espacio alrededor de un elemento le da importancia (el efecto de "espacio para respirar").
5. **Capitalización** — Etiquetas en mayúsculas o small caps para información terciaria.

Usa la menor cantidad necesaria. Si el tamaño por sí solo establece jerarquía, no necesitas además poner bold, colorear y capitalizar.

### Errores Comunes

- **Demasiadas familias tipográficas (>3):** Cada fuente adicional incrementa el peso de la página, crea inconsistencia visual y ralentiza el renderizado. Dos es ideal. Tres es el tope.
- **Demasiados tamaños de fuente (>7):** Si tu página usa 12 tamaños de fuente diferentes, no hay jerarquía discernible. Apégate a tu type scale.
- **Texto gris claro sobre fondos blancos:** Una elección estética común que no cumple los requisitos de contraste. `#999` sobre `#fff` tiene una proporción de 2.85:1, muy por debajo del mínimo WCAG de 4.5:1. El gris más claro usable sobre blanco es aproximadamente `#767676` (4.54:1).
- **Texto justificado en la web:** A diferencia de la impresión, la web no tiene separación silábica por defecto. El texto justificado crea espacios desiguales entre palabras ("ríos de espacio en blanco") que perjudican la legibilidad. Usa `text-align: left`.
- **Usar `px` para `font-size`:** Esto sobreescribe la configuración del navegador del usuario y es una falla de accesibilidad. Siempre usa `rem`.
- **Establecer `html { font-size: 62.5% }` o `html { font-size: 10px }`:** Estos resets de "conveniencia" rompen las preferencias de tamaño de fuente del usuario.

### Puntos Clave

- Construye un type scale a partir de una proporción (1.25 es un valor seguro por defecto) y limítate a 5-7 tamaños.
- Usa `rem` para tamaños de fuente, valores sin unidad para `line-height` y `em` para `letter-spacing`.
- Limita la longitud de línea a 45-75 caracteres con `max-width: 65ch`.
- Usa `clamp()` para tipografía fluida que se adapta sin breakpoints.
- La jerarquía viene del tamaño primero, weight segundo, color tercero — usa la menor cantidad de propiedades necesarias.

---

## 2. Teoría del Color para UI

### Por Qué Esto Importa

El color es la señal visual más rápida en una interfaz de usuario. Los usuarios procesan el color antes de leer texto o analizar el layout. Un sistema de color bien estructurado hace que una interfaz se sienta cohesiva y profesional. Uno mal estructurado — valores hex ad hoc dispersos por el código — crea caos visual y hace que el dark mode, los temas y la accesibilidad sean casi imposibles.

### Modelos de Color para la Web

| Modelo | Ejemplo de Sintaxis               | Mejor Para                              |
|--------|---------------------------------|---------------------------------------|
| Hex    | `#3b82f6`                       | Legacy, notación compacta             |
| RGB    | `rgb(59, 130, 246)`             | Manipulación programática             |
| HSL    | `hsl(217, 91%, 60%)`           | Hue/saturation/lightness legible por humanos |
| Oklch  | `oklch(62% 0.2 255)`           | Perceptualmente uniforme, estándar moderno |

**Por qué HSL y Oklch superan a Hex para trabajo de UI:**

En Hex (`#3b82f6`), no hay forma de mirar el valor y razonar sobre él. ¿Es claro u oscuro? ¿Saturado o apagado? No puedes saberlo sin un selector de color.

En HSL (`hsl(217, 91%, 60%)`), cada canal tiene significado: 217 es el hue (azul), 91% es la saturación (vívido), 60% es la luminosidad (media). Puedes hacer un color más claro aumentando el tercer valor, o desaturarlo bajando el segundo.

Oklch va más allá. La luminosidad de HSL no es perceptualmente uniforme — un amarillo HSL al 50% de luminosidad se ve mucho más brillante que un azul HSL al 50% de luminosidad. Oklch corrige esto: `oklch(60% 0.15 255)` y `oklch(60% 0.15 90)` (azul y amarillo) aparecen igualmente brillantes al ojo humano. Esto hace de Oklch la mejor opción para generar escalas de color.

```css
/* HSL: easy to reason about */
--primary: hsl(217, 91%, 60%);
--primary-light: hsl(217, 91%, 80%);
--primary-dark: hsl(217, 91%, 35%);

/* Oklch: perceptually uniform lightness */
--primary: oklch(62% 0.2 255);
--primary-light: oklch(85% 0.1 255);
--primary-dark: oklch(40% 0.18 255);
```

### Construyendo una Paleta de Color

Una paleta de color de producción para UI tiene tres capas: **brand**, **neutral** y **semantic**.

#### Capa 1: Brand Colors (Primary + Secondary)

Empieza con tu color de marca principal. Genera una escala de 10 tonos ajustando la luminosidad en Oklch (o HSL), manteniendo el hue y la chroma aproximadamente constantes.

```css
:root {
  --primary-50:  oklch(97% 0.02 255);   /* Tinted background */
  --primary-100: oklch(93% 0.04 255);   /* Hover background */
  --primary-200: oklch(87% 0.08 255);   /* Light accent */
  --primary-300: oklch(78% 0.12 255);   /* Border */
  --primary-400: oklch(68% 0.16 255);   /* Icon, secondary */
  --primary-500: oklch(62% 0.20 255);   /* Primary — buttons, links */
  --primary-600: oklch(52% 0.18 255);   /* Hover state on primary */
  --primary-700: oklch(43% 0.16 255);   /* Active/pressed */
  --primary-800: oklch(35% 0.12 255);   /* Dark accents */
  --primary-900: oklch(27% 0.10 255);   /* Headings on light bg */
  --primary-950: oklch(20% 0.06 255);   /* Near-black brand tint */
}
```

Nota que la chroma (saturación) disminuye en valores de luminosidad extremos. Colores muy claros o muy oscuros con chroma alta se ven antinaturales y no se renderizan bien en sRGB.

#### Capa 2: Escala Neutral

Toda interfaz necesita una escala de grises para texto, bordes, fondos y divisores. Construye 10 tonos desde casi blanco hasta casi negro. Opcionalmente agrega un ligero tinte de hue (p.ej., un gris cálido o gris frío) para darle personalidad.

```css
:root {
  --gray-50:  oklch(98% 0.005 250);  /* Page background */
  --gray-100: oklch(95% 0.005 250);  /* Card background */
  --gray-200: oklch(90% 0.005 250);  /* Borders, dividers */
  --gray-300: oklch(82% 0.005 250);  /* Disabled text */
  --gray-400: oklch(70% 0.005 250);  /* Placeholder text */
  --gray-500: oklch(55% 0.005 250);  /* Secondary text */
  --gray-600: oklch(45% 0.005 250);  /* Body text */
  --gray-700: oklch(35% 0.005 250);  /* Headings */
  --gray-800: oklch(25% 0.005 250);  /* High-emphasis text */
  --gray-900: oklch(18% 0.005 250);  /* Near-black text */
  --gray-950: oklch(12% 0.005 250);  /* Maximum contrast */
}
```

#### Capa 3: Semantic Colors

Los semantic colors comunican significado: success, warning, error, info. Cada uno necesita tres tonos — un fondo claro, un borde medio y un primer plano oscuro — para poder usarlos en banners de alerta, badges y estados de formulario.

```css
:root {
  /* Success (green) */
  --success-bg:     oklch(95% 0.05 145);
  --success-border: oklch(65% 0.15 145);
  --success-text:   oklch(35% 0.10 145);

  /* Warning (amber) */
  --warning-bg:     oklch(95% 0.06 85);
  --warning-border: oklch(72% 0.15 85);
  --warning-text:   oklch(38% 0.08 85);

  /* Error (red) */
  --error-bg:       oklch(95% 0.04 25);
  --error-border:   oklch(60% 0.18 25);
  --error-text:     oklch(40% 0.12 25);

  /* Info (blue) */
  --info-bg:        oklch(95% 0.03 250);
  --info-border:    oklch(62% 0.15 250);
  --info-text:      oklch(38% 0.10 250);
}
```

### Dark Mode

Dark mode no es inversión de color. Invertir un tema claro produce colores chillones y de alta saturación sobre fondos oscuros que son dolorosos de leer. Un tema oscuro adecuado requiere ajustes deliberados:

1. **Fondo:** Usa grises oscuros (`oklch(15-20% ...)`) no negro puro (`#000`). El negro puro crea un contraste excesivo con el texto blanco, causando fatiga visual.
2. **Texto:** Usa blanco crema (`oklch(90-95% ...)`) no blanco puro (`#fff`) para texto body. Reserva el blanco puro para elementos de alto énfasis.
3. **Saturación:** Reduce la chroma/saturación en fondos oscuros. Los colores vívidos sobre superficies oscuras parecen vibrar.
4. **Elevación:** En modo claro, la profundidad se muestra con sombras. En dark mode, la profundidad se muestra haciendo las superficies más altas más claras — una card se sitúa en `oklch(22% ...)` sobre una página en `oklch(15% ...)`.

Implementa temas con CSS custom properties:

```css
:root {
  color-scheme: light dark;

  /* Light theme (default) */
  --bg-page:    oklch(98% 0.005 250);
  --bg-surface: oklch(100% 0 0);
  --text-primary: oklch(18% 0.005 250);
  --text-secondary: oklch(45% 0.005 250);
  --border: oklch(90% 0.005 250);
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-page:    oklch(15% 0.005 250);
    --bg-surface: oklch(22% 0.005 250);
    --text-primary: oklch(93% 0.005 250);
    --text-secondary: oklch(65% 0.005 250);
    --border: oklch(30% 0.005 250);
  }
}
```

Agrega la meta tag para que la UI predeterminada del navegador (scrollbars, controles de formulario) también se adapte:

```html
<meta name="color-scheme" content="light dark">
```

### Relaciones de Contraste (WCAG)

WCAG 2.1 define relaciones mínimas de contraste entre el texto y su fondo:

| Nivel | Texto Normal (<18px) | Texto Grande (18px+ bold, o 24px+) |
|-------|--------------------|------------------------------------|
| AA    | 4.5:1              | 3:1                                |
| AAA   | 7:1                | 4.5:1                              |

Los elementos no textuales (iconos, bordes, focus rings) requieren 3:1 contra colores adyacentes.

**Referencia rápida para texto gris sobre blanco (`#fff`):**

| Valor de Gris | Relación de Contraste | ¿WCAG AA? |
|--------------|----------------------|-----------|
| `#999`       | 2.85:1               | Falla     |
| `#888`       | 3.54:1               | Falla     |
| `#767676`    | 4.54:1               | Pasa      |
| `#595959`    | 7.0:1                | Pasa AAA  |

Usa el [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) o las DevTools del navegador (Lighthouse, inspector de accesibilidad) para verificar.

### `color-mix()` para Colores Dinámicos

`color-mix()` es una función CSS nativa que mezcla dos colores en un espacio de color especificado. Reemplaza la necesidad de funciones `lighten()`/`darken()` de preprocesadores.

```css
:root {
  --primary: oklch(62% 0.2 255);

  /* Tint: mix primary with white */
  --primary-tint: color-mix(in oklch, var(--primary) 20%, white);

  /* Shade: mix primary with black */
  --primary-shade: color-mix(in oklch, var(--primary) 80%, black);

  /* Hover: slightly darker */
  --primary-hover: color-mix(in oklch, var(--primary) 85%, black);

  /* Subtle background */
  --primary-subtle: color-mix(in oklch, var(--primary) 10%, white);
}

.button:hover {
  background: var(--primary-hover);
}

.badge {
  background: var(--primary-subtle);
  color: var(--primary-shade);
}
```

Siempre mezcla en `oklch` para resultados perceptualmente uniformes. Mezclar en `srgb` puede producir colores intermedios turbios.

### Opacity vs Manipulación de Color

No uses `opacity` para crear variantes de texto más claras. Opacity hace el elemento semi-transparente, lo que significa que el resultado depende de lo que esté detrás — un fondo blanco, una imagen, una card.

```css
/* WRONG: text color depends on background */
.secondary-text {
  color: #000;
  opacity: 0.5;
}

/* RIGHT: explicit color value, consistent appearance */
.secondary-text {
  color: var(--text-secondary); /* oklch(45% 0.005 250) */
}
```

La excepción son los fondos de overlay (modales, toasts) donde la semi-transparencia es el comportamiento deseado.

### Errores Comunes

- **Demasiados hues (>5):** Una UI con 8 hues diferentes se siente caótica. La mayoría de las interfaces de producción usan 1-2 hues de marca + 4 hues semánticos (success, warning, error, info) + un gris neutral.
- **Color como único indicador de estado:** Un borde rojo en un campo inválido es invisible para usuarios daltónicos (8% de los hombres). Siempre acompaña el color con una segunda señal: icono, texto, patrón o cambio de posición. Esto es WCAG 1.4.1 (Use of Color).
- **Texto de bajo contraste por estética:** Texto placeholder gris claro o etiquetas sutiles pueden verse elegantes pero fallan en accesibilidad y frustran a los usuarios en ambientes brillantes (luz solar, exterior).
- **Semantic colors inconsistentes:** Si rojo significa "error" en tus formularios pero "oferta" en tus cards de producto, los usuarios deben decodificar el significado del contexto cada vez. Asigna significados fijos a los colores y no te desvíes.
- **Valores de color hardcodeados:** Un valor hex pegado directamente en un componente (`color: #3b82f6`) no puede ser tematizado, no puede participar en dark mode y divergirá del design system con el tiempo. Siempre referencia design tokens (CSS custom properties).

### Puntos Clave

- Usa Oklch (o HSL como fallback) para colores de UI — nunca razones sobre color en Hex.
- Construye tres capas de paleta: brand (10 tonos), neutral (10 tonos), semantic (3 tonos cada uno para success, warning, error, info).
- Dark mode requiere reducir la saturación, usar grises oscuros (no negro puro) y expresar la elevación a través de la luminosidad de la superficie.
- Cumple los mínimos de contraste WCAG AA: 4.5:1 para texto normal, 3:1 para texto grande y elementos no textuales.
- Almacena todos los colores como CSS custom properties, nunca como valores hardcodeados en componentes.

---

## 3. Sistemas de Espaciado

### Por Qué Esto Importa

El espaciado inconsistente es la razón número uno por la que las interfaces construidas por desarrolladores se ven "mal." Cuando cada componente usa valores arbitrarios de píxeles — 23px aquí, 17px allá, 12px en una card y 15px en otra — el resultado es un layout que se siente descuidado incluso si ningún valor individual es obviamente incorrecto. Un sistema de espaciado elimina este problema restringiendo todo el espaciado a un conjunto predeterminado de valores, de la misma manera que un type scale restringe los tamaños de fuente.

Un sistema de espaciado también acelera el desarrollo. En lugar de debatir si un gap debería ser 14px o 16px, eliges el valor más cercano de tu escala y sigues adelante.

### La Cuadrícula de 4px / 8px

La mayoría de los design systems derivan el espaciado de múltiplos de 4px (0.25rem) u 8px (0.5rem). La base de 4px proporciona suficiente granularidad para control detallado; la base de 8px es más simple pero ocasionalmente demasiado gruesa para componentes pequeños.

**Una escala práctica (base de 4px):**

| Token       | Valor   | rem     | Caso de uso                           |
|-------------|---------|---------|---------------------------------------|
| `--space-0` | 0       | 0       | Sin espaciado                         |
| `--space-1` | 4px     | 0.25rem | Ajustado: gap de icono a etiqueta     |
| `--space-2` | 8px     | 0.5rem  | Compacto: gaps de elementos inline    |
| `--space-3` | 12px    | 0.75rem | Default: padding interno de form fields |
| `--space-4` | 16px    | 1rem    | Estándar: padding de cards, padding de inputs |
| `--space-5` | 20px    | 1.25rem | Cómodo: entre grupos de formulario    |
| `--space-6` | 24px    | 1.5rem  | Espacioso: entre secciones de contenido |
| `--space-8` | 32px    | 2rem    | Espaciado de sección                  |
| `--space-10`| 40px    | 2.5rem  | Separaciones de sección grandes       |
| `--space-12`| 48px    | 3rem    | Divisores de sección de página        |
| `--space-16`| 64px    | 4rem    | Landmarks principales                 |
| `--space-20`| 80px    | 5rem    | Secciones hero/feature                |
| `--space-24`| 96px    | 6rem    | Padding superior/inferior de página   |

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

Nota que la escala no es lineal — salta de `--space-6` a `--space-8`, omitiendo el 7. En valores más grandes, la diferencia perceptual entre 28px y 32px es insignificante, así que puedes omitir pasos intermedios. En valores más pequeños (4, 8, 12, 16), cada paso importa.

### Named Tokens vs Numbered Tokens

Dos estrategias comunes de nomenclatura:

**Numbered** (estilo Tailwind): `--space-1` hasta `--space-24`. Directo, sin ambigüedad, extensible.

**Named** (semántico): `--space-xs`, `--space-sm`, `--space-md`, `--space-lg`, `--space-xl`, `--space-2xl`. Más legible en código, pero más difícil de extender (¿qué viene después de `--space-3xl`?).

Cualquiera funciona. Elige uno y hazlo cumplir. El peor resultado es un código que usa ambos sistemas de forma inconsistente.

### Padding vs Margin vs Gap

Estas tres propiedades sirven para propósitos diferentes:

- **Padding:** Espaciado interno — el espacio entre el borde de un componente y su contenido. Se usa dentro de botones, cards, inputs, celdas de tabla.
- **Margin:** Espaciado externo — el espacio entre un componente y sus hermanos. Se usa para separar elementos.
- **Gap:** Espaciado de layout — el espacio entre items en un contenedor Flex o Grid. El reemplazo moderno del espaciado basado en margin entre hermanos.

**Prefiere `gap` sobre `margin` para espaciado de layout.** He aquí por qué:

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

`gap` no agrega espacio antes del primer item ni después del último. No colapsa. Funciona en ambos ejes simultáneamente en Grid (`gap: 1rem 2rem`). No hay razón para usar margin para espaciado de items dentro de un contenedor Flex o Grid.

**Reserva margin para:**
- Espaciado entre secciones independientes que no están en un contenedor de layout compartido.
- Ajustes de utilidad (`margin-top: auto` para empujar un footer al fondo de un contenedor flex).

### Espaciado Consistente de Componentes

Una vez que tienes una escala de espaciado, aplícala a nivel de componente:

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

### Espaciado Responsivo con `clamp()`

El espaciado, al igual que la tipografía, puede escalar fluidamente con el viewport:

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

Esto es particularmente efectivo para espaciado a nivel de sección, donde los layouts de escritorio necesitan espacio en blanco generoso pero los layouts móviles necesitan conservar espacio vertical.

Para espaciado a nivel de componente (gaps de form fields, padding de botones), valores fijos de tokens con overrides ocasionales de media queries suelen ser más simples que `clamp()`.

### Espacio en Blanco como Elemento de Diseño

El espacio en blanco no es espacio vacío — es un elemento estructural que comunica jerarquía y calidad.

- **Más espacio en blanco** entre elementos señala separación e importancia. Le da al contenido espacio para respirar y crea una sensación premium, editorial.
- **Menos espacio en blanco** señala agrupación y densidad. Es apropiado para interfaces con muchos datos (dashboards, tablas, paneles de administración) donde el espacio de pantalla es limitado.

El principio de proximidad de Gestalt gobierna esto: los elementos que están cerca se perciben como relacionados. Si la etiqueta de tu formulario tiene el mismo espaciado arriba y abajo, la etiqueta parece flotar entre dos campos en lugar de estar adjunta a uno. Dale a la etiqueta menos espacio abajo (hacia su campo) y más espacio arriba (lejos del campo anterior).

```css
.form-field + .form-field {
  margin-top: var(--space-6); /* space between groups */
}

.form-field label {
  margin-bottom: var(--space-1); /* tight to its input */
}
```

### Errores Comunes

- **Valores de espaciado arbitrarios:** Si tu CSS contiene `margin: 23px`, `padding: 17px`, `gap: 11px`, no tienes un sistema de espaciado. Cada valor de espaciado debería venir de tu escala.
- **Mezclar margin y gap en el mismo eje:** Si un contenedor Flex usa `gap: 1rem` y sus hijos también tienen `margin-bottom: 0.5rem`, el espaciado se duplica. Usa un mecanismo por eje.
- **Margin collapse:** Los margins verticales en elementos de bloque adyacentes colapsan en un único margin (el mayor de los dos). Este es un comportamiento de la especificación CSS, no un bug, pero toma por sorpresa a los desarrolladores. `gap` no colapsa. Padding no colapsa. Los hijos de Flexbox y Grid no tienen margin collapse.
- **Sin escala de espaciado:** Cuando cada componente inventa sus propios valores de espaciado, el resultado es una interfaz que se ve inconsistente incluso si cada componente se ve bien en aislamiento.
- **Padding "por si acaso":** Agregar padding a cada elemento por costumbre crea espaciado innecesario que se acumula y empuja el contenido lejos de donde debería estar. Solo agrega espaciado cuando hay una razón visual para ello.

### Puntos Clave

- Construye una escala de espaciado a partir de múltiplos de 4px (`0.25rem`) y restringe todo el espaciado a valores de la escala.
- Usa `gap` para espaciado entre items en contenedores Flex/Grid. Reserva `margin` para espaciado entre secciones independientes.
- Usa `clamp()` para espaciado a nivel de sección que escala con el viewport.
- Aplica el principio de proximidad: las etiquetas deben estar más cerca de sus campos asociados que del campo anterior.
- El espacio en blanco comunica jerarquía. Más espacio = más separación = más importancia.

---

## 4. Patrones de Diseño de Formularios

### Por Qué Esto Importa

Los formularios son donde los usuarios intercambian datos con tu aplicación. Cada registro, checkout, búsqueda y cambio de configuración fluye a través de un formulario. Un formulario bien diseñado reduce el abandono, reduce los tickets de soporte y reduce los errores. Un formulario mal diseñado es la razón individual más común por la que los usuarios abandonan un producto.

El diseño de formularios también es donde los principios de usabilidad chocan con los detalles de implementación — el momento de la validación, la visualización de errores, el comportamiento de autofill y la semántica de accesibilidad requieren decisiones técnicas específicas.

### Ubicación de Etiquetas

**Encima del input (valor predeterminado recomendado):** Las etiquetas colocadas directamente encima de su input son las más rápidas de escanear porque el ojo se mueve en una sola línea vertical. Este patrón funciona en todos los anchos de viewport y es el estándar en prácticamente todos los design systems modernos.

```html
<div class="form-field">
  <label for="email">Email address</label>
  <input type="email" id="email" name="email" autocomplete="email">
</div>
```

```css
.form-field {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
```

**Floating labels:** La etiqueta comienza como texto placeholder dentro del input y se anima a una posición más pequeña encima del campo al hacer focus. Visualmente elegante pero problemático: la etiqueta se vuelve diminuta, el campo parece vacío cuando está lleno (rompiendo la capacidad de escaneo), y es más difícil de implementar de forma accesible. Evítalo a menos que tu design system lo requiera explícitamente.

**Etiquetas alineadas a la izquierda:** La etiqueta se sitúa a la izquierda del input. Esto funciona en layouts amplios (formularios de admin, páginas de configuración) pero desperdicia espacio vertical, crea columnas desalineadas si las longitudes de las etiquetas varían, y se rompe en viewports estrechos. Úsalo con moderación.

### Dimensionamiento de Inputs

Ajusta el ancho del input al contenido esperado. Esto le da a los usuarios una pista visual sobre cuántos datos se esperan y evita que el formulario se sienta como un muro de rectángulos del mismo tamaño.

```css
.input-full  { width: 100%; }          /* email, address, name */
.input-lg    { max-width: 24rem; }      /* URL, long text */
.input-md    { max-width: 16rem; }      /* phone, city */
.input-sm    { max-width: 8rem; }       /* zip/postal code, CVV */
.input-xs    { max-width: 5rem; }       /* quantity, age */
```

Un campo de código postal que abarca todo el ancho del formulario comunica silenciosamente la expectativa equivocada.

### Campos Requeridos vs Opcionales

Marca la minoría. Si 8 de 10 campos son requeridos, marcar los 8 con asteriscos crea ruido visual. En su lugar, marca los 2 campos opcionales con "(optional)."

Si la mayoría de los campos son opcionales (p.ej., una página de perfil), marca los requeridos con "(required)" o el asterisco tradicional.

```html
<!-- Most fields required: mark the optional ones -->
<label for="phone">Phone number <span class="optional">(optional)</span></label>

<!-- Most fields optional: mark the required ones -->
<label for="name">Full name <span class="required" aria-hidden="true">*</span></label>
```

Siempre incluye una nota explicando la convención del asterisco si la usas: "Fields marked with * are required."

### Texto Placeholder

El texto placeholder desaparece cuando el usuario empieza a escribir. Esto lo hace inútil como etiqueta — el usuario no puede consultarlo después de ingresar datos. También tiene bajo contraste en la mayoría de los navegadores (no cumple WCAG), no tiene significado semántico para lectores de pantalla y puede confundirse con un valor pre-llenado.

**Usa placeholders solo para pistas de formato:**

```html
<!-- WRONG: placeholder as label -->
<input type="text" placeholder="Email address">

<!-- RIGHT: label + format hint placeholder -->
<label for="dob">Date of birth</label>
<input type="text" id="dob" placeholder="MM/DD/YYYY">

<!-- ALSO RIGHT: hint text below the field instead of placeholder -->
<label for="dob">Date of birth</label>
<input type="text" id="dob" aria-describedby="dob-hint">
<span id="dob-hint" class="hint">Format: MM/DD/YYYY</span>
```

### Momento de la Validación

Elegir cuándo mostrar errores de validación es una de las decisiones de UX de formularios más impactantes.

**On blur (valor predeterminado recomendado):** Valida cuando el usuario abandona el campo (el evento `blur`). El usuario ha terminado de ingresar datos, así que el feedback es oportuno pero no interruptivo. Ven el error antes de avanzar demasiado en el formulario.

**On change después del primer blur:** Un refinamiento del enfoque on blur. Después de que el usuario ha visitado y abandonado un campo una vez (disparando la primera validación), cambia a validar en cada pulsación de tecla (evento `input`) para que vean el error desaparecer en tiempo real mientras lo corrigen. Este es el estándar de oro para la experiencia de usuario.

```javascript
// Pseudocode for "validate on blur, then on input after first blur"
field.addEventListener('blur', () => {
  validate(field);
  field.dataset.touched = 'true';
});

field.addEventListener('input', () => {
  if (field.dataset.touched === 'true') {
    validate(field);
  }
});
```

**On submit solamente:** El usuario llena todo el formulario, presiona enviar y luego ve todos los errores de golpe. Esta es la peor experiencia para formularios largos — el usuario tiene que desplazarse hacia atrás, encontrar los errores y corregirlos sin contexto claro. Aceptable solo para formularios muy cortos (1-3 campos).

### Patrones de Mensajes de Error

Los buenos mensajes de error le dicen al usuario **qué salió mal** y **cómo arreglarlo**.

```
Bad:  "Invalid input"
Good: "Email address must include an @ symbol"

Bad:  "Password error"
Good: "Password must be at least 8 characters"

Bad:  "Invalid date"
Good: "Enter a date in MM/DD/YYYY format"
```

**Posiciona los errores debajo del campo**, no encima ni en un tooltip. Los errores debajo del campo son visibles en el flujo natural de lectura y permanecen visibles mientras el usuario corrige el input.

**Usa color + icono, nunca solo color:**

```html
<div class="form-field form-field--error">
  <label for="email">Email address</label>
  <input type="email" id="email" aria-invalid="true" aria-describedby="email-error">
  <div id="email-error" class="error-message" role="alert">
    <svg aria-hidden="true" class="error-icon"><!-- warning icon --></svg>
    Email address must include an @ symbol
  </div>
</div>
```

```css
.form-field--error input {
  border-color: var(--error-border);
  box-shadow: 0 0 0 1px var(--error-border);
}
.error-message {
  color: var(--error-text);
  font-size: var(--text-sm);
  display: flex;
  align-items: center;
  gap: var(--space-1);
  margin-top: var(--space-1);
}
```

El atributo `aria-invalid="true"` le indica a los lectores de pantalla que el campo tiene un error. El `aria-describedby` vincula el mensaje de error al campo. El `role="alert"` anuncia el error cuando aparece.

### Errores Inline vs Resumen de Errores

- **Errores inline:** Para problemas de validación específicos de un campo (campo requerido faltante, formato incorrecto, valor fuera de rango). Colócalos directamente debajo del campo relevante.
- **Resumen de errores:** Para problemas a nivel de formulario (errores del servidor, validación entre campos como "la fecha de fin debe ser posterior a la fecha de inicio"). Colócalo en la parte superior del formulario, con enlaces ancla a cada campo problemático.

```html
<div class="error-summary" role="alert">
  <h3>There were 2 problems with your submission</h3>
  <ul>
    <li><a href="#email">Email address is already in use</a></li>
    <li><a href="#password-confirm">Passwords do not match</a></li>
  </ul>
</div>
```

Al mostrar un resumen de errores devuelto por el servidor, haz auto-scroll hacia él y establece el foco en el contenedor del resumen para que los usuarios de lectores de pantalla se den cuenta inmediatamente.

### Formularios de Múltiples Pasos

Los formularios largos (>7 campos) se benefician de dividirse en pasos lógicos.

**Requisitos:**
- **Indicador de progreso:** Muestra al usuario dónde se encuentra (p.ej., "Step 2 of 4") con una barra visual de pasos.
- **Validación por paso:** Valida el paso actual antes de permitir al usuario avanzar. No esperes hasta el envío final.
- **Navegación hacia atrás:** Siempre permite al usuario volver a pasos anteriores. Nunca bloquees pasos completados.
- **Preservación de estado:** Si el usuario vuelve atrás y regresa, los datos ingresados anteriormente deben seguir ahí. Usa controlled form state, no valores del DOM.

```html
<nav class="stepper" aria-label="Form progress">
  <ol>
    <li class="stepper__step stepper__step--completed" aria-current="false">
      <span>1. Account</span>
    </li>
    <li class="stepper__step stepper__step--active" aria-current="step">
      <span>2. Profile</span>
    </li>
    <li class="stepper__step" aria-current="false">
      <span>3. Preferences</span>
    </li>
    <li class="stepper__step" aria-current="false">
      <span>4. Review</span>
    </li>
  </ol>
</nav>
```

### Estados del Botón de Envío

Un botón de envío debe comunicar su estado claramente a través de cuatro fases:

| Estado   | Apariencia                         | Comportamiento                       |
|----------|----------------------------------|---------------------------------|
| Default  | Color primario, etiqueta completa | Clickeable                      |
| Loading  | Icono spinner + "Submitting..."   | Deshabilitado, no clickeable    |
| Success  | Verde + checkmark + "Done!"       | Deshabilitado brevemente, luego redirect |
| Error    | Animación de sacudida breve + mensaje | Re-habilitado para reintentar  |

```css
.button--loading {
  pointer-events: none;
  opacity: 0.7;
}

.button--success {
  background: var(--success-border);
  pointer-events: none;
}

.button--error {
  animation: shake 0.4s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-4px); }
  40%, 80% { transform: translateX(4px); }
}
```

Deshabilita el botón de envío durante el envío para prevenir doble submit. Pero nunca deshabilites el botón antes de que el usuario haya interactuado — un botón permanentemente deshabilitado sin explicación es un callejón sin salida.

### Autofill y Autocomplete

El atributo HTML `autocomplete` le indica al navegador qué tipo de dato espera un campo. Cuando se configura correctamente, los usuarios pueden llenar formularios enteros con un solo clic.

```html
<input type="text"   name="name"    autocomplete="name">
<input type="email"  name="email"   autocomplete="email">
<input type="tel"    name="phone"   autocomplete="tel">
<input type="text"   name="address" autocomplete="address-line1">
<input type="text"   name="city"    autocomplete="address-level2">
<input type="text"   name="state"   autocomplete="address-level1">
<input type="text"   name="zip"     autocomplete="postal-code">
<input type="text"   name="country" autocomplete="country-name">
<input type="text"   name="cc-num"  autocomplete="cc-number">
```

Valores de `autocomplete` faltantes o incorrectos son una de las causas más comunes de abandono de checkout en móvil.

### Agrupación de Campos Relacionados

Usa `<fieldset>` y `<legend>` para agrupar semánticamente campos relacionados. Los lectores de pantalla anuncian el legend cuando el usuario ingresa al grupo, proporcionando contexto.

```html
<fieldset>
  <legend>Shipping address</legend>
  <div class="form-field">
    <label for="address">Street address</label>
    <input type="text" id="address" autocomplete="shipping address-line1">
  </div>
  <div class="form-row">
    <div class="form-field">
      <label for="city">City</label>
      <input type="text" id="city" autocomplete="shipping address-level2">
    </div>
    <div class="form-field">
      <label for="zip">ZIP code</label>
      <input type="text" id="zip" autocomplete="shipping postal-code" class="input-sm">
    </div>
  </div>
</fieldset>
```

Para agrupación visual sin significado semántico, usa espaciado y encabezados opcionales:

```css
.form-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.form-section + .form-section {
  margin-top: var(--space-8);
  padding-top: var(--space-8);
  border-top: 1px solid var(--border);
}
```

### Errores Comunes

- **Submit deshabilitado sin explicación:** Un botón de envío en gris sin indicación de qué necesita arreglar el usuario es un callejón sin salida. Si debes deshabilitarlo, acompáñalo con un tooltip o pista inline listando los requisitos no cumplidos.
- **Limpiar el formulario ante error de validación:** Si el usuario comete un error y tu formulario reinicia todos los campos, se irá y nunca volverá. Siempre preserva el input válido ante un error.
- **Formularios modales para entrada de datos complejos:** Los modales tienen espacio limitado, no se pueden redimensionar y no se pueden desplazar cómodamente en móvil. Usa una página completa o sección expandible para formularios con más de 4-5 campos.
- **Placeholder como etiqueta:** Ya cubierto arriba — desaparece, tiene pobre contraste y no es accesible.
- **Requerir campos innecesarios:** Cada campo requerido adicional incrementa el abandono. Cuestiona agresivamente si realmente necesitas segundo nombre, número de teléfono, nombre de empresa, etc. en este paso.
- **Auto-avance entre inputs:** Mover automáticamente el foco al siguiente campo después de cierta cantidad de caracteres (p.ej., segmentos de número telefónico) rompe la expectativa del usuario, interfiere con pegar y confunde a los lectores de pantalla. Deja que el usuario controle la navegación.
- **Layouts horizontales de formulario en móvil:** Campos lado a lado en pantallas más estrechas que 400px crean inputs diminutos e inutilizables. Apílalos verticalmente en móvil.

### Puntos Clave

- Coloca las etiquetas encima de los inputs (lo más rápido de escanear, funciona en todos los anchos de viewport).
- Valida on blur, luego en cada pulsación de tecla después del primer blur — el mejor equilibrio entre oportunidad y no intrusión.
- Los mensajes de error van debajo del campo, indican qué está mal y cómo arreglarlo, y usan icono + color (nunca solo color).
- Establece atributos `autocomplete` correctos en cada campo de formulario — esto es de bajo esfuerzo y alto impacto.
- Nunca deshabilites el botón de envío sin decirle al usuario por qué, y nunca limpies input válido ante un error.

---

## 5. Ejemplos de Violación de Heurísticas

### Por Qué Esto Importa

Las 10 heurísticas de usabilidad de Nielsen son principios. Los principios se vuelven accionables cuando ves violaciones concretas y sus correcciones. Esta sección describe 10 ejemplos realistas de antes/después — uno por heurística — para construir reconocimiento de patrones. Cuando encuentres estos patrones en tu propio trabajo, sabrás qué está mal y cómo arreglarlo.

---

### H1: Visibilidad del Estado del Sistema

**La heurística:** El sistema siempre debe mantener informados a los usuarios sobre lo que está sucediendo, a través de retroalimentación apropiada dentro de un tiempo razonable.

**Violación (Antes):** Un formulario de carga de archivos tiene un botón "Upload." Cuando el usuario hace clic, nada visible sucede durante 10-30 segundos mientras el archivo se carga. El botón no cambia, no hay spinner, no hay barra de progreso ni indicación de que algo esté sucediendo. El usuario hace clic en el botón de nuevo (causando una carga duplicada) o navega fuera asumiendo que está roto.

**Por qué falla:** El usuario no tiene retroalimentación de que el sistema recibió su acción. Sin estado visible, cualquier retraso mayor a ~1 segundo se siente como un fallo. Los usuarios pierden confianza y toman acciones correctivas (re-clic, refrescar) que empeoran las cosas.

**Corrección (Después):** Cuando el usuario hace clic en "Upload," el botón cambia inmediatamente a un estado de loading: la etiqueta cambia a "Uploading...", aparece un spinner y el botón se deshabilita. Una barra de progreso aparece debajo del botón mostrando el porcentaje completado (p.ej., "Uploading: 64% — 2.1 MB of 3.3 MB"). Al completarse, la barra de progreso se llena, un checkmark verde reemplaza al spinner y la etiqueta cambia a "Upload complete" por 2 segundos antes de reiniciarse.

**Nota de implementación:** Usa `XMLHttpRequest` o `fetch` con eventos de progreso (`xhr.upload.onprogress`) para rastrear el porcentaje de carga. Muestra la barra de progreso como un elemento `<progress>` o un `div` con `role="progressbar"`, `aria-valuenow`, `aria-valuemin` y `aria-valuemax`. Deshabilita el botón durante la carga para prevenir doble submit.

---

### H2: Correspondencia entre el Sistema y el Mundo Real

**La heurística:** El sistema debe hablar el idioma de los usuarios, con palabras, frases y conceptos familiares para el usuario, en lugar de términos orientados al sistema.

**Violación (Antes):** Una app de delivery de comida muestra el mensaje de error: "Error 422: Entity validation failed — addressLine1 must not be null." El formulario de checkout rechaza el input del usuario con jerga técnica. Las etiquetas de los campos usan nombres de columnas de base de datos: "addr_line_1," "addr_line_2," "postal_cd."

**Por qué falla:** Los usuarios no saben qué significa "422", qué es "entity validation" o a qué se refiere "null." Los nombres de columnas de base de datos son ilegibles. El mensaje de error no le dice nada al usuario sobre qué hacer. El sistema está hablando su propio idioma interno en lugar del idioma del usuario.

**Corrección (Después):** El mensaje de error dice: "Please enter your street address." Las etiquetas de los campos se reescriben en lenguaje natural: "Street address," "Apartment or suite (optional)," "ZIP code." Los mensajes de error hacen referencia al concepto humano, no al campo de base de datos: "We need your street address to deliver your order."

**Nota de implementación:** Mapea los códigos de error del backend a mensajes orientados al usuario en una capa de traducción. Nunca expongas errores crudos de API a la UI. Crea un diccionario de mapeo de nombres de campos (`addr_line_1` -> "Street address") y úsalo tanto en etiquetas como en mensajes de error.

---

### H3: Control y Libertad del Usuario

**La heurística:** Los usuarios frecuentemente eligen funciones del sistema por error. Necesitan una "salida de emergencia" claramente marcada para dejar el estado no deseado sin tener que pasar por un diálogo extendido.

**Violación (Antes):** Una app de gestión de proyectos tiene una opción "Delete Project" en el menú contextual sin diálogo de confirmación. Al hacer clic se elimina inmediata y permanentemente el proyecto y todas sus tareas, archivos y comentarios. No hay undo, no hay papelera y no hay camino de recuperación. El usuario que accidentalmente hizo clic derecho y presionó "Delete" ha perdido meses de trabajo.

**Por qué falla:** Las acciones destructivas sin confirmación o undo violan el control del usuario. Un clic accidental se convierte en una pérdida de datos catastrófica e irreversible. El usuario no tiene salida del estado no deseado.

**Corrección (Después):** Al hacer clic en "Delete Project" se abre un diálogo de confirmación que indica las consecuencias: "This will delete 'Q1 Marketing Plan' and all 47 tasks, 12 files, and 230 comments. This action cannot be undone." El diálogo requiere que el usuario escriba el nombre del proyecto para confirmar. Alternativamente (y preferiblemente), el proyecto se mueve a una carpeta Trash donde permanece por 30 días antes de la eliminación permanente. Aparece una notificación toast: "Project moved to Trash" con un botón "Undo" que lo restaura inmediatamente.

**Nota de implementación:** Implementa soft-delete (una columna `deleted_at` de timestamp) en lugar de hard-delete. Muestra un diálogo de confirmación para acciones destructivas con una descripción clara de lo que se perderá. Para soft-deletes, muestra un toast con una acción de undo que limpia el campo `deleted_at` dentro de una ventana corta.

---

### H4: Consistencia y Estándares

**La heurística:** Los usuarios no deberían tener que preguntarse si diferentes palabras, situaciones o acciones significan lo mismo. Sigue las convenciones de la plataforma.

**Violación (Antes):** Un sitio de e-commerce usa tres patrones diferentes para la misma acción en diferentes páginas. En la página de producto, el botón de acción principal es azul y dice "Add to Cart." En la página de listado de productos, la misma acción es un botón verde que dice "Buy." En el modal de vista rápida, es un botón con borde que dice "Add to Bag." El icono del carrito en el header está etiquetado como "Bag," pero el encabezado de la página de checkout dice "Your Cart." Los términos "cart," "bag" y "buy" se usan intercambiablemente.

**Por qué falla:** Los usuarios deben re-aprender la interfaz en cada página. La terminología inconsistente los obliga a preguntarse si "Add to Bag" y "Add to Cart" hacen lo mismo, o si "Bag" y "Cart" son funcionalidades diferentes. Los estilos inconsistentes de botones hacen que la acción principal sea difícil de identificar.

**Corrección (Después):** Cada instancia de la acción usa la misma etiqueta: "Add to Cart." El estilo del botón es el mismo en cada página: relleno sólido, color primario de marca, mismo border radius y clase de tamaño. La etiqueta del icono del header, el encabezado de la página y el flujo de checkout usan la palabra "Cart" consistentemente. Una librería de componentes compartida asegura que el componente `<AddToCartButton>` se renderice idénticamente en todas partes donde aparece.

**Nota de implementación:** Crea un componente compartido para la acción de agregar al carrito y úsalo en todas partes. Audita el código para inconsistencias terminológicas ("cart" vs "bag" vs "basket") y estandariza en un término. Define variantes de botón en tu design system (primary, secondary, outline) y asigna acciones específicas a variantes específicas.

---

### H5: Prevención de Errores

**La heurística:** Mejor aún que buenos mensajes de error es un diseño cuidadoso que previene que el problema ocurra en primer lugar.

**Violación (Antes):** Un formulario de reserva de vuelos tiene dos campos de fecha — "Departure" y "Return" — implementados como inputs de texto libre que aceptan cualquier string. El usuario puede escribir "February 30" (no existe), ingresar una fecha de regreso anterior a la de salida, o reservar una fecha de salida en el pasado. El formulario solo valida al enviar, mostrando errores después de que el usuario ha llenado todo el formulario.

**Por qué falla:** Los inputs de texto libre para fechas permiten docenas de estados inválidos. El usuario puede cometer errores que un input bien diseñado haría imposibles. Validar solo al enviar significa que el usuario descubre problemas tarde, después de invertir tiempo en el resto del formulario.

**Corrección (Después):** Reemplaza los inputs de texto libre con un componente date picker. El date picker deshabilita las fechas pasadas en el calendario de salida. Cuando se selecciona una fecha de salida, el date picker de regreso automáticamente establece su mínimo a la fecha de salida, haciendo imposible seleccionar una fecha de regreso anterior. Las fechas inválidas (February 30) no se pueden seleccionar porque el calendario solo muestra fechas reales. Un date range picker que muestra ambos meses lado a lado reduce aún más los errores al hacer la duración visualmente obvia.

**Nota de implementación:** Usa `<input type="date">` con atributos `min` y `max` como base, o un componente de librería de date picker. Establece `min` en el campo de salida a la fecha de hoy (`new Date().toISOString().split('T')[0]`). Cuando la fecha de salida cambie, actualiza el atributo `min` en el campo de regreso dinámicamente. Deshabilita (pone en gris) las fechas inválidas en el picker en lugar de permitir la selección y luego mostrar un error.

---

### H6: Reconocimiento en Lugar de Recuerdo

**La heurística:** Minimiza la carga de memoria del usuario haciendo que objetos, acciones y opciones sean visibles. El usuario no debería tener que recordar información de una parte del diálogo a otra.

**Violación (Antes):** Un dashboard de analíticas de datos requiere que los usuarios escriban nombres exactos de métricas en un input de texto para agregar un gráfico. El usuario debe recordar (o buscar) que la métrica se llama "monthly_active_users_v2" y no "MAU" o "active users" o "monthly_users." No hay lista de métricas disponibles, no hay autocomplete y no hay búsqueda. Si el usuario se equivoca en el nombre, el sistema dice "Metric not found" sin sugerir alternativas.

**Por qué falla:** El usuario se ve obligado a recordar un string exacto de memoria en lugar de reconocerlo de una lista. El sistema no proporciona affordances para descubrimiento — el usuario debe ya saber la respuesta antes de poder hacer la pregunta.

**Corrección (Después):** Reemplaza el input de texto con un dropdown con búsqueda (combobox) que lista todas las métricas disponibles. El dropdown soporta búsqueda difusa — escribir "active" muestra "Monthly Active Users," "Daily Active Users" y "Active Subscriptions." Cada métrica muestra una breve descripción y su categoría. Las métricas usadas recientemente aparecen en la parte superior de la lista. El usuario selecciona de la lista visible en lugar de recordar de memoria.

**Nota de implementación:** Implementa un componente de autocomplete/combobox (usando `role="combobox"`, `aria-expanded`, `aria-activedescendant` para accesibilidad). Llénalo desde un endpoint de API que retorne todas las métricas disponibles. Implementa búsqueda difusa del lado del cliente (librerías como Fuse.js) o búsqueda del lado del servidor. Rastrea las métricas usadas recientemente en local storage y muéstralas en una sección "Recent" en la parte superior del dropdown.

---

### H7: Flexibilidad y Eficiencia de Uso

**La heurística:** Los aceleradores — invisibles para el usuario novato — pueden frecuentemente acelerar la interacción para el usuario experto de modo que el sistema pueda atender tanto a usuarios sin experiencia como experimentados.

**Violación (Antes):** Un sistema de tickets de soporte al cliente requiere 6 clics para realizar la acción más común: cerrar un ticket resuelto. El agente debe hacer clic en el ticket, clic en "Edit status," esperar un modal, seleccionar "Resolved" de un dropdown, escribir una nota de cierre y hacer clic en "Save." No hay atajos de teclado, no hay acciones masivas y no hay manera de crear macros o templates para respuestas frecuentes. Los agentes expertos que manejan más de 50 tickets por hora se ven obligados al mismo flujo de 6 clics que un aprendiz del primer día.

**Por qué falla:** El sistema trata a todos los usuarios idénticamente, sin aceleradores para expertos. Los flujos de trabajo de alta frecuencia son lentos y tediosos, llevando a fatiga y errores. La interfaz optimiza para el aprendizaje inicial a expensas de la eficiencia a largo plazo.

**Corrección (Después):** Agrega un botón "Quick Resolve" directamente en el ticket que combina el cambio de estado y la nota de cierre en un solo paso. Agrega atajos de teclado: `R` para resolver, `E` para escalar, `N` para agregar una nota. Agrega acciones masivas: selecciona múltiples tickets y resuélvelos todos a la vez. Agrega respuestas guardadas (macros) que pre-llenan la nota de cierre con texto de template. Muestra una hoja de referencia de atajos de teclado accesible vía `?`. El flujo básico de 6 clics sigue funcionando para nuevos usuarios — los atajos son invisibles hasta que se descubren.

**Nota de implementación:** Implementa atajos de teclado usando un event listener global que verifica `event.key` y solo se dispara cuando ningún input/textarea tiene foco. Almacena macros/templates en la base de datos por agente. Agrega una barra de herramientas de acciones masivas que aparece cuando se seleccionan múltiples tickets vía checkboxes. Muestra pistas de teclado junto a los botones de acción (p.ej., "Resolve `R`") para facilitar el descubrimiento sin saturar la interfaz.

---

### H8: Diseño Estético y Minimalista

**La heurística:** Los diálogos no deben contener información irrelevante o raramente necesaria. Cada unidad extra de información en un diálogo compite con las unidades relevantes de información y disminuye su visibilidad relativa.

**Violación (Antes):** La pantalla principal de una app de clima muestra: temperatura actual, temperatura "sensación térmica," velocidad del viento, dirección del viento, ráfagas de viento, presión barométrica, humedad, punto de rocío, índice UV, distancia de visibilidad, altura del techo de nubes, índice de calidad del aire, conteo de polen, hora de amanecer, hora de atardecer, fase lunar, pronóstico de 5 días, pronóstico de 14 días, pronóstico por hora, un mapa de radar, una vista satelital, 3 artículos de noticias del clima y un anuncio — todo en el viewport inicial sin jerarquía ni revelación progresiva. Cada dato tiene el mismo tamaño y peso.

**Por qué falla:** Cuando todo se presenta por igual, nada es prominente. El usuario que quiere saber "¿necesito una chaqueta?" debe escanear más de 20 datos para encontrar la respuesta. La sobrecarga de información incrementa la carga cognitiva y ralentiza la toma de decisiones. Los datos raramente necesarios (fase lunar, altura del techo de nubes) compiten con los datos esenciales (temperatura, precipitación).

**Corrección (Después):** La pantalla principal muestra tres cosas: temperatura actual, máxima/mínima de hoy y un resumen de precipitación ("Rain expected at 3 PM"). Una fila secundaria muestra sensación térmica, viento y humedad. Todo lo demás es accesible vía una expansión "Details" o una pestaña "More." El pronóstico de 5 días es visible debajo del fold. El pronóstico de 14 días, radar y vista satelital son pestañas separadas. La jerarquía visual usa tamaño y peso para hacer de la temperatura actual el punto focal (grande, bold) con info secundaria en tipografía más pequeña y ligera.

**Nota de implementación:** Audita los datos mostrados en la vista principal. Clasifica cada elemento por frecuencia de uso (¿con qué frecuencia los usuarios realmente revisan la fase lunar?). Mueve cualquier cosa usada por menos del 20% de los usuarios detrás de revelación progresiva (una sección expandible, una pestaña o una vista de detalle). Usa la jerarquía tipográfica establecida en tu type scale: el número principal (temperatura) en `--text-3xl`, info secundaria en `--text-sm`.

---

### H9: Ayudar a los Usuarios a Reconocer, Diagnosticar y Recuperarse de Errores

**La heurística:** Los mensajes de error deben expresarse en lenguaje llano (sin códigos), indicar con precisión el problema y sugerir constructivamente una solución.

**Violación (Antes):** Una aplicación SaaS muestra una página de error de pantalla completa con el texto: "500 Internal Server Error." Debajo: "Reference ID: a]f8e2c1-9d3b-4a7f-b6e5-1234567890ab." No hay explicación de lo que pasó, no hay sugerencia de lo que el usuario puede hacer y no hay manera de navegar de vuelta a la aplicación. El botón de retroceso no funciona porque el error reemplazó la entrada actual del historial.

**Por qué falla:** "500 Internal Server Error" es un código de estado del servidor, no un mensaje humano. El ID de referencia no tiene significado para el usuario. No hay guía sobre si reintentar, esperar o contactar soporte. La página de error es un callejón sin salida sin navegación.

**Corrección (Después):** La página de error muestra: "Something went wrong on our end. We have been notified and are looking into it." Debajo: "What you can do: Try refreshing the page. If the problem continues, contact support@example.com and mention reference ID #a8f2c1." La página retiene la navegación del header del sitio para que el usuario pueda navegar a otro lugar. Un enlace "Go back to dashboard" se muestra de forma prominente. El error se registra del lado del servidor con contexto completo para depuración.

**Nota de implementación:** Crea un componente de error boundary personalizado (en React: `componentDidCatch` o `ErrorBoundary`). Renderiza una página de error amigable que incluya la navegación del sitio, un mensaje legible por humanos, los siguientes pasos accionables y un enlace de vuelta a una página conocida como funcional (p.ej., dashboard). Registra los detalles del error (stack trace, request ID, user ID) en tu servicio de rastreo de errores (Sentry, Datadog) — no los muestres al usuario. Preserva el historial del navegador para que el botón de retroceso funcione.

---

### H10: Ayuda y Documentación

**La heurística:** Aunque es mejor si el sistema puede usarse sin documentación, puede ser necesario proporcionar ayuda y documentación. Dicha información debe ser fácil de buscar, enfocada en la tarea del usuario, listar pasos concretos y no ser demasiado extensa.

**Violación (Antes):** Una herramienta de visualización de datos tiene un panel de configuración de gráficos complejo con más de 30 opciones (etiquetas de ejes, escalas, mapeo de colores, agregaciones, filtros). No hay tooltips, no hay ayuda inline ni enlaces a documentación. El elemento de menú "Help" abre un sitio web separado con un manual de 200 páginas organizado por funcionalidad, no por tarea. Un usuario que quiere saber "cómo cambio el eje Y a escala logarítmica" debe salir de la aplicación, buscar en el manual, encontrar la sección relevante (si existe) y mapear la terminología de la documentación a la UI que está mirando.

**Por qué falla:** La ayuda no es contextual — está desconectada de la tarea actual del usuario y su ubicación en la interfaz. Un manual de 200 páginas no es buscable ni escaneable para respuestas rápidas. El usuario debe abandonar su flujo de trabajo para encontrar ayuda, perdiendo contexto y fluidez.

**Corrección (Después):** Cada opción de configuración en el panel de gráficos tiene un pequeño icono de info (`(i)`) que, al pasar el ratón o hacer clic, muestra un tooltip con una explicación de 1-2 oraciones y un enlace "Learn more" a la sección específica de documentación. Un botón "?" en el encabezado del panel abre un sidebar de ayuda contextual que muestra contenido de ayuda relevante al panel actual (no el manual completo). El sidebar tiene una barra de búsqueda enfocada en temas de configuración de gráficos. Cada artículo de ayuda está orientado a tareas: "How to set a logarithmic scale" con 3-4 pasos numerados y una captura de pantalla.

**Nota de implementación:** Agrega `title` o componentes de tooltip personalizados a cada opción de configuración. Construye un sistema de ayuda contextual que mapee la vista actual de la UI (identificada por una ruta o ID de panel) a artículos de ayuda relevantes. Almacena el contenido de ayuda como datos estructurados (título, cuerpo, temas relacionados) para que pueda ser buscado y filtrado. El sidebar contextual puede ser un elemento `<aside>` que obtiene contenido de tu CMS o un archivo JSON estático de entradas de ayuda.
