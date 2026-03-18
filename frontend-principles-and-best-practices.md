# Principios de Desarrollo de Software y Mejores Prácticas de Usabilidad para Desarrollo Frontend

> Referencia completa y agnóstica de framework que cubre SOLID, diseño de componentes, gestión de estado, usabilidad, rendimiento, seguridad, accesibilidad y más. Compilado en marzo de 2026 a partir de fuentes autorizadas y actuales.

---

## Tabla de Contenidos

1. [Principios SOLID en Frontend](#1-solid-principles-in-frontend)
   - 1.1 [Single Responsibility Principle (SRP)](#11-single-responsibility-principle-srp)
   - 1.2 [Open/Closed Principle (OCP)](#12-openclosed-principle-ocp)
   - 1.3 [Liskov Substitution Principle (LSP)](#13-liskov-substitution-principle-lsp)
   - 1.4 [Interface Segregation Principle (ISP)](#14-interface-segregation-principle-isp)
   - 1.5 [Dependency Inversion Principle (DIP)](#15-dependency-inversion-principle-dip)
   - [Errores Comunes y Anti-patterns](#common-pitfalls--anti-patterns)
2. [Principios de Diseño de Componentes](#2-component-design-principles)
   - 2.1 [Composition Over Inheritance](#21-composition-over-inheritance)
   - 2.2 [Container/Presentational Pattern](#22-containerpresentational-pattern-and-its-evolution)
   - 2.3 [Compound Components](#23-compound-components)
   - 2.4 [Render Props / Slots Pattern](#24-render-props--slots-pattern)
   - 2.5 [Higher-Order Components vs. Hooks/Composables](#25-higher-order-components-vs-hookscomposables)
   - 2.6 [Atomic Design](#26-atomic-design)
   - [Errores Comunes y Anti-patterns](#common-pitfalls--anti-patterns-1)
3. [Separación de Responsabilidades en Frontend](#3-separation-of-concerns-in-frontend)
   - 3.1 [Lógica de UI vs. Lógica de Negocio vs. Obtención de Datos](#31-ui-logic-vs-business-logic-vs-data-fetching)
   - 3.2 [Custom Hooks/Composables como la Abstracción Universal](#32-custom-hookscomposables-as-the-universal-abstraction)
   - 3.3 [Patrones de Service Layer](#33-service-layer-patterns)
   - [Errores Comunes y Anti-patterns](#common-pitfalls--anti-patterns-2)
4. [Principios de State Management](#4-state-management-principles)
   - 4.1 [Local vs. Global State](#41-local-vs-global-state)
   - 4.2 [Server State vs. Client State](#42-server-state-vs-client-state)
   - 4.3 [Derived/Computed State](#43-derivedcomputed-state)
   - 4.4 [State Machines (XState)](#44-state-machines-xstate)
   - 4.5 [Unidirectional Data Flow](#45-unidirectional-data-flow)
   - 4.6 [Immutability](#46-immutability)
   - [Errores Comunes y Anti-patterns](#common-pitfalls--anti-patterns-3)
5. [Principios de Usabilidad](#5-usability-principles)
   - 5.1 [Las 10 Heurísticas de Nielsen Aplicadas a la Web](#51-nielsens-10-heuristics-applied-to-web)
   - 5.2 [Ley de Fitts](#52-fittss-law)
   - 5.3 [Ley de Hick](#53-hicks-law)
   - 5.4 [Principios Gestalt en UI](#54-gestalt-principles-in-ui)
   - 5.5 [Progressive Disclosure](#55-progressive-disclosure)
   - 5.6 [Reducción de Carga Cognitiva](#56-cognitive-load-reduction)
   - 5.7 [Diseño Mobile-First](#57-mobile-first-design)
   - 5.8 [Principios de Diseño Responsive](#58-responsive-design-principles)
   - [Errores Comunes y Anti-patterns](#common-pitfalls--anti-patterns-4)
6. [Principios de Rendimiento](#6-performance-principles)
   - 6.1 [Modelo RAIL](#61-rail-model)
   - 6.2 [Estrategias de Lazy Loading](#62-lazy-loading-strategies)
   - 6.3 [Virtualization](#63-virtualization)
   - 6.4 [Memoization y Cuándo Usarla](#64-memoization-and-when-to-use-it)
   - 6.5 [Optimización de Bundles](#65-bundle-optimization)
   - [Errores Comunes y Anti-patterns](#common-pitfalls--anti-patterns-5)
7. [Patrones de Manejo de Errores](#7-error-handling-patterns)
   - 7.1 [Error Boundaries](#71-error-boundaries)
   - 7.2 [Graceful Degradation](#72-graceful-degradation)
   - 7.3 [Optimistic Updates](#73-optimistic-updates)
   - 7.4 [Estrategias de Reintento](#74-retry-strategies)
   - [Errores Comunes y Anti-patterns](#common-pitfalls--anti-patterns-6)
8. [Seguridad en Frontend](#8-security-in-frontend)
   - 8.1 [Prevención de XSS](#81-xss-prevention)
   - 8.2 [Protección contra CSRF](#82-csrf-protection)
   - 8.3 [Content Security Policy (CSP)](#83-content-security-policy-csp)
   - 8.4 [Sanitización de Entradas](#84-input-sanitization)
   - 8.5 [Patrones de Autenticación Segura](#85-secure-authentication-patterns)
   - [Errores Comunes y Anti-patterns](#common-pitfalls--anti-patterns-7)
9. [Código Limpio en Frontend](#9-clean-code-in-frontend)
   - 9.1 [Convenciones de Nombres](#91-naming-conventions)
   - 9.2 [Patrones de Organización de Archivos/Carpetas](#92-filefolder-organization-patterns)
   - 9.3 [Estrategias de Code Splitting](#93-code-splitting-strategies)
   - 9.4 [DRY vs. WET en Componentes](#94-dry-vs-wet-in-components)
   - [Errores Comunes y Anti-patterns](#common-pitfalls--anti-patterns-8)
10. [Accesibilidad como Principio](#10-accessibility-as-a-principle)
    - 10.1 [HTML Semántico Primero](#101-semantic-html-first)
    - 10.2 [ARIA Cuando Sea Necesario](#102-aria-when-needed)
    - 10.3 [Navegación por Teclado](#103-keyboard-navigation)
    - 10.4 [Gestión del Focus](#104-focus-management)
    - 10.5 [Consideraciones para Lectores de Pantalla](#105-screen-reader-considerations)
    - [Errores Comunes y Anti-patterns](#common-pitfalls--anti-patterns-9)
11. [Resumen de Temas Clave](#summary-of-key-themes)
12. [Fuentes](#sources)

---

## 1. Principios SOLID en Frontend

Aunque fueron formulados originalmente para la programación orientada a objetos, los principios SOLID se traducen notablemente bien a las arquitecturas frontend basadas en componentes. Aplícalos donde la complejidad justifique la estructura -- no de forma reflexiva en todas partes -- comenzando con componentes que sean complejos, frecuentemente modificados o ampliamente reutilizados.

### 1.1 Single Responsibility Principle (SRP)

**Definición:** Un componente debe tener una sola razón para cambiar -- debe hacer una cosa y hacerla bien.

**Aplicación en Frontend:**
- Cada componente maneja exactamente una responsabilidad: renderizar un formulario, mostrar una tarjeta, gestionar un modal.
- Separa el renderizado de UI de la obtención de datos y la lógica de negocio. Un componente `UserProfile` renderiza el perfil; un hook `useUserProfile` obtiene y gestiona los datos.
- Si un archivo de componente excede ~200 líneas o maneja múltiples responsabilidades no relacionadas, probablemente viola SRP.
- Se aplica igualmente a hooks/composables: `useFormValidation` debería validar formularios, no también gestionar llamadas a APIs.

**Guía Práctica:**
- Pregúntate: "¿Cuál es la única razón por la que este componente necesitaría cambiar?"
- Extrae los efectos secundarios (llamadas a APIs, suscripciones, temporizadores) en custom hooks o servicios.
- Divide los "componentes dios" en sub-componentes más pequeños y enfocados.

### 1.2 Open/Closed Principle (OCP)

**Definición:** Las entidades de software deben estar abiertas a extensión pero cerradas a modificación.

**Aplicación en Frontend:**
- Usa **composición** para extender componentes en lugar de modificar sus internos. Un componente `Card` acepta `children`, `header` y `footer` como slots/props en lugar de tener lógica condicional para cada variante de tarjeta.
- Los patrones de **render props y slots** permiten a los consumidores inyectar comportamiento de renderizado personalizado sin tocar el componente base.
- Diseña las APIs de componentes con valores predeterminados sensatos que puedan ser sobrescritos mediante props.
- Los objetos de configuración y los patrones de estrategia permiten la extensión de comportamiento sin cambios en el código fuente.

**Guía Práctica:**
- Prefiere `children` y render props sobre flags booleanos que multiplican las ramas internas.
- Usa el patrón de Compound Components (ver Sección 2) para permitir la composición de nuevos comportamientos.
- Diseña bibliotecas de componentes donde las nuevas variantes se crean componiendo primitivas existentes, no añadiendo cadenas `if/else`.

### 1.3 Liskov Substitution Principle (LSP)

**Definición:** Los tipos derivados deben ser sustituibles por sus tipos base sin alterar la corrección.

**Aplicación en Frontend:**
- Las variantes de componentes (`ArticleCard`, `FeaturedArticleCard`, `CompactArticleCard`) deben implementar todas la misma interfaz central. Cualquier lugar que acepte un `ArticleCard` debería aceptar cualquier variante sin romperse.
- LSP funciona como un **contrato** no escrito entre componentes, funciones y hooks: extender o modificar algo no debe romper el comportamiento existente.
- Los componentes derivados deben soportar los mismos props, métodos y comportamientos esperados que el componente base, mientras que potencialmente añaden funcionalidades adicionales.

**Guía Práctica:**
- Al crear versiones especializadas de un componente, asegúrate de que acepten (como mínimo) los mismos props que el base.
- TypeScript/generics ayudan a imponer esto: extiende la interfaz de props base en lugar de crear una no relacionada.
- Los componentes wrapper deben reenviar todos los props y refs relevantes al componente subyacente.
- Prueba la sustituibilidad: reemplaza un componente base con uno derivado en los sitios de uso existentes; nada debería romperse.

### 1.4 Interface Segregation Principle (ISP)

**Definición:** Los clientes no deben ser forzados a depender de interfaces que no usan.

**Aplicación en Frontend:**
- Mantén las interfaces de props mínimas y enfocadas. Un `ArticleCard` solo requiere datos del artículo y handlers opcionales -- no debería conocer filtros, paginación o estados de carga.
- Evita objetos de "mega-props" que fuerzan a los consumidores a proporcionar datos irrelevantes.
- Divide las APIs de componentes grandes en piezas más pequeñas y componibles.

**Guía Práctica:**
- Si un componente acepta más de 7-10 props, considera si está haciendo demasiado (violación de SRP) o si los props deberían agruparse en sub-interfaces lógicas.
- Usa `Pick`, `Omit` y tipos de intersección de TypeScript para crear interfaces de props enfocadas a partir de tipos base compartidos.
- Prefiere múltiples hooks pequeños sobre un único hook monolítico con muchos valores de retorno.

### 1.5 Dependency Inversion Principle (DIP)

**Definición:** Los módulos de alto nivel no deben depender de módulos de bajo nivel; ambos deben depender de abstracciones.

**Aplicación en Frontend:**
- Un componente de lista de usuarios no debería contener la lógica para obtener usuarios directamente. En su lugar, depende de un hook abstracto como `useUsers()` o recibe los usuarios mediante props/state management.
- Implementaciones específicas de framework en React, Vue y Angular:
  - **React:** Las dependencias se conectan mediante props, hooks y Context. Un componente `Login` depende de una abstracción `authService`, no de un método de API específico.
  - **Vue:** `provide()` e `inject()` pasan dependencias hacia abajo en el árbol de componentes.
  - **Angular:** Servicios `@Injectable()` con inyectores jerárquicos; el sistema de DI más maduro en frontend.
- Reemplazar una petición `axios` de bajo nivel con `fetch` o añadir una capa de caché con SWR/TanStack Query no debería requerir refactorizar el componente consumidor.

**Guía Práctica:**
- Define interfaces de servicio (interfaces de TypeScript o contratos de duck typing) de las que los componentes dependan.
- Usa React Context, provide/inject de Vue o el DI de Angular para inyectar implementaciones.
- Esto facilita dramáticamente las pruebas: inyecta mocks en lugar de hacer mocking de bibliotecas HTTP globalmente.
- Bibliotecas como `@wroud/di` (con `@wroud/di-react`) proporcionan contenedores IoC sin reflexión para JavaScript.

### Errores Comunes y Anti-patterns

- **Sobre-ingeniería de SOLID en aplicaciones simples.** Aplicar DIP con capas completas de interfaz-implementación-factory para un único endpoint de API crea indirección sin beneficio. SOLID es una herramienta para gestionar complejidad -- si la complejidad no existe, la estructura tampoco debería existir.
- **SRP llevado al extremo: nano-componentes.** Dividir un componente en `ButtonWrapper`, `ButtonLabel`, `ButtonIcon` y `ButtonClickHandler` hace que el código sea más difícil de seguir que un único componente `Button` de tamaño moderado. SRP significa una *razón para cambiar*, no una *línea de código*.
- **OCP usado para justificar generalización prematura.** Construir una arquitectura de plugins extensible para un componente de tarjeta antes de que exista una segunda variante desperdicia esfuerzo. No puedes diseñar los puntos de extensión correctos sin saber cuáles serán las extensiones reales. Espera a tener al menos dos casos de uso concretos.
- **Copiar ciegamente las capas de servicio.** Crear `IUserRepository` + `UserRepositoryImpl` + `UserRepositoryFactory` para envolver una única llamada `fetch('/api/users')` añade tres archivos de boilerplate sin ganancia en testabilidad ni flexibilidad. Abstrae cuando tengas una razón para intercambiar implementaciones, no antes.
- **Violaciones de LSP por implementación parcial de interfaces.** Una variante de componente que acepta un prop de su interfaz base pero lo ignora silenciosamente viola la sustituibilidad. Si `CompactArticleCard` acepta `onExpand` pero nunca lo llama, los consumidores son engañados y los bugs seguirán.
- **Violación de ISP mediante props de tipo "bolsa de opciones".** Pasar un único objeto `options` que agrupa responsabilidades no relacionadas (configuración de paginación, sobrescrituras de tema, hooks de analytics) fuerza a los consumidores a conocer -- y potencialmente proporcionar -- propiedades que no usan. Divide en grupos de props enfocados y componibles.

---

## 2. Principios de Diseño de Componentes

### 2.1 Composition Over Inheritance

**Principio Central:** Construye UI compleja a partir de piezas pequeñas y reutilizables compuestas juntas, en lugar de a través de jerarquías de clases.

- En frontend, la herencia de componentes lleva a jerarquías rígidas que son difíciles de refactorizar.
- La composición mediante `children`, slots, render props y hooks permite un ensamblaje flexible de UI y comportamiento.
- Todos los frameworks principales respaldan la composición: la recomendación explícita de React, los slots y la Composition API de Vue, la proyección de contenido de Angular y los slots de Svelte.

### 2.2 Container/Presentational Pattern (y su Evolución)

**Patrón Clásico:**
- **Componentes Container (Smart):** Se ocupan de *cómo funcionan las cosas*. Manejan la obtención de datos, la gestión de estado y los efectos secundarios. Proporcionan datos y callbacks a los componentes presentacionales.
- **Componentes Presentational (Dumb):** Se ocupan de *cómo se ven las cosas*. Reciben todo mediante props. Renderizan UI de forma pura. Fáciles de probar y reutilizar.

**Evolución (2025):**
- Con hooks (React) y composables (Vue 3), la frontera rígida entre componentes container y presentational se ha difuminado.
- Los custom hooks encapsulan la lógica del "container", haciendo que los componentes container separados sean a menudo innecesarios.
- **Sigue siendo valioso en aplicaciones a escala empresarial:** Mantener la lógica separada de la UI permite a los equipos intercambiar UIs sin tocar la lógica subyacente, simplifica las pruebas (los componentes presentacionales son puros) y ayuda a la reutilización.
- **Directriz:** No fuerces esta estructura en cada componente. Úsala donde la separación proporcione beneficios claros -- típicamente en funcionalidades complejas con requisitos significativos de datos/lógica.

### 2.3 Compound Components

**Patrón:** Múltiples componentes comparten estado implícito a través de context, formando una unidad cohesiva donde el padre gestiona el estado y los hijos lo consumen.

```
<Select>
  <Select.Trigger />
  <Select.Options>
    <Select.Option value="a">Option A</Select.Option>
    <Select.Option value="b">Option B</Select.Option>
  </Select.Options>
</Select>
```

- Utilizado extensamente por bibliotecas de componentes como Radix UI, Headless UI y Reach UI.
- Proporciona flexibilidad: los consumidores controlan la estructura y el renderizado mientras el compound component gestiona el comportamiento.
- Complementa Atomic Design al permitir componentes flexibles y personalizables dentro de una jerarquía estructurada.

### 2.4 Render Props / Slots Pattern

- **Render Props (React):** Un componente acepta una función como prop que retorna JSX, delegando las decisiones de renderizado al consumidor mientras gestiona el estado internamente.
- **Slots (Vue/Svelte/Web Components):** Los slots con nombre y con alcance permiten a los componentes padres inyectar contenido en áreas específicas de un componente hijo, con el hijo proporcionando datos al slot.
- Ambos patrones habilitan el Open/Closed Principle: los componentes base pueden ser extendidos sin modificación.
- **Estado moderno:** Aunque los hooks han reemplazado muchos casos de uso de render props, los render props siguen siendo útiles para componentes donde el patrón de delegación de renderizado es la preocupación principal (por ejemplo, bibliotecas headless UI, listas virtualizadas).

### 2.5 Higher-Order Components vs. Hooks/Composables

**Era de los HOC (Legacy):**
- Los HOCs envuelven componentes para inyectar props o comportamiento (por ejemplo, `withAuth`, `withTheme`).
- Problemas: wrapper hell (árboles de componentes profundamente anidados), colisión de props, depuración difícil, jerarquía de componentes oscurecida.

**Era Moderna -- Hooks y Composables:**
- **React Hooks / Vue Composables / Svelte Stores:** Encapsulan lógica con estado reutilizable sin envolver componentes.
- Los hooks se componen linealmente (sin anidamiento), son explícitos sobre sus dependencias y son más fáciles de tipar con TypeScript.
- Los custom hooks han reemplazado en gran medida a los HOCs y muchos casos de uso de render props.
- **Cuándo los HOCs aún aplican:** Responsabilidades transversales que necesitan envolver el componente en sí (por ejemplo, error boundaries, providers, wrappers de layout).

### 2.6 Atomic Design

**Los Cinco Niveles de Brad Frost:**

| Nivel | Descripción | Ejemplos |
|-------|-------------|----------|
| **Atoms** | Bloques de construcción básicos de UI | Button, Input, Icon, Label |
| **Molecules** | Grupos de atoms funcionando juntos | Barra de búsqueda (input + button), Campo de formulario (label + input + error) |
| **Organisms** | Secciones de UI complejas compuestas de molecules | Barra de navegación, Cuadrícula de tarjetas de producto, Formulario de registro |
| **Templates** | Layouts a nivel de página sin datos reales | Layout de dashboard, Layout de página de artículo |
| **Pages** | Templates poblados con contenido real | Dashboard real con datos en vivo |

**Perspectiva 2025:**
- Para **proyectos centrados en UI con poca complejidad de negocio**, Atomic Design funciona bien como metodología organizativa.
- Para **aplicaciones complejas con lógica de negocio significativa**, metodologías como **Feature-Sliced Design** o **Modular Architecture** son más adecuadas porque organizan por dominio de negocio en lugar de solo por granularidad de UI.
- Atomic Design y Compound Components son complementarios -- Atomic Design proporciona estructura y jerarquía, mientras que Compound Components mejoran la flexibilidad.
- Muchos equipos usan un enfoque híbrido: Atomic Design para el design system/biblioteca de componentes compartida, organización basada en features para el código de la aplicación.

### Errores Comunes y Anti-patterns

- **Componentes dios disfrazados de "containers".** Un componente container con 15 hooks, 40 props y 500 líneas de lógica de orquestación no es un container -- es un objeto dios. Divídelo en piezas más pequeñas y componibles, cada una gestionando una responsabilidad enfocada.
- **Uso excesivo de Compound Components.** Cuando un componente simple con 3 props (`label`, `value`, `onChange`) sería suficiente, forzar un patrón compound (`<Field><Field.Label /><Field.Input /><Field.Error /></Field>`) añade superficie de API y sobrecarga cognitiva sin ganancia en flexibilidad. Usa Compound Components cuando los consumidores genuinamente necesiten control estructural.
- **Pánico por prop drilling.** Saltar a Context o estado global en el momento en que pasas un prop a través de dos niveles es prematuro. Prueba primero la composición de componentes: pasa componentes completos como children o props para saltar las capas intermedias. Context tiene costos de re-render y oculta el flujo de datos.
- **Ambigüedad en los niveles de Atomic Design causando debates interminables.** Los equipos pierden horas debatiendo si un componente es un "molecule" u un "organism". Si la clasificación no es obvia, la distinción no está añadiendo valor. Usa Atomic Design como un modelo mental flexible, no como una taxonomía rígida.
- **Render props creando callback hell.** Funciones de render profundamente anidadas (`<Auth>{user => <Data user={user}>{data => <Theme>{theme => ...}</Theme>}</Data>}</Auth>`) son ilegibles. Si tienes más de un nivel de anidamiento de render props, refactoriza a hooks.
- **Abstracción prematura de componentes "reutilizables".** Construir un `<DataTable>` totalmente genérico y configurable antes de entender todas las variantes reales de tablas lleva a una abstracción incorrecta contra la que cada consumidor lucha. Construye primero las versiones concretas, luego extrae lo que genuinamente se comparte.

---

## 3. Separación de Responsabilidades en Frontend

### 3.1 Lógica de UI vs. Lógica de Negocio vs. Obtención de Datos

La arquitectura frontend moderna se beneficia de una estratificación clara:

| Capa | Responsabilidad | Ejemplo |
|------|-----------------|---------|
| **UI/Presentación** | Renderizado, estilos, interacción del usuario, animación | Componentes React, templates de Vue, CSS |
| **Lógica de Negocio** | Reglas de dominio, validación, computación, transformaciones | Funciones puras, modelos de dominio, esquemas de validación |
| **Datos/Infraestructura** | Llamadas a APIs, caché, persistencia, comunicación con servicios externos | Wrappers de fetch, clientes API, adaptadores de almacenamiento |

**Idea Clave:** La lógica de negocio debe ser **agnóstica de framework** -- funciones puras y clases que puedan ser probadas independientemente y potencialmente compartidas entre plataformas (web, móvil, servidor).

### 3.2 Custom Hooks/Composables como la Abstracción Universal

Los custom hooks (React), composables (Vue 3) y reactive stores (Svelte) han emergido como la abstracción dominante para separar responsabilidades:

- **Encapsulación:** Un hook `useCheckout()` contiene todo el estado, validación y orquestación de API relacionados con el checkout. El componente simplemente lo llama y renderiza.
- **Componibilidad:** Los hooks se componen con otros hooks. `useCheckout` puede usar internamente `useCart`, `usePayment` y `useShipping`.
- **Testabilidad:** Los hooks pueden ser probados de forma aislada de la UI.
- **Reutilización:** El mismo hook funciona en diferentes contextos visuales.

**Arquitectura Recomendada:**
```
src/
  components/        # Código puramente presentacional
  hooks/ (or composables/)  # Lógica de UI con estado
  use-cases/         # Lógica de negocio agnóstica de framework
  services/          # Clientes API, integraciones externas
  lib/               # Puntos de integración, utilidades
```

### 3.3 Patrones de Service Layer

**Clean Architecture / Hexagonal Architecture en Frontend:**
- **Domain Layer:** Modelos agnósticos de framework y funciones puras de lógica de negocio.
- **Application Layer (Use Cases):** Orquesta la lógica de dominio y las llamadas a servicios.
- **Infrastructure Layer:** Clientes API, adaptadores de almacenamiento, integraciones con terceros. Cambiar un proveedor de API solo afecta esta capa.
- **Presentation Layer:** Componentes y hooks que consumen la capa de aplicación.

**Dependency Inversion en el Service Layer:**
- Los componentes dependen de hooks, los hooks dependen de abstracciones de use cases, los use cases dependen de interfaces de puertos de servicio.
- Las implementaciones concretas (adaptador de axios, adaptador de fetch) se inyectan, no se importan directamente.

**Patrón Backend for Frontend (BFF):**
- Una capa de servidor intermediaria que agrega llamadas a microservicios, simplificando la lógica de obtención de datos del frontend.
- Proporciona una API única adaptada a las necesidades del frontend, reduciendo la complejidad del lado del cliente.

**Arquitectura Frontend de Cuatro Capas (patrón emergente):**
1. Presentation (componentes)
2. Application (hooks/composables orquestando use cases)
3. Domain (reglas de negocio, modelos)
4. Infrastructure (APIs, almacenamiento, SDKs externos)

### Errores Comunes y Anti-patterns

- **Sobre-estratificación / astronáutica de arquitectura.** Implementar una Clean Architecture completa de cuatro capas con ports, adapters, interactors de use cases y modelos de dominio para una aplicación CRUD de cinco pantallas es pura sobrecarga. Ajusta la complejidad arquitectónica a la complejidad de la aplicación.
- **Capas de servicio que son puro paso directo.** Un `UserService` que llama a `UserRepository.getUser()` y retorna el resultado sin cambios añade un archivo, un import y un salto de indirección mental por valor cero. Añade una capa de servicio cuando realmente orqueste, transforme o imponga reglas de negocio.
- **Hooks/composables convirtiéndose en objetos dios.** Un hook `useCheckout` de 500 líneas gestionando 15 piezas de estado, 8 efectos secundarios y 6 valores derivados es un componente dios disfrazado. Descompónlo en hooks enfocados y componibles (`useCartItems`, `useShipping`, `usePayment`).
- **Pureza agnóstica de framework llevada demasiado lejos.** Abstraer cada API específica de React detrás de una interfaz agnóstica de framework cuando solo apuntas a una plataforma (y no tienes planes de cambiar) añade complejidad sin beneficio. Escribe *lógica de negocio* agnóstica de framework; deja que el código de integración de UI use el framework de forma idiomática.
- **Patrón BFF sin justificación.** Añadir una capa Backend for Frontend introduce una unidad de despliegue separada, un segundo código base que mantener y un salto de red adicional de latencia. Solo adopta BFF cuando genuinamente necesites agregar múltiples microservicios, manejar intercambio de tokens de autenticación o adaptar formas de datos que el equipo de backend no puede proporcionar.
- **Dispersar responsabilidades colocadas entre directorios.** Colocar un componente en `components/`, su hook en `hooks/`, sus tipos en `types/` y sus tests en `__tests__/` cuando siempre cambian juntos fuerza a los desarrolladores a tocar cuatro directorios por cada modificación. Coloca juntos los archivos que cambian juntos.

---

## 4. Principios de State Management

### 4.1 Local vs. Global State

| Aspecto | Local State | Global State |
|---------|------------|--------------|
| **Alcance** | Componente individual o pequeño subárbol | Aplicación completa o área de funcionalidad grande |
| **Ejemplos** | Valores de input de formulario, estados de toggle, animaciones de UI | Usuario autenticado, tema, carrito de compras |
| **Herramientas** | `useState`, `ref()`, estado del componente | Redux, Zustand, Pinia, NgRx, Svelte stores |
| **Directriz** | Predeterminar a local; elevar solo cuando sea necesario | Usar con moderación; solo para estado genuinamente compartido |

**Principio Moderno (2026):** La mayoría del tiempo no necesitas una "biblioteca de state management" en absoluto. Los días de poner todo en Redux han terminado. Divide tu estado en diferentes responsabilidades -- esto produce mejores soluciones que cualquier biblioteca de state management "genérica".

### 4.2 Server State vs. Client State

Uno de los cambios de paradigma más grandes en los últimos años: **los datos del servidor y el estado de UI son responsabilidades fundamentalmente diferentes**.

| Aspecto | Server State | Client State |
|---------|-------------|--------------|
| **Naturaleza** | Asíncrono, compartido, potencialmente desactualizado | Síncrono, local, siempre actual |
| **Responsabilidades** | Caching, deduplicación, invalidación, reintentos, paginación, optimistic updates | Toggles de UI, estado de formulario, navegación |
| **Herramientas** | TanStack Query, SWR, RTK Query, Apollo Client | useState, Zustand, Jotai, Pinia, Signals |

**Idea Clave:** Las bibliotecas de obtención de datos como TanStack Query o SWR resuelven caching, deduplicación, invalidación, reintentos, paginación y optimistic updates de forma nativa. Tratar los datos del servidor con un gestor de estado genérico (como Redux vanilla) duplica trabajo que estas bibliotecas manejan mejor.

### 4.3 Derived/Computed State

**Principio:** Nunca almacenes estado que pueda ser computado a partir de otro estado. Derívalo.

- **React:** `useMemo` para computaciones costosas; variables simples en el render para las baratas.
- **Vue:** Las propiedades `computed()` rastrean dependencias automáticamente y cachean resultados.
- **Angular:** Computed Signals (`computed()`) derivan estado declarativamente. NgRx Signal Store combina la estructura de NgRx con el rendimiento de Signals.
- **Svelte:** Las declaraciones reactivas (`$:`) derivan estado automáticamente.
- **Bibliotecas:** Los atoms y selectors de Jotai crean estado derivado basado en grafos. Recoil fue pionero en este patrón.

**Beneficio:** Elimina bugs de sincronización de estado. Una única fuente de verdad, muchas vistas derivadas.

### 4.4 State Machines (XState)

**Principio:** Modela las transiciones de estado complejas explícitamente para evitar estados inválidos.

- Las state machines enumeran cada estado posible y las transiciones entre ellos.
- **XState** proporciona state machines y statecharts para flujos explícitos y testeables.
- Particularmente valiosas para: formularios de múltiples pasos, flujos de autenticación, interacciones de UI complejas (drag-and-drop), procesos de pago.
- Los eventos sirven como fuente de verdad; las transiciones de estado son funciones puras; los efectos secundarios se declaran, no se incrustan.

**Cuándo Usar:**
- Cuando una funcionalidad tiene más de 3-4 estados con transiciones no triviales.
- Cuando los "estados imposibles" son una fuente recurrente de bugs (por ejemplo, un formulario que está simultáneamente "enviando" y "editando").
- Cuando necesitas un diagrama visual del flujo de estado para comunicación con personas no desarrolladoras.

### 4.5 Unidirectional Data Flow

**Principio:** Los datos fluyen en una dirección: desde el estado, a través de la vista, hacia acciones que actualizan el estado.

```
State --> View --> User Action --> State Update --> State --> View ...
```

- Se impone centralizando el estado y asegurando que las actualizaciones ocurran de manera lineal y controlada.
- Central en la arquitectura Redux/Flux, el árbol de componentes de Angular y el patrón props-down/events-up de Vue.
- **Beneficios:** Comportamiento predecible, depuración más fácil (time-travel debugging), procedencia de datos clara.
- Todos los frameworks principales imponen o recomiendan fuertemente esto: el data binding unidireccional de React, las verificaciones de flujo de datos unidireccional de Angular, el patrón props-down/events-up de Vue.

### 4.6 Immutability

**Principio:** Los objetos de estado no deben ser mutados directamente. Cada cambio crea una nueva copia.

- Habilita la detección de cambios (optimización de re-render de React, verificaciones de igualdad superficial de Redux).
- Hace que los cambios de estado sean explícitos y auditables.
- Simplifica la depuración: compara los objetos de estado anterior y siguiente.
- **Herramientas:** Immer (structural sharing para actualizaciones inmutables ergonómicas), operadores nativos de spread, `Object.freeze()` para imposición en tiempo de desarrollo.
- Angular Signals y el sistema de reactividad de Vue manejan esto internamente, pero el principio sigue aplicándose a nivel arquitectónico.

### Errores Comunes y Anti-patterns

- **Cadenas de estado derivado volviéndose circulares o desactualizadas.** Cuando A deriva B, B deriva C, C deriva D, y D de alguna manera influye en A, obtienes re-renders en cascada y bugs sutiles de desactualización. Mantén los grafos de derivación acíclicos y poco profundos. Si una cadena tiene más de dos niveles, reconsidera la forma del estado.
- **`useMemo` con arrays de dependencias incorrectos.** Omitir una dependencia retorna silenciosamente valores cacheados desactualizados; incluir una referencia inestable (objeto inline, función no guardada) anula la memoization completamente. Las reglas de linting (`react-hooks/exhaustive-deps`) existen por una razón -- no las suprimas sin una justificación clara.
- **State machines en exceso.** Recurrir a XState para gestionar un toggle booleano o un flag de carga de dos estados añade una curva de aprendizaje significativa y boilerplate para algo que `useState(false)` maneja perfectamente. Las state machines justifican su peso para flujos con 4+ estados y transiciones no triviales.
- **Trampas de rendimiento de Immutability.** Hacer spread de objetos grandes en cada frame (`{...bigObject, x: newX}`) a 60fps crea presión de garbage collection. Para actualizaciones a frecuencia de animación, usa refs mutables o bibliotecas de animación dedicadas (Framer Motion, GSAP) que evitan el ciclo de render de React.
- **Estado de URL descuidado.** Los filtros, la paginación, el orden de clasificación y las pestañas activas pertenecen a la URL para que los usuarios puedan compartir, marcar como favorito y usar adelante/atrás del navegador. Almacenar estos solo en estado del componente rompe expectativas fundamentales de la web.
- **Flujo unidireccional violado por mutaciones de `useRef`.** Mutar el valor `.current` de un ref para almacenar estado que afecta el renderizado sin disparar un re-render crea estado invisible que la UI no refleja. Los refs son para valores que *no* afectan la salida; para todo lo demás, usa state.
- **Anti-pattern de "simplemente ponlo en el store".** Los valores de input de formulario, los booleanos de abrir/cerrar modales y el estado efímero de UI no pertenecen al estado global. Los stores globales deben contener datos que son genuinamente compartidos entre partes distantes de la aplicación. El estado local es el predeterminado.

---

## 5. Principios de Usabilidad

### 5.1 Las 10 Heurísticas de Nielsen Aplicadas a la Web

Las 10 heurísticas de usabilidad de Jakob Nielsen siguen siendo el marco de referencia más ampliamente citado para evaluar el diseño de interfaces:

| # | Heurística | Aplicación Web |
|---|-----------|----------------|
| 1 | **Visibilidad del Estado del Sistema** | Indicadores de carga, barras de progreso, notificaciones toast, confirmaciones de guardado |
| 2 | **Correspondencia entre el Sistema y el Mundo Real** | Usar terminología familiar, etiquetas en lenguaje natural, iconografía intuitiva |
| 3 | **Control y Libertad del Usuario** | Deshacer/rehacer, navegación "atrás" clara, modales fáciles de cerrar, botones "Cancelar" |
| 4 | **Consistencia y Estándares** | Seguir convenciones de plataforma, comportamiento consistente de componentes, navegación predecible |
| 5 | **Prevención de Errores** | Confirmaciones para acciones destructivas, restricciones de entrada, botones deshabilitados para estados inválidos |
| 6 | **Reconocimiento antes que Recuerdo** | Navegación visible, búsquedas recientes, autocompletado, ayuda contextual |
| 7 | **Flexibilidad y Eficiencia de Uso** | Atajos de teclado, dashboards personalizables, acciones rápidas para usuarios avanzados |
| 8 | **Diseño Estético y Minimalista** | Eliminar elementos innecesarios, jerarquía visual clara, contenido enfocado |
| 9 | **Ayudar a los Usuarios a Reconocer, Diagnosticar y Recuperarse de Errores** | Mensajes de error claros con pasos de remediación, validación inline, campos problemáticos resaltados |
| 10 | **Ayuda y Documentación** | Ayuda con búsqueda, tours de onboarding, tooltips contextuales |

### 5.2 Ley de Fitts

**El tiempo para alcanzar un objetivo es una función de la distancia al objetivo y su tamaño.**

- **Haz los objetivos clicables lo suficientemente grandes** -- mínimo 44x44px para targets táctiles (Apple HIG), 48x48dp (Material Design).
- **Coloca las acciones de uso frecuente al alcance fácil** -- acciones primarias en la zona del pulgar en móvil, cerca del área de foco actual en escritorio.
- **Reduce la distancia** entre acciones relacionadas (por ejemplo, un botón "Guardar" cerca del formulario que guarda).
- Especialmente crítico para el diseño móvil donde las interacciones precisas son desafiantes.
- **Ventaja de bordes y esquinas:** Los botones en los bordes o esquinas de la pantalla son efectivamente targets de profundidad infinita (el cursor se detiene en el borde), haciéndolos más rápidos de alcanzar.

### 5.3 Ley de Hick

**El tiempo para tomar una decisión aumenta con el número y la complejidad de las opciones.**

- **Reduce las opciones:** Agrupa opciones relacionadas, usa progressive disclosure, limita los elementos de navegación visibles.
- **Simplifica la navegación** categorizando y agrupando opciones.
- **Ayudas de decisión:** Recomienda valores predeterminados, resalta opciones populares, proporciona herramientas de comparación.
- **Búsqueda y filtros** como alternativas a escanear listas largas.

### 5.4 Principios Gestalt en UI

Los principios de la psicología Gestalt describen cómo los humanos perciben y agrupan naturalmente los elementos visuales:

| Principio | Aplicación en UI |
|-----------|------------------|
| **Proximidad** | Agrupa elementos relacionados cerca entre sí (etiquetas de formulario cerca de los inputs, acciones relacionadas juntas) |
| **Similitud** | Estilo consistente para elementos similares (todos los enlaces de un color, todos los botones de una forma) |
| **Cierre** | Los usuarios completan formas incompletas (indicadores de progreso, layouts de tarjetas con contenido recortado) |
| **Continuidad** | Alinea elementos para crear flujo visual (cuadrículas, líneas de tiempo, breadcrumbs) |
| **Región Común** | Usa bordes, fondos o tarjetas para agrupar contenido relacionado |
| **Figura/Fondo** | Contraste claro entre contenido principal y fondo; overlays de modales |

### 5.5 Progressive Disclosure

**Revela información y opciones solo cuando son necesarias, manteniendo las interfaces limpias y enfocadas.**

- La interfaz principal muestra acciones esenciales; el contenido secundario es accesible a través de pestañas, secciones expandibles o ventanas modales.
- **Limita los niveles de disclosure a menos de tres.** Si un diseño requiere más, reorganiza el contenido.
- Implementaciones comunes: secciones accordion, enlaces "Mostrar más", flujos wizard/paso-a-paso, menús expandibles.
- Reduce la sobrecarga cognitiva presentando solo los datos más relevantes en cada paso.
- Especialmente importante en móvil donde el espacio de pantalla es limitado.

### 5.6 Reducción de Carga Cognitiva

- **Agrupa la información:** Divide formularios largos en pasos lógicos, pagina listas largas, agrupa configuraciones relacionadas.
- **Valores predeterminados sensatos:** Pre-rellena formularios con valores predeterminados inteligentes para reducir las decisiones requeridas.
- **Jerarquía visual:** Usa tamaño, color, contraste y espaciado para guiar la atención hacia lo que más importa.
- **Patrones consistentes:** Una vez que los usuarios aprenden un patrón de interacción, reutilízalo a través de la aplicación.
- **Elimina decisiones innecesarias:** Auto-detecta cuando sea posible (zona horaria, idioma, moneda).

### 5.7 Diseño Mobile-First

**Diseña primero para la ventana gráfica más pequeña y con más restricciones, luego mejora progresivamente para pantallas más grandes.**

- Fuerza la priorización del contenido y las funcionalidades esenciales.
- CSS: escribe estilos base para móvil, luego usa media queries `min-width` para añadir complejidad para pantallas más grandes.
- Targets táctiles: mínimo 44x44px, con espaciado adecuado entre elementos interactivos.
- Navegación: menús hamburguesa para navegación secundaria, pero mantén la navegación crítica visible.
- Rendimiento: las redes móviles son más lentas; optimiza los assets y difiere la carga no esencial.

### 5.8 Principios de Diseño Responsive

- **Layouts fluidos:** Usa unidades relativas (%, vw, vh, rem, em) y CSS Grid/Flexbox en lugar de anchos fijos en píxeles.
- **Breakpoints basados en contenido, no en dispositivos.** Añade breakpoints donde el layout se rompe, no en anchos arbitrarios de dispositivos.
- **Imágenes responsive:** `srcset`, `<picture>` y CSS `object-fit` para dimensionamiento apropiado de imágenes.
- **Container queries (CSS moderno):** Estiliza componentes basándote en el tamaño de su contenedor, no de la ventana gráfica -- habilitando componentes responsive verdaderamente modulares.
- **Tipografía:** Escalas de tipo fluido usando `clamp()` para escalado suave entre ventanas gráficas.

### Errores Comunes y Anti-patterns

- **Dark patterns.** Confirm-shaming ("No gracias, no quiero ahorrar dinero"), continuidad forzada (inscripción automática en pruebas sin cancelación clara), costos ocultos revelados en el checkout y misdirection (enfatizar visualmente la opción que beneficia al negocio, no al usuario) erosionan la confianza y pueden violar regulaciones. Diseña para el beneficio del usuario, no en su contra.
- **Progressive disclosure ocultando funcionalidades críticas.** Si los usuarios no pueden encontrar una funcionalidad porque está enterrada detrás de tres niveles de disclosure, la funcionalidad efectivamente no existe. Aplica progressive disclosure a opciones *secundarias*, no a flujos de trabajo principales. La investigación de usuarios y la analítica deben validar qué pertenece a cada nivel.
- **Mobile-first que ignora escritorio.** Diseñar primero para 375px es una buena práctica, pero entregar un layout de una sola columna en un monitor de 27 pulgadas desperdicia espacio de pantalla y frustra a los usuarios de escritorio. Mobile-first significa *empezar* con móvil, luego *mejorar* para ventanas gráficas más grandes -- no detenerse en móvil.
- **Fatiga de notificaciones toast.** Mostrar un toast para cada acción menor ("Configuración guardada," "Elemento añadido," "Perfil actualizado") entrena a los usuarios a ignorar todas las notificaciones, incluidas las importantes. Reserva los toasts para resultados que son inciertos, asíncronos o requieren atención. Para resultados esperados y síncronos, una confirmación inline sutil es suficiente.
- **Malinterpretar la Ley de Fitts para justificar botones masivos en todas partes.** La Ley de Fitts describe el tiempo *relativo* de adquisición de objetivo, no es una instrucción para hacer cada elemento de tamaño excesivo. Botones enormes desplazan el contenido, rompen la jerarquía visual y no mejoran la usabilidad cuando no hay desafío de precisión.
- **Ley de Hick usada para eliminar funcionalidades en vez de organizarlas.** Reducir opciones no significa eliminar funcionalidades que los usuarios necesitan. Significa agrupar, categorizar, proporcionar valores predeterminados y usar progressive disclosure para gestionar la complejidad sin sacrificar capacidad.
- **Inconsistencia disfrazada de creatividad.** Scrollbars personalizados, controles de formulario no estándar, patrones de navegación novedosos y checkboxes reimaginados fuerzan a los usuarios a reaprender interacciones que ya conocen. Las convenciones de plataforma existen porque los usuarios ya las han aprendido. Desvíate solo cuando la ganancia de UX supere claramente el costo de aprendizaje.
- **Breakpoints responsive basados en anchos de dispositivos específicos.** Breakpoints en 375px, 768px y 1024px apuntan a los dispositivos populares de hoy pero se rompen con los de mañana. Establece breakpoints donde *tu contenido* se rompe, no donde los dispositivos actuales casualmente miden.

---

## 6. Principios de Rendimiento

### 6.1 Modelo RAIL

El modelo de rendimiento centrado en el usuario de Google. Aunque la industria ha cambiado hacia Core Web Vitals como el estándar de medición principal, RAIL sigue siendo un marco mental valioso:

| Métrica | Objetivo | Descripción |
|---------|----------|-------------|
| **Response** | < 100ms | Responder a la entrada del usuario (clics, toques, pulsaciones de tecla) dentro de 100ms |
| **Animation** | < 16ms por frame | Producir cada frame en menos de 16ms para animaciones a 60fps |
| **Idle** | < 50ms por tarea | Usar el tiempo idle para trabajo diferido; mantener las tareas individuales por debajo de 50ms para seguir siendo responsive |
| **Load** | < 1000ms | Entregar contenido interactivo dentro de 1 segundo en dispositivos móviles de gama media |

**Core Web Vitals (estándar de medición actual):**
- **LCP (Largest Contentful Paint):** < 2.5 segundos
- **INP (Interaction to Next Paint):** < 200ms
- **CLS (Cumulative Layout Shift):** < 0.1

### 6.2 Estrategias de Lazy Loading

- **Code splitting basado en rutas:** Carga el código de cada ruta/página solo cuando el usuario navega a ella. Soportado nativamente por todos los frameworks y bundlers principales.
- **Lazy loading a nivel de componente:** `React.lazy()`, `defineAsyncComponent()` de Vue, módulos lazy-loaded de Angular.
- **Lazy loading de imágenes:** Atributo nativo `loading="lazy"`, Intersection Observer para implementaciones personalizadas.
- **Contenido debajo del fold:** Difiere la carga de contenido no visible en la ventana gráfica inicial.
- **Prioriza la ruta de renderizado crítica:** Carga primero lo necesario para la vista inicial; difiere todo lo demás al tiempo idle.

### 6.3 Virtualization

**Renderiza solo los elementos visibles en la ventana gráfica** para listas y tablas grandes.

- Reduce dramáticamente los nodos del DOM (de potencialmente miles a decenas).
- Bibliotecas: `react-window`, `react-virtualized`, `@tanstack/virtual`, Vue Virtual Scroller, Angular CDK Virtual Scroll.
- **Cuándo usar:** Listas que excedan ~100 elementos, tablas de datos, feeds con scroll infinito.
- **Compromisos:** Añade complejidad, puede afectar la accesibilidad (los lectores de pantalla no pueden ver los elementos fuera de pantalla), requiere alturas de elementos fijas o estimables para el mejor rendimiento.

### 6.4 Memoization y Cuándo Usarla

**Memoization cachea el resultado de computaciones costosas o previene re-renders innecesarios.**

- **React:** `React.memo()` para memoization de componentes, `useMemo` para valores computados, `useCallback` para referencias de funciones estables.
- **Vue:** Las propiedades computed son automáticamente memoizadas. `v-memo` para memoization a nivel de template.
- **Angular:** Estrategia de change detection `OnPush`, pipes puros.

**Cuándo Usar:**
- Cálculos costosos que se re-ejecutarían en cada render.
- Componentes que reciben props complejos y renderizan subárboles grandes.
- Referencias de callback estables necesarias para la optimización de componentes hijos o dependencias de efectos.

**Cuándo NO Usar:**
- Cálculos simples (la sobrecarga de memoization excede el costo de la computación).
- Componentes que se re-renderizan infrecuentemente de todos modos.
- Optimización prematura -- primero haz profiling, luego memoiza los cuellos de botella comprobados.

### 6.5 Optimización de Bundles

- **Tree shaking:** Importa solo lo que usas. Los bundlers modernos (Vite, webpack 5, Rollup, esbuild) eliminan las exportaciones no utilizadas.
- **Code splitting:** Basado en rutas y `import()` dinámico para crear bundles iniciales más pequeños.
- **Análisis de dependencias:** Audita regularmente el tamaño del bundle con herramientas como `webpack-bundle-analyzer`, `source-map-explorer` o el análisis integrado de Vite.
- **Externalizar dependencias grandes:** Considera versiones alojadas en CDN de bibliotecas grandes y estables.
- **Targets de sintaxis moderna:** Envía ES2020+ a navegadores modernos (salida más pequeña), con bundles legacy solo para navegadores que los necesiten.
- **Compresión:** Brotli (preferido) o gzip para todos los assets basados en texto.
- El tamaño del bundle impacta directamente en First Contentful Paint (FCP) y Largest Contentful Paint (LCP).

### Errores Comunes y Anti-patterns

- **Optimización prematura.** Pasar horas optimizando una ruta de render que representa el 1% del tiempo total de renderizado mientras se ignora el 60% no optimizado es esfuerzo desperdiciado. Primero haz profiling con DevTools del navegador, React Profiler o herramientas específicas del framework. Optimiza el cuello de botella medido, no el sospechado.
- **`React.memo()` en todas partes con memoization rota.** Envolver cada componente en `React.memo()` mientras se pasan objetos inline (`style={{ color: 'red' }}`), funciones inline (`onClick={() => ...}`) o arrays nuevos como props anula silenciosamente la memoization en cada render. El componente se re-renderiza de todas formas, pero ahora con la sobrecarga añadida de una comparación superficial. Estabiliza las referencias antes de memoizar.
- **Code splitting prematuro.** Hacer lazy loading de un componente de 5KB introduce un estado de carga, un viaje de red y layout shift -- costos que exceden los bytes ahorrados. Haz code splitting en límites significativos (rutas, funcionalidades pesadas como bibliotecas de gráficos) donde el chunk sea lo suficientemente grande para justificar el compromiso.
- **`loading="lazy"` en imágenes hero/LCP.** Aplicar lazy loading a la imagen más grande en la ventana gráfica inicial *retrasa* el Largest Contentful Paint porque el navegador espera hasta que la imagen entre en la intersección de la ventana gráfica antes de obtenerla. Carga con eager las imágenes above-the-fold; aplica lazy loading solo al contenido below-the-fold.
- **Tree shaking roto por CommonJS o barrel files con efectos secundarios.** Un barrel file (`index.ts`) que re-exporta todo de un paquete fuerza al bundler a incluir el paquete completo si se usa *cualquier* exportación. CommonJS (`require`) no es analizable estáticamente y anula el tree shaking completamente. Usa ES modules y marca los paquetes como `sideEffects: false` en `package.json`.
- **Sobre-dividir bundles de vendor a CDNs.** Cargar bibliotecas desde CDNs de terceros introduce un punto único de fallo (la caída del CDN rompe tu aplicación), niega las ganancias de multiplexación de HTTP/2, y los navegadores modernos particionan cachés por origen, así que el caching entre sitios ya no funciona. Auto-aloja y empaqueta tus dependencias.
- **CLS por componentes lazy-loaded sin placeholders skeleton.** Hacer lazy loading de un componente que empuja el contenido hacia abajo cuando aparece causa Cumulative Layout Shift. Reserva el espacio con un skeleton, placeholder o dimensiones explícitas antes de que el componente cargue.

---

## 7. Patrones de Manejo de Errores

### 7.1 Error Boundaries

- **React Error Boundaries:** Componentes de clase (o bibliotecas como `react-error-boundary`) que capturan errores de JavaScript en cualquier parte de su árbol de componentes hijos, los registran y muestran una UI de respaldo en lugar de hacer crash a toda la aplicación.
- **Ubicación estratégica:** Coloca error boundaries alrededor de áreas de funcionalidad independientes para que un fallo en un área (por ejemplo, un date-picker en un flujo de reserva) no derrumbe toda la página.
- **Vue:** Hook del ciclo de vida `errorCaptured` y `onErrorCaptured` de la Composition API.
- **Angular:** Clase global `ErrorHandler` para manejo centralizado de errores.
- **Svelte:** No tiene error boundaries integrados; usa try-catch en funciones de carga y bloques `{#await}`.

### 7.2 Graceful Degradation

- Cuando una funcionalidad falla, **reduce la funcionalidad en lugar de hacer crash completamente**.
- Si una llamada a API falla, muestra datos cacheados con un indicador de datos desactualizados en lugar de una pantalla vacía.
- Si un widget de terceros no carga, muestra un respaldo u oculta el widget en lugar de romper la página.
- **Detección de funcionalidades** (no detección de navegador): verifica si una API/funcionalidad está disponible antes de usarla y proporciona alternativas cuando no lo está.
- La mejora progresiva es el enfoque complementario: comienza con una experiencia base, luego mejora para entornos capaces.

### 7.3 Optimistic Updates

- **Actualiza la UI inmediatamente** como si la operación hubiera tenido éxito, luego confirma con el servidor en segundo plano.
- Si la operación del servidor falla, **revierte automáticamente** la UI al estado anterior y notifica al usuario.
- Casos de uso comunes: dar like/favorito, añadir al carrito, cambiar configuraciones, enviar mensajes.
- **Regla crítica:** Solo usa optimistic updates para operaciones que tienen muy alta probabilidad de éxito. Para operaciones riesgosas (pagos, reservas), usa estados de carga en su lugar.
- TanStack Query, SWR y Apollo Client tienen soporte integrado para optimistic updates con rollback automático.

### 7.4 Estrategias de Reintento

- **Backoff exponencial:** Espera un tiempo exponencialmente creciente entre reintentos (por ejemplo, 1s, 2s, 4s, 8s) para evitar sobrecargar un servicio en dificultades.
- **Jitter:** Añade variación aleatoria (típicamente más o menos 20%) a los intervalos de backoff para prevenir problemas de "thundering herd" donde todos los clientes reintentan simultáneamente.
- **Limita los reintentos:** Típicamente 3-5 intentos antes de rendirse y mostrar un error.
- **La idempotencia es crítica:** Solo reintenta operaciones idempotentes (GET, operaciones de lectura). Para operaciones no idempotentes (pagos, pedidos), usa claves de idempotencia para que el backend pueda proteger contra duplicados.
- TanStack Query y SWR tienen estrategias de reintento configurables integradas.

### Errores Comunes y Anti-patterns

- **Tragarse errores silenciosamente.** Bloques `catch` vacíos (`catch (e) {}`) o catches con solo `console.log` ocultan fallos tanto de usuarios como de desarrolladores. Cada error capturado debe ser mostrado al usuario, reportado a un servicio de seguimiento de errores, o tener una razón documentada para ser intencionalmente ignorado.
- **Error boundaries ocultando bugs durante el desarrollo.** Un respaldo amigable de "Algo salió mal" en desarrollo enmascara el error real y el stack trace, ralentizando la depuración. Configura los error boundaries para mostrar detalles completos del error en desarrollo y respaldos amigables solo en producción.
- **Mensajes de error genéricos para cada fallo.** Mostrar "Algo salió mal" para un timeout de red, un fallo de validación y un 403 Forbidden no da a los usuarios ningún camino a la resolución. Mapea los tipos de error a mensajes específicos y accionables: "Conexión perdida -- verifica tu red," "No tienes permiso para ver esto," etc.
- **Reintento sin visibilidad para el usuario.** Reintentar silenciosamente una petición POST fallida puede causar efectos secundarios duplicados (dobles cobros, envíos duplicados). Haz los reintentos visibles para el usuario, o asegura que la operación sea idempotente antes de reintentar automáticamente.
- **Rollback de optimistic updates sin notificación.** La UI muestra que un "like" tuvo éxito, luego silenciosamente lo revierte segundos después cuando el servidor rechaza la petición. Los usuarios pierden confianza cuando las acciones parecen tener éxito y luego se deshacen silenciosamente. Siempre notifica a los usuarios cuando ocurre un rollback.
- **Capturar errores con la granularidad incorrecta.** Un único error boundary en la raíz de la aplicación significa que cualquier fallo en cualquier componente reemplaza toda la aplicación con un respaldo. Por el contrario, envolver cada componente pequeño es excesivo. Coloca boundaries alrededor de áreas de funcionalidad independientes para que un fallo en una sección no derrumbe secciones no relacionadas.
- **Rechazos de promesas no manejados en `useEffect`.** Las funciones async dentro de `useEffect` que carecen de manejo `.catch()` o wrappers try/catch producen rechazos de promesas no manejados. Estos son silenciosos en muchos entornos y pueden dejar la UI en un estado inconsistente. Siempre maneja la ruta de error de cada operación asíncrona.

---

## 8. Seguridad en Frontend

### 8.1 Prevención de XSS

**Cross-Site Scripting (XSS) sigue siendo una de las vulnerabilidades web más prevalentes.**

- **Auto-escaping del framework:** React, Vue, Angular y Svelte escapan automáticamente los datos renderizados en templates/JSX. Esta es tu primera línea de defensa.
- **APIs peligrosas a evitar:** `dangerouslySetInnerHTML` de React, `v-html` de Vue, `bypassSecurityTrust*` de Angular y cualquier manipulación directa de `innerHTML`. Cuando sea inevitable, sanitiza con DOMPurify.
- **Nunca confíes en la entrada del usuario:** Valida y sanitiza tanto en el cliente como en el servidor.
- **Evita `eval()`, `new Function()` y event handlers inline** construidos a partir de datos del usuario.

### 8.2 Protección contra CSRF

- **Tokens anti-CSRF:** Incluye un token único e impredecible con cada petición que cambie estado; valida en el servidor.
- **Cookies SameSite:** Establece `SameSite=Strict` o `SameSite=Lax` en las cookies de sesión para prevenir la inclusión de peticiones cross-site.
- **Valida los headers Origin y Referer** en el servidor para peticiones que cambien estado.
- **Soporte del framework:** Usa la protección CSRF integrada si está disponible (Angular la incluye por defecto con `HttpClient`).

### 8.3 Content Security Policy (CSP)

- Una CSP fuerte restringe qué scripts, estilos, imágenes y conexiones están permitidos en tu página.
- Incluso si se inyecta código malicioso, CSP puede prevenir su ejecución o la exfiltración de datos.
- **Comienza restrictivo, luego afloja según sea necesario.** Empieza con `default-src 'self'` y añade permisos específicos.
- Evita `'unsafe-inline'` y `'unsafe-eval'` donde sea posible; usa enfoques basados en nonce o hash para scripts inline cuando sea necesario.
- Los endpoints de reporte de CSP ayudan a monitorear y detectar violaciones en producción.

### 8.4 Sanitización de Entradas

- **Validación de entradas:** Asegura que los datos enviados por el usuario se ajusten a los formatos, tipos y restricciones esperados antes del procesamiento.
- **Sanitización:** Limpia o neutraliza datos, eliminando caracteres potencialmente maliciosos o fragmentos de código.
- **Defensa en profundidad:** Sanitiza en el cliente para retroalimentación inmediata, pero **siempre valida y sanitiza en el servidor** -- la validación del lado del cliente es fácilmente evitable.
- Usa bibliotecas establecidas (DOMPurify, validator.js) en lugar de regex personalizado para sanitización.

### 8.5 Patrones de Autenticación Segura

**Almacenamiento de Tokens:**
- **Nunca** almacenes JWTs o tokens sensibles en `localStorage` (vulnerable a XSS).
- **Recomendado:** Almacena refresh tokens en cookies `HttpOnly`, `Secure`, `SameSite`. Almacena access tokens solo en memoria (variables JavaScript).
- Usa access tokens de corta duración (por ejemplo, 15 minutos) con rotación de refresh tokens.

**OAuth 2.0 para SPAs:**
- Usa el **Authorization Code Grant con PKCE** (Proof Key for Code Exchange) -- el flujo actualmente recomendado para aplicaciones basadas en navegador.
- Usa el parámetro `state` para proteger contra CSRF y ataques de intercambio de authorization code.
- El **patrón Backend for Frontend (BFF)** proporciona la seguridad más fuerte: un componente del lado del servidor maneja los tokens, y la SPA usa cookies de sesión HTTP-only para comunicarse con su BFF.

**Principios Generales:**
- Implementa HTTPS en todas partes.
- Impón atributos seguros de cookies: `HttpOnly`, `Secure`, `SameSite`.
- Aplica el principio de menor privilegio a los scopes y permisos de las APIs.
- Registra eventos de autenticación para auditoría.

### Errores Comunes y Anti-patterns

- **Validación solo del lado del cliente como seguridad.** La validación de formularios en JavaScript es una conveniencia de UX, no una medida de seguridad. Cualquier validación en el navegador puede ser evitada con DevTools, curl o una petición modificada. Toda validación crítica de seguridad (autenticación, autorización, sanitización de entrada, reglas de negocio) debe ocurrir en el servidor.
- **Teatro de seguridad.** Una Content Security Policy configurada como `default-src *` no bloquea nada. HTTPS con secretos en parámetros de query registra esos secretos en el historial del navegador, logs del servidor y headers referer. Estas medidas crean una falsa sensación de seguridad sin proporcionar protección real. Audita las configuraciones de seguridad para verificar su efectividad real.
- **Exponer API keys y secretos en bundles de frontend.** Cualquier valor embebido en JavaScript enviado al navegador es visible para cada usuario mediante DevTools o source maps. Las API keys, endpoints internos y secretos deben vivir en el servidor. Usa proxies del lado del servidor específicos del entorno para integraciones sensibles.
- **Mala configuración de CORS.** Establecer `Access-Control-Allow-Origin: *` en endpoints de API autenticados permite que cualquier sitio web haga peticiones con credenciales a tu API. Haz una lista blanca de orígenes específicos y confiables. Para endpoints autenticados, `*` nunca es apropiado.
- **Datos sensibles en el estado del lado del cliente.** Registros completos de usuarios, detalles de pago o IDs internos almacenados en Redux/Zustand/Pinia son visibles a través de DevTools del navegador. Minimiza los datos sensibles en el estado del cliente; obténlos bajo demanda y no los persistas más tiempo del necesario.
- **Scripts de terceros con acceso completo al DOM y cookies.** Los scripts de analytics, widgets de chat y scripts de publicidad cargados mediante etiquetas `<script>` tienen los mismos privilegios que tu propio código -- pueden leer el DOM, acceder a cookies y exfiltrar datos. Audita los scripts de terceros, usa CSP para restringirlos, cárgalos con `async`/`defer` y considera sandboxing con iframes donde sea posible.
- **Clickjacking sin X-Frame-Options o CSP frame-ancestors.** Sin `X-Frame-Options: DENY` (o `Content-Security-Policy: frame-ancestors 'none'`), tu aplicación puede ser embebida en un iframe malicioso y los usuarios pueden ser engañados para hacer clic en elementos ocultos. Establece headers de restricción de frames en todas las páginas autenticadas.
- **Vulnerabilidades de open redirect por parámetros de URL no validados.** Redirigir usuarios a una URL tomada de un parámetro de query (`?redirect=https://evil.com`) sin validación habilita ataques de phishing. Valida las URLs de redirección contra una lista blanca de dominios confiables o restringe a rutas relativas.

---

## 9. Código Limpio en Frontend

### 9.1 Convenciones de Nombres

| Entidad | Convención | Ejemplos |
|---------|-----------|----------|
| **Componentes** | PascalCase | `UserProfile`, `NavigationBar`, `ProductCard` |
| **Archivos (componente)** | Coincide con el nombre del componente | `UserProfile.tsx`, `NavigationBar.vue` |
| **Hooks/Composables** | camelCase con prefijo `use` | `useAuth`, `useFormValidation`, `useDebounce` |
| **Variables/funciones** | camelCase | `userName`, `totalAmount`, `handleClick` |
| **Constantes** | UPPER_SNAKE_CASE | `MAX_RETRIES`, `API_BASE_URL` |
| **Clases CSS** | kebab-case o BEM | `nav-bar`, `card__title--active` |
| **Interfaces/tipos TypeScript** | PascalCase (sin prefijo `I` en TS moderno) | `UserProfile`, `CartItem`, `ApiResponse` |
| **Props/variables booleanos** | Prefijo `is`, `has`, `should`, `can` | `isLoading`, `hasError`, `canSubmit` |
| **Event handlers** | Prefijo `handle` o `on` | `handleClick`, `onSubmit`, `handleChange` |

**Reglas Clave:**
- Evita nombres genéricos como `index.ts`, `styles.css`, `utils.ts` incluso si es el único archivo en un directorio.
- Los nombres deben revelar intención: `getUserById` no `getData`, `isAuthenticated` no `flag`.
- Sé consistente dentro de un proyecto -- la consistencia importa más que cualquier convención específica.

### 9.2 Patrones de Organización de Archivos/Carpetas

**Basado en Features (Recomendado para Aplicaciones):**
```
src/
  features/
    auth/
      components/
      hooks/
      services/
      types/
      auth.routes.ts
    checkout/
      components/
      hooks/
      services/
      types/
      checkout.routes.ts
  shared/
    components/
    hooks/
    utils/
    types/
```

**Feature-Sliced Design (FSD):**
```
src/
  app/        # Configuración a nivel de app, providers, routing
  pages/      # Componentes a nivel de página (componen features)
  widgets/    # Bloques de UI compuestos grandes
  features/   # Interacciones del usuario (add-to-cart, login)
  entities/   # Entidades de negocio (user, product, order)
  shared/     # Utilidades reutilizables, UI kit, clientes API
```

**Basado en Dominio:**
```
src/
  domains/
    user/
    product/
    order/
  infrastructure/
    api/
    storage/
  presentation/
    components/
    layouts/
```

**Guías Prácticas:**
- Limita el anidamiento de directorios a 3-4 niveles máximo.
- Coloca archivos relacionados (componente + estilos + tests + tipos) en el mismo directorio.
- Archivos index para API pública: cada feature exporta solo lo que otras features necesitan consumir.
- Un archivo debería poder encontrarse solo por su nombre.

### 9.3 Estrategias de Code Splitting

- **Splitting basado en rutas:** El enfoque de mayor impacto y menor esfuerzo. Cada página/ruta es un bundle separado.
- **Splitting basado en features:** Funcionalidades grandes (por ejemplo, dashboard de administración, analytics) cargadas solo cuando se acceden.
- **Splitting a nivel de componente:** Componentes pesados (gráficos, editores de texto enriquecido, mapas) cargados bajo demanda.
- **Splitting de bibliotecas:** Bibliotecas de vendor en chunks separados para mejor caching (cambian con menos frecuencia que el código de la aplicación).
- **Prefetching:** Carga especulativamente bundles para los probables próximos destinos de navegación (por ejemplo, precarga el bundle de la página de detalle de producto al hacer hover sobre un enlace de producto).

### 9.4 DRY vs. WET en Componentes

**DRY (Don't Repeat Yourself):**
- Cada pieza de conocimiento debe tener una representación única, inequívoca y autoritativa.
- Reduce la superficie para bugs cuando la lógica necesita cambiar.

**WET (Write Everything Twice) / AHA (Avoid Hasty Abstractions):**
- Desafía el DRY excesivo al abrazar la duplicación consciente para evitar abstracciones prematuras y frágiles.
- **La Regla de Tres:** Abstrae código cuando veas el mismo patrón tres veces, no antes. Dos instancias de código similar es una coincidencia; tres es un patrón.

**Guía Específica para Frontend:**
- **La abstracción prematura es peor que la duplicación.** Una abstracción incorrecta fuerza a todos los consumidores a trabajar en torno a ella, mientras que el código duplicado puede evolucionar independientemente.
- Extrae componentes compartidos solo cuando el patrón sea estable y bien comprendido.
- Es aceptable tener dos componentes de apariencia similar que sirven a diferentes dominios de negocio, porque es probable que diverjan con el tiempo.
- Las utilidades y hooks compartidos (validación, formateo, llamadas a APIs) generalmente son seguros para aplicar DRY tempranamente.
- Los componentes de UI que se ven similares pero pertenecen a diferentes features deben permanecer separados hasta que se demuestre que son verdaderamente idénticos.

### Errores Comunes y Anti-patterns

- **Exceso de DRY entre límites de features.** Extraer un componente compartido `<Card>` usado tanto por "Productos" como por "Perfiles de Usuario" acopla dos features no relacionadas. Cuando Productos necesita un cambio de layout, Perfiles de Usuario se rompe. La duplicación entre features es a menudo más saludable que las abstracciones compartidas prematuras. Aplica DRY dentro de una feature; tolera WET entre features hasta que el patrón sea comprobadamente estable.
- **Proliferación de barrel files anulando tree shaking y ralentizando las herramientas.** Un `index.ts` que re-exporta todo de un directorio fuerza a los bundlers a parsear cada módulo en el directorio incluso si solo se usa una exportación. También ralentiza el auto-import del IDE, la compilación de TypeScript y los test runners. Usa barrel files con moderación y solo para APIs públicas verdaderas.
- **Estructura de carpetas como burocracia.** Crear directorios `components/`, `hooks/`, `services/`, `types/`, `utils/` y `__tests__/` para una feature con un componente, un hook y un test produce 6 archivos en 4+ directorios. Coloca features pequeñas en un solo directorio; añade estructura cuando la feature crezca para justificarlo.
- **Convenciones de nombres sin cumplimiento automatizado.** Acordar `camelCase` para variables y `PascalCase` para componentes en una reunión no tiene sentido si ninguna regla de linter lo impone. En semanas, la deriva se instala. Usa reglas de ESLint (`naming-convention` en `@typescript-eslint`), Prettier para formateo, y commit hooks para imponer convenciones automáticamente.
- **Code splitting sin estados de carga.** Un usuario hace clic en un enlace, el chunk lazy carga, y nada pasa visualmente durante 1-3 segundos. Siempre acompaña los puntos de code splitting con un indicador de carga (spinner, skeleton o barra de progreso) para que los usuarios sepan que la aplicación está respondiendo.
- **Violaciones de YAGNI: construir para requisitos hipotéticos.** Implementar un sistema de plugins, soporte multi-tenant o infraestructura de internacionalización para un MVP de un solo tenant y solo en inglés desperdicia tiempo de desarrollo y añade complejidad. Construye lo que se necesita ahora; refactoriza cuando -- y solo cuando -- el requisito se materialice.
- **30 archivos llamados `index.ts`.** Cuando cada directorio exporta a través de `index.ts`, git blame muestra un muro de archivos con nombres idénticos, los stack traces son ilegibles ("Error in index.ts at line 42" -- ¿cuál de ellos?), y las pestañas del editor son indistinguibles. Nombra los archivos por lo que contienen: `UserProfile.tsx`, `useAuth.ts`, `cartService.ts`.

---

## 10. Accesibilidad como Principio

### 10.1 HTML Semántico Primero

**Lo más impactante que puedes hacer por la accesibilidad es usar los elementos HTML correctos.**

- Los elementos semánticos llevan significado implícito, comportamiento de teclado y anuncios para lectores de pantalla:
  - `<button>` es enfocable, se activa con Enter/Space, se anuncia como "button".
  - `<nav>` crea un landmark de navegación.
  - `<main>`, `<header>`, `<footer>`, `<aside>` crean landmarks de documento.
  - `<h1>`-`<h6>` crean una estructura de encabezados navegable.
  - `<table>`, `<th>`, `<td>` crean tablas de datos accesibles.
- **Los elementos nativos proporcionan comportamiento gratis.** Un `<div>` con un handler `onClick` no es un botón -- carece de soporte de teclado, gestión de foco y semántica para lectores de pantalla.
- **Regla:** Agota las opciones nativas de HTML antes de recurrir a ARIA o soluciones basadas en JavaScript.

### 10.2 ARIA Cuando Sea Necesario

**La Primera Regla de ARIA:** "Si puedes usar un elemento HTML nativo con la semántica y el comportamiento que necesitas ya incorporados, en lugar de reutilizar un elemento y añadir ARIA, hazlo."

- El estudio de un millón de páginas de WebAim encontró que **las páginas con ARIA presente tenían en promedio un 41% más de errores detectados** que las que no tenían ARIA. Más ARIA no significa más accesible -- el ARIA mal utilizado daña activamente la accesibilidad.
- **Cuándo ARIA es apropiado:**
  - Widgets personalizados sin equivalente nativo en HTML (paneles de pestañas, vistas de árbol, comboboxes).
  - Regiones en vivo (`aria-live`) para anunciar cambios de contenido dinámico.
  - Relaciones de etiquetado (`aria-labelledby`, `aria-describedby`) cuando las etiquetas visibles son insuficientes.
  - Comunicación de estado (`aria-expanded`, `aria-selected`, `aria-disabled`) para elementos interactivos personalizados.

### 10.3 Navegación por Teclado

**Cada elemento interactivo debe ser operable solo con un teclado** -- esto es un requisito obligatorio para WCAG Nivel A.

- **Orden de tabulación:** Sigue el orden del DOM por defecto. Usa un orden de fuente lógico en lugar de reordenamiento visual basado en CSS.
- **Elementos interactivos:** Todos deben ser alcanzables mediante Tab y operables con Enter, Space, Escape y teclas de flecha según corresponda.
- **Evita `tabindex` positivo:** Solo usa `tabindex="0"` (añadir al orden de tabulación) y `tabindex="-1"` (enfocable programáticamente pero no en el orden de tabulación). Nunca uses `tabindex="1"` o superior.
- **Skip links:** Proporciona un enlace "Saltar al contenido principal" como el primer elemento enfocable.
- **Widgets personalizados:** Sigue las WAI-ARIA Authoring Practices para patrones de interacción por teclado (por ejemplo, teclas de flecha dentro de paneles de pestañas, Escape para cerrar modales).

### 10.4 Gestión del Focus

- **Diálogos modales:** Al abrirse, mueve el foco dentro del modal. Atrapa el foco dentro del modal mientras está abierto. Al cerrarse, devuelve el foco al elemento que lo activó.
- **Cambios de ruta (SPAs):** Gestiona el foco en la navegación. Mueve el foco al encabezado principal o la región de contenido principal de la nueva página.
- **Contenido dinámico:** Cuando se añade o elimina contenido, asegura que el foco no se pierda. Si un elemento enfocado se elimina, mueve el foco a un sucesor lógico.
- **Indicadores de foco:** Nunca elimines los contornos de foco (`outline: none`) sin proporcionar una alternativa igualmente visible. Usa `:focus-visible` para estilos de foco solo por teclado.

### 10.5 Consideraciones para Lectores de Pantalla

- **Texto alternativo para imágenes:** Descriptivo para imágenes informativas, `alt=""` vacío para imágenes decorativas.
- **Etiquetas de formulario:** Cada input debe tener un `<label>` asociado (usando `for`/`id` o envolviendo).
- **Anuncios de errores:** Usa `aria-live="assertive"` o `role="alert"` para mensajes de error para que sean anunciados inmediatamente.
- **Estructura de encabezados:** Mantén una jerarquía lógica de encabezados (no saltes niveles). Los usuarios de lectores de pantalla navegan por encabezados más que por cualquier otro método.
- **Texto de enlaces:** Evita "haz clic aquí" y "leer más". Los enlaces deben tener sentido fuera de contexto.
- **Pruebas:** Prueba con lectores de pantalla reales (VoiceOver en macOS, NVDA en Windows, TalkBack en Android). Las herramientas automatizadas capturan solo ~30% de los problemas de accesibilidad.

**Primeros Pasos para Pruebas:**
1. Desconecta tu ratón e intenta usar toda la aplicación solo con el teclado.
2. Si no puedes completar cada tarea con Tab, Enter, Space, Escape y teclas de flecha, tienes un problema.
3. Ejecuta herramientas automatizadas (axe, Lighthouse) para ganancias rápidas, luego prueba manualmente con un lector de pantalla.

### Errores Comunes y Anti-patterns

- **Overlays de accesibilidad como solución.** Productos como AccessiBe, UserWay y widgets overlay similares no arreglan los problemas subyacentes de accesibilidad. A menudo interfieren con la tecnología asistiva real, crean falsa confianza legal y han sido ampliamente criticados por la comunidad de personas con discapacidad. Arregla el código fuente; no añadas un widget encima.
- **ARIA redundante en elementos nativos.** Añadir `role="button"` a un `<button>`, `role="link"` a un `<a href>`, o `role="navigation"` a un `<nav>` es ruido innecesario. Los elementos HTML nativos ya llevan esta semántica. El ARIA redundante añade carga de mantenimiento y riesgo de crear información conflictiva si el role diverge del comportamiento real del elemento.
- **Nombres accesibles sin significado.** `aria-label="button"`, `aria-label="icon"` o `aria-label="link"` no dice nada útil a un usuario de lector de pantalla. Los nombres accesibles deben describir *qué hace el elemento*: `aria-label="Close dialog"`, `aria-label="Search products"`, `aria-label="Remove item from cart"`.
- **Color como único indicador de estado.** Usar rojo vs. verde para indicar errores vs. éxito falla para aproximadamente el 8% de los hombres (y 0.5% de las mujeres) que tienen deficiencia en la visión del color. WCAG 1.4.1 requiere que el color no sea el único medio visual de transmitir información. Complementa con íconos, etiquetas de texto, patrones u otros indicadores no basados en color.
- **Pruebas automatizadas tratadas como suficientes.** Un puntaje de Lighthouse de 100 o cero violaciones de axe no significa que tu aplicación sea accesible. Las herramientas automatizadas capturan solo alrededor del 30% de los problemas de WCAG. No pueden detectar problemas de orden lógico de encabezados, mala gestión de foco, texto alt engañoso o interacciones de teclado inutilizables. Las verificaciones automatizadas son el punto de partida, no la meta.
- **Texto oculto visualmente en exceso saturando la experiencia del lector de pantalla.** Añadir bloques largos de texto solo para lectores de pantalla para "explicar" la interfaz crea una experiencia verbosa y frustrante para los usuarios de lectores de pantalla. Usa etiquetado conciso y dirigido. Si la UI necesita una explicación extensa para tecnología asistiva, es probable que el diseño de la UI en sí necesite mejoras.
- **Animaciones que provocan trastornos vestibulares.** El parallax scrolling, las animaciones que se reproducen automáticamente, las transiciones de zoom y el movimiento continuo pueden causar náuseas, mareos y desorientación en personas con trastornos vestibulares. Respeta la media query `prefers-reduced-motion`: reduce o elimina el movimiento cuando el usuario lo ha solicitado. Este es un criterio WCAG 2.1 Nivel AAA (2.3.3) pero ampliamente recomendado en todos los niveles.
- **Botones deshabilitados sin explicación.** Un botón de enviar gris sin indicación de *por qué* está deshabilitado deja a todos los usuarios adivinando y a los usuarios de lectores de pantalla completamente bloqueados. Proporciona una pista visible (tooltip, texto inline) explicando qué debe completarse antes de que la acción esté disponible, o mantén el botón habilitado y muestra errores de validación al activarlo.

---

## Resumen de Temas Clave

1. **La separación es la base:** Separa la UI de la lógica, el client state del server state, las reglas de negocio de la infraestructura. Este principio aparece a través de SOLID, diseño de componentes, state management y arquitectura.

2. **Composición sobre configuración:** Prefiere componer piezas pequeñas y enfocadas sobre configurar piezas grandes y monolíticas. Esto aplica a componentes, hooks, state management e incluso CSS.

3. **Las abstracciones deben ganarse, no imponerse:** Aplica la Regla de Tres antes de abstraer. La abstracción prematura (exceso de DRY) es peor que la duplicación.

4. **El diseño centrado en el usuario no es negociable:** Las heurísticas de usabilidad, la accesibilidad, el rendimiento y el manejo de errores no son pulido opcional -- son atributos de calidad fundamentales que deben diseñarse desde el inicio.

5. **La seguridad es una defensa por capas:** Ninguna medida única es suficiente. Combina auto-escaping del framework, CSP, gestión segura de tokens, validación de entradas y HTTPS.

6. **Pensar de forma agnóstica al framework da dividendos:** La lógica de negocio, las reglas de validación y los modelos de dominio deben ser funciones puras que funcionen independientemente de React, Vue, Angular o Svelte. Solo las capas de presentación e integración deben ser específicas del framework.

---

## Fuentes

### Principios SOLID en Frontend
- [SOLID Principle for Front End - Medium](https://medium.com/@syazantri/solid-principle-for-front-end-85e2a2d2be40)
- [Things About SOLID & KISS Principles No One Tells You - JavaScript in Plain English](https://javascript.plainenglish.io/things-about-solid-kiss-principles-no-one-tells-you-and-why-they-matter-in-frontend-fb300a3f1f72)
- [Understanding SOLID Principles in Frontend Development - DEV Community](https://dev.to/debugdiariesbyswethap/understanding-solid-principles-in-frontend-development-with-react-examples-7ao)
- [Frontend Masters: SOLID Principles in React / React Native - Java Code Geeks](https://www.javacodegeeks.com/2026/01/frontend-masters-solid-principles-in-react-react-native.html)
- [When S.O.L.I.D Met Frontend Components - Medium](https://medium.com/@shirihaim/when-s-o-l-i-d-met-frontend-components-9f897a2e07b4)
- [Liskov Substitution Principle in React - CreoWis](https://www.creowis.com/blog/liskov-substitution-principle-in-react)
- [Dependency Inversion or Dependency Injection in React - Delivery Hero](https://deliveryhero.jobs/blog/dependency-inversion-or-dependency-injection-in-react-that-is-the-question/)
- [Dependency Inversion Principle (DIP) in React - CreoWis](https://www.creowis.com/blog/dependency-inversion-principle-dip-in-react)
- [Dependency Injection in React - LogRocket](https://blog.logrocket.com/dependency-injection-react/)

### Principios de Diseño de Componentes
- [Atomic Design and Its Relevance in Frontend in 2025 - DEV Community](https://dev.to/m_midas/atomic-design-and-its-relevance-in-frontend-in-2025-32e9)
- [Atomic Design Methodology - Brad Frost](https://atomicdesign.bradfrost.com/chapter-2/)
- [Building a Component Library: Integrating Atomic Design and Compound Components - Medium](https://iamrajatsingh.medium.com/building-a-component-library-integrating-atomic-design-and-the-compound-component-pattern-5ee9b1a1a8df)
- [Scalable React Component Patterns: From Atomic Design to Compound Components - DEV Community](https://dev.to/vishw-patel/scalable-react-component-patterns-from-atomic-design-to-compound-components-13l7)
- [Component Architecture That Scales: Atomic Design in 2025 - Medium](https://robertcelt95.medium.com/component-architecture-that-scales-atomic-design-in-2025-f0a91ca91abb)
- [Container/Presentational Pattern - patterns.dev](https://www.patterns.dev/react/presentational-container-pattern/)
- [The Evolution of React Design Patterns: From HOCs to Hooks - DEV Community](https://dev.to/samabaasi/the-evolution-of-react-design-patterns-from-hocs-to-hooks-and-custom-hooks-44a)
- [Container Vs Presentational Components: Still Relevant In 2025?](https://allinsightlab.com/container-vs-presentational-components-still-relevant-in-2025/)

### Separación de Responsabilidades
- [Separation of Concerns with React Hooks - Felix Gerschau](https://felixgerschau.com/react-hooks-separation-of-concerns/)
- [7 Frontend Design Patterns - Feature-Sliced Design](https://feature-sliced.design/blog/frontend-design-patterns)
- [React Architecture: Business Logic Separation - Profy.dev](https://profy.dev/article/react-architecture-business-logic-and-dependency-injection)
- [Decoupling Business Logic from UI with Custom React Hooks - eMoosavi](https://www.emoosavi.com/blog/decoupling-business-logic-from-ui-with-custom-react-hooks)
- [Modularizing React Applications - Martin Fowler](https://martinfowler.com/articles/modularizing-react-apps.html)
- [Clean Architecture in Front-End Development - DEV Community](https://dev.to/miasalazar/clean-architecture-in-front-end-development-523n)
- [Exploring 4-Layer Frontend Architecture - DEV Community](https://dev.to/ahr_dev/exploring-4-layer-frontend-architecture-a-practical-guide-362b)

### State Management
- [State Management in 2026: Modern Frontend Guide](https://www.elearningsolutions.co.in/state-management-in-2026-2/)
- [React State Management in 2025: What You Actually Need - developerway.com](https://www.developerway.com/posts/react-state-management-2025)
- [State Management Trends in React 2025 - Makers' Den](https://makersden.io/blog/react-state-management-in-2025)
- [State Management 2025: React, Server State, URL State - Medium](https://medium.com/@QuarkAndCode/state-management-2025-react-server-state-url-state-dapr-agent-sync-d8a1f6c59288)
- [MVVM with Unidirectional Data Flow - Medium](https://medium.com/@b9915034/mvvm-with-unidirectional-data-flow-improving-state-management-651ae73b1fd1)
- [Frontend Architectures 2025: Modularity, Performance, and Scalability](https://blog.madrigan.com/en/blog/202512041139/)

### Principios de Usabilidad
- [The 21 Laws of UX: A Comprehensive Guide - Looppanel](https://www.looppanel.com/blog/laws-of-ux)
- [31 Laws of UX and Design Principles (2025) - UXness](https://www.uxness.in/2024/03/12-laws-of-ux-designing-with-principles.html)
- [Nielsen's Heuristics - The Decision Lab](https://thedecisionlab.com/reference-guide/design/nielsens-heuristics)
- [What is Fitts's Law? Complete 2025 Guide - CareerFoundry](https://careerfoundry.com/en/blog/ui-design/what-is-fittss-law/)
- [What is Progressive Disclosure? - IxDF (2026)](https://ixdf.org/literature/topics/progressive-disclosure)
- [Progressive Disclosure in UX Design - LogRocket](https://blog.logrocket.com/ux-design/progressive-disclosure-ux-types-use-cases/)
- [Mobile-First Responsive Design Best Practices 2025 - Groto](https://www.letsgroto.com/blog/mobile-first-responsive-design-best-practices)

### Rendimiento
- [RAIL Performance Model - web.dev](https://web.dev/rail/)
- [RAIL Performance Model - KeyCDN](https://www.keycdn.com/blog/rail-performance-model)
- [React Performance Optimization: 15 Best Practices for 2025 - DEV Community](https://dev.to/alex_bobes/react-performance-optimization-15-best-practices-for-2025-17l9)
- [Optimizing React Performance: Virtualization, Lazy Loading, and Memoization - Medium](https://medium.com/@bilalazam751/optimizing-react-performance-virtualization-lazy-loading-and-memoization-9a402006c5e8)

### Manejo de Errores
- [Designing a Resilient UI: Handling Failures Gracefully - DEV Community](https://dev.to/istealersn_dev/designing-a-resilient-ui-handling-failures-gracefully-in-frontend-applications-1p9l)
- [Designing Resilient Frontend Systems - Medium](https://beyondthecode.medium.com/designing-resilient-frontend-systems-handling-failures-gracefully-10c3c3a2d1b4)
- [Graceful Degradation - Mailchimp](https://mailchimp.com/resources/graceful-degradation/)

### Seguridad
- [Front-End Security Best Practices - SecureFlag](https://blog.secureflag.com/2025/11/17/front-end-security-best-practices/)
- [Modern Frontend Security: Beyond XSS and CSRF in 2025 - Capture The Bug](https://capturethebug.xyz/Blogs/Modern-Frontend-Security-Protecting-Your-Application-Beyond-XSS-and-CSRF-in-2025)
- [CSRF Prevention - OWASP Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
- [OAuth for Single Page Applications - Curity](https://curity.io/resources/learn/spa-best-practices/)
- [Securing SPAs: Authentication & Authorization Best Practices - SecureCodeCards](https://securecodecards.com/articles/securing-single-page-applications-authentication-authorization-best-practices)
- [Security Threats in SPAs - WorkOS](https://workos.com/blog/security-threats-in-spas-and-how-to-defend-against-them)

### Código Limpio
- [Frontend Coding Conventions - PostHog Handbook](https://posthog.com/handbook/engineering/conventions/frontend-coding)
- [Naming Conventions: The Foundation of Clean Code - DEV Community](https://dev.to/sathishskdev/part-1-naming-conventions-the-foundation-of-clean-code-51ng)
- [Writing Clean Code in Front-end: KISS, DRY, YAGNI, and Beyond - DEV Community](https://dev.to/miasalazar/writing-clean-code-in-front-end-kiss-dry-yaign-and-beyond-54ok)
- [Principles of Clean Frontend Code: DRY, KISS, and SOLID - Code With Seb](https://www.codewithseb.com/blog/principles-of-clean-frontend-code-dry-kiss-solid)
- [Stop Trying to Be So DRY, Write Everything Twice - DEV Community](https://dev.to/wuz/stop-trying-to-be-so-dry-instead-write-everything-twice-wet-5g33)

### Accesibilidad
- [Web Accessibility: ARIA and Semantic HTML - Grizzly Peak Software](https://www.grizzlypeaksoftware.com/library/web-accessibility-aria-and-semantic-html-qaad5qe6)
- [ARIA - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
- [ARIA Accessibility: Best Practices - Accessibility Checker](https://www.accessibilitychecker.org/blog/aria-accessibility/)
- [WAI-ARIA Overview - W3C](https://www.w3.org/WAI/standards-guidelines/aria/)
- [ARIA Labels for Web Accessibility: 2025 Implementation Guide - AllAccessible](https://www.allaccessible.org/blog/implementing-aria-labels-for-web-accessibility)
- [ARIA and HTML - web.dev](https://web.dev/learn/accessibility/aria-html)
