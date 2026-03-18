# Bundle Optimization

La optimizacion de bundles reduce el tamano del JavaScript y otros assets que el navegador necesita descargar, parsear y ejecutar. El tamano del bundle impacta directamente en First Contentful Paint (FCP) y Largest Contentful Paint (LCP). Cada kilobyte de JavaScript tiene un costo mayor que un kilobyte de imagen, porque JavaScript debe ser descargado, parseado, compilado y ejecutado.

---

## Tree Shaking

Tree shaking es la eliminacion automatica de codigo muerto (exportaciones no utilizadas) por parte del bundler. Importa solo lo que usas y el bundler eliminara el resto.

**Requisitos para que tree shaking funcione:**
- Usa **ES modules** (`import`/`export`). CommonJS (`require`) no es analizable estaticamente y anula el tree shaking completamente.
- Marca los paquetes como `sideEffects: false` en `package.json` para indicar al bundler que los modulos sin importaciones usadas pueden eliminarse completamente.
- Evita **barrel files** (`index.ts` con re-exports). Un barrel file que re-exporta todo de un paquete fuerza al bundler a incluir el paquete completo si se usa *cualquier* exportacion.

```javascript
// WRONG: imports the entire library
import _ from 'lodash';
_.get(obj, 'path');

// RIGHT: imports only what's used — tree-shakeable
import get from 'lodash/get';
get(obj, 'path');
```

Los bundlers modernos (Vite, webpack 5, Rollup, esbuild) soportan tree shaking nativamente para ES modules.

---

## Code Splitting

- **Basado en rutas:** Cada pagina es un chunk separado. El enfoque de mayor impacto.
- **`import()` dinamico:** Carga modulos bajo demanda para funcionalidades pesadas.
- **Chunks de vendor:** Separa las dependencias de terceros del codigo de la aplicacion para mejor caching (las dependencias cambian con menos frecuencia).

---

## Analisis de Dependencias

Audita regularmente el tamano del bundle con herramientas de visualizacion:

- **`vite-bundle-visualizer`** para proyectos Vite.
- **`webpack-bundle-analyzer`** para proyectos Webpack.
- **`source-map-explorer`** para cualquier proyecto que genere source maps.

Estas herramientas revelan que dependencias ocupan mas espacio en tu bundle y donde hay oportunidades de optimizacion. Un `node_modules` que no inspeccionas regularmente puede crecer silenciosamente con dependencias que no necesitas.

---

## Targets de Sintaxis Moderna

Envia ES2020+ a navegadores modernos para obtener una salida mas pequena. El codigo moderno es mas compacto que el codigo transpilado a ES5.

```javascript
// ES5 output (larger):
var _ref = [1, 2, 3], a = _ref[0], b = _ref[1], c = _ref[2];

// ES2020+ output (smaller):
const [a, b, c] = [1, 2, 3];
```

Configura tu bundler para apuntar a navegadores modernos como linea base. Si necesitas soportar navegadores legacy, genera bundles diferenciados: uno moderno (mas pequeno, para la mayoria) y uno legacy (transpilado, solo para quienes lo necesiten).

---

## Compresion

Habilita compresion para todos los assets basados en texto (HTML, CSS, JavaScript, JSON, SVG):

- **Brotli** (preferido): Compresion 15-20% mejor que gzip. Soportado en todos los navegadores evergreen.
- **gzip:** Fallback universal. Funciona en absolutamente todos los navegadores.

La compresion se configura en el servidor web o CDN, no en el bundler. La mayoria de los CDN (Cloudflare, Vercel, Netlify) aplican Brotli automaticamente.

---

## JavaScript como Cuello de Botella

Envia menos JavaScript. Cada byte de JS tiene un costo desproporcionado:

- Astro no envia JavaScript por defecto.
- Qwik usa resumability para JavaScript inicial cercano a cero.
- React Compiler reduce los re-renders automaticamente, resultando en menos JavaScript de actualizacion.
- Tree-shaking mediante bundlers modernos elimina codigo muerto.

---

## Errores Comunes

- **Barrel files (`index.ts`) que derrotan el tree-shaking.** Un barrel file que re-exporta todo fuerza al bundler a incluir el grafo de modulos completo. Importa directamente desde el archivo fuente.
- **CommonJS en dependencias.** Dependencias que solo publican CommonJS no son tree-shakeable. Busca alternativas ESM o usa plugins del bundler para convertir.
- **No analizar el bundle periodicamente.** Sin inspeccion regular, el bundle crece silenciosamente. Establece un presupuesto de tamano y monitorealo en CI.
- **Sobre-dividir bundles de vendor a CDNs.** Cargar bibliotecas desde CDNs de terceros introduce un punto unico de fallo, niega las ganancias de multiplexacion de HTTP/2, y los navegadores modernos particionan caches por origen (el caching entre sitios ya no funciona). Auto-aloja y empaqueta tus dependencias.

---

## Puntos Clave

- Tree shaking requiere ES modules, `sideEffects: false` y evitar barrel files.
- Analiza el bundle regularmente con herramientas de visualizacion.
- Envia ES2020+ a navegadores modernos; genera bundles legacy solo si es necesario.
- Habilita Brotli (o gzip como fallback) en el servidor o CDN.
- Cada byte de JavaScript tiene mayor costo que un byte de imagen -- envia menos JS.
