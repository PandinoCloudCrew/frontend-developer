# Proteccion de Canal y Payload

[<- Volver a Etapa 6](../README.md)

Cuando tu app envia datos entre el navegador y el servidor, dos cosas deben estar protegidas: el **canal** (la conexion por la que viajan los datos) y el **payload** (los datos mismos). TLS/HTTPS protege el canal. SRI, CSP y firmas digitales protegen el payload. Esta lectura cubre ambas capas y cuando necesitas cada una.

## Contenido

- [TLS/HTTPS: la base de todo](#tlshttps-la-base-de-todo)
- [HSTS: forzar HTTPS](#hsts-forzar-https)
- [Mixed content](#mixed-content)
- [Integridad del payload](#integridad-del-payload)
- [Payload encryption: cuando TLS no es suficiente](#payload-encryption-cuando-tls-no-es-suficiente)
- [Certificate pinning y Certificate Transparency](#certificate-pinning-y-certificate-transparency)
- [Request signing](#request-signing)
- [Anti-patterns](#anti-patterns)
- [Puntos clave](#puntos-clave)

---

## TLS/HTTPS: la base de todo

TLS (Transport Layer Security) encripta la comunicacion entre el navegador y el servidor. HTTPS es simplemente HTTP sobre TLS.

**Que protege TLS:**
- **Confidencialidad:** Un atacante en la misma red WiFi no puede leer los datos en transito.
- **Integridad:** Los datos no pueden ser modificados en transito sin que se detecte.
- **Autenticidad:** El certificado verifica que estas hablando con el servidor correcto, no con un impostor.

**Que NO protege TLS:**
- No protege datos en reposo (en el servidor o en el navegador).
- No protege contra vulnerabilidades en tu codigo (XSS, CSRF).
- No impide que un servidor malicioso lea los datos que le envias.

### El papel del frontend

Como desarrollador frontend, tu responsabilidad es:

1. **Asegurarte de que todas las URLs usen `https://`** — sin excepciones.
2. **No mezclar HTTP y HTTPS** (mixed content).
3. **Verificar que los headers de seguridad esten presentes** en DevTools -> Network -> Response Headers.

```typescript
// MAL — URL hardcodeada con http
const API_URL = 'http://api.ejemplo.com';

// BIEN — siempre https
const API_URL = 'https://api.ejemplo.com';

// MEJOR — URL relativa (hereda el protocolo de la pagina)
const API_URL = '/api';
```

---

## HSTS: forzar HTTPS

HSTS (HTTP Strict Transport Security) es un header que le dice al navegador: "Nunca uses HTTP con este dominio. Siempre usa HTTPS."

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

| Directiva | Significado |
|-----------|-------------|
| `max-age=31536000` | Recordar esta regla durante 1 anio (en segundos) |
| `includeSubDomains` | Aplicar a todos los subdominios |
| `preload` | Incluir en la lista de preload de Chrome (HTTPS forzado desde la primera visita) |

**Sin HSTS:** La primera visita del usuario podria ser por HTTP, y un atacante podria interceptar esa conexion antes de que se redireccione a HTTPS (ataque de downgrade).

**Con HSTS:** Despues de la primera visita exitosa por HTTPS, el navegador recuerda que ese dominio es solo HTTPS y nunca intenta HTTP de nuevo.

El frontend no configura HSTS (es un header del servidor), pero debes verificar su presencia:

1. Abre DevTools -> Network.
2. Selecciona el documento HTML principal.
3. Busca `Strict-Transport-Security` en Response Headers.

---

## Mixed content

Mixed content ocurre cuando una pagina HTTPS carga recursos por HTTP.

```text
<!-- Pagina servida por HTTPS -->

<!-- Mixed content ACTIVO — bloqueado por el navegador -->
<script src="http://cdn.ejemplo.com/lib.js"></script>

<!-- Mixed content PASIVO — warning, puede cargarse -->
<img src="http://cdn.ejemplo.com/foto.jpg">
```

| Tipo | Ejemplos | Comportamiento del navegador |
|------|----------|------------------------------|
| **Activo** | Scripts, stylesheets, iframes, fetch | **Bloqueado** — no se carga |
| **Pasivo** | Imagenes, audio, video | **Warning** — se carga pero con advertencia |

**Por que importa:** Un solo recurso cargado por HTTP en una pagina HTTPS rompe la cadena de confianza. Un atacante puede modificar ese recurso en transito e inyectar codigo malicioso. Revisa la consola del navegador — los warnings de mixed content son visibles ahi.

---

## Integridad del payload

### Subresource Integrity (SRI)

SRI verifica que un archivo externo (script o stylesheet) no ha sido modificado. Agregas un hash del contenido esperado, y el navegador verifica antes de ejecutar.

```text
<!-- SRI: el navegador verifica el hash antes de ejecutar el script -->
<script
  src="https://cdn.ejemplo.com/lib.min.js"
  integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"
  crossorigin="anonymous">
</script>
```

Si el contenido del archivo no coincide con el hash, el navegador **no lo ejecuta**. Esto protege contra:
- CDN comprometido que sirve archivos modificados.
- Ataques man-in-the-middle que alteran archivos en transito (complementa TLS).

**Generar el hash:**

```bash
# Generar hash SRI de un archivo
cat lib.min.js | openssl dgst -sha384 -binary | openssl base64 -A
```

Angular no usa CDN por defecto (todo esta en el bundle), asi que SRI es mas relevante cuando cargas scripts de terceros.

### Content-Security-Policy (CSP)

CSP es un header que restringe que recursos puede cargar y ejecutar la pagina. Cubierto en detalle en la [lectura 01](./01-xss-csrf-csp.md). En el contexto de proteccion de payload:

```
Content-Security-Policy: script-src 'self'; style-src 'self' 'unsafe-inline'
```

- `script-src 'self'` — solo ejecutar scripts del mismo origin. No inline scripts, no eval.
- Si combinas con SRI: `script-src 'self' 'sha384-abc...'` — permite scripts del mismo origin o que coincidan con el hash.

### JSON Web Signature (JWS) e ID Tokens

Los ID Tokens de OIDC (ver [lectura 08](./08-oidc.md)) son JWTs firmados digitalmente. La firma permite que el frontend verifique:
- Que el token fue emitido por el proveedor de identidad correcto.
- Que el contenido no fue modificado despues de la emision.

```
eyJhbGciOiJSUzI1NiJ9.     <-- Header (algoritmo de firma)
eyJzdWIiOiJ1c2VyLTEyMyJ9. <-- Payload (claims)
SflKxwRJSMeKKF2QT4fwp...  <-- Signature (firma del proveedor)
```

El frontend puede verificar la firma usando la clave publica del proveedor (disponible en el `jwks_uri` del discovery endpoint). En la practica, la libreria OIDC hace esto automaticamente.

---

## Payload encryption: cuando TLS no es suficiente

TLS encripta el canal. Pero el servidor **puede leer** los datos que recibe. En la mayoria de los casos, esto es correcto — el servidor necesita los datos para procesarlos. Pero hay escenarios donde el servidor **no deberia** ver los datos:

| Escenario | Solucion |
|-----------|----------|
| App de notas encriptadas (el servidor almacena pero no lee) | End-to-end encryption (E2EE) |
| Mensajeria segura (solo emisor y receptor ven el contenido) | E2EE con intercambio de claves |
| Datos medicos sensibles donde el proveedor cloud no debe acceder | Client-side encryption antes de enviar |

### Web Crypto API

El navegador ofrece `crypto.subtle` para operaciones criptograficas (AES-GCM, RSA, HMAC, etc.). Es la unica forma segura de hacer criptografia en el navegador — codigo nativo auditado por el vendor del navegador.

```typescript
// Generar clave y encriptar
const key = await crypto.subtle.generateKey(
  { name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']
);
const iv = crypto.getRandomValues(new Uint8Array(12));
const encrypted = await crypto.subtle.encrypt(
  { name: 'AES-GCM', iv }, key, new TextEncoder().encode('datos secretos')
);
```

**Importante:** E2EE es complejo (manejo de claves, recuperacion de cuenta, rotacion). Solo implementalo si el requisito de negocio lo exige.

---

## Certificate pinning y Certificate Transparency

### Certificate pinning

Certificate pinning consiste en hardcodear en tu app cuales certificados son de confianza, en lugar de confiar en toda la cadena de Certificate Authorities.

**El problema:** Los navegadores **removieron** HTTP Public Key Pinning (HPKP) porque era demasiado peligroso. Si configuras mal el pinning, los usuarios no pueden acceder a tu sitio y no hay forma de arreglarlo remotamente.

### Certificate Transparency (CT)

La alternativa moderna es Certificate Transparency: un sistema de logs publicos donde todas las Certificate Authorities deben registrar los certificados que emiten.

**Como funciona:**
1. Cuando una CA emite un certificado para `tudominio.com`, lo registra en logs publicos de CT.
2. El navegador verifica que el certificado esta en los logs (SCT — Signed Certificate Timestamp).
3. Tu puedes monitorear los logs para detectar si alguien emitio un certificado fraudulento para tu dominio.

**El frontend no implementa esto.** Pero puedes monitorear logs de CT con herramientas como [crt.sh](https://crt.sh) para detectar certificados no autorizados para tu dominio.

---

## Request signing

Request signing prueba que un request fue generado por tu aplicacion y no fue modificado en transito. Un proxy corporativo o extension de navegador podria modificar el body despues de que TLS lo desencripta en el navegador.

La implementacion tipica usa HMAC via `crypto.subtle`: firmas el body + timestamp con una clave derivada de la sesion del usuario, y envias la firma en headers (`X-Request-Signature`, `X-Request-Timestamp`). El servidor verifica la firma y rechaza requests con firma invalida o timestamp viejo (previene replay attacks). En Angular, esto se implementa como un `HttpInterceptorFn`.

**Nota:** Request signing agrega complejidad. Solo implementalo si tienes un threat model que lo justifique (proxies corporativos, extensiones no confiables, APIs de alto valor).

---

## Anti-patterns

- **Implementar tu propia criptografia.** Usa `crypto.subtle` (Web Crypto API) que es implementada por el navegador en codigo nativo auditado. Implementar AES o RSA manualmente en JavaScript es una garantia de vulnerabilidades.
- **Enviar datos sensibles en query params.** Los query params se registran en logs del servidor, historial del navegador, analytics, proxies, y cualquier intermediario. Usa el body de un POST para datos sensibles.

```typescript
// MAL — el token queda en logs y en el historial del navegador
fetch('/api/datos?token=secreto123');

// BIEN — el token va en un header
fetch('/api/datos', {
  headers: { 'Authorization': 'Bearer token123' }
});
```

- **Confiar en el cliente para encriptar datos de forma segura.** Client-side encryption es util para E2EE (donde el servidor no debe ver los datos). Para datos que el servidor SI procesa, la encriptacion at rest es responsabilidad del servidor.
- **Desactivar HTTPS "para desarrollo".** `localhost` esta exento de los requisitos de HTTPS — funciona sin certificado. Si necesitas probar con un dominio, usa `mkcert` para generar un certificado local de desarrollo, no desactives HTTPS.
- **Ignorar warnings de mixed content.** Un solo recurso HTTP en una pagina HTTPS compromete la seguridad de toda la pagina. Busca y corrige todos los warnings de mixed content en la consola.
- **Usar SRI sin `crossorigin="anonymous"`.** Sin el atributo `crossorigin`, el navegador no aplica CORS al request del script y SRI no puede verificar el contenido. Ambos atributos deben estar presentes.

---

## Puntos clave

- TLS/HTTPS encripta el canal entre navegador y servidor. Es la base de seguridad — sin HTTPS, ninguna otra medida tiene sentido. Usa siempre `https://` o URLs relativas.
- HSTS fuerza HTTPS y previene ataques de downgrade. Verifica que el header `Strict-Transport-Security` este presente en las respuestas de tu servidor.
- Mixed content (HTTP en pagina HTTPS) rompe la cadena de confianza. El navegador bloquea mixed content activo (scripts) y advierte sobre pasivo (imagenes).
- SRI verifica la integridad de scripts externos con hashes. Usa `integrity` + `crossorigin="anonymous"` en todo script de CDN.
- Payload encryption (E2EE) solo es necesaria cuando el servidor no debe ver los datos. Usa `crypto.subtle` (Web Crypto API), nunca implementes tu propia criptografia.
- Request signing con HMAC prueba que un request no fue manipulado despues de salir de tu app. Solo justificado en threat models con proxies o extensiones no confiables.
- Certificate Transparency reemplazo a certificate pinning. Monitorea logs de CT para detectar certificados fraudulentos para tu dominio.

---

[<- Volver a Etapa 6](../README.md)
