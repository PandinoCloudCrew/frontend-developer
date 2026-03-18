# Router y URL como Estado en Angular

> Cómo usar Angular Router para navegación, parámetros de ruta, query params, guards y resolvers. La URL como fuente de verdad para el estado de la aplicación.

---

## La URL como Fuente de Verdad

La URL es estado que el usuario puede ver, compartir y guardar en favoritos. Si un filtro, una pestaña activa o un ID de producto están en la URL, el usuario puede:

- Compartir un enlace directo a ese estado.
- Usar el botón de atrás del navegador para deshacer.
- Abrir múltiples pestañas con diferentes estados.

Angular Router es el sistema de routing más completo del ecosistema frontend: soporta lazy loading, guards, resolvers, navegación programática y múltiples outlets.

---

## Configuración de Rutas

```typescript
// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },

  // Eager-loaded route
  { path: 'products', component: ProductListComponent },

  // Route with parameter
  { path: 'products/:id', component: ProductDetailComponent },

  // Lazy-loaded route — loads the component only when navigated to
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/admin-dashboard.component').then(m => m.AdminDashboardComponent),
  },

  // Lazy-loaded child routes
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.routes').then(m => m.settingsRoutes),
  },

  // Wildcard — must be last
  { path: '**', component: NotFoundComponent },
];
```

```typescript
// app.config.ts
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig = {
  providers: [provideRouter(routes)],
};
```

---

## Route Params y Query Params

```typescript
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  template: `
    @if (product(); as product) {
      <h1>{{ product.name }}</h1>
      <p>{{ product.description }}</p>
    }
  `,
})
export class ProductDetailComponent {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  // Route param as signal: /products/:id
  private productId = toSignal(
    this.route.paramMap.pipe(map(params => params.get('id')!))
  );

  // Fetch product based on route param
  product = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('id')!),
      switchMap(id => this.productService.getById(id)),
    )
  );
}
```

### Query Params como Estado

```typescript
@Component({
  selector: 'app-product-list',
  standalone: true,
  template: `
    <input
      type="text"
      [value]="searchQuery()"
      (input)="updateSearch($any($event.target).value)"
      placeholder="Buscar productos..."
    />

    <select (change)="updateSort($any($event.target).value)">
      <option value="name">Nombre</option>
      <option value="price">Precio</option>
    </select>
  `,
})
export class ProductListComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Read query params as signals
  searchQuery = toSignal(
    this.route.queryParamMap.pipe(map(params => params.get('q') ?? '')),
    { initialValue: '' }
  );

  sortBy = toSignal(
    this.route.queryParamMap.pipe(map(params => params.get('sort') ?? 'name')),
    { initialValue: 'name' }
  );

  // Update URL (and thus state) without full navigation
  updateSearch(query: string) {
    this.router.navigate([], {
      queryParams: { q: query || null }, // null removes the param
      queryParamsHandling: 'merge', // keep other params
    });
  }

  updateSort(sort: string) {
    this.router.navigate([], {
      queryParams: { sort },
      queryParamsHandling: 'merge',
    });
  }
}
```

La URL `https://myapp.com/products?q=teclado&sort=price` es compartible, bookmarkable y sobrevive a un refresh.

---

## Guards --- Protección de Rutas

Los guards controlan si el usuario puede acceder a una ruta:

```typescript
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
```

```typescript
// Uso en rutas
{
  path: 'admin',
  loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent),
  canActivate: [authGuard],
}
```

---

## Resolvers --- Pre-cargar Datos

Los resolvers cargan datos antes de que la ruta se active:

```typescript
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';

export const productResolver: ResolveFn<Product> = (route) => {
  const productService = inject(ProductService);
  const id = route.paramMap.get('id')!;
  return productService.getById(id);
};
```

```typescript
{
  path: 'products/:id',
  component: ProductDetailComponent,
  resolve: { product: productResolver },
}
```

```typescript
// El componente accede a los datos resueltos
@Component({ /* ... */ })
export class ProductDetailComponent {
  private route = inject(ActivatedRoute);
  product = toSignal(this.route.data.pipe(map(data => data['product'])));
}
```

---

## Errores Comunes

- **Duplicar estado que ya está en la URL.** Si el filtro de búsqueda está en `?q=teclado`, no necesitas un signal separado `searchQuery`. Lee directamente del route.
- **Hardcodear rutas como strings.** En apps grandes, crea constantes de rutas para evitar typos: `const ROUTES = { products: '/products', admin: '/admin' }`.
- **Guards que no redirigen.** Un guard que retorna `false` sin redirigir deja al usuario en una página en blanco. Siempre retorna un `UrlTree` como alternativa.
- **Resolver que bloquea la navegación.** Si un resolver tarda 5 segundos, la navegación se bloquea 5 segundos. Considera cargar datos en el componente con un loading state en su lugar.

---

## Puntos Clave

- La URL es estado compartible, bookmarkable y que sobrevive a refreshes. Úsala para filtros, ordenamiento, paginación e IDs.
- `loadComponent` y `loadChildren` habilitan lazy loading de rutas para optimizar el bundle.
- Guards protegen rutas de acceso no autorizado. Siempre redirige al usuario si no puede acceder.
- Los resolvers pre-cargan datos, pero bloquean la navegación. Prefiere loading states en componentes para mejor UX.
- `queryParamsHandling: 'merge'` actualiza un query param sin perder los demás.
