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

<<< @/snippets/react/s2-01-componentes-en-react-01.tsx

- **La función ES el componente.** No necesitas registrarlo, declararlo ni importarlo en un módulo.
- **`className` en vez de `class`.** JSX usa `className` porque `class` es palabra reservada en JavaScript.
- **`{}` para expresiones.** Cualquier expresión JavaScript válida va entre llaves.

En Angular, un componente tiene decorador `@Component`, clase, template y estilos separados. En React, todo vive en una función.

---

## JSX en Profundidad

JSX parece HTML pero es JavaScript. Cada `<div>` se compila a una llamada de función.

<<< @/snippets/react/s2-01-componentes-en-react-02.tsx

Diferencia clave con Angular: en Angular usas `{{ interpolation }}` (doble llave) y directivas. En React usas `{expression}` (llave simple) y JavaScript puro.

---

## Props con TypeScript

Las props se tipan con interfaces y se reciben por destructuring:

<<< @/snippets/react/s2-01-componentes-en-react-03.tsx

<<< @/snippets/react/s2-01-componentes-en-react-04.tsx

- `onSale?: boolean` marca la prop como opcional.
- `onSale = false` proporciona un valor por defecto en el destructuring.
- `&lt;ProductCard onSale />` equivale a `&lt;ProductCard onSale={true} />`.

En Angular usas `input()` / `input.required()`. En React usas interfaces de TypeScript y destructuring.

---

## Renderizado Condicional

React no tiene directivas (`@if`, `v-if`). Usas operadores de JavaScript:

<<< @/snippets/react/s2-01-componentes-en-react-05.tsx

**Tres patrones:**
1. `return` temprano para estados excluyentes.
2. `{condition && &lt;JSX />}` para mostrar/ocultar.
3. `{condition ? <A /> : &lt;B />}` para if/else inline.

---

## Listas con `.map()` y `key`

<<< @/snippets/react/s2-01-componentes-en-react-06.tsx

- **`key` es obligatorio.** React lo usa para identificar qué elementos cambiaron, se agregaron o se eliminaron. Sin `key`, React re-renderiza toda la lista.
- **Usa IDs estables, no índices.** `key={product.id}` es correcto. `key={index}` causa bugs cuando la lista se reordena.

`key` en React cumple la misma función que `track` en Angular: identifica elementos para optimizar el DOM.

---

## Composición con `children`

`children` es la prop especial que recibe el contenido entre las etiquetas de apertura y cierre:

<<< @/snippets/react/s2-01-componentes-en-react-07.tsx

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

<<< @/snippets/react/s2-01-componentes-en-react-08.tsx

<<< @/snippets/react/s2-01-componentes-en-react-09.tsx

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


