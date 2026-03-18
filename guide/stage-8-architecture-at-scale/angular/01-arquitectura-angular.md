# Arquitectura Angular a Escala

> Cómo organizar aplicaciones Angular grandes. Cubre standalone vs feature modules, lazy-loaded routes, library projects, Nx para monorepos y Analog como meta-framework.

---

## La Evolución: De NgModules a Standalone

Angular 19 estableció standalone components como el valor por defecto. Los `NgModule` siguen existiendo para compatibilidad, pero los proyectos nuevos no los necesitan.

| Enfoque | Cuándo usar |
|---------|------------|
| **Standalone** (por defecto) | Proyectos nuevos, migraciones de proyectos existentes |
| **NgModule** | Codebases legacy, bibliotecas que aún no migran |

```typescript
// Standalone component — declares its own dependencies
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, UserAvatarComponent],
  template: `...`,
})
export class UserProfileComponent {}

// No NgModule needed — the component IS the unit of organization
```

---

## Organización por Features con Standalone

```
src/
  app/
    features/
      auth/
        components/
          login-form.component.ts
          register-form.component.ts
        services/
          auth.service.ts
        guards/
          auth.guard.ts
        auth.routes.ts          ← routes for this feature
      products/
        components/
          product-list.component.ts
          product-detail.component.ts
        services/
          product.service.ts
        products.routes.ts
      checkout/
        ...
    shared/
      components/
        button.component.ts
        spinner.component.ts
      pipes/
        currency-format.pipe.ts
      utils/
        validators.ts
    app.routes.ts               ← composes feature routes
    app.config.ts
    app.component.ts
```

Cada feature es un directorio autocontenido con sus componentes, servicios, guards y rutas. La carpeta `shared/` contiene componentes y utilidades usadas por múltiples features.

---

## Lazy-Loaded Routes

Cada feature se carga solo cuando el usuario navega a ella:

```typescript
// app.routes.ts
export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },

  // Lazy-load entire feature
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then(m => m.authRoutes),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./features/products/products.routes').then(m => m.productRoutes),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./features/checkout/checkout.routes').then(m => m.checkoutRoutes),
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.routes').then(m => m.adminRoutes),
    canActivate: [adminGuard],
  },
];
```

```typescript
// features/products/products.routes.ts
export const productRoutes: Routes = [
  {
    path: '',
    component: ProductListComponent,
  },
  {
    path: ':id',
    component: ProductDetailComponent,
    resolve: { product: productResolver },
  },
];
```

Cada `loadChildren` crea un chunk separado que solo se descarga cuando el usuario navega a esa ruta. El admin panel no se carga hasta que un admin accede.

---

## Library Projects con `ng generate library`

Para código compartido entre múltiples aplicaciones Angular:

```bash
# Create a library within your workspace
ng generate library @my-org/ui-components

# Structure created:
projects/
  ui-components/
    src/
      lib/
        button/
          button.component.ts
        spinner/
          spinner.component.ts
      public-api.ts       ← what gets exported
    package.json
```

```typescript
// projects/ui-components/src/public-api.ts
export { ButtonComponent } from './lib/button/button.component';
export { SpinnerComponent } from './lib/spinner/spinner.component';
```

```typescript
// Consume in any app
import { ButtonComponent } from '@my-org/ui-components';

@Component({
  imports: [ButtonComponent],
  template: `<lib-button variant="primary">Guardar</lib-button>`,
})
export class MyComponent {}
```

Library projects son ideales para:
- **Design systems** compartidos entre apps.
- **Utilidades comunes** (validators, pipes, interceptors).
- **Modelos de dominio** usados por múltiples apps.

---

## Nx para Monorepos Angular

Nx es la herramienta líder para monorepos Angular. Proporciona:

```bash
# Create Nx workspace with Angular
npx create-nx-workspace@latest my-org --preset=angular-monorepo

# Generate a new app
nx generate @nx/angular:app admin-panel

# Generate a shared library
nx generate @nx/angular:library shared-ui

# Run only affected projects (smart caching)
nx affected --target=test
nx affected --target=build
```

Estructura de un monorepo Nx:

```
my-org/
  apps/
    customer-portal/       ← app 1
    admin-panel/           ← app 2
  libs/
    shared/
      ui/                  ← shared components
      data-access/         ← shared services, API clients
      utils/               ← shared utilities
    feature-auth/          ← auth feature (used by both apps)
    feature-products/      ← products feature
  nx.json                  ← Nx configuration
  tsconfig.base.json
```

**Beneficios de Nx:**
- **Computation caching:** no re-ejecuta tests/builds si el código no cambió.
- **Affected commands:** solo ejecuta tests para los proyectos afectados por un cambio.
- **Dependency graph:** `nx graph` visualiza las dependencias entre proyectos.
- **Enforce module boundaries:** reglas de lint que previenen imports ilegales (ej: una feature importando de otra feature directamente).

```typescript
// nx.json — enforce boundaries
{
  "@nx/enforce-module-boundaries": [
    "error",
    {
      "depConstraints": [
        { "sourceTag": "type:feature", "onlyDependOnLibsWithTags": ["type:shared", "type:data-access"] },
        { "sourceTag": "type:shared", "onlyDependOnLibsWithTags": ["type:shared"] }
      ]
    }
  ]
}
```

---

## Analog: El Meta-framework de Angular

Analog trae el modelo de Next.js/Nuxt a Angular:

```bash
# Create Analog project
npm create analog@latest my-analog-app
```

```
src/
  app/
    pages/
      index.page.ts           ← / route (file-based routing)
      about.page.ts           ← /about route
      products/
        [id].page.ts          ← /products/:id route
    components/
    services/
  server/
    routes/
      v1/
        users.ts              ← API route: /api/v1/users
```

**Features de Analog:**
- **File-based routing:** los archivos `.page.ts` se convierten en rutas automáticamente.
- **API routes:** archivos en `server/routes/` se convierten en endpoints de API.
- **SSR/SSG integrado:** server-side rendering y static site generation sin configuración manual.
- **Powered by Vite + Nitro:** builds rápidos y deployment a cualquier plataforma (Vercel, Cloudflare, Node, etc.).

```typescript
// src/app/pages/products/[id].page.ts
import { Component, input } from '@angular/core';
import { injectLoad } from '@analogjs/router';

@Component({
  standalone: true,
  template: `
    @if (product(); as product) {
      <h1>{{ product.name }}</h1>
      <p>{{ product.price | currency }}</p>
    }
  `,
})
export default class ProductDetailPage {
  product = input.required<Product>(); // from route resolver
}
```

---

## Errores Comunes

- **Features acopladas.** Feature A importa componentes internos de Feature B en lugar de usar una API pública. Cuando B refactoriza, A se rompe. Usa `public-api.ts` para exponer solo lo necesario.
- **Lazy loading sin preloading.** Si todas las rutas son lazy, la primera navegación carga el chunk, causando un delay visible. Usa preloading strategies para las rutas más comunes.
- **Monorepo sin module boundaries.** Sin reglas de Nx que impidan imports cruzados, el monorepo se convierte en un monolith con dependencias circulares.
- **Library projects para código que solo usa una app.** Si solo una app usa una librería, ponla como una carpeta de feature dentro de la app. Las libraries son para código compartido entre múltiples consumidores.
- **Migrar a Analog sin necesitar SSR.** Analog brilla cuando necesitas SSR, API routes o file-based routing. Para SPAs internas, Angular CLI estándar es más simple.

---

## Puntos Clave

- Standalone components son el estándar. Cada componente declara sus dependencias explícitamente.
- Organiza por features con lazy-loaded routes. Cada feature es un directorio autocontenido.
- Library projects (`ng generate library`) encapsulan código compartido con una API pública clara.
- Nx es la herramienta líder para monorepos Angular: caching, affected commands, dependency graph y module boundaries.
- Analog es el meta-framework de Angular: file-based routing, API routes, SSR/SSG, powered by Vite + Nitro.
