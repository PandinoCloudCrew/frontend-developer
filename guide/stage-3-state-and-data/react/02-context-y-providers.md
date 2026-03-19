# Context y Providers en React



> Cómo compartir estado entre componentes sin prop drilling. Cubre `createContext`, `useContext`, el patrón Provider, cuándo NO usar Context y Zustand como alternativa.

---

## Contenido
- [createContext + useContext](#createcontext--usecontext)
- [El patrón Provider](#el-patrón-provider)
- [Cuándo usar Context vs props vs estado global](#cuándo-usar-context-vs-props-vs-estado-global)
- [Zustand: alternativa ligera](#zustand-alternativa-ligera)
- [Anti-patterns](#anti-patterns)

---

## `createContext` + `useContext`

Context es el mecanismo de React para compartir valores entre componentes sin pasarlos por props en cada nivel.

```
import { createContext, useContext, useState } from 'react';

// 1. Crear el contexto con tipo
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// 2. Hook personalizado para consumir (con type safety)
function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  }
  return ctx;
}
```

El `throw` dentro de `useAuth` garantiza que nunca obtengas `null` y evita tener que verificar en cada componente consumidor.

En Angular usas `@Injectable` + `inject()` para dependency injection. En React usas `createContext` + `useContext`. La idea es la misma: desacoplar quién provee un valor de quién lo consume.

---

## El Patrón Provider

El Provider es un componente que envuelve parte del árbol y hace disponible un valor a todos sus hijos:

```
function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  async function login(email: string, password: string) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    setUser(data);
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

```
// En main.tsx o App.tsx — envuelve la app
function App() {
  return (
    <AuthProvider>
      <Header />
      <main>
        <RouterProvider router={router} />
      </main>
    </AuthProvider>
  );
}

// Cualquier componente descendiente puede consumir
function Header() {
  const { user, logout } = useAuth();

  return (
    <header>
      {user ? (
        <>
          <span>Hola, {user.name}</span>
          <button onClick={logout}>Cerrar sesión</button>
        </>
      ) : (
        <a href="/login">Iniciar sesión</a>
      )}
    </header>
  );
}
```

---

## Cuándo Usar Context vs Props vs Estado Global

| Situación | Usa |
|-----------|-----|
| Datos pasan por 1-3 niveles | **Props** (es normal, no es "drilling") |
| Datos usados por muchos componentes distantes (theme, auth, locale) | **Context** |
| Estado que cambia frecuentemente (posición del mouse, keystrokes, timers) | **Zustand** u otro estado externo |
| Estado del servidor (datos de API) | **TanStack Query** (ver lectura de data fetching) |

**La regla de oro:** Context es ideal para valores que cambian raramente (auth, theme, config). Para valores que cambian frecuentemente, Context causa re-renders de TODOS los componentes consumidores, aunque no usen el valor que cambió.

---

## Zustand: Alternativa Ligera

Zustand es un estado global minimalista sin las limitaciones de re-render de Context:

```bash
npm install zustand
```

```
import { create } from 'zustand';

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clear: () => void;
}

const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (item) => set(state => ({ items: [...state.items, item] })),
  removeItem: (id) => set(state => ({
    items: state.items.filter(i => i.id !== id),
  })),
  clear: () => set({ items: [] }),
}));
```

```
// Consumir en cualquier componente — sin Provider
function CartIcon() {
  const itemCount = useCartStore(state => state.items.length);
  return <span>Carrito ({itemCount})</span>;
}

function CartPage() {
  const { items, removeItem, clear } = useCartStore();
  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
          <button onClick={() => removeItem(item.id)}>Eliminar</button>
        </div>
      ))}
      <button onClick={clear}>Vaciar carrito</button>
    </div>
  );
}
```

**Ventaja clave:** `useCartStore(state => state.items.length)` solo re-renderiza cuando `items.length` cambia, no cuando cambia cualquier otro campo del store. Context no puede hacer esto.

En Angular usas servicios con signals (`@Injectable`) para estado compartido. En React, Zustand ocupa ese mismo rol con una API similar.

---

## Anti-patterns

- **Poner todo en Context.** Context no es un reemplazo de estado global. Es para valores que cambian raramente y son leídos por muchos componentes. Para estado que cambia frecuentemente, usa Zustand.
- **No memorizar el value del Provider.** Si el Provider re-renderiza, un `value` objeto creado inline causa re-renders innecesarios en todos los consumidores:

```
// Mal: nuevo objeto en cada render
<AuthContext.Provider value={{ user, login, logout }}>

// Bien: memorizar el value
const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);
<AuthContext.Provider value={value}>
```

- **Context anidado excesivo.** `<ThemeProvider><AuthProvider><CartProvider><I18nProvider>` crea "provider hell". Agrupa providers relacionados o usa Zustand para reducir el anidamiento.
- **Usar Context para estado del servidor.** Los datos de API tienen su propio lifecycle (loading, error, cache, refetch). TanStack Query maneja todo esto; Context no.

---

## Puntos Clave

- `createContext` + Provider + `useContext` es el equivalente de React a la dependency injection de Angular.
- Context es ideal para valores que cambian raramente: auth, theme, locale.
- Para estado que cambia frecuentemente, usa Zustand --- tiene selectores granulares que evitan re-renders innecesarios.
- Siempre crea un custom hook (`useAuth`, `useTheme`) que valide que el contexto existe.
- No pongas todo en Context. Props para 1-3 niveles, Context para valores globales estables, Zustand para estado global dinámico.


