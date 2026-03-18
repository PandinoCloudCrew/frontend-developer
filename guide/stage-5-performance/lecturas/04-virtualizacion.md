# Virtualizacion

La virtualizacion es una técnica de rendimiento que consiste en renderizar solo los elementos visibles en el viewport para listas y tablas grandes, en lugar de renderizar todos los elementos en el DOM.

---

## El Problema

Cuando una lista o tabla tiene cientos o miles de elementos, renderizarlos todos crea un arbol DOM masivo. Cada nodo DOM consume memoria, y el navegador debe calcular layout y paint para todos ellos, incluso los que estan fuera de la pantalla. El resultado: scroll lento, tiempos de renderizado largos y una interfaz que se siente pesada.

---

## Como Funciona

La virtualizacion renderiza solo los elementos que estan actualmente visibles en el viewport (mas un pequeno buffer arriba y abajo para scroll suave). A medida que el usuario hace scroll, los elementos que salen del viewport se destruyen y los nuevos que entran se crean.

Esto reduce dramaticamente los nodos del DOM: de potencialmente miles a solo decenas.

---

## Bibliotecas

| Biblioteca | Ecosistema | Notas |
|-----------|-----------|-------|
| `@tanstack/virtual` | React, Vue, Solid, Svelte | La solución mas moderna y agnositca de framework |
| `react-window` | React | Liviana, API simple, de Brian Vaughn |
| `react-virtualized` | React | Mas features pero mas pesada que react-window |
| Vue Virtual Scroller | Vue | Solución nativa del ecosistema Vue |
| Angular CDK Virtual Scroll | Angular | Parte del Component Dev Kit oficial de Angular |

---

## Cuando Usar

- **Listas que excedan ~100 elementos.** Por debajo de 100 elementos, el DOM nativo generalmente es suficiente.
- **Tablas de datos** con cientos o miles de filas.
- **Feeds con scroll infinito** (redes sociales, logs, timelines).
- **Selects/dropdowns con muchas opciones** (listas de paises, catalogos de productos).

---

## Compromisos

- **Anade complejidad:** La virtualizacion introduce una capa de abstraccion que puede complicar el manejo de scroll, focus y selección.
- **Accesibilidad:** Los lectores de pantalla no pueden ver los elementos fuera de pantalla, lo que significa que no pueden navegar la lista completa. Esto requiere consideraciones adicionales de ARIA.
- **Alturas de elementos:** Para el mejor rendimiento, los elementos deben tener alturas fijas o estimables. Las alturas variables dinamicas son posibles pero mas complejas de implementar.
- **Busqueda en el navegador:** Ctrl+F no encontrara texto en elementos que no estan renderizados en el DOM.

---

## Puntos Clave

- Virtualiza listas con mas de ~100 elementos para mantener el DOM pequeno y el scroll fluido.
- `@tanstack/virtual` es la solución mas moderna y funciona con multiples frameworks.
- Considera los compromisos de accesibilidad y busqueda del navegador antes de virtualizar.
- Alturas fijas o estimables de elementos simplifican la implementación significativamente.
