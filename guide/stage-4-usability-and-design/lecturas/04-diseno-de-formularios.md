# Diseño de Formularios

Los formularios son donde los usuarios intercambian datos con tu aplicación. Cada registro, checkout, busqueda y cambio de configuración fluye a traves de un formulario. Un formulario bien disenado reduce el abandono, reduce los tickets de soporte y reduce los errores. Un formulario mal disenado es la razón individual mas comun por la que los usuarios abandonan un producto.

---

## Ubicacion de Etiquetas

**Encima del input (valor predeterminado recomendado):** Las etiquetas colocadas directamente encima de su input son las mas rapidas de escanear porque el ojo se mueve en una sola linea vertical. Este patrón funciona en todos los anchos de viewport y es el estandar en practicamente todos los design systems modernos.

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

**Floating labels:** La etiqueta comienza como texto placeholder dentro del input y se anima a una posición mas pequena encima del campo al hacer focus. Visualmente elegante pero problematico: la etiqueta se vuelve diminuta, el campo parece vacio cuando esta lleno (rompiendo la capacidad de escaneo), y es mas difícil de implementar de forma accesible. Evitalo a menos que tu design system lo requiera explicitamente.

**Etiquetas alineadas a la izquierda:** La etiqueta se situa a la izquierda del input. Esto funciona en layouts amplios (formularios de admin, paginas de configuración) pero desperdicia espacio vertical, crea columnas desalineadas si las longitudes de las etiquetas varian, y se rompe en viewports estrechos. Usalo con moderacion.

---

## Dimensionamiento de Inputs

Ajusta el ancho del input al contenido esperado. Esto le da a los usuarios una pista visual sobre cuantos datos se esperan y evita que el formulario se sienta como un muro de rectangulos del mismo tamaño.

```css
.input-full  { width: 100%; }          /* email, address, name */
.input-lg    { max-width: 24rem; }      /* URL, long text */
.input-md    { max-width: 16rem; }      /* phone, city */
.input-sm    { max-width: 8rem; }       /* zip/postal code, CVV */
.input-xs    { max-width: 5rem; }       /* quantity, age */
```

Un campo de código postal que abarca todo el ancho del formulario comunica silenciosamente la expectativa equivocada.

---

## Campos Requeridos vs Opcionales

Marca la minoria. Si 8 de 10 campos son requeridos, marcar los 8 con asteriscos crea ruido visual. En su lugar, marca los 2 campos opcionales con "(optional)."

Si la mayoria de los campos son opcionales (p.ej., una página de perfil), marca los requeridos con "(required)" o el asterisco tradicional.

```html
<!-- Most fields required: mark the optional ones -->
<label for="phone">Phone number <span class="optional">(optional)</span></label>

<!-- Most fields optional: mark the required ones -->
<label for="name">Full name <span class="required" aria-hidden="true">*</span></label>
```

Siempre incluye una nota explicando la convencion del asterisco si la usas: "Fields marked with * are required."

---

## Texto Placeholder

El texto placeholder desaparece cuando el usuario empieza a escribir. Esto lo hace inutil como etiqueta -- el usuario no puede consultarlo despues de ingresar datos. También tiene bajo contraste en la mayoria de los navegadores (no cumple WCAG), no tiene significado semántico para lectores de pantalla y puede confundirse con un valor pre-llenado.

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

---

## Momento de la Validación

Elegir cuando mostrar errores de validación es una de las decisiones de UX de formularios mas impactantes.

**On blur (valor predeterminado recomendado):** Valida cuando el usuario abandona el campo (el evento `blur`). El usuario ha terminado de ingresar datos, así que el feedback es oportuno pero no interruptivo. Ven el error antes de avanzar demasiado en el formulario.

**On change despues del primer blur:** Un refinamiento del enfoque on blur. Despues de que el usuario ha visitado y abandonado un campo una vez (disparando la primera validación), cambia a validar en cada pulsacion de tecla (evento `input`) para que vean el error desaparecer en tiempo real mientras lo corrigen. Este es el estandar de oro para la experiencia de usuario.

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

**On submit solamente:** El usuario llena todo el formulario, presiona enviar y luego ve todos los errores de golpe. Esta es la peor experiencia para formularios largos -- el usuario tiene que desplazarse hacia atras, encontrar los errores y corregirlos sin contexto claro. Aceptable solo para formularios muy cortos (1-3 campos).

---

## Patrones de Mensajes de Error

Los buenos mensajes de error le dicen al usuario **que salio mal** y **como arreglarlo**.

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

---

## Errores Inline vs Resumen de Errores

- **Errores inline:** Para problemas de validación especificos de un campo (campo requerido faltante, formato incorrecto, valor fuera de rango). Colocalos directamente debajo del campo relevante.
- **Resumen de errores:** Para problemas a nivel de formulario (errores del servidor, validación entre campos como "la fecha de fin debe ser posterior a la fecha de inicio"). Colocalo en la parte superior del formulario, con enlaces ancla a cada campo problematico.

```html
<div class="error-summary" role="alert">
  <h3>There were 2 problems with your submission</h3>
  <ul>
    <li><a href="#email">Email address is already in use</a></li>
    <li><a href="#password-confirm">Passwords do not match</a></li>
  </ul>
</div>
```

Al mostrar un resumen de errores devuelto por el servidor, haz auto-scroll hacia el y establece el foco en el contenedor del resumen para que los usuarios de lectores de pantalla se den cuenta inmediatamente.

---

## Formularios de Multiples Pasos

Los formularios largos (>7 campos) se benefician de dividirse en pasos logicos.

**Requisitos:**
- **Indicador de progreso:** Muestra al usuario donde se encuentra (p.ej., "Step 2 of 4") con una barra visual de pasos.
- **Validación por paso:** Valida el paso actual antes de permitir al usuario avanzar. No esperes hasta el envio final.
- **Navegación hacia atras:** Siempre permite al usuario volver a pasos anteriores. Nunca bloquees pasos completados.
- **Preservacion de estado:** Si el usuario vuelve atras y regresa, los datos ingresados anteriormente deben seguir ahi. Usa controlled form state, no valores del DOM.

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

---

## Estados del Botón de Envio

Un botón de envio debe comunicar su estado claramente a traves de cuatro fases:

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

Deshabilita el botón de envio durante el envio para prevenir doble submit. Pero nunca deshabilites el botón antes de que el usuario haya interactuado -- un botón permanentemente deshabilitado sin explicacion es un callejon sin salida.

---

## Autofill y Autocomplete

El atributo HTML `autocomplete` le indica al navegador que tipo de dato espera un campo. Cuando se configura correctamente, los usuarios pueden llenar formularios enteros con un solo clic.

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

Valores de `autocomplete` faltantes o incorrectos son una de las causas mas comunes de abandono de checkout en móvil.

---

## Agrupacion de Campos Relacionados

Usa `<fieldset>` y `<legend>` para agrupar semanticamente campos relacionados. Los lectores de pantalla anuncian el legend cuando el usuario ingresa al grupo, proporcionando contexto.

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

Para agrupacion visual sin significado semántico, usa espaciado y encabezados opcionales:

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

---

## Errores Comunes

- **Submit deshabilitado sin explicacion:** Un botón de envio en gris sin indicacion de que necesita arreglar el usuario es un callejon sin salida. Si debes deshabilitarlo, acompanalo con un tooltip o pista inline listando los requisitos no cumplidos.
- **Limpiar el formulario ante error de validación:** Si el usuario comete un error y tu formulario reinicia todos los campos, se ira y nunca volvera. Siempre preserva el input valido ante un error.
- **Formularios modales para entrada de datos complejos:** Los modales tienen espacio limitado, no se pueden redimensionar y no se pueden desplazar comodamente en móvil. Usa una página completa o sección expandible para formularios con mas de 4-5 campos.
- **Placeholder como etiqueta:** Desaparece, tiene pobre contraste y no es accesible.
- **Requerir campos innecesarios:** Cada campo requerido adicional incrementa el abandono. Cuestiona agresivamente si realmente necesitas segundo nombre, número de telefono, nombre de empresa, etc. en este paso.
- **Auto-avance entre inputs:** Mover automáticamente el foco al siguiente campo despues de cierta cantidad de caracteres (p.ej., segmentos de número telefonico) rompe la expectativa del usuario, interfiere con pegar y confunde a los lectores de pantalla. Deja que el usuario controle la navegación.
- **Layouts horizontales de formulario en móvil:** Campos lado a lado en pantallas mas estrechas que 400px crean inputs diminutos e inutilizables. Apilalos verticalmente en móvil.

---

## Puntos Clave

- Coloca las etiquetas encima de los inputs (lo mas rápido de escanear, funciona en todos los anchos de viewport).
- Valida on blur, luego en cada pulsacion de tecla despues del primer blur -- el mejor equilibrio entre oportunidad y no intrusion.
- Los mensajes de error van debajo del campo, indican que esta mal y como arreglarlo, y usan icono + color (nunca solo color).
- Establece atributos `autocomplete` correctos en cada campo de formulario -- esto es de bajo esfuerzo y alto impacto.
- Nunca deshabilites el botón de envio sin decirle al usuario por que, y nunca limpies input valido ante un error.
