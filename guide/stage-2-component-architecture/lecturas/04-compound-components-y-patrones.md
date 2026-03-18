# Compound Components y Patrones de Diseno de Componentes

Los frameworks modernos ofrecen multiples patrones para componer UI de forma flexible. Esta lectura cubre los patrones mas importantes: composicion sobre herencia, compound components, render props/slots y la evolucion de HOCs hacia hooks.

---

## Composition Over Inheritance

**Principio Central:** Construye UI compleja a partir de piezas pequenas y reutilizables compuestas juntas, en lugar de a traves de jerarquias de clases.

- En frontend, la herencia de componentes lleva a jerarquias rigidas que son dificiles de refactorizar.
- La composicion mediante `children`, slots, render props y hooks permite un ensamblaje flexible de UI y comportamiento.
- Todos los frameworks principales respaldan la composicion: la recomendacion explicita de React, los slots y la Composition API de Vue, la proyeccion de contenido de Angular y los slots de Svelte.

## Container/Presentational Pattern (y su Evolucion)

**Patron Clasico:**
- **Componentes Container (Smart):** Se ocupan de *como funcionan las cosas*. Manejan la obtencion de datos, la gestion de estado y los efectos secundarios. Proporcionan datos y callbacks a los componentes presentacionales.
- **Componentes Presentational (Dumb):** Se ocupan de *como se ven las cosas*. Reciben todo mediante props. Renderizan UI de forma pura. Faciles de probar y reutilizar.

**Evolucion (2025):**
- Con hooks (React) y composables (Vue 3), la frontera rigida entre componentes container y presentational se ha difuminado.
- Los custom hooks encapsulan la logica del "container", haciendo que los componentes container separados sean a menudo innecesarios.
- **Sigue siendo valioso en aplicaciones a escala empresarial:** Mantener la logica separada de la UI permite a los equipos intercambiar UIs sin tocar la logica subyacente, simplifica las pruebas (los componentes presentacionales son puros) y ayuda a la reutilizacion.
- **Directriz:** No fuerces esta estructura en cada componente. Usala donde la separacion proporcione beneficios claros — tipicamente en funcionalidades complejas con requisitos significativos de datos/logica.

## Compound Components

**Patron:** Multiples componentes comparten estado implicito a traves de context, formando una unidad cohesiva donde el padre gestiona el estado y los hijos lo consumen.

```
<Select>
  <Select.Trigger />
  <Select.Options>
    <Select.Option value="a">Option A</Select.Option>
    <Select.Option value="b">Option B</Select.Option>
  </Select.Options>
</Select>
```

- Utilizado extensamente por bibliotecas de componentes como Radix UI, Headless UI y Reach UI.
- Proporciona flexibilidad: los consumidores controlan la estructura y el renderizado mientras el compound component gestiona el comportamiento.
- Complementa Atomic Design al permitir componentes flexibles y personalizables dentro de una jerarquia estructurada.

## Render Props / Slots Pattern

- **Render Props (React):** Un componente acepta una funcion como prop que retorna JSX, delegando las decisiones de renderizado al consumidor mientras gestiona el estado internamente.
- **Slots (Vue/Svelte/Web Components):** Los slots con nombre y con alcance permiten a los componentes padres inyectar contenido en areas especificas de un componente hijo, con el hijo proporcionando datos al slot.
- Ambos patrones habilitan el Open/Closed Principle: los componentes base pueden ser extendidos sin modificacion.
- **Estado moderno:** Aunque los hooks han reemplazado muchos casos de uso de render props, los render props siguen siendo utiles para componentes donde el patron de delegacion de renderizado es la preocupacion principal (por ejemplo, bibliotecas headless UI, listas virtualizadas).

## Higher-Order Components vs. Hooks/Composables

**Era de los HOC (Legacy):**
- Los HOCs envuelven componentes para inyectar props o comportamiento (por ejemplo, `withAuth`, `withTheme`).
- Problemas: wrapper hell (arboles de componentes profundamente anidados), colision de props, depuracion dificil, jerarquia de componentes oscurecida.

**Era Moderna — Hooks y Composables:**
- **React Hooks / Vue Composables / Svelte Stores:** Encapsulan logica con estado reutilizable sin envolver componentes.
- Los hooks se componen linealmente (sin anidamiento), son explicitos sobre sus dependencias y son mas faciles de tipar con TypeScript.
- Los custom hooks han reemplazado en gran medida a los HOCs y muchos casos de uso de render props.
- **Cuando los HOCs aun aplican:** Responsabilidades transversales que necesitan envolver el componente en si (por ejemplo, error boundaries, providers, wrappers de layout).

## Errores Comunes y Anti-patterns

- **Componentes dios disfrazados de "containers".** Un componente container con 15 hooks, 40 props y 500 lineas de logica de orquestacion no es un container — es un objeto dios. Dividelo en piezas mas pequenas y componibles, cada una gestionando una responsabilidad enfocada.
- **Uso excesivo de Compound Components.** Cuando un componente simple con 3 props (`label`, `value`, `onChange`) seria suficiente, forzar un patron compound (`<Field><Field.Label /><Field.Input /><Field.Error /></Field>`) anade superficie de API y sobrecarga cognitiva sin ganancia en flexibilidad. Usa Compound Components cuando los consumidores genuinamente necesiten control estructural.
- **Panico por prop drilling.** Saltar a Context o estado global en el momento en que pasas un prop a traves de dos niveles es prematuro. Prueba primero la composicion de componentes: pasa componentes completos como children o props para saltar las capas intermedias. Context tiene costos de re-render y oculta el flujo de datos.
- **Render props creando callback hell.** Funciones de render profundamente anidadas (`<Auth>{user => <Data user={user}>{data => <Theme>{theme => ...}</Theme>}</Data>}</Auth>`) son ilegibles. Si tienes mas de un nivel de anidamiento de render props, refactoriza a hooks.
- **Abstraccion prematura de componentes "reutilizables".** Construir un `<DataTable>` totalmente generico y configurable antes de entender todas las variantes reales de tablas lleva a una abstraccion incorrecta contra la que cada consumidor lucha. Construye primero las versiones concretas, luego extrae lo que genuinamente se comparte.

## Puntos Clave

- Prefiere composicion sobre herencia en todos los casos. Usa `children`, slots y render props para crear componentes flexibles.
- El patron container/presentational sigue siendo valioso en aplicaciones complejas, pero hooks y composables han difuminado la frontera rigida.
- Compound Components son ideales cuando los consumidores necesitan control estructural sobre el renderizado mientras el componente gestiona el comportamiento.
- Los hooks/composables han reemplazado en gran medida a los HOCs. Reserva los HOCs para responsabilidades transversales que necesitan envolver el componente.
- Evita la abstraccion prematura: construye primero versiones concretas, luego extrae lo que genuinamente se comparte.
