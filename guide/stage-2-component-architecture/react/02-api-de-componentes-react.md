# API de Componentes React --- Props, Refs y Patrones



> Cómo diseñar APIs de componentes robustas en React. Cubre tipado de props con TypeScript, `forwardRef`, controlled vs uncontrolled, patrones de `children` y spreading de props.

---

## Contenido
- [Diseño de interfaces de props](#diseño-de-interfaces-de-props)
- [forwardRef para ref forwarding](#forwardref-para-ref-forwarding)
- [Controlled vs uncontrolled](#controlled-vs-uncontrolled)
- [Patrones de children](#patrones-de-children)
- [Spreading props con rest](#spreading-props-con-rest)
- [Anti-patterns](#anti-patterns)

---

## Diseño de Interfaces de Props

Las props definen el contrato público de un componente. Un buen diseño de props hace que el componente sea predecible y fácil de usar.

```
interface ButtonProps {
  /** Contenido del botón */
  children: React.ReactNode;
  /** Variante visual */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** Tamaño */
  size?: 'sm' | 'md' | 'lg';
  /** Deshabilitado */
  disabled?: boolean;
  /** Handler de click */
  onClick?: () => void;
}

function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

- **Union types para variantes.** `'primary' | 'secondary'` es mejor que `string` --- restringe los valores válidos.
- **Valores por defecto en el destructuring.** Hacen que las props opcionales sean predecibles sin necesitar documentación extra.
- **JSDoc comments.** Los comentarios `/** */` aparecen en el autocompletado del IDE.

En Angular usas `input<'primary' | 'secondary'>('primary')`. En React usas TypeScript puro con interfaces.

---

## `forwardRef` para Ref Forwarding

Cuando un componente wrappea un elemento nativo, los consumidores necesitan acceder al elemento DOM subyacente. `forwardRef` lo hace posible:

```
import { forwardRef } from 'react';

interface InputProps {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, error, ...rest }, ref) {
    return (
      <div>
        <label>{label}</label>
        <input ref={ref} {...rest} />
        {error && <span className="error">{error}</span>}
      </div>
    );
  }
);
```

```
// El consumidor puede hacer focus programáticamente
import { useRef } from 'react';

function SearchForm() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form>
      <Input ref={inputRef} label="Buscar" />
      <button type="button" onClick={() => inputRef.current?.focus()}>
        Enfocar
      </button>
    </form>
  );
}
```

En Angular usas `viewChild` para acceder a elementos del template. En React usas `ref` + `forwardRef`.

---

## Controlled vs Uncontrolled

### Controlled: React controla el valor

```
import { useState } from 'react';

function ControlledInput() {
  const [value, setValue] = useState('');

  return (
    <input
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
}
```

El valor siempre refleja el state de React. Cada keystroke dispara `onChange` → `setValue` → re-render.

### Uncontrolled: el DOM controla el valor

```
import { useRef } from 'react';

function UncontrolledInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit() {
    console.log(inputRef.current?.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} defaultValue="" />
      <button type="submit">Enviar</button>
    </form>
  );
}
```

El DOM mantiene el valor. React solo lo lee cuando lo necesita.

**Cuándo usar cada uno:**

| Patrón | Cuándo |
|--------|--------|
| Controlled | Validación en tiempo real, formateo, lógica condicional |
| Uncontrolled | Formularios simples, integración con React Hook Form |

---

## Patrones de `children`

### Simple: contenido libre

```
function Card({ children }: { children: React.ReactNode }) {
  return <div className="card">{children}</div>;
}
```

### Render function: lógica del hijo decidida por el padre

```
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T extends { id: string }>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}
```

```
<List
  items={products}
  renderItem={product => (
    <span>{product.name} --- ${product.price}</span>
  )}
/>
```

### Compound: componentes que funcionan juntos

```
import { createContext, useContext, useState } from 'react';

const TabsContext = createContext<{
  activeTab: string;
  setActiveTab: (tab: string) => void;
} | null>(null);

function Tabs({ defaultTab, children }: { defaultTab: string; children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
}

function TabList({ children }: { children: React.ReactNode }) {
  return <div role="tablist">{children}</div>;
}

function Tab({ value, children }: { value: string; children: React.ReactNode }) {
  const ctx = useContext(TabsContext)!;
  return (
    <button
      role="tab"
      aria-selected={ctx.activeTab === value}
      onClick={() => ctx.setActiveTab(value)}
    >
      {children}
    </button>
  );
}

function TabPanel({ value, children }: { value: string; children: React.ReactNode }) {
  const ctx = useContext(TabsContext)!;
  if (ctx.activeTab !== value) return null;
  return <div role="tabpanel">{children}</div>;
}
```

---

## Spreading Props con `{...rest}`

Para componentes que wrappean elementos nativos, pasa todas las props HTML al elemento subyacente:

```
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

function Button({ variant = 'primary', children, ...rest }: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} {...rest}>
      {children}
    </button>
  );
}
```

```
// El consumidor puede pasar cualquier atributo HTML nativo
<Button variant="primary" type="submit" aria-label="Guardar" disabled>
  Guardar
</Button>
```

`extends React.ButtonHTMLAttributes<HTMLButtonElement>` hereda todos los tipos de un `<button>` nativo.

---

## Anti-patterns

- **Usar `any` para props.** Destruye todo el valor de TypeScript. Si no sabes el tipo, usa `unknown` y haz type narrowing.
- **No hacer forwarding de refs.** Componentes de input, botón o cualquier wrapper de un elemento nativo deben soportar `ref`. Sin `forwardRef`, el consumidor no puede hacer focus programático ni integrarse con bibliotecas de formularios.
- **Demasiadas props (>10).** Un componente con más de 10 props probablemente viola el Principio de Responsabilidad Única. Divide en componentes más pequeños o agrupa props relacionadas en un objeto.
- **Mezclar controlled y uncontrolled.** Un input no puede cambiar entre `value` (controlled) y `defaultValue` (uncontrolled) durante su vida. React lanza un warning explícito.

---

## Puntos Clave

- Las props se tipan con interfaces TypeScript. Union types para variantes, `?` para opcionales, defaults en destructuring.
- `forwardRef` permite que componentes wrapper expongan el elemento DOM subyacente.
- Controlled inputs: React controla el valor con `value` + `onChange`. Uncontrolled: el DOM controla con `defaultValue` + `ref`.
- `{...rest}` con `extends React.HTMLAttributes` crea componentes que aceptan cualquier atributo HTML nativo.
- Si un componente tiene más de 10 props, necesita ser dividido.


