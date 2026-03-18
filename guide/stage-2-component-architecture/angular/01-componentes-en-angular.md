# Componentes en Angular

> Cómo crear y componer componentes en Angular. Cubre el decorador `@Component`, standalone components, signals para inputs/outputs, template syntax moderno y content projection.

---

## Anatomía de un Componente

Un componente Angular tiene tres partes: una clase TypeScript, un template HTML y estilos CSS. El decorador `@Component` las conecta.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  template: `
    <article class="card">
      <h2>{{ name }}</h2>
      <p>{{ role }}</p>
    </article>
  `,
  styles: `
    .card {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 16px;
    }
  `,
})
export class UserCardComponent {
  name = 'Jane Doe';
  role = 'Frontend Developer';
}
```

- **`selector`:** el tag HTML para usar el componente (`<app-user-card />`).
- **`standalone: true`:** el valor por defecto desde Angular 19. No necesita un `NgModule`.
- **`template` / `templateUrl`:** HTML del componente. Usa `template` para templates cortos, `templateUrl` para archivos separados.
- **`styles` / `styleUrl`:** estilos encapsulados al componente (no afectan otros componentes).

---

## Standalone Components (Por Defecto desde Angular 19)

Los standalone components no necesitan un módulo padre. Se importan directamente donde se usan:

```typescript
import { Component } from '@angular/core';
import { UserCardComponent } from './user-card/user-card.component';
import { BadgeComponent } from './badge/badge.component';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [UserCardComponent, BadgeComponent], // import what you use
  template: `
    <h1>Nuestro equipo</h1>
    <app-user-card />
    <app-badge label="Angular" />
  `,
})
export class TeamComponent {}
```

Cada componente declara explícitamente sus dependencias en `imports`. No hay módulos mágicos que provean componentes globalmente.

---

## Inputs con `input()`

Desde Angular 17+, los inputs se definen como signal-based usando la función `input()`:

```typescript
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  template: `
    <article>
      <h3>{{ name() }}</h3>
      <p>{{ price() | currency }}</p>
      @if (onSale()) {
        <span class="badge">En oferta</span>
      }
    </article>
  `,
})
export class ProductCardComponent {
  // Required input — must be provided by parent
  name = input.required<string>();

  // Required input with type
  price = input.required<number>();

  // Optional input with default value
  onSale = input<boolean>(false);
}
```

```html
<!-- Uso en el componente padre -->
<app-product-card [name]="'Teclado mecánico'" [price]="89.99" [onSale]="true" />
```

Los inputs son signals: se leen llamando a la función (`name()`, no `name`).

---

## Outputs con `output()`

Los outputs emiten eventos del componente hijo al padre:

```typescript
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  template: `
    <div class="item">
      <span>{{ name() }}</span>
      <button (click)="remove.emit(id())">Eliminar</button>
    </div>
  `,
})
export class CartItemComponent {
  id = input.required<string>();
  name = input.required<string>();
  remove = output<string>(); // emits the item id
}
```

```html
<!-- Componente padre escucha el evento -->
<app-cart-item
  [id]="item.id"
  [name]="item.name"
  (remove)="handleRemove($event)"
/>
```

---

## Template Syntax Moderno (Angular 17+)

Angular 17 introdujo una sintaxis de control de flujo nueva que reemplaza las directivas estructurales:

### `@if` / `@else`

```html
@if (user()) {
  <app-user-card [user]="user()" />
} @else {
  <p>No hay usuario logueado</p>
}
```

### `@for` con `track`

```html
<ul>
  @for (product of products(); track product.id) {
    <li>{{ product.name }} — {{ product.price | currency }}</li>
  } @empty {
    <li>No hay productos disponibles</li>
  }
</ul>
```

`track` es obligatorio --- le dice a Angular cómo identificar cada elemento para optimizar el DOM. Equivale a `key` en React o `:key` en Vue.

### `@switch`

```html
@switch (status()) {
  @case ('loading') {
    <app-spinner />
  }
  @case ('error') {
    <app-error-message [message]="errorMessage()" />
  }
  @case ('success') {
    <app-user-list [users]="users()" />
  }
  @default {
    <p>Estado desconocido</p>
  }
}
```

---

## Content Projection con `<ng-content>`

Content projection es el equivalente de `children` en React o `<slot>` en Vue. Permite al componente padre inyectar contenido dentro del componente hijo.

### Proyección simple

```typescript
@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div class="card">
      <ng-content />
    </div>
  `,
})
export class CardComponent {}
```

```html
<app-card>
  <h2>Título personalizado</h2>
  <p>Contenido que el padre decide</p>
</app-card>
```

### Proyección con slots nombrados

```typescript
@Component({
  selector: 'app-dialog',
  standalone: true,
  template: `
    <div class="dialog">
      <header>
        <ng-content select="[dialog-title]" />
      </header>
      <main>
        <ng-content />
      </main>
      <footer>
        <ng-content select="[dialog-actions]" />
      </footer>
    </div>
  `,
})
export class DialogComponent {}
```

```html
<app-dialog>
  <h2 dialog-title>Confirmar eliminación</h2>
  <p>¿Estás seguro de que quieres eliminar este elemento?</p>
  <div dialog-actions>
    <button (click)="cancel()">Cancelar</button>
    <button (click)="confirm()">Eliminar</button>
  </div>
</app-dialog>
```

---

## Errores Comunes

- **Olvidar `()` al leer signals en el template.** `{{ name }}` no funciona si `name` es un `input()`. Debe ser `{{ name() }}`.
- **Olvidar `track` en `@for`.** Angular 17+ requiere `track` obligatorio. Sin él, obtienes un error de compilación.
- **Importar componentes viejos con `declarations` en vez de `imports`.** Con standalone components, todo va en `imports`. `declarations` es parte del viejo sistema de `NgModule`.
- **Poner lógica de negocio en el componente.** Los componentes deben ser presentacionales. Extrae la lógica a servicios o funciones puras.

---

## Puntos Clave

- Los componentes Angular combinan clase TypeScript, template HTML y estilos CSS, conectados por `@Component`.
- Standalone components (por defecto) se importan directamente donde se usan, sin `NgModule`.
- Usa `input()` y `output()` signal-based para comunicación padre-hijo.
- `@if`, `@for` y `@switch` reemplazan `*ngIf`, `*ngFor` y `[ngSwitch]` con sintaxis más legible.
- `<ng-content>` permite content projection simple y con slots nombrados.
