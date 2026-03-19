# Data Fetching en React



> Cómo obtener datos de APIs en React. Cubre el patrón `fetch` + `useEffect` (y sus problemas), TanStack Query como solución estándar, estados de loading/error y Suspense en React 19.

---

## Contenido
- [fetch + useEffect: el patrón ingenuo](#fetch--useeffect-el-patrón-ingenuo)
- [TanStack Query: la solución estándar](#tanstack-query-la-solución-estándar)
- [Mutations con useMutation](#mutations-con-usemutation)
- [Loading, error y empty states](#loading-error-y-empty-states)
- [Suspense para data fetching](#suspense-para-data-fetching)
- [Anti-patterns](#anti-patterns)

---

## `fetch` + `useEffect`: El Patrón Ingenuo

El enfoque más básico para cargar datos en React:

<<< @/snippets/react/s3-03-data-fetching-react-01.tsx

**Problemas de este enfoque:**
- **3 `useState` por cada fetch.** Boilerplate repetitivo en cada componente.
- **Race conditions.** Sin el flag `cancelled`, un cambio rápido de filtros puede mostrar datos obsoletos.
- **Sin cache.** Si el usuario navega y vuelve, se hace otro request. Sin deduplicación si dos componentes piden los mismos datos.
- **Sin refetch automático.** No actualiza datos cuando el usuario vuelve a la pestaña.

**No uses este patrón para data fetching real. Usa TanStack Query.**

---

## TanStack Query: La Solución Estándar

TanStack Query (antes React Query) gestiona data fetching con cache, deduplicación, refetch automático y estados integrados:

```bash
npm install @tanstack/react-query
```

```
// main.tsx — configurar el QueryClient
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
```

```
import { useQuery } from '@tanstack/react-query';

interface User {
  id: string;
  name: string;
  email: string;
}

function UserList() {
  const { data: users, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('/api/users');
      if (!res.ok) throw new Error('Error al cargar usuarios');
      return res.json() as Promise<User[]>;
    },
  });

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {users?.map(user => (
        <li key={user.id}>{user.name} --- {user.email}</li>
      ))}
    </ul>
  );
}
```

- **`queryKey`:** identifica esta consulta. Si dos componentes usan la misma key, comparten el cache y solo hacen un request.
- **`queryFn`:** la función que obtiene los datos. Debe lanzar error en caso de fallo.
- **Cache automático:** los datos se cachean y se sirven inmediatamente en la siguiente visita mientras se revalidan en el fondo.

### Query con parámetros

```
function ProductList({ category }: { category: string }) {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products', category], // refetch cuando category cambia
    queryFn: () =>
      fetch(`/api/products?category=${category}`).then(res => res.json()),
  });

  // ...
}
```

En Angular usas `httpResource` para data fetching declarativo con estados integrados. En React, TanStack Query cumple el mismo rol: `useQuery` es comparable a `httpResource`.

---

## Mutations con `useMutation`

Para operaciones de escritura (POST, PUT, DELETE):

```
import { useMutation, useQueryClient } from '@tanstack/react-query';

function AddUserForm() {
  const queryClient = useQueryClient();

  const createUser = useMutation({
    mutationFn: async (data: { name: string; email: string }) => {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Error al crear usuario');
      return res.json();
    },
    onSuccess: () => {
      // Invalidar la cache para que la lista se actualice
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  function handleSubmit(data: { name: string; email: string }) {
    createUser.mutate(data);
  }

  return (
    <form onSubmit={/* ... */}>
      {createUser.isPending && <p>Guardando...</p>}
      {createUser.isError && <p>Error: {createUser.error.message}</p>}
      {/* ... campos del formulario */}
    </form>
  );
}
```

`invalidateQueries` marca la cache como obsoleta y dispara un refetch automático. No necesitas actualizar la lista manualmente.

---

## Loading, Error y Empty States

TanStack Query proporciona todos los estados necesarios:

```
function ProductList({ category }: { category: string }) {
  const { data: products, isLoading, isError, error } = useQuery({
    queryKey: ['products', category],
    queryFn: () => fetchProducts(category),
  });

  if (isLoading) {
    return <SkeletonList count={6} />;
  }

  if (isError) {
    return (
      <ErrorMessage
        message={error.message}
        onRetry={() => queryClient.invalidateQueries({ queryKey: ['products', category] })}
      />
    );
  }

  if (!products || products.length === 0) {
    return <EmptyState message="No hay productos en esta categoría" />;
  }

  return (
    <ul>
      {products.map(p => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}
```

Siempre cubre los 4 estados: **loading**, **error**, **empty** y **success**.

---

## Suspense para Data Fetching

React 19 permite usar Suspense con TanStack Query para un patrón más declarativo:

```
import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';

function UserList() {
  // useSuspenseQuery nunca retorna isLoading — Suspense maneja el loading
  const { data: users } = useSuspenseQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}

// El componente padre define el fallback de loading
function UsersPage() {
  return (
    <Suspense fallback={<SkeletonList count={6} />}>
      <UserList />
    </Suspense>
  );
}
```

Suspense mueve la responsabilidad del loading state del componente hijo al padre. El componente que carga datos se simplifica --- solo maneja el caso de éxito.

---

## Anti-patterns

- **`useEffect` + `useState` para data fetching.** Es el error más común en React. Siempre usa TanStack Query (o una solución equivalente). Maneja cache, deduplicación, refetch y estados por ti.
- **No manejar loading y error.** Un componente que muestra datos pero no muestra un skeleton durante la carga ni un mensaje de error cuando falla es una mala experiencia de usuario.
- **Hacer fetch en el componente en vez de en un hook.** Extrae la lógica de fetching a un custom hook (`useUsers`, `useProducts`). El componente solo consume datos.
- **No invalidar la cache después de una mutación.** Si creas un usuario y no invalidas la query de `['users']`, la lista no se actualiza hasta que el usuario refresque la página.

---

## Puntos Clave

- TanStack Query es la solución estándar para data fetching en React. No uses `useEffect` + `useState`.
- `useQuery` para leer datos. `useMutation` + `invalidateQueries` para escribir y actualizar la cache.
- Siempre cubre los 4 estados: loading, error, empty, success.
- `useSuspenseQuery` + `&lt;Suspense>` simplifican el componente moviendo el loading state al padre.
- TanStack Query en React ≈ `httpResource` en Angular: data fetching declarativo con estados integrados.


