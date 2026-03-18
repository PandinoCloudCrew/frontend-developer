# Lazy Loading y Code Splitting

Lazy loading y code splitting son tecnicas complementarias para reducir la cantidad de JavaScript y recursos que el navegador necesita descargar y procesar en la carga inicial. Lazy loading difiere la carga de recursos hasta que son necesarios; code splitting divide el bundle de la aplicación en chunks mas pequenos que se cargan bajo demanda.

---

## Estrategias de Lazy Loading

### Code Splitting Basado en Rutas

El enfoque de mayor impacto y menor esfuerzo. Cada página/ruta es un bundle separado que se carga solo cuando el usuario navega a ella. Soportado nativamente por todos los frameworks y bundlers principales.

La division basada en rutas es la linea base. Todos los meta-frameworks (Next.js, Nuxt, SvelteKit, Analog) lo hacen automáticamente.

### Lazy Loading a Nivel de Componente

Para componentes pesados que no son necesarios en la carga inicial:

- **React:** `React.lazy()` con `<Suspense>` para mostrar un fallback durante la carga.
- **Vue:** `defineAsyncComponent()` para cargar componentes bajo demanda.
- **Angular:** Modulos lazy-loaded para funcionalidades completas.

```jsx
// React: lazy loading a heavy component
const ChartDashboard = React.lazy(() => import('./ChartDashboard'));

function App() {
  return (
    <Suspense fallback={<ChartSkeleton />}>
      <ChartDashboard />
    </Suspense>
  );
}
```

### Lazy Loading de Imagenes

- **Atributo nativo `loading="lazy"`:** Soportado en todos los navegadores evergreen. El navegador difiere la carga de imagenes hasta que estan cerca del viewport.
- **`fetchpriority="high"`:** Para imagenes hero above-the-fold que deben cargarse inmediatamente.
- **Intersection Observer:** Para implementaciones personalizadas donde se necesite mas control.

```html
<!-- Above the fold: load eagerly with high priority -->
<img src="hero.avif" fetchpriority="high" alt="Hero image">

<!-- Below the fold: lazy load -->
<img src="gallery-1.avif" loading="lazy" alt="Gallery item 1">
```

**Regla critica:** Nunca apliques `loading="lazy"` a la imagen hero o al elemento LCP. Esto *retrasa* el Largest Contentful Paint porque el navegador espera hasta que la imagen entre en la interseccion del viewport antes de descargarla.

### Contenido Debajo del Fold

Difiere la carga de contenido no visible en la ventana grafica inicial. Prioriza la ruta de renderizado critica: carga primero lo necesario para la vista inicial; difiere todo lo demas al tiempo idle.

---

## Estrategias de Code Splitting

### Splitting Basado en Rutas

Cada página o ruta es un bundle separado. Es el enfoque de mayor impacto porque las paginas no visitadas no se descargan nunca.

### Splitting Basado en Features

Funcionalidades grandes (por ejemplo, dashboard de administracion, analytics, editor de texto enriquecido) se cargan solo cuando se acceden. Útil cuando una funcionalidad pesada es usada por un subconjunto de usuarios.

### Splitting a Nivel de Componente

Componentes pesados (graficos, editores de texto enriquecido, mapas) cargados bajo demanda. Tiene sentido cuando el componente es significativamente grande (>50KB) y no se necesita en la carga inicial.

### Splitting de Bibliotecas

Bibliotecas de vendor en chunks separados para mejor caching. Las dependencias de vendor cambian con menos frecuencia que el código de la aplicación, así que separarlas permite que el navegador cache el chunk de vendor independientemente.

### Prefetching

Carga especulativamente bundles para los probables proximos destinos de navegación. Esto elimina el delay de carga cuando el usuario finalmente navega.

```html
<!-- Prefetch the product detail page when hovering a product link -->
<link rel="prefetch" href="/chunks/product-detail.js">
```

Estrategias comunes:
- Precarga el bundle de la página de detalle al hacer hover sobre un enlace de producto.
- Precarga rutas adyacentes en el flujo del usuario (p.ej., el paso 2 de un wizard al estar en el paso 1).
- Usa `requestIdleCallback` para precargar rutas probables durante el tiempo idle.

---

## Cuando NO Hacer Code Splitting

No todo se beneficia de code splitting. Dividir excesivamente introduce costos:

- **Un estado de carga** (spinner, skeleton) que interrumpe la experiencia.
- **Un viaje de red adicional** con su latencia inherente.
- **Layout shift** si el espacio no esta reservado.
- **Cascada de chunks:** La division agresiva crea una cascada donde el navegador descarga el chunk A, que importa el chunk B, que importa el chunk C. Cada round-trip agrega latencia.

**Regla practica:** Un bundle de 80KB carga mas rápido que cuatro bundles de 20KB descargados secuencialmente. Divide por ruta y por funcionalidad pesada, no por componente individual. Haz code splitting en limites significativos donde el chunk sea lo suficientemente grande para justificar el compromiso.

**Siempre acompana los puntos de code splitting con un indicador de carga** (spinner, skeleton o barra de progreso) para que los usuarios sepan que la aplicación esta respondiendo.

---

## Puntos Clave

- Code splitting basado en rutas es la linea base -- todos los meta-frameworks lo hacen automáticamente.
- Lazy loading a nivel de componente para funcionalidades pesadas (graficos, editores, mapas).
- Nunca apliques `loading="lazy"` a imagenes above-the-fold -- perjudica el LCP.
- Usa prefetching para precargar los proximos destinos de navegación probables.
- No sobre-dividas: un bundle mediano es mejor que una cascada de chunks pequenos.
- Siempre incluye un indicador de carga (skeleton, spinner) en los puntos de code splitting.
