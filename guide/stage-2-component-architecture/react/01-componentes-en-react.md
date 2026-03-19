# Componentes en React



> Cómo crear y componer componentes funcionales en React. Cubre JSX, props con TypeScript, renderizado condicional, listas con `.map()`, `children` y composición.

---

## Contenido
- [Anatomía de un componente](#anatomía-de-un-componente)
- [JSX en profundidad](#jsx-en-profundidad)
- [Props con TypeScript](#props-con-typescript)
- [Renderizado condicional](#renderizado-condicional)
- [Listas con .map() y key](#listas-con-map-y-key)
- [Composición con children](#composición-con-children)
- [Composición avanzada](#composición-avanzada)
- [Anti-patterns](#anti-patterns)

---

## Anatomía de un Componente

Un componente React es una función que retorna JSX. No hay decoradores, no hay archivos separados para template y estilos.

```
interface UserCardProps {
  name: string;
  role: string;
}

function UserCard({ name, role }: UserCardProps) {
  return (
    <article className="card">
      <h2>{name}</h2>
      <p>{role}</p>
    </article>
  );
}
```

- **La función ES el componente.** No necesitas registrarlo, declararlo ni importarlo en un módulo.
- **`className` en vez de `class`.** JSX usa `className` porque `class` es palabra reservada en JavaScript.
- **`{}` para expresiones.** Cualquier expresión JavaScript válida va entre llaves.

En Angular, un componente tiene decorador `@Component`, clase, template y estilos separados. En React, todo vive en una función.

---

## JSX en Profundidad

JSX parece HTML pero es JavaScript. Cada `<div>` se compila a una llamada de función.

```
function Example() {
  const user = { name: 'Ana', age: 28 };

  return (
    <div>
      {/* Expresiones */}
      <p>Nombre: {user.name}</p>
      <p>Edad: {user.age} años</p>
      <p>Mayor de edad: {user.age >= 18 ? 'Sí' : 'No'}</p>

      {/* Atributos dinámicos */}
      <img src={`/avatars/${user.name.toLowerCase()}.jpg`} alt={user.name} />

      {/* Estilos inline (objeto, no string) */}
      <span style={{ color: 'green', fontWeight: 'bold' }}>Activo</span>
    </div>
  );
}
```

Diferencia clave con Angular: en Angular usas `{{ interpolation }}` (doble llave) y directivas. En React usas `{expression}` (llave simple) y JavaScript puro.

---

## Props con TypeScript

Las props se tipan con interfaces y se reciben por destructuring:

```
interface ProductCardProps {
  name: string;
  price: number;
  onSale?: boolean; // opcional con ?
}

function ProductCard({ name, price, onSale = false }: ProductCardProps) {
  return (
    <article>
      <h3>{name}</h3>
      <p>${price.toFixed(2)}</p>
      {onSale && <span className="badge">En oferta</span>}
    </article>
  );
}
```

```
// Uso
<ProductCard name="Teclado mecánico" price={89.99} onSale />
```

- `onSale?: boolean` marca la prop como opcional.
- `onSale = false` proporciona un valor por defecto en el destructuring.
- `<ProductCard onSale />` equivale a `<ProductCard onSale={true} />`.

En Angular usas `input()` / `input.required()`. En React usas interfaces de TypeScript y destructuring.

---

## Renderizado Condicional

React no tiene directivas (`@if`, `v-if`). Usas operadores de JavaScript:

```
interface StatusProps {
  status: 'loading' | 'error' | 'success';
  data?: string[];
  errorMessage?: string;
}

function StatusDisplay({ status, data, errorMessage }: StatusProps) {
  // Ternario para if/else
  if (status === 'loading') {
    return <p>Cargando...</p>;
  }

  if (status === 'error') {
    return <p className="error">{errorMessage}</p>;
  }

  // && para condicionales simples
  return (
    <div>
      {data && data.length > 0 && (
        <ul>
          {data.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      )}
      {data?.length === 0 && <p>Sin resultados</p>}
    </div>
  );
}
```

**Tres patrones:**
1. `return` temprano para estados excluyentes.
2. `{condition && <JSX />}` para mostrar/ocultar.
3. `{condition ? <A /> : <B />}` para if/else inline.

---

## Listas con `.map()` y `key`

```
interface Product {
  id: string;
  name: string;
  price: number;
}

function ProductList({ products }: { products: Product[] }) {
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name} --- ${product.price.toFixed(2)}
        </li>
      ))}
    </ul>
  );
}
```

- **`key` es obligatorio.** React lo usa para identificar qué elementos cambiaron, se agregaron o se eliminaron. Sin `key`, React re-renderiza toda la lista.
- **Usa IDs estables, no índices.** `key={product.id}` es correcto. `key={index}` causa bugs cuando la lista se reordena.

`key` en React cumple la misma función que `track` en Angular: identifica elementos para optimizar el DOM.

---

## Composición con `children`

`children` es la prop especial que recibe el contenido entre las etiquetas de apertura y cierre:

```
interface CardProps {
  children: React.ReactNode;
}

function Card({ children }: CardProps) {
  return <div className="card">{children}</div>;
}
```

```
// Uso
<Card>
  <h2>Título personalizado</h2>
  <p>Contenido que el padre decide</p>
</Card>
```

`children` en React es el equivalente de `<ng-content>` en Angular y `<slot>` en Vue.

---

## Composición Avanzada

### Slots con props nombradas

React no tiene slots nombrados como Angular (`select="[dialog-title]"`). En su lugar, usas props:

```
interface DialogProps {
  title: React.ReactNode;
  actions: React.ReactNode;
  children: React.ReactNode;
}

function Dialog({ title, actions, children }: DialogProps) {
  return (
    <div className="dialog">
      <header>{title}</header>
      <main>{children}</main>
      <footer>{actions}</footer>
    </div>
  );
}
```

```
<Dialog
  title={<h2>Confirmar eliminación</h2>}
  actions={
    <>
      <button onClick={cancel}>Cancelar</button>
      <button onClick={confirm}>Eliminar</button>
    </>
  }
>
  <p>¿Estás seguro de que quieres eliminar este elemento?</p>
</Dialog>
```

---

## Anti-patterns

- **Prop drilling pánico.** Pasar props a través de 2-3 niveles es normal y deseable. No saltes a Context o estado global al primer nivel de anidación.
- **Componentes gigantes.** Si un componente supera 150 líneas, probablemente hace demasiado. Extrae subcomponentes.
- **Funciones inline en JSX (cuando importa).** `onClick={() => handleDelete(id)}` está bien para la mayoría de los casos. Solo optimiza con `useCallback` si hay un problema medible de rendimiento.
- **Usar `index` como `key` en listas dinámicas.** Solo es aceptable para listas estáticas que nunca cambian de orden.

---

## Puntos Clave

- Un componente React es una función que recibe props (tipadas con interfaces) y retorna JSX.
- JSX usa `{expression}` para cualquier expresión JavaScript: condicionales, maps, cálculos.
- `key` en listas es obligatorio y debe ser un ID estable, no un índice.
- `children` es el equivalente de `<ng-content>` de Angular. Props nombradas reemplazan los slots nombrados.
- React no tiene directivas: usas `&&`, ternarios y `.map()` directamente en JavaScript.


