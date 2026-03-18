# Rendimiento en Angular

> Cómo optimizar el rendimiento de aplicaciones Angular. Cubre `OnPush` change detection, `@defer`, `track` en `@for`, Signals vs Zone.js, `NgOptimizedImage` y análisis de bundles.

---

## Change Detection: `OnPush`

Angular verifica cambios en los componentes para actualizar el DOM. Por defecto, revisa *todos* los componentes cuando ocurre cualquier evento asíncrono. Con `OnPush`, un componente solo se revisa cuando:

1. Uno de sus inputs (references) cambia.
2. Un evento se dispara dentro del componente.
3. Se usa `.markForCheck()` o un Observable emite con `async` pipe.
4. Un signal que lee el template cambia.

```typescript
import { Component, ChangeDetectionStrategy, input, signal } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article>
      <h3>{{ product().name }}</h3>
      <p>{{ product().price | currency }}</p>
      @if (isExpanded()) {
        <p>{{ product().description }}</p>
      }
      <button (click)="toggleExpand()">
        {{ isExpanded() ? 'Ver menos' : 'Ver más' }}
      </button>
    </article>
  `,
})
export class ProductCardComponent {
  product = input.required<Product>();
  isExpanded = signal(false);

  toggleExpand() {
    this.isExpanded.update(v => !v);
  }
}
```

**Regla práctica:** usa `OnPush` en todos los componentes. Es más predecible y más eficiente. Con signals, `OnPush` se convierte en el comportamiento natural.

---

## `@defer` para Lazy Loading de Componentes

`@defer` divide el bundle automáticamente y carga componentes solo cuando se necesitan:

```html
<!-- Carga el componente cuando es visible en el viewport -->
@defer (on viewport) {
  <app-analytics-dashboard [data]="analyticsData()" />
} @loading (minimum 300ms) {
  <div class="skeleton" style="height: 400px;"></div>
} @placeholder (minimum 100ms) {
  <div style="height: 400px; background: #f3f4f6;"></div>
}

<!-- Carga cuando el usuario hace hover -->
@defer (on hover) {
  <app-preview-tooltip [item]="selectedItem()" />
}

<!-- Carga cuando el browser está idle -->
@defer (on idle) {
  <app-recommendations [userId]="userId()" />
}

<!-- Carga basada en una condición -->
@defer (when showChart()) {
  <app-sales-chart />
}
```

`@defer` es más poderoso que `loadComponent` en rutas porque funciona a nivel de cualquier componente en el template, no solo en rutas.

---

## `track` en `@for` --- Identidad de Elementos

`track` es obligatorio en `@for` y le dice a Angular cómo identificar cada elemento para minimizar operaciones DOM:

```html
<!-- Good — track by unique ID -->
@for (product of products(); track product.id) {
  <app-product-card [product]="product" />
}

<!-- Bad — track by index (defeats optimization when items reorder) -->
@for (product of products(); track $index) {
  <app-product-card [product]="product" />
}
```

Si la lista se reordena, Angular con `track product.id` mueve los elementos DOM existentes. Con `track $index`, destruye y recrea los componentes --- mucho más costoso.

---

## Signals vs Zone.js

Angular ha dependido históricamente de Zone.js para detectar cambios asíncronos (setTimeout, fetch, event listeners). Zone.js intercepta *todas* las operaciones asíncronas y dispara change detection en *todo* el árbol.

**Signals cambian esto:** cada signal notifica granularmente solo a sus consumidores. Con signals + `OnPush`, Angular solo actualiza los componentes que realmente leen el signal que cambió.

```typescript
// Angular 19+ — optional: run without Zone.js
// app.config.ts
export const appConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(), // experimental in v19
  ],
};
```

En la práctica para la mayoría de los proyectos:
- Usa signals para estado.
- Usa `OnPush` en todos los componentes.
- Zone.js sigue incluido por compatibilidad, pero signals hacen el trabajo pesado.

---

## `NgOptimizedImage`

La directiva `NgOptimizedImage` optimiza imágenes automáticamente:

```typescript
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <!-- LCP image — priority flag prevents lazy loading -->
    <img ngSrc="/images/hero.jpg" width="1200" height="600" priority />

    <!-- Regular image — lazy loaded by default -->
    <img ngSrc="/images/product.jpg" width="400" height="300" />

    <!-- With responsive sizes -->
    <img
      ngSrc="/images/banner.jpg"
      width="1200"
      height="400"
      sizes="(max-width: 768px) 100vw, 1200px"
    />
  `,
})
export class HeroComponent {}
```

`NgOptimizedImage` automáticamente:
- Aplica `loading="lazy"` por defecto (excepto con `priority`).
- Genera `srcset` para responsive images.
- Previene layout shift exigiendo `width` y `height`.
- Conecta con CDN loaders (Cloudinary, Imgix, etc.).

---

## Análisis de Bundles

```bash
# Build con stats para analizar el bundle
ng build --stats-json

# Visualizar con webpack-bundle-analyzer (o esbuild-visualizer)
npx webpack-bundle-analyzer dist/mi-app/stats.json
```

Qué buscar:
- **Dependencias grandes** que se pueden lazy-load o reemplazar (moment.js por date-fns, lodash completo por funciones individuales).
- **Código duplicado** entre chunks.
- **Módulos que no deberían estar en el bundle principal** y pueden moverse a `@defer` o rutas lazy.

---

## Errores Comunes

- **No usar `OnPush`.** Sin `OnPush`, Angular verifica todos los componentes en cada evento asíncrono. En apps con 100+ componentes renderizados, esto causa lag visible.
- **`track $index` en listas que se reordenan.** Si los items cambian de posición (sorting, drag-drop), `track $index` causa destrucción y recreación innecesaria de componentes. Siempre trackea por un ID único.
- **Olvidar `priority` en imágenes LCP.** La imagen más grande visible (hero, banner) debe tener `priority` para que el browser la descargue inmediatamente en vez de lazy-load.
- **Importar bibliotecas completas.** `import * as _ from 'lodash'` incluye 70KB. `import { debounce } from 'lodash-es'` incluye 1KB. Usa imports específicos.
- **No analizar el bundle periódicamente.** Los bundles crecen silenciosamente. Ejecuta el análisis al menos una vez al mes para detectar regresiones.

---

## Puntos Clave

- Usa `OnPush` en todos los componentes. Con signals, Angular solo actualiza lo que realmente cambió.
- `@defer` es code splitting a nivel de componente con triggers declarativos (viewport, hover, idle, condition).
- `track` por ID único en `@for` minimiza operaciones DOM. Nunca uses `$index` para listas que se reordenan.
- `NgOptimizedImage` optimiza imágenes automáticamente: lazy loading, srcset, prevención de layout shift.
- Analiza el bundle regularmente con `--stats-json` para detectar dependencias grandes y código duplicado.
