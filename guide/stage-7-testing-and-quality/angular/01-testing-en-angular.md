# Testing en Angular

> Cómo testear componentes, servicios y HTTP en Angular. Cubre `TestBed`, `@testing-library/angular`, testing de servicios, `provideHttpClientTesting`, mocking de servicios y testing de signals/observables.

---

## El Ecosistema de Testing de Angular

Angular viene con un framework de testing integrado basado en `TestBed`. Pero la comunidad ha convergido en que `@testing-library/angular` produce tests más mantenibles porque testea comportamiento del usuario, no detalles de implementación.

```bash
# Install Testing Library for Angular
npm install -D @testing-library/angular @testing-library/user-event
```

---

## Component Testing con `@testing-library/angular`

```typescript
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { ProductCardComponent } from './product-card.component';

test('renders product name and price', async () => {
  await render(ProductCardComponent, {
    inputs: {
      product: { id: '1', name: 'Teclado', price: 89.99 },
    },
  });

  expect(screen.getByText('Teclado')).toBeInTheDocument();
  expect(screen.getByText('$89.99')).toBeInTheDocument();
});

test('emits addToCart event when button is clicked', async () => {
  const user = userEvent.setup();
  const onAddToCart = jest.fn();

  await render(ProductCardComponent, {
    inputs: {
      product: { id: '1', name: 'Teclado', price: 89.99 },
    },
    on: {
      addToCart: onAddToCart,
    },
  });

  await user.click(screen.getByRole('button', { name: /agregar al carrito/i }));

  expect(onAddToCart).toHaveBeenCalledWith('1');
});
```

### Testing con Providers y Servicios

```typescript
import { render, screen } from '@testing-library/angular';
import { UserListComponent } from './user-list.component';
import { UserService } from '../services/user.service';
import { of } from 'rxjs';

test('renders user list from service', async () => {
  const mockUsers = [
    { id: '1', name: 'Jane', email: 'jane@example.com' },
    { id: '2', name: 'John', email: 'john@example.com' },
  ];

  await render(UserListComponent, {
    providers: [
      {
        provide: UserService,
        useValue: {
          getUsers: () => of(mockUsers),
        },
      },
    ],
  });

  expect(await screen.findByText('Jane')).toBeInTheDocument();
  expect(screen.getByText('John')).toBeInTheDocument();
});
```

---

## Testing de Servicios

Los servicios se pueden testear directamente o con `TestBed`:

```typescript
import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  test('starts with empty cart', () => {
    expect(service.cartItems()).toEqual([]);
    expect(service.itemCount()).toBe(0);
  });

  test('adds item to cart', () => {
    service.addItem({ id: '1', name: 'Teclado', price: 89.99 });

    expect(service.itemCount()).toBe(1);
    expect(service.cartItems()[0].name).toBe('Teclado');
  });

  test('calculates total correctly', () => {
    service.addItem({ id: '1', name: 'Teclado', price: 89.99 });
    service.addItem({ id: '2', name: 'Mouse', price: 45.00 });

    expect(service.total()).toBe(134.99);
  });

  test('removes item from cart', () => {
    service.addItem({ id: '1', name: 'Teclado', price: 89.99 });
    service.removeItem('1');

    expect(service.cartItems()).toEqual([]);
  });
});
```

Para servicios con signals, testea directamente leyendo los signals --- no necesitas `TestBed` si el servicio no tiene dependencias:

```typescript
test('CartService calculates total', () => {
  const service = new CartService();
  service.addItem({ id: '1', name: 'Teclado', price: 89.99 });

  expect(service.total()).toBe(89.99);
});
```

---

## Testing de HTTP con `provideHttpClientTesting`

```typescript
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService HTTP', () => {
  let service: UserService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(UserService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify no unexpected requests were made
    httpTesting.verify();
  });

  test('fetches users from API', () => {
    const mockUsers = [{ id: '1', name: 'Jane' }];

    // Subscribe to the observable
    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    // Expect a single request to the correct URL
    const req = httpTesting.expectOne('/api/users');
    expect(req.request.method).toBe('GET');

    // Provide mock response
    req.flush(mockUsers);
  });

  test('handles HTTP error', () => {
    service.getUsers().subscribe({
      error: (error) => {
        expect(error.status).toBe(500);
      },
    });

    const req = httpTesting.expectOne('/api/users');
    req.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });
  });
});
```

---

## Mocking de Servicios

### Con `jasmine.createSpyObj`

```typescript
const mockAuthService = jasmine.createSpyObj('AuthService', ['login', 'logout'], {
  isAuthenticated: signal(true),
  user: signal({ name: 'Jane' }),
});

await render(HeaderComponent, {
  providers: [
    { provide: AuthService, useValue: mockAuthService },
  ],
});
```

### Con `jest.fn()`

```typescript
const mockAuthService = {
  login: jest.fn().mockResolvedValue(undefined),
  logout: jest.fn(),
  isAuthenticated: signal(true),
  user: signal({ name: 'Jane' }),
};

await render(HeaderComponent, {
  providers: [
    { provide: AuthService, useValue: mockAuthService },
  ],
});
```

---

## Testing de Signals y Observables

### Testing signals directamente

```typescript
import { signal, computed } from '@angular/core';

test('computed signal updates when source changes', () => {
  const price = signal(100);
  const tax = computed(() => price() * 0.21);
  const total = computed(() => price() + tax());

  expect(total()).toBe(121);

  price.set(200);
  expect(total()).toBe(242);
});
```

### Testing observables con `firstValueFrom`

```typescript
import { firstValueFrom } from 'rxjs';

test('search service returns results', async () => {
  const results = await firstValueFrom(searchService.search('angular'));

  expect(results.length).toBeGreaterThan(0);
  expect(results[0].title).toContain('Angular');
});
```

---

## Errores Comunes

- **Testear detalles de implementación del componente.** Verificar que `component.isLoading === true` en vez de verificar que un spinner es visible. Usa Testing Library queries como `getByRole('progressbar')`.
- **No limpiar `HttpTestingController`.** Sin `httpTesting.verify()` en `afterEach`, peticiones inesperadas pasan desapercibidas.
- **Mockear todo sin razón.** Si un servicio no tiene efectos secundarios (pure functions, signals), úsalo directamente en tests. Solo mockea servicios con I/O externo (HTTP, localStorage, WebSocket).
- **Tests que dependen del timing de Zone.js.** Con signals, la mayoría de los tests son síncronos. Si necesitas `fakeAsync` / `tick`, probablemente estás testeando un patrón que sería más simple con signals.
- **Olvidar `await` en `render()`.** La función `render` de Testing Library para Angular es asíncrona. Sin `await`, los tests pueden pasar incorrectamente o fallar de forma intermitente.

---

## Puntos Clave

- `@testing-library/angular` testea comportamiento del usuario, no detalles de implementación. Es la forma recomendada de testear componentes.
- Servicios con signals se pueden testear directamente sin `TestBed` si no tienen dependencias.
- `provideHttpClientTesting` intercepta peticiones HTTP para verificar URLs, métodos y proporcionar responses mock.
- Mockea servicios con `{ provide: Service, useValue: mock }` en el array `providers`.
- `httpTesting.verify()` en `afterEach` asegura que no haya peticiones HTTP inesperadas.
