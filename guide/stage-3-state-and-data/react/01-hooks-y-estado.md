# Hooks y Estado en React



> Cómo gestionar estado reactivo en componentes React con hooks. Cubre `useState`, `useReducer`, `useMemo`, `useCallback`, custom hooks y su equivalencia con Angular Signals.

---

## Contenido
- [useState: estado básico](#usestate-estado-básico)
- [useReducer: estado complejo](#usereducer-estado-complejo)
- [useMemo y useCallback](#usememo-y-usecallback)
- [Custom hooks](#custom-hooks)
- [Comparación con Angular Signals](#comparación-con-angular-signals)
- [Anti-patterns](#anti-patterns)

---

## `useState`: Estado Básico

`useState` declara una variable de estado en un componente funcional:

```
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(prev => Math.max(0, prev - 1))}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

- `setCount(5)` reemplaza el valor (como `signal.set(5)` en Angular).
- `setCount(prev => prev + 1)` calcula el nuevo valor a partir del anterior (como `signal.update()`).
- **Siempre usa la forma funcional** (`prev => prev + 1`) cuando el nuevo valor depende del anterior. Evita bugs por batching.

### Lazy initialization

Si el valor inicial es costoso de calcular, pasa una función:

```
// Mal: se ejecuta en CADA render
const [data, setData] = useState(JSON.parse(localStorage.getItem('data') ?? '[]'));

// Bien: se ejecuta solo en el primer render
const [data, setData] = useState(() =>
  JSON.parse(localStorage.getItem('data') ?? '[]')
);
```

---

## `useReducer`: Estado Complejo

Cuando el estado tiene múltiples campos que cambian juntos, `useReducer` es más claro que múltiples `useState`:

```
import { useReducer } from 'react';

interface CartState {
  items: CartItem[];
  discount: number;
}

type CartAction =
  | { type: 'add'; item: CartItem }
  | { type: 'remove'; id: string }
  | { type: 'applyDiscount'; percent: number }
  | { type: 'clear' };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'add':
      return { ...state, items: [...state.items, action.item] };
    case 'remove':
      return { ...state, items: state.items.filter(i => i.id !== action.id) };
    case 'applyDiscount':
      return { ...state, discount: action.percent };
    case 'clear':
      return { items: [], discount: 0 };
  }
}

function Cart() {
  const [state, dispatch] = useReducer(cartReducer, { items: [], discount: 0 });

  return (
    <div>
      <p>Items: {state.items.length}</p>
      <button onClick={() => dispatch({ type: 'clear' })}>Vaciar</button>
    </div>
  );
}
```

**Cuándo usar `useReducer` en vez de `useState`:**
- El estado tiene 3+ campos relacionados.
- Las transiciones de estado tienen lógica condicional.
- Quieres centralizar la lógica de mutación.

---

## `useMemo` y `useCallback`

### `useMemo`: memorizar un valor calculado

```
import { useMemo } from 'react';

function CartSummary({ items }: { items: CartItem[] }) {
  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items] // solo recalcula cuando items cambia
  );

  return <p>Total: ${total.toFixed(2)}</p>;
}
```

`useMemo` es el equivalente de `computed()` en Angular: un valor derivado que se recalcula solo cuando sus dependencias cambian.

### `useCallback`: memorizar una función

```
import { useCallback } from 'react';

function ProductList({ products, onSelect }: Props) {
  const handleSelect = useCallback(
    (id: string) => {
      onSelect(id);
    },
    [onSelect]
  );

  return (
    <ul>
      {products.map(p => (
        <ProductItem key={p.id} product={p} onSelect={handleSelect} />
      ))}
    </ul>
  );
}
```

`useCallback` memoriza la función para que no se recree en cada render. Solo es útil cuando pasas la función como prop a un componente memorizado con `React.memo`.

**Regla:** no uses `useMemo`/`useCallback` por defecto. Solo optimiza cuando hay un problema medible de rendimiento.

---

## Custom Hooks

Los custom hooks extraen lógica reutilizable de los componentes. Nombra siempre con `useXxx`:

```
import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
```

```
// Uso
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <select value={theme} onChange={e => setTheme(e.target.value)}>
      <option value="light">Claro</option>
      <option value="dark">Oscuro</option>
    </select>
  );
}
```

En Angular extraes lógica a servicios con `@Injectable`. En React extraes lógica a custom hooks.

---

## Comparación con Angular Signals

| React | Angular | Propósito |
|-------|---------|-----------|
| `useState(0)` | `signal(0)` | Estado mutable |
| `setCount(5)` | `count.set(5)` | Reemplazar valor |
| `setCount(prev => prev + 1)` | `count.update(n => n + 1)` | Actualizar desde valor anterior |
| `useMemo(() => ..., [deps])` | `computed(() => ...)` | Estado derivado |
| `useCallback(fn, [deps])` | No necesario (signals son granulares) | Memorizar función |
| `useReducer(reducer, init)` | Servicio con signals | Estado complejo |
| Custom hook `useXxx()` | Servicio `@Injectable` | Lógica reutilizable |

La diferencia fundamental: Angular Signals rastrean dependencias automáticamente. React hooks requieren que declares las dependencias manualmente en arrays (`[deps]`).

---

## Anti-patterns

- **`useState` para todo.** Si tienes 5+ `useState` relacionados, usa `useReducer`. El código será más predecible y testeable.
- **Stale closures.** Cuando una función captura un valor viejo del state porque no se recreó. Usa la forma funcional de `setState`: `setCount(prev => prev + 1)` en vez de `setCount(count + 1)` en callbacks asíncronos.
- **Dependencias faltantes en `useEffect`.** Si usas una variable dentro de `useEffect` pero no la incluyes en el array de dependencias, el efecto usa valores obsoletos. ESLint con `react-hooks/exhaustive-deps` te avisa.
- **Optimización prematura con `useMemo`/`useCallback`.** Memorizan valores, pero agregan complejidad. La mayoría de los cálculos son tan rápidos que la memorización cuesta más que recalcular.

---

## Puntos Clave

- `useState` para estado simple. `useReducer` para estado complejo con múltiples transiciones.
- `useMemo` ≈ `computed()` de Angular: valor derivado memorizado. Solo úsalo cuando hay un problema de rendimiento real.
- Custom hooks (`useXxx`) son la forma de React de extraer lógica reutilizable.
- Declara dependencias correctamente en los arrays `[deps]`. ESLint `react-hooks/exhaustive-deps` es tu aliado.
- Angular rastreo de dependencias automáticamente; React requiere que las declares manualmente.


