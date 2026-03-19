# API de Componentes React --- Props, Refs y Patrones



> Cómo diseñar APIs de componentes robustas en React. Cubre tipado de props con TypeScript, `forwardRef`, controlled vs uncontrolled, patrones de `children` y spreading de props.

---

## Contenido
- [Diseño de interfaces de props](#diseño-de-interfaces-de-props)
- [forwardRef para ref forwarding](#forwardref-para-ref-forwarding)
- [Controlled vs uncontrolled](#controlled-vs-uncontrolled)
- [Patrones de children](#patrones-de-children)
- [Spreading props con rest](#spreading-props-con-rest)
- [Anti-patterns](#anti-patterns)

---

## Diseño de Interfaces de Props

Las props definen el contrato público de un componente. Un buen diseño de props hace que el componente sea predecible y fácil de usar.

<<< @/snippets/react/s2-02-api-de-componentes-react-01.tsx

- **Union types para variantes.** `'primary' | 'secondary'` es mejor que `string` --- restringe los valores válidos.
- **Valores por defecto en el destructuring.** Hacen que las props opcionales sean predecibles sin necesitar documentación extra.
- **JSDoc comments.** Los comentarios `/** */` aparecen en el autocompletado del IDE.

En Angular usas `input<'primary' | 'secondary'>('primary')`. En React usas TypeScript puro con interfaces.

---

## `forwardRef` para Ref Forwarding

Cuando un componente wrappea un elemento nativo, los consumidores necesitan acceder al elemento DOM subyacente. `forwardRef` lo hace posible:

<<< @/snippets/react/s2-02-api-de-componentes-react-02.tsx

<<< @/snippets/react/s2-02-api-de-componentes-react-03.tsx

En Angular usas `viewChild` para acceder a elementos del template. En React usas `ref` + `forwardRef`.

---

## Controlled vs Uncontrolled

### Controlled: React controla el valor

<<< @/snippets/react/s2-02-api-de-componentes-react-04.tsx

El valor siempre refleja el state de React. Cada keystroke dispara `onChange` → `setValue` → re-render.

### Uncontrolled: el DOM controla el valor

<<< @/snippets/react/s2-02-api-de-componentes-react-05.tsx

El DOM mantiene el valor. React solo lo lee cuando lo necesita.

**Cuándo usar cada uno:**

| Patrón | Cuándo |
|--------|--------|
| Controlled | Validación en tiempo real, formateo, lógica condicional |
| Uncontrolled | Formularios simples, integración con React Hook Form |

---

## Patrones de `children`

### Simple: contenido libre

<<< @/snippets/react/s2-02-api-de-componentes-react-06.tsx

### Render function: lógica del hijo decidida por el padre

<<< @/snippets/react/s2-02-api-de-componentes-react-07.tsx

<<< @/snippets/react/s2-02-api-de-componentes-react-08.tsx

### Compound: componentes que funcionan juntos

<<< @/snippets/react/s2-02-api-de-componentes-react-09.tsx

---

## Spreading Props con `{...rest}`

Para componentes que wrappean elementos nativos, pasa todas las props HTML al elemento subyacente:

<<< @/snippets/react/s2-02-api-de-componentes-react-10.tsx

```
// El consumidor puede pasar cualquier atributo HTML nativo
<Button variant="primary" type="submit" aria-label="Guardar" disabled>
  Guardar
</Button>
```

`extends React.ButtonHTMLAttributes&lt;HTMLButtonElement>` hereda todos los tipos de un `<button>` nativo.

---

## Anti-patterns

- **Usar `any` para props.** Destruye todo el valor de TypeScript. Si no sabes el tipo, usa `unknown` y haz type narrowing.
- **No hacer forwarding de refs.** Componentes de input, botón o cualquier wrapper de un elemento nativo deben soportar `ref`. Sin `forwardRef`, el consumidor no puede hacer focus programático ni integrarse con bibliotecas de formularios.
- **Demasiadas props (>10).** Un componente con más de 10 props probablemente viola el Principio de Responsabilidad Única. Divide en componentes más pequeños o agrupa props relacionadas en un objeto.
- **Mezclar controlled y uncontrolled.** Un input no puede cambiar entre `value` (controlled) y `defaultValue` (uncontrolled) durante su vida. React lanza un warning explícito.

---

## Puntos Clave

- Las props se tipan con interfaces TypeScript. Union types para variantes, `?` para opcionales, defaults en destructuring.
- `forwardRef` permite que componentes wrapper expongan el elemento DOM subyacente.
- Controlled inputs: React controla el valor con `value` + `onChange`. Uncontrolled: el DOM controla con `defaultValue` + `ref`.
- `{...rest}` con `extends React.HTMLAttributes` crea componentes que aceptan cualquier atributo HTML nativo.
- Si un componente tiene más de 10 props, necesita ser dividido.


