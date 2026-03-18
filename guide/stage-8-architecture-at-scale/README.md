# Etapa 8: Arquitectura a Escala

[Inicio](../README.md) > Etapa 8

> Patrones para equipos y aplicaciones grandes. Aprende a organizar, escalar y mantener aplicaciones frontend que crecen en complejidad y en número de desarrolladores.

**Prerrequisitos:** Etapa 7 completada.

**Por qué esta etapa importa:** Un proyecto con 10 componentes se maneja fácil. Con 100 componentes y 10 desarrolladores, la estructura plana se vuelve un laberinto. ¿Dónde está el componente de productos? ¿Quién cambió el botón y rompió 5 páginas? ¿Por qué el build tarda 8 minutos? Esta etapa te enseña los patrones que resuelven estos problemas: organización por features, Clean Architecture para separar lógica de UI, design systems para eliminar duplicación visual, type safety end-to-end para evitar bugs de desincronización con el backend, y decisiones informadas sobre renderizado, builds y organización de repositorios. Si te saltas esta etapa, tu proyecto funcionará — hasta que crezca lo suficiente para volverse inmanejable.

---

## Progreso

**Esenciales:** 0/1 | **Recomendadas:** 0/4 | **Avanzadas:** 0/3

---

## Actividades Esenciales 🟢

| # | Actividad | Duración | Estado |
|:-:|-----------|:--------:|:------:|
| 8.1 | [Organizar código por features](#81--organizar-código-por-features) | ~60 min | ☐ |

## Actividades Recomendadas 🟡

| # | Actividad | Duración | Estado |
|:-:|-----------|:--------:|:------:|
| 8.2 | [Clean Architecture en frontend (4 capas)](#82--clean-architecture-en-frontend-4-capas) | ~55 min | ☐ |
| 8.3 | [Extraer un design system](#83--extraer-un-design-system) | ~60 min | ☐ |
| 8.4 | [Implementar capa de API type-safe](#84--implementar-capa-de-api-type-safe) | ~60 min | ☐ |
| 8.5 | [Elegir estrategia de renderizado (SSR/SSG/ISR)](#85--elegir-estrategia-de-renderizado-ssrssgisr) | ~60 min | ☐ |

## Actividades Avanzadas 🔴

| # | Actividad | Duración | Estado |
|:-:|-----------|:--------:|:------:|
| 8.6 | [Configurar Vite y entender el build](#86--configurar-vite-y-entender-el-build) | ~45 min | ☐ |
| 8.7 | [Entender monorepos y micro-frontends](#87--entender-monorepos-y-micro-frontends) | ~45 min | ☐ |
| 8.8 | [Validación integral de Etapa 8](#88--validación-integral-de-etapa-8) | ~55 min | ☐ |

---

## Detalle de actividades

### 8.1 — Organizar código por features

**Por qué:** La estructura plana (`components/`, `services/`, `models/`) funciona con 10 componentes. Con 50, tocar una funcionalidad requiere saltar entre 4 carpetas. La organización por features agrupa todo lo relacionado a una funcionalidad en una sola carpeta — si necesitas eliminar una feature, borras la carpeta y listo.

| | |
|---|---|
| **Requiere** | Etapa 7 completada (tests funcionando), un proyecto Angular con al menos 3-4 funcionalidades |
| **Aprenderás** | Organización por features, API pública de un feature, detectar y eliminar dependencias circulares |
| **Al completar** | Proyecto organizado por features. `npx madge --circular src/` reporta cero dependencias circulares |

[→ Ir a la actividad](./actividades/8.1-organizacion-features.md)

---

### 8.2 — Clean Architecture en frontend (4 capas)

**Por qué:** Si tu componente mezcla validaciones, llamadas a API y renderizado, cambiar el framework requiere reescribir todo. Clean Architecture separa la lógica de negocio del framework — la lógica se testea sin UI, se reutiliza entre proyectos, y sobrevive cambios de framework.

| | |
|---|---|
| **Requiere** | Actividad 8.1 completada, conocimiento de servicios e inyección de dependencias |
| **Aprenderás** | Las 4 capas (Presentation, Application, Domain, Infrastructure), dominio agnóstico de framework, testear lógica sin UI |
| **Al completar** | Una feature en 4 capas. Domain layer no importa Angular. Tests de dominio pasan sin renderizar UI |

[→ Ir a la actividad](./actividades/8.2-clean-architecture.md)

---

### 8.3 — Extraer un design system

**Por qué:** El mismo botón implementado de 3 formas en 3 componentes. El mismo color hardcodeado en 47 archivos. Un design system centraliza componentes reutilizables y design tokens — cambias el color una vez y se propaga a todos los componentes.

| | |
|---|---|
| **Requiere** | Actividad 8.1 completada, experiencia con CSS custom properties (Etapa 1) |
| **Aprenderás** | Design tokens, componentes reutilizables, configurar una librería Angular con Nx |
| **Al completar** | Paquete de design system con 5 componentes y tokens para colores, espaciado y tipografía. Cambiar un token actualiza todo |

[→ Ir a la actividad](./actividades/8.3-design-system.md)

---

### 8.4 — Implementar capa de API type-safe

**Por qué:** Si el backend cambia la forma de una respuesta y nadie avisa al frontend, el código compila, los mocks pasan, y la app se rompe en producción. Una API type-safe con Zod valida en runtime y en compilación — si algo cambia, TypeScript te avisa inmediatamente.

| | |
|---|---|
| **Requiere** | Actividad 8.2 completada, TypeScript con `strict: true` (Actividad 1.6) |
| **Aprenderás** | Type safety end-to-end, esquemas de validación con Zod, alternativas (tRPC, OpenAPI) |
| **Al completar** | Capa de API que valida respuestas con Zod. Cambiar un tipo produce error de TypeScript en frontend |

[→ Ir a la actividad](./actividades/8.4-api-type-safe.md)

---

### 8.5 — Elegir estrategia de renderizado (SSR/SSG/ISR)

**Por qué:** CSR muestra pantalla en blanco hasta que el JavaScript se descarga. SSR envía HTML con contenido desde el servidor. SSG genera HTML estático en build time. Ninguna es "la mejor" — cada una es correcta para un tipo de contenido. Elegir la incorrecta perjudica rendimiento o desperdicia recursos.

| | |
|---|---|
| **Requiere** | Actividad 8.1 completada, conceptos básicos de HTTP |
| **Aprenderás** | Diferencias entre CSR, SSR, SSG e ISR, cuándo usar cada una, implementar con Angular Universal y Analog |
| **Al completar** | 3 páginas analizadas con la estrategia correcta, justificación escrita referenciando SEO, frecuencia de datos, personalización y TTI |

[→ Ir a la actividad](./actividades/8.5-estrategias-renderizado.md)

---

### 8.6 — Configurar Vite y entender el build

**Por qué:** ¿Sabes qué produce `ng build`? ¿Por qué `main.js` pesa 400 KB? Entender el build te permite optimizarlo: chunks por feature, aliases para imports limpios, variables de entorno sin exponer secretos. Vite es la herramienta de build que Angular usa desde v17 — más rápida y más configurable.

| | |
|---|---|
| **Requiere** | Actividad 8.1 completada (organización por features con lazy loading) |
| **Aprenderás** | Qué es un build y qué produce, lazy loading para chunks por feature, aliases de importación, variables de entorno |
| **Al completar** | Build produce chunks separados por feature. Aliases configurados. Variables de entorno funcionando |

[→ Ir a la actividad](./actividades/8.6-vite-build.md)

---

### 8.7 — Entender monorepos y micro-frontends

**Por qué:** Cuando pasas de 1 app con 3 developers a 5 apps con 30 developers, la organización del código es una decisión estratégica. ¿Monorepo? ¿Polyrepo? ¿Micro-frontends? Estas decisiones son difíciles de revertir. Esta actividad te ayuda a decidir para tu contexto, no para el de Netflix.

| | |
|---|---|
| **Requiere** | Actividades 8.1-8.6 completadas, experiencia trabajando en equipo |
| **Aprenderás** | Monorepo vs polyrepo, micro-frontends y cuándo tienen sentido, trade-offs de cada enfoque, Nx para monorepos |
| **Al completar** | Decisión documentada con al menos 3 trade-offs por enfoque, basada en tu contexto real |

[→ Ir a la actividad](./actividades/8.7-monorepos-microfrontends.md)

---

### 8.8 — Validación integral de Etapa 8

**Por qué:** Esta es la última etapa de la guía. Confirma que dominas los patrones de arquitectura a escala y puedes tomar decisiones informadas sobre organización, capas, design systems y estrategias de renderizado.

| | |
|---|---|
| **Requiere** | Actividades 8.1-8.7 completadas |
| **Aprenderás** | Ejecutar validación integral de la arquitectura, identificar y cerrar brechas |
| **Al completar** | Todos los criterios 8.1-8.7 se cumplen. Arquitectura que escala con el equipo y los requisitos |

[→ Ir a la actividad](./actividades/8.8-validacion-integral.md)

---

## Material de lectura

| Archivo | Contenido |
|---------|-----------|
| [01-organizacion-por-features.md](./lecturas/01-organizacion-por-features.md) | Organización por features, Feature-Sliced Design, imports circulares |
| [02-clean-architecture-frontend.md](./lecturas/02-clean-architecture-frontend.md) | Clean Architecture: 4 capas, dominio agnóstico de framework |
| [03-design-systems.md](./lecturas/03-design-systems.md) | Design systems: tokens, componentes reutilizables, paquetes |
| [04-patrones-de-api.md](./lecturas/04-patrones-de-api.md) | Patrones de API: tRPC, Zod, type safety end-to-end |
| [05-meta-frameworks-y-renderizado.md](./lecturas/05-meta-frameworks-y-renderizado.md) | Meta-frameworks, SSR/SSG/ISR, build tools |
| [06-micro-frontends.md](./lecturas/06-micro-frontends.md) | Micro-frontends: cuándo sí, cuándo no, implementación, trade-offs |
| [07-almacenamiento-en-navegador.md](./lecturas/07-almacenamiento-en-navegador.md) | Almacenamiento: localStorage, IndexedDB, Cache API, OPFS, SQLite en browser, quotas |

## Material de Angular

| Archivo | Contenido |
|---------|-----------|
| [01-arquitectura-angular.md](./angular/01-arquitectura-angular.md) | Arquitectura Angular: standalone, lazy loading, Nx, Analog |

---

[← Etapa anterior: Testing](../stage-7-testing-and-quality/) | [Volver al índice](../README.md)
