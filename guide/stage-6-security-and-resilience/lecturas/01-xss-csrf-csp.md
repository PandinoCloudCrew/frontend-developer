# XSS, CSRF y Content Security Policy

Las tres vulnerabilidades de seguridad web mas comunes en el frontend son Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF) y la falta de una Content Security Policy (CSP) adecuada. Entender estas amenazas y sus mitigaciones es fundamental para cualquier desarrollador frontend.

---

## Prevencion de XSS

**Cross-Site Scripting (XSS) sigue siendo una de las vulnerabilidades web mas prevalentes.** Un ataque XSS ocurre cuando un atacante logra inyectar y ejecutar codigo JavaScript malicioso en el contexto de tu aplicacion web, con acceso al DOM, cookies y sesion del usuario.

### Auto-escaping del Framework

React, Vue, Angular y Svelte escapan automaticamente los datos renderizados en templates/JSX. Esta es tu primera linea de defensa. Cuando renderizas `{userInput}` en JSX o `{{ userInput }}` en un template de Vue, el framework convierte caracteres especiales como `<`, `>` y `"` en entidades HTML inofensivas.

### APIs Peligrosas a Evitar

Las siguientes APIs permiten inyectar HTML crudo, evadiendo el auto-escaping del framework:

- **React:** `dangerouslySetInnerHTML`
- **Vue:** `v-html`
- **Angular:** `bypassSecurityTrust*`
- **Cualquier framework:** Manipulacion directa de `innerHTML`

Cuando sea inevitable usar estas APIs (por ejemplo, para renderizar contenido de un CMS), sanitiza con **DOMPurify** antes de inyectar:

```javascript
import DOMPurify from 'dompurify';

// Sanitize before injecting raw HTML
const cleanHTML = DOMPurify.sanitize(userProvidedHTML);
```

### Otras Medidas

- **Nunca confies en la entrada del usuario:** Valida y sanitiza tanto en el cliente como en el servidor.
- **Evita `eval()`, `new Function()` y event handlers inline** construidos a partir de datos del usuario.
- **No construyas URLs o queries SQL** concatenando datos del usuario directamente.

---

## Proteccion contra CSRF

**Cross-Site Request Forgery (CSRF)** ocurre cuando un sitio malicioso engana al navegador del usuario para que envie una peticion autenticada a tu aplicacion sin el consentimiento del usuario.

### Tokens Anti-CSRF

Incluye un token unico e impredecible con cada peticion que cambie estado; valida en el servidor. El token se genera en el servidor, se incluye en el formulario o headers, y se verifica en cada peticion POST/PUT/DELETE.

### Cookies SameSite

Establece `SameSite=Strict` o `SameSite=Lax` en las cookies de sesion para prevenir la inclusion de peticiones cross-site:

- **`SameSite=Strict`:** La cookie no se envia en ningun request cross-site. La proteccion mas fuerte pero puede romper flujos legitimos (links desde emails, SSO).
- **`SameSite=Lax`:** La cookie se envia en navegacion top-level (links) pero no en requests de terceros (iframes, AJAX). Buen equilibrio entre seguridad y funcionalidad.

### Otras Medidas

- **Valida los headers Origin y Referer** en el servidor para peticiones que cambien estado.
- **Soporte del framework:** Usa la proteccion CSRF integrada si esta disponible (Angular la incluye por defecto con `HttpClient`).

---

## Content Security Policy (CSP)

Una CSP fuerte restringe que scripts, estilos, imagenes y conexiones estan permitidos en tu pagina. Incluso si se inyecta codigo malicioso, CSP puede prevenir su ejecucion o la exfiltracion de datos.

### Principios

- **Comienza restrictivo, luego afloja segun sea necesario.** Empieza con `default-src 'self'` y anade permisos especificos.
- **Evita `'unsafe-inline'` y `'unsafe-eval'`** donde sea posible; usa enfoques basados en nonce o hash para scripts inline cuando sea necesario.
- **Los endpoints de reporte de CSP** ayudan a monitorear y detectar violaciones en produccion.

### Ejemplo de CSP

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-abc123';
  style-src 'self' 'unsafe-inline';
  img-src 'self' https://cdn.example.com;
  connect-src 'self' https://api.example.com;
  font-src 'self' https://fonts.googleapis.com;
  report-uri /csp-report;
```

### Errores Comunes con CSP

- Una CSP configurada como `default-src *` no bloquea nada -- es teatro de seguridad.
- `'unsafe-inline'` para scripts anula la mayor parte de la proteccion contra XSS que CSP proporciona.
- No testear la CSP en staging antes de desplegarla en produccion puede romper funcionalidades (scripts de terceros, embeds, analytics).

---

## Otras Medidas de Seguridad Relacionadas

### Clickjacking

Sin `X-Frame-Options: DENY` (o `Content-Security-Policy: frame-ancestors 'none'`), tu aplicacion puede ser embebida en un iframe malicioso y los usuarios pueden ser enganados para hacer clic en elementos ocultos. Establece headers de restriccion de frames en todas las paginas autenticadas.

### CORS

Establecer `Access-Control-Allow-Origin: *` en endpoints de API autenticados permite que cualquier sitio web haga peticiones con credenciales a tu API. Haz una lista blanca de origenes especificos y confiables. Para endpoints autenticados, `*` nunca es apropiado.

### Open Redirects

Redirigir usuarios a una URL tomada de un parametro de query (`?redirect=https://evil.com`) sin validacion habilita ataques de phishing. Valida las URLs de redireccion contra una lista blanca de dominios confiables o restringe a rutas relativas.

---

## Puntos Clave

- **XSS:** Confia en el auto-escaping del framework. Evita `dangerouslySetInnerHTML`/`v-html` y sanitiza con DOMPurify cuando sea inevitable. Nunca uses `eval()`.
- **CSRF:** Usa tokens anti-CSRF + cookies `SameSite=Lax`/`Strict`. Valida headers Origin/Referer en el servidor.
- **CSP:** Comienza con `default-src 'self'` y anade excepciones especificas. Evita `'unsafe-inline'` y `'unsafe-eval'` para scripts.
- Establece `X-Frame-Options: DENY` y configura CORS correctamente en todos los endpoints autenticados.
