# Supplemental Content: Testing, Code Review, and Micro-frontends

> Fills the "missing" gaps identified in the Content Map for Stage 7 (Testing & Quality) and Stage 8 (Architecture at Scale). This content covers how to write tests, how to test components and E2E flows, how to conduct code reviews, and a brief overview of micro-frontends.

---

## 1. Writing Good Tests --- Structure and Principles

### Why This Matters

Tests are not bureaucracy. They are the only mechanism that lets you change code with confidence. A codebase without tests is a codebase where every change is a gamble. A codebase with bad tests is worse --- it gives false confidence while slowing you down.

The purpose of tests:

1. **Document behavior.** Tests are executable specifications. A well-named test tells you what the code does without reading the implementation.
2. **Prevent regressions.** When you fix a bug, a test ensures that bug never comes back.
3. **Enable refactoring.** You cannot safely restructure code without tests that verify behavior is preserved.

Tests do NOT exist to achieve coverage metrics. A test suite with 100% line coverage that only checks "component renders without crashing" tells you nothing. A test suite with 40% coverage that verifies every business rule and edge case is infinitely more valuable.

### The Arrange-Act-Assert Pattern

Every test should have exactly three phases, clearly separated:

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

The three phases should be visually distinct. If you cannot tell where Arrange ends and Act begins, the test is doing too much.

When a test has no clear Act phase, you are testing setup, not behavior. When a test has multiple Act phases, split it into multiple tests.

### Test Naming

Describe the behavior, not the implementation. A test name should read like a sentence that a non-developer could understand.

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

A useful heuristic: if your test name includes a function name, variable name, or state property, you are probably testing implementation.

### What to Test

**User-visible behavior.** What happens when I click, type, submit, navigate? If the user can see it or trigger it, test it.

```typescript
test('adds item to cart when "Add to Cart" button is clicked', () => {
  render(<ProductPage product={mockProduct} />);

  userEvent.click(screen.getByRole('button', { name: /add to cart/i }));

  expect(screen.getByText('1 item in cart')).toBeInTheDocument();
});
```

**Edge cases.** Empty input, boundary values, error states, zero-length arrays, null values, network failures.

```typescript
test('shows "No results" when search returns empty array', () => { /* ... */ });
test('handles exactly 0 items in cart', () => { /* ... */ });
test('displays error when API request fails', () => { /* ... */ });
test('truncates display name longer than 50 characters', () => { /* ... */ });
```

**Business logic.** Calculations, transformations, validation rules --- the core logic that makes your application correct.

```typescript
test('calculates shipping as free for orders over $50', () => {
  expect(calculateShipping(51)).toBe(0);
  expect(calculateShipping(50)).toBe(5.99);
  expect(calculateShipping(49.99)).toBe(5.99);
});
```

### What NOT to Test

**Implementation details.** Internal state, private methods, specific function calls. If you refactor the internals without changing behavior, tests should not break.

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

**Framework internals.** Do not test that React's `useState` works, that Vue's `ref` is reactive, or that Angular's change detection fires. The framework authors already test that.

**Styling.** Do not assert on CSS classes, pixel positions, or computed styles. Styles change frequently and have no behavioral impact. Use visual regression testing (screenshots) for critical visual components instead.

**Third-party library behavior.** If you are using a date library, do not test that it formats dates correctly. Test that *your code* passes the right date to the library.

### Test Isolation

Each test must run independently. No shared mutable state. No test order dependencies.

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

Use `beforeEach` for common initialization that every test in the block needs. Use `afterEach` for cleanup (clearing mocks, restoring timers). Never use `beforeAll` to create state that tests mutate.

### The Testing Spectrum

From fastest and simplest to slowest and most comprehensive:

| Level | What it tests | Speed | Confidence | Example |
|-------|---------------|-------|------------|---------|
| **Pure function** | Input → output | ~1ms | Low (isolated) | `calculateDiscount(100)` returns `80` |
| **Hook/Composable** | Logic with state | ~5ms | Low-medium | `useCounter()` increments and decrements |
| **Component** | Render + interact | ~50ms | Medium | `<LoginForm>` submits credentials |
| **Integration** | Multiple units + API | ~200ms | Medium-high | `<UserDashboard>` fetches and renders data |
| **E2E** | Full browser flow | ~5s | High | Login, navigate, complete checkout |

The testing pyramid: many tests at the top of this table, few at the bottom. Most of your tests should be pure function and component tests. E2E tests cover only critical paths.

### Test File Organization

Colocate tests next to the source code they test:

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

Not in a separate mirror tree:

```
# Avoid this structure
src/
  components/
    UserProfile.tsx
__tests__/
  components/
    UserProfile.test.tsx      ← far from the source, easy to forget
```

Colocating tests makes it obvious when a file lacks tests, makes it easy to find the test for any file, and keeps test and source in sync when moving or renaming files.

### Common Pitfalls

- **Testing implementation details.** Your test breaks when you refactor from `useState` to `useReducer`, even though the component behaves identically. You are testing how it works, not what it does.
- **Brittle tests.** Tests that break on any refactor provide negative value: they cost time to maintain without catching real bugs. If moving a function from one file to another breaks tests, something is wrong.
- **Tests with no assertions.** A test that renders a component and checks nothing is theater. It exists only to inflate coverage numbers.
- **Copy-pasting test code.** Duplicate setup across 20 tests becomes 20 places to update when the API changes. Extract test utilities and factory functions.
- **Testing the mock.** If your test mocks a function and then asserts that the mock was called, you are testing your test setup, not your code. The mock should enable the test, not be the subject of it.
- **`test("should work")` naming.** When this test fails in CI, the failure message tells you nothing. You have to open the file and read the test body to understand what broke.
- **Excessive use of `describe` nesting.** Three or four levels of `describe` blocks make tests harder to read and maintain. One level of `describe` per function or component is usually enough.

### Key Takeaways

- Tests document behavior, prevent regressions, and enable refactoring. Coverage metrics are a side effect, not a goal.
- Every test follows Arrange-Act-Assert with clear separation between phases.
- Name tests by behavior ("shows error when..."), not by implementation ("calls validateEmail").
- Test what the user sees and does. Do not test internal state, framework internals, or third-party library behavior.
- Each test must be independent --- no shared mutable state, no order dependencies.

---

## 2. Component Testing Patterns

### Why This Matters

Components are the primary building block of modern frontends. If your component tests are well-written, they give you confidence that the UI works as users expect. If they are poorly written --- testing CSS classes, DOM structure, or internal state --- they break on every refactor and catch zero real bugs.

The guiding philosophy comes from Testing Library:

> "The more your tests resemble the way your software is used, the more confidence they can give you."

Users do not interact with CSS class names or React state. They see text, click buttons, fill forms, and read error messages. Test that.

### Query Priority

When finding elements in your rendered component, prefer queries that reflect how users and assistive technologies find elements. From most preferred to least:

#### 1. `getByRole` --- Accessible Role + Name (Most Preferred)

This is how screen readers navigate the page. If your element is not findable by role, it may not be accessible.

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

#### 2. `getByLabelText` --- Form Inputs with Labels

For form elements, querying by label text is the closest to how users identify inputs.

```typescript
screen.getByLabelText(/email address/i);
screen.getByLabelText(/password/i);
screen.getByLabelText(/date of birth/i);
```

#### 3. `getByPlaceholderText` --- Inputs Without Visible Labels

Use this only when an input genuinely has no visible label (search bars, for example). In most cases, add a label instead.

```typescript
screen.getByPlaceholderText(/search\.\.\./i);
```

#### 4. `getByText` --- Non-Interactive Text Content

For text that is not inside an interactive element.

```typescript
screen.getByText(/no results found/i);
screen.getByText(/welcome back, jane/i);
screen.getByText('$42.99');
```

#### 5. `getByTestId` --- Last Resort

Use `data-testid` only when there is no accessible way to find the element. This is a red flag --- it usually means the element lacks proper accessible markup.

```typescript
// Only when there is truly no other option
screen.getByTestId('map-container'); // a canvas element with no text
```

If you find yourself reaching for `getByTestId`, ask whether the element needs an accessible name, a label, or an ARIA role.

### User Interactions

Use `@testing-library/user-event` over `fireEvent`. `user-event` simulates real browser behavior: focus management, keydown/keyup sequences, clipboard events, and pointer events. `fireEvent` dispatches a single synthetic DOM event.

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

Common `userEvent` methods:

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

### Testing Async Behavior

Components often load data, show spinners, and update after async operations. Use `findBy` queries (which auto-retry) and `waitFor` for assertions.

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

Key difference: `findBy` is for waiting for an element to appear. `waitFor` is for waiting for a condition to become true (including elements disappearing).

### Testing Hooks and Composables

Test hooks in isolation when they contain significant logic. Use `renderHook` from Testing Library.

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

For hooks that depend on context, provide a wrapper:

```typescript
test('useAuth returns current user', () => {
  const wrapper = ({ children }) => (
    <AuthProvider user={mockUser}>{children}</AuthProvider>
  );

  const { result } = renderHook(() => useAuth(), { wrapper });

  expect(result.current.user.email).toBe('jane@example.com');
});
```

For Vue composables, test utility functions directly or use a thin component wrapper:

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

### Mocking Context and Providers

Components often depend on context (theme, auth, routing, internationalization). Create test wrappers that provide these dependencies.

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

Usage:

```typescript
import { render, screen } from '../test-utils';

test('shows login button when not authenticated', () => {
  render(<Header />);
  expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument();
});
```

### Testing Form Components

Forms are where the most important user interactions happen. Test the full user flow.

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

### Testing Loading, Error, and Empty States

Use MSW (Mock Service Worker) to control API responses.

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

Snapshots can be useful for small, focused outputs --- but they are easily abused.

**When snapshots work:**

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

**When snapshots are harmful:**

```typescript
// Bad — a 200-line HTML dump that no one reviews
test('renders user profile', () => {
  const { container } = render(<UserProfile user={mockUser} />);
  expect(container).toMatchSnapshot(); // will produce an unreadable snapshot
});
```

**The 10-second rule:** if you cannot review a snapshot diff in 10 seconds, the snapshot is too large. Replace it with specific assertions:

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

### Example Patterns

**Testing a button component:**

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

**Testing a list with empty and loading states:**

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

### Common Pitfalls

- **`getByTestId` as the default query.** Reaching for `data-testid` first bypasses accessible markup. If your tests cannot find elements by role or label, your UI probably is not accessible either.
- **`fireEvent` instead of `userEvent`.** `fireEvent.click()` dispatches a single click event. Real clicks involve focus, pointerdown, mousedown, pointerup, mouseup, then click. `userEvent` catches bugs that `fireEvent` misses (event handler order, focus management, disabled state).
- **Testing CSS classes.** `expect(element).toHaveClass('btn-primary')` breaks whenever you rename a class, change a design system, or migrate from CSS Modules to Tailwind. Test the visible outcome instead: is the button disabled? Is the text red? Use `toBeDisabled()`, `toBeVisible()`, or visual regression screenshots.
- **Asserting on DOM structure.** `expect(container.querySelector('div > span.error')).toExist()` is fragile. If you wrap the span in a `<p>`, the test breaks despite identical behavior. Use `getByText` or `getByRole`.
- **Not awaiting async operations.** Forgetting `await` on `findBy` or `userEvent` calls produces tests that pass by accident or fail intermittently. Every `userEvent` method and every `findBy` query returns a promise.
- **Mocking the component under test.** If you mock the function you are testing, you are testing your mock. Mock *dependencies* (APIs, timers, external services), not the subject.

### Key Takeaways

- Use Testing Library's query priority: `getByRole` first, `getByTestId` last.
- Use `userEvent` over `fireEvent` for realistic user interaction simulation.
- Test all three states: loading, success (with data), and failure (error + empty).
- Use `findBy` for elements that appear after async operations. Use `waitFor` for conditions that change over time.
- Extract test providers and utilities into a shared `test-utils` file to avoid repetition.

---

## 3. E2E Testing Patterns (Playwright)

### Why This Matters

Component tests verify individual pieces in isolation. E2E tests verify that the entire system --- frontend, backend, database, authentication --- works together as a real user would experience it. They are the last line of defense before production.

But E2E tests are expensive: slow to run, hard to maintain, and prone to flakiness. The key is using them surgically: test only what cannot be tested any other way.

### What to E2E Test

Test **critical user paths** --- the flows that, if broken, mean your product is broken.

- **Authentication:** sign up, log in, log out, password reset
- **Core user journey:** the primary action your product exists for (search, purchase, create, share)
- **Payment/checkout:** money-related flows must work
- **Onboarding:** first-time user experience

Do NOT E2E test every edge case, every validation rule, or every empty state. That is what unit and component tests are for. If you have 500 E2E tests, you have a maintenance problem and a slow CI pipeline.

### Page Object Model

Encapsulate page interactions in classes. When the UI changes, update one place instead of 40 tests.

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

Usage in tests:

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

When the login form changes (say the label changes from "Email" to "Email address"), you update `LoginPage` once. All tests that use it continue to work.

### Locator Strategy

Playwright provides the same accessible query philosophy as Testing Library:

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

### Test Data Management

Each test must create its own data and clean up after itself.

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

Never hardcode test data like `jane@example.com` across multiple tests. If two tests run in parallel and use the same email, they will interfere with each other.

### Handling Authentication

Logging in via the UI for every test wastes time. Log in via API and reuse the auth state.

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

Now every test starts already logged in, saving 2-5 seconds per test.

### Network Mocking in E2E

Use `page.route()` to intercept network requests when needed. But use it sparingly --- E2E tests should exercise real APIs whenever possible.

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

### Avoiding Flaky Tests

Flaky tests are worse than no tests. A test that passes 95% of the time gets ignored, and the 5% failure rate erodes trust in the entire suite.

**Use Playwright's auto-waiting.** Every locator action (`click`, `fill`, `check`) automatically waits for the element to be visible, enabled, and stable. Do not add manual waits before actions.

```typescript
// Bad — arbitrary sleep
await page.waitForTimeout(3000);
await page.getByRole('button', { name: /submit/i }).click();

// Good — Playwright auto-waits for the button to be actionable
await page.getByRole('button', { name: /submit/i }).click();
```

**Wait for specific conditions, not time.**

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

**Use retry in CI as a safety net, not a fix.**

```bash
# playwright.config.ts — retries catch genuine flakiness from infra issues
npx playwright test --retries=2
```

If a test needs retries to pass consistently, fix the test. Retries are for infrastructure hiccups (network blips, container startup timing), not for test design problems.

**Isolate every test.** Each test creates its own data and does not depend on any other test having run first.

### Parallel Execution

Playwright runs test files in parallel by default. Tests within a single file run sequentially by default but can be parallelized with `test.describe.configure({ mode: 'parallel' })`.

Design every test to be fully independent. No test should assume that another test ran first, created certain data, or left the application in a specific state.

### Visual Regression Testing

Playwright can capture and compare screenshots:

```typescript
test('checkout page matches design', async ({ page }) => {
  await page.goto('/checkout');
  await expect(page.getByText('Order Summary')).toBeVisible();
  await expect(page).toHaveScreenshot('checkout-page.png');
});
```

Use sparingly. Visual tests are brittle across environments (font rendering differences, browser versions) and create maintenance burden. Reserve them for:

- Critical landing pages
- Design system component showcase
- Complex visualizations (charts, graphs)

Do not screenshot-test every page in your application.

### CI Integration

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

For large test suites, shard across CI workers:

```yaml
strategy:
  matrix:
    shard: [1/4, 2/4, 3/4, 4/4]
steps:
  - run: npx playwright test --shard=${{ matrix.shard }}
```

### Common Pitfalls

- **E2E testing every scenario.** 500 E2E tests running 10 seconds each = 83 minutes of CI time. Your pipeline becomes a bottleneck and developers stop waiting for it. Use E2E for critical paths (5-15 tests), unit/component tests for everything else.
- **`page.waitForTimeout(5000)`.** Sleep-based waits are the number one cause of flaky tests. The page might load in 200ms or 8000ms depending on CI load. Wait for specific conditions instead.
- **Login via UI in every test.** Filling email, password, and clicking submit adds 3-5 seconds per test. Authenticate via API and reuse `storageState`.
- **Hardcoded test data.** `email: "test@test.com"` in every test means parallel tests collide. Use factory functions that generate unique data.
- **Tests that depend on database state from other tests.** Test A creates a user, Test B assumes that user exists. When Test A is skipped, modified, or runs after Test B, everything breaks.
- **Testing third-party services in E2E.** Do not test that Stripe's checkout form works or that Google Maps renders correctly. Mock third-party services and test only your integration with them.

### Key Takeaways

- E2E tests cover critical user paths only: login, core workflow, payment, onboarding.
- Use the Page Object Model to encapsulate page interactions. UI changes update one file.
- Authenticate via API, not UI. Reuse auth state with `storageState`.
- Never use `waitForTimeout`. Use Playwright's auto-waiting, `waitForResponse`, or `expect(locator).toBeVisible()`.
- Design every test to be independent: own data, no order dependencies, parallel-safe.

---

## 4. Code Review Practices

### Why This Matters

Code review is the highest-leverage activity on a team. A 30-minute review can prevent a bug that would cost a day to debug, spread knowledge that prevents three future mistakes, and improve a design that would cause pain for months.

Code review is not gatekeeping. Its purposes:

1. **Catch bugs** before they reach users.
2. **Share knowledge** across the team (no single point of failure).
3. **Enforce standards** so the codebase stays consistent.
4. **Improve design** through collaborative thinking.

### What to Look For

Review in this priority order. Do not spend 20 minutes debating variable names while missing a security hole.

#### 1. Correctness

Does the code actually do what it claims to do?

- Does it handle edge cases? What happens with empty input, null values, zero-length arrays?
- What happens when the network request fails? When the user double-clicks?
- Are there off-by-one errors, race conditions, or missing `await` calls?
- Does the happy path work AND do the unhappy paths degrade gracefully?

#### 2. Security

- Is user input sanitized before rendering? (`dangerouslySetInnerHTML`, `v-html`, `[innerHTML]`)
- Are authentication and authorization checks in place? Can users access resources they should not?
- Are API keys, tokens, or secrets exposed in client-side code?
- Are CSRF tokens present on state-changing requests?
- Is sensitive data (passwords, tokens) being logged or stored insecurely?

#### 3. Design

- Are component boundaries right? Is this one component trying to do three things?
- Is state in the right place? Is local state being lifted globally without reason?
- Does this introduce tight coupling between features that should be independent?
- Is the public API (props, functions, exports) minimal and clear?
- Will this pattern scale, or will it cause pain at 10x the current usage?

#### 4. Performance

- Are there unnecessary re-renders? Is an object or array being recreated on every render?
- Is `useMemo` or `useCallback` missing where it would prevent expensive recalculations?
- Does this PR add a large dependency? What is the bundle size impact?
- Is there a rendering bottleneck (long lists without virtualization, synchronous heavy computation)?

#### 5. Accessibility

- Is the HTML semantic? Buttons for actions, links for navigation, headings in order?
- Can the feature be used with keyboard only? Tab order, Enter/Space activation, Escape to dismiss?
- Are ARIA attributes correct? `aria-label` where there is no visible text, `aria-expanded` for collapsibles?
- Do images have meaningful `alt` text?

#### 6. Readability

- Are names clear and descriptive? Can you understand `processUserData` without reading the implementation?
- Is the complexity reasonable? A 200-line function should probably be split.
- Are comments explaining *why*, not *what*? (The code says what. Comments should say why.)
- Is the code consistent with the rest of the codebase?

#### 7. Tests

- Are there tests? Do they test meaningful behavior, not just coverage?
- Do the tests cover the important paths --- happy path, error states, edge cases?
- Are the tests readable? Can you understand what is being tested from the test name alone?
- For bug fixes: is there a regression test that would fail if the bug reappeared?

### What NOT to Review For

Do not waste review time on things that linters and formatters should handle:

- Formatting (line length, indentation, trailing commas)
- Import ordering
- Semicolons vs no semicolons
- Single quotes vs double quotes

If your team debates these in PRs, you do not have a code style problem --- you have a tooling configuration problem. Set up ESLint/Biome and Prettier, run them in CI, and never discuss formatting in a review again.

### PR Size

**Aim for fewer than 400 lines of actual changes** (excluding generated files, lockfiles, and test fixtures).

Why small PRs matter:

- A 200-line PR gets a thorough review in 20 minutes.
- A 2000-line PR gets a superficial skim in 40 minutes. Bugs hide in plain sight.
- Research consistently shows that review quality degrades sharply past 400 lines.

For large features, use **stacked PRs**:

```
PR 1: Add API types and data fetching hook (120 lines)
PR 2: Build UserProfile component with loading/error states (180 lines)
PR 3: Add UserProfile page with routing and integration (150 lines)
PR 4: Add tests for UserProfile flow (200 lines)
```

Each PR is reviewable, deployable, and reverts cleanly.

### Giving Feedback

#### Be Specific

```
# Bad — vague concern
"This might have performance issues."

# Good — specific problem with specific solution
"This re-renders the entire list on every keystroke because `items` is
recreated each render. Consider `useMemo` with `[rawItems, filter]` as
dependencies, or move the filtering into the `useItems` hook."
```

#### Use "We" Not "You"

```
# Confrontational
"You forgot error handling here."

# Collaborative
"We should add error handling here — if the API returns 500, the
component will render `undefined` as the user's name."
```

#### Distinguish Blocking vs Non-Blocking

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

#### Offer Alternatives

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

#### Approve with Minor Comments

Not every comment needs to block the PR. When the code is sound but has minor improvements:

```
"LGTM — ship it. One nit: rename `handleClick` to `handleAddToCart`
for clarity, but not blocking."
```

### Receiving Feedback

- **Do not take it personally.** The code is being reviewed, not you. A comment saying "this has a bug" is not saying "you are a bad developer."
- **Ask clarifying questions.** If feedback is unclear, ask: "Can you give an example of how this would fail?" or "What scenario are you concerned about?"
- **Push back with reasoning.** If you disagree, explain why: "I considered `useMemo` here but profiled it --- the list is never more than 20 items and the filter runs in <1ms. The memoization overhead is not worth it." Reviewers are not infallible. Good pushback improves the team's understanding.
- **Do not just comply.** Blindly accepting every suggestion without understanding produces worse code and prevents learning. Understand the reasoning, then decide.

### Review Checklists by PR Type

#### New Component

- [ ] Props are fully typed (no `any`, no implicit types)
- [ ] Component is keyboard navigable (Tab, Enter, Space, Escape)
- [ ] Interactive elements have accessible names (visible text or `aria-label`)
- [ ] Loading, error, and empty states are handled
- [ ] Component works with different content lengths (long names, empty strings)
- [ ] Tests cover the primary user interactions
- [ ] No business logic in the component (extract to hooks/services)

#### Bug Fix

- [ ] Root cause is identified (not just the symptom patched)
- [ ] A regression test is added that fails without the fix and passes with it
- [ ] Related code is checked for the same bug pattern
- [ ] The fix does not introduce new edge cases
- [ ] The commit message or PR description explains what caused the bug

#### Refactor

- [ ] Behavior is unchanged (same inputs produce same outputs)
- [ ] All existing tests pass without modification
- [ ] No feature changes are mixed in (refactor and feature changes are separate PRs)
- [ ] The refactor improves clarity, reduces duplication, or simplifies architecture
- [ ] No scope creep (refactoring the world when fixing one module)

#### Dependency Update

- [ ] CHANGELOG or migration guide is reviewed for breaking changes
- [ ] Bundle size impact is checked (before and after `npm run build`)
- [ ] Security advisories are checked (`npm audit`)
- [ ] New dependency version is compatible with other dependencies
- [ ] Application is smoke-tested with the new version

### Common Pitfalls

- **Rubber-stamping.** Approving without reading. "LGTM" with no comments on a 500-line PR means nobody actually reviewed it. If you do not have time to review properly, say so and let someone else review.
- **Bikeshedding.** Spending 30 minutes debating whether a variable should be named `userData` or `userInfo` while a race condition goes unnoticed three lines below. Review in priority order.
- **Blocking on personal preference.** "I would have written this differently" is not a reason to block a PR. Block only for correctness, security, or established team standards. Taste is not a merge criterion.
- **Reviewing 2000-line PRs.** You will miss bugs. You will skim. The author should have broken this into smaller PRs. Ask them to split it before reviewing.
- **No review comments.** If you reviewed a PR and found nothing to comment on, either the code is perfect (unlikely) or you did not review carefully. Even a "I like how you handled the error state here" comment shows engagement.
- **Reviewing only the diff.** The diff shows what changed, but not the context. If a function is modified, read the callers. If a component's props change, check where it is used. The surrounding code matters.
- **Nitpicking without labeling.** If you have 15 minor suggestions and 1 critical issue, the critical issue drowns. Label your comments: `nit:`, `suggestion:`, `blocking:`, `question:`.

### Key Takeaways

- Review in priority order: correctness, security, design, performance, accessibility, readability, tests.
- Keep PRs under 400 lines. Large PRs get shallow reviews.
- Be specific in feedback: name the problem, explain why, and offer an alternative.
- Label comments as `nit:`, `suggestion:`, `blocking:`, or `question:` so the author knows what to prioritize.
- Receiving feedback: separate your ego from your code. Ask questions. Push back with reasoning when you disagree.

---

## 5. Micro-frontends --- A Brief Overview

### Why This Matters

Micro-frontends come up in architecture discussions, job interviews, and tech blog posts. You need to know what they are, when they make sense, and --- more importantly --- when they do not. This is not a how-to guide. It is a map so you can navigate the conversation.

### What Are Micro-frontends?

Micro-frontends apply the microservices pattern to frontend development: **independently developed, tested, and deployed frontend applications** that are composed into a single user-facing product.

Instead of one large frontend codebase owned by one team, multiple teams each own a slice of the UI. Team A owns search, Team B owns the product page, Team C owns checkout. Each team deploys independently.

### When Micro-frontends Make Sense

- **Large organizations** with 5+ teams working on different product areas simultaneously. Independent deployment cycles become a real need when Team A's release schedule should not block Team B.
- **Acquisitions or mergers** where different products built with different frameworks need to be unified under a single user experience.
- **Legacy migration** where you need to incrementally replace an old frontend while keeping it running. The new framework handles new features while the old framework serves existing ones.

### When Micro-frontends Do NOT Make Sense

- **Small to medium teams** (under 20-30 frontend developers). The coordination overhead of micro-frontends exceeds the benefit.
- **Single product with a single framework.** If everyone uses React and works in the same repo, you do not need architecture to isolate frameworks.
- **"Netflix does it" reasoning.** Netflix has hundreds of frontend engineers. You probably do not. Technology choices should match your organizational reality, not your aspirations.

### Implementation Approaches

| Approach | How It Works | Trade-offs |
|----------|-------------|------------|
| **Module Federation** (webpack/Vite) | Remote modules loaded at runtime from different bundles | Mature, shared dependencies possible, complex config |
| **iframe-based** | Each micro-frontend in an iframe | Simple isolation, terrible UX (no shared routing, styling, accessibility) |
| **Server-side composition** | Server stitches HTML fragments from different services (SSI, edge includes) | Good performance, limited client-side interaction between fragments |
| **Build-time integration** | Micro-frontends as npm packages composed at build time | Simplest, but requires coordinated builds --- loses independent deployment |

### Trade-offs

**Benefits:**

- **Team autonomy.** Teams choose their own tools, release schedules, and coding standards.
- **Independent deployment.** Ship the checkout fix without waiting for the search team's release.
- **Technology diversity.** Team A can use React, Team B can use Vue, Team C can keep Angular. (Whether this is a benefit or a curse depends on your organization.)
- **Fault isolation.** A crash in the search micro-frontend does not bring down checkout.

**Costs:**

- **Performance overhead.** If each micro-frontend bundles its own copy of React, you ship React four times. Shared dependency management is possible but adds complexity.
- **UX inconsistency.** Without a shared design system enforced across all micro-frontends, the product feels like four different apps stitched together.
- **Shared state complexity.** When the search micro-frontend needs to update the cart micro-frontend, you need a communication mechanism (custom events, shared state store, URL parameters). This gets messy fast.
- **Testing difficulty.** Integration testing across micro-frontend boundaries requires a composed environment. Unit tests within a micro-frontend are easy; verifying the whole product works together is hard.
- **Operational complexity.** Instead of one build pipeline, you have N pipelines. Instead of one deployment, N deployments. Instead of one monitoring dashboard, N dashboards.

### The Honest Assessment

Most teams that adopt micro-frontends would be better served by a well-structured monolith with feature-based folder organization.

Micro-frontends solve **organizational problems** (teams stepping on each other, deployment bottlenecks, framework migration), not technical ones. If your problem is "our codebase is messy," the answer is better architecture within a monolith, not splitting into multiple messy codebases.

The teams that benefit from micro-frontends are large enough that the organizational coordination cost of a monolith exceeds the technical coordination cost of a distributed frontend. For most teams, that threshold is never reached.

### Common Pitfalls

- **Micro-frontends for a team of 5.** You are adding distributed systems complexity to a problem that a folder structure can solve. The overhead of independent builds, deployments, and cross-app communication is not justified.
- **Sharing state via global events.** If micro-frontends communicate through a global event bus or window-level events, you have recreated a distributed monolith. You have all the coupling of a monolith plus all the complexity of distribution.
- **No shared design system.** Without enforced visual consistency, users notice the seams: different button styles, inconsistent spacing, mismatched typography. A design system with shared tokens is non-negotiable.
- **Duplicating React across 4 micro-frontends.** If each micro-frontend bundles its own React (120KB gzipped), you are shipping 480KB of just React. Module Federation supports shared dependencies, but configuring it correctly is non-trivial.
- **Choosing micro-frontends for the resume.** Architectural decisions should be driven by organizational needs, not technology trends. The best architecture is the simplest one that solves your actual problems.

### Key Takeaways

- Micro-frontends are independently deployable frontend apps composed into one product. They solve organizational scaling problems.
- Consider them only when you have multiple teams (5+) that need independent deployment cycles or are migrating between frameworks.
- A well-structured monolith with feature-based organization serves most teams better. Simpler architecture wins until proven otherwise.
- If you adopt micro-frontends, a shared design system and careful dependency management are non-negotiable.
- The question is not "can we use micro-frontends?" but "do we have the organizational problem that micro-frontends solve?"
