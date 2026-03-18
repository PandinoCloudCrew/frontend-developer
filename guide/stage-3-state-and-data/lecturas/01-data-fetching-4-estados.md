# Data Fetching: Los 4 Estados de los Datos

Cada vista que depende de datos de un servidor existe en uno de cuatro estados: loading, success, error o empty. Si no manejas los cuatro explicitamente, tus usuarios veran pantallas en blanco, errores confusos o interfaces que no responden.

---

## Los 4 Estados

Cada vista dependiente de datos debe manejar estos estados. Sin excepciones.

```typescript
type DataState<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error }
  | { status: "empty" };
```

```tsx
function UserList() {
  const { status, data, error } = useUsers();

  switch (status) {
    case "loading": return <UserListSkeleton />;
    case "error":   return <ErrorMessage error={error} onRetry={refetch} />;
    case "empty":   return <EmptyState message="No users yet" action={<InviteButton />} />;
    case "success": return <List items={data} renderItem={UserRow} />;
  }
}
```

Modela estos estados explicitamente. No te apoyes en verificaciones implicitas como `if (!data && !error)` — eso es fragil y dificil de razonar.

## Estados de Loading

**Skeleton screens** — formas placeholder que coinciden con el layout del contenido. Usalos cuando el layout es predecible.

```css
.skeleton {
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}
@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

```jsx
function UserCardSkeleton() {
  return (
    <div className="user-card">
      <div className="skeleton" style={{ width: 48, height: 48, borderRadius: "50%" }} />
      <div className="skeleton" style={{ width: 120, height: 16 }} />
      <div className="skeleton" style={{ width: 80, height: 14 }} />
    </div>
  );
}
```

**Spinners** — usalos para areas pequenas e impredecibles (un boton enviando, un dropdown cargando opciones).

**Barras de progreso** — usalas cuando puedes medir el progreso (carga de archivos, procesos de varios pasos).

| Tipo de loading | Cuando usarlo                              |
|-----------------|--------------------------------------|
| Skeleton screen | El layout es predecible, el contenido varia |
| Spinner         | Area pequena, duracion impredecible   |
| Barra de progreso | El progreso es medible               |

Retrasa mostrar indicadores de loading para operaciones rapidas. Si los datos llegan en menos de 200ms, mostrar un skeleton e inmediatamente reemplazarlo crea un destello que distrae.

```tsx
function useDelayedLoading(isLoading: boolean, delayMs = 200) {
  const [showLoading, setShowLoading] = useState(false);
  useEffect(() => {
    if (!isLoading) { setShowLoading(false); return; }
    const timer = setTimeout(() => setShowLoading(true), delayMs);
    return () => clearTimeout(timer);
  }, [isLoading, delayMs]);
  return showLoading;
}
```

## Estado de Success

El caso directo — pero no ignores los datos parciales. Las APIs a veces retornan objetos incompletos. Defiendete contra campos faltantes.

```tsx
function UserProfile({ user }) {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email ?? "No email provided"}</p>
      {user.avatar ? <img src={user.avatar} alt="" /> : <AvatarPlaceholder />}
    </div>
  );
}
```

## Estados de Error

Los errores no son opcionales — son una funcionalidad. Un buen estado de error le dice al usuario que paso, si es temporal y que puede hacer al respecto.

```tsx
function ErrorMessage({ error, onRetry }) {
  const message = getErrorMessage(error);
  return (
    <div role="alert" className="error-state">
      <p>{message}</p>
      {onRetry && <button onClick={onRetry}>Try again</button>}
    </div>
  );
}

function getErrorMessage(error: Error): string {
  if (error instanceof NetworkError) {
    return "Unable to connect. Check your internet and try again.";
  }
  if (error instanceof AuthError) {
    return "Your session has expired. Please sign in again.";
  }
  if (error instanceof NotFoundError) {
    return "This content doesn't exist or has been removed.";
  }
  return "Something unexpected happened. Please try again.";
}
```

Distingue los tipos de error y proporciona orientacion accionable:

| Tipo de error | Mensaje al usuario                          | Accion de recuperacion    |
|--------------|---------------------------------------------|-------------------------|
| Red          | "Unable to connect. Check your internet."   | Boton de reintentar     |
| Auth (401)   | "Session expired."                          | Redirigir a login       |
| No encontrado | "This item no longer exists."              | Enlace de vuelta a la lista |
| Servidor (500) | "We're having trouble. Try again shortly."| Boton de reintentar + enlace de soporte |
| Validacion   | Mensajes especificos por campo              | Resaltar campos invalidos |

## Estados Vacios

Un estado vacio es una oportunidad. Le dice a los usuarios por que no hay nada aqui y que pueden hacer a continuacion.

```tsx
// Bad: nothing
<div></div>

// Bad: generic
<p>No data.</p>

// Good: helpful, actionable
function EmptyState({ title, description, action }) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      <p>{description}</p>
      {action}
    </div>
  );
}

<EmptyState
  title="No projects yet"
  description="Create your first project to get started."
  action={<button onClick={openNewProject}>Create Project</button>}
/>
```

Diferencia entre "no existen datos" y "ningun resultado coincide con tus filtros":

```tsx
if (items.length === 0 && hasActiveFilters) {
  return <EmptyState
    title="No results found"
    description="Try adjusting your filters."
    action={<button onClick={clearFilters}>Clear filters</button>}
  />;
}
if (items.length === 0) {
  return <EmptyState
    title="No projects yet"
    description="Create your first project to get started."
    action={<button onClick={create}>Create Project</button>}
  />;
}
```

## Combinando Estados: El Flujo Completo

Un flujo completo de data fetching maneja las transiciones entre estados:

```
Initial render → Loading → Success
                        ↘ Error → Retry → Loading → Success
                                                  ↘ Error (show support link)
```

```tsx
function DataView() {
  const { data, error, isLoading, refetch, retryCount } = useData();

  if (isLoading) return <Skeleton />;

  if (error) {
    return (
      <ErrorState
        error={error}
        onRetry={retryCount < 3 ? refetch : undefined}
        showSupport={retryCount >= 3}
      />
    );
  }

  if (data.length === 0) return <EmptyState />;

  return <DataList items={data} />;
}
```

## Mejores Practicas para Skeleton Screens

Haz que el skeleton coincida con el layout del contenido para prevenir layout shift:

```tsx
// The skeleton and the real content should occupy the same space
function ArticleSkeleton() {
  return (
    <article className="article">
      <div className="skeleton" style={{ width: "60%", height: 28 }} />
      <div className="skeleton" style={{ width: "30%", height: 14, marginTop: 8 }} />
      <div className="skeleton" style={{ width: "100%", height: 14, marginTop: 24 }} />
      <div className="skeleton" style={{ width: "100%", height: 14, marginTop: 4 }} />
      <div className="skeleton" style={{ width: "75%", height: 14, marginTop: 4 }} />
    </article>
  );
}
```

Usa el mismo contenedor, el mismo espaciado, las mismas dimensiones. Cuando el contenido real carga, solo cambia el contenido — no el layout.

## Patrones de Framework

**React Suspense** — limites de loading declarativos:

```tsx
<Suspense fallback={<UserListSkeleton />}>
  <UserList />
</Suspense>
```

**Vue `<Suspense>`** — concepto similar:

```vue
<Suspense>
  <template #default><UserList /></template>
  <template #fallback><UserListSkeleton /></template>
</Suspense>
```

**Angular** — `@defer` con templates de loading y error:

```html
@defer {
  <user-list />
} @loading {
  <user-list-skeleton />
} @error {
  <error-message />
}
```

## Errores Comunes

**Sin estado de loading.** La pagina esta en blanco por dos segundos, luego aparece el contenido. El usuario piensa que la pagina esta rota.

**Destello de loading.** Mostrar un spinner por 50ms en una conexion rapida crea un parpadeo molesto. Agrega un retraso minimo antes de mostrar indicadores de loading (200-300ms).

**Bloques catch vacios.** `catch (e) {}` — el error se traga, el usuario no ve nada, el desarrollador no tiene informacion de depuracion. Siempre maneja los errores de forma visible.

**Loading de pagina completa para datos parciales.** Solo la seccion de comentarios esta cargando, pero toda la pagina muestra un spinner. Delimita los estados de loading al area relevante mas pequena.

**Estados de error sin recuperacion.** "Something went wrong." Y luego que? Siempre dale al usuario un siguiente paso: reintentar, volver atras, contactar soporte, refrescar la pagina.

**Layout shift al cargar.** El skeleton tiene 200px de alto, el contenido real tiene 400px. Todo lo de abajo salta. Haz que las dimensiones del skeleton coincidan con las del contenido real.

## Puntos Clave

- Cada vista de datos tiene exactamente cuatro estados: loading, success, error, empty. Maneja los cuatro explicitamente.
- Usa skeleton screens cuando el layout es predecible. Retrasa mostrar indicadores de loading para operaciones menores a 200ms.
- Los mensajes de error deben decirle al usuario que hacer, no solo que salio mal.
- Los estados vacios son una oportunidad de diseno — guia a los usuarios hacia su siguiente accion.
- Delimita los estados de loading y error a la seccion relevante mas pequena de la pagina, no a la vista completa.
