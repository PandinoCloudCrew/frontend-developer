# Meta-frameworks y Estrategias de Renderizado

> Cómo elegir un meta-framework y la estrategia de renderizado correcta para tu aplicación. Cubre Next.js, Nuxt, SvelteKit, Astro, Analog y las diferencias entre SSG, SSR, ISR y Streaming SSR.

---

## Por Qué Esto Importa

Un meta-framework proporciona routing, data fetching, build tooling y estrategias de renderizado integradas sobre un framework base. Elegir el correcto (o decidir no usar ninguno) impacta la velocidad de desarrollo, el rendimiento, la complejidad del deployment y las opciones de hosting.

---

## El Panorama de Meta-frameworks

### Next.js (15-16)

- **67% de cuota de mercado** entre los meta-frameworks. App Router es el estándar.
- Next.js 16 estabilizó Turbopack para builds de producción y graduó Partial Prerendering hacia GA.
- Server Components + Server Actions son el modelo mental por defecto.
- Mejor para: aplicaciones React full-stack, equipos empresariales, despliegues en Vercel.

### Remix / React Router v7

- Remix se fusionó en React Router v7, trayendo sus patrones de carga de datos server-first al ecosistema React más amplio.
- Remix 3 está siendo reimaginado como un framework con baterías incluidas y sin bundler.
- Mejor para: proyectos React enfocados en estándares web, progressive enhancement.

### Nuxt (3.x)

- El meta-framework de Vue. Soporte completo de SSR/SSG/ISR, auto-imports, enrutamiento basado en archivos.
- Mejor para: equipos Vue que necesitan una solución full-stack.

### SvelteKit

- Maduró con el sistema de runes de Svelte 5. Obteniendo contratos empresariales.
- Reduce el JavaScript enviado en más de un 50% en comparación con Next.js, reduciendo a la mitad el retraso de interactividad.
- Mejor para: aplicaciones SaaS sensibles al rendimiento.

### Astro (5.x)

- **Cloudflare adquirió Astro en enero de 2026**, cambiando fundamentalmente su trayectoria.
- Arquitectura orientada al contenido. Los sitios estáticos cargan en menos de 500ms con métricas de LCP un 40-70% más bajas que Next.js optimizado con SSG.
- Arquitectura de islands: no envía JS por defecto, solo hidrata los componentes interactivos.
- Mejor para: sitios orientados al contenido, páginas de marketing, blogs, documentación.

### Analog (2.0)

- El meta-framework de Angular. Potenciado por Vite y Nitro.
- Enrutamiento basado en archivos, rutas de API, carga de datos del lado del servidor.
- Soporta Angular v17-v20 (v21 próximamente), Vite 6.x/7.x incluyendo Rolldown-Vite.
- Mejor para: equipos Angular que quieren SSR y file-based routing sin configuración manual.

---

## Estrategias de Renderizado

| Estrategia | Cuándo Usar |
|----------|-------------|
| **SSG** (Static Site Generation) | Contenido que rara vez cambia. Mejor LCP. |
| **SSR** (Server-Side Rendering) | Contenido personalizado, páginas autenticadas. |
| **ISR** (Incremental Static Regeneration) | Contenido que cambia periódicamente. Lo mejor de ambos mundos. |
| **Streaming SSR** | Páginas largas donde el contenido above-the-fold puede enviarse inmediatamente. |
| **Partial Prerendering** | Shell estático + huecos dinámicos. Específico de Next.js 16+. |

### Cómo Elegir

1. **¿Necesitas SEO y primera carga rápida para contenido público?** SSG o ISR.
2. **¿El contenido es personalizado por usuario?** SSR.
3. **¿Es una aplicación interna detrás de autenticación?** SPA simple con Vite. No necesitas SSR.
4. **¿Es un sitio de contenido estático (blog, docs, marketing)?** Astro o SSG.
5. **¿Necesitas la mejor interactividad posible con menos JS?** SvelteKit o Astro islands.

---

## Errores Comunes

- **Usar un meta-framework cuando no necesitas SSR.** Los dashboards internos, paneles de administración y aplicaciones detrás de autenticación no se benefician del server-side rendering. Una SPA simple con Vite es más sencilla, más rápida de desarrollar y más fácil de desplegar. No agregues la complejidad de SSR para una aplicación que solo usan empleados.
- **Vendor lock-in de Next.js con características específicas de Vercel.** Depender de optimizaciones específicas de Vercel (edge middleware, servicio de optimización de imágenes) hace costoso migrar a otros proveedores. Si la portabilidad de plataforma importa, quédate con las características estándar.
- **Aplicar mal las estrategias de renderizado.** Usar SSG para datos que cambian cada pocos minutos significa contenido obsoleto o rebuilds constantes. Usar SSR para una página de marketing que nunca cambia desperdicia recursos del servidor. Ajusta la estrategia a la frecuencia real de actualización de los datos.
- **Sobre-ingeniería con streaming SSR.** Streaming SSR agrega complejidad significativa (Suspense boundaries, estados de loading, error boundaries) y solo es beneficioso cuando una página tiene una división clara entre above-the-fold y below-the-fold con dependencias de datos lentas. Para la mayoría de las páginas que cargan en menos de 1-2 segundos con SSR estándar, streaming agrega complejidad sin mejora perceptible.
- **La arquitectura de islands de Astro se desmorona cuando la mayor parte de la página es interactiva.** Astro sobresale cuando una página es mayormente contenido estático con algunos widgets interactivos. Si tu página es un 80% de componentes interactivos, las islands se convierten en la mayoría y pierdes la ventaja central de Astro.

---

## Puntos Clave

- No todo proyecto necesita un meta-framework. Las SPAs internas funcionan mejor con Vite simple.
- Next.js domina el mercado, pero evalúa si necesitas sus características o si agregan complejidad innecesaria.
- Elige la estrategia de renderizado basándote en la frecuencia de cambio de datos y los requisitos de personalización, no en tendencias.
- Analog es la respuesta de Angular al modelo de meta-framework: file-based routing, SSR y API routes con Vite.
- Astro es ideal para sitios de contenido; evítalo para aplicaciones altamente interactivas.
