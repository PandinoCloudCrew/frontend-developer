# Formularios Nativos en HTML

Los formularios son donde HTML te da mas comportamiento gratuito — validación, accesibilidad y teclados moviles optimizados — si usas los elementos y atributos correctos. Antes de agregar JavaScript para validar un campo, asegurate de que HTML no lo haga ya por ti.

---

## Estructura básica de un formulario

```html
<form action="/signup" method="post">
  <fieldset>
    <legend>Account Information</legend>

    <label for="email">Email</label>
    <input
      type="email"
      id="email"
      name="email"
      required
      autocomplete="email"
    >

    <label for="password">Password</label>
    <input
      type="password"
      id="password"
      name="password"
      required
      minlength="8"
      maxlength="128"
    >
  </fieldset>

  <fieldset>
    <legend>Preferences</legend>

    <label for="age">Age</label>
    <input type="number" id="age" name="age" min="13" max="150">

    <label for="website">Website</label>
    <input
      type="url"
      id="website"
      name="website"
      pattern="https://.*"
      placeholder="https://example.com"
    >
  </fieldset>

  <button type="submit">Create Account</button>
</form>
```

---

## Conceptos clave

- **`<label>`** debe estar asociado con su input mediante la coincidencia `for`/`id`. Al hacer clic en la etiqueta se enfoca el input. Los lectores de pantalla leen la etiqueta cuando el input esta enfocado.
- **`<fieldset>` / `<legend>`** agrupa inputs relacionados y le da al grupo un nombre visible y accesible.
- **Atributos de validación nativos** — `required`, `pattern`, `min`, `max`, `minlength`, `maxlength`, `type="email"` — te dan validación del lado del cliente con cero JavaScript. El navegador muestra mensajes de error, previene el envio y resalta los campos invalidos automáticamente.
- **Los atributos `autocomplete`** le dicen al navegador que datos guardados sugerir (por ejemplo, `autocomplete="email"`, `autocomplete="new-password"`).
- **`<button type="submit">`** es el botón de envio estandar dentro de un formulario. Nunca uses `<div onclick>` para el envio de formularios.

---

## Tipos comunes de `<input>`

| Tipo | Proporciona |
|------|----------|
| `text` | Entrada de texto estandar |
| `email` | Teclado de email en móvil, valida formato de email |
| `password` | Enmascara la entrada, activa gestores de contrasenas |
| `number` | Teclado numerico en móvil, valida entrada numerica |
| `tel` | Teclado telefonico en móvil |
| `url` | Teclado de URL en móvil, valida formato de URL |
| `date` | Selector de fecha nativo |
| `search` | Botón de limpiar, teclado de busqueda en móvil |
| `checkbox` | Alternador booleano |
| `radio` | Selección de uno entre varios (agrupar por `name`) |

---

## Errores comunes

**Etiquetas de formulario faltantes** — inputs sin etiquetas asociadas:

```html
<!-- Bad: screen readers say "edit text, blank" -->
<input type="email" placeholder="Enter email">

<!-- Good: screen readers say "Email, edit text" -->
<label for="email">Email</label>
<input type="email" id="email">
```

**Usar `placeholder` como etiqueta** — el placeholder desaparece cuando el usuario empieza a escribir, eliminando la única indicacion de que campo es. Siempre usa `<label>` y reserva `placeholder` para mostrar un ejemplo de formato.

**Usar `<div onclick>` en lugar de `<button type="submit">`** — un `<div>` no es enfocable por teclado, no se activa con Enter/Space, y los lectores de pantalla no lo anuncian como botón. El `<button>` te da todo eso gratis.

**No agrupar campos relacionados** — sin `<fieldset>` y `<legend>`, los lectores de pantalla no pueden comunicar que un grupo de inputs pertenecen juntos (por ejemplo, "información de la cuenta" vs "preferencias").

---

## Puntos clave

- Los elementos nativos de formulario te dan validación, accesibilidad y teclados moviles gratis. Usalos.
- Cada `<input>` necesita un `<label>` asociado mediante `for`/`id`.
- Usa `<fieldset>` y `<legend>` para agrupar campos relacionados.
- Los atributos `required`, `pattern`, `min`, `max`, `minlength`, `maxlength` y los tipos de input como `email` y `url` proveen validación nativa sin JavaScript.
- Siempre usa `<button type="submit">` para enviar formularios, nunca un `<div>` con `onclick`.
