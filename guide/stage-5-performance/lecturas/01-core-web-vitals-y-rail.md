# Core Web Vitals y el Modelo RAIL

El rendimiento web se mide con dos marcos complementarios: el modelo RAIL proporciona el modelo mental para pensar sobre rendimiento centrado en el usuario, y Core Web Vitals proporciona las metricas estandar que Google usa para evaluar la experiencia real de los usuarios. Entender ambos es esencial para tomar decisiones de optimizacion informadas.

---

## El Modelo RAIL

RAIL es el modelo de rendimiento centrado en el usuario de Google. Aunque la industria ha cambiado hacia Core Web Vitals como el estandar de medicion principal, RAIL sigue siendo un marco mental valioso para razonar sobre donde invertir esfuerzo de optimizacion.

| Metrica | Objetivo | Descripcion |
|---------|----------|-------------|
| **Response** | < 100ms | Responder a la entrada del usuario (clics, toques, pulsaciones de tecla) dentro de 100ms |
| **Animation** | < 16ms por frame | Producir cada frame en menos de 16ms para animaciones a 60fps |
| **Idle** | < 50ms por tarea | Usar el tiempo idle para trabajo diferido; mantener las tareas individuales por debajo de 50ms para seguir siendo responsive |
| **Load** | < 1000ms | Entregar contenido interactivo dentro de 1 segundo en dispositivos moviles de gama media |

**Response (< 100ms):** Cuando un usuario hace clic, toca o escribe, la interfaz debe reaccionar visualmente en menos de 100ms. Cualquier respuesta por encima de 100ms se percibe como un retraso. Para operaciones que toman mas de 100ms, muestra un indicador de carga inmediato.

**Animation (< 16ms):** Para mantener 60fps, cada frame tiene un presupuesto de ~16ms (1000ms / 60 frames). Dentro de ese presupuesto, el trabajo del navegador (layout, paint, composite) consume parte del tiempo, dejando aproximadamente 10ms para tu codigo JavaScript. Las animaciones costosas deben usar `transform` y `opacity` (que se ejecutan en el compositor) en lugar de propiedades que disparan layout.

**Idle (< 50ms):** El tiempo idle del navegador es valioso. Usa `requestIdleCallback` o divide el trabajo pesado en tareas de menos de 50ms para que el main thread permanezca disponible para responder a input del usuario. Si una tarea idle excede 50ms, bloquea la capacidad de respuesta.

**Load (< 1000ms):** El contenido principal debe ser interactivo en menos de 1 segundo en redes y dispositivos tipicos. Esto incluye el parsing de HTML, la descarga de CSS/JS critico y el renderizado del contenido above-the-fold.

---

## Core Web Vitals (2026)

Core Web Vitals son las metricas que Google usa para evaluar la experiencia del usuario y que impactan en el ranking de busqueda. A partir de 2026, las tres metricas son:

| Metrica | Que Mide | Umbral Bueno |
|--------|-----------------|----------------|
| **LCP** (Largest Contentful Paint) | Velocidad de carga | < 2.5s |
| **INP** (Interaction to Next Paint) | Capacidad de respuesta | < 200ms |
| **CLS** (Cumulative Layout Shift) | Estabilidad visual | < 0.1 |

### LCP (Largest Contentful Paint)

Mide cuanto tiempo tarda el elemento de contenido mas grande (imagen hero, heading principal, bloque de texto grande) en hacerse visible. Un LCP bueno es menor a 2.5 segundos.

**Factores que afectan LCP:**
- Tiempo de respuesta del servidor (TTFB)
- CSS y JavaScript que bloquean el renderizado
- Tiempo de carga de recursos (imagenes, fuentes)
- Renderizado del lado del cliente

**Estrategias de optimizacion:**
- SSR/SSG reduce el LCP drasticamente (de ~4s a ~1.5s en migraciones del mundo real).
- Streaming SSR sirve el contenido above-the-fold inmediatamente mientras el resto carga.
- Partial Pre-rendering (Next.js) combina un shell estatico con huecos de contenido dinamico.
- `fetchpriority="high"` en imagenes hero above-the-fold.
- Preconnect a origenes criticos: `<link rel="preconnect" href="https://cdn.example.com">`.

### INP (Interaction to Next Paint)

**INP ha reemplazado completamente a FID** como Core Web Vital, midiendo la capacidad de respuesta durante toda la visita a la pagina en lugar de solo la primera interaccion. INP mide el tiempo desde que el usuario interactua (clic, toque, tecla) hasta que el siguiente frame se pinta en la pantalla.

**Estrategias de optimizacion:**
- Evita tareas largas en el main thread (>50ms). Dividelas con `scheduler.yield()` o `setTimeout`.
- Minimiza el trabajo de JavaScript durante las interacciones.
- Usa `content-visibility: auto` para reducir el trabajo de renderizado fuera del viewport.

### CLS (Cumulative Layout Shift)

Mide los desplazamientos inesperados del layout durante la vida de la pagina. Un CLS bueno es menor a 0.1.

**Causas comunes de layout shift:**
- Imagenes sin dimensiones (`width`/`height` o `aspect-ratio`).
- Contenido inyectado dinamicamente (anuncios, banners, embeds).
- Fuentes web que causan cambio de tamano al cargar.
- Componentes lazy-loaded sin placeholders skeleton.

**Estrategias de prevencion:**
- Siempre establece `width` y `height` (o `aspect-ratio` CSS) en imagenes y videos.
- Reserva espacio para anuncios y embeds con contenedores explicitos.
- Usa `font-display: swap` con `size-adjust` o `font-display: optional` para prevenir layout shifts por fuentes web.

---

## Estrategias Clave de Optimizacion

### Renderizado

- **SSR/SSG** para contenido que necesita ser visible rapidamente.
- **Streaming SSR** sirve contenido above-the-fold inmediatamente.
- **Partial Pre-rendering** combina shell estatico con contenido dinamico.

### Imagenes

- Formatos modernos: AVIF y WebP2 entregan archivos 40-60% mas pequenos que JPEG/PNG.
- `loading="lazy"` para imagenes below-the-fold (soporte nativo del navegador).
- `fetchpriority="high"` para imagenes hero above-the-fold.
- Imagenes responsive con atributos `srcset` y `sizes`.

### JavaScript

- Envia menos JavaScript. Astro no envia nada por defecto. Qwik usa resumability.
- Tree-shaking mediante bundlers modernos elimina codigo muerto.
- React Compiler reduce los re-renders automaticamente.

---

## Metricas de Laboratorio vs Metricas de Campo

**Metricas de laboratorio** (Lighthouse, DevTools) miden el rendimiento en tu maquina de desarrollo con condiciones controladas. Son utiles para detectar regresiones pero no reflejan la experiencia real de los usuarios.

**Metricas de campo** (CrUX, biblioteca web-vitals, RUM) miden el rendimiento en dispositivos reales de usuarios reales en redes reales. Son la referencia para optimizacion.

**Regla practica:** Una puntuacion de Lighthouse de 100 en tu maquina de desarrollo no dice nada sobre usuarios reales en telefonos lentos y redes congestionadas. Optimiza para el P75 de usuarios reales, no para puntuaciones sinteticas de laboratorio.

---

## Puntos Clave

- RAIL proporciona el modelo mental: Response < 100ms, Animation < 16ms, Idle < 50ms, Load < 1000ms.
- Core Web Vitals son las metricas de medicion: LCP < 2.5s, INP < 200ms, CLS < 0.1.
- INP reemplazo a FID -- mide la capacidad de respuesta durante toda la visita, no solo la primera interaccion.
- SSR/SSG es la estrategia mas impactante para mejorar LCP.
- Las metricas de campo (usuarios reales) son mas importantes que las metricas de laboratorio (Lighthouse).
- Siempre establece dimensiones en imagenes/videos para prevenir CLS.
