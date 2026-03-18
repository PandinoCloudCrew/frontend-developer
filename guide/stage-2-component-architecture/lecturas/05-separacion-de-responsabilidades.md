# Separacion de Responsabilidades en Frontend

La arquitectura frontend moderna se beneficia de una estratificacion clara entre la UI, la lógica de negocio y la capa de datos. Separar estas responsabilidades hace que el código sea mas testeable, reutilizable y fácil de mantener.

---

## Lógica de UI vs. Lógica de Negocio vs. Obtencion de Datos

| Capa | Responsabilidad | Ejemplo |
|------|-----------------|---------|
| **UI/Presentacion** | Renderizado, estilos, interacción del usuario, animación | Componentes React, templates de Vue, CSS |
| **Lógica de Negocio** | Reglas de dominio, validación, computacion, transformaciones | Funciones puras, modelos de dominio, esquemas de validación |
| **Datos/Infraestructura** | Llamadas a APIs, cache, persistencia, comunicacion con servicios externos | Wrappers de fetch, clientes API, adaptadores de almacenamiento |

**Idea Clave:** La lógica de negocio debe ser **agnostica de framework** — funciones puras y clases que puedan ser probadas independientemente y potencialmente compartidas entre plataformas (web, móvil, servidor).

## Custom Hooks/Composables como la Abstraccion Universal

Los custom hooks (React), composables (Vue 3) y reactive stores (Svelte) han emergido como la abstraccion dominante para separar responsabilidades:

- **Encapsulacion:** Un hook `useCheckout()` contiene todo el estado, validación y orquestacion de API relacionados con el checkout. El componente simplemente lo llama y renderiza.
- **Componibilidad:** Los hooks se componen con otros hooks. `useCheckout` puede usar internamente `useCart`, `usePayment` y `useShipping`.
- **Testabilidad:** Los hooks pueden ser probados de forma aislada de la UI.
- **Reutilizacion:** El mismo hook funciona en diferentes contextos visuales.

**Arquitectura Recomendada:**
```
src/
  components/        # Codigo puramente presentacional
  hooks/ (or composables/)  # Logica de UI con estado
  use-cases/         # Logica de negocio agnostica de framework
  services/          # Clientes API, integraciones externas
  lib/               # Puntos de integracion, utilidades
```

## Patrones de Service Layer

**Clean Architecture / Hexagonal Architecture en Frontend:**
- **Domain Layer:** Modelos agnosticos de framework y funciones puras de lógica de negocio.
- **Application Layer (Use Cases):** Orquesta la lógica de dominio y las llamadas a servicios.
- **Infrastructure Layer:** Clientes API, adaptadores de almacenamiento, integraciones con terceros. Cambiar un proveedor de API solo afecta esta capa.
- **Presentation Layer:** Componentes y hooks que consumen la capa de aplicación.

**Dependency Inversion en el Service Layer:**
- Los componentes dependen de hooks, los hooks dependen de abstracciones de use cases, los use cases dependen de interfaces de puertos de servicio.
- Las implementaciones concretas (adaptador de axios, adaptador de fetch) se inyectan, no se importan directamente.

**Patrón Backend for Frontend (BFF):**
- Una capa de servidor intermediaria que agrega llamadas a microservicios, simplificando la lógica de obtencion de datos del frontend.
- Proporciona una API única adaptada a las necesidades del frontend, reduciendo la complejidad del lado del cliente.

**Arquitectura Frontend de Cuatro Capas (patrón emergente):**
1. Presentation (componentes)
2. Application (hooks/composables orquestando use cases)
3. Domain (reglas de negocio, modelos)
4. Infrastructure (APIs, almacenamiento, SDKs externos)

## Errores Comunes y Anti-patterns

- **Sobre-estratificacion / astronautica de arquitectura.** Implementar una Clean Architecture completa de cuatro capas con ports, adapters, interactors de use cases y modelos de dominio para una aplicación CRUD de cinco pantallas es pura sobrecarga. Ajusta la complejidad arquitectonica a la complejidad de la aplicación.
- **Capas de servicio que son puro paso directo.** Un `UserService` que llama a `UserRepository.getUser()` y retorna el resultado sin cambios anade un archivo, un import y un salto de indireccion mental por valor cero. Anade una capa de servicio cuando realmente orqueste, transforme o imponga reglas de negocio.
- **Hooks/composables convirtiendose en objetos dios.** Un hook `useCheckout` de 500 lineas gestionando 15 piezas de estado, 8 efectos secundarios y 6 valores derivados es un componente dios disfrazado. Descomponlo en hooks enfocados y componibles (`useCartItems`, `useShipping`, `usePayment`).
- **Pureza agnostica de framework llevada demasiado lejos.** Abstraer cada API específica de React detras de una interfaz agnostica de framework cuando solo apuntas a una plataforma (y no tienes planes de cambiar) anade complejidad sin beneficio. Escribe *lógica de negocio* agnostica de framework; deja que el código de integracion de UI use el framework de forma idiomatica.
- **Patrón BFF sin justificacion.** Anadir una capa Backend for Frontend introduce una unidad de despliegue separada, un segundo código base que mantener y un salto de red adicional de latencia. Solo adopta BFF cuando genuinamente necesites agregar multiples microservicios, manejar intercambio de tokens de autenticación o adaptar formas de datos que el equipo de backend no puede proporcionar.
- **Dispersar responsabilidades colocadas entre directorios.** Colocar un componente en `components/`, su hook en `hooks/`, sus tipos en `types/` y sus tests en `__tests__/` cuando siempre cambian juntos fuerza a los desarrolladores a tocar cuatro directorios por cada modificacion. Coloca juntos los archivos que cambian juntos.

## Puntos Clave

- Separa la UI, la lógica de negocio y la capa de datos. La lógica de negocio debe ser agnostica de framework.
- Los custom hooks/composables son la abstraccion universal para separar responsabilidades en el frontend moderno.
- Ajusta la complejidad arquitectonica a la complejidad de la aplicación. No sobre-estratifiques aplicaciones simples.
- Coloca juntos los archivos que cambian juntos. La co-locacion supera a la organizacion por tipo de archivo.
- El service layer tiene valor cuando orquesta, transforma o impone reglas — no cuando es puro paso directo.
