# Servicios e Inyección de Dependencias en Angular

> Cómo usar el sistema de Dependency Injection de Angular para gestionar servicios, estado compartido y desacoplamiento. Cubre `@Injectable`, `inject()`, inyectores jerárquicos y servicios como contenedores de estado.

---

## Por Qué Angular Tiene DI

Angular tiene el sistema de Dependency Injection más maduro del ecosistema frontend. Mientras que React usa Context y Vue usa `provide`/`inject`, Angular tiene un sistema de inyección completo con scoping jerárquico, lo que permite:

- **Desacoplamiento:** los componentes no crean sus dependencias; las reciben.
- **Testabilidad:** inyecta mocks en tests sin mockear módulos globales.
- **Scoping:** diferentes partes de la app pueden recibir diferentes instancias del mismo servicio.

---

## Crear un Servicio con `@Injectable`

```typescript
import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' }) // singleton global
export class AuthService {
  private currentUser = signal<User | null>(null);

  readonly user = this.currentUser.asReadonly();
  readonly isAuthenticated = computed(() => this.currentUser() !== null);

  login(email: string, password: string): Promise<void> {
    // ... call API
    return fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
      .then(res => res.json())
      .then(user => this.currentUser.set(user));
  }

  logout() {
    this.currentUser.set(null);
  }
}
```

`providedIn: 'root'` crea una instancia singleton disponible en toda la aplicación. Es tree-shakeable: si nadie inyecta el servicio, no se incluye en el bundle.

---

## Inyectar Servicios con `inject()`

La forma moderna de inyectar dependencias (reemplaza la inyección por constructor):

```typescript
import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    @if (auth.isAuthenticated()) {
      <span>Hola, {{ auth.user()?.name }}</span>
      <button (click)="auth.logout()">Cerrar sesión</button>
    } @else {
      <a routerLink="/login">Iniciar sesión</a>
    }
  `,
})
export class HeaderComponent {
  protected auth = inject(AuthService);
}
```

`inject()` es más conciso que la inyección por constructor y funciona en cualquier contexto de inyección (componentes, servicios, directivas, pipes, guards).

---

## Inyectores Jerárquicos

Angular permite proveer servicios en diferentes niveles, creando instancias distintas:

```typescript
// Servicio con estado por instancia
@Injectable() // NO providedIn: 'root' — no es singleton
export class FormStateService {
  formData = signal<Record<string, any>>({});
  isDirty = computed(() => Object.keys(this.formData()).length > 0);

  setField(key: string, value: any) {
    this.formData.update(data => ({ ...data, [key]: value }));
  }

  reset() {
    this.formData.set({});
  }
}
```

```typescript
@Component({
  selector: 'app-checkout-form',
  standalone: true,
  providers: [FormStateService], // nueva instancia para este componente y sus hijos
  template: `...`,
})
export class CheckoutFormComponent {
  formState = inject(FormStateService);
}
```

| Scope | Cómo | Cuándo |
|-------|------|--------|
| **App-wide singleton** | `providedIn: 'root'` | Auth, theme, feature flags |
| **Per-component** | `providers: [Service]` en `@Component` | Estado de formulario, wizard steps |
| **Per-route** | `providers: [Service]` en la configuración de ruta | Estado de página |

---

## Servicios como Contenedores de Estado

Los servicios con signals son la forma idiomática de Angular para gestionar estado compartido:

```typescript
@Injectable({ providedIn: 'root' })
export class CartService {
  private items = signal<CartItem[]>([]);

  // Public read-only API
  readonly cartItems = this.items.asReadonly();
  readonly itemCount = computed(() => this.items().length);
  readonly total = computed(() =>
    this.items().reduce((sum, i) => sum + i.price * i.qty, 0)
  );

  // Public write API
  addItem(product: Product) {
    this.items.update(items => {
      const existing = items.find(i => i.productId === product.id);
      if (existing) {
        return items.map(i =>
          i.productId === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...items, { productId: product.id, name: product.name, price: product.price, qty: 1 }];
    });
  }

  removeItem(productId: string) {
    this.items.update(items => items.filter(i => i.productId !== productId));
  }

  clear() {
    this.items.set([]);
  }
}
```

**Patrón:** signals privados (mutables) + API pública de solo lectura (`asReadonly()`) + métodos de escritura explícitos. Esto encapsula las mutaciones y previene que los componentes modifiquen el estado directamente.

---

## Injection Tokens para Configuración

Para valores que no son clases (configuración, feature flags):

```typescript
import { InjectionToken, inject } from '@angular/core';

export interface AppConfig {
  apiUrl: string;
  featureFlags: Record<string, boolean>;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');

// Proveer en app.config.ts
export const appConfig = {
  providers: [
    {
      provide: APP_CONFIG,
      useValue: {
        apiUrl: 'https://api.example.com',
        featureFlags: { newCheckout: true },
      },
    },
  ],
};

// Inyectar en cualquier componente o servicio
@Component({ /* ... */ })
export class ApiService {
  private config = inject(APP_CONFIG);
  private apiUrl = this.config.apiUrl;
}
```

---

## Errores Comunes

- **Poner todo en servicios `providedIn: 'root'`.** Un servicio singleton para el estado de un formulario que solo usa un componente es innecesario. Usa `providers` a nivel de componente cuando el estado es local.
- **Inyección por constructor en código nuevo.** `inject()` es más conciso, no requiere declarar parámetros de constructor y funciona en más contextos. Usa `inject()` para código nuevo.
- **Servicios sin interfaz pública clara.** Exponer el signal mutable directamente permite que cualquier componente modifique el estado de forma descontrolada. Usa `asReadonly()` para la API pública y métodos explícitos para mutaciones.
- **Circular dependencies entre servicios.** El servicio A inyecta B, que inyecta A. Angular lanza un error en runtime. Rompe ciclos extrayendo la lógica compartida a un tercer servicio.

---

## Puntos Clave

- `@Injectable({ providedIn: 'root' })` crea singletons globales tree-shakeable.
- `inject()` es la forma moderna de inyectar dependencias, reemplazando la inyección por constructor.
- Los inyectores jerárquicos permiten diferentes instancias de un servicio en diferentes partes de la app.
- Servicios con signals (privado mutable + público readonly + métodos de escritura) son el patrón estándar para estado compartido.
- Angular tiene el sistema de DI más completo del ecosistema frontend --- úsalo para desacoplamiento y testabilidad.
