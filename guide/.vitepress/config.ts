import { defineConfig } from 'vitepress'
import { escapeCodeBlocksPlugin } from './escape-code-blocks'

export default defineConfig({
  title: 'Guía Frontend',
  description: 'Guía práctica para desarrolladores frontend — principios, Angular, y buenas prácticas',
  lang: 'es',
  base: '/frontend-developer/',

  vite: {
    plugins: [escapeCodeBlocksPlugin()],
  },

  // Dark theme by default
  appearance: 'dark',

  head: [
    ['script', {
      defer: '',
      src: 'https://stats.pcc.fyi/script.js',
      'data-website-id': '907b7022-4e70-48cd-a9db-c8d8b72c3e1c',
    }],
  ],

  srcExclude: [
    '**/MOCKUPS-PENDIENTES.md',
    '**/LINEAMIENTOS.md',
    '**/FRAMEWORK-CONTENT-PLAN.md',
    // React files temporarily excluded — JSX in code blocks breaks Vue SFC compiler
    // TODO: fix with pre-build escaping script or VitePress upgrade
    '**/react/*.md',
  ],
  ignoreDeadLinks: true,

  // Map README.md files to index.html for proper directory routing
  rewrites: {
    'README.md': 'index.md',
    'stage-1-foundations/README.md': 'stage-1-foundations/index.md',
    'stage-2-component-architecture/README.md': 'stage-2-component-architecture/index.md',
    'stage-3-state-and-data/README.md': 'stage-3-state-and-data/index.md',
    'stage-4-usability-and-design/README.md': 'stage-4-usability-and-design/index.md',
    'stage-5-performance/README.md': 'stage-5-performance/index.md',
    'stage-6-security-and-resilience/README.md': 'stage-6-security-and-resilience/index.md',
    'stage-7-testing-and-quality/README.md': 'stage-7-testing-and-quality/index.md',
    'stage-8-architecture-at-scale/README.md': 'stage-8-architecture-at-scale/index.md',
  },

  markdown: {
    defaultHighlightLang: 'text',
  },

  vue: {
    template: {
      compilerOptions: {
        isCustomElement: () => false,
      },
    },
  },

  themeConfig: {
    logo: '/favicon.svg',
    siteTitle: 'Guía Frontend',

    nav: [
      { text: 'Inicio', link: '/' },
      {
        text: 'Etapas',
        items: [
          { text: '1 — Fundamentos', link: '/stage-1-foundations/' },
          { text: '2 — Componentes', link: '/stage-2-component-architecture/' },
          { text: '3 — Estado', link: '/stage-3-state-and-data/' },
          { text: '4 — Usabilidad', link: '/stage-4-usability-and-design/' },
          { text: '5 — Rendimiento', link: '/stage-5-performance/' },
          { text: '6 — Seguridad', link: '/stage-6-security-and-resilience/' },
          { text: '7 — Testing', link: '/stage-7-testing-and-quality/' },
          { text: '8 — Arquitectura', link: '/stage-8-architecture-at-scale/' },
        ],
      },
    ],

    sidebar: {
      // ========== ETAPA 1 ==========
      '/stage-1-foundations/': [
        {
          text: '← Todas las etapas',
          link: '/',
        },
        {
          text: 'Etapa 1: Fundamentos',
          items: [
            { text: 'Resumen y progreso', link: '/stage-1-foundations/' },
          ],
        },
        {
          text: '🟢 Actividades esenciales',
          items: [
            { text: '1.0 Entorno de desarrollo', link: '/stage-1-foundations/actividades/1.0-entorno-de-desarrollo' },
            { text: '1.1 HTML semántico', link: '/stage-1-foundations/actividades/1.1-perfil-semantico' },
            { text: '1.2 Formularios nativos', link: '/stage-1-foundations/actividades/1.2-formulario-contacto' },
            { text: '1.3 Box model + Flexbox', link: '/stage-1-foundations/actividades/1.3-box-model-flexbox' },
            { text: '1.4 CSS Grid', link: '/stage-1-foundations/actividades/1.4-css-grid' },
            { text: '1.5 JavaScript moderno', link: '/stage-1-foundations/actividades/1.5-javascript-moderno' },
            { text: '1.6 TypeScript', link: '/stage-1-foundations/actividades/1.6-typescript-transformador' },
            { text: '1.6b Testing básico', link: '/stage-1-foundations/actividades/1.6b-testing-basico' },
            { text: '1.7 Accesibilidad', link: '/stage-1-foundations/actividades/1.7-accesibilidad-teclado' },
            { text: '1.8 Interactividad DOM', link: '/stage-1-foundations/actividades/1.8-interactividad-dom' },
          ],
        },
        {
          text: '🟡 Recomendadas',
          collapsed: true,
          items: [
            { text: '1.9 Arrays y closures', link: '/stage-1-foundations/actividades/1.9-arrays-closures' },
            { text: '1.10 Mockup dashboard', link: '/stage-1-foundations/actividades/1.10-mockup-dashboard' },
          ],
        },
        {
          text: '🔴 Avanzadas',
          collapsed: true,
          items: [
            { text: '1.11 Event loop', link: '/stage-1-foundations/actividades/1.11-event-loop' },
            { text: '1.12 Stacking context', link: '/stage-1-foundations/actividades/1.12-stacking-context' },
            { text: '1.13 Validación integral', link: '/stage-1-foundations/actividades/1.13-validacion-integral' },
          ],
        },
        {
          text: '📖 Lecturas',
          collapsed: true,
          items: [
            { text: 'Pilares de diseño', link: '/stage-1-foundations/lecturas/00-pilares-de-diseno' },
            { text: 'HTML semántico', link: '/stage-1-foundations/lecturas/01-html-semantico' },
            { text: 'Formularios nativos', link: '/stage-1-foundations/lecturas/02-formularios-nativos' },
            { text: 'CSS Box Model', link: '/stage-1-foundations/lecturas/03-css-box-model' },
            { text: 'CSS Flexbox', link: '/stage-1-foundations/lecturas/04-css-flexbox' },
            { text: 'CSS Grid', link: '/stage-1-foundations/lecturas/05-css-grid' },
            { text: 'JavaScript moderno', link: '/stage-1-foundations/lecturas/06-javascript-moderno' },
            { text: 'Arrays, closures, event loop', link: '/stage-1-foundations/lecturas/07-arrays-closures-event-loop' },
            { text: 'TypeScript básico', link: '/stage-1-foundations/lecturas/08-typescript-basico' },
            { text: 'Accesibilidad', link: '/stage-1-foundations/lecturas/09-accesibilidad-fundamentos' },
            { text: 'Entorno de desarrollo', link: '/stage-1-foundations/lecturas/10-entorno-de-desarrollo' },
            { text: 'Testing básico', link: '/stage-1-foundations/lecturas/11-testing-basico' },
          ],
        },
        {
          text: 'Siguiente: Etapa 2 →',
          link: '/stage-2-component-architecture/',
        },
      ],

      // ========== ETAPA 2 ==========
      '/stage-2-component-architecture/': [
        { text: '← Todas las etapas', link: '/' },
        {
          text: 'Etapa 2: Componentes',
          items: [{ text: 'Resumen y progreso', link: '/stage-2-component-architecture/' }],
        },
        {
          text: '🟢 Actividades esenciales',
          items: [
            { text: '2.0 Setup Angular', link: '/stage-2-component-architecture/actividades/2.0-setup-angular' },
            { text: '2.1 Descomponer UI', link: '/stage-2-component-architecture/actividades/2.1-descomponer-ui' },
            { text: '2.2 Biblioteca componentes', link: '/stage-2-component-architecture/actividades/2.2-biblioteca-componentes' },
            { text: '2.3 SRP y refactorizar', link: '/stage-2-component-architecture/actividades/2.3-srp-refactorizar' },
            { text: '2.4 Compound component', link: '/stage-2-component-architecture/actividades/2.4-compound-component' },
          ],
        },
        {
          text: '🟡 Recomendadas',
          collapsed: true,
          items: [
            { text: '2.5 OCP, LSP, ISP', link: '/stage-2-component-architecture/actividades/2.5-ocp-lsp-isp' },
            { text: '2.6 Separación con hooks', link: '/stage-2-component-architecture/actividades/2.6-separacion-hooks' },
          ],
        },
        {
          text: '🔴 Avanzadas',
          collapsed: true,
          items: [
            { text: '2.7 Atomic Design', link: '/stage-2-component-architecture/actividades/2.7-atomic-design' },
            { text: '2.8 Validación integral', link: '/stage-2-component-architecture/actividades/2.8-validacion-integral' },
          ],
        },
        {
          text: '📖 Lecturas',
          collapsed: true,
          items: [
            { text: '¿Qué es un componente?', link: '/stage-2-component-architecture/lecturas/01-que-es-un-componente' },
            { text: 'API de componentes', link: '/stage-2-component-architecture/lecturas/02-api-de-componentes' },
            { text: 'SOLID en componentes', link: '/stage-2-component-architecture/lecturas/03-solid-en-componentes' },
            { text: 'Compound components', link: '/stage-2-component-architecture/lecturas/04-compound-components-y-patrones' },
            { text: 'Separación de responsabilidades', link: '/stage-2-component-architecture/lecturas/05-separacion-de-responsabilidades' },
            { text: 'Atomic Design', link: '/stage-2-component-architecture/lecturas/06-atomic-design' },
          ],
        },
        {
          text: '🅰️ Angular',
          collapsed: true,
          items: [
            { text: 'Setup Angular', link: '/stage-2-component-architecture/angular/00-setup-angular' },
            { text: 'Componentes en Angular', link: '/stage-2-component-architecture/angular/01-componentes-en-angular' },
            { text: 'API de componentes Angular', link: '/stage-2-component-architecture/angular/02-api-de-componentes-angular' },
          ],
        },
        {
          text: '⚛️ React',
          collapsed: true,
          items: [
            { text: 'Setup React', link: '/stage-2-component-architecture/react/00-setup-react' },
            { text: 'Componentes en React', link: '/stage-2-component-architecture/react/01-componentes-en-react' },
            { text: 'API de componentes', link: '/stage-2-component-architecture/react/02-api-de-componentes-react' },
          ],
        },
        {
          text: '💚 Vue',
          collapsed: true,
          items: [
            { text: 'Contenido Vue', link: '/stage-2-component-architecture/vue/' },
          ],
        },
        { text: '← Etapa 1', link: '/stage-1-foundations/' },
        { text: 'Siguiente: Etapa 3 →', link: '/stage-3-state-and-data/' },
      ],

      // ========== ETAPA 3 ==========
      '/stage-3-state-and-data/': [
        { text: '← Todas las etapas', link: '/' },
        {
          text: 'Etapa 3: Estado',
          items: [{ text: 'Resumen y progreso', link: '/stage-3-state-and-data/' }],
        },
        {
          text: '🟢 Actividades esenciales',
          items: [
            { text: '3.1 Data fetching', link: '/stage-3-state-and-data/actividades/3.1-data-fetching-4-estados' },
            { text: '3.2 URL state', link: '/stage-3-state-and-data/actividades/3.2-url-state' },
            { text: '3.3 Form state', link: '/stage-3-state-and-data/actividades/3.3-form-state' },
            { text: '3.4 Tipos de estado', link: '/stage-3-state-and-data/actividades/3.4-tipos-de-estado' },
            { text: '3.5 Wizard multi-paso', link: '/stage-3-state-and-data/actividades/3.5-wizard-multi-paso' },
          ],
        },
        {
          text: '🟡 Recomendadas',
          collapsed: true,
          items: [
            { text: '3.6 State machine', link: '/stage-3-state-and-data/actividades/3.6-state-machine' },
            { text: '3.7 Optimistic updates', link: '/stage-3-state-and-data/actividades/3.7-optimistic-updates' },
          ],
        },
        {
          text: '🔴 Avanzadas',
          collapsed: true,
          items: [
            { text: '3.8 Inmutabilidad', link: '/stage-3-state-and-data/actividades/3.8-inmutabilidad-closures' },
            { text: '3.9 Validación integral', link: '/stage-3-state-and-data/actividades/3.9-validacion-integral' },
          ],
        },
        {
          text: '📖 Lecturas',
          collapsed: true,
          items: [
            { text: 'Data fetching: 4 estados', link: '/stage-3-state-and-data/lecturas/01-data-fetching-4-estados' },
            { text: 'URL state', link: '/stage-3-state-and-data/lecturas/02-url-state' },
            { text: 'Form state', link: '/stage-3-state-and-data/lecturas/03-form-state' },
            { text: 'Tipos de estado', link: '/stage-3-state-and-data/lecturas/04-tipos-de-estado' },
            { text: 'Flujo unidireccional', link: '/stage-3-state-and-data/lecturas/05-flujo-unidireccional-e-inmutabilidad' },
            { text: 'Máquinas de estado', link: '/stage-3-state-and-data/lecturas/06-maquinas-de-estado' },
            { text: 'Anti-patterns de estado', link: '/stage-3-state-and-data/lecturas/07-anti-patterns-de-estado' },
          ],
        },
        {
          text: '🅰️ Angular',
          collapsed: true,
          items: [
            { text: 'Signals y estado', link: '/stage-3-state-and-data/angular/01-signals-y-estado' },
            { text: 'Servicios e inyección', link: '/stage-3-state-and-data/angular/02-servicios-e-inyeccion' },
            { text: 'HTTP y data fetching', link: '/stage-3-state-and-data/angular/03-http-y-data-fetching' },
            { text: 'Reactive Forms', link: '/stage-3-state-and-data/angular/04-reactive-forms' },
            { text: 'Router y URL state', link: '/stage-3-state-and-data/angular/05-router-y-url-state' },
          ],
        },
        {
          text: '⚛️ React',
          collapsed: true,
          items: [
            { text: 'Hooks y estado', link: '/stage-3-state-and-data/react/01-hooks-y-estado' },
            { text: 'Context y providers', link: '/stage-3-state-and-data/react/02-context-y-providers' },
            { text: 'Data fetching', link: '/stage-3-state-and-data/react/03-data-fetching-react' },
            { text: 'Formularios', link: '/stage-3-state-and-data/react/04-formularios-react' },
            { text: 'React Router', link: '/stage-3-state-and-data/react/05-react-router' },
          ],
        },
        {
          text: '💚 Vue',
          collapsed: true,
          items: [
            { text: 'Contenido Vue', link: '/stage-3-state-and-data/vue/' },
          ],
        },
        { text: '← Etapa 2', link: '/stage-2-component-architecture/' },
        { text: 'Siguiente: Etapa 4 →', link: '/stage-4-usability-and-design/' },
      ],

      // ========== ETAPA 4 ==========
      '/stage-4-usability-and-design/': [
        { text: '← Todas las etapas', link: '/' },
        {
          text: 'Etapa 4: Usabilidad',
          items: [{ text: 'Resumen y progreso', link: '/stage-4-usability-and-design/' }],
        },
        {
          text: '🟢 Actividades esenciales',
          items: [
            { text: '4.1 Tipografía y color', link: '/stage-4-usability-and-design/actividades/4.1-tipografia-color' },
            { text: '4.2 Espaciado y formularios', link: '/stage-4-usability-and-design/actividades/4.2-espaciado-formularios' },
            { text: '4.3 Heurísticas de Nielsen', link: '/stage-4-usability-and-design/actividades/4.3-heuristicas-nielsen' },
            { text: '4.4 Dashboard responsivo', link: '/stage-4-usability-and-design/actividades/4.4-dashboard-responsivo' },
          ],
        },
        {
          text: '🟡 Recomendadas',
          collapsed: true,
          items: [
            { text: '4.5 Fitts, Hick, Gestalt', link: '/stage-4-usability-and-design/actividades/4.5-fitts-hick-gestalt' },
            { text: '4.6 Skeleton screens', link: '/stage-4-usability-and-design/actividades/4.6-skeleton-screens' },
            { text: '4.7 Dark patterns', link: '/stage-4-usability-and-design/actividades/4.7-dark-patterns' },
          ],
        },
        {
          text: '🔴 Avanzadas',
          collapsed: true,
          items: [
            { text: '4.8 Accesibilidad y color', link: '/stage-4-usability-and-design/actividades/4.8-accesibilidad-color' },
            { text: '4.9 Validación integral', link: '/stage-4-usability-and-design/actividades/4.9-validacion-integral' },
          ],
        },
        {
          text: '📖 Lecturas',
          collapsed: true,
          items: [
            { text: 'Tipografía y jerarquía', link: '/stage-4-usability-and-design/lecturas/01-tipografia-y-jerarquia' },
            { text: 'Color para UI', link: '/stage-4-usability-and-design/lecturas/02-color-para-ui' },
            { text: 'Sistema de espaciado', link: '/stage-4-usability-and-design/lecturas/03-sistema-de-espaciado' },
            { text: 'Diseño de formularios', link: '/stage-4-usability-and-design/lecturas/04-diseno-de-formularios' },
            { text: 'Heurísticas de Nielsen', link: '/stage-4-usability-and-design/lecturas/05-heuristicas-de-nielsen' },
            { text: 'Fitts, Hick, Gestalt', link: '/stage-4-usability-and-design/lecturas/06-fitts-hick-gestalt' },
            { text: 'Mobile-first y responsive', link: '/stage-4-usability-and-design/lecturas/07-mobile-first-y-responsive' },
            { text: 'Anti-patterns de usabilidad', link: '/stage-4-usability-and-design/lecturas/08-anti-patterns-de-usabilidad' },
          ],
        },
        {
          text: '🅰️ Angular',
          collapsed: true,
          items: [
            { text: 'Angular Material y CDK', link: '/stage-4-usability-and-design/angular/01-angular-material-y-cdk' },
          ],
        },
        {
          text: '⚛️ React',
          collapsed: true,
          items: [
            { text: 'UI Libraries React', link: '/stage-4-usability-and-design/react/01-ui-libraries-react' },
          ],
        },
        {
          text: '💚 Vue',
          collapsed: true,
          items: [
            { text: 'Contenido Vue', link: '/stage-4-usability-and-design/vue/' },
          ],
        },
        { text: '← Etapa 3', link: '/stage-3-state-and-data/' },
        { text: 'Siguiente: Etapa 5 →', link: '/stage-5-performance/' },
      ],

      // ========== ETAPA 5 ==========
      '/stage-5-performance/': [
        { text: '← Todas las etapas', link: '/' },
        {
          text: 'Etapa 5: Rendimiento',
          items: [{ text: 'Resumen y progreso', link: '/stage-5-performance/' }],
        },
        {
          text: '🟢 Actividades esenciales',
          items: [
            { text: '5.1 Core Web Vitals', link: '/stage-5-performance/actividades/5.1-core-web-vitals' },
            { text: '5.2 Lazy loading', link: '/stage-5-performance/actividades/5.2-lazy-loading' },
            { text: '5.3 Bundle optimization', link: '/stage-5-performance/actividades/5.3-bundle-optimization' },
          ],
        },
        {
          text: '🟡 Recomendadas',
          collapsed: true,
          items: [
            { text: '5.4 Virtualización', link: '/stage-5-performance/actividades/5.4-virtualizacion' },
            { text: '5.5 Memoización', link: '/stage-5-performance/actividades/5.5-memoizacion' },
          ],
        },
        {
          text: '🔴 Avanzadas',
          collapsed: true,
          items: [
            { text: '5.6 Medición real', link: '/stage-5-performance/actividades/5.6-medicion-real' },
            { text: '5.7 Validación integral', link: '/stage-5-performance/actividades/5.7-validacion-integral' },
          ],
        },
        {
          text: '📖 Lecturas',
          collapsed: true,
          items: [
            { text: 'Core Web Vitals y RAIL', link: '/stage-5-performance/lecturas/01-core-web-vitals-y-rail' },
            { text: 'Lazy loading y code splitting', link: '/stage-5-performance/lecturas/02-lazy-loading-y-code-splitting' },
            { text: 'Bundle optimization', link: '/stage-5-performance/lecturas/03-bundle-optimization' },
            { text: 'Virtualización', link: '/stage-5-performance/lecturas/04-virtualizacion' },
            { text: 'Memoización', link: '/stage-5-performance/lecturas/05-memoizacion' },
            { text: 'Anti-patterns de rendimiento', link: '/stage-5-performance/lecturas/06-anti-patterns-de-rendimiento' },
          ],
        },
        {
          text: '🅰️ Angular',
          collapsed: true,
          items: [
            { text: 'Rendimiento en Angular', link: '/stage-5-performance/angular/01-rendimiento-en-angular' },
          ],
        },
        {
          text: '⚛️ React',
          collapsed: true,
          items: [
            { text: 'Rendimiento en React', link: '/stage-5-performance/react/01-rendimiento-en-react' },
          ],
        },
        {
          text: '💚 Vue',
          collapsed: true,
          items: [
            { text: 'Contenido Vue', link: '/stage-5-performance/vue/' },
          ],
        },
        { text: '← Etapa 4', link: '/stage-4-usability-and-design/' },
        { text: 'Siguiente: Etapa 6 →', link: '/stage-6-security-and-resilience/' },
      ],

      // ========== ETAPA 6 ==========
      '/stage-6-security-and-resilience/': [
        { text: '← Todas las etapas', link: '/' },
        {
          text: 'Etapa 6: Seguridad',
          items: [{ text: 'Resumen y progreso', link: '/stage-6-security-and-resilience/' }],
        },
        {
          text: '🟢 Actividades esenciales',
          items: [
            { text: '6.1 Prevenir XSS', link: '/stage-6-security-and-resilience/actividades/6.1-xss-prevencion' },
            { text: '6.2 Error states', link: '/stage-6-security-and-resilience/actividades/6.2-error-states' },
            { text: '6.3 Auth segura', link: '/stage-6-security-and-resilience/actividades/6.3-auth-segura' },
            { text: '6.4 Validación doble', link: '/stage-6-security-and-resilience/actividades/6.4-validacion-doble' },
          ],
        },
        {
          text: '🟡 Recomendadas',
          collapsed: true,
          items: [
            { text: '6.5 CSRF y CSP', link: '/stage-6-security-and-resilience/actividades/6.5-csrf-csp' },
            { text: '6.6 Optimistic + retry', link: '/stage-6-security-and-resilience/actividades/6.6-optimistic-retry' },
            { text: '6.8 OIDC Login', link: '/stage-6-security-and-resilience/actividades/6.8-oidc-login' },
            { text: '6.9 RBAC', link: '/stage-6-security-and-resilience/actividades/6.9-rbac' },
          ],
        },
        {
          text: '🔴 Avanzadas',
          collapsed: true,
          items: [
            { text: '6.7 Validación integral', link: '/stage-6-security-and-resilience/actividades/6.7-validacion-integral' },
            { text: '6.10 App offline-tolerant', link: '/stage-6-security-and-resilience/actividades/6.10-resiliencia-offline' },
            { text: '6.11 Protección canal', link: '/stage-6-security-and-resilience/actividades/6.11-proteccion-canal' },
          ],
        },
        {
          text: '📖 Lecturas',
          collapsed: true,
          items: [
            { text: 'XSS, CSRF y CSP', link: '/stage-6-security-and-resilience/lecturas/01-xss-csrf-csp' },
            { text: 'Autenticación segura', link: '/stage-6-security-and-resilience/lecturas/02-autenticacion-segura' },
            { text: 'Validación de entradas', link: '/stage-6-security-and-resilience/lecturas/03-validacion-de-entradas' },
            { text: 'Error boundaries', link: '/stage-6-security-and-resilience/lecturas/04-error-boundaries-y-degradacion' },
            { text: 'Optimistic updates y retry', link: '/stage-6-security-and-resilience/lecturas/05-optimistic-updates-y-retry' },
            { text: 'Anti-patterns de seguridad', link: '/stage-6-security-and-resilience/lecturas/06-anti-patterns-de-seguridad' },
            { text: 'Seguridad avanzada', link: '/stage-6-security-and-resilience/lecturas/07-seguridad-avanzada-frontend' },
            { text: 'OIDC (OpenID Connect)', link: '/stage-6-security-and-resilience/lecturas/08-oidc' },
            { text: 'RBAC en frontend', link: '/stage-6-security-and-resilience/lecturas/09-rbac-en-frontend' },
            { text: 'Resiliencia en navegador', link: '/stage-6-security-and-resilience/lecturas/10-resiliencia-en-navegador' },
            { text: 'Protección canal y payload', link: '/stage-6-security-and-resilience/lecturas/11-proteccion-canal-y-payload' },
          ],
        },
        {
          text: '🅰️ Angular',
          collapsed: true,
          items: [
            { text: 'Seguridad en Angular', link: '/stage-6-security-and-resilience/angular/01-seguridad-en-angular' },
          ],
        },
        {
          text: '⚛️ React',
          collapsed: true,
          items: [
            { text: 'Seguridad en React', link: '/stage-6-security-and-resilience/react/01-seguridad-en-react' },
          ],
        },
        {
          text: '💚 Vue',
          collapsed: true,
          items: [
            { text: 'Contenido Vue', link: '/stage-6-security-and-resilience/vue/' },
          ],
        },
        { text: '← Etapa 5', link: '/stage-5-performance/' },
        { text: 'Siguiente: Etapa 7 →', link: '/stage-7-testing-and-quality/' },
      ],

      // ========== ETAPA 7 ==========
      '/stage-7-testing-and-quality/': [
        { text: '← Todas las etapas', link: '/' },
        {
          text: 'Etapa 7: Testing',
          items: [{ text: 'Resumen y progreso', link: '/stage-7-testing-and-quality/' }],
        },
        {
          text: '🟢 Actividades esenciales',
          items: [
            { text: '7.1 Testing Library', link: '/stage-7-testing-and-quality/actividades/7.1-testing-library' },
            { text: '7.2 MSW data fetching', link: '/stage-7-testing-and-quality/actividades/7.2-msw-data-fetching' },
            { text: '7.3 E2E Playwright', link: '/stage-7-testing-and-quality/actividades/7.3-e2e-playwright' },
          ],
        },
        {
          text: '🟡 Recomendadas',
          collapsed: true,
          items: [
            { text: '7.4 Code review', link: '/stage-7-testing-and-quality/actividades/7.4-code-review' },
            { text: '7.5 CI pipeline', link: '/stage-7-testing-and-quality/actividades/7.5-ci-pipeline' },
            { text: '7.6 Accesibilidad en CI', link: '/stage-7-testing-and-quality/actividades/7.6-a11y-ci' },
          ],
        },
        {
          text: '🔴 Avanzadas',
          collapsed: true,
          items: [
            { text: '7.7 Snapshots y flaky tests', link: '/stage-7-testing-and-quality/actividades/7.7-snapshots-flaky' },
            { text: '7.8 Validación integral', link: '/stage-7-testing-and-quality/actividades/7.8-validacion-integral' },
          ],
        },
        {
          text: '📖 Lecturas',
          collapsed: true,
          items: [
            { text: 'Escribir buenos tests', link: '/stage-7-testing-and-quality/lecturas/01-escribir-buenos-tests' },
            { text: 'Component testing', link: '/stage-7-testing-and-quality/lecturas/02-component-testing' },
            { text: 'E2E con Playwright', link: '/stage-7-testing-and-quality/lecturas/03-e2e-con-playwright' },
            { text: 'Code review', link: '/stage-7-testing-and-quality/lecturas/04-code-review' },
          ],
        },
        {
          text: '🅰️ Angular',
          collapsed: true,
          items: [
            { text: 'Testing en Angular', link: '/stage-7-testing-and-quality/angular/01-testing-en-angular' },
          ],
        },
        {
          text: '⚛️ React',
          collapsed: true,
          items: [
            { text: 'Testing en React', link: '/stage-7-testing-and-quality/react/01-testing-en-react' },
          ],
        },
        {
          text: '💚 Vue',
          collapsed: true,
          items: [
            { text: 'Contenido Vue', link: '/stage-7-testing-and-quality/vue/' },
          ],
        },
        { text: '← Etapa 6', link: '/stage-6-security-and-resilience/' },
        { text: 'Siguiente: Etapa 8 →', link: '/stage-8-architecture-at-scale/' },
      ],

      // ========== ETAPA 8 ==========
      '/stage-8-architecture-at-scale/': [
        { text: '← Todas las etapas', link: '/' },
        {
          text: 'Etapa 8: Arquitectura',
          items: [{ text: 'Resumen y progreso', link: '/stage-8-architecture-at-scale/' }],
        },
        {
          text: '🟢 Actividades esenciales',
          items: [
            { text: '8.1 Organización por features', link: '/stage-8-architecture-at-scale/actividades/8.1-organizacion-features' },
          ],
        },
        {
          text: '🟡 Recomendadas',
          collapsed: true,
          items: [
            { text: '8.2 Clean Architecture', link: '/stage-8-architecture-at-scale/actividades/8.2-clean-architecture' },
            { text: '8.3 Design system', link: '/stage-8-architecture-at-scale/actividades/8.3-design-system' },
            { text: '8.4 API type-safe', link: '/stage-8-architecture-at-scale/actividades/8.4-api-type-safe' },
            { text: '8.5 Estrategias de renderizado', link: '/stage-8-architecture-at-scale/actividades/8.5-estrategias-renderizado' },
          ],
        },
        {
          text: '🔴 Avanzadas',
          collapsed: true,
          items: [
            { text: '8.6 Vite y build', link: '/stage-8-architecture-at-scale/actividades/8.6-vite-build' },
            { text: '8.7 Monorepos y micro-frontends', link: '/stage-8-architecture-at-scale/actividades/8.7-monorepos-microfrontends' },
            { text: '8.8 Validación integral', link: '/stage-8-architecture-at-scale/actividades/8.8-validacion-integral' },
            { text: '8.9 Almacenamiento browser', link: '/stage-8-architecture-at-scale/actividades/8.9-almacenamiento-browser' },
          ],
        },
        {
          text: '📖 Lecturas',
          collapsed: true,
          items: [
            { text: 'Organización por features', link: '/stage-8-architecture-at-scale/lecturas/01-organizacion-por-features' },
            { text: 'Clean Architecture', link: '/stage-8-architecture-at-scale/lecturas/02-clean-architecture-frontend' },
            { text: 'Design systems', link: '/stage-8-architecture-at-scale/lecturas/03-design-systems' },
            { text: 'Patrones de API', link: '/stage-8-architecture-at-scale/lecturas/04-patrones-de-api' },
            { text: 'Meta-frameworks', link: '/stage-8-architecture-at-scale/lecturas/05-meta-frameworks-y-renderizado' },
            { text: 'Micro-frontends', link: '/stage-8-architecture-at-scale/lecturas/06-micro-frontends' },
            { text: 'Almacenamiento en navegador', link: '/stage-8-architecture-at-scale/lecturas/07-almacenamiento-en-navegador' },
          ],
        },
        {
          text: '🅰️ Angular',
          collapsed: true,
          items: [
            { text: 'Arquitectura Angular', link: '/stage-8-architecture-at-scale/angular/01-arquitectura-angular' },
          ],
        },
        {
          text: '⚛️ React',
          collapsed: true,
          items: [
            { text: 'Arquitectura React', link: '/stage-8-architecture-at-scale/react/01-arquitectura-react' },
          ],
        },
        {
          text: '💚 Vue',
          collapsed: true,
          items: [
            { text: 'Contenido Vue', link: '/stage-8-architecture-at-scale/vue/' },
          ],
        },
        { text: '← Etapa 7', link: '/stage-7-testing-and-quality/' },
      ],
    },

    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/PandinoCloudCrew/frontend-developer' },
    ],

    footer: {
      message: 'Guía para Desarrolladores Frontend — PandinoCloudCrew',
    },

    outline: {
      level: [2, 3],
      label: 'En esta página',
    },

    docFooter: {
      prev: 'Anterior',
      next: 'Siguiente',
    },

    returnToTopLabel: 'Volver arriba',
    sidebarMenuLabel: 'Menú',
    darkModeSwitchLabel: 'Tema',
  },
})
