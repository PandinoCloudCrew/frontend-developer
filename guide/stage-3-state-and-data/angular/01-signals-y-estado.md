# Signals y Estado en Angular

> Cómo gestionar estado reactivo en componentes Angular con Signals. Cubre `signal()`, `computed()`, `effect()`, `linkedSignal()` y cuándo usar signals vs servicios.

---

## El Modelo Mental de Signals

Signals son la primitiva reactiva nativa de Angular (desde v16, estables desde v17). Representan un valor que cambia con el tiempo y notifican automáticamente a sus consumidores cuando cambian.

```typescript
import { signal, computed, effect } from '@angular/core';

// Create a writable signal
const count = signal(0);

// Read the value
console.log(count()); // 0

// Update the value
count.set(5);
count.update(prev => prev + 1); // 6
```

A diferencia del sistema anterior basado en Zone.js (que detectaba *cualquier* cambio asíncrono y verificaba *todo* el árbol de componentes), los signals son granulares: solo los consumidores directos de un signal se actualizan cuando ese signal cambia.

---

## `signal()` --- Estado Mutable

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <div>
      <p>Contador: {{ count() }}</p>
      <button (click)="increment()">+1</button>
      <button (click)="decrement()">-1</button>
      <button (click)="reset()">Reset</button>
    </div>
  `,
})
export class CounterComponent {
  count = signal(0);

  increment() {
    this.count.update(n => n + 1);
  }

  decrement() {
    this.count.update(n => Math.max(0, n - 1));
  }

  reset() {
    this.count.set(0);
  }
}
```

- `set(value)` reemplaza el valor completo.
- `update(fn)` calcula el nuevo valor a partir del anterior.

---

## `computed()` --- Estado Derivado

`computed()` crea un signal de solo lectura que se recalcula automáticamente cuando sus dependencias cambian:

```typescript
import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  template: `
    <div>
      <p>Items: {{ itemCount() }}</p>
      <p>Subtotal: {{ subtotal() | currency }}</p>
      <p>Envío: {{ shipping() | currency }}</p>
      <p><strong>Total: {{ total() | currency }}</strong></p>
    </div>
  `,
})
export class CartSummaryComponent {
  items = signal<CartItem[]>([]);

  itemCount = computed(() => this.items().length);

  subtotal = computed(() =>
    this.items().reduce((sum, item) => sum + item.price * item.qty, 0)
  );

  shipping = computed(() => (this.subtotal() > 50 ? 0 : 5.99));

  total = computed(() => this.subtotal() + this.shipping());
}
```

`computed()` se recalcula de forma lazy --- solo cuando se lee y alguna dependencia cambió. Si `items` no cambia, `subtotal`, `shipping` y `total` no se recalculan.

---

## `effect()` --- Side Effects Reactivos

`effect()` ejecuta código cuando sus dependencias cambian. Úsalo para side effects como logging, sincronización con localStorage o llamadas a APIs.

```typescript
import { Component, signal, effect } from '@angular/core';

@Component({
  selector: 'app-theme-picker',
  standalone: true,
  template: `
    <select (change)="theme.set($any($event.target).value)">
      <option value="light">Claro</option>
      <option value="dark">Oscuro</option>
    </select>
  `,
})
export class ThemePickerComponent {
  theme = signal<'light' | 'dark'>('light');

  constructor() {
    // Runs whenever theme changes
    effect(() => {
      document.documentElement.setAttribute('data-theme', this.theme());
      localStorage.setItem('theme', this.theme());
    });
  }
}
```

Los effects se limpian automáticamente cuando el componente se destruye.

**Regla importante:** no modifiques otros signals dentro de un `effect()` por defecto. Si necesitas hacerlo, usa `allowSignalWrites: true`, pero generalmente indica que deberías usar `computed()` en su lugar.

---

## `linkedSignal()` --- Signal Derivado Mutable

`linkedSignal()` (Angular 19+) crea un signal que se resetea cuando su fuente cambia, pero puede ser modificado localmente:

```typescript
import { Component, signal, linkedSignal } from '@angular/core';

@Component({
  selector: 'app-product-page',
  standalone: true,
  template: `
    <select (change)="selectedProductId.set($any($event.target).value)">
      @for (p of products(); track p.id) {
        <option [value]="p.id">{{ p.name }}</option>
      }
    </select>

    <label>
      Cantidad:
      <input
        type="number"
        [value]="quantity()"
        (input)="quantity.set(+$any($event.target).value)"
      />
    </label>
  `,
})
export class ProductPageComponent {
  products = signal([
    { id: '1', name: 'Teclado', defaultQty: 1 },
    { id: '2', name: 'Mouse', defaultQty: 2 },
  ]);

  selectedProductId = signal('1');

  // Resets to the product's default qty when selectedProductId changes
  // But can be manually overridden by the user
  quantity = linkedSignal(() => {
    const product = this.products().find(p => p.id === this.selectedProductId());
    return product?.defaultQty ?? 1;
  });
}
```

---

## Cuándo Usar Signals vs Servicios

| Situación | Usa |
|-----------|-----|
| Estado local de un componente (toggle, counter, form values) | `signal()` en el componente |
| Estado derivado | `computed()` |
| Estado compartido entre componentes hermanos | Servicio con signals |
| Estado global de la app (usuario autenticado, tema) | Servicio `providedIn: 'root'` con signals |
| Estado del servidor (datos de API) | `httpResource` / `rxResource` + signals |

```typescript
// Servicio con signals para estado compartido
@Injectable({ providedIn: 'root' })
export class CartService {
  private items = signal<CartItem[]>([]);

  readonly cartItems = this.items.asReadonly();
  readonly itemCount = computed(() => this.items().length);
  readonly total = computed(() =>
    this.items().reduce((sum, i) => sum + i.price * i.qty, 0)
  );

  addItem(item: CartItem) {
    this.items.update(items => [...items, item]);
  }

  removeItem(id: string) {
    this.items.update(items => items.filter(i => i.id !== id));
  }
}
```

---

## Errores Comunes

- **Olvidar `()` al leer un signal.** la interpolación `count` muestra el objeto signal, no el valor. Siempre usa la interpolación `count()`.
- **Modificar signals dentro de `effect()` sin `allowSignalWrites`.** Angular lo prohíbe por defecto para evitar loops infinitos. Usa `computed()` para valores derivados.
- **Crear un signal global cuando debería ser local.** Si solo un componente usa un valor, mantén el signal en el componente. No todo necesita ser un servicio.
- **Usar signals para estado del servidor.** Los datos de API tienen su propio lifecycle (loading, error, caching). Usa `httpResource` o `rxResource` para data fetching, no signals manuales.

---

## Puntos Clave

- `signal()` es estado mutable reactivo. `computed()` es estado derivado de solo lectura. `effect()` ejecuta side effects.
- Signals son granulares: solo actualizan los consumidores directos, sin verificar todo el árbol de componentes.
- `linkedSignal()` resuelve el patrón de "valor derivado con override local".
- Usa signals en componentes para estado local, en servicios para estado compartido.
- La regla de oro: si es derivado, usa `computed()`. Si es un side effect, usa `effect()`. Si es estado mutable, usa `signal()`.
