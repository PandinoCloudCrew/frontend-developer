# Error Boundaries y Graceful Degradation

Las aplicaciones frontend deben estar disenadas para manejar fallos de manera elegante. Error boundaries capturan errores de JavaScript en el arbol de componentes y muestran una UI de respaldo. Graceful degradation asegura que cuando una funcionalidad falla, la aplicación sigue siendo útil en lugar de colapsar completamente.

---

## Error Boundaries

### Concepto

Un error boundary es un componente que captura errores de JavaScript en cualquier parte de su arbol de componentes hijos, los registra y muestra una UI de respaldo en lugar de hacer crash a toda la aplicación.

### Implementación por Framework

- **React:** Componentes de clase (usando `componentDidCatch` y `getDerivedStateFromError`) o bibliotecas como `react-error-boundary` que proporcionan una API mas ergonomica.
- **Vue:** Hook del ciclo de vida `errorCaptured` y `onErrorCaptured` de la Composition API.
- **Angular:** Clase global `ErrorHandler` para manejo centralizado de errores.
- **Svelte:** No tiene error boundaries integrados; usa try-catch en funciones de carga y bloques `{#await}`.

```jsx
// React: using react-error-boundary library
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <h2>Something went wrong in this section</h2>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Dashboard />
    </ErrorBoundary>
  );
}
```

### Ubicacion Estrategica

Coloca error boundaries alrededor de areas de funcionalidad independientes para que un fallo en un area (por ejemplo, un date-picker en un flujo de reserva) no derrumbe toda la página.

**Granularidad correcta:**
- Un único error boundary en la raiz de la aplicación significa que cualquier fallo en cualquier componente reemplaza toda la aplicación con un respaldo. Demasiado grueso.
- Envolver cada componente pequeno es excesivo. Demasiado fino.
- **Lo ideal:** Boundaries alrededor de areas de funcionalidad independientes (sidebar, feed de contenido, panel de configuración) para que un fallo en una sección no derrumbe secciones no relacionadas.

### Desarrollo vs Produccion

Configura los error boundaries para mostrar detalles completos del error (stack trace, componente que fallo) en desarrollo y respaldos amigables ("Something went wrong") solo en produccion. Un respaldo amigable en desarrollo enmascara el error real y ralentiza la depuracion.

---

## Graceful Degradation

### Principio

Cuando una funcionalidad falla, **reduce la funcionalidad en lugar de hacer crash completamente.** El objetivo es mantener la mayor parte de la aplicación funcional incluso cuando partes individuales fallan.

### Estrategias

- **Si una llamada a API falla,** muestra datos cacheados con un indicador de datos desactualizados en lugar de una pantalla vacia.
- **Si un widget de terceros no carga** (chat, analytics, mapa), muestra un respaldo u oculta el widget en lugar de romper la página.
- **Deteccion de funcionalidades** (no deteccion de navegador): verifica si una API/funcionalidad esta disponible antes de usarla y proporciona alternativas cuando no lo esta.

```javascript
// Feature detection: graceful degradation for IntersectionObserver
if ('IntersectionObserver' in window) {
  // Use IntersectionObserver for lazy loading
  const observer = new IntersectionObserver(handleIntersection);
  observer.observe(element);
} else {
  // Fallback: load everything eagerly
  loadAllImages();
}
```

### Progressive Enhancement

La mejora progresiva es el enfoque complementario a graceful degradation: comienza con una experiencia base que funciona en todos los entornos, luego mejora para entornos mas capaces.

- La experiencia base funciona con HTML y CSS.
- JavaScript anade interactividad para navegadores que lo soportan.
- APIs modernas (Intersection Observer, View Transitions) se usan donde estan disponibles.

---

## Puntos Clave

- Coloca error boundaries alrededor de areas de funcionalidad independientes, no en la raiz ni en cada componente.
- Muestra detalles completos de error en desarrollo; respaldos amigables en produccion.
- Cuando una funcionalidad falla, reduce funcionalidad en lugar de hacer crash.
- Usa deteccion de funcionalidades (no deteccion de navegador) para proporcionar alternativas.
- Los datos cacheados con indicador de "desactualizado" son mejor que una pantalla vacia.
