# Color para UI

El color es la senal visual mas rápida en una interfaz de usuario. Los usuarios procesan el color antes de leer texto o analizar el layout. Un sistema de color bien estructurado hace que una interfaz se sienta cohesiva y profesional; uno mal estructurado -- valores hex ad hoc dispersos por el código -- crea caos visual y hace que el dark mode, los temas y la accesibilidad sean casi imposibles.

---

## Modelos de Color para la Web

| Modelo | Ejemplo de Sintaxis               | Mejor Para                              |
|--------|---------------------------------|---------------------------------------|
| Hex    | `#3b82f6`                       | Legacy, notacion compacta             |
| RGB    | `rgb(59, 130, 246)`             | Manipulacion programatica             |
| HSL    | `hsl(217, 91%, 60%)`           | Hue/saturation/lightness legible por humanos |
| Oklch  | `oklch(62% 0.2 255)`           | Perceptualmente uniforme, estandar moderno |

**Por que HSL y Oklch superan a Hex para trabajo de UI:**

En Hex (`#3b82f6`), no hay forma de mirar el valor y razonar sobre el. Es claro u oscuro? Saturado o apagado? No puedes saberlo sin un selector de color.

En HSL (`hsl(217, 91%, 60%)`), cada canal tiene significado: 217 es el hue (azul), 91% es la saturacion (vivido), 60% es la luminosidad (media). Puedes hacer un color mas claro aumentando el tercer valor, o desaturarlo bajando el segundo.

Oklch va mas alla. La luminosidad de HSL no es perceptualmente uniforme -- un amarillo HSL al 50% de luminosidad se ve mucho mas brillante que un azul HSL al 50% de luminosidad. Oklch corrige esto: `oklch(60% 0.15 255)` y `oklch(60% 0.15 90)` (azul y amarillo) aparecen igualmente brillantes al ojo humano. Esto hace de Oklch la mejor opción para generar escalas de color.

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

---

## Construyendo una Paleta de Color

Una paleta de color de produccion para UI tiene tres capas: **brand**, **neutral** y **semantic**.

### Capa 1: Brand Colors (Primary + Secondary)

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

Nota que la chroma (saturacion) disminuye en valores de luminosidad extremos. Colores muy claros o muy oscuros con chroma alta se ven antinaturales y no se renderizan bien en sRGB.

### Capa 2: Escala Neutral

Toda interfaz necesita una escala de grises para texto, bordes, fondos y divisores. Construye 10 tonos desde casi blanco hasta casi negro. Opcionalmente agrega un ligero tinte de hue (p.ej., un gris calido o gris frio) para darle personalidad.

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

### Capa 3: Semantic Colors

Los semantic colors comunican significado: success, warning, error, info. Cada uno necesita tres tonos -- un fondo claro, un borde medio y un primer plano oscuro -- para poder usarlos en banners de alerta, badges y estados de formulario.

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

---

## Dark Mode

Dark mode no es inversion de color. Invertir un tema claro produce colores chillones y de alta saturacion sobre fondos oscuros que son dolorosos de leer. Un tema oscuro adecuado requiere ajustes deliberados:

1. **Fondo:** Usa grises oscuros (`oklch(15-20% ...)`) no negro puro (`#000`). El negro puro crea un contraste excesivo con el texto blanco, causando fatiga visual.
2. **Texto:** Usa blanco crema (`oklch(90-95% ...)`) no blanco puro (`#fff`) para texto body. Reserva el blanco puro para elementos de alto enfasis.
3. **Saturacion:** Reduce la chroma/saturacion en fondos oscuros. Los colores vividos sobre superficies oscuras parecen vibrar.
4. **Elevacion:** En modo claro, la profundidad se muestra con sombras. En dark mode, la profundidad se muestra haciendo las superficies mas altas mas claras -- una card se situa en `oklch(22% ...)` sobre una página en `oklch(15% ...)`.

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

---

## Relaciones de Contraste (WCAG)

WCAG 2.1 define relaciones minimas de contraste entre el texto y su fondo:

| Nivel | Texto Normal (<18px) | Texto Grande (18px+ bold, o 24px+) |
|-------|--------------------|------------------------------------|
| AA    | 4.5:1              | 3:1                                |
| AAA   | 7:1                | 4.5:1                              |

Los elementos no textuales (iconos, bordes, focus rings) requieren 3:1 contra colores adyacentes.

**Referencia rápida para texto gris sobre blanco (`#fff`):**

| Valor de Gris | Relación de Contraste | WCAG AA? |
|--------------|----------------------|-----------|
| `#999`       | 2.85:1               | Falla     |
| `#888`       | 3.54:1               | Falla     |
| `#767676`    | 4.54:1               | Pasa      |
| `#595959`    | 7.0:1                | Pasa AAA  |

Usa el [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) o las DevTools del navegador (Lighthouse, inspector de accesibilidad) para verificar.

---

## `color-mix()` para Colores Dinamicos

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

---

## Opacity vs Manipulacion de Color

No uses `opacity` para crear variantes de texto mas claras. Opacity hace el elemento semi-transparente, lo que significa que el resultado depende de lo que este detras -- un fondo blanco, una imagen, una card.

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

La excepcion son los fondos de overlay (modales, toasts) donde la semi-transparencia es el comportamiento deseado.

---

## Errores Comunes

- **Demasiados hues (>5):** Una UI con 8 hues diferentes se siente caotica. La mayoria de las interfaces de produccion usan 1-2 hues de marca + 4 hues semanticos (success, warning, error, info) + un gris neutral.
- **Color como único indicador de estado:** Un borde rojo en un campo invalido es invisible para usuarios daltonicos (8% de los hombres). Siempre acompana el color con una segunda senal: icono, texto, patrón o cambio de posición. Esto es WCAG 1.4.1 (Use of Color).
- **Texto de bajo contraste por estetica:** Texto placeholder gris claro o etiquetas sutiles pueden verse elegantes pero fallan en accesibilidad y frustran a los usuarios en ambientes brillantes (luz solar, exterior).
- **Semantic colors inconsistentes:** Si rojo significa "error" en tus formularios pero "oferta" en tus cards de producto, los usuarios deben decodificar el significado del contexto cada vez. Asigna significados fijos a los colores y no te desvies.
- **Valores de color hardcodeados:** Un valor hex pegado directamente en un componente (`color: #3b82f6`) no puede ser tematizado, no puede participar en dark mode y divergira del design system con el tiempo. Siempre referencia design tokens (CSS custom properties).

---

## Puntos Clave

- Usa Oklch (o HSL como fallback) para colores de UI -- nunca razones sobre color en Hex.
- Construye tres capas de paleta: brand (10 tonos), neutral (10 tonos), semantic (3 tonos cada uno para success, warning, error, info).
- Dark mode requiere reducir la saturacion, usar grises oscuros (no negro puro) y expresar la elevacion a traves de la luminosidad de la superficie.
- Cumple los minimos de contraste WCAG AA: 4.5:1 para texto normal, 3:1 para texto grande y elementos no textuales.
- Almacena todos los colores como CSS custom properties, nunca como valores hardcodeados en componentes.
