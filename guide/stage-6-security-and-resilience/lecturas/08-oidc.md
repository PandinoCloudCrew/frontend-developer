# OpenID Connect (OIDC)

[<- Volver a Etapa 6](../README.md)

OAuth 2.0 resuelve la **autorizacion** (que puede hacer una app), pero no dice nada sobre **quien** es el usuario. OpenID Connect (OIDC) es una capa de identidad construida sobre OAuth 2.0 que agrega autenticacion: permite que tu aplicacion verifique la identidad del usuario y obtenga informacion basica de su perfil. Si OAuth es "esta app puede acceder a tus fotos", OIDC es "esta persona es Juan Perez y su email es juan@ejemplo.com".

## Contenido

- [OIDC y OAuth 2.0: la diferencia](#oidc-y-oauth-20-la-diferencia)
- [El flujo OIDC para SPAs](#el-flujo-oidc-para-spas)
- [Los tres tokens](#los-tres-tokens)
- [Claims del ID Token](#claims-del-id-token)
- [Discovery endpoint y proveedores](#discovery-endpoint-y-proveedores)
- [Implementacion en Angular](#implementacion-en-angular)
- [Validacion del ID Token en el frontend](#validacion-del-id-token-en-el-frontend)
- [Silent renew](#silent-renew)
- [Logout](#logout)
- [Anti-patterns](#anti-patterns)
- [Puntos clave](#puntos-clave)

---

## OIDC y OAuth 2.0: la diferencia

OAuth 2.0 es un protocolo de **autorizacion**. Le permite a una aplicacion acceder a recursos en nombre del usuario (leer emails, subir archivos). Pero OAuth no define como verificar quien es el usuario. OIDC extiende OAuth agregando:

1. Un **ID Token** (JWT) que contiene informacion de identidad del usuario.
2. Un **scope `openid`** que indica al servidor de autorizacion que el cliente quiere autenticacion, no solo autorizacion.
3. Un **UserInfo endpoint** donde se puede obtener informacion adicional del perfil.

En la practica, cuando tu SPA usa OIDC:
- El flujo de autorizacion es el mismo que OAuth (Authorization Code + PKCE).
- La diferencia es que incluyes el scope `openid` en la solicitud.
- Ademas del access token, recibes un **ID Token** que te dice quien es el usuario.

---

## El flujo OIDC para SPAs

El flujo recomendado para SPAs es **Authorization Code + PKCE** (el mismo que OAuth, cubierto en la [lectura 02](./02-autenticacion-segura.md)). La unica diferencia es el scope y el token adicional:

1. La SPA redirige al **authorization endpoint** del proveedor con `scope=openid profile email` y un `code_challenge` (PKCE).
2. El usuario se autentica en el proveedor (login form del proveedor, no de tu app).
3. El proveedor redirige de vuelta a tu app con un `authorization_code`.
4. La SPA intercambia el `authorization_code` + `code_verifier` en el **token endpoint**.
5. El proveedor responde con tres cosas: **ID Token**, **Access Token**, y opcionalmente un **Refresh Token**.

```
SPA                     Proveedor OIDC              API
 |                            |                      |
 |-- /authorize?scope=openid-->|                      |
 |                            |-- Login form -------->|
 |                            |<-- user/pass ---------|
 |<-- redirect + code --------|                      |
 |-- POST /token + code ----->|                      |
 |<-- id_token + access_token-|                      |
 |                            |                      |
 |-- GET /api + access_token ----------------------->|
 |<-- datos ------------------------------------------|
```

---

## Los tres tokens

| Token | Que es | Para quien | Donde se almacena |
|-------|--------|-----------|-------------------|
| **ID Token** | JWT que describe al usuario (nombre, email, etc.) | Para **tu SPA** — la consume el frontend | En memoria (variable JS) |
| **Access Token** | Credencial para acceder a APIs protegidas | Para **la API** — la consume el backend | En memoria (variable JS) o cookie HttpOnly via BFF |
| **Refresh Token** | Credencial de larga duracion para obtener nuevos access tokens | Para **el servidor de tokens** | Cookie HttpOnly (idealmente) o manejado por la libreria |

**Regla fundamental:** El frontend **usa** el ID Token (para saber quien es el usuario) y **envia** el access token (para acceder a APIs). El frontend **nunca inspecciona** el access token — ese es trabajo de la API.

---

## Claims del ID Token

Un ID Token es un JWT con claims (propiedades) estandarizadas:

```json
{
  "iss": "https://auth.ejemplo.com",
  "sub": "user-12345",
  "aud": "mi-app-client-id",
  "exp": 1700000000,
  "iat": 1699996400,
  "nonce": "abc123random",
  "email": "juan@ejemplo.com",
  "name": "Juan Perez",
  "picture": "https://auth.ejemplo.com/avatars/12345.jpg"
}
```

| Claim | Significado |
|-------|-------------|
| `iss` (issuer) | Quien emitio el token — debe coincidir con tu proveedor OIDC |
| `sub` (subject) | Identificador unico del usuario en el proveedor |
| `aud` (audience) | Para quien fue emitido — debe coincidir con tu client ID |
| `exp` (expiration) | Timestamp Unix de cuando expira el token |
| `iat` (issued at) | Timestamp Unix de cuando se emitio |
| `nonce` | Valor aleatorio que tu app envio al iniciar el flujo — previene replay attacks |
| `email` | Email del usuario (requiere scope `email`) |
| `name` | Nombre del usuario (requiere scope `profile`) |

---

## Discovery endpoint y proveedores

Cada proveedor OIDC publica un documento JSON en `/.well-known/openid-configuration` con toda su configuracion (endpoints, scopes soportados, algoritmos de firma). La libreria OIDC usa este endpoint automaticamente — tu configuras solo la URL base del proveedor y la libreria descubre el resto.

| Proveedor | Discovery URL base |
|-----------|-------------------|
| **Auth0** | `https://tu-tenant.auth0.com` |
| **Azure AD / Entra ID** | `https://login.microsoftonline.com/{tenant}/v2.0` |
| **Keycloak** | `https://tu-servidor/realms/{realm}` |
| **Google** | `https://accounts.google.com` |
| **AWS Cognito** | `https://cognito-idp.{region}.amazonaws.com/{poolId}` |

Todos siguen el mismo estandar OIDC, asi que cambiar de proveedor requiere cambiar la configuracion, no el codigo.

---

## Implementacion en Angular

La libreria recomendada es `angular-auth-oidc-client`. Setup basico:

```typescript
// app.config.ts
import { provideAuth } from 'angular-auth-oidc-client';

export const appConfig = {
  providers: [
    provideAuth({
      config: {
        authority: 'https://auth.ejemplo.com',
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'mi-app-client-id',
        scope: 'openid profile email',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
      },
    }),
  ],
};
```

Uso en un componente:

```typescript
// auth-status.component.ts
import { Component, inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-auth-status',
  standalone: true,
  template: `
    @if (isAuthenticated()) {
      <p>Hola, {{ userData()?.name }}</p>
      <button (click)="logout()">Cerrar sesion</button>
    } @else {
      <button (click)="login()">Iniciar sesion</button>
    }
  `,
})
export class AuthStatusComponent {
  private oidc = inject(OidcSecurityService);

  isAuthenticated = toSignal(this.oidc.isAuthenticated$);
  userData = toSignal(this.oidc.userData$);

  login() {
    this.oidc.authorize();
  }

  logout() {
    this.oidc.logoff().subscribe();
  }
}
```

Guard para rutas protegidas:

```typescript
// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const oidc = inject(OidcSecurityService);
  const router = inject(Router);

  return oidc.isAuthenticated$.pipe(
    map(({ isAuthenticated }) =>
      isAuthenticated ? true : router.createUrlTree(['/login'])
    )
  );
};
```

---

## Validacion del ID Token en el frontend

**Regla importante:** El frontend **no valida** el access token. Eso es responsabilidad de la API. Pero el frontend **si puede** (y deberia) validar el ID Token:

| Validacion | Que verificar |
|------------|---------------|
| `iss` | Que coincida con la URL de tu proveedor OIDC |
| `aud` | Que coincida con tu client ID |
| `exp` | Que el token no haya expirado |
| `nonce` | Que coincida con el nonce que tu app envio al iniciar el flujo |

La libreria `angular-auth-oidc-client` hace todas estas validaciones automaticamente. No necesitas implementarlas manualmente.

---

## Silent renew

Cuando el access token expira, la SPA necesita uno nuevo sin interrumpir al usuario. Hay dos mecanismos:

1. **Refresh Token:** La SPA usa el refresh token para obtener un nuevo access token directamente desde el token endpoint. Es el metodo preferido.
2. **Silent renew via iframe:** La SPA abre un iframe oculto que hace el flujo de autorizacion completo usando la sesion existente del proveedor. Menos recomendado (problemas con third-party cookies).

Con `angular-auth-oidc-client`, solo necesitas:

```typescript
// En la configuracion
{
  silentRenew: true,
  useRefreshToken: true, // Usar refresh token en vez de iframe
  silentRenewTimeoutInSeconds: 10,
}
```

---

## Logout

OIDC define **RP-Initiated Logout** (RP = Relying Party, tu app):

1. La SPA redirige al `end_session_endpoint` del proveedor.
2. El proveedor cierra la sesion del usuario.
3. El proveedor redirige de vuelta a tu app (al `postLogoutRedirectUri`).

```typescript
// En tu componente o servicio
this.oidc.logoff().subscribe();
// La libreria maneja la redireccion al proveedor y de vuelta
```

Ademas de cerrar la sesion en el proveedor, limpia los tokens en memoria de tu SPA.

---

## Anti-patterns

- **Construir tu propio cliente OIDC.** El protocolo tiene muchos detalles sutiles (validacion de nonce, manejo de clock skew, PKCE). Usa `angular-auth-oidc-client` u otra libreria certificada. Reinventar esto es una fuente segura de vulnerabilidades.
- **Almacenar tokens en localStorage.** Ya cubierto en la [lectura 02](./02-autenticacion-segura.md) — `localStorage` es accesible para cualquier JavaScript que ejecute un XSS.
- **No validar el ID Token.** Si no verificas `iss`, `aud`, y `nonce`, un atacante podria inyectar un ID Token emitido para otra aplicacion o reutilizar uno capturado (replay attack).
- **Ignorar el nonce.** El nonce previene replay attacks. Si no lo generas y verificas, un atacante podria interceptar un ID Token y reutilizarlo en otro flujo de autorizacion.
- **Hardcodear URLs del proveedor.** Usa el discovery endpoint (`/.well-known/openid-configuration`). Si hardcodeas endpoints y el proveedor los cambia, tu app se rompe silenciosamente.
- **Inspeccionar el access token en el frontend.** El access token es opaco para el frontend. Su formato puede cambiar sin aviso. Solo la API lo valida.

---

## Puntos clave

- OIDC es una capa de **identidad** sobre OAuth 2.0. OAuth = autorizacion, OIDC = autenticacion.
- El flujo para SPAs es Authorization Code + PKCE con scope `openid`. Es el mismo flujo de OAuth pero devuelve un ID Token adicional.
- El ID Token es para tu SPA (identidad del usuario), el access token es para tu API (autorizacion), el refresh token es para obtener nuevos tokens.
- Usa el discovery endpoint (`/.well-known/openid-configuration`) para que tu app se configure automaticamente con el proveedor.
- En Angular, usa `angular-auth-oidc-client` — no construyas tu propio cliente OIDC.
- El frontend valida el ID Token (`iss`, `aud`, `exp`, `nonce`) pero nunca inspecciona el access token.
- Silent renew con refresh tokens mantiene la sesion del usuario sin interrupciones.

---

[<- Volver a Etapa 6](../README.md)
