# Contenido Complementario: Componentes y Estado

Material didáctico práctico que cubre fundamentos de componentes, diseño de APIs, patrones de data fetching, URL state y form state management.

---

## Tema 1: ¿Qué es un Componente?

**Etapa 2 — Modelo Mental Agnóstico de Framework**

### Por Qué Esto Importa

Cada framework frontend moderno — React, Vue, Angular, Svelte — está construido sobre la misma abstracción central: el componente. Antes de aprender cualquier framework, necesitas entender qué es realmente un componente. Si te saltas esto, escribirás código de framework sin entender por qué está organizado de esa manera.

### Un Componente es una Función

Si eliminas todos los frameworks, un componente es una función:

```
Input (data) → Output (UI)
```

Le das datos. Devuelve un fragmento de interfaz de usuario. Los mismos datos siempre producen la misma UI. Eso es todo.

```js
// Pseudocode — no framework
function Greeting(props) {
  return `<h1>Hello, ${props.name}</h1>`;
}

Greeting({ name: "Alex" })  // → <h1>Hello, Alex</h1>
Greeting({ name: "Sam" })   // → <h1>Hello, Sam</h1>
```

Este es el modelo mental que deberías llevar a cada framework que toques. Los componentes de React son funciones que retornan JSX. Los single-file components de Vue tienen un `<template>` que renderiza basándose en datos reactivos. Los componentes de Angular son clases cuyas templates renderizan basándose en propiedades. Los archivos `.svelte` de Svelte se compilan en funciones de actualización eficientes. Diferente sintaxis, misma idea.

### Encapsulación

Un componente posee tres cosas:

1. **Markup** — la estructura HTML que produce
2. **Estilos** — cómo se ve
3. **Comportamiento** — cómo responde a la interacción

Estas tres responsabilidades viven juntas dentro del límite del componente. Un componente `Button` conoce su propia estructura HTML, su propio CSS y qué pasa cuando lo cliqueas. Nada fuera del componente debería necesitar conocer esos detalles.

```
┌─────────────────────────┐
│  Button Component       │
│                         │
│  Markup:   <button>     │
│  Styles:   .btn { ... } │
│  Behavior: onClick()    │
└─────────────────────────┘
```

Esto es encapsulación. El mundo exterior interactúa con el componente a través de su interfaz pública (props y eventos), no accediendo a sus detalles internos.

### Reusabilidad

Dado que un componente es una función de sus datos, puedes reutilizarlo con diferentes entradas:

```js
// Same component, different data
<UserCard name="Alex"  role="Engineer" />
<UserCard name="Sam"   role="Designer" />
<UserCard name="Jordan" role="PM" />
```

Escribiste `UserCard` una vez. Lo usaste tres veces. Cada instancia es independiente — sus propios datos, su propio estado, su propio ciclo de vida.

### Composición

Los componentes contienen otros componentes. Esto es composición — el mismo principio de la composición de funciones, aplicado a la UI.

```js
function App() {
  return (
    <Layout>
      <Header>
        <Logo />
        <Navigation />
      </Header>
      <Main>
        <Sidebar />
        <Content />
      </Main>
    </Layout>
  );
}
```

Esto se lee como una tabla de contenidos de tu UI. `App` contiene `Layout`, que contiene `Header` y `Main`, y así sucesivamente. Cada componente es una pieza autocontenida que delega a piezas más pequeñas.

### El Árbol de Componentes

Cuando compones componentes, obtienes un árbol:

```
          App
         /   \
     Header   Main
     /   \    /   \
  Logo  Nav  Sidebar  Content
                       /   \
                  ArticleList  Pagination
```

Este árbol refleja el árbol del DOM que el navegador renderiza, pero a un nivel de abstracción más alto. En lugar de pensar en `<div>` y `<span>`, piensas en `Header` y `ArticleList`.

Los datos fluyen hacia abajo en este árbol (de padre a hijo vía props). Los eventos fluyen hacia arriba (de hijo a padre vía callbacks). Este flujo de datos unidireccional es una convención compartida por todos los frameworks principales.

### Ciclo de Vida

Los componentes no solo se renderizan una vez. Pasan por un ciclo de vida:

1. **Mount** — el componente aparece en la UI por primera vez. Aquí es donde configuras suscripciones, obtienes datos o inicias temporizadores.
2. **Update** — los datos del componente cambian y se re-renderiza. Esto sucede muchas veces durante la vida del componente.
3. **Unmount** — el componente se elimina de la UI. Aquí es donde limpias: cancelas peticiones de red, remueves event listeners, limpias temporizadores.

```
Mount → Update → Update → Update → ... → Unmount
```

Cada framework te da hooks para estas fases:

| Phase   | React              | Vue               | Angular             | Svelte            |
|---------|--------------------|--------------------|---------------------|-------------------|
| Mount   | `useEffect(() => {}, [])` | `onMounted()`    | `ngOnInit()`        | `onMount()`       |
| Update  | `useEffect(() => {}, [dep])` | `watch()`     | `ngOnChanges()`     | `$:` reactive     |
| Unmount | `useEffect` return fn | `onUnmounted()`  | `ngOnDestroy()`     | `onDestroy()`     |

La sintaxis varía. El concepto es universal.

### Cómo Se Mapea a los Frameworks

Aquí está el mismo componente `Greeting` en cuatro frameworks. Observa cómo todos expresan la misma idea.

**React** — una función que retorna JSX:
```jsx
function Greeting({ name }) {
  return <h1>Hello, {name}</h1>;
}
```

**Vue** — un Single File Component:
```vue
<template>
  <h1>Hello, {{ name }}</h1>
</template>
<script setup>
defineProps({ name: String });
</script>
```

**Angular** — una clase con decorator y template:
```typescript
@Component({
  selector: 'app-greeting',
  template: `<h1>Hello, {{ name }}</h1>`,
})
export class GreetingComponent {
  @Input() name: string;
}
```

**Svelte** — un archivo `.svelte`:
```svelte
<script>
  export let name;
</script>
<h1>Hello, {name}</h1>
```

Cuatro sintaxis. Un concepto: datos entran, UI sale.

### Errores Comunes

**El mega-componente.** Un único componente que renderiza una página entera — header, sidebar, contenido, footer, modales y todo. Tiene 500 líneas, 30 variables de estado y nadie quiere tocarlo. Si no puedes describir lo que hace un componente en una oración, es demasiado grande. Divídelo.

**Sin límites claros.** Un componente que accede al DOM de un componente hermano para leer o modificar su estado. Si `Sidebar` necesita saber qué está seleccionado en `Content`, esa información debería fluir a través de su padre compartido, no mediante manipulación directa del DOM.

**Componentes que son solo wrappers.** Un `UserSection` que literalmente solo renderiza `<div><UserList /></div>` sin lógica, estilos ni composición adicional. Cada componente debería justificar su existencia.

**Mezclar niveles de abstracción.** Un componente que mezcla elementos crudos como `<div>` y `<span>` con componentes de alto nivel como `<DataTable>` y `<Chart>` en el mismo return statement, haciendo la template difícil de escanear. Mantén los componentes en un nivel de abstracción consistente.

### Puntos Clave

- Un componente es una función: datos entran, UI sale. Este modelo mental es universal a través de los frameworks.
- Los componentes encapsulan markup, estilos y comportamiento detrás de una interfaz pública.
- La composición (componentes dentro de componentes) produce un árbol. Los datos fluyen hacia abajo, los eventos fluyen hacia arriba.
- Cada componente se monta, actualiza y desmonta. Limpia lo que configures.
- Si no puedes describir el propósito de un componente en una oración, divídelo.

---

## Tema 2: Diseño de APIs de Componentes

**Etapa 2 — Diseñando Buenas Interfaces de Componentes**

### Por Qué Esto Importa

La API de un componente es su contrato con cada desarrollador que lo usa — incluyendo tu yo futuro. Una API bien diseñada hace que el componente sea fácil de usar correctamente y difícil de usar incorrectamente. Una API mal diseñada crea bugs, confusión y comentarios de "¿por qué existe este prop?" en code reviews.

### Props como API Pública

Los props definen lo que el mundo exterior puede controlar. Todo lo demás es interno. Piensa en un componente como un control remoto de TV: los botones son los props. El circuito interno es privado.

```typescript
// The public API of an Avatar component
interface AvatarProps {
  src: string;         // Image URL
  alt: string;         // Accessibility text
  size?: "sm" | "md" | "lg";  // Display size
  fallback?: string;   // Initials if image fails
}
```

Cada prop que agregas es un compromiso de mantenimiento. Mantén la superficie de la API pequeña. Cada prop debería tener una razón clara para existir.

### Props Requeridos vs Opcionales

Los props requeridos son cosas sin las cuales el componente no puede funcionar. Los props opcionales tienen valores predeterminados sensatos.

```typescript
interface ButtonProps {
  // Required — no sensible default exists
  children: React.ReactNode;
  onClick: () => void;

  // Optional — sensible defaults
  variant?: "primary" | "secondary" | "ghost";  // default: "primary"
  size?: "sm" | "md" | "lg";                    // default: "md"
  disabled?: boolean;                            // default: false
  type?: "button" | "submit" | "reset";          // default: "button"
}
```

La prueba: ¿puede un consumidor usar el componente solo con los props requeridos y obtener un resultado razonable?

```jsx
// This should work and look fine
<Button onClick={handleSave}>Save</Button>

// Optional props refine behavior
<Button onClick={handleSave} variant="secondary" size="lg">Save</Button>
```

Si un consumidor tiene que pasar seis props solo para renderizar algo básico, tus valores predeterminados están mal.

### Tipado de Props con TypeScript

TypeScript es tu primera línea de defensa contra el mal uso. Úsalo agresivamente.

**Union types para variantes** — no booleans:

```typescript
// Bad: boolean explosion
interface BadButtonProps {
  isPrimary?: boolean;
  isSecondary?: boolean;
  isGhost?: boolean;
  isDanger?: boolean;
}
// What happens if isPrimary AND isDanger are both true?

// Good: union type
interface ButtonProps {
  variant: "primary" | "secondary" | "ghost" | "danger";
}
// Exactly one variant. No ambiguity.
```

**Discriminated unions para props condicionales:**

```typescript
// A modal that's either confirmable or informational
type ModalProps =
  | { type: "confirm"; onConfirm: () => void; onCancel: () => void }
  | { type: "info"; onClose: () => void };

// TypeScript enforces: if type is "confirm", onConfirm and onCancel are required.
// If type is "info", only onClose exists. You can't mix them.
```

**Generics para componentes agnósticos de datos:**

```typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

// Usage — TypeScript infers T from the items array
<List
  items={users}
  renderItem={(user) => <span>{user.name}</span>}
  keyExtractor={(user) => user.id}
/>
```

### Event Callbacks

Nombra los callbacks con el prefijo `on`: `onClick`, `onChange`, `onSubmit`, `onSelect`. Esta es una convención universal.

Pasa datos relevantes en el argumento del callback. No hagas que el consumidor tenga que buscarlos.

```typescript
// Bad: consumer has to extract the value themselves
interface BadSelectProps {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

// Good: provide the meaningful value directly
interface SelectProps {
  onChange: (value: string) => void;
}

// Even better for complex components: include context
interface TableProps<T> {
  onRowClick: (item: T, index: number) => void;
  onSort: (column: string, direction: "asc" | "desc") => void;
}
```

### Children y Slots

Usa children / slots cuando los consumidores necesitan controlar el contenido, no solo los datos.

```jsx
// Props approach: limited, rigid
<Card title="Settings" description="Manage your preferences" />

// Children approach: flexible, composable
<Card>
  <CardHeader>
    <h2>Settings</h2>
    <Badge>New</Badge>
  </CardHeader>
  <CardBody>
    <p>Manage your preferences</p>
    <SettingsForm />
  </CardBody>
</Card>
```

La regla general: usa **props** para datos. Usa **children / slots** para estructura de UI. Si te encuentras pasando JSX/HTML a través de un prop, ese contenido probablemente debería ser children o un named slot.

Vue usa named slots explícitamente:

```vue
<template>
  <div class="card">
    <header><slot name="header" /></header>
    <main><slot /></main>
    <footer><slot name="footer" /></footer>
  </div>
</template>
```

### Forwarding Attributes

Los componentes frecuentemente envuelven un elemento HTML nativo. Reenvía los atributos desconocidos a ese elemento para que los consumidores puedan agregar `id`, `aria-*`, `data-*` o `className` sin que el componente necesite conocer cada atributo posible.

```tsx
// React: spread rest props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

function Button({ variant = "primary", children, ...rest }: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} {...rest}>
      {children}
    </button>
  );
}

// Consumer can now do:
<Button variant="primary" aria-label="Save document" data-testid="save-btn">
  Save
</Button>
```

Vue hace esto automáticamente con `v-bind="$attrs"` en el elemento raíz (o de forma opcional con `inheritAttrs: false` para control manual).

### Ref Forwarding

A veces un padre necesita acceso directo al elemento DOM subyacente — para gestión de foco, mediciones o integración con librerías de terceros. Expón esto explícitamente.

```tsx
// React: forwardRef
const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, ...rest }, ref) {
    return (
      <label>
        {label}
        <input ref={ref} {...rest} />
      </label>
    );
  }
);

// Parent can now focus the input
const inputRef = useRef<HTMLInputElement>(null);
<Input ref={inputRef} label="Email" />
inputRef.current?.focus();
```

Vue usa `defineExpose` para elegir explícitamente qué puede acceder el padre:

```vue
<script setup>
import { ref } from 'vue';
const inputEl = ref(null);
defineExpose({ focus: () => inputEl.value?.focus() });
</script>
```

### Controlled vs Uncontrolled Components

**Controlled:** el padre posee el estado. El componente refleja lo que se le indica y reporta cambios.

```tsx
// Controlled — parent is the source of truth
function Parent() {
  const [value, setValue] = useState("");
  return <Input value={value} onChange={setValue} />;
}
```

**Uncontrolled:** el componente gestiona su propio estado interno. El padre puede leerlo bajo demanda.

```tsx
// Uncontrolled — component is the source of truth
function Parent() {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = () => {
    console.log(inputRef.current?.value);
  };
  return <input ref={inputRef} defaultValue="" />;
}
```

| | Controlled | Uncontrolled |
|---|---|---|
| El estado vive en | Padre | Componente |
| Predecibilidad | Alta — una única fuente de verdad | Menor — el estado está oculto |
| Boilerplate | Más — el padre gestiona el estado | Menos — el componente lo maneja |
| Mejor para | Formularios con validación, UI sincronizada | Inputs simples, integración con terceros |

Al construir componentes reutilizables, soporta ambos patrones. Acepta un prop `value` (controlled) y un prop `defaultValue` (uncontrolled). Este es el patrón usado por los elementos HTML nativos y las librerías de componentes bien diseñadas.

### Errores Comunes

**Boolean explosion.** Diez props booleanos donde solo uno debería estar activo a la vez. Usa un union type en lugar de `isPrimary`, `isSecondary`, `isDanger`, `isGhost`. Cuando dos booleanos son verdaderos simultáneamente, el comportamiento es indefinido.

**Props requeridos que deberían ser opcionales.** Si el 90% de los consumidores pasan el mismo valor, ese valor debería ser el predeterminado. No hagas que todos escriban `<Button type="button">` cuando `"button"` es casi siempre lo que quieren.

**Firmas de callbacks inconsistentes.** Un callback pasa el evento crudo, otro pasa solo un valor, otro pasa un objeto. Elige una convención y mantenla dentro de una librería de componentes.

**Filtrar estado interno.** Exponer un prop `isInternallyLoading` o un ref `_cache`. Si es interno, no debería estar en la API. Prefijar con guiones bajos no lo hace privado — removerlo de la interfaz sí.

**Props que se contradicen entre sí.** `<Modal isOpen={true} isClosed={true} />`. Estos dos props representan el mismo estado. Elige uno. Esto también aplica a `disabled` + `loading` — si loading siempre implica disabled, no hagas que el consumidor pase ambos.

### Puntos Clave

- Cada prop es un compromiso de mantenimiento. Mantén la superficie pequeña con valores predeterminados sensatos.
- Usa union types de TypeScript para variantes, discriminated unions para conjuntos de props condicionales y generics para componentes agnósticos de datos.
- Nombra los callbacks `onAction`, pasa datos significativos (no eventos crudos) y mantén las firmas consistentes.
- Soporta tanto patrones controlled como uncontrolled para componentes tipo input.
- Si un consumidor tiene que leer tu código fuente para descubrir cómo usar tu componente, la API ha fallado.

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
