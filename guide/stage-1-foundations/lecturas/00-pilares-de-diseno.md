# Pilares de Diseño para Aplicaciones Frontend

[← Volver a Etapa 1](../README.md)

Antes de escribir una sola línea de código, necesitas entender **qué hace que una aplicación sea buena**. No hablamos de si se ve bonita — hablamos de si funciona cuando la red falla, si protege los datos del usuario, si un lector de pantalla puede navegar por ella, si puedes encontrar un bug en producción.

Los frameworks de arquitectura como el **Well-Architected Framework** de AWS, el **Cloud Adoption Framework** de Azure, y el **Architecture Framework** de Google Cloud definen pilares de calidad para sistemas en la nube. Estos mismos principios aplican a frontend — adaptados a las decisiones que tomas al construir interfaces.

Esta guía está organizada alrededor de **7 pilares**. Cada etapa profundiza en uno o más, pero todos están presentes desde el principio.

---

## Contenido

- [Los 7 pilares](#los-7-pilares)
- [1. Usabilidad](#1-usabilidad)
- [2. Resiliencia](#2-resiliencia)
- [3. Rendimiento](#3-rendimiento)
- [4. Seguridad](#4-seguridad)
- [5. Accesibilidad](#5-accesibilidad)
- [6. Mantenibilidad](#6-mantenibilidad)
- [7. Observabilidad](#7-observabilidad)
- [Cómo usar los pilares](#cómo-usar-los-pilares)
- [Anti-patterns](#anti-patterns)
- [Puntos clave](#puntos-clave)

---

## Los 7 pilares

| Pilar | Pregunta clave | Dónde se profundiza |
|-------|---------------|---------------------|
| **Usabilidad** | ¿El usuario puede completar su tarea sin frustrarse? | Etapa 4 |
| **Resiliencia** | ¿Qué pasa cuando algo falla? | Etapa 6 |
| **Rendimiento** | ¿La aplicación responde en menos de 200ms? | Etapa 5 |
| **Seguridad** | ¿Los datos del usuario están protegidos? | Etapa 6 |
| **Accesibilidad** | ¿Todas las personas pueden usar la aplicación? | Etapas 1, 4 |
| **Mantenibilidad** | ¿Puedo cambiar este código dentro de 6 meses sin romper todo? | Etapas 2, 7, 8 |
| **Observabilidad** | ¿Puedo saber qué está pasando cuando algo sale mal en producción? | Etapas 6, 7 |

---

## 1. Usabilidad

> ¿El usuario puede completar su tarea sin frustrarse?

La aplicación existe para servir al usuario, no para demostrar las habilidades del developer. Cada decisión de UI debe facilitar lo que el usuario quiere hacer.

**Principios:**
- El sistema siempre comunica su estado (loading, error, éxito, vacío)
- Las acciones frecuentes son las más accesibles (pocos clicks, visibles)
- El usuario puede deshacer errores (undo, cancelar, volver atrás)
- La interfaz es consistente — patrones similares para problemas similares
- La complejidad se revela gradualmente (progressive disclosure), no de golpe

**Preguntas que debes hacerte:**
- ¿Qué ve el usuario mientras los datos cargan? ¿Pantalla en blanco?
- ¿Cuántos clicks necesita para completar la acción más común?
- ¿Puede el usuario recuperarse de un error sin empezar de cero?

---

## 2. Resiliencia

> ¿Qué pasa cuando algo falla?

Todo falla eventualmente. La red se cae, el servidor devuelve un 500, el usuario hace algo que no esperabas. Una aplicación resiliente **no previene los fallos** — los anticipa y los maneja con elegancia.

**Principios:**
- Toda operación asíncrona tiene un estado de error visible con acción clara (reintentar, contactar soporte)
- Los fallos parciales no destruyen la experiencia completa — un widget roto no tumba la página entera (error boundaries)
- Las operaciones fallidas se reintentan con backoff exponencial (1s, 2s, 4s), no inmediatamente
- Los optimistic updates revierten visiblemente cuando fallan, con notificación al usuario
- Los datos cacheados se muestran con indicador de "datos posiblemente desactualizados" cuando la red falla

**Preguntas que debes hacerte:**
- Si el API devuelve un 500 justo ahora, ¿qué ve el usuario?
- Si la red se cae a mitad de un envío de formulario, ¿se pierden los datos?
- Si un componente crashea, ¿se cae toda la aplicación?

---

## 3. Rendimiento

> ¿La aplicación responde en menos de 200ms?

Los usuarios no esperan. El 53% de los usuarios móviles abandonan una página que tarda más de 3 segundos en cargar. El rendimiento no es una optimización que haces después — es un requisito que diseñas desde el inicio.

**Principios:**
- El contenido visible primero (above-the-fold) carga antes que el resto
- Solo se envía el código JavaScript necesario para la vista actual (code splitting)
- Las imágenes se cargan bajo demanda excepto la imagen principal (LCP)
- Las listas largas (>100 items) se virtualizan — solo se renderizan los elementos visibles
- Se mide con herramientas reales (Lighthouse, Core Web Vitals), no con "se siente rápido"

**Preguntas que debes hacerte:**
- ¿Cuánto JavaScript se envía al usuario en la carga inicial?
- ¿Cuál es mi LCP (Largest Contentful Paint) en conexión lenta?
- ¿Estoy cargando imágenes que el usuario todavía no ve?

---

## 4. Seguridad

> ¿Los datos del usuario están protegidos?

Una sola vulnerabilidad XSS puede exponer los datos de todos tus usuarios. La seguridad no es un checkbox que marcas al final — es un hábito en cada línea de código que toca datos del usuario.

**Principios:**
- Nunca confíes en la entrada del usuario — valida en el cliente para UX, en el servidor para seguridad
- Los tokens de autenticación nunca van en `localStorage` (visible para cualquier script)
- Nunca insertes HTML del usuario sin sanitizar (`dangerouslySetInnerHTML`, `v-html`)
- Los secretos (API keys, tokens) nunca van en el código frontend — son visibles para cualquiera
- Usa HTTPS siempre. Configura CSP para restringir qué scripts se ejecutan

**Preguntas que debes hacerte:**
- Si alguien pone `<script>alert(1)</script>` en un input, ¿qué pasa?
- ¿Dónde están almacenados los tokens de sesión? ¿Puede un script de terceros leerlos?
- ¿Hay API keys o secretos en el bundle que se envía al navegador?

---

## 5. Accesibilidad

> ¿Todas las personas pueden usar la aplicación?

El 15% de la población mundial tiene alguna discapacidad. Si tu aplicación no se puede navegar con teclado o un lector de pantalla, estás excluyendo a millones de personas. Además, es un requisito legal en la UE desde junio 2025.

**Principios:**
- Usa elementos HTML semánticos primero (`<button>`, `<nav>`, `<main>`) — dan accesibilidad gratis
- Todo elemento interactivo debe ser operable con teclado (Tab, Enter, Space, Escape)
- El color nunca es el único indicador de estado (rojo para error necesita también un icono o texto)
- Las animaciones respetan `prefers-reduced-motion`
- Cada imagen tiene `alt` text descriptivo o `alt=""` si es decorativa

**Preguntas que debes hacerte:**
- ¿Puedo completar todas las tareas sin tocar el ratón?
- ¿Un lector de pantalla puede entender el contenido y navegar por él?
- ¿Los estados de error, éxito y loading son distinguibles sin colores?

---

## 6. Mantenibilidad

> ¿Puedo cambiar este código dentro de 6 meses sin romper todo?

El código se escribe una vez y se lee cien veces. La mantenibilidad no es "código bonito" — es la capacidad de entender, modificar y extender el código con confianza.

**Principios:**
- Cada componente tiene una sola responsabilidad (SRP) — una razón para cambiar
- El código está tipado con TypeScript en modo `strict` — el compilador atrapa errores antes de ejecutar
- Los tests verifican comportamiento, no implementación — puedes refactorizar sin romper tests
- Los archivos que cambian juntos viven juntos (colocation), no en directorios separados por tipo
- Las abstracciones se crean después de ver el patrón 3 veces, no antes (Rule of Three)

**Preguntas que debes hacerte:**
- Si un nuevo developer abre este archivo, ¿entiende qué hace en 30 segundos?
- Si cambio una función, ¿sé qué tests debo ejecutar?
- Si agrego una feature nueva, ¿necesito tocar más de 3 archivos?

---

## 7. Observabilidad

> ¿Puedo saber qué está pasando cuando algo sale mal en producción?

Tu aplicación va a fallar en producción de formas que nunca previste. Sin observabilidad, el reporte de bug será "no funciona" y tu respuesta será "en mi máquina sí funciona". La observabilidad te da los datos para diagnosticar problemas sin acceso a la máquina del usuario.

**Principios:**
- Los errores de JavaScript se capturan y reportan automáticamente a un servicio (Sentry, LogRocket, etc.)
- Las acciones críticas del usuario se registran (login, compra, cambio de configuración) — no todo click
- Los errores de red (API calls fallidas) se registran con contexto (URL, status code, timestamp)
- Las métricas de rendimiento (Core Web Vitals) se miden en usuarios reales, no solo en Lighthouse
- Los logs estructurados incluyen: qué pasó, cuándo, quién (ID de usuario si aplica), y qué estaba haciendo

**Preguntas que debes hacerte:**
- Si un usuario reporta "la app se rompió", ¿puedo encontrar el error en menos de 5 minutos?
- ¿Sé cuántos usuarios están experimentando errores en este momento?
- ¿Puedo distinguir entre "la app tiene un bug" y "el servidor de la API está caído"?

---

## Cómo usar los pilares

Estos pilares no son una checklist que aplicas al final. Son un **lente** que usas mientras diseñas y construyes:

**Antes de empezar una feature**, pregúntate:
- ¿Qué pasa cuando falla? (Resiliencia)
- ¿Quién no puede usarla? (Accesibilidad)
- ¿Cómo sabré si tiene problemas? (Observabilidad)

**Mientras escribes código**, pregúntate:
- ¿Estoy confiando en input del usuario? (Seguridad)
- ¿Otro developer entenderá esto? (Mantenibilidad)
- ¿Cuánto JavaScript estoy agregando? (Rendimiento)

**Antes de entregar**, pregúntate:
- ¿Probé sin red? ¿Sin ratón? ¿En móvil? (Resiliencia, Accesibilidad, Rendimiento)
- ¿Tiene tests? (Mantenibilidad)
- ¿Puedo diagnosticar problemas en producción? (Observabilidad)

---

## Anti-patterns

- **"Lo haré bonito después"** — La usabilidad no es decoración. Es la razón por la que el usuario puede o no completar su tarea. Diseñarla "después" significa rediseñar todo.
- **"Funciona en mi máquina"** — Sin observabilidad, no puedes diagnosticar problemas en producción. Y sin resiliencia, cada problema es una pantalla en blanco para el usuario.
- **"La accesibilidad la agregamos al final"** — Retro-adaptar accesibilidad a una app existente cuesta 10x más que diseñarla desde el inicio. Es como construir un edificio y después intentar agregar un ascensor.
- **"Optimizamos cuando sea necesario"** — Si esperas a que los usuarios se quejen de la velocidad, ya los perdiste. Los problemas de rendimiento se previenen con decisiones de arquitectura (code splitting, lazy loading), no con parches posteriores.
- **"El backend se encarga de la seguridad"** — El frontend es la primera línea de defensa. Un XSS ataca en el navegador, no en el servidor. La validación del cliente previene llamadas innecesarias al servidor, pero la del servidor previene ataques reales. Ambas son necesarias.
- **"Nadie va a leer este código"** — Tú dentro de 6 meses eres "nadie". Y el developer que te reemplaza cuando cambias de trabajo también. Escribe código para la persona que lo va a mantener.

---

## Puntos clave

- Hay 7 pilares de calidad: Usabilidad, Resiliencia, Rendimiento, Seguridad, Accesibilidad, Mantenibilidad, Observabilidad.
- No son una checklist final — son un lente que usas desde el primer commit hasta producción.
- Cada etapa de esta guía profundiza en pilares específicos, pero todos están presentes desde el inicio.
- Las preguntas son más importantes que las respuestas: "¿Qué pasa cuando falla?" te lleva a mejores decisiones que cualquier regla.
- Una aplicación que solo "funciona" no es suficiente. Debe funcionar cuando falla la red, cuando el usuario tiene una discapacidad, cuando alguien intenta atacarla, y cuando tú ya no estás para mantenerla.

---

[← Volver a Etapa 1](../README.md)
