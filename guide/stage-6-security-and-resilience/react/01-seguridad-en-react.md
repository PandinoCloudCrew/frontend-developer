# Seguridad en React



[← Volver a Etapa 6](../README.md)

> Cómo React protege contra vulnerabilidades web comunes. Cubre auto-escaping de JSX, `dangerouslySetInnerHTML`, Error Boundaries, vectores XSS, protección CSRF y manejo de autenticación.

## Contenido

- [Auto-escaping de JSX](#auto-escaping-de-jsx)
- [dangerouslySetInnerHTML](#dangerouslysetinnerhtml)
- [Error Boundaries](#error-boundaries)
- [Vectores XSS en React](#vectores-xss-en-react)
- [Protección CSRF](#protección-csrf)
- [Autenticación y tokens](#autenticación-y-tokens)
- [Anti-patterns](#anti-patterns)
- [Puntos clave](#puntos-clave)

---

## Auto-escaping de JSX

React escapa automáticamente todas las expresiones JSX `{value}` antes de insertarlas en el DOM. Si un usuario ingresa `<script>alert('xss')</script>`, React lo renderiza como texto plano, no como HTML ejecutable.

<<< @/snippets/react/s6-01-seguridad-en-react-01.tsx

Esto es el equivalente de la sanitización automática de templates en Angular. En ambos frameworks, la protección XSS viene activada por defecto.

---

## `dangerouslySetInnerHTML`

Cuando necesitas renderizar HTML real (contenido de un CMS, rich text), React requiere que uses `dangerouslySetInnerHTML`. El nombre largo es intencional: te obliga a pensar antes de usarlo.

<<< @/snippets/react/s6-01-seguridad-en-react-02.tsx

**Nunca** pases contenido de usuario directamente sin sanitizar:

<<< @/snippets/react/s6-01-seguridad-en-react-03.tsx

En Angular, el equivalente es `[innerHTML]` con `bypassSecurityTrustHtml`. Angular sanitiza automáticamente `[innerHTML]`, pero si usas `bypassSecurityTrustHtml` sin DOMPurify, tienes el mismo riesgo.

---

## Error Boundaries

Los Error Boundaries capturan errores de JavaScript en el render tree y muestran un fallback en vez de romper toda la aplicación. Son el **unico** caso donde todavia se necesita un class component en React, aunque la libreria `react-error-boundary` ofrece una alternativa funcional.

### Con `react-error-boundary` (recomendado)

```bash
npm install react-error-boundary
```

```
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div role="alert">
      <h2>Algo salio mal</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Intentar de nuevo</button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => {
        // Log to error reporting service (Sentry, Datadog, etc.)
        console.error('Error caught:', error, info);
      }}
    >
      <Dashboard />
    </ErrorBoundary>
  );
}
```

### Ubicacion estrategica

No pongas un solo Error Boundary en la raiz de la app. Coloca boundaries por feature para que un error en una seccion no destruya toda la pagina:

```
function App() {
  return (
    <main>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Sidebar />
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Dashboard />
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ChatWidget />
      </ErrorBoundary>
    </main>
  );
}
```

Si el chat falla, el sidebar y el dashboard siguen funcionando. En Angular, `ErrorHandler` captura errores globales, pero no tiene la granularidad por componente que ofrecen los Error Boundaries.

---

## Vectores XSS en React

Aunque React auto-escapa `{expressions}`, existen vectores que evitan esa proteccion:

### `href` con `javascript:`

```
// DANGER — executes JavaScript when clicked
<a href={userProvidedUrl}>Click here</a>
// If userProvidedUrl = "javascript:alert('xss')"

// SAFE — validate the URL protocol
function SafeLink({ url, children }: { url: string; children: React.ReactNode }) {
  const safeUrl = url.startsWith('http://') || url.startsWith('https://') ? url : '#';
  return <a href={safeUrl}>{children}</a>;
}
```

### `eval()` y construccion dinamica de codigo

```
// DANGER — never evaluate user input as code
eval(userInput);
new Function(userInput)();

// These are JavaScript vulnerabilities, not specific to React,
// but worth listing because beginners sometimes use eval for "dynamic" features
```

---

## Proteccion CSRF

CSRF (Cross-Site Request Forgery) es principalmente una responsabilidad del backend. El backend protege sus endpoints con tokens CSRF en cookies. React solo necesita asegurar que las cookies se envien con las peticiones:

```
// Include cookies in fetch requests to your own backend
const response = await fetch('/api/orders', {
  method: 'POST',
  credentials: 'include', // sends cookies (including CSRF token)
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(orderData),
});
```

Si usas axios, configura `withCredentials` globalmente:

```
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true, // include cookies in every request
});
```

En Angular, `HttpClient` lee la cookie XSRF y envia el header automaticamente. En React, tu backend debe configurar el mecanismo equivalente y React solo necesita enviar las cookies.

---

## Autenticacion y tokens

Donde guardar los tokens de autenticacion es una decision de seguridad critica:

| Almacenamiento | Riesgo | Recomendado |
|----------------|--------|:-----------:|
| `localStorage` | Accesible via XSS | No |
| `sessionStorage` | Accesible via XSS, no persiste | No |
| Cookie `httpOnly` | No accesible via JavaScript | Si |
| Memoria (variable) | Se pierde al recargar | Si (con refresh token en cookie) |

El patron mas seguro: guardar el access token en memoria y el refresh token en una cookie `httpOnly`:

```
// Simple auth wrapper using in-memory token
let accessToken: string | null = null;

export async function authFetch(url: string, options: RequestInit = {}) {
  const response = await fetch(url, {
    ...options,
    credentials: 'include', // send refresh token cookie
    headers: {
      ...options.headers,
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });

  if (response.status === 401) {
    // Token expired — try to refresh
    accessToken = await refreshAccessToken();
    return authFetch(url, options); // retry with new token
  }

  return response;
}
```

---

## Anti-patterns

- **Usar `dangerouslySetInnerHTML` sin DOMPurify.** Es la forma mas directa de introducir XSS en una app React. Siempre sanitiza con DOMPurify antes de renderizar HTML externo.
- **Catch blocks vacios en operaciones async.** `catch () {}` oculta errores que necesitas ver. Como minimo, loggea el error.
- **Un solo Error Boundary en la raiz.** Un error en cualquier componente destruye toda la pagina. Coloca boundaries por feature area.
- **Guardar tokens en `localStorage`.** Cualquier script de terceros (analytics, ads) puede leer `localStorage`. Usa cookies `httpOnly` o memoria.

---

## Puntos Clave

- React escapa automaticamente todas las expresiones JSX. La proteccion XSS viene activada por defecto.
- `dangerouslySetInnerHTML` requiere sanitizacion con DOMPurify. Nunca pases input de usuario directo.
- Error Boundaries (via `react-error-boundary`) capturan errores por seccion. Colocalos por feature, no solo en la raiz.
- Valida URLs antes de usarlas en `href` para evitar `javascript:` injection.
- Guarda tokens en memoria o cookies `httpOnly`, nunca en `localStorage`.

---

[← Volver a Etapa 6](../README.md)


