# Rendimiento en React



[← Volver a Etapa 5](../README.md)

> Cómo optimizar el rendimiento de aplicaciones React. Cubre `React.memo`, `useMemo`/`useCallback`, React Compiler, `React.lazy` + `Suspense`, `startTransition`, optimización de imágenes y el React Profiler.

## Contenido

- [React.memo](#reactmemo)
- [useMemo y useCallback](#usememo-y-usecallback)
- [React Compiler](#react-compiler-react-19)
- [React.lazy y Suspense](#reactlazy-y-suspense)
- [startTransition](#starttransition)
- [Optimización de imágenes](#optimización-de-imágenes)
- [React Profiler](#react-profiler)
- [Anti-patterns](#anti-patterns)
- [Puntos clave](#puntos-clave)

---

## `React.memo`

Por defecto, cuando un componente padre re-renderiza, todos sus hijos re-renderizan también, aunque sus props no hayan cambiado. `React.memo` envuelve un componente para que solo re-renderice cuando sus props cambian por referencia.

<<< @/snippets/react/s5-01-rendimiento-en-react-01.tsx

`React.memo` compara props por referencia (`===`). Si el padre pasa un objeto o función nueva en cada render, `memo` no sirve de nada.

<<< @/snippets/react/s5-01-rendimiento-en-react-02.tsx

En Angular, `OnPush` cumple un rol similar: el componente solo se revisa cuando sus inputs cambian por referencia.

---

## `useMemo` y `useCallback`

`useMemo` memoriza el resultado de un cálculo. `useCallback` memoriza una referencia de función. Ambos reciben un array de dependencias.

<<< @/snippets/react/s5-01-rendimiento-en-react-03.tsx

En Angular, `computed()` cumple el rol de `useMemo`: recalcula automáticamente cuando cambian las signals que lee.

---

## React Compiler (React 19+)

React Compiler analiza tu código en build time y aplica memoización automáticamente. Convierte componentes, valores y callbacks en versiones memoizadas sin que escribas `useMemo`, `useCallback` o `memo`.

<<< @/snippets/react/s5-01-rendimiento-en-react-04.tsx

React Compiler elimina la mayor parte de la necesidad de `useMemo`/`useCallback` manuales. Si tu proyecto usa React 19+ con el compiler habilitado, prioriza código legible sobre memoización manual.

---

## `React.lazy` y `Suspense`

`React.lazy` divide el bundle a nivel de componente. El componente se descarga solo cuando se renderiza por primera vez.

<<< @/snippets/react/s5-01-rendimiento-en-react-05.tsx

Es el equivalente de `@defer` en Angular: ambos crean un chunk separado que se carga bajo demanda. La diferencia es que `@defer` ofrece triggers declarativos (viewport, hover, idle) que en React requieres implementar manualmente con `IntersectionObserver` o librerías como `react-lazy-load`.

---

## `startTransition`

`startTransition` marca una actualización de estado como no urgente. React prioriza las actualizaciones urgentes (input del usuario) y aplaza las no urgentes.

<<< @/snippets/react/s5-01-rendimiento-en-react-06.tsx

Esto evita que una operación costosa (filtrar miles de items) bloquee el input del usuario.

---

## Optimización de imágenes

En **Next.js**, el componente Image optimiza imágenes automáticamente (lazy loading, srcset, formatos modernos). Se importa con `import Image from 'next/image'` y acepta `width`, `height` (obligatorios para evitar layout shift) y `priority` (para la imagen LCP). Genera `srcset`, formatos modernos (WebP/AVIF) y lazy loading automáticamente.

En **React con Vite** (sin Next.js), usa los atributos nativos del browser:

<<< @/snippets/react/s5-01-rendimiento-en-react-07.tsx

En Angular, `NgOptimizedImage` cumple el mismo rol que `next/image`: lazy loading por defecto, srcset, y prevención de layout shift.

---

## React Profiler

React DevTools incluye un **Profiler** que graba renders y muestra cuánto tarda cada componente. Para identificar re-renders innecesarios:

1. Abre React DevTools en el browser.
2. Ve a la pestaña **Profiler**.
3. Haz clic en **Record**, interactúa con la app, y detén la grabación.
4. Revisa el flame chart: los componentes en amarillo/rojo tardaron más.

También puedes habilitar **Highlight updates** en la pestaña Components para ver qué componentes re-renderizan en tiempo real (un borde azul parpadea en cada re-render).

**Regla práctica:** no optimices sin medir. El Profiler te muestra dónde están los problemas reales, no los imaginados.

---

## Anti-patterns

- **Memoizar todo por defecto.** Con React Compiler, `useMemo` y `useCallback` manuales son innecesarios en la mayoría de los casos. Si no usas el Compiler, memoiza solo después de medir con el Profiler.
- **Objetos y arrays inline en JSX props.** Pasar un objeto literal como `style` dentro de JSX crea un objeto nuevo en cada render, rompiendo `React.memo`. Extrae a constantes o usa `useMemo`.
- **Optimizar sin profiling.** Agregar `memo` a 50 componentes "por si acaso" agrega complejidad sin beneficio medible. Mide primero con el Profiler.
- **`React.lazy` para componentes pequeños.** El overhead de un chunk separado (request HTTP adicional) supera el ahorro. Úsalo para features grandes (dashboards, editores, modales complejos).

---

## Puntos Clave

- `React.memo` evita re-renders cuando las props no cambian, pero necesita referencias estables.
- `useMemo`/`useCallback` estabilizan referencias. React Compiler los hace innecesarios en la mayoría de los casos.
- `React.lazy` + `Suspense` dividen el bundle por componente, similar a `@defer` en Angular.
- `startTransition` marca actualizaciones no urgentes para que el input del usuario no se bloquee.
- Siempre mide antes de optimizar: el React Profiler muestra dónde están los problemas reales.

---

[← Volver a Etapa 5](../README.md)


