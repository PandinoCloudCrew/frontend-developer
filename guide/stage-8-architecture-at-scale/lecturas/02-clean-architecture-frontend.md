# Clean Architecture en Frontend

> Cómo aplicar los principios de Clean Architecture y Hexagonal Architecture en aplicaciones frontend. Cubre la separación en capas, el Service Layer Pattern y la arquitectura de cuatro capas.

---

## Por Qué Esto Importa

En aplicaciones frontend complejas, mezclar lógica de negocio, llamadas a APIs y renderizado de UI en los mismos componentes crea código que es difícil de testear, difícil de refactorizar y frágil ante cambios. Clean Architecture proporciona un modelo mental para separar estas responsabilidades.

La idea central: **la lógica de negocio debe ser agnóstica de framework** --- funciones puras y clases que puedan ser probadas independientemente y potencialmente compartidas entre plataformas.

---

## Las Tres Capas Fundamentales

| Capa | Responsabilidad | Ejemplo |
|------|-----------------|---------|
| **UI/Presentación** | Renderizado, estilos, interacción del usuario, animación | Componentes React, templates de Vue, CSS |
| **Lógica de Negocio** | Reglas de dominio, validación, computación, transformaciones | Funciones puras, modelos de dominio, esquemas de validación |
| **Datos/Infraestructura** | Llamadas a APIs, caché, persistencia, comunicación con servicios externos | Wrappers de fetch, clientes API, adaptadores de almacenamiento |

---

## Clean Architecture / Hexagonal Architecture en Frontend

- **Domain Layer:** Modelos agnósticos de framework y funciones puras de lógica de negocio.
- **Application Layer (Use Cases):** Orquesta la lógica de dominio y las llamadas a servicios.
- **Infrastructure Layer:** Clientes API, adaptadores de almacenamiento, integraciones con terceros. Cambiar un proveedor de API solo afecta esta capa.
- **Presentation Layer:** Componentes y hooks que consumen la capa de aplicación.

```
src/
  components/        # Código puramente presentacional
  hooks/             # Lógica de UI con estado
  use-cases/         # Lógica de negocio agnóstica de framework
  services/          # Clientes API, integraciones externas
  lib/               # Puntos de integración, utilidades
```

---

## Arquitectura Frontend de Cuatro Capas

Un patrón emergente que formaliza las capas:

1. **Presentation** (componentes) --- Renderiza UI, maneja interacción del usuario.
2. **Application** (hooks/composables orquestando use cases) --- Conecta la UI con la lógica de negocio.
3. **Domain** (reglas de negocio, modelos) --- Funciones puras, validación, transformaciones. Cero dependencias de framework.
4. **Infrastructure** (APIs, almacenamiento, SDKs externos) --- Todo lo que habla con el mundo exterior.

### Dependency Inversion en el Service Layer

- Los componentes dependen de hooks, los hooks dependen de abstracciones de use cases, los use cases dependen de interfaces de puertos de servicio.
- Las implementaciones concretas (adaptador de axios, adaptador de fetch) se inyectan, no se importan directamente.
- Esto facilita dramáticamente las pruebas: inyecta mocks en lugar de hacer mocking de bibliotecas HTTP globalmente.

```typescript
// domain/cart.ts — pure business logic, no framework dependency
export function calculateTotal(items: CartItem[]): number {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  return subtotal > 100 ? subtotal * 0.8 : subtotal; // 20% discount over $100
}

// use-cases/checkout.ts — orchestrates domain + services
export function createCheckoutUseCase(paymentService: PaymentPort) {
  return async (cart: CartItem[], paymentMethod: string) => {
    const total = calculateTotal(cart);
    return paymentService.charge(total, paymentMethod);
  };
}

// infrastructure/stripe-payment.ts — concrete implementation
export const stripePayment: PaymentPort = {
  async charge(amount, method) {
    return stripe.paymentIntents.create({ amount, payment_method: method });
  },
};
```

---

## Backend for Frontend (BFF)

- Una capa de servidor intermediaria que agrega llamadas a microservicios, simplificando la lógica de obtención de datos del frontend.
- Proporciona una API única adaptada a las necesidades del frontend, reduciendo la complejidad del lado del cliente.
- Solo tiene sentido cuando genuinamente necesitas agregar múltiples microservicios, manejar intercambio de tokens de autenticación, o adaptar formas de datos que el equipo de backend no puede proporcionar.

---

## Errores Comunes

- **Sobre-estratificación / astronáutica de arquitectura.** Implementar una Clean Architecture completa de cuatro capas con ports, adapters, interactors de use cases y modelos de dominio para una aplicación CRUD de cinco pantallas es pura sobrecarga. Ajusta la complejidad arquitectónica a la complejidad de la aplicación.
- **Capas de servicio que son puro paso directo.** Un `UserService` que llama a `UserRepository.getUser()` y retorna el resultado sin cambios añade un archivo y un salto de indirección mental por valor cero. Añade una capa de servicio cuando realmente orqueste, transforme o imponga reglas de negocio.
- **Hooks/composables convirtiéndose en objetos dios.** Un hook `useCheckout` de 500 líneas gestionando 15 piezas de estado y 8 efectos secundarios es un componente dios disfrazado. Descompónlo en hooks enfocados y componibles.
- **Pureza agnóstica de framework llevada demasiado lejos.** Abstraer cada API específica de React detrás de una interfaz agnóstica cuando solo apuntas a una plataforma añade complejidad sin beneficio. Escribe *lógica de negocio* agnóstica de framework; deja que el código de integración de UI use el framework de forma idiomática.
- **Patrón BFF sin justificación.** Añadir un Backend for Frontend introduce una unidad de despliegue separada, un segundo código base y latencia adicional. Solo adopta BFF cuando genuinamente lo necesites.

---

## Puntos Clave

- Separa UI, lógica de negocio e infraestructura en capas con responsabilidades claras.
- La lógica de negocio (domain layer) debe ser agnóstica de framework: funciones puras, testeables sin renderizar componentes.
- Usa Dependency Inversion para que las capas superiores dependan de abstracciones, no de implementaciones concretas.
- Ajusta la complejidad arquitectónica a la complejidad de la aplicación. No implementes cuatro capas para un CRUD simple.
- Clean Architecture rinde frutos en aplicaciones con lógica de negocio compleja, múltiples fuentes de datos o requisitos de testabilidad estrictos.
