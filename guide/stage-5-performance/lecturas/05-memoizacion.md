# Memoizacion

La memoizacion es una técnica de optimización que cachea el resultado de computaciones costosas o previene re-renders innecesarios al reutilizar resultados anteriores cuando las entradas no han cambiado. Es una herramienta poderosa, pero su uso incorrecto puede empeorar el rendimiento en lugar de mejorarlo.

---

## Memoizacion en Angular

Angular no tiene equivalentes directos a las APIs de memoizacion de otros frameworks porque su modelo de change detection funciona diferente. En lugar de memoizar componentes o callbacks individuales, Angular ofrece herramientas a nivel de arquitectura:

- **Estrategia de change detection `OnPush`:** El componente solo se re-renderiza cuando sus inputs cambian por referencia o cuando un signal que lee en el template emite un nuevo valor. Es la forma mas efectiva de evitar re-renders innecesarios.
- **Senales computadas con `computed()`:** Cachean automaticamente el resultado de una computacion derivada y solo recalculan cuando las senales de las que dependen cambian. Reemplazan la necesidad de memoizacion manual de valores.
- **Pipes puros:** El resultado se cachea y se recalcula solo cuando la entrada cambia por referencia.

```typescript
// Senales computadas: recalcula solo cuando items() cambia
sortedData = computed(() =>
  this.items().sort((a, b) => a.name.localeCompare(b.name))
);

// OnPush + signals: el componente solo se re-renderiza
// cuando las senales que lee en el template emiten nuevos valores
@Component({
  selector: 'app-expensive-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (item of sortedData(); track item.id) {
      <app-list-item [item]="item" (selected)="onSelect($event)" />
    }
  `,
})
export class ExpensiveListComponent {
  items = input.required<Item[]>();
  sortedData = computed(() =>
    this.items().sort((a, b) => a.name.localeCompare(b.name))
  );
  onSelect(id: string) { /* ... */ }
}
```

**Nota:** En Angular, no necesitas memoizar callbacks individuales (como `useCallback` en otros frameworks). Las senales y `OnPush` manejan la reactividad de forma granular. Si un callback no depende de estado reactivo, simplemente es un metodo del componente y no causa re-renders por si mismo.

---

## Cuando Usar Memoizacion

La memoizacion es beneficiosa cuando:

- **Calculos costosos que se re-ejecutarian en cada ciclo de change detection.** Ordenar, filtrar o transformar datasets grandes. Generar datos para graficos o tablas complejas. En Angular, usa `computed()` signals para cachear estos valores automaticamente.
- **Componentes que reciben inputs complejos y renderizan subarboles grandes.** Un componente de lista con 500 items que se re-renderiza porque un componente hermano cambio estado. En Angular, `OnPush` change detection evita estos re-renders innecesarios.
- **Valores derivados que dependen de estado reactivo.** Cuando un valor se calcula a partir de una o mas senales, `computed()` cachea el resultado y solo recalcula cuando las dependencias cambian.

---

## Cuando NO Usar Memoizacion

La memoizacion tiene un costo: cada `computed()` anade una comparacion de dependencias y almacenamiento en cache. Si el costo de la memoizacion excede el costo de la computacion, estas empeorando el rendimiento.

- **Calculos simples.** Sumar dos numeros, concatenar strings, o acceder a propiedades de un objeto es mas rápido que la sobrecarga de un `computed()`. La comparacion de dependencias y el almacenamiento en cache cuestan mas que el calculo mismo.
- **Componentes que se re-renderizan infrecuentemente de todos modos.** Si un componente se re-renderiza una vez cada 10 segundos, aplicar `OnPush` no tiene impacto perceptible.
- **Optimización prematura.** Primero haz profiling con las DevTools del navegador o Angular DevTools. Si no puedes medir el problema, no necesitas la solución. Memoizar "por si acaso" anade complejidad sin beneficio verificado.

---

## La Trampa de la Memoizacion Rota

En componentes con `OnPush`, Angular compara inputs por referencia. Si pasas objetos nuevos en cada ciclo de change detection, el componente se re-renderiza aunque los valores internos no hayan cambiado:

```typescript
// ROTO: nueva referencia de objeto en cada change detection
// El componente hijo con OnPush se re-renderiza innecesariamente
@Component({
  template: `<app-child [config]="getConfig()" />`,
})
export class ParentComponent {
  // Cada llamada crea un nuevo objeto → OnPush lo detecta como cambio
  getConfig() { return { color: 'red' }; }
}

// CORRECTO: referencia estable con computed()
@Component({
  template: `<app-child [config]="config()" />`,
})
export class ParentComponent {
  color = signal('red');
  // computed() cachea el resultado y solo recalcula cuando color() cambia
  config = computed(() => ({ color: this.color() }));
}
```

Marcar un componente hijo con `OnPush` mientras se le pasan inputs con referencias inestables anade la sobrecarga de la comparacion de referencia en cada ciclo de change detection sin prevenir ningun re-render. El componente se re-renderiza de todas formas, pero ahora con el costo extra de la comparacion.

---

## Proceso de Optimización

1. **Detecta el problema:** Usa Angular DevTools o el panel de Performance de las DevTools del navegador para identificar componentes que se re-renderizan excesivamente.
2. **Mide el impacto:** Cuantifica cuantos milisegundos se gastan en los re-renders innecesarios. Si el total es menor a 16ms por frame, probablemente no hay un problema real.
3. **Aplica memoizacion:** Solo en los componentes y computaciones identificados como cuellos de botella reales.
4. **Verifica:** Confirma con profiling que la memoizacion redujo los re-renders y mejoro los tiempos.

---

## Puntos Clave

- La memoizacion cachea resultados de computaciones costosas y previene re-renders innecesarios.
- Usa `computed()` para valores derivados costosos, `OnPush` change detection para evitar re-renders innecesarios, pipes puros para transformaciones en templates.
- No memoices calculos simples ni componentes que se re-renderizan infrecuentemente -- el costo de la memoizacion puede exceder el beneficio.
- La memoizacion rota (inputs con referencias inestables a componentes con `OnPush`) es peor que no memoizar, porque anade costo sin beneficio.
- Primero haz profiling con Angular DevTools, luego memoiza los cuellos de botella comprobados -- nunca al reves.
