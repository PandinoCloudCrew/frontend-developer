# Que es un Componente

Un componente es la abstraccion central de todo framework frontend moderno. Antes de aprender cualquier framework, necesitas entender que es realmente un componente y por que el codigo esta organizado de esa manera.

---

## Un Componente es una Funcion

Si eliminas todos los frameworks, un componente es una funcion:

```
Input (data) → Output (UI)
```

Le das datos. Devuelve un fragmento de interfaz de usuario. Los mismos datos siempre producen la misma UI. Eso es todo.

```js
// Pseudocode — no framework
function Greeting(props) {
  return `<h1>Hello, ${props.name}</h1>`;
}

Greeting({ name: "Alex" })  // → <h1>Hello, Alex</h1>
Greeting({ name: "Sam" })   // → <h1>Hello, Sam</h1>
```

Este es el modelo mental que deberias llevar a cada framework que toques. Los componentes de React son funciones que retornan JSX. Los single-file components de Vue tienen un `<template>` que renderiza basandose en datos reactivos. Los componentes de Angular son clases cuyas templates renderizan basandose en propiedades. Los archivos `.svelte` de Svelte se compilan en funciones de actualizacion eficientes. Diferente sintaxis, misma idea.

## Encapsulacion

Un componente posee tres cosas:

1. **Markup** — la estructura HTML que produce
2. **Estilos** — como se ve
3. **Comportamiento** — como responde a la interaccion

Estas tres responsabilidades viven juntas dentro del limite del componente. Un componente `Button` conoce su propia estructura HTML, su propio CSS y que pasa cuando lo cliqueas. Nada fuera del componente deberia necesitar conocer esos detalles.

```
┌─────────────────────────┐
│  Button Component       │
│                         │
│  Markup:   <button>     │
│  Styles:   .btn { ... } │
│  Behavior: onClick()    │
└─────────────────────────┘
```

Esto es encapsulacion. El mundo exterior interactua con el componente a traves de su interfaz publica (props y eventos), no accediendo a sus detalles internos.

## Reusabilidad

Dado que un componente es una funcion de sus datos, puedes reutilizarlo con diferentes entradas:

```js
// Same component, different data
<UserCard name="Alex"  role="Engineer" />
<UserCard name="Sam"   role="Designer" />
<UserCard name="Jordan" role="PM" />
```

Escribiste `UserCard` una vez. Lo usaste tres veces. Cada instancia es independiente — sus propios datos, su propio estado, su propio ciclo de vida.

## Composicion

Los componentes contienen otros componentes. Esto es composicion — el mismo principio de la composicion de funciones, aplicado a la UI.

```js
function App() {
  return (
    <Layout>
      <Header>
        <Logo />
        <Navigation />
      </Header>
      <Main>
        <Sidebar />
        <Content />
      </Main>
    </Layout>
  );
}
```

Esto se lee como una tabla de contenidos de tu UI. `App` contiene `Layout`, que contiene `Header` y `Main`, y asi sucesivamente. Cada componente es una pieza autocontenida que delega a piezas mas pequenas.

## El Arbol de Componentes

Cuando compones componentes, obtienes un arbol:

```
          App
         /   \
     Header   Main
     /   \    /   \
  Logo  Nav  Sidebar  Content
                       /   \
                  ArticleList  Pagination
```

Este arbol refleja el arbol del DOM que el navegador renderiza, pero a un nivel de abstraccion mas alto. En lugar de pensar en `<div>` y `<span>`, piensas en `Header` y `ArticleList`.

Los datos fluyen hacia abajo en este arbol (de padre a hijo via props). Los eventos fluyen hacia arriba (de hijo a padre via callbacks). Este flujo de datos unidireccional es una convencion compartida por todos los frameworks principales.

## Ciclo de Vida

Los componentes no solo se renderizan una vez. Pasan por un ciclo de vida:

1. **Mount** — el componente aparece en la UI por primera vez. Aqui es donde configuras suscripciones, obtienes datos o inicias temporizadores.
2. **Update** — los datos del componente cambian y se re-renderiza. Esto sucede muchas veces durante la vida del componente.
3. **Unmount** — el componente se elimina de la UI. Aqui es donde limpias: cancelas peticiones de red, remueves event listeners, limpias temporizadores.

```
Mount → Update → Update → Update → ... → Unmount
```

Cada framework te da hooks para estas fases:

| Phase   | React              | Vue               | Angular             | Svelte            |
|---------|--------------------|--------------------|---------------------|-------------------|
| Mount   | `useEffect(() => {}, [])` | `onMounted()`    | `ngOnInit()`        | `onMount()`       |
| Update  | `useEffect(() => {}, [dep])` | `watch()`     | `ngOnChanges()`     | `$:` reactive     |
| Unmount | `useEffect` return fn | `onUnmounted()`  | `ngOnDestroy()`     | `onDestroy()`     |

La sintaxis varia. El concepto es universal.

## Como Se Mapea a los Frameworks

Aqui esta el mismo componente `Greeting` en cuatro frameworks. Observa como todos expresan la misma idea.

**React** — una funcion que retorna JSX:
```jsx
function Greeting({ name }) {
  return <h1>Hello, {name}</h1>;
}
```

**Vue** — un Single File Component:
```vue
<template>
  <h1>Hello, {{ name }}</h1>
</template>
<script setup>
defineProps({ name: String });
</script>
```

**Angular** — una clase con decorator y template:
```typescript
@Component({
  selector: 'app-greeting',
  template: `<h1>Hello, {{ name }}</h1>`,
})
export class GreetingComponent {
  @Input() name: string;
}
```

**Svelte** — un archivo `.svelte`:
```svelte
<script>
  export let name;
</script>
<h1>Hello, {name}</h1>
```

Cuatro sintaxis. Un concepto: datos entran, UI sale.

## Errores Comunes

**El mega-componente.** Un unico componente que renderiza una pagina entera — header, sidebar, contenido, footer, modales y todo. Tiene 500 lineas, 30 variables de estado y nadie quiere tocarlo. Si no puedes describir lo que hace un componente en una oracion, es demasiado grande. Dividelo.

**Sin limites claros.** Un componente que accede al DOM de un componente hermano para leer o modificar su estado. Si `Sidebar` necesita saber que esta seleccionado en `Content`, esa informacion deberia fluir a traves de su padre compartido, no mediante manipulacion directa del DOM.

**Componentes que son solo wrappers.** Un `UserSection` que literalmente solo renderiza `<div><UserList /></div>` sin logica, estilos ni composicion adicional. Cada componente deberia justificar su existencia.

**Mezclar niveles de abstraccion.** Un componente que mezcla elementos crudos como `<div>` y `<span>` con componentes de alto nivel como `<DataTable>` y `<Chart>` en el mismo return statement, haciendo la template dificil de escanear. Manten los componentes en un nivel de abstraccion consistente.

## Puntos Clave

- Un componente es una funcion: datos entran, UI sale. Este modelo mental es universal a traves de los frameworks.
- Los componentes encapsulan markup, estilos y comportamiento detras de una interfaz publica.
- La composicion (componentes dentro de componentes) produce un arbol. Los datos fluyen hacia abajo, los eventos fluyen hacia arriba.
- Cada componente se monta, actualiza y desmonta. Limpia lo que configures.
- Si no puedes describir el proposito de un componente en una oracion, dividelo.
