# Plan de Actividades — Guía para Desarrolladores Frontend

> 70 actividades de 45-60 minutos cada una, organizadas en 8 etapas progresivas.
> Cada actividad tiene: lectura (~15-20 min), práctica (~30-35 min) y validación (~5-10 min).

---

## Resumen

| Etapa | Actividades | Horas | Rango |
|:-----:|:-----------:|:-----:|:-----:|
| 1 - Fundamentos | 14 | ~12.6h | 45-60 min |
| 2 - Arquitectura de Componentes | 8 | ~6.4h | 50-60 min |
| 3 - Estado y Flujo de Datos | 9 | ~7.8h | 50-60 min |
| 4 - Usabilidad y Diseño | 9 | ~7.6h | 45-60 min |
| 5 - Rendimiento | 7 | ~5.8h | 45-60 min |
| 6 - Seguridad y Resiliencia | 7 | ~6.3h | 45-60 min |
| 7 - Testing y Calidad | 8 | ~6.5h | 48-60 min |
| 8 - Arquitectura a Escala | 8 | ~7.2h | 45-60 min |
| **Total** | **70** | **~60h** | **45-60 min** |

### Formato de cada actividad

```
Nombre de la actividad (~XX min)
├── Lectura: qué leer y dónde (~15-20 min)
├── Práctica: qué construir (~30-35 min)
├── Validación: cómo verificar (~5-10 min)
└── Criterios de aceptación: 2-4 condiciones verificables
```

### Convenciones

- **Actividad N.X**: la última actividad de cada etapa (N.último) es siempre una **validación integral** que verifica todos los criterios de aceptación de la etapa
- **Referencias**: cada actividad indica el archivo fuente y las líneas a leer
- **Ejercicios del PLAN**: las actividades que corresponden a ejercicios del PLAN.md se marcan con "(Ejercicio PLAN)"

---





---

### ETAPA 1: FUNDAMENTOS (14 actividades)

**Actividad 1.1 -- Comprender la estructura de un documento HTML**
- Temas: Estructura del documento, DOCTYPE, head, meta tags
- Lectura: foundations-reference.md L7-41 (~15 min)
- Práctica: Crear un documento HTML5 completo desde cero con head, meta tags, lang, charset (~30 min)
- Validación: Pasar W3C Validator sin errores; verificar meta viewport en DevTools (~5 min)
- Criterios de aceptación:
  1. El documento tiene DOCTYPE, html lang, charset, viewport meta, title
  2. Pasa html-validate sin errores
  3. Los meta tags aparecen correctamente en DevTools > Elements
- **Duración: ~50 min**

**Actividad 1.2 -- Construir una pagina con HTML semantico**
- Temas: Elementos semanticos, decision div vs semantico, DOM mental model
- Lectura: foundations-reference.md L42-273 (~20 min)
- Práctica: Construir la estructura de la pagina de perfil (nav, header, main, section, article, aside, footer) sin usar div para estructura (~30 min)
- Validación: Buscar divs en DevTools; verificar jerarquia de encabezados (~5 min)
- Criterios de aceptación:
  1. Cero divs usados para layout estructural
  2. Jerarquia de encabezados desciende sin saltos (h1 > h2 > h3)
  3. Exactamente un h1 en la pagina
- **Duración: ~55 min**

**Actividad 1.3 -- Dominar formularios HTML nativos**
- Temas: Forms, label, fieldset, legend, validacion nativa
- Lectura: foundations-reference.md L110-181 (~10 min)
- Práctica: Agregar un formulario de contacto a la pagina de perfil con fieldset, labels asociados y validacion nativa (required, pattern, type) (~35 min)
- Validación: Verificar que labels estan asociados; probar validacion nativa al enviar (~5 min)
- Criterios de aceptación:
  1. Cada input tiene un label asociado (for/id o anidamiento)
  2. Los campos requeridos muestran error nativo al enviar vacio
  3. El fieldset agrupa campos relacionados con legend
- **Duración: ~50 min**

**Actividad 1.4 -- Entender el modelo de caja CSS**
- Temas: content-box vs border-box, reset universal, margin collapse, modos display
- Lectura: foundations-reference.md L274-503 (~20 min)
- Práctica: Crear una demo interactiva que muestre diferencia content-box vs border-box, margin collapse entre hermanos, y stacking context con z-index (~30 min)
- Validación: Inspeccionar box model en DevTools para 3 elementos (~5 min)
- Criterios de aceptación:
  1. El reset universal box-sizing: border-box esta aplicado
  2. Se demuestra un caso de margin collapse y su solucion
  3. No hay uso de px para espaciado (solo rem/em)
  4. Los elementos usan display correcto para su proposito
- **Duración: ~55 min**

**Actividad 1.5 -- Construir layouts con Flexbox**
- Temas: Contenedor vs items, ejes, justify/align, flex shorthand, gap, patrones comunes
- Lectura: foundations-reference.md L504-784 (~20 min)
- Práctica: Implementar 3 patrones con Flexbox: navbar horizontal, card row con wrap, centering perfecto (~30 min)
- Validación: Verificar en 3 anchos de viewport que no hay overflow horizontal (~5 min)
- Criterios de aceptación:
  1. Los 3 patrones usan flex correctamente (sin hacks de margin)
  2. El navbar se adapta a movil (columna o hamburguesa)
  3. Las cards hacen wrap correctamente en viewport estrecho
  4. Todo el espaciado usa gap, no margin entre items
- **Duración: ~55 min**

**Actividad 1.6 -- Construir layouts con CSS Grid**
- Temas: Columnas/filas, fr, repeat, minmax, auto-fill/auto-fit, areas, implicito vs explicito
- Lectura: foundations-reference.md L785-1082 (~20 min)
- Práctica: Implementar un layout de dashboard con Grid: sidebar + header + contenido principal + grid de tarjetas responsivo (~35 min)
- Validación: Verificar en 320px, 768px, 1280px sin overflow (~5 min)
- Criterios de aceptación:
  1. El layout del dashboard usa CSS Grid con areas nombradas
  2. Las tarjetas usan auto-fill/auto-fit con minmax para ser responsivas
  3. El layout funciona en 3 anchos sin scroll horizontal
  4. No se usan valores px para espaciado
- **Duración: ~60 min**

**Actividad 1.7 -- Completar el desafio de layout CSS (Ejercicio PLAN)**
- Temas: Integracion de Flexbox + Grid, responsive design
- Lectura: Revisar puntos clave de Flexbox vs Grid (~5 min)
- Práctica: Reproducir el mockup de dashboard completo con Flexbox y Grid, 3 breakpoints, solo rem/clamp (~45 min)
- Validación: Ejecutar grep px en CSS; verificar 320px, 768px, 1280px (~10 min)
- Criterios de aceptación:
  1. El layout reproduce el mockup proporcionado
  2. grep -rn "[0-9]px" devuelve solo bordes/sombras
  3. Funciona en los 3 anchos de viewport
  4. Toda la tipografia es fluida (clamp o rem)
- **Duración: ~60 min**

**Actividad 1.8 -- Dominar modulos e imports en JavaScript moderno**
- Temas: import/export, import() dinamico, let/const vs var, template literals
- Lectura: foundations-reference.md L1083-1258 (~15 min)
- Práctica: Crear un proyecto con 3+ modulos que se importan entre si; usar import() dinamico para carga condicional (~30 min)
- Validación: Verificar que no hay uso de var; verificar que el modulo dinamico carga bajo demanda en Network tab (~5 min)
- Criterios de aceptación:
  1. Todos los modulos usan import/export (no require)
  2. Cero uso de var en todo el proyecto
  3. Al menos un import() dinamico funcional
- **Duración: ~50 min**

**Actividad 1.9 -- Dominar destructuring, spread, optional chaining y async/await**
- Temas: Destructuring, spread/rest, optional chaining, nullish coalescing, async/await, Promises
- Lectura: foundations-reference.md L1159-1384 (~15 min)
- Práctica: Escribir funciones que usen destructuring de objetos/arrays, spread para copias inmutables, optional chaining para datos anidados, y una funcion async que consuma una API publica (~35 min)
- Validación: Verificar que no hay callback hell; verificar manejo de errores con try/catch (~5 min)
- Criterios de aceptación:
  1. Se usa destructuring en al menos 3 funciones
  2. Se usa spread para crear copias (no mutacion)
  3. Optional chaining evita errores en datos anidados nulos
  4. Cada llamada async tiene manejo de error explicito
- **Duración: ~55 min**

**Actividad 1.10 -- Dominar metodos de array y closures**
- Temas: map, filter, reduce, find, some, every, closures, scope, event loop
- Lectura: foundations-reference.md L1339-1502 (~15 min)
- Práctica: Implementar transformaciones de datos de una API publica usando cadenas de map/filter/reduce; crear un closure practico (counter factory, event handler con contexto) (~30 min)
- Validación: Verificar que no se usa forEach donde map/filter aplica; verificar que closures capturan variables correctas (~5 min)
- Criterios de aceptación:
  1. Se usan al menos 3 metodos funcionales de array (no forEach para transformar)
  2. Se demuestra un closure funcional
  3. No hay mutacion de arrays originales
- **Duración: ~50 min**

**Actividad 1.11 -- Escribir el Transformador de Datos en TypeScript (Ejercicio PLAN)**
- Temas: TypeScript basico (types, interfaces, strict, unknown vs any), integracion con JS esencial
- Lectura: PLAN.md L66-71 + ecosystem TypeScript section (~15 min)
- Práctica: Implementar el modulo transformador: fetch de API publica, validar forma con interfaces TS, transformar datos, manejar errores. strict:true, cero any (~35 min)
- Validación: npx tsc --noEmit; grep ": any"; test offline (~10 min)
- Criterios de aceptación:
  1. Compila con strict:true sin errores
  2. grep ": any" devuelve cero resultados
  3. En modo offline, muestra mensaje de error significativo (no unhandled rejection)
  4. Los datos transformados tienen tipos correctos
- **Duración: ~60 min**

**Actividad 1.12 -- Auditar accesibilidad y navegacion por teclado**
- Temas: Elementos semanticos dan comportamiento gratis, navegacion por teclado, labels, alt text, jerarquia de encabezados
- Lectura: principles L817-886 + PLAN L73-77 (~10 min)
- Práctica: Tomar la pagina de perfil de actividades anteriores, desconectar el raton, navegar toda la pagina solo con teclado. Documentar cada fallo. Corregir los 3 mas criticos (~35 min)
- Validación: Lighthouse Accessibility; pa11y; verificar tab order (~10 min)
- Criterios de aceptación:
  1. Todo elemento interactivo es alcanzable con Tab y activable con Enter/Space
  2. El foco visible esta presente en cada elemento enfocable
  3. Todas las imagenes tienen alt text apropiado
  4. Lighthouse Accessibility > 90
- **Duración: ~55 min**

**Actividad 1.13 -- Configurar el entorno de desarrollo**
- Temas: Editor + TS integration, ESLint/Biome, Prettier, DevTools, terminal/npm
- Lectura: PLAN.md L79-83 + ecosystem s.12 L537-575 (~10 min)
- Práctica: Configurar un proyecto con linter (ESLint o Biome), verificar que detecta var, variables no usadas y console.log. Explorar los 5 paneles principales de DevTools (~30 min)
- Validación: Introducir errores y verificar que el linter los marca (~5 min)
- Criterios de aceptación:
  1. El linter marca var, variables no usadas y console.log
  2. El estudiante puede inspeccionar un elemento en DevTools Elements
  3. El estudiante puede ver peticiones en Network tab
  4. npx eslint/biome check pasa con cero warnings en codigo limpio
- **Duración: ~45 min**

**Actividad 1.14 -- Validacion integral de Etapa 1**
- Temas: Ejecucion del script de validacion completo
- Lectura: PLAN.md L106-128 (~5 min)
- Práctica: Ejecutar los 6 comandos del script de validacion sobre todo el trabajo de la etapa. Corregir cualquier fallo restante (~40 min)
- Validación: Los 6 comandos pasan (~10 min)
- Criterios de aceptación:
  1. html-validate pasa sin errores
  2. tsc --noEmit --strict pasa
  3. Lint check pasa con cero warnings
  4. pa11y no reporta errores criticos
- **Duración: ~55 min**

**Subtotal Etapa 1: 14 actividades, ~12.6 horas**

---

### ETAPA 2: ARQUITECTURA DE COMPONENTES (8 actividades)

**Actividad 2.1 -- Entender el modelo mental de componentes**
- Temas: Componente como funcion, encapsulacion, reusabilidad, composicion
- Lectura: suppl-comp L7-96 (~15 min)
- Práctica: Dibujar el modelo Input>Output para 5 componentes de una UI conocida; identificar que es markup, estilo y logica de cada uno (~30 min)
- Validación: Verificar que cada componente tiene una unica responsabilidad (~5 min)
- Criterios de aceptación:
  1. Cada componente se describe como funcion Input>Output
  2. Se identifican markup, estilos y logica por separado
  3. Ningun componente tiene mas de una responsabilidad principal
- **Duración: ~50 min**

**Actividad 2.2 -- Dominar el arbol de componentes y ciclo de vida**
- Temas: Arbol de componentes, ciclo de vida, mapeo a frameworks
- Lectura: suppl-comp L95-196 (~15 min)
- Práctica: Descomposicion de la pagina de producto (Ejercicio PLAN 2.E1): documentar cada componente con nombre, props, children, responsabilidad. Dibujar el arbol (~35 min)
- Validación: Verificar al menos 3 niveles de anidamiento (~5 min)
- Criterios de aceptación:
  1. El arbol tiene al menos 3 niveles (atom/molecule/organism o equivalente)
  2. Cada componente tiene nombre, props y responsabilidad documentados
  3. Ningun componente tiene mas de 10 props
- **Duración: ~55 min**

**Actividad 2.3 -- Disenar APIs de componentes con TypeScript**
- Temas: Props como API publica, requeridos vs opcionales, tipado, event callbacks
- Lectura: suppl-comp L197-326 (~15 min)
- Práctica: Definir interfaces TypeScript para Button, SearchBar y ProductCard. Implementar Button como atom con variantes via props (~30 min)
- Validación: Verificar que cada componente tiene interface Props; TypeScript compila (~5 min)
- Criterios de aceptación:
  1. Cada componente tiene una interfaz TypeScript para sus props
  2. Props requeridos y opcionales estan claramente diferenciados
  3. Los event callbacks tienen tipos correctos (no any)
  4. Button tiene variantes via props (no condicionales internas excesivas)
- **Duración: ~50 min**

**Actividad 2.4 -- Implementar children, slots y ref forwarding**
- Temas: Children/slots, forwarding attributes, ref forwarding, controlled vs uncontrolled
- Lectura: suppl-comp L327-476 (~15 min)
- Práctica: Implementar SearchBar (molecule) que compone Button + Input, y ProductCard (organism) que compone Image + Title + Price + Button. Usar children/slots (~35 min)
- Validación: Verificar que ProductCard contiene SearchBar contiene Button sin conflictos (~5 min)
- Criterios de aceptación:
  1. SearchBar usa composicion (children/slots) con Button
  2. ProductCard compone SearchBar y otros sub-componentes
  3. Los componentes son sustituibles sin romper funcionalidad
  4. Ninguno excede 150 lineas
- **Duración: ~55 min**

**Actividad 2.5 -- Aplicar SOLID a componentes**
- Temas: SRP, OCP, LSP, ISP, DIP aplicados a frontend
- Lectura: principles L85-174 (~15 min)
- Práctica: Revisar los componentes construidos en actividades anteriores contra cada principio SOLID. Documentar una violacion encontrada y corregirla (~30 min)
- Validación: Verificar que cada componente tiene una sola razon para cambiar (~5 min)
- Criterios de aceptación:
  1. Ningun componente viola SRP (una razon para cambiar)
  2. Los componentes son extensibles via composicion (OCP)
  3. Las variantes son sustituibles (LSP)
- **Duración: ~50 min**

**Actividad 2.6 -- Refactorizar un componente dios**
- Temas: Composicion sobre herencia, separacion de responsabilidades, hooks
- Lectura: principles L177-262 + L265-328 (~10 min)
- Práctica: Dado el componente de 400 lineas (PLAN 2.E3), refactorizarlo en componentes + hooks separados. Cada uno con una sola responsabilidad (~40 min)
- Validación: Verificar wc -l; verificar que fetch no esta en componentes; output identico al original (~10 min)
- Criterios de aceptación:
  1. Ningun componente excede 150 lineas
  2. grep "fetch|axios" en components/ devuelve cero
  3. Cada hook es testeable de forma aislada
  4. La salida refactorizada es identica a la original
- **Duración: ~60 min**

**Actividad 2.7 -- Construir un Compound Component (Tabs)**
- Temas: Compound components, estado implicito via context, accesibilidad de tabs
- Lectura: suppl-comp L199-216 (compound) + principles L199-216 (~15 min)
- Práctica: Implementar <Tabs>, <TabList>, <Tab>, <TabPanel> con estado compartido implicitamente. Implementar navegacion con flechas (~35 min)
- Validación: Probar reordenar children; probar navegacion con teclado (~10 min)
- Criterios de aceptación:
  1. Los tabs gestionan foco con teclas de flecha
  2. Los children pueden reordenarse sin romper funcionalidad
  3. El tab activo tiene foco visible
  4. El compound component usa context para estado implicito
- **Duración: ~60 min**

**Actividad 2.8 -- Validacion integral de Etapa 2**
- Temas: Revision de todos los criterios de aceptacion 2.1-2.10
- Lectura: PLAN.md L154-167 (~5 min)
- Práctica: Ejecutar todas las verificaciones: grep interfaces, wc -l, grep fetch en components, verificar composabilidad (~40 min)
- Validación: Los 10 criterios del PLAN pasan (~10 min)
- Criterios de aceptación:
  1. Todos los criterios 2.1-2.10 del PLAN se cumplen
  2. El arbol de componentes tiene 3+ niveles
  3. Cero fetch en la carpeta de componentes
  4. Todos los componentes tienen interfaces TypeScript para props
- **Duración: ~55 min**

**Subtotal Etapa 2: 8 actividades, ~6.4 horas**

---

### ETAPA 3: ESTADO Y FLUJO DE DATOS (9 actividades)

**Actividad 3.1 -- Entender los 4 estados de UI para data fetching**
- Temas: Loading, success, error, empty states; skeleton screens
- Lectura: suppl-comp L477-700 (~18 min)
- Práctica: Implementar un componente que consume una API y muestra los 4 estados: skeleton mientras carga, datos en exito, mensaje+reintentar en error, empty state cuando no hay datos (~30 min)
- Validación: Probar Slow 3G, bloquear API, devolver array vacio (~10 min)
- Criterios de aceptación:
  1. Skeleton/spinner visible en Slow 3G
  2. Error con boton reintentar al bloquear API
  3. Empty state descriptivo con array vacio
  4. Sin flash de contenido entre estados
- **Duración: ~58 min**

**Actividad 3.2 -- Implementar skeleton screens y patrones de framework**
- Temas: Mejores practicas para skeletons, patrones por framework
- Lectura: suppl-comp L700-775 (~10 min)
- Práctica: Mejorar los skeletons de la actividad anterior: matching layout shape, pulse animation, evitar skeleton para LCP element (~35 min)
- Validación: Verificar que los skeletons coinciden con el layout final (~5 min)
- Criterios de aceptación:
  1. Los skeletons reflejan la forma del contenido real
  2. Hay animacion de pulse/shimmer
  3. El elemento LCP no tiene skeleton (carga con prioridad)
- **Duración: ~50 min**

**Actividad 3.3 -- Dominar URL state management**
- Temas: Que pertenece en la URL, URLSearchParams API, integracion con frameworks
- Lectura: suppl-comp L776-935 (~15 min)
- Práctica: Construir una lista filtrable/ordenable/paginada donde filtro, orden y pagina viven en la URL (PLAN 3.E4 parcial) (~35 min)
- Validación: Copiar URL y abrir en incognito; verificar boton atras (~10 min)
- Criterios de aceptación:
  1. Los filtros, orden y pagina estan en query params de la URL
  2. Compartir la URL reproduce la vista exacta
  3. El boton atras restaura cada estado previo
- **Duración: ~60 min**

**Actividad 3.4 -- Dominar form state management**
- Temas: Controlled vs uncontrolled forms, librerias de formularios, validacion
- Lectura: suppl-comp L1000-1162 (~15 min)
- Práctica: Implementar un formulario con validacion basada en schema (Zod/Valibot) y estrategia de validacion on-blur (~35 min)
- Validación: Verificar que errores aparecen al blur, no al submit (~5 min)
- Criterios de aceptación:
  1. El formulario valida campos al perder foco (on-blur)
  2. Se usa un schema de validacion (no validacion ad-hoc)
  3. Los errores son claros y aparecen debajo del campo
  4. El formulario distingue errores de campo vs de formulario
- **Duración: ~55 min**

**Actividad 3.5 -- Construir un formulario multi-paso (wizard)**
- Temas: Formularios multi-paso, submission patterns
- Lectura: suppl-comp L1194-1321 (~10 min)
- Práctica: Construir parte del wizard de checkout (carrito > envio > confirmacion) con preservacion de datos entre pasos y boton atras (~40 min)
- Validación: Verificar navegacion adelante/atras con datos preservados (~5 min)
- Criterios de aceptación:
  1. El wizard muestra progreso (Paso X de N)
  2. El boton atras preserva datos del paso anterior
  3. No se puede avanzar sin validacion del paso actual
- **Duración: ~55 min**

**Actividad 3.6 -- Entender los tipos de estado y flujo unidireccional**
- Temas: Local vs global, server vs client, derived state, unidirectional flow, immutability
- Lectura: principles L331-414 (~15 min)
- Práctica: Auditar el estado de la aplicacion construida hasta ahora (PLAN 3.E1): clasificar cada pieza de estado como local, servidor, derivado o URL. Refactorizar al menos 2 piezas mal ubicadas (~30 min)
- Validación: Verificar que ningun dato de servidor esta en store del cliente (~5 min)
- Criterios de aceptación:
  1. Cada pieza de estado esta clasificada (local/server/derived/URL)
  2. Ningun estado derivado esta almacenado como useState
  3. Los datos del servidor fluyen por TanStack Query o equivalente
  4. El flujo de datos es unidireccional
- **Duración: ~50 min**

**Actividad 3.7 -- Migrar a server state management**
- Temas: Server state, TanStack Query/SWR, cache invalidation, optimistic updates
- Lectura: principles L344-355 + ecosystem L89-133 (~10 min)
- Práctica: Reemplazar useState+useEffect para data fetching por TanStack Query. Agregar cache, retry automatico y manejo de errores (PLAN 3.E2) (~35 min)
- Validación: Verificar que la cache funciona (navegar ida y vuelta sin re-fetch); verificar retry en Network (~10 min)
- Criterios de aceptación:
  1. Cero useState para datos del servidor
  2. La cache funciona (navegacion sin re-fetch innecesario)
  3. Retry automatico visible en Network tab
  4. Estados loading/error/success implementados
- **Duración: ~55 min**

**Actividad 3.8 -- Implementar state machine para flujo multi-paso**
- Temas: State machines con XState, estados imposibles, validacion por paso
- Lectura: principles L368-381 (~5 min)
- Práctica: Integrar XState al wizard de checkout (PLAN 3.E3): definir maquina con estados cart/shipping/payment/confirmation. Impedir transiciones invalidas (~40 min)
- Validación: Intentar saltar pasos; intentar volver de confirmacion a carrito (~10 min)
- Criterios de aceptación:
  1. La maquina impide saltar de carrito a pago (sin envio)
  2. No se puede volver de confirmacion a carrito
  3. Cada transicion requiere validacion del paso actual
  4. Los estados imposibles son imposibles por definicion
- **Duración: ~55 min**

**Actividad 3.9 -- Validacion integral de Etapa 3**
- Temas: Criterios 3.1-3.8 del PLAN, optimistic updates, stale closures
- Lectura: PLAN.md L194-204 (~5 min)
- Práctica: Verificar optimistic update con rollback; probar stale closures (click rapido 10 veces); verificar URL como fuente de verdad (~40 min)
- Validación: Todos los criterios 3.1-3.8 pasan (~10 min)
- Criterios de aceptación:
  1. Optimistic update se revierte en caso de fallo del servidor
  2. Click rapido 10 veces produce conteo = 10 (sin stale closure)
  3. El boton atras funciona correctamente con estado URL
  4. Todos los criterios 3.1-3.8 del PLAN se cumplen
- **Duración: ~55 min**

**Subtotal Etapa 3: 9 actividades, ~7.8 horas**

---

### ETAPA 4: USABILIDAD Y DISENO (9 actividades)

**Actividad 4.1 -- Construir un sistema tipografico**
- Temas: Type scale, font pairing, rem, line height, letter spacing, measure, fluid typography
- Lectura: suppl-visual L7-229 (~17 min)
- Práctica: Definir un type scale completo con CSS custom properties usando ratio 1.25 y clamp() para fluidez. Aplicar a un articulo de ejemplo (~30 min)
- Validación: Verificar que no hay px para font sizes; verificar legibilidad en 320px y 1280px (~5 min)
- Criterios de aceptación:
  1. Type scale definido con custom properties (--font-size-sm, -base, -lg, etc.)
  2. Toda tipografia usa rem o clamp(), cero px
  3. Line-height entre 1.4-1.6 para body text
  4. Measure (longitud de linea) entre 45-75 caracteres
- **Duración: ~52 min**

**Actividad 4.2 -- Construir una paleta de color para UI**
- Temas: Modelos de color, brand+neutral+semantic layers, dark mode, contraste WCAG
- Lectura: suppl-visual L230-470 (~20 min)
- Práctica: Crear una paleta completa con 3 capas (brand, neutral, semantic) en CSS custom properties. Implementar dark mode con prefers-color-scheme (~30 min)
- Validación: Verificar contraste WCAG AA con DevTools; verificar dark mode (~5 min)
- Criterios de aceptación:
  1. La paleta tiene las 3 capas (brand, neutral, semantic)
  2. Dark mode funciona con prefers-color-scheme
  3. Contraste texto/fondo cumple WCAG AA (4.5:1 para texto normal)
  4. Los tokens de color usan custom properties, no valores hardcodeados
- **Duración: ~55 min**

**Actividad 4.3 -- Implementar un sistema de espaciado**
- Temas: Grid 4px/8px, named tokens, padding vs margin vs gap, spacing responsivo
- Lectura: suppl-visual L471-658 (~16 min)
- Práctica: Definir tokens de espaciado (--space-xs a --space-3xl) con base 8px. Aplicar consistentemente a la pagina de perfil/dashboard existente (~30 min)
- Validación: Verificar que todo espaciado usa tokens, no valores magicos (~5 min)
- Criterios de aceptación:
  1. Tokens de espaciado definidos con custom properties
  2. Todo padding/margin/gap usa tokens
  3. El espaciado es consistente (mismos tokens para mismos propositos)
  4. Espaciado responsivo con clamp() para al menos 2 tokens
- **Duración: ~51 min**

**Actividad 4.4 -- Disenar formularios efectivos**
- Temas: Ubicacion de labels, sizing, required/optional, validacion inline, mensajes de error, multi-step
- Lectura: suppl-visual L659-969 (~21 min)
- Práctica: Redisenar el formulario de 20 campos (PLAN 4.E3) usando progressive disclosure (wizard), validacion inline on-blur, valores por defecto (~30 min)
- Validación: Verificar validacion inline; verificar botones de progreso/retroceso (~5 min)
- Criterios de aceptación:
  1. El wizard muestra progreso y permite retroceder
  2. La validacion ocurre al blur, no al submit
  3. El boton de envio esta deshabilitado cuando hay campos invalidos
  4. Campos requeridos claramente marcados (no solo asterisco)
- **Duración: ~56 min**

**Actividad 4.5 -- Dominar las heuristicas de Nielsen**
- Temas: 10 heuristicas aplicadas a web, ejemplos de violacion
- Lectura: suppl-visual L970-1114 + principles L417-435 (~15 min)
- Práctica: Auditoria heuristica (PLAN 4.E1): identificar 10 violaciones en un mockup, nombrar la heuristica y proponer solucion (~35 min)
- Validación: Comparar con clave de respuestas (~5 min)
- Criterios de aceptación:
  1. 10/10 violaciones identificadas correctamente
  2. Cada violacion nombra la heuristica correcta
  3. Cada solucion es accionable y especifica
  4. Ninguna solucion introduce un dark pattern
- **Duración: ~55 min**

**Actividad 4.6 -- Aplicar Fitts, Hick y Gestalt al diseno de UI**
- Temas: Ley de Fitts, Ley de Hick, principios Gestalt, progressive disclosure
- Lectura: principles L436-477 (~10 min)
- Práctica: Revisar el dashboard y la pagina de perfil: verificar touch targets 44x44px, reducir opciones visibles aplicando Hick, agrupar elementos relacionados con Gestalt (~30 min)
- Validación: Ejecutar script de medicion de touch targets (~5 min)
- Criterios de aceptación:
  1. Todo touch target mide al menos 44x44px en movil
  2. Se aplica progressive disclosure (max 2 niveles)
  3. Los elementos relacionados estan agrupados visualmente (proximidad)
- **Duración: ~45 min**

**Actividad 4.7 -- Construir un dashboard responsivo**
- Temas: Mobile-first, responsive design, content-based breakpoints
- Lectura: principles L486-516 (~5 min)
- Práctica: Construir el dashboard responsivo (PLAN 4.E2): 1 columna movil, 2 columnas tablet, sidebar+main escritorio. Breakpoints basados en contenido (~45 min)
- Validación: Redimensionar lentamente de 320px a 1920px; verificar que no hay saltos en 768/1024 especificamente (~10 min)
- Criterios de aceptación:
  1. Los breakpoints son basados en contenido, no en dispositivo
  2. El dashboard es usable en cada ancho entre 320px y 1920px
  3. Sin overflow horizontal ni superposicion de contenido
  4. Sin dark patterns
- **Duración: ~60 min**

**Actividad 4.8 -- Auditar touch targets y corregir**
- Temas: Touch targets, Fitts law aplicada, accesibilidad tactil
- Lectura: PLAN.md L228 (~5 min)
- Práctica: En la vista movil del dashboard, medir cada elemento interactivo. Marcar y corregir cualquier target < 44x44px (PLAN 4.E4) (~30 min)
- Validación: Ejecutar script de medicion; cero advertencias (~10 min)
- Criterios de aceptación:
  1. Todos los targets miden >= 44x44px en movil
  2. El espaciado entre targets es suficiente para evitar toques erroneos
  3. Peer review confirma ausencia de dark patterns
- **Duración: ~45 min**

**Actividad 4.9 -- Validacion integral de Etapa 4**
- Temas: Criterios 4.1-4.8 del PLAN
- Lectura: PLAN.md L232-241 (~5 min)
- Práctica: Verificar todos los criterios de aceptacion. Corregir fallos restantes (~40 min)
- Validación: Los 8 criterios pasan (~10 min)
- Criterios de aceptación:
  1. Auditoria heuristica 10/10
  2. Breakpoints basados en contenido
  3. Formulario valida inline al blur
  4. Touch targets >= 44x44px en movil
- **Duración: ~55 min**

**Subtotal Etapa 4: 9 actividades, ~7.6 horas**

---

### ETAPA 5: RENDIMIENTO (7 actividades)

**Actividad 5.1 -- Entender Core Web Vitals y el modelo RAIL**
- Temas: LCP, INP, CLS, RAIL (Response, Animation, Idle, Load)
- Lectura: principles L517-534 + ecosystem L371-414 (~15 min)
- Práctica: Ejecutar Lighthouse en una aplicacion lenta. Documentar cada hallazgo CWV. Priorizar por impacto (PLAN 5.E1 parte 1) (~30 min)
- Validación: Verificar LCP, CLS e INP en el reporte (~5 min)
- Criterios de aceptación:
  1. Se documentan valores de LCP, INP y CLS
  2. Los hallazgos estan priorizados por impacto
  3. Se identifica el elemento LCP de la pagina
  4. Se explica que mide cada metrica
- **Duración: ~50 min**

**Actividad 5.2 -- Corregir los 5 principales problemas de rendimiento**
- Temas: Optimizacion de imagenes, lazy loading, fonts, CSS/JS critico
- Lectura: PLAN.md L252-259 (~10 min)
- Práctica: Corregir los 5 problemas priorizados en la actividad anterior. Implementar WebP/AVIF, srcset, fetchpriority="high" en hero (PLAN 5.E1 parte 2) (~40 min)
- Validación: Re-ejecutar Lighthouse; score >= 90 en movil (~10 min)
- Criterios de aceptación:
  1. Lighthouse Performance >= 90 en simulacion movil
  2. LCP < 2.5s en conexion limitada
  3. CLS = 0 (sin layout shifts)
  4. La imagen hero tiene fetchpriority="high", NO loading="lazy"
- **Duración: ~60 min**

**Actividad 5.3 -- Implementar lazy loading y code splitting**
- Temas: Lazy loading por ruta y componente, code splitting, import() dinamico
- Lectura: principles L535-542 + L780-788 (~5 min)
- Práctica: Agregar code splitting a nivel de ruta y lazy loading de imagenes (PLAN 5.E2). Verificar chunks separados en build (~35 min)
- Validación: Verificar que cada ruta tiene su chunk; verificar que hero no tiene lazy (~10 min)
- Criterios de aceptación:
  1. Code splitting produce chunks separados por ruta
  2. Las imagenes debajo del fold tienen loading="lazy"
  3. La imagen hero NO tiene loading="lazy"
  4. El bundle total no esta en un unico archivo
- **Duración: ~50 min**

**Actividad 5.4 -- Construir una lista virtualizada**
- Temas: Virtualizacion, @tanstack/virtual, trade-offs a11y
- Lectura: principles L543-551 (~5 min)
- Práctica: Construir lista que renderiza 10,000 elementos sin jank (PLAN 5.E3). Implementar con @tanstack/virtual o similar (~40 min)
- Validación: Performance > grabar scroll rapido > verificar 60fps (~10 min)
- Criterios de aceptación:
  1. La lista renderiza 10,000 elementos
  2. El scroll se mantiene a >55fps (DevTools Performance)
  3. Ningun frame toma mas de 16ms
  4. Solo los elementos visibles estan en el DOM
- **Duración: ~55 min**

**Actividad 5.5 -- Analizar y optimizar bundles**
- Temas: Bundle analyzer, dependencias grandes, tree shaking, memoizacion justificada
- Lectura: principles L552-591 (~10 min)
- Práctica: Ejecutar bundle analyzer (PLAN 5.E4). Identificar 3 dependencias mas grandes. Implementar al menos una reduccion (~35 min)
- Validación: Comparar tamanos antes/despues; al menos 20% reduccion (~10 min)
- Criterios de aceptación:
  1. Se identifican las 3 dependencias mas grandes
  2. El tamano total de JS se reduce al menos 20%
  3. Cada uso de memo/useMemo tiene justificacion medida
- **Duración: ~55 min**

**Actividad 5.6 -- Medir con herramientas reales**
- Temas: Lighthouse vs CrUX, DevTools Performance, Web Vitals en produccion
- Lectura: PLAN.md L259 + ecosystem L371-414 (~10 min)
- Práctica: Configurar web-vitals para reportar metricas reales. Comparar datos de Lighthouse (lab) con observaciones reales (~30 min)
- Validación: Verificar que las metricas se reportan correctamente (~5 min)
- Criterios de aceptación:
  1. web-vitals esta configurado y reporta LCP, INP, CLS
  2. Se documenta la diferencia entre metricas de lab y de campo
  3. Todas las metricas estan dentro de los umbrales "buenos"
- **Duración: ~45 min**

**Actividad 5.7 -- Validacion integral de Etapa 5**
- Temas: Criterios 5.1-5.8 del PLAN
- Lectura: PLAN.md L270-279 (~5 min)
- Práctica: Ejecutar todas las verificaciones: Lighthouse >= 90, LCP < 2.5s, CLS = 0, hero sin lazy, chunks separados, lista 60fps, bundle reducido 20% (~40 min)
- Validación: Los 8 criterios pasan (~10 min)
- Criterios de aceptación:
  1. Lighthouse >= 90 movil
  2. LCP < 2.5s, CLS = 0
  3. Lista virtualizada a 60fps
  4. Bundle reducido >= 20%
- **Duración: ~55 min**

**Subtotal Etapa 5: 7 actividades, ~5.8 horas**

---

### ETAPA 6: SEGURIDAD Y RESILIENCIA (7 actividades)

**Actividad 6.1 -- Entender y prevenir XSS**
- Temas: Auto-escaping, dangerouslySetInnerHTML, DOMPurify, tipos de XSS
- Lectura: principles L638-662 (~10 min)
- Práctica: Encontrar y corregir 5 vulnerabilidades XSS en una app dada (PLAN 6.E1): innerHTML, eval, URL injection, template injection, stored XSS (~35 min)
- Validación: Inyectar <img src=x onerror=alert(1)> en cada input; cero alertas (~10 min)
- Criterios de aceptación:
  1. 5/5 vulnerabilidades encontradas y corregidas
  2. Cero alertas al inyectar payloads XSS
  3. Cada uso de innerHTML/v-html usa DOMPurify
  4. Cero eval en el codigo
- **Duración: ~55 min**

**Actividad 6.2 -- Implementar CSRF protection y CSP**
- Temas: CSRF (SameSite cookies, tokens), CSP (politica real, no permisiva)
- Lectura: principles L649-670 (~10 min)
- Práctica: Configurar CSP header restrictivo. Implementar SameSite cookies. Verificar que no hay unsafe-inline para script-src (~30 min)
- Validación: Verificar CSP en response headers; verificar que no hay * ni unsafe-inline (~5 min)
- Criterios de aceptación:
  1. CSP header presente en response headers
  2. No contiene * ni unsafe-inline para script-src
  3. SameSite cookies configuradas
  4. Cero secretos en el bundle (grep sk_/api_key/secret/password en dist/)
- **Duración: ~45 min**

**Actividad 6.3 -- Implementar los 4 estados de error para toda vista con datos**
- Temas: Loading, error+retry, success, empty state; error boundaries
- Lectura: principles L592-637 (~10 min)
- Práctica: Para cada vista con data fetching, implementar los 4 estados (PLAN 6.E2). Agregar error boundaries estrategicos (~35 min)
- Validación: Slow 3G > skeleton; bloquear API > error+retry; retry funciona; array vacio > empty state (~10 min)
- Criterios de aceptación:
  1. Skeleton visible en carga lenta
  2. Error con boton reintentar funcional al fallo de API
  3. Empty state con orientacion al usuario
  4. Error boundaries colocados estrategicamente (no solo en root)
- **Duración: ~55 min**

**Actividad 6.4 -- Implementar flujo de autenticacion seguro**
- Temas: JWT en memoria (no localStorage), OAuth+PKCE, refresh tokens en HttpOnly cookie
- Lectura: principles L671-701 (~10 min)
- Práctica: Implementar login con OAuth+PKCE (PLAN 6.E3). Access token en memoria, refresh en HttpOnly cookie, renovacion automatica (~40 min)
- Validación: Verificar que no hay tokens en localStorage/sessionStorage (~10 min)
- Criterios de aceptación:
  1. Cero tokens visibles en localStorage ni sessionStorage
  2. Access token almacenado en memoria (variable JS)
  3. Refresh token en HttpOnly cookie
  4. Renovacion automatica de tokens funciona
- **Duración: ~60 min**

**Actividad 6.5 -- Implementar validacion cliente + servidor**
- Temas: Validacion client-side para UX, server-side para seguridad, Zod/Valibot
- Lectura: principles L664-670 + PLAN L294 (~5 min)
- Práctica: Agregar validacion doble (cliente con Zod + servidor) a un formulario. Verificar que saltear validacion del cliente via DevTools es rechazado por el servidor (~35 min)
- Validación: Desactivar validacion cliente desde DevTools; enviar datos invalidos; servidor rechaza (~10 min)
- Criterios de aceptación:
  1. Validacion en cliente con schema (Zod/Valibot)
  2. Validacion en servidor independiente
  3. Saltear validacion cliente via DevTools es rechazado por servidor
  4. Mensajes de error del servidor son claros y utiles
- **Duración: ~50 min**

**Actividad 6.6 -- Implementar optimistic updates y retry con backoff**
- Temas: Optimistic updates, rollback, exponential backoff + jitter, idempotency keys
- Lectura: principles L610-637 (~10 min)
- Práctica: Implementar like/unlike optimista con rollback en fallo (PLAN 6.E4). Implementar retry con backoff exponencial visible en Network (~35 min)
- Validación: Like > bloquear API > rollback visible + error toast; verificar intervalos crecientes de retry (~10 min)
- Criterios de aceptación:
  1. Optimistic update aparece inmediatamente
  2. En fallo, el update se revierte y aparece mensaje de error
  3. Los intervalos de retry son crecientes (~1s, ~2s, ~4s)
  4. Los intervalos no son identicos (hay jitter)
- **Duración: ~55 min**

**Actividad 6.7 -- Validacion integral de Etapa 6**
- Temas: Criterios 6.1-6.8 del PLAN
- Lectura: PLAN.md L309-318 (~5 min)
- Práctica: Verificar todos los criterios. Corregir fallos restantes (~40 min)
- Validación: Los 8 criterios pasan (~10 min)
- Criterios de aceptación:
  1. Cero XSS, cero secretos en bundle
  2. CSP restrictivo, tokens no en storage
  3. 4 estados de UI en cada vista con datos
  4. Optimistic update con rollback, retry con backoff
- **Duración: ~55 min**

**Subtotal Etapa 6: 7 actividades, ~6.3 horas**

---

### ETAPA 7: TESTING Y CALIDAD (8 actividades)

**Actividad 7.1 -- Aprender a escribir buenos tests**
- Temas: Patron AAA, nombrado, que testear, que NO testear, aislamiento
- Lectura: suppl-testing L7-226 (~18 min)
- Práctica: Escribir 3 tests siguiendo el patron AAA para funciones de logica de negocio existentes. Nombrar cada test con formato "verbo + condicion + resultado esperado" (~25 min)
- Validación: Verificar que los tests siguen AAA; verificar nombres descriptivos (~5 min)
- Criterios de aceptación:
  1. Cada test tiene fases Arrange-Act-Assert claramente separadas
  2. Los nombres siguen el formato descriptivo
  3. Los tests verifican comportamiento, no implementacion
  4. Cero mocking de estado interno o metodos privados
- **Duración: ~48 min**

**Actividad 7.2 -- Dominar component testing con Testing Library (queries)**
- Temas: Prioridad de queries (getByRole > getByLabelText > getByText), interacciones
- Lectura: suppl-testing L227-460 (~20 min)
- Práctica: Escribir tests para SearchBar (PLAN 7.E1 parte 1): renderiza, acepta input, consultas por role/label/text. Cero getByTestId (~30 min)
- Validación: grep getByTestId en tests; cero resultados (~5 min)
- Criterios de aceptación:
  1. Todas las queries usan getByRole, getByLabelText o getByText
  2. Cero getByTestId o querySelector
  3. El test verifica que SearchBar renderiza correctamente
  4. El test verifica que acepta input del usuario
- **Duración: ~55 min**

**Actividad 7.3 -- Testear interacciones, async y formularios**
- Temas: userEvent, waitFor, testear hooks, testear formularios, estados loading/error/empty
- Lectura: suppl-testing L460-724 (~20 min)
- Práctica: Completar tests de SearchBar (PLAN 7.E1 parte 2): llama onSearch al submit, muestra error al submit vacio. Testear un hook con renderHook (~30 min)
- Validación: Todos los tests pasan; cero consultas por className (~5 min)
- Criterios de aceptación:
  1. Test verifica que onSearch se llama al submit
  2. Test verifica error al submit vacio
  3. Hook testeado de forma aislada con renderHook
  4. Cero consultas por className o testId
- **Duración: ~55 min**

**Actividad 7.4 -- Testear data fetching con MSW**
- Temas: MSW (mock a nivel de red), contract tests, estados loading/success/error/retry
- Lectura: suppl-testing (relevante a MSW patterns) + PLAN L340 (~10 min)
- Práctica: Escribir tests de integracion para un hook de data fetching (PLAN 7.E2): estado de carga, exito, error, retry. Configurar MSW handlers (~40 min)
- Validación: Todos los tests pasan; los mocks coinciden con tipos TS de la API (~10 min)
- Criterios de aceptación:
  1. MSW handlers configurados para success, error y retry
  2. Los tests verifican los 4 estados (loading, success, error, retry)
  3. Las formas de respuesta de MSW coinciden con tipos TypeScript
  4. Cero mocking de implementacion interna
- **Duración: ~60 min**

**Actividad 7.5 -- Escribir tests E2E con Playwright**
- Temas: Page Object Model, locators, datos de test, autenticacion, network mocking
- Lectura: suppl-testing L725-1084 (~20 min)
- Práctica: Escribir E2E del camino critico (PLAN 7.E3): login > buscar > ver detalle > agregar al carrito. Usar POM (~35 min)
- Validación: El test completa en < 30s; usa POM (~5 min)
- Criterios de aceptación:
  1. El test E2E completa el camino critico en < 30 segundos
  2. Se usa Page Object Model para encapsular locators
  3. Los locators usan getByRole/getByLabel, no CSS selectors
  4. El test no depende de datos de produccion
- **Duración: ~60 min**

**Actividad 7.6 -- Practicas de code review**
- Temas: Que buscar (correctitud, seguridad, diseno, rendimiento, a11y), dar feedback, tamano de PR
- Lectura: suppl-testing L1085-1315 (~15 min)
- Práctica: Realizar un code review de un PR proporcionado siguiendo la checklist. Escribir al menos 5 comentarios accionables usando "nosotros" y distinguiendo blocking vs non-blocking (~30 min)
- Validación: Verificar que los comentarios son especificos y constructivos (~5 min)
- Criterios de aceptación:
  1. Al menos 5 comentarios de review escritos
  2. Cada comentario es especifico (no "esto se ve mal")
  3. Se distingue blocking vs non-blocking
  4. Se usa lenguaje constructivo ("podriamos..." no "deberias...")
- **Duración: ~50 min**

**Actividad 7.7 -- Configurar pipeline de CI**
- Temas: Lint > unit > component > E2E, fail fast, paralelizacion
- Lectura: principles L702-816 + ecosystem s.7,12 (~15 min)
- Práctica: Configurar GitHub Actions (PLAN 7.E4): lint > unit tests > component tests > E2E (solo si anteriores pasan). Verificar que falla ante errores de lint (~30 min)
- Validación: Push commit con error de lint; pipeline falla en paso de lint; verificar que E2E depende de unit tests (~10 min)
- Criterios de aceptación:
  1. El pipeline ejecuta lint > unit > component > E2E en orden
  2. El paso de E2E tiene needs: [unit-tests]
  3. Un error de lint hace fallar el pipeline antes de tests
  4. axe-core detecta violaciones de accesibilidad en CI
- **Duración: ~55 min**

**Actividad 7.8 -- Validacion integral de Etapa 7**
- Temas: Criterios 7.1-7.8 del PLAN
- Lectura: PLAN.md L346-355 (~5 min)
- Práctica: Ejecutar todas las verificaciones: cero getByTestId, coverage >= 80% para logica, E2E < 30s, CI falla ante lint, a11y check en CI (~40 min)
- Validación: Los 8 criterios pasan (~10 min)
- Criterios de aceptación:
  1. Cero getByTestId/querySelector en tests
  2. Coverage >= 80% para hooks/services/utils
  3. E2E completa en < 30s
  4. CI falla correctamente ante errores de lint y a11y
- **Duración: ~55 min**

**Subtotal Etapa 7: 8 actividades, ~6.5 horas**

---

### ETAPA 8: ARQUITECTURA A ESCALA (8 actividades)

**Actividad 8.1 -- Organizar codigo por features**
- Temas: Feature-based, Feature-Sliced Design, domain-driven, trade-offs
- Lectura: principles L723-816 (~15 min)
- Práctica: Refactorizar la estructura plana (components/, hooks/, services/) a organizacion por feature (PLAN 8.E1). Verificar cero imports circulares (~35 min)
- Validación: npx madge --circular src/; cero ciclos (~10 min)
- Criterios de aceptación:
  1. Cero dependencias circulares entre features
  2. Eliminar un directorio de feature no rompe features no relacionadas
  3. Cada feature contiene sus componentes, hooks y tipos
  4. Los archivos que cambian juntos estan juntos
- **Duración: ~60 min**

**Actividad 8.2 -- Aplicar Clean Architecture en frontend**
- Temas: 4 capas (Presentation > Application > Domain > Infrastructure), cuando es excesivo
- Lectura: principles L298-328 (~10 min)
- Práctica: Reorganizar una feature compleja en las 4 capas. La logica de dominio debe ser agnóstica de framework y testeable sin renderizar componentes (~35 min)
- Validación: Verificar que domain layer no importa React/Vue/Angular; tests de dominio pasan sin UI (~10 min)
- Criterios de aceptación:
  1. La logica de dominio es agnóstica de framework
  2. Domain layer no importa ningun framework
  3. Los tests de logica de dominio se ejecutan sin renderizar UI
  4. La capa de infraestructura es intercambiable (fetch/axios)
- **Duración: ~55 min**

**Actividad 8.3 -- Extraer un design system**
- Temas: Headless components, design tokens (W3C), shadcn/ui model
- Lectura: ecosystem L454-494 (~10 min)
- Práctica: Extraer 5 componentes reutilizables en un paquete de design system con tokens para colores, espaciado y tipografia (PLAN 8.E2) (~40 min)
- Validación: Compilar el design system independientemente; cambiar un token de color y verificar propagacion (~10 min)
- Criterios de aceptación:
  1. El design system compila independientemente (npm run build)
  2. Exporta componentes, tokens y tipos
  3. Cambiar un token de color actualiza todos los componentes que lo usan
  4. Los componentes son headless (sin estilos acoplados)
- **Duración: ~60 min**

**Actividad 8.4 -- Implementar capa de API type-safe**
- Temas: REST, tRPC, GraphQL, BFF, marco de decision
- Lectura: ecosystem L495-534 (~10 min)
- Práctica: Implementar capa de API con tRPC (PLAN 8.E3). Los cambios de tipos backend deben producir errores de tipos en frontend (~40 min)
- Validación: Cambiar un tipo de respuesta backend; npx tsc --noEmit debe fallar en frontend (~10 min)
- Criterios de aceptación:
  1. La capa de API es type-safe end-to-end
  2. Cambiar tipo de respuesta backend produce error de tipos en frontend
  3. npx tsc --noEmit detecta el breaking change
  4. El frontend no necesita validacion en runtime para contratos conocidos
- **Duración: ~60 min**

**Actividad 8.5 -- Entender build tools y configurar Vite**
- Temas: Vite, bundlers, que hace el bundler, configuracion esencial
- Lectura: ecosystem L134-176 (~10 min)
- Práctica: Configurar Vite con aliases, environment variables, y build optimizado. Verificar que el build produce chunks nombrados por feature (~30 min)
- Validación: npx vite build; verificar chunks separados por feature en output (~5 min)
- Criterios de aceptación:
  1. Vite configurado con aliases y env vars
  2. El build produce chunks separados por feature
  3. No es un unico bundle monolitico
  4. El output incluye source maps para debugging
- **Duración: ~45 min**

**Actividad 8.6 -- Elegir estrategias de renderizado (SSR/SSG/ISR)**
- Temas: Meta-frameworks, SSR, SSG, ISR, streaming, decision framework
- Lectura: ecosystem L177-235 (~10 min)
- Práctica: Para 3 tipos de pagina (blog, dashboard, e-commerce listing), elegir e implementar la estrategia de renderizado apropiada con justificacion (PLAN 8.E4) (~40 min)
- Validación: Verificar que blog es estatico, dashboard es SSR, listing tiene ISR con cache headers (~10 min)
- Criterios de aceptación:
  1. Blog: pre-renderizado en build (archivo HTML estatico verificable)
  2. Dashboard: SSR por solicitud (response headers del servidor)
  3. E-commerce listing: ISR con revalidacion (cache headers)
  4. Justificacion escrita que referencia frecuencia de datos, personalizacion, SEO y TTI
- **Duración: ~60 min**

**Actividad 8.7 -- Entender monorepos y micro-frontends**
- Temas: Monorepos (cuando ayudan, cuando no), micro-frontends (evaluacion honesta)
- Lectura: PLAN.md L372 + suppl-testing L1316-1388 (~10 min)
- Práctica: Documentar una decision arquitectonica: si el proyecto actual justifica monorepo y/o micro-frontends, con trade-offs listados (~30 min)
- Validación: La decision referencia al menos 3 trade-offs concretos (~5 min)
- Criterios de aceptación:
  1. La decision esta documentada con justificacion
  2. Se listan al menos 3 trade-offs por enfoque
  3. No se adopta micro-frontends "porque Netflix lo usa"
  4. Se identifican los tamaños de equipo donde cada enfoque aplica
- **Duración: ~45 min**

**Actividad 8.8 -- Validacion integral de Etapa 8**
- Temas: Criterios 8.1-8.8 del PLAN
- Lectura: PLAN.md L383-392 (~5 min)
- Práctica: Ejecutar todas las verificaciones: madge --circular, feature autocontenida, design system independiente, tsc detecta breaking changes, chunks por feature (~40 min)
- Validación: Los 8 criterios pasan (~10 min)
- Criterios de aceptación:
  1. Cero imports circulares entre features
  2. Design system compila independientemente
  3. tsc detecta breaking changes de API
  4. Build produce chunks por feature
- **Duración: ~55 min**

**Subtotal Etapa 8: 8 actividades, ~7.2 horas**

---

## RESUMEN TOTAL

| Etapa | Actividades | Horas estimadas | Rango por actividad |
|:-----:|:-----------:|:---------------:|:-------------------:|
| 1 - Fundamentos | 14 | ~12.6h | 45-60 min |
| 2 - Arquitectura de Componentes | 8 | ~6.4h | 50-60 min |
| 3 - Estado y Flujo de Datos | 9 | ~7.8h | 50-60 min |
| 4 - Usabilidad y Diseno | 9 | ~7.6h | 45-60 min |
| 5 - Rendimiento | 7 | ~5.8h | 45-60 min |
| 6 - Seguridad y Resiliencia | 7 | ~6.3h | 45-60 min |
| 7 - Testing y Calidad | 8 | ~6.5h | 48-60 min |
| 8 - Arquitectura a Escala | 8 | ~7.2h | 45-60 min |
| **TOTAL** | **70** | **~60.2h** | **45-60 min** |

**Decisiones de diseño clave:**
- La Etapa 1 tiene más actividades (14) porque `foundations-reference.md` tiene 1,598 líneas con 93 ejemplos de código — el contenido más denso con diferencia.
- Cada actividad sigue la fórmula ~15-20 min lectura + ~30-35 min práctica + ~5-10 min validación.
- Cada actividad tiene 2-4 criterios de aceptación verificables derivados del PLAN.md.
- La última actividad de cada etapa es una "validacion integral" que mapea a la tabla de criterios de aceptación del PLAN.md para esa etapa.
- El tiempo total estimado es ~60 horas, promediando ~55 minutos por actividad.
