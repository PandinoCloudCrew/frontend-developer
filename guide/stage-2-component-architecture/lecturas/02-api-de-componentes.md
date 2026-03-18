# Diseno de APIs de Componentes

La API de un componente es su contrato con cada desarrollador que lo usa — incluyendo tu yo futuro. Una API bien disenada hace que el componente sea facil de usar correctamente y dificil de usar incorrectamente.

---

## Props como API Publica

Los props definen lo que el mundo exterior puede controlar. Todo lo demas es interno. Piensa en un componente como un control remoto de TV: los botones son los props. El circuito interno es privado.

```typescript
// The public API of an Avatar component
interface AvatarProps {
  src: string;         // Image URL
  alt: string;         // Accessibility text
  size?: "sm" | "md" | "lg";  // Display size
  fallback?: string;   // Initials if image fails
}
```

Cada prop que agregas es un compromiso de mantenimiento. Manten la superficie de la API pequena. Cada prop deberia tener una razon clara para existir.

## Props Requeridos vs Opcionales

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

La prueba: puede un consumidor usar el componente solo con los props requeridos y obtener un resultado razonable?

```jsx
// This should work and look fine
<Button onClick={handleSave}>Save</Button>

// Optional props refine behavior
<Button onClick={handleSave} variant="secondary" size="lg">Save</Button>
```

Si un consumidor tiene que pasar seis props solo para renderizar algo basico, tus valores predeterminados estan mal.

## Tipado de Props con TypeScript

TypeScript es tu primera linea de defensa contra el mal uso. Usalo agresivamente.

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

**Generics para componentes agnosticos de datos:**

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

## Event Callbacks

Nombra los callbacks con el prefijo `on`: `onClick`, `onChange`, `onSubmit`, `onSelect`. Esta es una convencion universal.

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

## Children y Slots

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

La regla general: usa **props** para datos. Usa **children / slots** para estructura de UI. Si te encuentras pasando JSX/HTML a traves de un prop, ese contenido probablemente deberia ser children o un named slot.

Vue usa named slots explicitamente:

```vue
<template>
  <div class="card">
    <header><slot name="header" /></header>
    <main><slot /></main>
    <footer><slot name="footer" /></footer>
  </div>
</template>
```

## Forwarding Attributes

Los componentes frecuentemente envuelven un elemento HTML nativo. Reenvia los atributos desconocidos a ese elemento para que los consumidores puedan agregar `id`, `aria-*`, `data-*` o `className` sin que el componente necesite conocer cada atributo posible.

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

Vue hace esto automaticamente con `v-bind="$attrs"` en el elemento raiz (o de forma opcional con `inheritAttrs: false` para control manual).

## Ref Forwarding

A veces un padre necesita acceso directo al elemento DOM subyacente — para gestion de foco, mediciones o integracion con librerias de terceros. Expon esto explicitamente.

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

Vue usa `defineExpose` para elegir explicitamente que puede acceder el padre:

```vue
<script setup>
import { ref } from 'vue';
const inputEl = ref(null);
defineExpose({ focus: () => inputEl.value?.focus() });
</script>
```

## Controlled vs Uncontrolled Components

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
| Predecibilidad | Alta — una unica fuente de verdad | Menor — el estado esta oculto |
| Boilerplate | Mas — el padre gestiona el estado | Menos — el componente lo maneja |
| Mejor para | Formularios con validacion, UI sincronizada | Inputs simples, integracion con terceros |

Al construir componentes reutilizables, soporta ambos patrones. Acepta un prop `value` (controlled) y un prop `defaultValue` (uncontrolled). Este es el patron usado por los elementos HTML nativos y las librerias de componentes bien disenadas.

## Errores Comunes

**Boolean explosion.** Diez props booleanos donde solo uno deberia estar activo a la vez. Usa un union type en lugar de `isPrimary`, `isSecondary`, `isDanger`, `isGhost`. Cuando dos booleanos son verdaderos simultaneamente, el comportamiento es indefinido.

**Props requeridos que deberian ser opcionales.** Si el 90% de los consumidores pasan el mismo valor, ese valor deberia ser el predeterminado. No hagas que todos escriban `<Button type="button">` cuando `"button"` es casi siempre lo que quieren.

**Firmas de callbacks inconsistentes.** Un callback pasa el evento crudo, otro pasa solo un valor, otro pasa un objeto. Elige una convencion y mantenla dentro de una libreria de componentes.

**Filtrar estado interno.** Exponer un prop `isInternallyLoading` o un ref `_cache`. Si es interno, no deberia estar en la API. Prefijar con guiones bajos no lo hace privado — removerlo de la interfaz si.

**Props que se contradicen entre si.** `<Modal isOpen={true} isClosed={true} />`. Estos dos props representan el mismo estado. Elige uno. Esto tambien aplica a `disabled` + `loading` — si loading siempre implica disabled, no hagas que el consumidor pase ambos.

## Puntos Clave

- Cada prop es un compromiso de mantenimiento. Manten la superficie pequena con valores predeterminados sensatos.
- Usa union types de TypeScript para variantes, discriminated unions para conjuntos de props condicionales y generics para componentes agnosticos de datos.
- Nombra los callbacks `onAction`, pasa datos significativos (no eventos crudos) y manten las firmas consistentes.
- Soporta tanto patrones controlled como uncontrolled para componentes tipo input.
- Si un consumidor tiene que leer tu codigo fuente para descubrir como usar tu componente, la API ha fallado.
