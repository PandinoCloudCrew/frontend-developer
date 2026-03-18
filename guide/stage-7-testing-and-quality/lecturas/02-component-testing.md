# Patrones de Component Testing

> Cómo testear componentes de forma que refleje cómo los usuarios interactúan con tu aplicación. Cubre queries de Testing Library, userEvent, testing asíncrono, hooks, formularios, estados de carga/error y snapshot testing.

---

## Por Qué Esto Importa

Los componentes son el bloque de construcción principal de los frontends modernos. Si tus component tests están bien escritos, te dan confianza de que la UI funciona como los usuarios esperan. Si están mal escritos --- testeando clases CSS, estructura del DOM o estado interno --- se rompen con cada refactorización y no detectan ningún bug real.

La filosofía guía viene de Testing Library:

> "The more your tests resemble the way your software is used, the more confidence they can give you."

Los usuarios no interactúan con nombres de clases CSS o estado de React. Ven texto, hacen clic en botones, llenan formularios y leen mensajes de error. Testea eso.

---

## Prioridad de Queries

Al buscar elementos en tu componente renderizado, prefiere queries que reflejen cómo los usuarios y las tecnologías asistivas encuentran los elementos. De más preferido a menos:

### 1. `getByRole` --- Accessible Role + Name (Más Preferido)

Así es como los lectores de pantalla navegan la página. Si tu elemento no se puede encontrar por role, puede que no sea accesible.

```typescript
// Buttons
screen.getByRole('button', { name: /submit/i });
screen.getByRole('button', { name: /cancel/i });

// Headings
screen.getByRole('heading', { name: /user profile/i });

// Form inputs (via their label)
screen.getByRole('textbox', { name: /email/i });
screen.getByRole('checkbox', { name: /remember me/i });

// Navigation
screen.getByRole('navigation');

// Links
screen.getByRole('link', { name: /sign up/i });
```

### 2. `getByLabelText` --- Inputs de Formulario con Labels

Para elementos de formulario, buscar por texto de label es lo más cercano a cómo los usuarios identifican los inputs.

```typescript
screen.getByLabelText(/email address/i);
screen.getByLabelText(/password/i);
screen.getByLabelText(/date of birth/i);
```

### 3. `getByPlaceholderText` --- Inputs Sin Labels Visibles

Usa esto solo cuando un input genuinamente no tiene un label visible (barras de búsqueda, por ejemplo). En la mayoría de los casos, agrega un label en su lugar.

```typescript
screen.getByPlaceholderText(/search\.\.\./i);
```

### 4. `getByText` --- Contenido de Texto No Interactivo

Para texto que no está dentro de un elemento interactivo.

```typescript
screen.getByText(/no results found/i);
screen.getByText(/welcome back, jane/i);
screen.getByText('$42.99');
```

### 5. `getByTestId` --- Último Recurso

Usa `data-testid` solo cuando no hay forma accesible de encontrar el elemento. Esto es una señal de alerta --- usualmente significa que el elemento carece de markup accesible apropiado.

```typescript
// Only when there is truly no other option
screen.getByTestId('map-container'); // a canvas element with no text
```

Si te encuentras recurriendo a `getByTestId`, pregúntate si el elemento necesita un accessible name, un label o un ARIA role.

---

## Interacciones del Usuario

Usa `@testing-library/user-event` en lugar de `fireEvent`. `user-event` simula el comportamiento real del navegador: gestión de focus, secuencias keydown/keyup, eventos del clipboard y eventos de puntero. `fireEvent` despacha un único evento DOM sintético.

```typescript
import userEvent from '@testing-library/user-event';

test('submits the login form', async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();

  render(<LoginForm onSubmit={onSubmit} />);

  // Type into fields (simulates focus, keydown, input, keyup for each character)
  await user.type(screen.getByLabelText(/email/i), 'jane@example.com');
  await user.type(screen.getByLabelText(/password/i), 'secureP@ss1');

  // Click submit (simulates pointerdown, mousedown, pointerup, mouseup, click)
  await user.click(screen.getByRole('button', { name: /sign in/i }));

  expect(onSubmit).toHaveBeenCalledWith({
    email: 'jane@example.com',
    password: 'secureP@ss1',
  });
});
```

Métodos comunes de `userEvent`:

```typescript
await user.click(element);              // Click (with full pointer event sequence)
await user.dblClick(element);           // Double-click
await user.type(element, 'text');       // Type text character by character
await user.clear(element);             // Clear an input field
await user.selectOptions(element, 'value'); // Select from a dropdown
await user.keyboard('{Enter}');         // Press a specific key
await user.tab();                       // Tab to next focusable element
await user.hover(element);             // Hover over an element
await user.unhover(element);           // Move pointer away
await user.upload(element, file);       // Upload a file
await user.paste('text');              // Paste from clipboard
```

---

## Testear Comportamiento Asíncrono

Los componentes frecuentemente cargan datos, muestran spinners y se actualizan después de operaciones asíncronas. Usa queries `findBy` (que reintentan automáticamente) y `waitFor` para assertions.

```typescript
test('loads and displays user data', async () => {
  render(<UserProfile userId="123" />);

  // findBy queries retry until the element appears (or timeout)
  expect(await screen.findByText('Jane Doe')).toBeInTheDocument();
  expect(screen.getByText('jane@example.com')).toBeInTheDocument();
});

test('shows error when API fails', async () => {
  // MSW handler returns an error for this test
  server.use(
    http.get('/api/users/:id', () => {
      return HttpResponse.json(
        { message: 'User not found' },
        { status: 404 },
      );
    }),
  );

  render(<UserProfile userId="999" />);

  expect(await screen.findByText(/user not found/i)).toBeInTheDocument();
});

// waitFor — for assertions that need to retry
test('removes item from list after deletion', async () => {
  render(<ItemList />);

  await user.click(screen.getByRole('button', { name: /delete "Keyboard"/i }));

  await waitFor(() => {
    expect(screen.queryByText('Keyboard')).not.toBeInTheDocument();
  });
});
```

Diferencia clave: `findBy` es para esperar que un elemento aparezca. `waitFor` es para esperar que una condición se vuelva verdadera (incluyendo que elementos desaparezcan).

---

## Testear Hooks y Composables

Testea hooks de forma aislada cuando contienen lógica significativa. Usa `renderHook` de Testing Library.

```typescript
import { renderHook, act } from '@testing-library/react';

test('useCounter increments and decrements', () => {
  const { result } = renderHook(() => useCounter(0));

  expect(result.current.count).toBe(0);

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);

  act(() => {
    result.current.decrement();
  });

  expect(result.current.count).toBe(0);
});

test('useCounter does not go below zero', () => {
  const { result } = renderHook(() => useCounter(0));

  act(() => {
    result.current.decrement();
  });

  expect(result.current.count).toBe(0);
});
```

Para hooks que dependen de contexto, proporciona un wrapper:

```typescript
test('useAuth returns current user', () => {
  const wrapper = ({ children }) => (
    <AuthProvider user={mockUser}>{children}</AuthProvider>
  );

  const { result } = renderHook(() => useAuth(), { wrapper });

  expect(result.current.user.email).toBe('jane@example.com');
});
```

Para composables de Vue, testea las funciones de utilidad directamente o usa un wrapper de componente delgado:

```typescript
// Vue composable test
import { ref } from 'vue';
import { useCounter } from './useCounter';

test('useCounter increments', () => {
  // Composables that only use ref/computed can be tested directly
  const { count, increment } = useCounter(0);

  expect(count.value).toBe(0);
  increment();
  expect(count.value).toBe(1);
});
```

---

## Mockear Contexto y Providers

Los componentes frecuentemente dependen de contexto (tema, autenticación, enrutamiento, internacionalización). Crea wrappers de test que proporcionen estas dependencias.

```typescript
// test-utils.tsx — shared across all component tests
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from './ThemeProvider';
import { AuthProvider } from './AuthProvider';
import { MemoryRouter } from 'react-router-dom';

interface WrapperProps {
  children: React.ReactNode;
}

function TestProviders({ children }: WrapperProps) {
  return (
    <MemoryRouter>
      <AuthProvider user={null}>
        <ThemeProvider theme="light">
          {children}
        </ThemeProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

function renderWithProviders(
  ui: React.ReactElement,
  options?: RenderOptions,
) {
  return render(ui, { wrapper: TestProviders, ...options });
}

// Re-export everything from Testing Library, override render
export * from '@testing-library/react';
export { renderWithProviders as render };
```

Uso:

```typescript
import { render, screen } from '../test-utils';

test('shows login button when not authenticated', () => {
  render(<Header />);
  expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument();
});
```

---

## Testear Componentes de Formulario

Los formularios son donde ocurren las interacciones de usuario más importantes. Testea el flujo completo del usuario.

```typescript
test('shows validation errors for invalid input', async () => {
  const user = userEvent.setup();
  render(<RegistrationForm />);

  // Submit without filling anything
  await user.click(screen.getByRole('button', { name: /create account/i }));

  // Errors appear
  expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
  expect(screen.getByText(/password is required/i)).toBeInTheDocument();

  // Fill email with invalid value
  await user.type(screen.getByLabelText(/email/i), 'not-an-email');
  await user.tab(); // trigger blur validation

  expect(await screen.findByText(/enter a valid email/i)).toBeInTheDocument();
});

test('submits valid form data', async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();
  render(<RegistrationForm onSubmit={onSubmit} />);

  await user.type(screen.getByLabelText(/email/i), 'jane@example.com');
  await user.type(screen.getByLabelText(/password/i), 'Str0ngP@ss!');
  await user.type(screen.getByLabelText(/confirm password/i), 'Str0ngP@ss!');
  await user.click(screen.getByRole('checkbox', { name: /terms/i }));
  await user.click(screen.getByRole('button', { name: /create account/i }));

  expect(onSubmit).toHaveBeenCalledWith({
    email: 'jane@example.com',
    password: 'Str0ngP@ss!',
    acceptedTerms: true,
  });
});
```

---

## Testear Estados de Carga, Error y Vacío

Usa MSW (Mock Service Worker) para controlar las respuestas de API.

```typescript
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';

test('shows loading spinner, then data', async () => {
  render(<UserList />);

  // Loading state appears immediately
  expect(screen.getByRole('progressbar')).toBeInTheDocument();

  // Data appears after fetch completes
  expect(await screen.findByText('Jane Doe')).toBeInTheDocument();
  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
});

test('shows error state when API fails', async () => {
  server.use(
    http.get('/api/users', () => {
      return HttpResponse.json(null, { status: 500 });
    }),
  );

  render(<UserList />);

  expect(await screen.findByText(/failed to load users/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
});

test('shows empty state when no users exist', async () => {
  server.use(
    http.get('/api/users', () => {
      return HttpResponse.json([]);
    }),
  );

  render(<UserList />);

  expect(await screen.findByText(/no users found/i)).toBeInTheDocument();
});
```

---

## Snapshot Testing

Los snapshots pueden ser útiles para outputs pequeños y enfocados --- pero se abusan fácilmente.

**Cuándo los snapshots funcionan:**

```typescript
// Small, stable output — a serialized data structure
test('formats address correctly', () => {
  const result = formatAddress({
    street: '123 Main St',
    city: 'Springfield',
    state: 'IL',
    zip: '62701',
  });

  expect(result).toMatchInlineSnapshot(`"123 Main St, Springfield, IL 62701"`);
});
```

**Cuándo los snapshots son dañinos:**

```typescript
// Bad — a 200-line HTML dump that no one reviews
test('renders user profile', () => {
  const { container } = render(<UserProfile user={mockUser} />);
  expect(container).toMatchSnapshot(); // will produce an unreadable snapshot
});
```

**La regla de los 10 segundos:** si no puedes revisar un diff de snapshot en 10 segundos, el snapshot es demasiado grande. Reemplázalo con assertions específicas:

```typescript
// Good — targeted assertions instead of a massive snapshot
test('renders user profile with all sections', () => {
  render(<UserProfile user={mockUser} />);

  expect(screen.getByRole('heading', { name: /jane doe/i })).toBeInTheDocument();
  expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /jane's avatar/i })).toHaveAttribute(
    'src',
    mockUser.avatarUrl,
  );
});
```

---

## Patrones de Ejemplo

**Testear un componente de botón:**

```typescript
describe('Button', () => {
  test('renders with provided label', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  test('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);

    await user.click(screen.getByRole('button', { name: /save/i }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  test('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick} disabled>Save</Button>);

    await user.click(screen.getByRole('button', { name: /save/i }));
    expect(onClick).not.toHaveBeenCalled();
  });

  test('shows loading spinner when loading', () => {
    render(<Button loading>Save</Button>);
    expect(screen.getByRole('button', { name: /save/i })).toBeDisabled();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
```

**Testear una lista con estados vacío y de carga:**

```typescript
describe('ProductList', () => {
  test('shows loading skeleton while fetching', () => {
    render(<ProductList />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('renders product items', async () => {
    render(<ProductList />);

    expect(await screen.findByText('Mechanical Keyboard')).toBeInTheDocument();
    expect(screen.getByText('Wireless Mouse')).toBeInTheDocument();
    expect(screen.getByText('USB-C Hub')).toBeInTheDocument();
  });

  test('shows empty state when no products match filter', async () => {
    render(<ProductList category="nonexistent" />);

    expect(
      await screen.findByText(/no products found/i),
    ).toBeInTheDocument();
  });
});
```

---

## Errores Comunes

- **`getByTestId` como query por defecto.** Recurrir a `data-testid` primero elude el markup accesible. Si tus tests no pueden encontrar elementos por role o label, tu UI probablemente tampoco es accesible.
- **`fireEvent` en lugar de `userEvent`.** `fireEvent.click()` despacha un único evento de clic. Los clics reales involucran focus, pointerdown, mousedown, pointerup, mouseup y luego click. `userEvent` detecta bugs que `fireEvent` no detecta (orden de event handlers, gestión de focus, estado disabled).
- **Testear clases CSS.** `expect(element).toHaveClass('btn-primary')` se rompe cuando renombras una clase, cambias un design system o migras de CSS Modules a Tailwind. Testea el resultado visible en su lugar: ¿está el botón deshabilitado? ¿Es el texto rojo? Usa `toBeDisabled()`, `toBeVisible()` o capturas de pantalla de visual regression.
- **Hacer assertions sobre la estructura del DOM.** `expect(container.querySelector('div > span.error')).toExist()` es frágil. Si envuelves el span en un `<p>`, el test se rompe a pesar del comportamiento idéntico. Usa `getByText` o `getByRole`.
- **No usar await en operaciones asíncronas.** Olvidar `await` en llamadas a `findBy` o `userEvent` produce tests que pasan por accidente o fallan de forma intermitente. Cada método de `userEvent` y cada query `findBy` retorna una promesa.
- **Mockear el componente bajo prueba.** Si mockeas la función que estás testeando, estás testeando tu mock. Mockea *dependencias* (APIs, timers, servicios externos), no el sujeto.

---

## Puntos Clave

- Usa la prioridad de queries de Testing Library: `getByRole` primero, `getByTestId` último.
- Usa `userEvent` en lugar de `fireEvent` para simulación realista de interacciones de usuario.
- Testea los tres estados: carga, éxito (con datos) y fallo (error + vacío).
- Usa `findBy` para elementos que aparecen después de operaciones asíncronas. Usa `waitFor` para condiciones que cambian con el tiempo.
- Extrae test providers y utilidades en un archivo compartido `test-utils` para evitar repetición.
