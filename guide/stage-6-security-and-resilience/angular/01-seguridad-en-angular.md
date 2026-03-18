# Seguridad en Angular

> Cómo Angular protege contra vulnerabilidades web comunes. Cubre protección XSS automática, `DomSanitizer`, protección XSRF del `HttpClient`, Content Security Policy y error handling global.

---

## Protección XSS Automática

Angular sanitiza automáticamente todo el contenido que se renderiza en templates. Cualquier valor que contenga HTML, scripts o URLs potencialmente peligrosas se escapa antes de insertarse en el DOM.

```typescript
@Component({
  selector: 'app-comment',
  standalone: true,
  template: `
    <!-- SAFE: Angular escapes HTML automatically -->
    <p>{{ userComment() }}</p>
    <!-- If userComment = "<script>alert('xss')</script>", renders as text -->

    <!-- SAFE: property binding also sanitized -->
    <div [innerHTML]="userComment()"></div>
    <!-- Angular strips dangerous tags (script, object, embed) -->
  `,
})
export class CommentComponent {
  userComment = input.required<string>();
}
```

Angular reconoce varios contextos de seguridad y sanitiza apropiadamente:

| Contexto | Ejemplo | Qué sanitiza |
|----------|---------|-------------|
| **HTML** | `[innerHTML]` | Elimina `<script>`, event handlers (`onclick`), `<object>`, `<embed>` |
| **Style** | `[style]` | Elimina `url()`, `expression()` |
| **URL** | `[href]`, `[src]` | Bloquea `javascript:` URLs |
| **Resource URL** | `<iframe [src]>`, `<script [src]>` | Bloquea todos los valores no confiables |

---

## `DomSanitizer` y `bypassSecurityTrust*`

Cuando necesitas renderizar contenido que Angular bloquea por defecto (HTML de un CMS, URLs de iframes confiables), puedes usar `DomSanitizer`:

```typescript
import { Component, inject, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-cms-content',
  standalone: true,
  template: `<div [innerHTML]="sanitizedContent()"></div>`,
})
export class CmsContentComponent {
  private sanitizer = inject(DomSanitizer);
  rawContent = input.required<string>();

  sanitizedContent = computed((): SafeHtml => {
    // ONLY use this when you trust the source (your own CMS, not user input)
    return this.sanitizer.bypassSecurityTrustHtml(this.rawContent());
  });
}
```

**Cuándo es aceptable:**
- HTML proveniente de tu propio CMS donde tú controlas el contenido.
- URLs de iframes de servicios confiables (YouTube, Google Maps).
- SVGs generados por tu backend.

**Cuándo NO usarlo:**
- Contenido ingresado directamente por usuarios.
- Datos de APIs de terceros que no controlas.
- Cualquier situación donde no puedas garantizar que el contenido es seguro.

```typescript
// DANGER: Never do this with user input
const userInput = '<img onerror="alert(1)" src="x" />';
this.sanitizer.bypassSecurityTrustHtml(userInput); // XSS vulnerability!

// SAFE: Use DOMPurify for user-generated content that needs HTML rendering
import DOMPurify from 'dompurify';

sanitizedContent = computed(() => {
  return this.sanitizer.bypassSecurityTrustHtml(
    DOMPurify.sanitize(this.rawContent())
  );
});
```

---

## Protección XSRF del `HttpClient`

Angular `HttpClient` tiene protección XSRF (Cross-Site Request Forgery) integrada:

```typescript
// app.config.ts — XSRF protection is enabled by default
import { provideHttpClient, withXsrfConfiguration } from '@angular/common/http';

export const appConfig = {
  providers: [
    provideHttpClient(
      withXsrfConfiguration({
        cookieName: 'XSRF-TOKEN',  // default
        headerName: 'X-XSRF-TOKEN', // default
      })
    ),
  ],
};
```

Cómo funciona:
1. El backend envía una cookie `XSRF-TOKEN` con cada response.
2. Angular `HttpClient` lee la cookie automáticamente.
3. En cada petición mutativa (POST, PUT, DELETE), Angular incluye el valor de la cookie en el header `X-XSRF-TOKEN`.
4. El backend verifica que el header coincida con la cookie.

Esto funciona porque JavaScript de otro dominio no puede leer las cookies de tu dominio.

---

## Content Security Policy (CSP)

CSP limita qué recursos puede cargar y ejecutar el navegador. Configúralo en los headers HTTP de tu servidor:

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline';
  img-src 'self' https://cdn.example.com;
  connect-src 'self' https://api.example.com;
  font-src 'self';
  frame-src 'none';
```

**Angular y CSP:**
- Angular no requiere `'unsafe-eval'` (a diferencia de frameworks que usan template compilation en runtime).
- Angular puede requerir `'unsafe-inline'` para estilos si usas `styles` en `@Component`. Para evitarlo, usa `styleUrl` con archivos CSS externos.
- Si usas AOT compilation (por defecto en production), no necesitas `'unsafe-eval'`.

---

## `ErrorHandler` --- Error Handling Global

Angular proporciona un `ErrorHandler` global para capturar errores no manejados:

```typescript
import { ErrorHandler, Injectable, inject } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private errorService = inject(ErrorReportingService);

  handleError(error: unknown) {
    // Log to error reporting service (Sentry, Datadog, etc.)
    this.errorService.report(error);

    // Log to console in development
    console.error('Unhandled error:', error);

    // Optionally show a user-facing message
    // Do NOT re-throw — it would cause an infinite loop
  }
}
```

```typescript
// app.config.ts
export const appConfig = {
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
};
```

Para errores de HTTP específicos, usa un interceptor:

```typescript
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        inject(Router).navigate(['/login']);
      } else if (error.status === 403) {
        inject(Router).navigate(['/forbidden']);
      } else if (error.status >= 500) {
        inject(NotificationService).showError('Error del servidor. Intenta más tarde.');
      }
      return throwError(() => error);
    }),
  );
};
```

---

## Errores Comunes

- **Usar `bypassSecurityTrustHtml` con input de usuario.** Esto desactiva la protección XSS de Angular. Solo úsalo con contenido que tú controlas completamente.
- **No sanitizar contenido de APIs externas.** Solo porque un dato viene de una API no significa que sea seguro. Usa DOMPurify si necesitas renderizar HTML externo.
- **Ignorar XSRF protection.** La protección solo funciona si tu backend envía la cookie `XSRF-TOKEN` y verifica el header. Configura ambos lados.
- **CSP demasiado permisivo.** `script-src 'unsafe-inline' 'unsafe-eval'` anula el propósito de CSP. Empieza restrictivo y relaja solo lo necesario.
- **`ErrorHandler` que relanza el error.** Relanzar dentro de `handleError` causa un loop infinito. Loggea y notifica, pero no relances.

---

## Puntos Clave

- Angular sanitiza automáticamente todo el contenido renderizado en templates. La protección XSS viene activada por defecto.
- `bypassSecurityTrustHtml` solo es aceptable para contenido que controlas (CMS propio). Para input de usuario, usa DOMPurify.
- `HttpClient` incluye protección XSRF automática: lee la cookie y envía el header en peticiones mutativas.
- CSP se configura en headers del servidor. Angular AOT no requiere `'unsafe-eval'`.
- `ErrorHandler` captura errores globales. Interceptors manejan errores HTTP específicos.
