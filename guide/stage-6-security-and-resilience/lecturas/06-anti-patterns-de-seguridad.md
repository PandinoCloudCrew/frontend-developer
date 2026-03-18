# Anti-patterns de Seguridad y Manejo de Errores

Los anti-patterns de seguridad y manejo de errores son errores recurrentes que exponen vulnerabilidades, ocultan fallos o degradan la resiliencia de una aplicacion. Esta lectura consolida los errores mas comunes en ambas areas para construir reconocimiento de patrones.

---

## Anti-patterns de Seguridad

### 1. Validacion Solo del Lado del Cliente como Seguridad

La validacion de formularios en JavaScript es una conveniencia de UX, no una medida de seguridad. Cualquier validacion en el navegador puede ser evitada con DevTools, curl o una peticion modificada. Toda validacion critica de seguridad (autenticacion, autorizacion, sanitizacion de entrada, reglas de negocio) debe ocurrir en el servidor.

### 2. Teatro de Seguridad

Una Content Security Policy configurada como `default-src *` no bloquea nada. HTTPS con secretos en parametros de query registra esos secretos en el historial del navegador, logs del servidor y headers referer. Estas medidas crean una falsa sensacion de seguridad sin proporcionar proteccion real. Audita las configuraciones de seguridad para verificar su efectividad real.

### 3. API Keys y Secretos en Bundles de Frontend

Cualquier valor embebido en JavaScript enviado al navegador es visible para cada usuario mediante DevTools o source maps. Las API keys, endpoints internos y secretos deben vivir en el servidor. Usa proxies del lado del servidor especificos del entorno para integraciones sensibles.

```javascript
// WRONG: API key visible to everyone
const response = await fetch('https://api.service.com/data', {
  headers: { 'Authorization': 'Bearer sk_live_abc123' }
});

// RIGHT: proxy through your server
const response = await fetch('/api/proxy/data');
// Server-side: adds the API key before forwarding
```

### 4. Mala Configuracion de CORS

Establecer `Access-Control-Allow-Origin: *` en endpoints de API autenticados permite que cualquier sitio web haga peticiones con credenciales a tu API. Haz una lista blanca de origenes especificos y confiables. Para endpoints autenticados, `*` nunca es apropiado.

### 5. Datos Sensibles en el Estado del Cliente

Registros completos de usuarios, detalles de pago o IDs internos almacenados en Redux/Zustand/Pinia son visibles a traves de DevTools del navegador. Minimiza los datos sensibles en el estado del cliente; obtenlos bajo demanda y no los persistas mas tiempo del necesario.

### 6. Scripts de Terceros con Acceso Completo

Los scripts de analytics, widgets de chat y scripts de publicidad cargados mediante etiquetas `<script>` tienen los mismos privilegios que tu propio codigo -- pueden leer el DOM, acceder a cookies y exfiltrar datos. Audita los scripts de terceros, usa CSP para restringirlos, cargalos con `async`/`defer` y considera sandboxing con iframes donde sea posible.

### 7. Clickjacking

Sin `X-Frame-Options: DENY` (o `Content-Security-Policy: frame-ancestors 'none'`), tu aplicacion puede ser embebida en un iframe malicioso y los usuarios pueden ser enganados para hacer clic en elementos ocultos. Establece headers de restriccion de frames en todas las paginas autenticadas.

### 8. Open Redirects

Redirigir usuarios a una URL tomada de un parametro de query (`?redirect=https://evil.com`) sin validacion habilita ataques de phishing. Valida las URLs de redireccion contra una lista blanca de dominios confiables o restringe a rutas relativas.

---

## Anti-patterns de Manejo de Errores

### 9. Tragarse Errores Silenciosamente

Bloques `catch` vacios (`catch (e) {}`) o catches con solo `console.log` ocultan fallos tanto de usuarios como de desarrolladores. Cada error capturado debe ser:
- **Mostrado al usuario** con un mensaje accionable, o
- **Reportado a un servicio de tracking** (Sentry, Datadog), o
- Tener una **razon documentada** para ser intencionalmente ignorado.

```javascript
// WRONG: silent failure
try {
  await saveData(data);
} catch (e) {}

// WRONG: only logged, invisible to user and monitoring
try {
  await saveData(data);
} catch (e) {
  console.log(e);
}

// RIGHT: user notification + error tracking
try {
  await saveData(data);
} catch (e) {
  showNotification('Failed to save. Please try again.');
  errorTracker.captureException(e);
}
```

### 10. Mensajes de Error Genericos

Mostrar "Something went wrong" para un timeout de red, un fallo de validacion y un 403 Forbidden no da a los usuarios ningun camino a la resolucion. Mapea los tipos de error a mensajes especificos y accionables:

- Timeout de red: "Connection lost -- check your network."
- 403 Forbidden: "You don't have permission to view this."
- Validacion fallida: "Email address must include an @ symbol."

### 11. Reintento sin Visibilidad

Reintentar silenciosamente una peticion POST fallida puede causar efectos secundarios duplicados (dobles cobros, envios duplicados). Haz los reintentos visibles para el usuario, o asegura que la operacion sea idempotente antes de reintentar automaticamente.

### 12. Rollback de Optimistic Updates sin Notificacion

La UI muestra que una accion tuvo exito, luego silenciosamente la revierte cuando el servidor rechaza la peticion. Los usuarios pierden confianza cuando las acciones parecen tener exito y luego se deshacen. Siempre notifica a los usuarios cuando ocurre un rollback.

### 13. Error Boundaries con Granularidad Incorrecta

Un unico error boundary en la raiz de la aplicacion significa que cualquier fallo en cualquier componente reemplaza toda la aplicacion con un respaldo. Por el contrario, envolver cada componente pequeno es excesivo. Coloca boundaries alrededor de areas de funcionalidad independientes.

### 14. Rechazos de Promesas No Manejados

Las funciones async dentro de `useEffect` que carecen de manejo `.catch()` o wrappers try/catch producen rechazos de promesas no manejados. Estos son silenciosos en muchos entornos y pueden dejar la UI en un estado inconsistente. Siempre maneja la ruta de error de cada operacion asincrona.

```javascript
// WRONG: unhandled rejection
useEffect(() => {
  fetchData(); // async function with no catch
}, []);

// RIGHT: error handling for async operations
useEffect(() => {
  fetchData().catch((error) => {
    setError(error.message);
    errorTracker.captureException(error);
  });
}, []);
```

---

## Lista de Verificacion de Seguridad para Frontend

1. Los tokens no estan en `localStorage` -- estan en cookies `HttpOnly` o en memoria.
2. CSP esta configurada y no usa `default-src *` ni `'unsafe-eval'` para scripts.
3. No hay API keys ni secretos en el codigo del frontend.
4. CORS esta configurada con origenes especificos, no `*`, en endpoints autenticados.
5. `X-Frame-Options: DENY` esta establecido en paginas autenticadas.
6. Los scripts de terceros estan auditados y restringidos por CSP.
7. Los datos sensibles en el estado del cliente estan minimizados.
8. Las URLs de redireccion se validan contra una lista blanca.

---

## Puntos Clave

- La validacion del cliente es UX, no seguridad. Siempre valida en el servidor.
- Nunca expongas secretos, API keys o datos sensibles en el bundle del frontend.
- Nunca tragues errores silenciosamente -- mostralos al usuario o reportalos a un servicio de tracking.
- Mapea tipos de error a mensajes especificos y accionables, no genericos.
- Siempre notifica al usuario cuando un optimistic update falla y se revierte.
- Maneja la ruta de error de cada operacion asincrona -- los rechazos no manejados son bugs silenciosos.
- Audita regularmente la configuracion de seguridad (CSP, CORS, headers) para verificar su efectividad real.
