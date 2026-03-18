# Arrays, Closures y Event Loop

Estos tres temas son la base de como se manipulan datos, se encapsula estado y se ejecuta código asincrono en JavaScript. Los metodos de array son tu herramienta principal para transformar datos en la UI. Los closures son el mecanismo detras de los hooks de React. Y el event loop explica por que tu `setTimeout` no se ejecuta cuando crees que deberia.

---

## Metodos de Array

Estos metodos devuelven nuevos arrays — no modifican el original.

```js
const numbers = [1, 2, 3, 4, 5];

// map: transform each element
numbers.map(n => n * 2);               // [2, 4, 6, 8, 10]

// filter: keep elements that pass a test
numbers.filter(n => n > 3);            // [4, 5]

// find: first element that passes a test
numbers.find(n => n > 3);              // 4

// findIndex: index of first element that passes a test
numbers.findIndex(n => n > 3);         // 3

// some: does at least one element pass?
numbers.some(n => n > 4);              // true

// every: do all elements pass?
numbers.every(n => n > 0);             // true

// reduce: accumulate into a single value
numbers.reduce((sum, n) => sum + n, 0); // 15

// flat: flatten nested arrays
[[1, 2], [3, [4]]].flat();             // [1, 2, 3, [4]]
[[1, 2], [3, [4]]].flat(Infinity);     // [1, 2, 3, 4]

// flatMap: map then flatten one level
['hello world', 'foo bar'].flatMap(s => s.split(' '));
// ['hello', 'world', 'foo', 'bar']
```

**Encadenarlos** para transformaciones de datos:

```js
const activeAdmins = users
  .filter(u => u.active)
  .filter(u => u.role === 'admin')
  .map(u => u.name);
```

---

## Closures

Un closure es una función que recuerda las variables del scope donde fue creada, incluso despues de que ese scope haya terminado de ejecutarse:

```js
function createCounter() {
  let count = 0;                  // this variable is "closed over"
  return {
    increment: () => ++count,
    getCount: () => count,
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.getCount();  // 2
```

Las funciones internas `increment` y `getCount` "encierran" la variable `count`. Cada llamada a `createCounter()` crea un nuevo `count` independiente.

**El error de closure obsoleto en React:**

```js
function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      // BUG: this closure captures the initial count (0) and never updates
      console.log(count); // always 0
      setCount(count + 1); // always sets to 1
    }, 1000);
    return () => clearInterval(id);
  }, []); // empty deps = effect runs once, closure is never refreshed
}
```

La solución — usar la forma de función de `setState`:

```js
setCount(prev => prev + 1); // always uses the latest value
```

Este es el error mas comun en React, y se origina por no entender los closures.

---

## El Event Loop

JavaScript es de un solo hilo (single-threaded). Ejecuta código usando un call stack y dos colas:

1. **Call stack**: ejecuta funciones una a la vez, sincronamente.
2. **Cola de microtareas (Microtask queue)**: promesas (`.then`, `await`), `queueMicrotask`. Se procesan despues de cada elemento del call stack, antes de la siguiente macrotarea.
3. **Cola de tareas (Task queue / macrotask queue)**: `setTimeout`, `setInterval`, eventos del DOM. Se procesan una a la vez, despues de que la cola de microtareas este vacia.

```js
console.log('1');                          // call stack

setTimeout(() => console.log('2'), 0);     // task queue

Promise.resolve().then(() => console.log('3')); // microtask queue

console.log('4');                          // call stack

// Output: 1, 4, 3, 2
```

Incluso `setTimeout(fn, 0)` no es instantaneo. El callback va a la cola de tareas y espera hasta que:
1. El call stack actual este vacio
2. Todas las microtareas (promesas) hayan sido procesadas

Por eso los timeouts de "cero retraso" aun se ejecutan despues de los callbacks de promesas.

---

## `Map`, `Set`, `WeakMap`, `WeakSet`

**`Map`** — pares clave-valor donde las claves pueden ser de cualquier tipo (no solo strings):

```js
const cache = new Map();
cache.set(userObj, 'cached-data');   // object as key — impossible with plain objects
cache.get(userObj);                  // 'cached-data'
cache.has(userObj);                  // true
cache.size;                         // 1
```

**`Set`** — una coleccion de valores unicos:

```js
const unique = new Set([1, 2, 2, 3, 3]);
[...unique]; // [1, 2, 3]

unique.add(4);
unique.has(2);    // true
unique.delete(2); // removes 2
```

**`WeakMap` / `WeakSet`** — igual que Map/Set pero las claves (WeakMap) o valores (WeakSet) se mantienen de forma debil y son recolectadas por el garbage collector cuando no existe otra referencia. Usalos para asociar metadatos con objetos sin prevenir la recoleccion de basura:

```js
const metadata = new WeakMap();
function process(element) {
  if (!metadata.has(element)) {
    metadata.set(element, { processed: true });
  }
}
// When `element` is removed from the DOM and dereferenced,
// the metadata entry is automatically garbage collected.
```

**Cuando usar en lugar de objetos/arrays simples:**

| Caso de uso | Usa |
|----------|-----|
| Busquedas simples con claves string | Objeto simple `{}` |
| Claves no-string, agregar/eliminar frecuente, necesitas `.size` | `Map` |
| Deduplicacion | `Set` |
| Metadatos privados que no deben prevenir el GC | `WeakMap` |
| Rastrear objetos sin fugas de memoria | `WeakSet` |

---

## Errores comunes

**Mutar argumentos de funciones:**

```js
// Bad: caller's object is modified unexpectedly
function addAdmin(users) {
  users.push({ name: 'Admin', role: 'admin' });
  return users;
}

// Good: return a new array
function addAdmin(users) {
  return [...users, { name: 'Admin', role: 'admin' }];
}
```

**Olvidar `await`:**

```js
// Bug: deleteUser returns a promise, doesn't actually wait
async function cleanup(userId) {
  deleteUser(userId);        // missing await — fire and forget
  console.log('Deleted');    // runs before deletion completes
}

// Fix:
async function cleanup(userId) {
  await deleteUser(userId);
  console.log('Deleted');
}
```

**`for...in` en arrays:**

```js
const arr = ['a', 'b', 'c'];

// Bad: for...in iterates over property KEYS (strings), includes prototype properties
for (const i in arr) { console.log(i); } // "0", "1", "2" (strings, not numbers)

// Good: for...of iterates over VALUES
for (const val of arr) { console.log(val); } // "a", "b", "c"

// Also good: array methods
arr.forEach(val => console.log(val));
```

**`==` vs `===`:**

```js
// == performs type coercion — surprising results
0 == '';       // true
0 == false;    // true
'' == false;   // true
null == undefined; // true

// === checks value AND type — predictable
0 === '';      // false
0 === false;   // false
```

Siempre usa `===`. El único `==` aceptable es `value == null` para verificar tanto `null` como `undefined` simultaneamente, e incluso eso es una eleccion de estilo.

**Callback hell (anidar cadenas `.then`):**

```js
// Bad: nested promises — just as bad as callback hell
fetchUser(id).then(user => {
  fetchPosts(user.id).then(posts => {
    fetchComments(posts[0].id).then(comments => {
      render(user, posts, comments);
    });
  });
});

// Good: flat async/await
async function loadData(id) {
  const user = await fetchUser(id);
  const posts = await fetchPosts(user.id);
  const comments = await fetchComments(posts[0].id);
  render(user, posts, comments);
}
```

**Usar `var`:**

`var` se eleva (hoisted) al scope de la función y puede ser accedido antes de su declaración (como `undefined`). Esto causa errores silenciosos. No hay razón para usar `var` en JavaScript moderno.

---

## Puntos clave

- Los metodos de array (`map`, `filter`, `find`, `reduce`) devuelven nuevos arrays sin mutar el original. Son la base de la transformacion de datos en la UI.
- Los closures capturan variables por referencia. En los hooks de React, esto significa valores obsoletos si tu array de dependencias es incorrecto. Usa la forma de función de `setState` al actualizar basandote en el estado previo.
- El event loop procesa microtareas (promesas) antes de macrotareas (`setTimeout`). Entender este orden previene bugs de timing.
- Usa `Map` cuando necesites claves no-string o eliminacion frecuente. Usa `Set` para deduplicacion. Usa `WeakMap`/`WeakSet` para metadatos que no deben prevenir el garbage collection.
- Siempre usa `===` en lugar de `==`. Siempre usa `for...of` (no `for...in`) para iterar arrays.
