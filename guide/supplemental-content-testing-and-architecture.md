# Contenido Suplementario: Testing, Code Review y Micro-frontends

> Cubre las brechas "faltantes" identificadas en el Mapa de Contenido para la Etapa 7 (Testing y Calidad) y la Etapa 8 (Arquitectura a Escala). Este contenido abarca cómo escribir tests, cómo testear componentes y flujos E2E, cómo realizar code reviews y una breve descripción general de micro-frontends.

---

## 1. Escribir Buenos Tests --- Estructura y Principios

### Por Qué Esto Importa

Los tests no son burocracia. Son el único mecanismo que te permite cambiar código con confianza. Un codebase sin tests es un codebase donde cada cambio es una apuesta. Un codebase con tests malos es peor --- da falsa confianza mientras te ralentiza.

El propósito de los tests:

1. **Documentar comportamiento.** Los tests son especificaciones ejecutables. Un test bien nombrado te dice qué hace el código sin leer la implementación.
2. **Prevenir regresiones.** Cuando corriges un bug, un test asegura que ese bug nunca regrese.
3. **Habilitar refactoring.** No puedes reestructurar código de forma segura sin tests que verifiquen que el comportamiento se preserva.

Los tests NO existen para alcanzar métricas de coverage. Un test suite con 100% de line coverage que solo verifica "el componente renderiza sin errores" no te dice nada. Un test suite con 40% de coverage que verifica cada regla de negocio y caso extremo es infinitamente más valioso.

### El Patrón Arrange-Act-Assert

Cada test debería tener exactamente tres fases, claramente separadas:

```typescript
test('applies 20% discount when cart total exceeds $100', () => {
  // Arrange — set up the preconditions
  const cart = createCart([
    { name: 'Keyboard', price: 75 },
    { name: 'Mouse', price: 45 },
  ]);

  // Act — perform the action being tested
  const total = calculateTotal(cart);

  // Assert — verify the outcome
  expect(total).toBe(96); // $120 - 20% = $96
});
```

Las tres fases deben ser visualmente distintas. Si no puedes distinguir dónde termina Arrange y dónde comienza Act, el test está haciendo demasiado.

Cuando un test no tiene una fase Act clara, estás testeando la configuración, no el comportamiento. Cuando un test tiene múltiples fases Act, divídelo en múltiples tests.

### Nombrado de Tests

Describe el comportamiento, no la implementación. El nombre de un test debería leerse como una oración que una persona no desarrolladora podría entender.

```typescript
// Good — describes what the user sees
test('shows error message when email is invalid', () => { /* ... */ });
test('disables submit button while form is submitting', () => { /* ... */ });
test('redirects to dashboard after successful login', () => { /* ... */ });
test('displays empty state when search returns no results', () => { /* ... */ });

// Bad — describes implementation details
test('calls validateEmail and sets error state', () => { /* ... */ });
test('sets isSubmitting to true', () => { /* ... */ });
test('invokes router.push with /dashboard', () => { /* ... */ });
test('should work', () => { /* ... */ });
```

Una heurística útil: si el nombre de tu test incluye un nombre de función, nombre de variable o propiedad de estado, probablemente estás testeando la implementación.

### Qué Testear

**Comportamiento visible para el usuario.** ¿Qué sucede cuando hago clic, escribo, envío, navego? Si el usuario puede verlo o activarlo, testéalo.

```typescript
test('adds item to cart when "Add to Cart" button is clicked', () => {
  render(<ProductPage product={mockProduct} />);

  userEvent.click(screen.getByRole('button', { name: /add to cart/i }));

  expect(screen.getByText('1 item in cart')).toBeInTheDocument();
});
```

**Casos extremos.** Entrada vacía, valores límite, estados de error, arrays de longitud cero, valores nulos, fallos de red.

```typescript
test('shows "No results" when search returns empty array', () => { /* ... */ });
test('handles exactly 0 items in cart', () => { /* ... */ });
test('displays error when API request fails', () => { /* ... */ });
test('truncates display name longer than 50 characters', () => { /* ... */ });
```

**Lógica de negocio.** Cálculos, transformaciones, reglas de validación --- la lógica central que hace que tu aplicación sea correcta.

```typescript
test('calculates shipping as free for orders over $50', () => {
  expect(calculateShipping(51)).toBe(0);
  expect(calculateShipping(50)).toBe(5.99);
  expect(calculateShipping(49.99)).toBe(5.99);
});
```

### Qué NO Testear

**Detalles de implementación.** Estado interno, métodos privados, llamadas a funciones específicas. Si refactorizas las partes internas sin cambiar el comportamiento, los tests no deberían romperse.

```typescript
// Bad — testing implementation
test('sets isLoading state to true', () => {
  const { result } = renderHook(() => useUsers());
  expect(result.current.isLoading).toBe(true); // testing internal state
});

// Good — testing behavior
test('shows loading spinner while fetching users', () => {
  render(<UserList />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});
```

**Internos del framework.** No testees que `useState` de React funciona, que `ref` de Vue es reactivo, o que la detección de cambios de Angular se ejecuta. Los autores del framework ya testean eso.

**Estilos.** No hagas assertions sobre clases CSS, posiciones en píxeles o estilos computados. Los estilos cambian frecuentemente y no tienen impacto en el comportamiento. Usa visual regression testing (capturas de pantalla) para componentes visuales críticos en su lugar.

**Comportamiento de bibliotecas de terceros.** Si estás usando una biblioteca de fechas, no testees que formatea fechas correctamente. Testea que *tu código* le pasa la fecha correcta a la biblioteca.

### Aislamiento de Tests

Cada test debe ejecutarse de forma independiente. Sin estado mutable compartido. Sin dependencias de orden de tests.

```typescript
// Bad — shared mutable state between tests
let cart: Cart;

beforeEach(() => {
  cart = new Cart();
});

test('adds item', () => {
  cart.add(item1);
  expect(cart.items).toHaveLength(1);
});

test('calculates total', () => {
  // This test secretly depends on `cart` being empty.
  // If the previous test doesn't clean up properly, this breaks.
  cart.add(item2);
  expect(cart.total).toBe(item2.price);
});

// Good — each test creates its own state
test('adds item to cart', () => {
  const cart = new Cart();
  cart.add(item1);
  expect(cart.items).toHaveLength(1);
});

test('calculates total for single item', () => {
  const cart = new Cart();
  cart.add(item2);
  expect(cart.total).toBe(item2.price);
});
```

Usa `beforeEach` para la inicialización común que cada test en el bloque necesita. Usa `afterEach` para limpieza (limpiar mocks, restaurar timers). Nunca uses `beforeAll` para crear estado que los tests mutan.

### El Espectro de Testing

De más rápido y simple a más lento y completo:

| Nivel | Qué testea | Velocidad | Confianza | Ejemplo |
|-------|------------|-----------|-----------|---------|
| **Pure function** | Input → output | ~1ms | Baja (aislado) | `calculateDiscount(100)` retorna `80` |
| **Hook/Composable** | Lógica con estado | ~5ms | Baja-media | `useCounter()` incrementa y decrementa |
| **Component** | Renderizado + interacción | ~50ms | Media | `<LoginForm>` envía credenciales |
| **Integration** | Múltiples unidades + API | ~200ms | Media-alta | `<UserDashboard>` obtiene y renderiza datos |
| **E2E** | Flujo completo en navegador | ~5s | Alta | Login, navegar, completar checkout |

La pirámide de testing: muchos tests en la parte superior de esta tabla, pocos en la parte inferior. La mayoría de tus tests deberían ser de pure function y componentes. Los tests E2E cubren solo rutas críticas.

### Organización de Archivos de Test

Coloca los tests junto al código fuente que testean:

```
src/
  components/
    UserProfile.tsx
    UserProfile.test.tsx       ← right next to the component
  hooks/
    useAuth.ts
    useAuth.test.ts            ← right next to the hook
  utils/
    formatCurrency.ts
    formatCurrency.test.ts     ← right next to the utility
```

No en un árbol espejo separado:

```
# Avoid this structure
src/
  components/
    UserProfile.tsx
__tests__/
  components/
    UserProfile.test.tsx      ← far from the source, easy to forget
```

Colocar los tests junto al código hace evidente cuándo un archivo carece de tests, facilita encontrar el test para cualquier archivo y mantiene test y código fuente sincronizados al mover o renombrar archivos.

### Errores Comunes

- **Testear detalles de implementación.** Tu test se rompe cuando refactorizas de `useState` a `useReducer`, aunque el componente se comporta de forma idéntica. Estás testeando cómo funciona, no qué hace.
- **Tests frágiles.** Tests que se rompen con cualquier refactorización proporcionan valor negativo: cuestan tiempo de mantenimiento sin detectar bugs reales. Si mover una función de un archivo a otro rompe los tests, algo está mal.
- **Tests sin assertions.** Un test que renderiza un componente y no verifica nada es teatro. Existe solo para inflar los números de coverage.
- **Copiar y pegar código de test.** Setup duplicado en 20 tests se convierte en 20 lugares que actualizar cuando la API cambia. Extrae utilidades de test y funciones factory.
- **Testear el mock.** Si tu test hace mock de una función y luego verifica que el mock fue llamado, estás testeando tu configuración de test, no tu código. El mock debería habilitar el test, no ser el sujeto del mismo.
- **Nombrado `test("should work")`.** Cuando este test falla en CI, el mensaje de error no te dice nada. Tienes que abrir el archivo y leer el cuerpo del test para entender qué se rompió.
- **Uso excesivo de anidamiento con `describe`.** Tres o cuatro niveles de bloques `describe` hacen que los tests sean más difíciles de leer y mantener. Un nivel de `describe` por función o componente usualmente es suficiente.

### Puntos Clave

- Los tests documentan comportamiento, previenen regresiones y habilitan refactoring. Las métricas de coverage son un efecto secundario, no un objetivo.
- Cada test sigue Arrange-Act-Assert con separación clara entre fases.
- Nombra los tests por comportamiento ("shows error when..."), no por implementación ("calls validateEmail").
- Testea lo que el usuario ve y hace. No testees estado interno, internos del framework o comportamiento de bibliotecas de terceros.
- Cada test debe ser independiente --- sin estado mutable compartido, sin dependencias de orden.

---

## 2. Patrones de Component Testing

### Por Qué Esto Importa

Los componentes son el bloque de construcción principal de los frontends modernos. Si tus component tests están bien escritos, te dan confianza de que la UI funciona como los usuarios esperan. Si están mal escritos --- testeando clases CSS, estructura del DOM o estado interno --- se rompen con cada refactorización y no detectan ningún bug real.

La filosofía guía viene de Testing Library:

> "The more your tests resemble the way your software is used, the more confidence they can give you."

Los usuarios no interactúan con nombres de clases CSS o estado de React. Ven texto, hacen clic en botones, llenan formularios y leen mensajes de error. Testea eso.

### Prioridad de Queries

Al buscar elementos en tu componente renderizado, prefiere queries que reflejen cómo los usuarios y las tecnologías asistivas encuentran los elementos. De más preferido a menos:

#### 1. `getByRole` --- Accessible Role + Name (Más Preferido)

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

#### 2. `getByLabelText` --- Inputs de Formulario con Labels

Para elementos de formulario, buscar por texto de label es lo más cercano a cómo los usuarios identifican los inputs.

```typescript
screen.getByLabelText(/email address/i);
screen.getByLabelText(/password/i);
screen.getByLabelText(/date of birth/i);
```

#### 3. `getByPlaceholderText` --- Inputs Sin Labels Visibles

Usa esto solo cuando un input genuinamente no tiene un label visible (barras de búsqueda, por ejemplo). En la mayoría de los casos, agrega un label en su lugar.

```typescript
screen.getByPlaceholderText(/search\.\.\./i);
```

#### 4. `getByText` --- Contenido de Texto No Interactivo

Para texto que no está dentro de un elemento interactivo.

```typescript
screen.getByText(/no results found/i);
screen.getByText(/welcome back, jane/i);
screen.getByText('$42.99');
```

#### 5. `getByTestId` --- Último Recurso

Usa `data-testid` solo cuando no hay forma accesible de encontrar el elemento. Esto es una señal de alerta --- usualmente significa que el elemento carece de markup accesible apropiado.

```typescript
// Only when there is truly no other option
screen.getByTestId('map-container'); // a canvas element with no text
```

Si te encuentras recurriendo a `getByTestId`, pregúntate si el elemento necesita un accessible name, un label o un ARIA role.

### Interacciones del Usuario

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

### Testear Comportamiento Asíncrono

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

### Testear Hooks y Composables

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

### Mockear Contexto y Providers

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

### Testear Componentes de Formulario

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

### Testear Estados de Carga, Error y Vacío

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

### Snapshot Testing

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

### Patrones de Ejemplo

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

### Errores Comunes

- **`getByTestId` como query por defecto.** Recurrir a `data-testid` primero elude el markup accesible. Si tus tests no pueden encontrar elementos por role o label, tu UI probablemente tampoco es accesible.
- **`fireEvent` en lugar de `userEvent`.** `fireEvent.click()` despacha un único evento de clic. Los clics reales involucran focus, pointerdown, mousedown, pointerup, mouseup y luego click. `userEvent` detecta bugs que `fireEvent` no detecta (orden de event handlers, gestión de focus, estado disabled).
- **Testear clases CSS.** `expect(element).toHaveClass('btn-primary')` se rompe cuando renombras una clase, cambias un design system o migras de CSS Modules a Tailwind. Testea el resultado visible en su lugar: ¿está el botón deshabilitado? ¿Es el texto rojo? Usa `toBeDisabled()`, `toBeVisible()` o capturas de pantalla de visual regression.
- **Hacer assertions sobre la estructura del DOM.** `expect(container.querySelector('div > span.error')).toExist()` es frágil. Si envuelves el span en un `<p>`, el test se rompe a pesar del comportamiento idéntico. Usa `getByText` o `getByRole`.
- **No usar await en operaciones asíncronas.** Olvidar `await` en llamadas a `findBy` o `userEvent` produce tests que pasan por accidente o fallan de forma intermitente. Cada método de `userEvent` y cada query `findBy` retorna una promesa.
- **Mockear el componente bajo prueba.** Si mockeas la función que estás testeando, estás testeando tu mock. Mockea *dependencias* (APIs, timers, servicios externos), no el sujeto.

### Puntos Clave

- Usa la prioridad de queries de Testing Library: `getByRole` primero, `getByTestId` último.
- Usa `userEvent` en lugar de `fireEvent` para simulación realista de interacciones de usuario.
- Testea los tres estados: carga, éxito (con datos) y fallo (error + vacío).
- Usa `findBy` para elementos que aparecen después de operaciones asíncronas. Usa `waitFor` para condiciones que cambian con el tiempo.
- Extrae test providers y utilidades en un archivo compartido `test-utils` para evitar repetición.

---

## 3. Patrones de E2E Testing (Playwright)

### Por Qué Esto Importa

Los component tests verifican piezas individuales de forma aislada. Los tests E2E verifican que el sistema completo --- frontend, backend, base de datos, autenticación --- funciona junto como un usuario real lo experimentaría. Son la última línea de defensa antes de producción.

Pero los tests E2E son costosos: lentos de ejecutar, difíciles de mantener y propensos a ser inconsistentes. La clave es usarlos de forma quirúrgica: testea solo lo que no se puede testear de otra manera.

### Qué Testear con E2E

Testea **rutas críticas del usuario** --- los flujos que, si se rompen, significan que tu producto está roto.

- **Autenticación:** registro, inicio de sesión, cierre de sesión, restablecimiento de contraseña
- **Recorrido principal del usuario:** la acción principal para la que existe tu producto (buscar, comprar, crear, compartir)
- **Pago/checkout:** los flujos relacionados con dinero deben funcionar
- **Onboarding:** experiencia del usuario por primera vez

NO hagas tests E2E de cada caso extremo, cada regla de validación o cada estado vacío. Para eso están los unit tests y component tests. Si tienes 500 tests E2E, tienes un problema de mantenimiento y un pipeline de CI lento.

### Page Object Model

Encapsula las interacciones de página en clases. Cuando la UI cambia, actualiza un solo lugar en vez de 40 tests.

```typescript
// pages/login.page.ts
import { type Page, type Locator } from '@playwright/test';

export class LoginPage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;
  private readonly errorMessage: Locator;

  constructor(private readonly page: Page) {
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.submitButton = page.getByRole('button', { name: /sign in/i });
    this.errorMessage = page.getByRole('alert');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async expectError(message: string) {
    await expect(this.errorMessage).toContainText(message);
  }
}
```

```typescript
// pages/dashboard.page.ts
import { type Page, type Locator } from '@playwright/test';

export class DashboardPage {
  private readonly heading: Locator;
  private readonly userMenu: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: /dashboard/i });
    this.userMenu = page.getByRole('button', { name: /user menu/i });
  }

  async expectLoaded() {
    await expect(this.heading).toBeVisible();
  }

  async logout() {
    await this.userMenu.click();
    await this.page.getByRole('menuitem', { name: /sign out/i }).click();
  }
}
```

Uso en tests:

```typescript
// tests/auth.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';

test('logs in and reaches dashboard', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboard = new DashboardPage(page);

  await loginPage.goto();
  await loginPage.login('jane@example.com', 'password123');
  await dashboard.expectLoaded();
});

test('shows error for invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('jane@example.com', 'wrong-password');
  await loginPage.expectError('Invalid email or password');
});
```

Cuando el formulario de login cambia (digamos que el label cambia de "Email" a "Email address"), actualizas `LoginPage` una vez. Todos los tests que lo usan siguen funcionando.

### Estrategia de Locators

Playwright proporciona la misma filosofía de queries accesibles que Testing Library:

```typescript
// Preferred — accessible queries
page.getByRole('button', { name: /submit/i });
page.getByLabel('Email');
page.getByText('Welcome back');
page.getByPlaceholder('Search...');

// Avoid — CSS selectors and XPath
page.locator('#submit-btn');           // fragile, tied to IDs
page.locator('.btn-primary');          // fragile, tied to class names
page.locator('div > form > button');   // fragile, tied to DOM structure
page.locator('xpath=//button[@id]');   // fragile, hard to read
```

### Gestión de Datos de Test

Cada test debe crear sus propios datos y limpiar después de sí mismo.

```typescript
// fixtures/users.ts — factory functions for test data
export function createTestUser(overrides?: Partial<User>): User {
  const id = crypto.randomUUID();
  return {
    email: `test-${id}@example.com`,
    password: 'TestP@ss123',
    name: `Test User ${id.slice(0, 8)}`,
    ...overrides,
  };
}
```

```typescript
// Use in tests
test('user can update their profile', async ({ page, request }) => {
  // Create test data via API (fast, no UI interaction needed)
  const user = createTestUser();
  await request.post('/api/test/users', { data: user });

  // Use the test data
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(user.email, user.password);

  // ... test the profile update flow ...
});
```

Nunca codifiques datos de test como `jane@example.com` en múltiples tests. Si dos tests se ejecutan en paralelo y usan el mismo email, interferirán entre sí.

### Manejo de Autenticación

Iniciar sesión a través de la UI en cada test desperdicia tiempo. Inicia sesión a través de API y reutiliza el estado de autenticación.

```typescript
// auth.setup.ts — runs once before all tests
import { test as setup, expect } from '@playwright/test';

setup('authenticate', async ({ request }) => {
  const response = await request.post('/api/auth/login', {
    data: {
      email: 'e2e-user@example.com',
      password: 'E2eTestP@ss!',
    },
  });

  expect(response.ok()).toBeTruthy();

  // Save the auth state (cookies, localStorage) to a file
  await request.storageState({ path: '.auth/user.json' });
});
```

```typescript
// playwright.config.ts
export default defineConfig({
  projects: [
    // Setup project runs first
    { name: 'setup', testMatch: /.*\.setup\.ts/ },

    // All other tests reuse the auth state
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/user.json',
      },
      dependencies: ['setup'],
    },
  ],
});
```

Ahora cada test comienza ya con la sesión iniciada, ahorrando 2-5 segundos por test.

### Network Mocking en E2E

Usa `page.route()` para interceptar peticiones de red cuando sea necesario. Pero úsalo con moderación --- los tests E2E deberían ejercitar APIs reales siempre que sea posible.

```typescript
// Good use: simulating error states that are hard to trigger naturally
test('shows maintenance page when API is down', async ({ page }) => {
  await page.route('**/api/**', (route) => {
    route.fulfill({ status: 503, body: 'Service Unavailable' });
  });

  await page.goto('/dashboard');
  await expect(page.getByText(/we're performing maintenance/i)).toBeVisible();
});

// Good use: avoiding third-party service calls in tests
test('displays payment form', async ({ page }) => {
  await page.route('**/stripe.com/**', (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify({ publishableKey: 'pk_test_fake' }),
    });
  });

  await page.goto('/checkout');
  await expect(page.getByLabel('Card number')).toBeVisible();
});
```

### Evitar Tests Inconsistentes

Los tests inconsistentes son peores que no tener tests. Un test que pasa el 95% del tiempo se ignora, y la tasa de fallo del 5% erosiona la confianza en todo el suite.

**Usa el auto-waiting de Playwright.** Cada acción de locator (`click`, `fill`, `check`) espera automáticamente a que el elemento sea visible, esté habilitado y sea estable. No agregues esperas manuales antes de las acciones.

```typescript
// Bad — arbitrary sleep
await page.waitForTimeout(3000);
await page.getByRole('button', { name: /submit/i }).click();

// Good — Playwright auto-waits for the button to be actionable
await page.getByRole('button', { name: /submit/i }).click();
```

**Espera condiciones específicas, no tiempo.**

```typescript
// Bad — sleeping and hoping the data loaded
await page.waitForTimeout(5000);

// Good — wait for a specific network response
await page.waitForResponse('**/api/users');

// Good — wait for a specific element
await expect(page.getByText('Data loaded')).toBeVisible();

// Good — wait for navigation
await page.waitForURL('/dashboard');
```

**Usa retry en CI como red de seguridad, no como solución.**

```bash
# playwright.config.ts — retries catch genuine flakiness from infra issues
npx playwright test --retries=2
```

Si un test necesita retries para pasar consistentemente, corrige el test. Los retries son para problemas de infraestructura (intermitencias de red, timing de inicio de contenedores), no para problemas de diseño de tests.

**Aísla cada test.** Cada test crea sus propios datos y no depende de que otro test se haya ejecutado primero.

### Ejecución Paralela

Playwright ejecuta archivos de test en paralelo por defecto. Los tests dentro de un mismo archivo se ejecutan secuencialmente por defecto pero pueden ser paralelizados con `test.describe.configure({ mode: 'parallel' })`.

Diseña cada test para ser completamente independiente. Ningún test debería asumir que otro test se ejecutó primero, creó ciertos datos o dejó la aplicación en un estado específico.

### Visual Regression Testing

Playwright puede capturar y comparar capturas de pantalla:

```typescript
test('checkout page matches design', async ({ page }) => {
  await page.goto('/checkout');
  await expect(page.getByText('Order Summary')).toBeVisible();
  await expect(page).toHaveScreenshot('checkout-page.png');
});
```

Úsalo con moderación. Los visual tests son frágiles entre entornos (diferencias en renderizado de fuentes, versiones de navegador) y crean carga de mantenimiento. Resérvalos para:

- Páginas de aterrizaje críticas
- Vitrina de componentes del design system
- Visualizaciones complejas (gráficos, diagramas)

No hagas screenshot-test de cada página en tu aplicación.

### Integración con CI

```yaml
# .github/workflows/e2e.yml
e2e-tests:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: 22

    - run: npm ci
    - run: npx playwright install --with-deps chromium

    - run: npx playwright test --retries=2
      env:
        BASE_URL: http://localhost:3000

    # Save failure artifacts for debugging
    - uses: actions/upload-artifact@v4
      if: failure()
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 7
```

Para suites de tests grandes, divide entre workers de CI:

```yaml
strategy:
  matrix:
    shard: [1/4, 2/4, 3/4, 4/4]
steps:
  - run: npx playwright test --shard=${{ matrix.shard }}
```

### Errores Comunes

- **Hacer tests E2E de cada escenario.** 500 tests E2E ejecutándose 10 segundos cada uno = 83 minutos de tiempo de CI. Tu pipeline se convierte en un cuello de botella y los desarrolladores dejan de esperar. Usa E2E para rutas críticas (5-15 tests), unit/component tests para todo lo demás.
- **`page.waitForTimeout(5000)`.** Las esperas basadas en sleep son la causa número uno de tests inconsistentes. La página puede cargar en 200ms o en 8000ms dependiendo de la carga del CI. Espera condiciones específicas en su lugar.
- **Login a través de la UI en cada test.** Llenar email, contraseña y hacer clic en submit agrega 3-5 segundos por test. Autentícate a través de API y reutiliza `storageState`.
- **Datos de test codificados.** `email: "test@test.com"` en cada test significa que los tests paralelos colisionan. Usa funciones factory que generen datos únicos.
- **Tests que dependen del estado de la base de datos de otros tests.** Test A crea un usuario, Test B asume que ese usuario existe. Cuando Test A se omite, se modifica o se ejecuta después de Test B, todo se rompe.
- **Testear servicios de terceros en E2E.** No testees que el formulario de checkout de Stripe funciona o que Google Maps renderiza correctamente. Mockea servicios de terceros y testea solo tu integración con ellos.

### Puntos Clave

- Los tests E2E cubren solo rutas críticas del usuario: login, flujo principal, pago, onboarding.
- Usa el Page Object Model para encapsular interacciones de página. Los cambios de UI actualizan un solo archivo.
- Autentícate a través de API, no de la UI. Reutiliza el estado de autenticación con `storageState`.
- Nunca uses `waitForTimeout`. Usa el auto-waiting de Playwright, `waitForResponse` o `expect(locator).toBeVisible()`.
- Diseña cada test para ser independiente: datos propios, sin dependencias de orden, seguro para ejecución paralela.

---

## 4. Prácticas de Code Review

### Por Qué Esto Importa

El code review es la actividad de mayor impacto en un equipo. Una revisión de 30 minutos puede prevenir un bug que costaría un día en depurar, compartir conocimiento que previene tres errores futuros y mejorar un diseño que causaría dolor durante meses.

El code review no es gatekeeping. Sus propósitos:

1. **Detectar bugs** antes de que lleguen a los usuarios.
2. **Compartir conocimiento** en todo el equipo (sin puntos únicos de fallo).
3. **Hacer cumplir estándares** para que el codebase se mantenga consistente.
4. **Mejorar el diseño** a través del pensamiento colaborativo.

### Qué Buscar

Revisa en este orden de prioridad. No dediques 20 minutos debatiendo nombres de variables mientras pasas por alto un agujero de seguridad.

#### 1. Correctitud

¿El código realmente hace lo que dice hacer?

- ¿Maneja casos extremos? ¿Qué sucede con entrada vacía, valores nulos, arrays de longitud cero?
- ¿Qué sucede cuando la petición de red falla? ¿Cuando el usuario hace doble clic?
- ¿Hay errores de off-by-one, condiciones de carrera o llamadas `await` faltantes?
- ¿Funciona el happy path Y los unhappy paths degradan de forma elegante?

#### 2. Seguridad

- ¿Se sanitiza la entrada del usuario antes de renderizar? (`dangerouslySetInnerHTML`, `v-html`, `[innerHTML]`)
- ¿Están los controles de autenticación y autorización en su lugar? ¿Pueden los usuarios acceder a recursos a los que no deberían?
- ¿Hay API keys, tokens o secrets expuestos en código del lado del cliente?
- ¿Están los tokens CSRF presentes en las peticiones que cambian estado?
- ¿Se están registrando o almacenando de forma insegura datos sensibles (contraseñas, tokens)?

#### 3. Diseño

- ¿Son correctos los límites de los componentes? ¿Este componente está intentando hacer tres cosas?
- ¿Está el estado en el lugar correcto? ¿Se está elevando estado local a global sin razón?
- ¿Esto introduce acoplamiento fuerte entre features que deberían ser independientes?
- ¿Es la API pública (props, funciones, exports) mínima y clara?
- ¿Este patrón escalará, o causará dolor a 10x del uso actual?

#### 4. Rendimiento

- ¿Hay re-renders innecesarios? ¿Se está recreando un objeto o array en cada render?
- ¿Falta `useMemo` o `useCallback` donde prevendría recálculos costosos?
- ¿Este PR agrega una dependencia grande? ¿Cuál es el impacto en el tamaño del bundle?
- ¿Hay un cuello de botella de renderizado (listas largas sin virtualización, cómputo pesado síncrono)?

#### 5. Accesibilidad

- ¿Es el HTML semántico? ¿Botones para acciones, links para navegación, headings en orden?
- ¿Se puede usar la feature solo con teclado? ¿Orden de Tab, activación con Enter/Space, Escape para cerrar?
- ¿Son correctos los atributos ARIA? ¿`aria-label` donde no hay texto visible, `aria-expanded` para colapsables?
- ¿Las imágenes tienen texto `alt` significativo?

#### 6. Legibilidad

- ¿Los nombres son claros y descriptivos? ¿Puedes entender `processUserData` sin leer la implementación?
- ¿Es razonable la complejidad? Una función de 200 líneas probablemente debería dividirse.
- ¿Los comentarios explican el *por qué*, no el *qué*? (El código dice qué. Los comentarios deberían decir por qué.)
- ¿Es el código consistente con el resto del codebase?

#### 7. Tests

- ¿Hay tests? ¿Testean comportamiento significativo, no solo coverage?
- ¿Los tests cubren las rutas importantes --- happy path, estados de error, casos extremos?
- ¿Son legibles los tests? ¿Puedes entender qué se está testeando solo por el nombre del test?
- Para correcciones de bugs: ¿hay un regression test que fallaría si el bug reapareciera?

### Qué NO Revisar

No desperdicies tiempo de revisión en cosas que linters y formateadores deberían manejar:

- Formateo (largo de línea, indentación, comas finales)
- Orden de imports
- Punto y coma vs sin punto y coma
- Comillas simples vs comillas dobles

Si tu equipo debate estas cosas en PRs, no tienes un problema de estilo de código --- tienes un problema de configuración de herramientas. Configura ESLint/Biome y Prettier, ejecútalos en CI, y nunca más discutas formateo en una revisión.

### Tamaño de PR

**Apunta a menos de 400 líneas de cambios reales** (excluyendo archivos generados, lockfiles y fixtures de test).

Por qué importan los PRs pequeños:

- Un PR de 200 líneas recibe una revisión exhaustiva en 20 minutos.
- Un PR de 2000 líneas recibe una lectura superficial en 40 minutos. Los bugs se esconden a plena vista.
- Las investigaciones muestran consistentemente que la calidad de la revisión se degrada bruscamente más allá de 400 líneas.

Para features grandes, usa **stacked PRs**:

```
PR 1: Add API types and data fetching hook (120 lines)
PR 2: Build UserProfile component with loading/error states (180 lines)
PR 3: Add UserProfile page with routing and integration (150 lines)
PR 4: Add tests for UserProfile flow (200 lines)
```

Cada PR es revisable, desplegable y se revierte limpiamente.

### Dar Feedback

#### Sé Específico

```
# Bad — vague concern
"This might have performance issues."

# Good — specific problem with specific solution
"This re-renders the entire list on every keystroke because `items` is
recreated each render. Consider `useMemo` with `[rawItems, filter]` as
dependencies, or move the filtering into the `useItems` hook."
```

#### Usa "Nosotros" en Vez de "Tú"

```
# Confrontational
"You forgot error handling here."

# Collaborative
"We should add error handling here — if the API returns 500, the
component will render `undefined` as the user's name."
```

#### Distingue Blocking vs Non-Blocking

```
# Non-blocking suggestion — can be addressed later
nit: Rename `data` to `users` for clarity.

# Non-blocking suggestion with reasoning
suggestion: Consider extracting this into a `useUserPermissions` hook.
It would make the component easier to test and the logic reusable.

# Required change — must be fixed before merge
blocking: This renders user-provided HTML without sanitization.
Use DOMPurify.sanitize() or use textContent instead of innerHTML.
```

#### Ofrece Alternativas

```
# Bad — criticism without direction
"This is hard to follow."

# Good — alternative with reasoning
"Instead of nested ternaries, consider early returns:

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  if (users.length === 0) return <EmptyState />;
  return <UserList users={users} />;

Each state is handled explicitly and the render logic reads top-to-bottom."
```

#### Aprueba con Comentarios Menores

No todo comentario necesita bloquear el PR. Cuando el código es sólido pero tiene mejoras menores:

```
"LGTM — ship it. One nit: rename `handleClick` to `handleAddToCart`
for clarity, but not blocking."
```

### Recibir Feedback

- **No lo tomes personal.** Se está revisando el código, no a ti. Un comentario que dice "esto tiene un bug" no está diciendo "eres un mal desarrollador."
- **Haz preguntas aclaratorias.** Si el feedback no es claro, pregunta: "¿Puedes dar un ejemplo de cómo esto fallaría?" o "¿Qué escenario te preocupa?"
- **Responde con razonamiento.** Si no estás de acuerdo, explica por qué: "Consideré `useMemo` aquí pero lo medí --- la lista nunca tiene más de 20 elementos y el filtro se ejecuta en <1ms. La sobrecarga de memoización no lo vale." Los revisores no son infalibles. Un buen cuestionamiento mejora el entendimiento del equipo.
- **No solo cumplas.** Aceptar ciegamente cada sugerencia sin entender produce peor código y previene el aprendizaje. Entiende el razonamiento y luego decide.

### Checklists de Revisión por Tipo de PR

#### Nuevo Componente

- [ ] Los props están completamente tipados (sin `any`, sin tipos implícitos)
- [ ] El componente es navegable por teclado (Tab, Enter, Space, Escape)
- [ ] Los elementos interactivos tienen nombres accesibles (texto visible o `aria-label`)
- [ ] Los estados de carga, error y vacío están manejados
- [ ] El componente funciona con diferentes longitudes de contenido (nombres largos, strings vacíos)
- [ ] Los tests cubren las interacciones principales del usuario
- [ ] No hay lógica de negocio en el componente (extraer a hooks/services)

#### Corrección de Bug

- [ ] La causa raíz está identificada (no solo el síntoma parcheado)
- [ ] Se agrega un regression test que falla sin la corrección y pasa con ella
- [ ] Se revisa código relacionado por el mismo patrón de bug
- [ ] La corrección no introduce nuevos casos extremos
- [ ] El mensaje de commit o la descripción del PR explica qué causó el bug

#### Refactor

- [ ] El comportamiento no cambia (las mismas entradas producen las mismas salidas)
- [ ] Todos los tests existentes pasan sin modificación
- [ ] No se mezclan cambios de features (refactor y cambios de features son PRs separados)
- [ ] El refactor mejora la claridad, reduce duplicación o simplifica la arquitectura
- [ ] Sin scope creep (refactorizar el mundo cuando se arregla un módulo)

#### Actualización de Dependencia

- [ ] Se revisa el CHANGELOG o guía de migración por breaking changes
- [ ] Se verifica el impacto en el tamaño del bundle (antes y después de `npm run build`)
- [ ] Se revisan avisos de seguridad (`npm audit`)
- [ ] La nueva versión de la dependencia es compatible con otras dependencias
- [ ] Se hace smoke-test de la aplicación con la nueva versión

### Errores Comunes

- **Aprobar sin revisar.** Aprobar sin leer. "LGTM" sin comentarios en un PR de 500 líneas significa que nadie lo revisó realmente. Si no tienes tiempo para revisar correctamente, dilo y deja que otra persona revise.
- **Bikeshedding.** Dedicar 30 minutos debatiendo si una variable debería llamarse `userData` o `userInfo` mientras una condición de carrera pasa desapercibida tres líneas más abajo. Revisa en orden de prioridad.
- **Bloquear por preferencia personal.** "Yo lo habría escrito diferente" no es razón para bloquear un PR. Bloquea solo por correctitud, seguridad o estándares establecidos del equipo. El gusto no es un criterio de merge.
- **Revisar PRs de 2000 líneas.** Te perderás bugs. Leerás por encima. El autor debería haber dividido esto en PRs más pequeños. Pídele que lo divida antes de revisar.
- **Sin comentarios de revisión.** Si revisaste un PR y no encontraste nada que comentar, o el código es perfecto (poco probable) o no revisaste cuidadosamente. Incluso un comentario como "Me gusta cómo manejas el estado de error aquí" demuestra compromiso.
- **Revisar solo el diff.** El diff muestra qué cambió, pero no el contexto. Si se modifica una función, lee los callers. Si cambian los props de un componente, verifica dónde se usa. El código circundante importa.
- **Hacer nitpicking sin etiquetar.** Si tienes 15 sugerencias menores y 1 problema crítico, el problema crítico se ahoga. Etiqueta tus comentarios: `nit:`, `suggestion:`, `blocking:`, `question:`.

### Puntos Clave

- Revisa en orden de prioridad: correctitud, seguridad, diseño, rendimiento, accesibilidad, legibilidad, tests.
- Mantén los PRs bajo 400 líneas. Los PRs grandes reciben revisiones superficiales.
- Sé específico en el feedback: nombra el problema, explica por qué y ofrece una alternativa.
- Etiqueta los comentarios como `nit:`, `suggestion:`, `blocking:` o `question:` para que el autor sepa qué priorizar.
- Recibir feedback: separa tu ego de tu código. Haz preguntas. Responde con razonamiento cuando no estés de acuerdo.

---

## 5. Micro-frontends --- Una Breve Descripción General

### Por Qué Esto Importa

Los micro-frontends aparecen en discusiones de arquitectura, entrevistas de trabajo y publicaciones de blogs de tecnología. Necesitas saber qué son, cuándo tienen sentido y --- más importante --- cuándo no lo tienen. Esta no es una guía práctica. Es un mapa para que puedas navegar la conversación.

### ¿Qué Son los Micro-frontends?

Los micro-frontends aplican el patrón de microservices al desarrollo frontend: **aplicaciones frontend desarrolladas, testeadas y desplegadas de forma independiente** que se componen en un solo producto de cara al usuario.

En lugar de un gran codebase frontend propiedad de un equipo, múltiples equipos poseen cada uno una porción de la UI. El Equipo A es dueño de la búsqueda, el Equipo B de la página de producto, el Equipo C del checkout. Cada equipo despliega de forma independiente.

### Cuándo los Micro-frontends Tienen Sentido

- **Organizaciones grandes** con 5+ equipos trabajando en diferentes áreas del producto simultáneamente. Los ciclos de deployment independientes se convierten en una necesidad real cuando el calendario de lanzamiento del Equipo A no debería bloquear al Equipo B.
- **Adquisiciones o fusiones** donde diferentes productos construidos con diferentes frameworks necesitan unificarse bajo una única experiencia de usuario.
- **Migración de legacy** donde necesitas reemplazar incrementalmente un frontend antiguo mientras lo mantienes funcionando. El nuevo framework maneja las features nuevas mientras el framework antiguo sirve las existentes.

### Cuándo los Micro-frontends NO Tienen Sentido

- **Equipos pequeños a medianos** (menos de 20-30 desarrolladores frontend). La sobrecarga de coordinación de micro-frontends excede el beneficio.
- **Un solo producto con un solo framework.** Si todos usan React y trabajan en el mismo repo, no necesitas arquitectura para aislar frameworks.
- **Razonamiento de "Netflix lo hace".** Netflix tiene cientos de ingenieros frontend. Tú probablemente no. Las decisiones tecnológicas deberían coincidir con tu realidad organizacional, no con tus aspiraciones.

### Enfoques de Implementación

| Enfoque | Cómo Funciona | Compensaciones |
|---------|---------------|----------------|
| **Module Federation** (webpack/Vite) | Módulos remotos cargados en tiempo de ejecución desde diferentes bundles | Maduro, dependencias compartidas posibles, configuración compleja |
| **Basado en iframe** | Cada micro-frontend en un iframe | Aislamiento simple, terrible UX (sin enrutamiento compartido, estilos, accesibilidad) |
| **Composición del lado del servidor** | El servidor ensambla fragmentos HTML de diferentes servicios (SSI, edge includes) | Buen rendimiento, interacción limitada del lado del cliente entre fragmentos |
| **Integración en tiempo de build** | Micro-frontends como paquetes npm compuestos en tiempo de build | Lo más simple, pero requiere builds coordinados --- pierde el deployment independiente |

### Compensaciones

**Beneficios:**

- **Autonomía del equipo.** Los equipos eligen sus propias herramientas, calendarios de lanzamiento y estándares de codificación.
- **Deployment independiente.** Envía la corrección del checkout sin esperar el lanzamiento del equipo de búsqueda.
- **Diversidad tecnológica.** El Equipo A puede usar React, el Equipo B puede usar Vue, el Equipo C puede mantener Angular. (Si esto es un beneficio o una maldición depende de tu organización.)
- **Aislamiento de fallos.** Un crash en el micro-frontend de búsqueda no tumba el checkout.

**Costos:**

- **Sobrecarga de rendimiento.** Si cada micro-frontend agrupa su propia copia de React, envías React cuatro veces. La gestión de dependencias compartidas es posible pero agrega complejidad.
- **Inconsistencia de UX.** Sin un design system compartido aplicado en todos los micro-frontends, el producto se siente como cuatro apps diferentes pegadas.
- **Complejidad de estado compartido.** Cuando el micro-frontend de búsqueda necesita actualizar el micro-frontend del carrito, necesitas un mecanismo de comunicación (custom events, store de estado compartido, parámetros de URL). Esto se complica rápidamente.
- **Dificultad de testing.** El integration testing a través de los límites de micro-frontends requiere un entorno compuesto. Los unit tests dentro de un micro-frontend son fáciles; verificar que todo el producto funciona junto es difícil.
- **Complejidad operacional.** En lugar de un pipeline de build, tienes N pipelines. En lugar de un deployment, N deployments. En lugar de un dashboard de monitoreo, N dashboards.

### La Evaluación Honesta

La mayoría de los equipos que adoptan micro-frontends estarían mejor servidos por un monolith bien estructurado con organización de carpetas basada en features.

Los micro-frontends resuelven **problemas organizacionales** (equipos pisándose entre sí, cuellos de botella de deployment, migración de frameworks), no técnicos. Si tu problema es "nuestro codebase está desordenado", la respuesta es mejor arquitectura dentro de un monolith, no dividir en múltiples codebases desordenados.

Los equipos que se benefician de los micro-frontends son lo suficientemente grandes como para que el costo de coordinación organizacional de un monolith exceda el costo de coordinación técnica de un frontend distribuido. Para la mayoría de los equipos, ese umbral nunca se alcanza.

### Errores Comunes

- **Micro-frontends para un equipo de 5.** Estás agregando complejidad de sistemas distribuidos a un problema que una estructura de carpetas puede resolver. La sobrecarga de builds independientes, deployments y comunicación entre apps no está justificada.
- **Compartir estado a través de eventos globales.** Si los micro-frontends se comunican a través de un event bus global o eventos a nivel de window, has recreado un monolith distribuido. Tienes todo el acoplamiento de un monolith más toda la complejidad de la distribución.
- **Sin design system compartido.** Sin consistencia visual aplicada, los usuarios notan las costuras: diferentes estilos de botones, espaciado inconsistente, tipografía que no coincide. Un design system con tokens compartidos es innegociable.
- **Duplicar React en 4 micro-frontends.** Si cada micro-frontend agrupa su propio React (120KB gzipped), estás enviando 480KB de solo React. Module Federation soporta dependencias compartidas, pero configurarlo correctamente no es trivial.
- **Elegir micro-frontends para el currículum.** Las decisiones de arquitectura deberían ser impulsadas por necesidades organizacionales, no por tendencias tecnológicas. La mejor arquitectura es la más simple que resuelve tus problemas reales.

### Puntos Clave

- Los micro-frontends son apps frontend desplegables de forma independiente compuestas en un solo producto. Resuelven problemas de escalamiento organizacional.
- Considéralos solo cuando tengas múltiples equipos (5+) que necesiten ciclos de deployment independientes o estén migrando entre frameworks.
- Un monolith bien estructurado con organización basada en features sirve mejor a la mayoría de los equipos. La arquitectura más simple gana hasta que se demuestre lo contrario.
- Si adoptas micro-frontends, un design system compartido y una gestión cuidadosa de dependencias son innegociables.
- La pregunta no es "¿podemos usar micro-frontends?" sino "¿tenemos el problema organizacional que los micro-frontends resuelven?"
