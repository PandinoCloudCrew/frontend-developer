# Micro-frontends: Una Breve Descripción General

> Material de lectura para la Etapa 8 — Arquitectura a Escala.
> Cubre qué son los micro-frontends, cuándo tienen sentido y cuándo no.

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
