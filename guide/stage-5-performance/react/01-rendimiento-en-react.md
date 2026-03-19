# Rendimiento en React



[← Volver a Etapa 5](../README.md)

> Cómo optimizar el rendimiento de aplicaciones React. Cubre `React.memo`, `useMemo`/`useCallback`, React Compiler, `React.lazy` + `Suspense`, `startTransition`, optimización de imágenes y el React Profiler.

## Contenido

- [React.memo](#reactmemo)
- [useMemo y useCallback](#usememo-y-usecallback)
- [React Compiler](#react-compiler-react-19)
- [React.lazy y Suspense](#reactlazy-y-suspense)
- [startTransition](#starttransition)
- [Optimización de imágenes](#optimización-de-imágenes)
- [React Profiler](#react-profiler)
- [Anti-patterns](#anti-patterns)
- [Puntos clave](#puntos-clave)

---

## `React.memo`

Por defecto, cuando un componente padre re-renderiza, todos sus hijos re-renderizan también, aunque sus props no hayan cambiado. `React.memo` envuelve un componente para que solo re-renderice cuando sus props cambian por referencia.

```
import { memo } from 'react';

interface ProductCardProps {
  name: string;
  price: number;
  onAddToCart: () => void;
}

const ProductCard = memo(function ProductCard({ name, price, onAddToCart }: ProductCardProps) {
  return (
    <article>
      <h3>{name}</h3>
      <p>${price.toFixed(2)}</p>
      <button onClick={onAddToCart}>Agregar al carrito</button>
    </article>
  );
});
```

`React.memo` compara props por referencia (`===`). Si el padre pasa un objeto o función nueva en cada render, `memo` no sirve de nada.

```
// BAD — inline object creates a new reference every render
<ProductCard product={{ name: 'Teclado', price: 89.99 }} />

// GOOD — stable reference
const product = useMemo(() => ({ name: 'Teclado', price: 89.99 }), []);
<ProductCard product={product} />
```

En Angular, `OnPush` cumple un rol similar: el componente solo se revisa cuando sus inputs cambian por referencia.

---

## `useMemo` y `useCallback`

`useMemo` memoriza el resultado de un cálculo. `useCallback` memoriza una referencia de función. Ambos reciben un array de dependencias.

```
import { useMemo, useCallback, useState } from 'react';

function ProductList({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState('');

  // Only recalculates when products or filter change
  const filteredProducts = useMemo(
    () => products.filter(p => p.name.toLowerCase().includes(filter.toLowerCase())),
    [products, filter],
  );

  // Stable reference — safe to pass to memoized children
  const handleAddToCart = useCallback((id: string) => {
    console.log('Adding', id);
  }, []);

  return (
    <div>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      {filteredProducts.map(p => (
        <ProductCard key={p.id} name={p.name} price={p.price} onAddToCart={() => handleAddToCart(p.id)} />
      ))}
    </div>
  );
}
```

En Angular, `computed()` cumple el rol de `useMemo`: recalcula automáticamente cuando cambian las signals que lee.

---

## React Compiler (React 19+)

React Compiler analiza tu código en build time y aplica memoización automáticamente. Convierte componentes, valores y callbacks en versiones memoizadas sin que escribas `useMemo`, `useCallback` o `memo`.

```
// With React Compiler, this "just works" — no manual memoization needed
function ProductList({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState('');

  // Compiler auto-memoizes this
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase()),
  );

  // Compiler auto-memoizes the callback
  const handleClick = (id: string) => console.log('click', id);

  return filtered.map(p => <ProductCard key={p.id} name={p.name} price={p.price} onClick={() => handleClick(p.id)} />);
}
```

React Compiler elimina la mayor parte de la necesidad de `useMemo`/`useCallback` manuales. Si tu proyecto usa React 19+ con el compiler habilitado, prioriza código legible sobre memoización manual.

---

## `React.lazy` y `Suspense`

`React.lazy` divide el bundle a nivel de componente. El componente se descarga solo cuando se renderiza por primera vez.

```
import { lazy, Suspense } from 'react';

const AnalyticsDashboard = lazy(() => import('./AnalyticsDashboard'));

function App() {
  return (
    <Suspense fallback={<div className="skeleton" style={{ height: 400 }} />}>
      <AnalyticsDashboard />
    </Suspense>
  );
}
```

Es el equivalente de `@defer` en Angular: ambos crean un chunk separado que se carga bajo demanda. La diferencia es que `@defer` ofrece triggers declarativos (viewport, hover, idle) que en React requieres implementar manualmente con `IntersectionObserver` o librerías como `react-lazy-load`.

---

## `startTransition`

`startTransition` marca una actualización de estado como no urgente. React prioriza las actualizaciones urgentes (input del usuario) y aplaza las no urgentes.

```
import { useState, startTransition } from 'react';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value); // urgent — update input immediately

    startTransition(() => {
      setResults(searchProducts(value)); // non-urgent — can be deferred
    });
  }

  return (
    <div>
      <input value={query} onChange={handleChange} />
      <ResultsList results={results} />
    </div>
  );
}
```

Esto evita que una operación costosa (filtrar miles de items) bloquee el input del usuario.

---

## Optimización de imágenes

En **Next.js**, el componente Image optimiza imágenes automáticamente (lazy loading, srcset, formatos modernos). Se importa con `import Image from 'next/image'` y acepta `width`, `height` (obligatorios para evitar layout shift) y `priority` (para la imagen LCP). Genera `srcset`, formatos modernos (WebP/AVIF) y lazy loading automáticamente.

En **React con Vite** (sin Next.js), usa los atributos nativos del browser:

```
function Hero() {
  return (
    <>
      {/* LCP image — load immediately */}
      <img src="/images/hero.jpg" alt="Hero banner" width={1200} height={600} fetchPriority="high" />

      {/* Below the fold — lazy load */}
      <img src="/images/product.jpg" alt="Product" width={400} height={300} loading="lazy" />
    </>
  );
}
```

En Angular, `NgOptimizedImage` cumple el mismo rol que `next/image`: lazy loading por defecto, srcset, y prevención de layout shift.

---

## React Profiler

React DevTools incluye un **Profiler** que graba renders y muestra cuánto tarda cada componente. Para identificar re-renders innecesarios:

1. Abre React DevTools en el browser.
2. Ve a la pestaña **Profiler**.
3. Haz clic en **Record**, interactúa con la app, y detén la grabación.
4. Revisa el flame chart: los componentes en amarillo/rojo tardaron más.

También puedes habilitar **Highlight updates** en la pestaña Components para ver qué componentes re-renderizan en tiempo real (un borde azul parpadea en cada re-render).

**Regla práctica:** no optimices sin medir. El Profiler te muestra dónde están los problemas reales, no los imaginados.

---

## Anti-patterns

- **Memoizar todo por defecto.** Con React Compiler, `useMemo` y `useCallback` manuales son innecesarios en la mayoría de los casos. Si no usas el Compiler, memoiza solo después de medir con el Profiler.
- **Objetos y arrays inline en JSX props.** `<Child style={{ color: 'red' }} />` crea un objeto nuevo en cada render, rompiendo `React.memo`. Extrae a constantes o usa `useMemo`.
- **Optimizar sin profiling.** Agregar `memo` a 50 componentes "por si acaso" agrega complejidad sin beneficio medible. Mide primero con el Profiler.
- **`React.lazy` para componentes pequeños.** El overhead de un chunk separado (request HTTP adicional) supera el ahorro. Úsalo para features grandes (dashboards, editores, modales complejos).

---

## Puntos Clave

- `React.memo` evita re-renders cuando las props no cambian, pero necesita referencias estables.
- `useMemo`/`useCallback` estabilizan referencias. React Compiler los hace innecesarios en la mayoría de los casos.
- `React.lazy` + `Suspense` dividen el bundle por componente, similar a `@defer` en Angular.
- `startTransition` marca actualizaciones no urgentes para que el input del usuario no se bloquee.
- Siempre mide antes de optimizar: el React Profiler muestra dónde están los problemas reales.

---

[← Volver a Etapa 5](../README.md)


