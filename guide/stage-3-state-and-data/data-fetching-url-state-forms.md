# Estado y Datos: Data Fetching, URL State y Formularios

> Material de lectura para la Etapa 3 — Estado y Flujo de Datos.
> Cubre patrones de UI para data fetching, gestión de estado en la URL y gestión de estado de formularios.

---

## Tema 3: Patrones de UI para Data Fetching

**Etapa 3 — Manejando los 4 Estados de los Datos**

### Por Qué Esto Importa

Cada vista que depende de datos de un servidor existe en uno de cuatro estados: loading, success, error o empty. Si no manejas los cuatro explícitamente, tus usuarios verán pantallas en blanco, errores confusos o interfaces que no responden. Esta es una de las fuentes más comunes de mala UX en aplicaciones web.

### Los 4 Estados

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

Modela estos estados explícitamente. No te apoyes en verificaciones implícitas como `if (!data && !error)` — eso es frágil y difícil de razonar.

### Estados de Loading

**Skeleton screens** — formas placeholder que coinciden con el layout del contenido. Úsalos cuando el layout es predecible.

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

**Spinners** — úsalos para áreas pequeñas e impredecibles (un botón enviando, un dropdown cargando opciones).

**Barras de progreso** — úsalas cuando puedes medir el progreso (carga de archivos, procesos de varios pasos).

| Tipo de loading | Cuándo usarlo                              |
|-----------------|--------------------------------------|
| Skeleton screen | El layout es predecible, el contenido varía |
| Spinner         | Área pequeña, duración impredecible   |
| Barra de progreso | El progreso es medible               |

Retrasa mostrar indicadores de loading para operaciones rápidas. Si los datos llegan en menos de 200ms, mostrar un skeleton e inmediatamente reemplazarlo crea un destello que distrae.

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

### Estado de Success

El caso directo — pero no ignores los datos parciales. Las APIs a veces retornan objetos incompletos. Defiéndete contra campos faltantes.

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

### Estados de Error

Los errores no son opcionales — son una funcionalidad. Un buen estado de error le dice al usuario qué pasó, si es temporal y qué puede hacer al respecto.

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

Distingue los tipos de error y proporciona orientación accionable:

| Tipo de error | Mensaje al usuario                          | Acción de recuperación    |
|--------------|---------------------------------------------|-------------------------|
| Red          | "Unable to connect. Check your internet."   | Botón de reintentar     |
| Auth (401)   | "Session expired."                          | Redirigir a login       |
| No encontrado | "This item no longer exists."              | Enlace de vuelta a la lista |
| Servidor (500) | "We're having trouble. Try again shortly."| Botón de reintentar + enlace de soporte |
| Validación   | Mensajes específicos por campo              | Resaltar campos inválidos |

### Estados Vacíos

Un estado vacío es una oportunidad. Le dice a los usuarios por qué no hay nada aquí y qué pueden hacer a continuación.

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

Diferencia entre "no existen datos" y "ningún resultado coincide con tus filtros":

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

### Combinando Estados: El Flujo Completo

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

### Mejores Prácticas para Skeleton Screens

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

### Patrones de Framework

**React Suspense** — límites de loading declarativos:

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

### Errores Comunes

**Sin estado de loading.** La página está en blanco por dos segundos, luego aparece el contenido. El usuario piensa que la página está rota.

**Destello de loading.** Mostrar un spinner por 50ms en una conexión rápida crea un parpadeo molesto. Agrega un retraso mínimo antes de mostrar indicadores de loading (200-300ms).

**Bloques catch vacíos.** `catch (e) {}` — el error se traga, el usuario no ve nada, el desarrollador no tiene información de depuración. Siempre maneja los errores de forma visible.

**Loading de página completa para datos parciales.** Solo la sección de comentarios está cargando, pero toda la página muestra un spinner. Delimita los estados de loading al área relevante más pequeña.

**Estados de error sin recuperación.** "Something went wrong." ¿Y luego qué? Siempre dale al usuario un siguiente paso: reintentar, volver atrás, contactar soporte, refrescar la página.

**Layout shift al cargar.** El skeleton tiene 200px de alto, el contenido real tiene 400px. Todo lo de abajo salta. Haz que las dimensiones del skeleton coincidan con las del contenido real.

### Puntos Clave

- Cada vista de datos tiene exactamente cuatro estados: loading, success, error, empty. Maneja los cuatro explícitamente.
- Usa skeleton screens cuando el layout es predecible. Retrasa mostrar indicadores de loading para operaciones menores a 200ms.
- Los mensajes de error deben decirle al usuario qué hacer, no solo qué salió mal.
- Los estados vacíos son una oportunidad de diseño — guía a los usuarios hacia su siguiente acción.
- Delimita los estados de loading y error a la sección relevante más pequeña de la página, no a la vista completa.

---

## Tema 4: URL State Management

**Etapa 3 — La URL como Gestor de Estado**

### Por Qué Esto Importa

La URL es el gestor de estado más subutilizado en el desarrollo frontend. Está integrada en el navegador. Es compartible. Sobrevive a refrescar la página. Soporta navegación hacia atrás/adelante. Habilita server-side rendering. Y aun así, la mayoría de los desarrolladores almacenan el estado de filtros, búsquedas y paginación en el estado del componente — que se evapora en el momento en que alguien comparte un enlace o refresca la página.

### Qué Pertenece en la URL

URL state es el estado que debería sobrevivir al compartir una página. Pregúntate: "Si alguien copia esta URL y se la envía a un colega, ¿deberían ver la misma vista?"

**Sí — ponlo en la URL:**

| Tipo de estado  | URL de ejemplo                                 |
|-----------------|------------------------------------------------|
| Consulta de búsqueda | `?q=typescript`                           |
| Filtros         | `?status=active&role=admin`                    |
| Paginación      | `?page=3&pageSize=25`                          |
| Orden           | `?sort=name&dir=asc`                           |
| Tab activo      | `?tab=settings`                                |
| Elemento seleccionado | `/users/42` o `?selected=42`             |
| Modo de vista   | `?view=grid`                                   |

**No — mantenlo fuera de la URL:**

| Tipo de estado        | Por qué no la URL                                  |
|-----------------------|----------------------------------------------------|
| Input de formulario a medio escribir | Cambia con demasiada frecuencia, no es estado compartible |
| Tooltip/dropdown abierto | Estado de UI efímero, irrelevante para otro usuario |
| Tokens de auth        | Riesgo de seguridad — las URLs se registran y comparten |
| Modal abierto/cerrado | Generalmente efímero (aunque los modales con deep-link son una excepción) |
| Posición de scroll    | El navegador maneja esto automáticamente            |

### La API `URLSearchParams`

No necesitas una librería. El navegador tiene esto integrado.

```javascript
// Read parameters from the current URL
const params = new URLSearchParams(window.location.search);
const query = params.get("q");         // "typescript" or null
const page = Number(params.get("page")) || 1;
const tags = params.getAll("tag");     // ["react", "vue"]

// Build new parameters
const newParams = new URLSearchParams();
newParams.set("q", "typescript");
newParams.set("page", "3");
newParams.append("tag", "react");
newParams.append("tag", "vue");
console.log(newParams.toString()); // "q=typescript&page=3&tag=react&tag=vue"
```

```javascript
// Update the URL without a page reload
function setUrlParams(params: Record<string, string>) {
  const url = new URL(window.location.href);
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
    else url.searchParams.delete(key);
  });
  window.history.pushState({}, "", url);
}
```

### Integración con Frameworks

**React Router — `useSearchParams`:**

```tsx
import { useSearchParams } from "react-router-dom";

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") ?? "all";
  const page = Number(searchParams.get("page")) || 1;

  const setCategory = (cat: string) => {
    setSearchParams((prev) => {
      prev.set("category", cat);
      prev.set("page", "1"); // Reset page on filter change
      return prev;
    });
  };

  return (/* render with category and page */);
}
```

**Vue Router — `route.query`:**

```vue
<script setup>
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const router = useRouter();

const category = computed(() => route.query.category ?? 'all');
const page = computed(() => Number(route.query.page) || 1);

function setCategory(cat) {
  router.push({ query: { ...route.query, category: cat, page: '1' } });
}
</script>
```

**Angular — `ActivatedRoute`:**

```typescript
@Component({ /* ... */ })
export class ProductListComponent {
  category$ = this.route.queryParamMap.pipe(
    map(params => params.get('category') ?? 'all')
  );
  page$ = this.route.queryParamMap.pipe(
    map(params => Number(params.get('page')) || 1)
  );

  constructor(private route: ActivatedRoute, private router: Router) {}

  setCategory(cat: string) {
    this.router.navigate([], {
      queryParams: { category: cat, page: 1 },
      queryParamsHandling: 'merge',
    });
  }
}
```

### La URL como Fuente Única de Verdad

Este es el concepto crítico. La URL no debería ser un espejo del estado del componente — debería ser la fuente.

```tsx
// Wrong: state is the source, URL is a mirror
function SearchPage() {
  const [query, setQuery] = useState("");
  useEffect(() => {
    // Syncing state → URL is fragile, leads to race conditions
    setUrlParam("q", query);
  }, [query]);
}

// Right: URL is the source, component reads from it
function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const setQuery = (q: string) => {
    setSearchParams({ q }); // URL changes, component re-renders, done
  };
}
```

Cuando la URL es la fuente, no hay problema de sincronización. La URL cambia, el componente lee el nuevo valor, la UI se actualiza. Una dirección.

### Codificando Estado Complejo

**Arrays:** Usa claves repetidas o separación por comas.

```javascript
// Repeated keys (standard-compliant)
// ?tag=react&tag=vue → params.getAll("tag") → ["react", "vue"]

// Comma-separated (simpler URLs)
// ?tags=react,vue → params.get("tags").split(",") → ["react", "vue"]
```

**Valores predeterminados:** Omite los valores predeterminados de la URL para mantenerla limpia.

```typescript
function buildSearchUrl(filters: Filters): string {
  const params = new URLSearchParams();
  // Only add non-default values
  if (filters.query) params.set("q", filters.query);
  if (filters.page > 1) params.set("page", String(filters.page));
  if (filters.sort !== "relevance") params.set("sort", filters.sort);
  return `?${params.toString()}`;
}
```

### Errores Comunes

**Almacenar todo en la URL.** Borradores de formularios, estado de modales, acordeones abiertos/cerrados — esto infla la URL y confunde a los usuarios que la comparten.

**Ignorar el URL state al renderizar por primera vez.** La página carga en `/products?category=electronics&page=3` pero el componente se inicializa con `category = "all"` y `page = 1`, ignorando la URL. Siempre lee de la URL al montar.

```tsx
// Wrong: ignores URL on mount
const [page, setPage] = useState(1);

// Right: reads from URL on mount
const [searchParams] = useSearchParams();
const page = Number(searchParams.get("page")) || 1;
```

**No codificar la entrada del usuario.** Si un usuario busca `price > 100 & sale`, ese `&` romperá tus parámetros de URL. `URLSearchParams` maneja la codificación automáticamente — úsalo. Nunca concatenes strings de URL manualmente.

```javascript
// Dangerous: manual string concatenation
const url = `/search?q=${userInput}`; // XSS risk, encoding bugs

// Safe: URLSearchParams handles encoding
const params = new URLSearchParams({ q: userInput });
const url = `/search?${params}`;
```

**No reiniciar el estado dependiente.** El usuario está en la página 5, cambia el filtro de categoría, y la URL aún dice `page=5` — pero la nueva categoría solo tiene 2 páginas. Reinicia la paginación cuando los filtros cambien.

**Parámetros que no hacen roundtrip.** Si `parse(serialize(state)) !== state`, tendrás bugs sutiles. Prueba que tu codificación/decodificación de URL sea sin pérdida.

### Puntos Clave

- Si el estado debería sobrevivir al compartir un enlace, pertenece en la URL. Si no, no.
- La URL es la fuente de verdad, no un espejo del estado del componente. Lee de ella, no sincronices hacia ella.
- Usa `URLSearchParams` para la codificación — nunca concatenes strings de URL con entrada de usuario.
- Lee el URL state al renderizar por primera vez. Ignorarlo es uno de los bugs más comunes.
- Reinicia el estado dependiente (como paginación) cuando el estado independiente (como filtros) cambie.

---

## Tema 5: Form State Management

**Etapa 3 — Formularios como una Preocupación Distinta**

### Por Qué Esto Importa

Los formularios son el patrón interactivo más complejo en el desarrollo frontend. Un input de búsqueda tiene un estado. Un formulario de registro de múltiples pasos tiene docenas: valores de campo, errores de validación, estado touched, estado dirty, estado de envío, errores del servidor. Hacer los formularios mal significa que los usuarios pierden datos, ven errores confusos o envían información inválida. Los formularios merecen patrones dedicados porque combinan múltiples problemas difíciles a la vez.

### Por Qué los Formularios Son Especiales

Un formulario no es solo una colección de inputs. Tiene preocupaciones que el estado normal de UI no tiene:

| Preocupación      | Qué significa                                      |
|-------------------|----------------------------------------------------|
| **Values**        | Datos actuales en cada campo                       |
| **Errors**        | Mensajes de validación por campo y/o para todo el formulario |
| **Touched**       | ¿Ha interactuado el usuario con este campo?        |
| **Dirty**         | ¿Ha cambiado el valor respecto al valor inicial?   |
| **Submitting**    | ¿Se está enviando el formulario actualmente?       |
| **Submit count**  | ¿Cuántas veces ha intentado enviar el usuario?     |

Una llamada típica a `useState` gestiona un valor. Los formularios necesitan estado coordinado en todas estas dimensiones.

### Controlled vs Uncontrolled Forms

**Controlled forms** — el estado de React o del framework mantiene el valor de cada campo. Cada pulsación de tecla dispara una actualización de estado.

```tsx
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Log in</button>
    </form>
  );
}
```

Controlled: predecible, inspeccionable, fácil de validar en cada cambio. Pero verboso — cada campo necesita su propio estado y handler.

**Uncontrolled forms** — el DOM mantiene los valores. Los lees al enviar.

```tsx
function LoginForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    // submit { email, password }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" defaultValue="" />
      <input name="password" type="password" />
      <button type="submit">Log in</button>
    </form>
  );
}
```

Uncontrolled: simple, menos código, aprovecha el manejo de formularios integrado del navegador. Pero más difícil de validar antes de enviar, más difícil de habilitar/deshabilitar campos condicionalmente, más difícil de mostrar feedback en tiempo real.

| | Controlled | Uncontrolled |
|---|---|---|
| Volumen de código | Más | Menos |
| Validación en tiempo real | Fácil | Difícil |
| Rendimiento (muchos campos) | Puede ser lento (re-renders) | Mejor (sin re-renders) |
| Leer valores en cualquier momento | Sí | Solo al enviar |
| Mejor para | Formularios complejos con validación | Formularios simples, rendimiento crítico |

### Librerías de Formularios

Para cualquier cosa más allá de un formulario de login, usa una librería de formularios. Resuelven el problema de coordinación.

**React Hook Form** — el estándar actual para React. Uncontrolled por defecto para rendimiento, con campos controlled opcionales.

```tsx
import { useForm } from "react-hook-form";

function SignupForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: "", name: "" },
  });

  const onSubmit = (data) => api.createUser(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email", { required: "Email is required" })} />
      {errors.email && <span>{errors.email.message}</span>}
      <input {...register("name", { required: "Name is required" })} />
      {errors.name && <span>{errors.name.message}</span>}
      <button type="submit">Sign up</button>
    </form>
  );
}
```

**VeeValidate** — manejo de formularios para Vue:

```vue
<script setup>
import { useForm } from 'vee-validate';

const { handleSubmit, defineField, errors } = useForm({
  initialValues: { email: '', name: '' },
});

const [email, emailAttrs] = defineField('email');
const [name, nameAttrs] = defineField('name');

const onSubmit = handleSubmit((values) => api.createUser(values));
</script>
```

**Angular Reactive Forms** — integrados en el framework:

```typescript
@Component({ /* ... */ })
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.form.valid) api.createUser(this.form.value);
  }
}
```

### Estrategias de Validación

Cuándo validas importa tanto como qué validas.

**On change** — validar en cada pulsación de tecla. Feedback inmediato pero puede ser molesto ("Invalid email" mientras el usuario aún está escribiendo).

**On blur** — validar cuando el usuario abandona el campo. Le da tiempo al usuario para terminar de escribir antes de mostrar errores. Este es generalmente el mejor valor predeterminado.

**On submit** — validar cuando se envía el formulario. Menos intrusivo pero da el feedback más tardío. Los usuarios podrían llenar un formulario entero antes de enterarse de que el primer campo estaba mal.

La mejor UX suele ser una combinación:

```
First validation: on blur (or on submit)
Subsequent validation: on change (clear the error as soon as the user fixes it)
```

```tsx
// React Hook Form supports this out of the box
const { register, handleSubmit, formState: { errors } } = useForm({
  mode: "onBlur",           // First validation on blur
  reValidateMode: "onChange" // After first error, re-validate on change
});
```

### Validación Basada en Schemas

Define tus reglas de validación como un schema. Reutilízalo en cliente y servidor.

```typescript
import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Must be at least 8 characters"),
  age: z.number().min(13, "Must be at least 13 years old"),
});

// Use on the client with React Hook Form
import { zodResolver } from "@hookform/resolvers/zod";

const { register, handleSubmit } = useForm({
  resolver: zodResolver(signupSchema),
});

// Use on the server (same schema)
function handleSignup(body: unknown) {
  const result = signupSchema.safeParse(body);
  if (!result.success) return { errors: result.error.flatten() };
  createUser(result.data);
}
```

Una definición de schema. Dos contextos de validación. Cero divergencia entre las reglas del cliente y del servidor.

**Zod, Yup, Valibot** — todos cumplen este propósito. Zod tiene la integración más fuerte con TypeScript y es la opción más común en proyectos modernos. Valibot es la más pequeña (tree-shakable). Yup es la más antigua y la más probada en batalla.

### Formularios de Múltiples Pasos (Wizards)

Los formularios de múltiples pasos agregan complejidad: preservar estado entre pasos, validar por paso y permitir a los usuarios navegar hacia atrás sin perder datos.

```tsx
function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const updateFields = (fields: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  switch (step) {
    case 1: return <PersonalInfo data={formData} onUpdate={updateFields} onNext={next} />;
    case 2: return <Address data={formData} onUpdate={updateFields} onNext={next} onBack={back} />;
    case 3: return <Review data={formData} onSubmit={submitAll} onBack={back} />;
  }
}
```

Reglas clave para formularios de múltiples pasos:

1. **Valida cada paso independientemente.** No dejes que el usuario avance al paso 2 con datos inválidos del paso 1.
2. **Preserva el estado al navegar hacia atrás.** Volver al paso 1 debería mostrar los valores que ya ingresaron.
3. **Muestra el progreso.** Un indicador de paso ("Step 2 of 3") reduce la ansiedad y el abandono.
4. **Envía solo al final.** No hagas llamadas al servidor en cada transición de paso a menos que lo necesites (p.ej., verificar si un email ya está registrado).

### Envío del Formulario

Maneja el envío como una máquina de estados: idle, submitting, success, error.

```tsx
function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    setStatus("submitting");
    try {
      await api.submitContact(data);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      // If the server returns field-level errors, apply them
      if (err.fieldErrors) {
        Object.entries(err.fieldErrors).forEach(([field, message]) => {
          setError(field, { message });
        });
      }
    }
  };

  if (status === "success") {
    return <p>Thanks! We'll be in touch.</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {status === "error" && <div role="alert">Submission failed. Please try again.</div>}
      {/* fields */}
      <button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
```

**Prevenir doble envío:** Deshabilita el botón de enviar mientras `status === "submitting"`. Nunca confíes en que el usuario no hará clic dos veces.

**Errores de validación del servidor:** El servidor podría rechazar datos que pasaron la validación del cliente (p.ej., "email already registered"). Mapea los errores del servidor de vuelta a campos específicos.

### Errores a Nivel de Campo vs a Nivel de Formulario

**Errores a nivel de campo** aparecen junto al campo al que se refieren: "Email is required", "Password must be at least 8 characters". Úsalos para problemas de validación vinculados a un input específico.

**Errores a nivel de formulario** aparecen en la parte superior o inferior del formulario: "Unable to create account. Please try again." Úsalos para fallos de envío, errores del servidor y problemas de validación entre campos ("End date must be after start date").

```tsx
<form>
  {/* Form-level error */}
  {formError && <div role="alert" className="form-error">{formError}</div>}

  {/* Field-level error */}
  <label>
    Email
    <input {...register("email")} aria-invalid={!!errors.email} />
    {errors.email && <span role="alert">{errors.email.message}</span>}
  </label>
</form>
```

### Errores Comunes

**Validar en cada pulsación de tecla desde el principio.** El usuario escribe "j" en el campo de email e inmediatamente ve "Invalid email address." Lo sabe. No ha terminado de escribir. Valida on blur primero, luego revalida on change después de que el primer error aparezca.

**Validar solo on submit.** El usuario llena 15 campos, presiona enviar y recibe un muro de errores. Valida incrementalmente para que los errores se detecten temprano.

**Validación solo del lado del cliente.** La validación del cliente es una funcionalidad de UX, no una funcionalidad de seguridad. Un atacante puede saltarse tu cliente por completo. Siempre valida también en el servidor — y usa el mismo schema (Zod) para ambos.

**Perder datos del formulario al navegar.** El usuario llena un formulario largo, accidentalmente hace clic en un enlace y pierde todo. Advierte antes de navegar fuera de un formulario dirty.

```tsx
// React Router: warn on navigation away from dirty form
useEffect(() => {
  const handler = (e: BeforeUnloadEvent) => {
    if (isDirty) e.preventDefault();
  };
  window.addEventListener("beforeunload", handler);
  return () => window.removeEventListener("beforeunload", handler);
}, [isDirty]);
```

**Form state en un global store.** Poner valores de formulario en Redux/Zustand/Pinia casi nunca es necesario. El form state es local — pertenece en el componente (o en una librería de formularios). Los global stores son para estado que múltiples componentes no relacionados necesitan leer.

**Un único componente gigante de formulario.** Un componente de 500 líneas que renderiza todos los campos, maneja toda la validación y gestiona toda la lógica de envío. Divídelo en grupos de campos, extrae la validación a un schema y separa la lógica de envío en un custom hook o servicio.

### Puntos Clave

- Los formularios tienen preocupaciones únicas (values, errors, touched, dirty, estado de envío) que los patrones regulares de gestión de estado no abordan bien. Usa una librería de formularios para cualquier cosa no trivial.
- Valida on blur primero, luego revalida on change después de que aparezcan errores. Esto da el mejor balance de UX.
- Usa validación basada en schemas (Zod) para compartir reglas entre cliente y servidor.
- Prevén el doble envío deshabilitando el botón durante el submit. Maneja los errores de validación del servidor mapeándolos de vuelta a los campos.
- El form state es local. Casi nunca pertenece en un global store.
