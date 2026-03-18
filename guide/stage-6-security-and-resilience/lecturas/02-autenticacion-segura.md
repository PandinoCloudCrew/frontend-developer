# Autenticación Segura

La autenticación segura en aplicaciones frontend implica decisiones criticas sobre donde almacenar tokens, como implementar flujos OAuth y como proteger sesiones de usuario. Errores en estos patrones son una de las fuentes mas comunes de vulnerabilidades en aplicaciones web modernas.

---

## Almacenamiento de Tokens

### Donde NO Almacenar Tokens

**Nunca almacenes JWTs o tokens sensibles en `localStorage`.** `localStorage` es accesible desde cualquier JavaScript que se ejecute en el mismo origen. Si un atacante logra un XSS (inyectar script en tu página), puede leer todos los tokens en `localStorage` y exfiltrarlos.

```javascript
// WRONG: tokens accessible to any XSS attack
localStorage.setItem('accessToken', jwt);

// Also WRONG: sessionStorage has the same XSS vulnerability
sessionStorage.setItem('accessToken', jwt);
```

### Donde SI Almacenar Tokens

**Recomendado:** Almacena refresh tokens en cookies `HttpOnly`, `Secure`, `SameSite`. Almacena access tokens solo en memoria (variables JavaScript).

```
Set-Cookie: refresh_token=abc123;
  HttpOnly;
  Secure;
  SameSite=Strict;
  Path=/api/auth/refresh;
  Max-Age=604800
```

- **`HttpOnly`:** La cookie no es accesible desde JavaScript (`document.cookie` no la ve). Esto protege contra XSS.
- **`Secure`:** La cookie solo se envia sobre HTTPS.
- **`SameSite=Strict`:** La cookie no se envia en requests cross-site, protegiendo contra CSRF.

**Access tokens en memoria:** Almacena el access token en una variable JavaScript (no en storage). Se pierde al refrescar la página, pero se puede obtener uno nuevo usando el refresh token en la cookie `HttpOnly`.

### Rotacion de Tokens

Usa access tokens de corta duracion (por ejemplo, 15 minutos) con rotacion de refresh tokens. Cuando el access token expira, usa el refresh token para obtener uno nuevo. Al usar el refresh token, el servidor emite un nuevo refresh token y invalida el anterior. Esto limita la ventana de oportunidad si un token es comprometido.

---

## OAuth 2.0 para SPAs

### Authorization Code Grant con PKCE

El flujo actualmente recomendado para aplicaciones basadas en navegador es **Authorization Code Grant con PKCE** (Proof Key for Code Exchange).

**Por que PKCE:** Las SPAs no pueden almacenar un client secret de forma segura (todo el código es visible en el navegador). PKCE elimina la necesidad de un client secret generando un code verifier y un code challenge dinamicos por sesion.

**Flujo simplificado:**
1. La SPA genera un `code_verifier` aleatorio y calcula su `code_challenge` (SHA-256 hash).
2. La SPA redirige al servidor de autorizacion con el `code_challenge`.
3. El usuario se autentica y el servidor redirige de vuelta con un `authorization_code`.
4. La SPA intercambia el `authorization_code` + `code_verifier` por tokens.
5. El servidor verifica que el `code_verifier` coincide con el `code_challenge` original.

### Parametro State

Usa el parametro `state` para proteger contra CSRF y ataques de intercambio de authorization code. El `state` es un valor aleatorio generado por la SPA antes de iniciar el flujo de autorizacion, y verificado cuando el servidor redirige de vuelta.

---

## Patrón Backend for Frontend (BFF)

El patrón BFF proporciona la seguridad mas fuerte para autenticación en SPAs: un componente del lado del servidor maneja los tokens, y la SPA usa cookies de sesion HTTP-only para comunicarse con su BFF.

**Como funciona:**
1. La SPA nunca ve los tokens de acceso ni los refresh tokens.
2. El BFF (un servidor ligero) realiza el flujo OAuth, almacena los tokens de forma segura en el servidor.
3. La SPA se comunica con el BFF mediante cookies `HttpOnly` de sesion.
4. El BFF agrega el token de acceso a las peticiones al API en nombre de la SPA.

**Ventajas:**
- Los tokens nunca estan expuestos al navegador, eliminando el riesgo de XSS.
- El BFF puede manejar la rotacion de tokens de forma transparente.
- Simplifica la lógica de autenticación en el frontend.

**Compromiso:**
- Requiere una unidad de despliegue adicional (el servidor BFF).
- Anade un salto de red extra en cada petición.

---

## Principios Generales

- **Implementa HTTPS en todas partes.** Sin HTTPS, cualquier medida de seguridad de tokens es inutil -- las cookies y tokens se transmiten en texto plano.
- **Impon atributos seguros de cookies:** `HttpOnly`, `Secure`, `SameSite` en todas las cookies de sesion y autenticación.
- **Aplica el principio de menor privilegio** a los scopes y permisos de las APIs. Solicita solo los permisos que la aplicación necesita.
- **Registra eventos de autenticación** para auditoria: logins exitosos, logins fallidos, rotaciones de tokens, logouts.

---

## Puntos Clave

- Nunca almacenes tokens en `localStorage` o `sessionStorage` -- son vulnerables a XSS.
- Usa cookies `HttpOnly` + `Secure` + `SameSite` para refresh tokens; access tokens en memoria.
- Access tokens de corta duracion (15 min) con rotacion de refresh tokens.
- OAuth en SPAs: Authorization Code Grant con PKCE. Nunca uses Implicit Grant.
- El patrón BFF proporciona la seguridad mas fuerte al mantener los tokens fuera del navegador.
- HTTPS es obligatorio -- sin el, ninguna otra medida de seguridad tiene sentido.
