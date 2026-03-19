# Arquitectura React a Escala



[← Volver a Etapa 8](../README.md)

> Cómo organizar aplicaciones React grandes. Cubre estructura por features, meta-frameworks (Next.js, Remix), lazy routes, state management a escala y monorepos.

## Contenido

- [Estructura por features](#estructura-por-features)
- [Meta-frameworks](#meta-frameworks)
- [Lazy routes](#lazy-routes)
- [State management a escala](#state-management-a-escala)
- [Monorepos](#monorepos)
- [Anti-patterns](#anti-patterns)
- [Puntos clave](#puntos-clave)

---

## Estructura por features

En aplicaciones grandes, organizar por tipo de archivo (`components/`, `hooks/`, `services/`) no escala. Cada feature nueva toca 5 carpetas distintas. Organizar por feature agrupa todo lo relacionado en un solo directorio:

```
src/
  features/
    auth/
      components/
        LoginForm.tsx
        RegisterForm.tsx
      hooks/
        useAuth.ts
      services/
        auth.service.ts
      types/
        auth.types.ts
      index.ts              ← public API of this feature
    checkout/
      components/
        Cart.tsx
        PaymentForm.tsx
      hooks/
        useCart.ts
      services/
        checkout.service.ts
      index.ts
    products/
      ...
  shared/
    components/
      Button.tsx
      Spinner.tsx
    hooks/
      useDebouncedValue.ts
    utils/
      formatCurrency.ts
  app/
    App.tsx
    routes.tsx
    providers.tsx
```

Cada feature expone una API publica a traves de `index.ts`. Los componentes de otras features importan desde el `index.ts`, nunca desde archivos internos:

```
// GOOD — import from the feature's public API
import { LoginForm } from '@/features/auth';

// BAD — reaching into internal files
import { LoginForm } from '@/features/auth/components/LoginForm';
```

El concepto es identico en Angular: la guia de Angular organiza por features con `public-api.ts`. La diferencia es que Angular tiene mecanismos formales (library projects, Nx boundaries) para enforcer los limites.

---

## Meta-frameworks

### Next.js (App Router)

Next.js es el meta-framework dominante del ecosistema React. El App Router (v13+) introduce Server Components, layouts anidados y streaming SSR:

```
app/
  layout.tsx              ← root layout (wraps all pages)
  page.tsx                ← / route
  products/
    page.tsx              ← /products route
    [id]/
      page.tsx            ← /products/:id route
  api/
    users/
      route.ts            ← API route: /api/users
```

```
// app/products/page.tsx — Server Component by default
async function ProductsPage() {
  const products = await fetch('https://api.example.com/products').then(r => r.json());

  return (
    <ul>
      {products.map((p: Product) => (
        <li key={p.id}>{p.name} — ${p.price}</li>
      ))}
    </ul>
  );
}

export default ProductsPage;
```

**Features de Next.js:**
- **File-based routing:** los archivos en `app/` se convierten en rutas automaticamente.
- **Server Components:** componentes que se renderizan en el servidor, sin JavaScript en el client.
- **SSR / SSG / ISR:** renderizado en servidor, generacion estatica y revalidacion incremental.
- **API routes:** endpoints de API colocados junto a las paginas.

### Remix / React Router v7

Remix (ahora integrado en React Router v7) se enfoca en web standards y progressive enhancement:

```
// app/routes/products.tsx
import type { LoaderFunctionArgs } from 'react-router';

export async function loader({ request }: LoaderFunctionArgs) {
  const products = await fetchProducts();
  return { products };
}

export default function Products({ loaderData }: { loaderData: { products: Product[] } }) {
  return (
    <ul>
      {loaderData.products.map(p => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}
```

### Cuando usar cada opcion

| Escenario | Herramienta |
|-----------|-------------|
| App publica con SEO (e-commerce, blog, marketing) | Next.js |
| App con progressive enhancement y web standards | Remix / React Router v7 |
| SPA interna (dashboard, admin panel, herramienta interna) | React + Vite |

En Angular, Analog cumple el rol de Next.js: file-based routing, API routes, SSR/SSG, powered by Vite + Nitro.

---

## Lazy routes

`React.lazy` + `Suspense` dividen el bundle por ruta. Cada pagina se descarga solo cuando el usuario navega a ella:

```
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';

const Products = lazy(() => import('./features/products/pages/ProductList'));
const ProductDetail = lazy(() => import('./features/products/pages/ProductDetail'));
const Checkout = lazy(() => import('./features/checkout/pages/Checkout'));
const Admin = lazy(() => import('./features/admin/pages/AdminDashboard'));

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

Esto es equivalente a `loadChildren` en Angular Router: cada `lazy()` crea un chunk separado que solo se descarga cuando el usuario navega a esa ruta.

Si usas Next.js, el code splitting por ruta es automatico --- no necesitas `React.lazy`.

---

## State management a escala

En aplicaciones grandes, no todo el estado se maneja igual. La recomendacion actual es separar por tipo de estado:

| Tipo de estado | Herramienta | Ejemplo |
|---------------|-------------|---------|
| **Server state** (datos del API) | TanStack Query | Lista de productos, perfil de usuario |
| **Client state** (UI global) | Zustand | Tema, sidebar abierto/cerrado, notificaciones |
| **URL state** | `useSearchParams` | Filtros, paginacion, orden |
| **Local state** | `useState` | Input de formulario, toggle |

### TanStack Query para server state

```
import { useQuery } from '@tanstack/react-query';

function ProductList() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetch('/api/products').then(r => r.json()),
  });

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;

  return products.map((p: Product) => <ProductCard key={p.id} product={p} />);
}
```

### Zustand para client state

```
import { create } from 'zustand';

interface UIStore {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));

// Usage in any component
function Sidebar() {
  const isOpen = useUIStore((state) => state.sidebarOpen);
  if (!isOpen) return null;
  return <nav>...</nav>;
}
```

En Angular, el equivalente es: signals + services para client state (similar a Zustand), `httpResource` o RxJS para server state (similar a TanStack Query), y router params para URL state.

---

## Monorepos

Para organizaciones con multiples aplicaciones React que comparten codigo, Nx y Turborepo son las herramientas principales:

### Nx

```bash
npx create-nx-workspace@latest my-org --preset=react-monorepo
nx generate @nx/react:app admin-panel
nx generate @nx/react:library shared-ui
```

```
my-org/
  apps/
    customer-portal/
    admin-panel/
  libs/
    shared/
      ui/                 ← shared components
      data-access/        ← shared API clients
      utils/              ← shared utilities
    feature-auth/         ← auth feature (used by both apps)
  nx.json
```

### Turborepo

```bash
npx create-turbo@latest my-org
```

```
my-org/
  apps/
    web/
    admin/
  packages/
    ui/                   ← shared component library
    config/               ← shared ESLint, TypeScript configs
  turbo.json
```

**Nx vs Turborepo:**
- **Nx** es mas opinionado y tiene mejor soporte para dependency graph, module boundaries y generadores de codigo.
- **Turborepo** es mas ligero y se integra mejor con el ecosistema Vercel.

Ambos proporcionan caching inteligente y ejecucion paralela. En Angular, Nx es la herramienta dominante para monorepos.

---

## Anti-patterns

- **Poner todo en `components/`.** Una carpeta plana con 200 componentes no comunica la arquitectura de la app. Organiza por features.
- **Redux para todo.** Redux agrega boilerplate significativo. Para server state, TanStack Query es mas simple y poderoso. Para client state liviano, Zustand o `useState` son suficientes.
- **Crear un framework custom en vez de usar Next.js/Remix.** Configurar SSR, code splitting, routing y data fetching manualmente es reinventar la rueda. Usa un meta-framework probado.
- **Features acopladas.** Feature A importa componentes internos de Feature B. Cuando B refactoriza, A se rompe. Exporta una API publica desde `index.ts` y respeta los limites.
- **Monorepo sin boundaries.** Sin reglas que limiten los imports entre proyectos, el monorepo se convierte en un monolito con dependencias circulares.

---

## Puntos Clave

- Organiza por features, no por tipo de archivo. Cada feature es un directorio autocontenido con su API publica.
- Next.js es el meta-framework dominante para SSR/SEO. Para SPAs internas, React + Vite es mas simple.
- `React.lazy` + `Suspense` dividen el bundle por ruta. En Next.js el code splitting es automatico.
- Separa el estado por tipo: TanStack Query para server state, Zustand para client state, URL params para filtros.
- Nx y Turborepo son las herramientas principales para monorepos React.

---

[← Volver a Etapa 8](../README.md)


