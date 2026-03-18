# JavaScript Moderno (ES2020+)

JavaScript moderno es el lenguaje que escribiras a diario. Los frameworks abstraen parte de el, pero no pueden ocultarlo — necesitas closures para hooks, destructuring para props, async/await para la obtencion de datos, y metodos de array para transformar datos. Fundamentos debiles de JavaScript son el predictor #1 de dificultades con los frameworks.

---

## Modulos: `import` / `export`

Los modulos son la base de la organizacion del código. Cada archivo es un modulo con su propio scope.

**Named exports** — exportar multiples valores por nombre:

```js
// math.js
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }

// main.js
import { add, subtract } from './math.js';
```

**Default export** — uno por modulo, importado con cualquier nombre:

```js
// logger.js
export default function log(msg) { console.log(msg); }

// main.js
import log from './logger.js';
import myLogger from './logger.js'; // same thing, different name
```

**Re-exportar** — agregar modulos:

```js
// utils/index.js
export { add, subtract } from './math.js';
export { default as log } from './logger.js';
```

**`import()` dinámico** — cargar modulos bajo demanda para code splitting:

```js
button.addEventListener('click', async () => {
  const { renderChart } = await import('./chart.js');
  renderChart(data);
});
```

Los imports dinamicos devuelven una promesa y son la base de la carga diferida (lazy loading) en todos los frameworks.

---

## `let` / `const` vs `var`

`var` tiene scope de función. `let` y `const` tienen scope de bloque.

```js
if (true) {
  var x = 1;   // accessible outside the block
  let y = 2;   // only accessible inside this block
  const z = 3; // only accessible inside this block, cannot be reassigned
}
console.log(x); // 1
console.log(y); // ReferenceError
```

**Zona muerta temporal (Temporal dead zone)**: `let` y `const` existen en su bloque desde el inicio pero no pueden ser accedidos antes de su linea de declaración. Acceder a ellos antes lanza un `ReferenceError`:

```js
console.log(name); // ReferenceError: Cannot access 'name' before initialization
let name = 'Alice';
```

`var` silenciosamente devolveria `undefined` aquí, lo cual oculta errores. Por eso `let`/`const` son mejores.

**Regla**: Usa `const` por defecto. Usa `let` cuando necesites reasignar. Nunca uses `var`.

---

## Destructuring

Extrae valores de objetos y arrays en variables:

**Destructuring de objetos:**

```js
const user = { name: 'Alice', age: 30, role: 'admin' };
const { name, age } = user;            // name = 'Alice', age = 30
const { role: userRole } = user;       // rename: userRole = 'admin'
const { city = 'Unknown' } = user;     // default: city = 'Unknown'
```

**Destructuring de arrays:**

```js
const [first, second] = [10, 20, 30];    // first = 10, second = 20
const [, , third] = [10, 20, 30];        // skip elements: third = 30
const [head, ...rest] = [1, 2, 3, 4];    // head = 1, rest = [2, 3, 4]
```

**Destructuring anidado:**

```js
const response = { data: { users: [{ name: 'Alice' }] } };
const { data: { users: [{ name }] } } = response;
// name = 'Alice'
```

Usa destructuring anidado con moderacion — los patrones profundamente anidados se vuelven dificiles de leer.

**Destructuring en parametros de función:**

```js
function greet({ name, greeting = 'Hello' }) {
  return `${greeting}, ${name}!`;
}
greet({ name: 'Alice' }); // "Hello, Alice!"
```

---

## Spread y Rest

**Spread** (`...`) expande un iterable en elementos individuales:

```js
// Arrays
const a = [1, 2];
const b = [...a, 3, 4]; // [1, 2, 3, 4]

// Objects (shallow copy)
const original = { x: 1, y: 2 };
const copy = { ...original, y: 3 }; // { x: 1, y: 3 } — y overridden
```

**Rest** (`...`) recopila los elementos restantes en un array u objeto:

```js
// Function parameters
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4); // 10

// Object rest
const { id, ...attrs } = { id: 1, name: 'Alice', age: 30 };
// id = 1, attrs = { name: 'Alice', age: 30 }
```

---

## Template Literals

Interpolacion de cadenas y cadenas multilinea:

```js
const name = 'Alice';
const greeting = `Hello, ${name}!`;         // "Hello, Alice!"
const multiline = `
  First line
  Second line
`;
```

**Tagged templates** — funciones que procesan template literals:

```js
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) =>
    result + str + (values[i] ? `<mark>${values[i]}</mark>` : ''), ''
  );
}
const query = 'flexbox';
highlight`Search results for ${query} in CSS`
// "Search results for <mark>flexbox</mark> in CSS"
```

Los tagged templates son usados por librerias como `styled-components` y `graphql-tag`.

---

## Optional Chaining (`?.`) y Nullish Coalescing (`??`)

**Optional chaining** accede de forma segura a propiedades anidadas que podrian ser `null` o `undefined`:

```js
const user = { address: { city: 'Paris' } };
const city = user.address?.city;     // 'Paris'
const zip = user.address?.zip;       // undefined (not an error)
const country = user.location?.country; // undefined (not an error)

// Works on methods and arrays too
const result = obj.method?.();       // calls method if it exists
const item = arr?.[0];               // accesses index if arr is not null
```

**Nullish coalescing** proporciona un valor por defecto solo para `null` o `undefined` (no para `0`, `''` o `false`):

```js
const port = config.port ?? 3000;    // 3000 only if port is null/undefined
const port2 = config.port || 3000;   // 3000 if port is null, undefined, 0, '', or false

// This matters:
const count = 0;
count ?? 10;  // 0 — correct, 0 is a valid count
count || 10;  // 10 — wrong, treats 0 as falsy
```

**Regla**: Usa `??` cuando `0`, `''` o `false` son valores validos. Usa `||` solo cuando todos los valores falsy deberian activar el valor por defecto.

---

## `async` / `await`

Promesas hechas legibles:

```js
// Promise chain (harder to follow)
fetchUser(id)
  .then(user => fetchPosts(user.id))
  .then(posts => renderPosts(posts))
  .catch(err => showError(err));

// async/await (reads top-to-bottom)
async function loadUserPosts(id) {
  try {
    const user = await fetchUser(id);
    const posts = await fetchPosts(user.id);
    renderPosts(posts);
  } catch (err) {
    showError(err);
  }
}
```

**Ejecución en paralelo** — cuando las peticiones son independientes:

```js
// Bad: sequential — each waits for the previous
const user = await fetchUser(id);
const posts = await fetchPosts(id);
const comments = await fetchComments(id);

// Good: parallel — all start simultaneously
const [user, posts, comments] = await Promise.all([
  fetchUser(id),
  fetchPosts(id),
  fetchComments(id),
]);
```

**`Promise.all` vs `Promise.allSettled`**:

```js
// Promise.all: fails fast — if ANY promise rejects, the whole thing rejects
await Promise.all([fetchA(), fetchB(), fetchC()]);

// Promise.allSettled: waits for ALL promises, never rejects
const results = await Promise.allSettled([fetchA(), fetchB(), fetchC()]);
results.forEach(r => {
  if (r.status === 'fulfilled') console.log(r.value);
  if (r.status === 'rejected') console.log(r.reason);
});
```

Usa `Promise.all` cuando necesitas todos los resultados para proceder. Usa `Promise.allSettled` cuando algunos fallos son aceptables (por ejemplo, cargar widgets de dashboard independientemente).

---

## Puntos clave

- Usa `const` por defecto, `let` cuando se necesite reasignacion, nunca `var`.
- Destructuring y spread no son azucar sintactico — son la forma en que trabajas con props, state y respuestas de APIs en todos los frameworks.
- `?.` y `??` eliminan cadenas defensivas de `if`. Usa `??` en lugar de `||` cuando `0` o `''` son valores validos.
- `async`/`await` es azucar sintactico sobre promesas. Usa `Promise.all` para operaciones en paralelo, `Promise.allSettled` cuando el fallo parcial es aceptable.
