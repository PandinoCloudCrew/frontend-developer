# Anti-patterns de Rendimiento

Los anti-patterns de rendimiento son errores recurrentes que degradan la velocidad, la capacidad de respuesta o la estabilidad visual de una aplicacion web. Estos errores son especialmente daninos porque a menudo parecen inofensivos en desarrollo pero causan problemas severos en produccion con usuarios reales, dispositivos lentos y redes congestionadas.

---

## 1. Optimizacion Prematura

Pasar horas optimizando una ruta de render que representa el 1% del tiempo total de renderizado mientras se ignora el 60% no optimizado es esfuerzo desperdiciado. Primero haz profiling con DevTools del navegador, React Profiler o herramientas especificas del framework. Optimiza el cuello de botella medido, no el sospechado.

**Regla:** Memorizar cada componente, dividir cada ruta y virtualizar cada lista sin perfilar primero desperdicia tiempo de desarrollo en no-cuellos de botella. Perfila antes de optimizar.

---

## 2. `React.memo()` en Todas Partes con Memoizacion Rota

Envolver cada componente en `React.memo()` mientras se pasan objetos inline (`style={{ color: 'red' }}`), funciones inline (`onClick={() => ...}`) o arrays nuevos como props anula silenciosamente la memoizacion en cada render. El componente se re-renderiza de todas formas, pero ahora con la sobrecarga anadida de una comparacion superficial. Estabiliza las referencias antes de memoizar.

---

## 3. Code Splitting Prematuro

Hacer lazy loading de un componente de 5KB introduce un estado de carga, un viaje de red y layout shift -- costos que exceden los bytes ahorrados. Haz code splitting en limites significativos (rutas, funcionalidades pesadas como bibliotecas de graficos) donde el chunk sea lo suficientemente grande para justificar el compromiso.

**Regla:** Un bundle de 80KB carga mas rapido que cuatro bundles de 20KB descargados secuencialmente. Divide por ruta, no por componente. Usa el analizador de tu bundler para detectar cascadas de chunks.

---

## 4. `loading="lazy"` en Imagenes Hero/LCP

Aplicar lazy loading a la imagen mas grande en la ventana grafica inicial *retrasa* el Largest Contentful Paint porque el navegador espera hasta que la imagen entre en la interseccion de la ventana grafica antes de obtenerla. Carga con eager las imagenes above-the-fold; aplica lazy loading solo al contenido below-the-fold.

Las imagenes above-the-fold deberian usar `fetchpriority="high"` y carga eager (el valor por defecto). Reserva `loading="lazy"` para imagenes below-the-fold.

---

## 5. Tree Shaking Roto por CommonJS o Barrel Files

Un barrel file (`index.ts`) que re-exporta todo de un paquete fuerza al bundler a incluir el paquete completo si se usa *cualquier* exportacion. CommonJS (`require`) no es analizable estaticamente y anula el tree shaking completamente. Usa ES modules y marca los paquetes como `sideEffects: false` en `package.json`.

---

## 6. Sobre-dividir Bundles de Vendor a CDNs

Cargar bibliotecas desde CDNs de terceros introduce un punto unico de fallo (la caida del CDN rompe tu aplicacion), niega las ganancias de multiplexacion de HTTP/2, y los navegadores modernos particionan caches por origen, asi que el caching entre sitios ya no funciona. Auto-aloja y empaqueta tus dependencias.

---

## 7. CLS por Componentes Lazy-loaded sin Placeholders

Hacer lazy loading de un componente que empuja el contenido hacia abajo cuando aparece causa Cumulative Layout Shift. Reserva el espacio con un skeleton, placeholder o dimensiones explicitas antes de que el componente cargue.

**Otras causas comunes de CLS:**
- Imagenes sin dimensiones (`width`/`height` o `aspect-ratio` en CSS).
- Contenido inyectado dinamicamente (anuncios, banners, embeds).
- Carga de fuentes web que cambia el tamano del texto.

**Prevencion:** Siempre establece los atributos `width` y `height` en imagenes y videos. Reserva espacio para anuncios y embeds. Usa `font-display: swap` con `size-adjust` o `font-display: optional`.

---

## 8. Benchmarks Sinteticos vs Metricas de Usuarios Reales

Una puntuacion de Lighthouse de 100 en tu maquina de desarrollo no dice nada sobre usuarios reales en telefonos lentos y redes congestionadas. Usa datos del Chrome UX Report (CrUX) y Real User Monitoring (biblioteca web-vitals, tu plataforma de analytics) para entender el rendimiento real. Optimiza para el P75 de usuarios reales, no para puntuaciones sinteticas de laboratorio.

---

## 9. Scripts de Terceros sin Auditar

Analytics, widgets de chat, A/B testing, scripts de anuncios y embeds sociales a menudo contribuyen mas al rendimiento deficiente que el codigo de tu aplicacion. Audita el impacto de terceros con la insignia "Third-party" de Chrome DevTools, carga scripts no criticos con `async`/`defer` o tras la interaccion del usuario, y elimina scripts que nadie usa.

---

## 10. React Compiler como Solucion Magica

El compilador optimiza el rendimiento de renderizado auto-memorizando, pero no puede arreglar jerarquias de componentes fundamentalmente defectuosas, re-renders innecesarios causados por mal uso de context o data fetching en rutas de renderizado. Perfila primero, corrige los problemas de arquitectura, y luego deja que el compilador optimice lo que queda.

---

## 11. Code Splitting sin Estados de Carga

Un usuario hace clic en un enlace, el chunk lazy carga, y nada pasa visualmente durante 1-3 segundos. Siempre acompana los puntos de code splitting con un indicador de carga (spinner, skeleton o barra de progreso) para que los usuarios sepan que la aplicacion esta respondiendo.

---

## Como Detectar Problemas de Rendimiento

1. **Chrome DevTools Performance tab:** Graba una sesion de uso y analiza los long tasks, layout shifts y tiempos de renderizado.
2. **React DevTools Profiler:** Identifica componentes que se re-renderizan excesivamente.
3. **Lighthouse:** Como linea base para detectar problemas obvios (NO como metrica definitiva).
4. **web-vitals library:** Mide Core Web Vitals en produccion con datos de usuarios reales.
5. **Bundle analyzer:** Inspecciona que esta en tu bundle y cuanto pesa cada dependencia.

---

## Puntos Clave

- Perfila antes de optimizar -- nunca al reves.
- La memoizacion rota es peor que no memoizar.
- No apliques `loading="lazy"` a imagenes above-the-fold.
- Tree shaking requiere ES modules y evitar barrel files.
- Las metricas de usuarios reales (CrUX, RUM) son mas importantes que Lighthouse.
- Siempre reserva espacio para contenido lazy-loaded para prevenir CLS.
- Audita regularmente el impacto de scripts de terceros.
