# Memoizacion

La memoizacion es una técnica de optimización que cachea el resultado de computaciones costosas o previene re-renders innecesarios al reutilizar resultados anteriores cuando las entradas no han cambiado. Es una herramienta poderosa, pero su uso incorrecto puede empeorar el rendimiento en lugar de mejorarlo.

---

## Memoizacion por Framework

### React

- **`React.memo()`:** Memoizacion de componentes. El componente se re-renderiza solo si sus props cambian (comparacion superficial).
- **`useMemo`:** Cachea valores computados costosos entre renders. Recalcula solo cuando las dependencias cambian.
- **`useCallback`:** Cachea una referencia de función estable entre renders. Útil cuando la función se pasa como prop a componentes memoizados.

```jsx
// Memoize an expensive computation
const sortedData = useMemo(
  () => data.sort((a, b) => a.name.localeCompare(b.name)),
  [data]
);

// Memoize a callback to prevent child re-renders
const handleClick = useCallback(
  (id) => dispatch({ type: 'SELECT', id }),
  [dispatch]
);

// Memoize a component
const ExpensiveList = React.memo(({ items, onSelect }) => {
  return items.map(item => (
    <ListItem key={item.id} item={item} onSelect={onSelect} />
  ));
});
```

**Nota sobre React Compiler:** React Compiler (React 19+) optimiza automáticamente los componentes memorizando referencias estables, reduciendo en gran medida la necesidad de `useMemo`/`useCallback` manuales. Sin embargo, entender la memoizacion sigue siendo esencial para diagnosticar problemas de rendimiento.

### Vue

- Las propiedades `computed()` son automáticamente memoizadas. Rastrean dependencias automáticamente y cachean resultados.
- `v-memo` para memoizacion a nivel de template.

### Angular

- Estrategia de change detection `OnPush`: el componente solo se re-renderiza cuando sus inputs cambian por referencia.
- Pipes puros: el resultado se cachea y se recalcula solo cuando la entrada cambia.

---

## Cuando Usar Memoizacion

La memoizacion es beneficiosa cuando:

- **Calculos costosos que se re-ejecutarian en cada render.** Ordenar, filtrar o transformar datasets grandes. Generar datos para graficos o tablas complejas.
- **Componentes que reciben props complejos y renderizan subarboles grandes.** Un componente de lista con 500 items que se re-renderiza porque un componente hermano cambio estado.
- **Referencias de callback estables necesarias para optimización de componentes hijos o dependencias de efectos.** Cuando una función se pasa como prop a un componente memoizado, una referencia inestable (nueva función en cada render) anula la memoizacion del hijo.

---

## Cuando NO Usar Memoizacion

La memoizacion tiene un costo: cada `useMemo`/`useCallback` anade una comparacion de dependencias y almacenamiento en cache. Si el costo de la memoizacion excede el costo de la computacion, estas empeorando el rendimiento.

- **Calculos simples.** Sumar dos numeros, concatenar strings, o acceder a propiedades de un objeto es mas rápido que la sobrecarga de `useMemo`. La comparacion de dependencias y el almacenamiento en cache cuestan mas que el calculo mismo.
- **Componentes que se re-renderizan infrecuentemente de todos modos.** Si un componente se re-renderiza una vez cada 10 segundos, memoizarlo no tiene impacto perceptible.
- **Optimización prematura.** Primero haz profiling con las DevTools del navegador o React Profiler. Si no puedes medir el problema, no necesitas la solución. Memoizar "por si acaso" anade complejidad sin beneficio verificado.

---

## La Trampa de la Memoizacion Rota

`React.memo()` compara props por referencia superficial. Si pasas objetos inline, funciones inline o arrays nuevos como props, creas una nueva referencia en cada render, anulando silenciosamente la memoizacion:

```jsx
// BROKEN: new object reference every render → memo is useless
<ExpensiveChild style={{ color: 'red' }} />

// BROKEN: new function reference every render → memo is useless
<ExpensiveChild onClick={() => handleClick(id)} />

// FIXED: stable references
const style = useMemo(() => ({ color: 'red' }), []);
const handleItemClick = useCallback(() => handleClick(id), [id]);
<ExpensiveChild style={style} onClick={handleItemClick} />
```

Envolver un componente en `React.memo()` mientras se pasan props inestables anade la sobrecarga de la comparacion superficial en cada render sin prevenir ningun re-render. El componente se re-renderiza de todas formas, pero ahora con el costo extra de la comparacion.

---

## Proceso de Optimización

1. **Detecta el problema:** Usa React Profiler, Vue DevTools o el panel de Performance de las DevTools del navegador para identificar componentes que se re-renderizan excesivamente.
2. **Mide el impacto:** Cuantifica cuantos milisegundos se gastan en los re-renders innecesarios. Si el total es menor a 16ms por frame, probablemente no hay un problema real.
3. **Aplica memoizacion:** Solo en los componentes y computaciones identificados como cuellos de botella reales.
4. **Verifica:** Confirma con profiling que la memoizacion redujo los re-renders y mejoro los tiempos.

---

## Puntos Clave

- La memoizacion cachea resultados de computaciones costosas y previene re-renders innecesarios.
- Usa `useMemo` para valores computados costosos, `useCallback` para referencias de funciones estables, `React.memo()` para componentes.
- No memoices calculos simples ni componentes que se re-renderizan infrecuentemente -- el costo de la memoizacion puede exceder el beneficio.
- La memoizacion rota (props inestables a componentes memoizados) es peor que no memoizar, porque anade costo sin beneficio.
- Primero haz profiling, luego memoiza los cuellos de botella comprobados -- nunca al reves.
- React Compiler reduce significativamente la necesidad de memoizacion manual, pero el concepto sigue siendo fundamental.
