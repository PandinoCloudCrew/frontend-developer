# Componentes: Modelo Mental y Diseño de APIs

> Material de lectura para la Etapa 2 — Arquitectura de Componentes.
> Cubre el modelo mental de componentes agnóstico de framework y el diseño de APIs de componentes.

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
