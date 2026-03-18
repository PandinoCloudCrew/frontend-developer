# Testing Básico: Tu Primer Test

[← Volver a Etapa 1](../README.md)

Hasta ahora has escrito código y lo has verificado manualmente — abriendo el navegador, haciendo click, mirando la consola. Eso funciona para 10 líneas de código. Cuando tu proyecto crece a 100, 1,000 o 10,000 líneas, verificar todo a mano se vuelve imposible.

Un **test** es código que verifica que tu otro código funciona. Lo escribes una vez y lo puedes ejecutar mil veces en un segundo. Si cambias algo y un test falla, sabes exactamente qué se rompió sin abrir el navegador.

---

## Por qué testear desde el principio

Los tests no son algo que "agregas después". Son parte del proceso de desarrollo:

- **Documentan comportamiento**: Un test bien escrito te dice qué hace tu código sin leer la implementación
- **Atrapan errores antes de que el usuario los vea**: Si tu función de descuento tiene un bug, el test lo detecta antes de desplegarlo
- **Te dan confianza para cambiar código**: Sin tests, cada cambio es una apuesta. Con tests, puedes refactorizar sabiendo que si los tests pasan, no rompiste nada

---

## Los principios FIRST

Todo buen test cumple 5 propiedades:

| Letra | Principio | En simple |
|:-----:|-----------|-----------|
| **F** | **Fast** | Se ejecuta en milisegundos, no en segundos |
| **I** | **Isolated** | No depende de otros tests ni de estado compartido |
| **R** | **Repeatable** | Da el mismo resultado siempre, en cualquier máquina |
| **S** | **Self-validating** | Pasa o falla automáticamente, sin que revises logs |
| **T** | **Timely** | Se escribe junto con el código, no "después" |

---

## El patrón AAA (Arrange-Act-Assert)

Todo test tiene 3 partes:

```typescript
test('aplica 20% de descuento cuando el total supera $100', () => {
  // Arrange — prepara los datos
  const items = [
    { nombre: 'Teclado', precio: 75 },
    { nombre: 'Mouse', precio: 45 },
  ];

  // Act — ejecuta la acción que quieres probar
  const total = calcularTotal(items);

  // Assert — verifica que el resultado es correcto
  expect(total).toBe(96); // $120 - 20% = $96
});
```

- **Arrange**: Prepara todo lo que el test necesita (datos, objetos, configuración)
- **Act**: Ejecuta la función o acción que estás probando (una sola acción por test)
- **Assert**: Verifica que el resultado es el esperado

Si no puedes distinguir visualmente dónde termina cada fase, el test está haciendo demasiado.

---

## Tu primera herramienta de testing: Vitest

**Vitest** es el test runner estándar para proyectos modernos. Es rápido, compatible con TypeScript, y tiene una API simple.

Para instalarlo en tu proyecto:

```bash
npm install -D vitest
```

Agrega un script en `package.json`:

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

Crea tu primer test. Si tienes un archivo `src/calcular-total.ts`:

```typescript
// src/calcular-total.ts
interface Item {
  nombre: string;
  precio: number;
}

export function calcularTotal(items: Item[]): number {
  const subtotal = items.reduce((sum, item) => sum + item.precio, 0);
  if (subtotal > 100) {
    return subtotal * 0.8; // 20% descuento
  }
  return subtotal;
}
```

El test va junto al archivo, con extensión `.test.ts`:

```typescript
// src/calcular-total.test.ts
import { describe, test, expect } from 'vitest';
import { calcularTotal } from './calcular-total';

describe('calcularTotal', () => {
  test('suma los precios de los items', () => {
    const items = [
      { nombre: 'Mouse', precio: 25 },
      { nombre: 'Pad', precio: 15 },
    ];

    const resultado = calcularTotal(items);

    expect(resultado).toBe(40);
  });

  test('aplica 20% de descuento cuando el subtotal supera $100', () => {
    const items = [
      { nombre: 'Teclado', precio: 75 },
      { nombre: 'Mouse', precio: 45 },
    ];

    const resultado = calcularTotal(items);

    expect(resultado).toBe(96); // 120 * 0.8
  });

  test('no aplica descuento cuando el subtotal es exactamente $100', () => {
    const items = [{ nombre: 'Audífonos', precio: 100 }];

    const resultado = calcularTotal(items);

    expect(resultado).toBe(100);
  });

  test('retorna 0 para una lista vacía', () => {
    const resultado = calcularTotal([]);

    expect(resultado).toBe(0);
  });
});
```

Ejecútalo:

```bash
npm test
```

Si todo está correcto, verás algo como:

```
 ✓ src/calcular-total.test.ts (4 tests) 2ms
   ✓ calcularTotal > suma los precios de los items
   ✓ calcularTotal > aplica 20% de descuento cuando el subtotal supera $100
   ✓ calcularTotal > no aplica descuento cuando el subtotal es exactamente $100
   ✓ calcularTotal > retorna 0 para una lista vacía

 Test Files  1 passed (1)
      Tests  4 passed (4)
```

---

## Qué testear y qué NO testear

**Sí testea:**
- Funciones que calculan, transforman o validan datos
- Casos límite: entrada vacía, cero, valores negativos, el valor exacto del umbral
- Comportamiento esperado cuando algo falla (input inválido)

**No testees (por ahora):**
- Que el HTML se renderice (eso viene en Etapa 7 con Testing Library)
- Que las librerías de terceros funcionen (sus autores ya lo testean)
- Implementación interna (qué variable usas, cómo la calculas)

---

## Anti-patterns

- **"Escribiré los tests después"** — "Después" nunca llega. Escribe el test junto con el código o inmediatamente después. Si esperas, pierdes el contexto de qué debería hacer la función.
- **Un test sin `expect()`** — Un test que ejecuta código pero no verifica nada es teatro. Solo sirve para inflar métricas de coverage.
- **Tests que dependen del orden** — Si tu test falla cuando lo ejecutas solo pero pasa con los demás, tienes estado compartido. Cada test debe crear sus propios datos.
- **Testear la implementación, no el comportamiento** — No verifiques que una función llama a otra función interna. Verifica que el resultado final es correcto.

---

## Puntos clave

- Un test es código que verifica que tu otro código funciona. Se ejecuta automáticamente y da un resultado binario: pasa o falla.
- FIRST: los tests deben ser Fast, Isolated, Repeatable, Self-validating, Timely.
- AAA: cada test tiene 3 fases — Arrange (preparar), Act (ejecutar), Assert (verificar).
- Testea funciones puras primero — son las más fáciles y las que más valor dan.
- El test va junto al código fuente: `calcular-total.ts` → `calcular-total.test.ts`.

---

[← Volver a Etapa 1](../README.md)
