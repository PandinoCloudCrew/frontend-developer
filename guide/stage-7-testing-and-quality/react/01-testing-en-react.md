# Testing en React



[← Volver a Etapa 7](../README.md)

> Cómo testear componentes, hooks y operaciones async en React. Cubre `@testing-library/react`, `user-event`, `renderHook`, MSW, `jest-dom` matchers y Vitest como test runner moderno.

## Contenido

- [El ecosistema de testing](#el-ecosistema-de-testing)
- [Component testing con Testing Library](#component-testing-con-testing-library)
- [user-event para interacciones](#user-event-para-interacciones)
- [Testing hooks con renderHook](#testing-hooks-con-renderhook)
- [Testing con context y providers](#testing-con-context-y-providers)
- [MSW para mocking de APIs](#msw-para-mocking-de-apis)
- [Operaciones async: waitFor y findBy](#operaciones-async-waitfor-y-findby)
- [jest-dom matchers](#jest-dom-matchers)
- [Vitest: el test runner moderno](#vitest-el-test-runner-moderno)
- [Anti-patterns](#anti-patterns)
- [Puntos clave](#puntos-clave)

---

## El ecosistema de testing

El stack de testing recomendado para React en 2025+:

| Herramienta | Rol |
|-------------|-----|
| **Vitest** | Test runner (reemplaza Jest) |
| **@testing-library/react** | Renderizar componentes y hacer queries |
| **@testing-library/user-event** | Simular interacciones del usuario |
| **@testing-library/jest-dom** | Matchers de DOM (`toBeInTheDocument`, etc.) |
| **MSW** | Interceptar peticiones HTTP en tests |

```bash
npm install -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom
```

En Angular, el equivalente es `TestBed` + `@testing-library/angular`. La filosofia es la misma: testear comportamiento del usuario, no detalles de implementacion.

---

## Component testing con Testing Library

`render` renderiza un componente en un DOM virtual. `screen` proporciona queries para encontrar elementos.

```
import { render, screen } from '@testing-library/react';
import { ProductCard } from './ProductCard';

test('renders product name and price', () => {
  render(<ProductCard name="Teclado" price={89.99} />);

  expect(screen.getByText('Teclado')).toBeInTheDocument();
  expect(screen.getByText('$89.99')).toBeInTheDocument();
});
```

### Prioridad de queries

Testing Library recomienda queries que reflejan como el usuario encuentra elementos:

| Prioridad | Query | Cuándo usar |
|:---------:|-------|-------------|
| 1 | `getByRole` | Botones, links, headings, inputs con label |
| 2 | `getByLabelText` | Inputs de formulario |
| 3 | `getByPlaceholderText` | Inputs sin label visible |
| 4 | `getByText` | Texto visible en la pagina |
| 5 | `getByTestId` | Ultimo recurso cuando nada mas funciona |

```
// GOOD — finds by accessible role
screen.getByRole('button', { name: /agregar al carrito/i });

// GOOD — finds by label
screen.getByLabelText(/correo electrónico/i);

// AVOID — data-testid should be the last resort
screen.getByTestId('submit-btn');
```

---

## `user-event` para interacciones

`user-event` simula interacciones reales del usuario (click, typing, keyboard). Es mas realista que `fireEvent` porque dispara todos los eventos intermedios (focus, keydown, keyup, input, change).

```
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

test('submits login form with user credentials', async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();

  render(<LoginForm onSubmit={onSubmit} />);

  await user.type(screen.getByLabelText(/correo/i), 'jane@example.com');
  await user.type(screen.getByLabelText(/contraseña/i), 'securepass123');
  await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));

  expect(onSubmit).toHaveBeenCalledWith({
    email: 'jane@example.com',
    password: 'securepass123',
  });
});
```

```
// Keyboard navigation
test('opens dropdown with Enter key', async () => {
  const user = userEvent.setup();
  render(<Dropdown options={['A', 'B', 'C']} />);

  await user.tab(); // focus the dropdown trigger
  await user.keyboard('{Enter}'); // open it

  expect(screen.getByRole('listbox')).toBeVisible();
});
```

---

## Testing hooks con `renderHook`

`renderHook` permite testear custom hooks de forma aislada, sin necesidad de crear un componente wrapper.

```
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

test('increments counter', () => {
  const { result } = renderHook(() => useCounter(0));

  expect(result.current.count).toBe(0);

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});
```

`act()` envuelve operaciones que causan actualizaciones de estado. Sin `act`, React puede no procesar el estado antes de que hagas la asercion.

---

## Testing con context y providers

Cuando un componente necesita un context (tema, autenticacion, router), usa la opcion `wrapper` de `render`:

```
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from './ThemeContext';
import { AuthProvider } from './AuthContext';
import { Header } from './Header';

function AllProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light">
      <AuthProvider user={{ name: 'Jane' }}>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}

test('shows user name in header', () => {
  render(<Header />, { wrapper: AllProviders });

  expect(screen.getByText('Jane')).toBeInTheDocument();
});
```

Para reutilizar el wrapper, crea un `renderWithProviders` custom:

```
function renderWithProviders(ui: React.ReactElement, options = {}) {
  return render(ui, { wrapper: AllProviders, ...options });
}

// Usage
test('shows logout button when authenticated', () => {
  renderWithProviders(<Header />);
  expect(screen.getByRole('button', { name: /cerrar sesión/i })).toBeInTheDocument();
});
```

---

## MSW para mocking de APIs

MSW (Mock Service Worker) intercepta peticiones HTTP a nivel de red, sin modificar tu codigo de fetching. Funciona igual en tests y en development.

```
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { render, screen } from '@testing-library/react';
import { UserList } from './UserList';

const server = setupServer(
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: '1', name: 'Jane' },
      { id: '2', name: 'John' },
    ]);
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders users from API', async () => {
  render(<UserList />);

  expect(await screen.findByText('Jane')).toBeInTheDocument();
  expect(screen.getByText('John')).toBeInTheDocument();
});

test('shows error when API fails', async () => {
  server.use(
    http.get('/api/users', () => {
      return new HttpResponse(null, { status: 500 });
    }),
  );

  render(<UserList />);

  expect(await screen.findByText(/error/i)).toBeInTheDocument();
});
```

En Angular, el equivalente es `provideHttpClientTesting` con `HttpTestingController`. MSW es mas versatil porque funciona con cualquier HTTP client (fetch, axios, TanStack Query).

---

## Operaciones async: `waitFor` y `findBy`

Cuando un componente carga datos asincronamente, usa `findBy` (que espera a que el elemento aparezca) o `waitFor` (para condiciones mas complejas):

```
// findBy — waits for the element to appear (default timeout: 1000ms)
const userName = await screen.findByText('Jane');

// waitFor — waits for an assertion to pass
await waitFor(() => {
  expect(screen.getByRole('list').children).toHaveLength(3);
});
```

**No** uses `setTimeout` o `sleep` en tests. `findBy` y `waitFor` reintentan automaticamente hasta que la condicion se cumple o el timeout expira.

---

## `jest-dom` matchers

`@testing-library/jest-dom` agrega matchers especificos para el DOM. Funcionan tanto con Jest como con Vitest.

```
import '@testing-library/jest-dom/vitest'; // setup in vitest.setup.ts

// Visibility
expect(screen.getByRole('alert')).toBeVisible();
expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

// Content
expect(screen.getByRole('heading')).toHaveTextContent('Bienvenido');

// Form state
expect(screen.getByLabelText(/email/i)).toBeRequired();
expect(screen.getByRole('button')).toBeDisabled();

// Accessibility
expect(screen.getByRole('button')).toHaveAccessibleName('Guardar cambios');
```

---

## Vitest: el test runner moderno

Vitest reemplaza Jest como test runner para proyectos React con Vite. Comparte la configuracion de Vite, es mas rapido y tiene API compatible con Jest.

```
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    globals: true, // enables describe, test, expect without imports
  },
});
```

```
// src/test/setup.ts
import '@testing-library/jest-dom/vitest';
```

```bash
# Run tests
npx vitest        # watch mode
npx vitest run    # single run (CI)
```

El API es identico a Jest (`describe`, `test`, `expect`, `vi.fn()` en lugar de `jest.fn()`), asi que la migracion es directa.

---

## Anti-patterns

- **`getByTestId` como query por defecto.** `data-testid` no refleja como el usuario interactua con la app. Usa `getByRole`, `getByLabelText` o `getByText` primero.
- **`fireEvent` en lugar de `userEvent`.** `fireEvent.click` dispara un solo evento. `userEvent.click` simula la secuencia completa (pointerdown, mousedown, click, focus). Usa `userEvent` para interacciones realistas.
- **Testear estado interno (`useState`).** Verificar que `count === 3` internamente no prueba nada util. Verifica que el usuario ve "3" en la pantalla.
- **Snapshot testing de componentes enteros.** Los snapshots de arboles grandes se rompen con cualquier cambio de markup y nadie revisa el diff. Testea comportamiento con assertions especificas.

---

## Puntos Clave

- `@testing-library/react` testea comportamiento del usuario, no detalles de implementacion. Prioriza queries por role y label.
- `userEvent` simula interacciones reales (click, type, keyboard). Prefierelo sobre `fireEvent`.
- `renderHook` permite testear custom hooks sin crear componentes wrapper.
- MSW intercepta peticiones HTTP a nivel de red. Es la forma recomendada de mockear APIs.
- Vitest reemplaza Jest para proyectos React con Vite: misma API, mejor performance, configuracion compartida.

---

[← Volver a Etapa 7](../README.md)


