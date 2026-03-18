# Seguridad Avanzada en Frontend

[← Volver a Etapa 6](../README.md)

Las lecturas anteriores cubren XSS, CSRF, CSP y autenticación básica. Esta lectura profundiza en prácticas de seguridad que un desarrollador frontend intermedio y avanzado debe conocer: autenticación multi-factor, protección de datos sensibles, sanitización de input, seguridad de dependencias, y principios de diseño seguro.

## Contenido

- [Autenticación Multi-Factor (MFA)](#autenticación-multi-factor-mfa)
- [Protección de datos sensibles en el cliente](#protección-de-datos-sensibles-en-el-cliente)
- [Sanitización y validación de input avanzada](#sanitización-y-validación-de-input-avanzada)
- [Seguridad de dependencias (Supply Chain)](#seguridad-de-dependencias-supply-chain)
- [Principios de diseño seguro para frontend](#principios-de-diseño-seguro-para-frontend)
- [Protección contra ataques comunes](#protección-contra-ataques-comunes)
- [Observabilidad de seguridad](#observabilidad-de-seguridad)
- [Anti-patterns](#anti-patterns)
- [Puntos clave](#puntos-clave)

---

## Autenticación Multi-Factor (MFA)

MFA agrega una capa adicional de verificación más allá de la contraseña. Incluso si un atacante obtiene la contraseña del usuario, necesita un segundo factor para acceder.

### Los 3 factores de autenticación

| Factor | Qué es | Ejemplos |
|--------|--------|----------|
| **Algo que sabes** | Información secreta | Contraseña, PIN, respuesta de seguridad |
| **Algo que tienes** | Un dispositivo físico | Teléfono (SMS, app authenticator), llave de seguridad USB (YubiKey) |
| **Algo que eres** | Biometría | Huella dactilar, Face ID, reconocimiento de voz |

MFA combina al menos 2 de estos factores. "Contraseña + pregunta de seguridad" **no es MFA** — ambos son "algo que sabes".

### Implementación de MFA en frontend

El frontend NO implementa la lógica de MFA — esa es responsabilidad del proveedor de identidad (Auth0, Cognito, Firebase Auth, Azure AD). Lo que el frontend SÍ hace:

1. **Detectar que se requiere MFA** — El servidor responde con un código específico (ej: `mfa_required`) en lugar de un token
2. **Mostrar la UI de segundo factor** — Pantalla para ingresar el código TOTP, verificar biometría, o insertar llave USB
3. **Enviar el segundo factor al servidor** — El servidor valida y entonces sí devuelve el token

```typescript
// Flujo simplificado en Angular
async manejarLogin(email: string, password: string) {
  const respuesta = await firstValueFrom(
    this.http.post<LoginResponse>('/api/auth/login', { email, password })
  );

  if (respuesta.requiereMfa) {
    // Mostrar pantalla de segundo factor
    this.mfaRequerido.set(true);
    this.mfaToken.set(respuesta.mfaToken); // Token temporal para el flujo MFA
    return;
  }

  // Login exitoso sin MFA
  this.guardarToken(respuesta.accessToken);
}

async verificarMfa(codigo: string) {
  const respuesta = await firstValueFrom(
    this.http.post<TokenResponse>('/api/auth/mfa/verify', {
      mfaToken: this.mfaToken(),
      codigo,
    })
  );

  this.guardarToken(respuesta.accessToken);
}
```

### TOTP (Time-based One-Time Password)

TOTP es el estándar más común para MFA. Apps como Google Authenticator, Authy o 1Password generan códigos de 6 dígitos que cambian cada 30 segundos.

El frontend solo necesita:
- Un input para 6 dígitos
- Validación de que son exactamente 6 números
- Un botón "Verificar"
- Un link "No tengo acceso a mi dispositivo" (que ofrece códigos de recuperación)

### WebAuthn / Passkeys

WebAuthn es el estándar moderno que reemplaza contraseñas con biometría o llaves de seguridad. El navegador maneja la criptografía — el frontend solo necesita llamar a la API del navegador:

```typescript
// Registrar una passkey
const credential = await navigator.credentials.create({
  publicKey: opcionesDelServidor, // El servidor genera estas opciones
});
// Enviar credential al servidor para guardarla

// Autenticarse con passkey
const assertion = await navigator.credentials.get({
  publicKey: opcionesDelServidor,
});
// Enviar assertion al servidor para verificar
```

El soporte de WebAuthn en navegadores modernos es >95%. Es la dirección hacia la que va la industria — contraseñas están siendo reemplazadas.

---

## Protección de datos sensibles en el cliente

### Qué datos son sensibles

No todos los datos requieren el mismo nivel de protección:

| Nivel | Datos | Tratamiento en frontend |
|-------|-------|------------------------|
| **Crítico** | Contraseñas, tokens, tarjetas de crédito, números de seguro social | **Nunca almacenar en el cliente**. Solo en memoria durante el input, limpiar inmediatamente después |
| **Sensible** | Email, teléfono, dirección, fecha de nacimiento (PII) | Minimizar exposición. No guardar en state más tiempo del necesario. No logear |
| **Interno** | IDs de usuario, roles, permisos | No confiar en el cliente para autorización. El servidor decide |
| **Público** | Nombre de producto, precios, contenido | Sin restricciones especiales |

### Reglas prácticas

**No guardes lo que no necesitas:**
```typescript
// MAL — guarda todo el usuario en state, incluyendo datos que no se muestran
this.usuario.set(respuestaCompleta);

// BIEN — solo guarda lo que la UI necesita
this.usuario.set({
  nombre: respuesta.nombre,
  avatar: respuesta.avatarUrl,
  rol: respuesta.rol,
});
```

**Limpia datos sensibles cuando ya no los necesitas:**
```typescript
// Después de enviar el formulario de pago
this.formularioPago = { numero: '', cvv: '', expiracion: '' };
```

**No logees datos sensibles:**
```typescript
// MAL
console.log('Usuario logueado:', usuario); // puede incluir email, teléfono, etc.

// BIEN
console.log('Usuario logueado:', usuario.id);
```

**Los datos en DevTools son visibles:**
Todo lo que esté en Redux/Zustand/NgRx/Signals es visible en DevTools. Las extensiones del navegador (incluyendo las de desarrollo del framework) pueden leer todo el state. No pongas datos sensibles en state global que se inspecciona con DevTools.

---

## Sanitización y validación de input avanzada

### Más allá de `required` y `type="email"`

La validación nativa de HTML cubre lo básico. Para protección real necesitas:

**Validación de longitud máxima:**
```typescript
// Previene ataques de denegación de servicio por inputs gigantes
nombre: z.string().max(200),
comentario: z.string().max(5000),
```

**Validación de formato estricto:**
```typescript
// No solo "es un email" sino "es un email razonable"
email: z.string().email().max(254), // RFC 5321 limit

// Teléfono: solo dígitos, espacios, guiones y +
telefono: z.string().regex(/^[\d\s\-+()]{7,20}$/),

// URL: solo http/https, no javascript:
url: z.string().url().refine(
  url => url.startsWith('http://') || url.startsWith('https://'),
  'Solo se permiten URLs http o https'
),
```

**Prevención de inyección en URLs:**
```typescript
// MAL — un usuario podría poner javascript:alert(1)
<a [href]="urlDelUsuario">Link</a>

// BIEN — validar el protocolo
enlaceSeguro(url: string): string {
  try {
    const parsed = new URL(url);
    if (['http:', 'https:'].includes(parsed.protocol)) {
      return url;
    }
    return '#'; // Protocolo no permitido
  } catch {
    return '#'; // URL inválida
  }
}
```

**Rich text / HTML del usuario:**
Si necesitas aceptar HTML del usuario (editor de texto rico), **siempre** sanitiza con DOMPurify:

```typescript
import DOMPurify from 'dompurify';

// Antes de renderizar HTML del usuario
const htmlLimpio = DOMPurify.sanitize(htmlDelUsuario, {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li'],
  ALLOWED_ATTR: ['href', 'target'],
});
```

---

## Seguridad de dependencias (Supply Chain)

Cada paquete npm que instalas es código de terceros que se ejecuta con los mismos privilegios que tu app. Un paquete comprometido puede:
- Leer todo el DOM (formularios, datos del usuario)
- Acceder a cookies (excepto HttpOnly)
- Hacer peticiones a servidores externos
- Registrar cada keystroke

### Prácticas de defensa

**Audita dependencias regularmente:**
```bash
# Buscar vulnerabilidades conocidas
npm audit

# Ver el árbol de dependencias (quién depende de quién)
npm ls --all

# Alternativa más detallada
npx depcheck
```

**Usa lock files y verifica integridad:**
```bash
# Instalar solo desde el lock file (no resuelve versiones nuevas)
npm ci  # en lugar de npm install en CI
```

**Minimiza dependencias:**
- Antes de instalar un paquete, pregúntate: ¿puedo hacer esto con 10 líneas de código?
- Un paquete de 2 líneas no justifica una dependencia (y su cadena de sub-dependencias)
- Prefiere paquetes con pocos dependencias propias

**Subresource Integrity (SRI):**
Si cargas scripts desde CDN (no recomendado, pero a veces necesario):

```text
<!-- SRI verifica que el archivo no fue modificado -->
<script
  src="https://cdn.example.com/lib.js"
  integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"
  crossorigin="anonymous">
</script>
```

---

## Principios de diseño seguro para frontend

### Principle of Least Privilege (Mínimo Privilegio)

La UI solo debe mostrar y permitir lo que el usuario tiene permiso de hacer:

```typescript
// MAL — mostrar el botón y verificar permisos al hacer click
<button (click)="eliminarUsuario()">Eliminar</button>

// BIEN — no mostrar lo que no se puede usar
@if (usuario().rol === 'admin') {
  <button (click)="eliminarUsuario()">Eliminar</button>
}
```

Pero recuerda: **la autorización real ocurre en el servidor**. Ocultar un botón es UX, no seguridad. El servidor debe rechazar la acción si el usuario no tiene permiso.

### Defense in Depth (Defensa en Profundidad)

No confíes en una sola capa de protección:

1. **Framework auto-escaping** — Angular sanitiza por defecto (primera capa)
2. **CSP** — Restringe qué scripts se ejecutan (segunda capa)
3. **Validación del input** — Zod/Valibot en el cliente (tercera capa)
4. **Validación del servidor** — Independiente del cliente (cuarta capa)
5. **HttpOnly cookies** — Tokens inaccesibles para JavaScript (quinta capa)

Si una capa falla, las demás siguen protegiendo.

### Fail Secure (Fallar de forma segura)

Cuando algo falla, el sistema debe quedar en un estado **seguro**, no en un estado **abierto**:

```typescript
// MAL — si la verificación de permisos falla, da acceso
let tieneAcceso = true;
try {
  tieneAcceso = await verificarPermisos(usuario);
} catch {
  // Si falla, tieneAcceso sigue siendo true — inseguro
}

// BIEN — por defecto, sin acceso
let tieneAcceso = false;
try {
  tieneAcceso = await verificarPermisos(usuario);
} catch {
  // Si falla, tieneAcceso es false — seguro
  this.router.navigate(['/sin-permiso']);
}
```

---

## Protección contra ataques comunes

### Clickjacking

Un atacante embebe tu app en un iframe invisible dentro de su página maliciosa. El usuario cree que hace click en la página del atacante pero realmente interactúa con tu app.

**Protección:** Headers del servidor (no del frontend, pero debes verificar):
```
X-Frame-Options: DENY
Content-Security-Policy: frame-ancestors 'none'
```

Verificar en DevTools → Network → Response Headers del documento HTML.

### Open Redirect

Tu app redirige al usuario basándose en un parámetro de URL:
```
https://tuapp.com/login?redirect=https://sitio-malicioso.com
```

**Protección:**
```typescript
// Validar que el redirect es a tu propio dominio
redireccionSegura(url: string): string {
  try {
    const parsed = new URL(url, window.location.origin);
    if (parsed.origin === window.location.origin) {
      return parsed.pathname + parsed.search;
    }
    return '/'; // Redirect externo no permitido
  } catch {
    return '/';
  }
}
```

### Prototype Pollution

Un atacante manipula `Object.prototype` a través de input del usuario, afectando todos los objetos de la aplicación.

**Protección:**
```typescript
// MAL — merge recursivo sin protección
function merge(target: any, source: any) {
  for (const key in source) {
    target[key] = source[key]; // __proto__ puede ser una key
  }
}

// BIEN — verificar keys peligrosas
function mergeSafe(target: Record<string, unknown>, source: Record<string, unknown>) {
  for (const key of Object.keys(source)) {
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      continue; // Ignorar keys peligrosas
    }
    target[key] = source[key];
  }
}
```

---

## Observabilidad de seguridad

No puedes proteger lo que no puedes ver. El frontend debe reportar eventos de seguridad:

### Qué reportar

| Evento | Por qué | Cómo |
|--------|---------|------|
| Intentos de login fallidos | Detectar ataques de fuerza bruta | Enviar al backend, el backend implementa rate limiting |
| Errores de CSP | Detectar inyecciones de scripts | `Content-Security-Policy-Report-Only` + endpoint de reporte |
| Tokens expirados inesperadamente | Detectar robo de sesión | Logging cuando `renovarToken()` falla |
| Input que falla validación con patrones sospechosos | Detectar intentos de inyección | Logging (sin incluir el input completo — podría ser PII) |

### CSP Reporting

```
Content-Security-Policy-Report-Only: default-src 'self'; report-uri /api/csp-report
```

Esto no bloquea nada pero **reporta** violaciones. Úsalo para detectar problemas antes de activar CSP restrictivo.

---

## Anti-patterns

- **"MFA es demasiado complicado para nuestros usuarios"** — MFA opcional es mejor que no tener MFA. Ofrécelo, no lo forces. Pero para acciones críticas (cambiar contraseña, transferir dinero), debería ser obligatorio.
- **"Guardamos los permisos en localStorage para no pedirlos al servidor"** — Los permisos en el cliente son decorativos. Un usuario puede cambiarlos en DevTools. El servidor decide qué puede hacer cada usuario.
- **"Confiamos en nuestros paquetes npm"** — Un solo paquete comprometido en tu cadena de dependencias puede exfiltrar datos de todos tus usuarios. `event-stream` (2018), `ua-parser-js` (2021), `colors.js` (2022) son ejemplos reales.
- **"Solo validamos en el frontend porque es más rápido"** — La validación del frontend es UX. La del servidor es seguridad. Son complementarias, no alternativas.
- **"No logueamos intentos de login fallidos"** — Sin este log, un ataque de fuerza bruta es invisible hasta que un usuario reporta que su cuenta fue comprometida.

---

## Puntos clave

- MFA combina 2+ factores de autenticación. El frontend maneja la UI del segundo factor, no la lógica. Usa TOTP como estándar, WebAuthn/Passkeys como futuro.
- Los datos sensibles (PII) deben minimizarse en el cliente: no guardes lo que no necesitas, limpia lo que ya no usas, no logees información personal.
- La sanitización de input va más allá de `required`: valida longitud máxima, formatos estrictos, protocolos de URL, y siempre usa DOMPurify para HTML del usuario.
- Cada paquete npm es un vector de ataque. Audita con `npm audit`, minimiza dependencias, usa `npm ci` en CI.
- Defense in Depth: múltiples capas de protección (auto-escaping + CSP + validación cliente + validación servidor + HttpOnly cookies). Si una falla, las demás protegen.
- Fail Secure: cuando algo falla, el sistema debe quedar cerrado (sin acceso), no abierto.

---

[← Volver a Etapa 6](../README.md)
