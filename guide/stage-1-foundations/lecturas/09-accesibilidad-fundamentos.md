# Accesibilidad: Fundamentos

La accesibilidad (a11y) no es una funcionalidad opcional ni una tarea de ultimo momento. Es un principio fundamental del desarrollo web que asegura que todas las personas puedan usar tu aplicación, independientemente de sus capacidades. Ademas, las practicas de accesibilidad mejoran la experiencia para *todos* los usuarios — navegación por teclado, buen contraste, estructura semántica — benefician a todos.

---

## HTML Semántico Primero

**Lo mas impactante que puedes hacer por la accesibilidad es usar los elementos HTML correctos.**

Los elementos semanticos llevan significado implícito, comportamiento de teclado y anuncios para lectores de pantalla:

- `<button>` es enfocable, se activa con Enter/Space, se anuncia como "button".
- `<nav>` crea un landmark de navegación.
- `<main>`, `<header>`, `<footer>`, `<aside>` crean landmarks de documento.
- `<h1>`-`<h6>` crean una estructura de encabezados navegable.
- `<table>`, `<th>`, `<td>` crean tablas de datos accesibles.

**Los elementos nativos proporcionan comportamiento gratis.** Un `<div>` con un handler `onClick` no es un botón — carece de soporte de teclado, gestion de foco y semántica para lectores de pantalla.

```html
<!-- Bad: a div pretending to be a button -->
<div class="btn" onclick="handleClick()">Submit</div>

<!-- Good: a real button with free accessibility -->
<button type="submit" onclick="handleClick()">Submit</button>
```

**Regla:** Agota las opciones nativas de HTML antes de recurrir a ARIA o soluciones basadas en JavaScript.

---

## ARIA Cuando Sea Necesario

**La Primera Regla de ARIA:** "Si puedes usar un elemento HTML nativo con la semántica y el comportamiento que necesitas ya incorporados, en lugar de reutilizar un elemento y anadir ARIA, hazlo."

El estudio de un millon de paginas de WebAIM encontro que **las paginas con ARIA presente tenian en promedio un 41% mas de errores detectados** que las que no tenian ARIA. Mas ARIA no significa mas accesible — el ARIA mal utilizado dana activamente la accesibilidad.

**Cuando ARIA es apropiado:**

- **Widgets personalizados** sin equivalente nativo en HTML (paneles de pestanas, vistas de arbol, comboboxes).
- **Regiones en vivo** (`aria-live`) para anunciar cambios de contenido dinámico.
- **Relaciones de etiquetado** (`aria-labelledby`, `aria-describedby`) cuando las etiquetas visibles son insuficientes.
- **Comunicacion de estado** (`aria-expanded`, `aria-selected`, `aria-disabled`) para elementos interactivos personalizados.

```html
<!-- Custom disclosure widget — ARIA is appropriate here -->
<button aria-expanded="false" aria-controls="panel-1">
  Show Details
</button>
<div id="panel-1" hidden>
  <p>Details content...</p>
</div>
```

```html
<!-- Live region for dynamic announcements -->
<div aria-live="polite" aria-atomic="true">
  3 new results loaded.
</div>
```

---

## Navegación por Teclado

**Cada elemento interactivo debe ser operable solo con un teclado** — esto es un requisito obligatorio para WCAG Nivel A.

- **Orden de tabulacion:** Sigue el orden del DOM por defecto. Usa un orden de fuente lógico en lugar de reordenamiento visual basado en CSS.
- **Elementos interactivos:** Todos deben ser alcanzables mediante Tab y operables con Enter, Space, Escape y teclas de flecha segun corresponda.
- **Evita `tabindex` positivo:** Solo usa `tabindex="0"` (anadir al orden de tabulacion) y `tabindex="-1"` (enfocable programaticamente pero no en el orden de tabulacion). Nunca uses `tabindex="1"` o superior.
- **Skip links:** Proporciona un enlace "Saltar al contenido principal" como el primer elemento enfocable.
- **Widgets personalizados:** Sigue las WAI-ARIA Authoring Practices para patrones de interacción por teclado (por ejemplo, teclas de flecha dentro de paneles de pestanas, Escape para cerrar modales).

```html
<!-- Skip link — first focusable element on the page -->
<a href="#main-content" class="skip-link">
  Saltar al contenido principal
</a>

<!-- Main content target -->
<main id="main-content">
  ...
</main>
```

```css
/* Skip link is visually hidden until focused */
.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
}
.skip-link:focus {
  top: 0;
  z-index: 100;
  background: #fff;
  padding: 0.5rem 1rem;
}
```

---

## Gestion del Focus

- **Dialogos modales:** Al abrirse, mueve el foco dentro del modal. Atrapa el foco dentro del modal mientras esta abierto. Al cerrarse, devuelve el foco al elemento que lo activo.
- **Cambios de ruta (SPAs):** Gestiona el foco en la navegación. Mueve el foco al encabezado principal o la region de contenido principal de la nueva página.
- **Contenido dinámico:** Cuando se anade o elimina contenido, asegura que el foco no se pierda. Si un elemento enfocado se elimina, mueve el foco a un sucesor lógico.
- **Indicadores de foco:** Nunca elimines los contornos de foco (`outline: none`) sin proporcionar una alternativa igualmente visible. Usa `:focus-visible` para estilos de foco solo por teclado.

```css
/* Bad: removes focus indicator entirely */
button:focus {
  outline: none;
}

/* Good: custom focus style that's visible */
button:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 2px;
}
```

---

## Consideraciones para Lectores de Pantalla

- **Texto alternativo para imagenes:** Descriptivo para imagenes informativas, `alt=""` vacio para imagenes decorativas.
- **Etiquetas de formulario:** Cada input debe tener un `<label>` asociado (usando `for`/`id` o envolviendo).
- **Anuncios de errores:** Usa `aria-live="assertive"` o `role="alert"` para mensajes de error para que sean anunciados inmediatamente.
- **Estructura de encabezados:** Manten una jerarquia lógica de encabezados (no saltes niveles). Los usuarios de lectores de pantalla navegan por encabezados mas que por cualquier otro método.
- **Texto de enlaces:** Evita "haz clic aquí" y "leer mas". Los enlaces deben tener sentido fuera de contexto.
- **Pruebas:** Prueba con lectores de pantalla reales (VoiceOver en macOS, NVDA en Windows, TalkBack en Android). Las herramientas automatizadas capturan solo ~30% de los problemas de accesibilidad.

```html
<!-- Bad: meaningless link text -->
<a href="/products">Click here</a>
<a href="/blog/post-1">Read more</a>

<!-- Good: descriptive link text -->
<a href="/products">View all products</a>
<a href="/blog/post-1">Read: Building accessible forms</a>
```

```html
<!-- Informative image -->
<img src="chart.png" alt="Bar chart showing 40% revenue growth in Q3">

<!-- Decorative image -->
<img src="decorative-line.svg" alt="">
```

**Primeros pasos para pruebas:**

1. Desconecta tu raton e intenta usar toda la aplicación solo con el teclado.
2. Si no puedes completar cada tarea con Tab, Enter, Space, Escape y teclas de flecha, tienes un problema.
3. Ejecuta herramientas automatizadas (axe, Lighthouse) para ganancias rapidas, luego prueba manualmente con un lector de pantalla.

---

## Errores comunes y anti-patrones

**Overlays de accesibilidad como solución:** Productos como AccessiBe, UserWay y widgets overlay similares no arreglan los problemas subyacentes de accesibilidad. A menudo interfieren con la tecnologia asistiva real, crean falsa confianza legal y han sido ampliamente criticados por la comunidad de personas con discapacidad. Arregla el código fuente; no anadas un widget encima.

**ARIA redundante en elementos nativos:** Anadir `role="button"` a un `<button>`, `role="link"` a un `<a href>`, o `role="navigation"` a un `<nav>` es ruido innecesario. Los elementos HTML nativos ya llevan esta semántica.

**Nombres accesibles sin significado:** `aria-label="button"`, `aria-label="icon"` o `aria-label="link"` no dice nada útil a un usuario de lector de pantalla. Los nombres accesibles deben describir *que hace el elemento*: `aria-label="Close dialog"`, `aria-label="Search products"`, `aria-label="Remove item from cart"`.

**Color como único indicador de estado:** Usar rojo vs. verde para indicar errores vs. exito falla para aproximadamente el 8% de los hombres que tienen deficiencia en la vision del color. WCAG 1.4.1 requiere que el color no sea el único medio visual de transmitir información. Complementa con iconos, etiquetas de texto o patrones.

**Pruebas automatizadas tratadas como suficientes:** Un puntaje de Lighthouse de 100 o cero violaciones de axe no significa que tu aplicación sea accesible. Las herramientas automatizadas capturan solo alrededor del 30% de los problemas de WCAG. No pueden detectar problemas de orden lógico de encabezados, mala gestion de foco, texto alt enganoso o interacciones de teclado inutilizables.

**Animaciones que provocan trastornos vestibulares:** El parallax scrolling, las animaciones que se reproducen automáticamente y el movimiento continuo pueden causar nauseas y desorientacion. Respeta la media query `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Botones deshabilitados sin explicacion:** Un botón de enviar gris sin indicacion de *por que* esta deshabilitado deja a todos los usuarios adivinando. Proporciona una pista visible explicando que debe completarse, o manten el botón habilitado y muestra errores de validación al activarlo.

---

## Puntos clave

- El HTML semántico es la base de la accesibilidad. Usa los elementos correctos antes de recurrir a ARIA.
- ARIA mal usado dana mas que ayuda. Solo usalo cuando no exista un elemento HTML nativo equivalente.
- Toda funcionalidad interactiva debe ser operable solo con teclado. Prueba desconectando tu raton.
- Gestiona el foco activamente en modales, cambios de ruta y contenido dinámico.
- Las herramientas automatizadas son el punto de partida, no la meta. Prueba con lectores de pantalla reales.
- Nunca elimines indicadores de foco. Usa `:focus-visible` para estilos de foco solo por teclado.
- Respeta `prefers-reduced-motion` para usuarios con trastornos vestibulares.
