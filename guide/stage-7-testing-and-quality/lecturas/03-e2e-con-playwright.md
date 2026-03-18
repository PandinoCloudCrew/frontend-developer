# Patrones de E2E Testing (Playwright)

> Cómo usar tests end-to-end de forma quirúrgica para verificar que el sistema completo funciona junto. Cubre qué testear con E2E, Page Object Model, locators, datos de test, autenticación, network mocking, tests inconsistentes e integración con CI.

---

## Por Qué Esto Importa

Los component tests verifican piezas individuales de forma aislada. Los tests E2E verifican que el sistema completo --- frontend, backend, base de datos, autenticación --- funciona junto como un usuario real lo experimentaría. Son la última línea de defensa antes de producción.

Pero los tests E2E son costosos: lentos de ejecutar, difíciles de mantener y propensos a ser inconsistentes. La clave es usarlos de forma quirúrgica: testea solo lo que no se puede testear de otra manera.

---

## Qué Testear con E2E

Testea **rutas críticas del usuario** --- los flujos que, si se rompen, significan que tu producto está roto.

- **Autenticación:** registro, inicio de sesión, cierre de sesión, restablecimiento de contraseña
- **Recorrido principal del usuario:** la acción principal para la que existe tu producto (buscar, comprar, crear, compartir)
- **Pago/checkout:** los flujos relacionados con dinero deben funcionar
- **Onboarding:** experiencia del usuario por primera vez

NO hagas tests E2E de cada caso extremo, cada regla de validación o cada estado vacío. Para eso están los unit tests y component tests. Si tienes 500 tests E2E, tienes un problema de mantenimiento y un pipeline de CI lento.

---

## Page Object Model

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

---

## Estrategia de Locators

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

---

## Gestión de Datos de Test

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

---

## Manejo de Autenticación

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

---

## Network Mocking en E2E

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

---

## Evitar Tests Inconsistentes

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

---

## Ejecución Paralela

Playwright ejecuta archivos de test en paralelo por defecto. Los tests dentro de un mismo archivo se ejecutan secuencialmente por defecto pero pueden ser paralelizados con `test.describe.configure({ mode: 'parallel' })`.

Diseña cada test para ser completamente independiente. Ningún test debería asumir que otro test se ejecutó primero, creó ciertos datos o dejó la aplicación en un estado específico.

---

## Visual Regression Testing

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

---

## Integración con CI

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

---

## Errores Comunes

- **Hacer tests E2E de cada escenario.** 500 tests E2E ejecutándose 10 segundos cada uno = 83 minutos de tiempo de CI. Tu pipeline se convierte en un cuello de botella y los desarrolladores dejan de esperar. Usa E2E para rutas críticas (5-15 tests), unit/component tests para todo lo demás.
- **`page.waitForTimeout(5000)`.** Las esperas basadas en sleep son la causa número uno de tests inconsistentes. La página puede cargar en 200ms o en 8000ms dependiendo de la carga del CI. Espera condiciones específicas en su lugar.
- **Login a través de la UI en cada test.** Llenar email, contraseña y hacer clic en submit agrega 3-5 segundos por test. Autentícate a través de API y reutiliza `storageState`.
- **Datos de test codificados.** `email: "test@test.com"` en cada test significa que los tests paralelos colisionan. Usa funciones factory que generen datos únicos.
- **Tests que dependen del estado de la base de datos de otros tests.** Test A crea un usuario, Test B asume que ese usuario existe. Cuando Test A se omite, se modifica o se ejecuta después de Test B, todo se rompe.
- **Testear servicios de terceros en E2E.** No testees que el formulario de checkout de Stripe funciona o que Google Maps renderiza correctamente. Mockea servicios de terceros y testea solo tu integración con ellos.

---

## Puntos Clave

- Los tests E2E cubren solo rutas críticas del usuario: login, flujo principal, pago, onboarding.
- Usa el Page Object Model para encapsular interacciones de página. Los cambios de UI actualizan un solo archivo.
- Autentícate a través de API, no de la UI. Reutiliza el estado de autenticación con `storageState`.
- Nunca uses `waitForTimeout`. Usa el auto-waiting de Playwright, `waitForResponse` o `expect(locator).toBeVisible()`.
- Diseña cada test para ser independiente: datos propios, sin dependencias de orden, seguro para ejecución paralela.
