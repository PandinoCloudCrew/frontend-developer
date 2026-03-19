# React Router y URL como Estado



> Cómo usar React Router v7 para navegación, parámetros de ruta, search params como estado, protección de rutas y loaders. La URL como fuente de verdad para el estado de la aplicación.

---

## Contenido
- [Configuración de rutas](#configuración-de-rutas)
- [Route params con useParams](#route-params-con-useparams)
- [Search params como estado](#search-params-como-estado)
- [Navegación](#navegación)
- [Protección de rutas](#protección-de-rutas)
- [Loaders para data fetching](#loaders-para-data-fetching)
- [Anti-patterns](#anti-patterns)

---

## Configuración de Rutas

```bash
npm install react-router
```

```
// src/router.tsx
import { createBrowserRouter, RouterProvider } from 'react-router';
import { lazy, Suspense } from 'react';

// Lazy loading de páginas
const ProductList = lazy(() => import('./pages/ProductList'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/products" replace /> },
  { path: '/products', element: <ProductList /> },
  { path: '/products/:id', element: <ProductDetail /> },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  { path: '*', element: <NotFound /> },
]);

// En App.tsx o main.tsx
function App() {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
```

- **`createBrowserRouter`:** crea el router con la configuración de rutas.
- **`RouterProvider`:** renderiza el router en la aplicación.
- **`lazy` + `Suspense`:** carga las páginas solo cuando se navega a ellas.

---

## Route Params con `useParams`

```
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';

function ProductDetail() {
  const { id } = useParams<{ id: string }>();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetch(`/api/products/${id}`).then(res => res.json()),
    enabled: !!id,
  });

  if (isLoading) return <p>Cargando...</p>;
  if (!product) return <p>Producto no encontrado</p>;

  return (
    <article>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
    </article>
  );
}
```

`useParams` en React ≈ `ActivatedRoute.paramMap` en Angular. Ambos leen parámetros de la URL como `/products/:id`.

---

## Search Params como Estado

Los query params (`?q=teclado&sort=price`) son estado que el usuario puede compartir, guardar en favoritos y navegar con el botón de atrás:

```
import { useSearchParams } from 'react-router';

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q') ?? '';
  const sort = searchParams.get('sort') ?? 'name';

  function updateSearch(newQuery: string) {
    setSearchParams(prev => {
      if (newQuery) {
        prev.set('q', newQuery);
      } else {
        prev.delete('q');
      }
      return prev;
    });
  }

  function updateSort(newSort: string) {
    setSearchParams(prev => {
      prev.set('sort', newSort);
      return prev;
    });
  }

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={e => updateSearch(e.target.value)}
        placeholder="Buscar productos..."
      />

      <select value={sort} onChange={e => updateSort(e.target.value)}>
        <option value="name">Nombre</option>
        <option value="price">Precio</option>
      </select>

      {/* La lista de productos usa query y sort para filtrar */}
    </div>
  );
}
```

La URL `https://myapp.com/products?q=teclado&sort=price` es compartible, bookmarkable y sobrevive a un refresh.

`useSearchParams` en React ≈ `ActivatedRoute.queryParamMap` en Angular.

---

## Navegación

### Declarativa con `&lt;Link>` y `&lt;NavLink>`

```
import { Link, NavLink } from 'react-router';

function Navigation() {
  return (
    <nav>
      {/* NavLink agrega className "active" automáticamente */}
      <NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''}>
        Productos
      </NavLink>
      <NavLink to="/about">Acerca de</NavLink>

      {/* Link simple sin estado activo */}
      <Link to="/products/123">Ver producto 123</Link>
    </nav>
  );
}
```

### Programática con `useNavigate`

```
import { useNavigate } from 'react-router';

function ProductCard({ id }: { id: string }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/products/${id}`);
  }

  function handleGoBack() {
    navigate(-1); // equivalente a history.back()
  }

  return (
    <article onClick={handleClick}>
      <button onClick={handleGoBack}>Volver</button>
    </article>
  );
}
```

---

## Protección de Rutas

React Router no tiene guards como Angular. En su lugar, usas un componente wrapper:

```
import { Navigate, useLocation } from 'react-router';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirige a login guardando la URL original
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}
```

```
// Uso en la configuración de rutas
{
  path: '/admin',
  element: (
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  ),
}
```

```
// En la página de login, redirige de vuelta después del login
function LoginPage() {
  const location = useLocation();
  const from = (location.state as { from?: string })?.from ?? '/';

  async function handleLogin(data: LoginData) {
    await login(data);
    navigate(from, { replace: true });
  }

  // ...
}
```

---

## Loaders para Data Fetching

React Router v7 soporta loaders que cargan datos antes de renderizar la ruta:

```
import { useLoaderData } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';

async function productLoader({ params }: LoaderFunctionArgs) {
  const res = await fetch(`/api/products/${params.id}`);
  if (!res.ok) throw new Response('Not found', { status: 404 });
  return res.json();
}

function ProductDetail() {
  const product = useLoaderData() as Product;
  return <h1>{product.name}</h1>;
}

// En la configuración de rutas
{
  path: '/products/:id',
  element: <ProductDetail />,
  loader: productLoader,
}
```

Los loaders son útiles para pre-cargar datos durante la navegación. Son comparables a los resolvers de Angular Router.

---

## Anti-patterns

- **No usar la URL para filtros y paginación.** Si un filtro, página o tab activo están en estado local (`useState`), el usuario no puede compartir el enlace ni usar el botón de atrás. Usa `useSearchParams`.
- **Auth check solo en el cliente.** `ProtectedRoute` evita que se renderice una página, pero no protege la API. El servidor debe validar la autenticación en cada request independientemente.
- **Duplicar estado de la URL en `useState`.** Si la URL tiene `?q=teclado`, no copies ese valor a un `useState`. Lee directamente de `searchParams.get('q')`. Una sola fuente de verdad.
- **No manejar rutas inexistentes.** Sin una ruta `path: '*'` con un componente 404, las URLs inválidas muestran una página en blanco.

---

## Puntos Clave

- `createBrowserRouter` + `RouterProvider` es la API moderna de React Router v7.
- `useParams` lee parámetros de ruta (`/products/:id`). `useSearchParams` lee y escribe query params.
- La URL es estado compartible y bookmarkable. Úsala para filtros, ordenamiento y paginación.
- Protege rutas con un componente wrapper `&lt;ProtectedRoute>` --- React Router no tiene guards built-in.
- Los loaders pre-cargan datos durante la navegación, similares a los resolvers de Angular.


