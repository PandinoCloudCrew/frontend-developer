# API de Componentes Angular --- Inputs, Outputs y Más

> Cómo diseñar APIs de componentes robustas en Angular. Cubre tipado de inputs, outputs, `model()` para two-way binding, `viewChild`/`contentChild` y el objeto `host`.

---

## Tipado de Inputs con `input<T>()`

Los inputs signal-based soportan genéricos para type safety completo:

```typescript
import { Component, input } from '@angular/core';

interface Product {
  id: string;
  name: string;
  price: number;
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  template: `
    <h2>{{ product().name }}</h2>
    <p>{{ product().price | currency }}</p>
    @if (showBadge()) {
      <span>Destacado</span>
    }
  `,
})
export class ProductDetailComponent {
  // Required input — el padre DEBE proporcionarlo
  product = input.required<Product>();

  // Optional input con valor por defecto
  showBadge = input<boolean>(false);

  // Optional input que puede ser undefined
  discountLabel = input<string>();
}
```

```html
<!-- Error de compilación si no pasas [product] -->
<app-product-detail [product]="selectedProduct" />

<!-- Con inputs opcionales -->
<app-product-detail
  [product]="selectedProduct"
  [showBadge]="true"
  [discountLabel]="'20% OFF'"
/>
```

---

## Outputs Tipados con `output<T>()`

```typescript
import { Component, output } from '@angular/core';

interface CartEvent {
  productId: string;
  quantity: number;
}

@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  template: `
    <button (click)="handleAdd()">Agregar al carrito</button>
  `,
})
export class AddToCartComponent {
  productId = input.required<string>();

  // Typed output — el evento emitido tiene tipo CartEvent
  added = output<CartEvent>();

  handleAdd() {
    this.added.emit({
      productId: this.productId(),
      quantity: 1,
    });
  }
}
```

```html
<app-add-to-cart [productId]="'abc123'" (added)="onItemAdded($event)" />
```

`$event` en el padre tendrá tipo `CartEvent` automáticamente.

---

## Two-Way Binding con `model()`

`model()` combina un input y un output en una sola signal para two-way binding:

```typescript
import { Component, model } from '@angular/core';

@Component({
  selector: 'app-toggle',
  standalone: true,
  template: `
    <button
      (click)="checked.set(!checked())"
      [attr.aria-pressed]="checked()"
      [class.active]="checked()"
    >
      {{ checked() ? 'ON' : 'OFF' }}
    </button>
  `,
})
export class ToggleComponent {
  // model() creates a writable signal that syncs with the parent
  checked = model<boolean>(false);
}
```

```html
<!-- Two-way binding syntax -->
<app-toggle [(checked)]="isEnabled" />

<!-- Equivalent to: -->
<app-toggle [checked]="isEnabled" (checkedChange)="isEnabled = $event" />
```

`model()` es ideal para componentes de formulario y controles interactivos donde el padre y el hijo necesitan sincronizar un valor.

---

## `viewChild` y `contentChild`

Para acceder a elementos o componentes hijos desde la clase del componente:

### `viewChild` --- Elementos en tu propio template

```typescript
import { Component, viewChild, ElementRef, afterNextRender } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  template: `
    <input #searchInput type="text" placeholder="Buscar..." />
    <button (click)="focus()">Enfocar</button>
  `,
})
export class SearchComponent {
  searchInput = viewChild.required<ElementRef>('searchInput');

  constructor() {
    // Focus on init after the view renders
    afterNextRender(() => {
      this.searchInput().nativeElement.focus();
    });
  }

  focus() {
    this.searchInput().nativeElement.focus();
  }
}
```

### `contentChild` --- Elementos proyectados por el padre

```typescript
import { Component, contentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-list',
  standalone: true,
  template: `
    <ul>
      @for (item of items(); track item.id) {
        <li>
          <ng-container
            [ngTemplateOutlet]="itemTemplate()"
            [ngTemplateOutletContext]="{ $implicit: item }"
          />
        </li>
      }
    </ul>
  `,
})
export class ListComponent {
  items = input.required<any[]>();
  itemTemplate = contentChild.required(TemplateRef);
}
```

---

## Attribute Forwarding con `host`

El objeto `host` en el decorador `@Component` permite agregar atributos, clases y event listeners al elemento host del componente:

```typescript
@Component({
  selector: 'app-button',
  standalone: true,
  template: `<ng-content />`,
  host: {
    'role': 'button',
    '[attr.aria-disabled]': 'disabled()',
    '[class.btn-primary]': 'variant() === "primary"',
    '[class.btn-secondary]': 'variant() === "secondary"',
    '(click)': 'handleClick($event)',
  },
})
export class ButtonComponent {
  variant = input<'primary' | 'secondary'>('primary');
  disabled = input<boolean>(false);
  clicked = output<void>();

  handleClick(event: MouseEvent) {
    if (!this.disabled()) {
      this.clicked.emit();
    }
  }
}
```

```html
<!-- Renders: <app-button role="button" class="btn-primary"> -->
<app-button variant="primary" (clicked)="save()">Guardar</app-button>
```

---

## Errores Comunes

- **Usar `@Input()` y `@Output()` decorators en código nuevo.** Las APIs signal-based (`input()`, `output()`, `model()`) son la forma moderna. Los decoradores legacy siguen funcionando pero no son la dirección del framework.
- **Acceder a `viewChild` antes de que el view se renderice.** Los view children no están disponibles en el constructor. Usa `afterNextRender()` o accede a ellos en métodos que se ejecuten después del renderizado.
- **Mutar inputs directamente.** Los inputs son read-only signals. Para two-way binding, usa `model()`. Para transformar un input, usa `computed()`.
- **Diseñar APIs con demasiados inputs.** Si un componente tiene más de 7-10 inputs, probablemente está haciendo demasiado. Divide en componentes más pequeños o agrupa inputs relacionados en un objeto.

---

## Puntos Clave

- `input<T>()` con genéricos proporciona type safety completo. Usa `input.required<T>()` para inputs obligatorios.
- `output<T>()` emite eventos tipados del hijo al padre.
- `model()` habilita two-way binding con la sintaxis `[(prop)]` --- ideal para componentes de formulario.
- `viewChild` accede a elementos del propio template. `contentChild` accede a contenido proyectado por el padre.
- `host` permite agregar atributos, clases y event listeners al elemento host sin un wrapper extra.
