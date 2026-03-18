# Escribir Buenos Tests --- Estructura y Principios

> Cómo escribir tests que documenten comportamiento, prevengan regresiones y habiliten refactoring con confianza. Cubre el patrón AAA, nombrado, qué testear, qué no testear, aislamiento y el espectro de testing.

---

## Por Qué Esto Importa

Los tests no son burocracia. Son el único mecanismo que te permite cambiar código con confianza. Un codebase sin tests es un codebase donde cada cambio es una apuesta. Un codebase con tests malos es peor --- da falsa confianza mientras te ralentiza.

El propósito de los tests:

1. **Documentar comportamiento.** Los tests son especificaciones ejecutables. Un test bien nombrado te dice qué hace el código sin leer la implementación.
2. **Prevenir regresiones.** Cuando corriges un bug, un test asegura que ese bug nunca regrese.
3. **Habilitar refactoring.** No puedes reestructurar código de forma segura sin tests que verifiquen que el comportamiento se preserva.

Los tests NO existen para alcanzar métricas de coverage. Un test suite con 100% de line coverage que solo verifica "el componente renderiza sin errores" no te dice nada. Un test suite con 40% de coverage que verifica cada regla de negocio y caso extremo es infinitamente más valioso.

---

## El Patrón Arrange-Act-Assert

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

---

## Nombrado de Tests

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

---

## Qué Testear

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

---

## Qué NO Testear

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

---

## Aislamiento de Tests

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

---

## El Espectro de Testing

De más rápido y simple a más lento y completo:

| Nivel | Qué testea | Velocidad | Confianza | Ejemplo |
|-------|------------|-----------|-----------|---------|
| **Pure function** | Input → output | ~1ms | Baja (aislado) | `calculateDiscount(100)` retorna `80` |
| **Hook/Composable** | Lógica con estado | ~5ms | Baja-media | `useCounter()` incrementa y decrementa |
| **Component** | Renderizado + interacción | ~50ms | Media | `<LoginForm>` envía credenciales |
| **Integration** | Múltiples unidades + API | ~200ms | Media-alta | `<UserDashboard>` obtiene y renderiza datos |
| **E2E** | Flujo completo en navegador | ~5s | Alta | Login, navegar, completar checkout |

La pirámide de testing: muchos tests en la parte superior de esta tabla, pocos en la parte inferior. La mayoría de tus tests deberían ser de pure function y componentes. Los tests E2E cubren solo rutas críticas.

---

## Organización de Archivos de Test

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

---

## Errores Comunes

- **Testear detalles de implementación.** Tu test se rompe cuando refactorizas de `useState` a `useReducer`, aunque el componente se comporta de forma idéntica. Estás testeando cómo funciona, no qué hace.
- **Tests frágiles.** Tests que se rompen con cualquier refactorización proporcionan valor negativo: cuestan tiempo de mantenimiento sin detectar bugs reales. Si mover una función de un archivo a otro rompe los tests, algo está mal.
- **Tests sin assertions.** Un test que renderiza un componente y no verifica nada es teatro. Existe solo para inflar los números de coverage.
- **Copiar y pegar código de test.** Setup duplicado en 20 tests se convierte en 20 lugares que actualizar cuando la API cambia. Extrae utilidades de test y funciones factory.
- **Testear el mock.** Si tu test hace mock de una función y luego verifica que el mock fue llamado, estás testeando tu configuración de test, no tu código. El mock debería habilitar el test, no ser el sujeto del mismo.
- **Nombrado `test("should work")`.** Cuando este test falla en CI, el mensaje de error no te dice nada. Tienes que abrir el archivo y leer el cuerpo del test para entender qué se rompió.
- **Uso excesivo de anidamiento con `describe`.** Tres o cuatro niveles de bloques `describe` hacen que los tests sean más difíciles de leer y mantener. Un nivel de `describe` por función o componente usualmente es suficiente.

---

## Puntos Clave

- Los tests documentan comportamiento, previenen regresiones y habilitan refactoring. Las métricas de coverage son un efecto secundario, no un objetivo.
- Cada test sigue Arrange-Act-Assert con separación clara entre fases.
- Nombra los tests por comportamiento ("shows error when..."), no por implementación ("calls validateEmail").
- Testea lo que el usuario ve y hace. No testees estado interno, internos del framework o comportamiento de bibliotecas de terceros.
- Cada test debe ser independiente --- sin estado mutable compartido, sin dependencias de orden.
