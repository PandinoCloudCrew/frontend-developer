# Principios SOLID en Componentes Frontend

Los principios SOLID fueron formulados originalmente para la programacion orientada a objetos, pero se traducen notablemente bien a las arquitecturas frontend basadas en componentes. Aplicalos donde la complejidad justifique la estructura — no de forma reflexiva en todas partes.

---

## 1. Single Responsibility Principle (SRP)

**Definicion:** Un componente debe tener una sola razon para cambiar — debe hacer una cosa y hacerla bien.

**Aplicacion en Frontend:**
- Cada componente maneja exactamente una responsabilidad: renderizar un formulario, mostrar una tarjeta, gestionar un modal.
- Separa el renderizado de UI de la obtencion de datos y la logica de negocio. Un componente `UserProfile` renderiza el perfil; un hook `useUserProfile` obtiene y gestiona los datos.
- Si un archivo de componente excede ~200 lineas o maneja multiples responsabilidades no relacionadas, probablemente viola SRP.
- Se aplica igualmente a hooks/composables: `useFormValidation` deberia validar formularios, no tambien gestionar llamadas a APIs.

**Guia Practica:**
- Preguntate: "Cual es la unica razon por la que este componente necesitaria cambiar?"
- Extrae los efectos secundarios (llamadas a APIs, suscripciones, temporizadores) en custom hooks o servicios.
- Divide los "componentes dios" en sub-componentes mas pequenos y enfocados.

## 2. Open/Closed Principle (OCP)

**Definicion:** Las entidades de software deben estar abiertas a extension pero cerradas a modificacion.

**Aplicacion en Frontend:**
- Usa **composicion** para extender componentes en lugar de modificar sus internos. Un componente `Card` acepta `children`, `header` y `footer` como slots/props en lugar de tener logica condicional para cada variante de tarjeta.
- Los patrones de **render props y slots** permiten a los consumidores inyectar comportamiento de renderizado personalizado sin tocar el componente base.
- Disena las APIs de componentes con valores predeterminados sensatos que puedan ser sobrescritos mediante props.
- Los objetos de configuracion y los patrones de estrategia permiten la extension de comportamiento sin cambios en el codigo fuente.

**Guia Practica:**
- Prefiere `children` y render props sobre flags booleanos que multiplican las ramas internas.
- Usa el patron de Compound Components para permitir la composicion de nuevos comportamientos.
- Disena bibliotecas de componentes donde las nuevas variantes se crean componiendo primitivas existentes, no anadiendo cadenas `if/else`.

## 3. Liskov Substitution Principle (LSP)

**Definicion:** Los tipos derivados deben ser sustituibles por sus tipos base sin alterar la correccion.

**Aplicacion en Frontend:**
- Las variantes de componentes (`ArticleCard`, `FeaturedArticleCard`, `CompactArticleCard`) deben implementar todas la misma interfaz central. Cualquier lugar que acepte un `ArticleCard` deberia aceptar cualquier variante sin romperse.
- LSP funciona como un **contrato** no escrito entre componentes, funciones y hooks: extender o modificar algo no debe romper el comportamiento existente.
- Los componentes derivados deben soportar los mismos props, metodos y comportamientos esperados que el componente base, mientras que potencialmente anaden funcionalidades adicionales.

**Guia Practica:**
- Al crear versiones especializadas de un componente, asegurate de que acepten (como minimo) los mismos props que el base.
- TypeScript/generics ayudan a imponer esto: extiende la interfaz de props base en lugar de crear una no relacionada.
- Los componentes wrapper deben reenviar todos los props y refs relevantes al componente subyacente.
- Prueba la sustituibilidad: reemplaza un componente base con uno derivado en los sitios de uso existentes; nada deberia romperse.

## 4. Interface Segregation Principle (ISP)

**Definicion:** Los clientes no deben ser forzados a depender de interfaces que no usan.

**Aplicacion en Frontend:**
- Manten las interfaces de props minimas y enfocadas. Un `ArticleCard` solo requiere datos del articulo y handlers opcionales — no deberia conocer filtros, paginacion o estados de carga.
- Evita objetos de "mega-props" que fuerzan a los consumidores a proporcionar datos irrelevantes.
- Divide las APIs de componentes grandes en piezas mas pequenas y componibles.

**Guia Practica:**
- Si un componente acepta mas de 7-10 props, considera si esta haciendo demasiado (violacion de SRP) o si los props deberian agruparse en sub-interfaces logicas.
- Usa `Pick`, `Omit` y tipos de interseccion de TypeScript para crear interfaces de props enfocadas a partir de tipos base compartidos.
- Prefiere multiples hooks pequenos sobre un unico hook monolitico con muchos valores de retorno.

## 5. Dependency Inversion Principle (DIP)

**Definicion:** Los modulos de alto nivel no deben depender de modulos de bajo nivel; ambos deben depender de abstracciones.

**Aplicacion en Frontend:**
- Un componente de lista de usuarios no deberia contener la logica para obtener usuarios directamente. En su lugar, depende de un hook abstracto como `useUsers()` o recibe los usuarios mediante props/state management.
- Implementaciones especificas de framework:
  - **React:** Las dependencias se conectan mediante props, hooks y Context. Un componente `Login` depende de una abstraccion `authService`, no de un metodo de API especifico.
  - **Vue:** `provide()` e `inject()` pasan dependencias hacia abajo en el arbol de componentes.
  - **Angular:** Servicios `@Injectable()` con inyectores jerarquicos; el sistema de DI mas maduro en frontend.
- Reemplazar una peticion `axios` de bajo nivel con `fetch` o anadir una capa de cache con SWR/TanStack Query no deberia requerir refactorizar el componente consumidor.

**Guia Practica:**
- Define interfaces de servicio (interfaces de TypeScript o contratos de duck typing) de las que los componentes dependan.
- Usa React Context, provide/inject de Vue o el DI de Angular para inyectar implementaciones.
- Esto facilita dramaticamente las pruebas: inyecta mocks en lugar de hacer mocking de bibliotecas HTTP globalmente.
- Bibliotecas como `@wroud/di` (con `@wroud/di-react`) proporcionan contenedores IoC sin reflexion para JavaScript.

## Errores Comunes y Anti-patterns

- **Sobre-ingenieria de SOLID en aplicaciones simples.** Aplicar DIP con capas completas de interfaz-implementacion-factory para un unico endpoint de API crea indireccion sin beneficio. SOLID es una herramienta para gestionar complejidad — si la complejidad no existe, la estructura tampoco deberia existir.
- **SRP llevado al extremo: nano-componentes.** Dividir un componente en `ButtonWrapper`, `ButtonLabel`, `ButtonIcon` y `ButtonClickHandler` hace que el codigo sea mas dificil de seguir que un unico componente `Button` de tamano moderado. SRP significa una *razon para cambiar*, no una *linea de codigo*.
- **OCP usado para justificar generalizacion prematura.** Construir una arquitectura de plugins extensible para un componente de tarjeta antes de que exista una segunda variante desperdicia esfuerzo. No puedes disenar los puntos de extension correctos sin saber cuales seran las extensiones reales. Espera a tener al menos dos casos de uso concretos.
- **Copiar ciegamente las capas de servicio.** Crear `IUserRepository` + `UserRepositoryImpl` + `UserRepositoryFactory` para envolver una unica llamada `fetch('/api/users')` anade tres archivos de boilerplate sin ganancia en testabilidad ni flexibilidad. Abstrae cuando tengas una razon para intercambiar implementaciones, no antes.
- **Violaciones de LSP por implementacion parcial de interfaces.** Una variante de componente que acepta un prop de su interfaz base pero lo ignora silenciosamente viola la sustituibilidad. Si `CompactArticleCard` acepta `onExpand` pero nunca lo llama, los consumidores son enganados y los bugs seguiran.
- **Violacion de ISP mediante props de tipo "bolsa de opciones".** Pasar un unico objeto `options` que agrupa responsabilidades no relacionadas (configuracion de paginacion, sobrescrituras de tema, hooks de analytics) fuerza a los consumidores a conocer — y potencialmente proporcionar — propiedades que no usan. Divide en grupos de props enfocados y componibles.

## Puntos Clave

- SRP: un componente, una razon para cambiar. Si no puedes describirlo en una oracion, es demasiado grande.
- OCP: extiende mediante composicion (children, slots, render props), no modificando el codigo fuente del componente.
- LSP: las variantes de un componente deben ser intercambiables sin romper nada.
- ISP: interfaces de props minimas y enfocadas. Si tienes mas de 7-10 props, reconsidera.
- DIP: depende de abstracciones (hooks, interfaces), no de implementaciones concretas (axios, fetch).
- Aplica SOLID donde la complejidad lo justifique. No sobre-ingenierices aplicaciones simples.
