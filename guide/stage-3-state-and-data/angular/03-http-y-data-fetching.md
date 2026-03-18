# HTTP y Data Fetching en Angular

> Cómo obtener datos de APIs en Angular. Cubre `HttpClient`, observables para data fetching, `@defer`, templates de loading/error, `httpResource`, `rxResource` e interceptors.

---

## `HttpClient` --- El Cliente HTTP Integrado

Angular incluye un cliente HTTP completo que soporta tipado, interceptors, progress events y testing.

```typescript
// Configurar en app.config.ts
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const appConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
```

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
  id: string;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);

  getUsers() {
    // Returns Observable<User[]> — fully typed
    return this.http.get<User[]>('/api/users');
  }

  getUserById(id: string) {
    return this.http.get<User>(`/api/users/${id}`);
  }

  createUser(data: { name: string; email: string }) {
    return this.http.post<User>('/api/users', data);
  }

  deleteUser(id: string) {
    return this.http.delete(`/api/users/${id}`);
  }
}
```

---

## Observables para Data Fetching

`HttpClient` retorna Observables. En componentes, consume los datos con `toSignal()` o `async` pipe:

```typescript
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  template: `
    @if (users()) {
      <ul>
        @for (user of users(); track user.id) {
          <li>{{ user.name }} — {{ user.email }}</li>
        }
      </ul>
    } @else {
      <p>Cargando usuarios...</p>
    }
  `,
})
export class UserListComponent {
  private userService = inject(UserService);

  // Convert Observable to Signal — subscribes automatically, unsubscribes on destroy
  users = toSignal(this.userService.getUsers());
}
```

`toSignal()` convierte un Observable en un Signal. Se suscribe automáticamente al crear y se desuscribe cuando el componente se destruye. El valor es `undefined` hasta que el Observable emita.

---

## `httpResource` y `rxResource` (Angular 19+)

Para data fetching declarativo con estados de loading/error integrados:

```typescript
import { Component, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';

interface Product {
  id: string;
  name: string;
  price: number;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  template: `
    @if (productsResource.isLoading()) {
      <app-skeleton-list />
    }

    @if (productsResource.error()) {
      <app-error-message
        [message]="'Error al cargar productos'"
        (retry)="productsResource.reload()"
      />
    }

    @if (productsResource.value(); as products) {
      <ul>
        @for (product of products; track product.id) {
          <li>{{ product.name }} — {{ product.price | currency }}</li>
        }
      </ul>
    }
  `,
})
export class ProductListComponent {
  category = signal('electronics');

  // Automatically refetches when category() changes
  productsResource = httpResource<Product[]>(() =>
    `/api/products?category=${this.category()}`
  );
}
```

`httpResource` refetch automáticamente cuando las dependencias (signals) cambian. Proporciona `.isLoading()`, `.error()`, `.value()` y `.reload()`.

Para casos más complejos con Observables, usa `rxResource`:

```typescript
import { rxResource } from '@angular/core/rxjs-interop';

@Component({ /* ... */ })
export class SearchComponent {
  query = signal('');

  results = rxResource({
    request: () => this.query(),
    loader: ({ request: query }) =>
      this.searchService.search(query).pipe(
        retry(2),
        catchError(() => of([]))
      ),
  });
}
```

---

## `@defer` para Lazy Loading

`@defer` carga componentes pesados de forma diferida con estados de loading y error integrados:

```html
<!-- Only loads the chart component when visible in the viewport -->
@defer (on viewport) {
  <app-sales-chart [data]="salesData()" />
} @loading (minimum 200ms) {
  <app-skeleton [height]="300" />
} @error {
  <p>Error al cargar el gráfico</p>
} @placeholder {
  <div style="height: 300px; background: #f3f4f6;"></div>
}
```

Triggers disponibles:

| Trigger | Cuándo carga |
|---------|-------------|
| `on viewport` | Cuando el placeholder es visible en el viewport |
| `on idle` | Cuando el browser está idle |
| `on interaction` | Cuando el usuario interactúa con el placeholder |
| `on hover` | Cuando el usuario hace hover sobre el placeholder |
| `on timer(5s)` | Después de un tiempo específico |
| `when condition` | Cuando una expresión booleana es true |

---

## Interceptors

Los interceptors interceptan todas las peticiones HTTP para agregar headers, manejar errores o transformar responses:

```typescript
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

// Functional interceptor (modern style)
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.token();

  if (token) {
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    return next(authReq);
  }

  return next(req);
};

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        inject(AuthService).logout();
        inject(Router).navigate(['/login']);
      }
      return throwError(() => error);
    }),
  );
};
```

```typescript
// Register in app.config.ts
provideHttpClient(
  withInterceptors([authInterceptor, errorInterceptor])
);
```

---

## Errores Comunes

- **Olvidar suscribirse a los Observables.** Un Observable de `HttpClient` no hace nada hasta que alguien se suscribe. Si llamas `this.http.get('/api/data')` sin `.subscribe()`, `toSignal()` o `async` pipe, la petición nunca se ejecuta.
- **Memory leaks por suscripciones no limpiadas.** Si usas `.subscribe()` manualmente, debes desuscribirte en `ngOnDestroy`. Prefiere `toSignal()`, `httpResource` o `async` pipe que manejan el lifecycle automáticamente.
- **Llamar a APIs en el constructor.** El data fetching debe ocurrir cuando el componente se renderiza, no cuando se instancia. Usa `httpResource`, `rxResource` o `toSignal()` que se activan en el momento correcto.
- **Un interceptor monolítico que hace todo.** Separa interceptors por responsabilidad: uno para auth, otro para error handling, otro para logging.

---

## Puntos Clave

- `HttpClient` es el cliente HTTP integrado de Angular, con tipado completo e interceptors.
- `toSignal()` convierte Observables en Signals, gestionando suscripción y cleanup automáticamente.
- `httpResource` (Angular 19+) es la forma declarativa de data fetching con loading/error states integrados.
- `@defer` permite lazy loading de componentes pesados con triggers como viewport, idle o interaction.
- Los interceptors funcionales interceptan todas las peticiones HTTP para auth, error handling o logging.
