import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Guía Frontend',
  description: 'Guía práctica para desarrolladores frontend — principios, Angular, y buenas prácticas',
  lang: 'es',

  head: [
    // Umami Analytics
    [
      'script',
      {
        defer: '',
        src: 'https://stats.pcc.fyi/script.js',
        'data-website-id': '907b7022-4e70-48cd-a9db-c8d8b72c3e1c',
      },
    ],
  ],

  // Ignore internal files
  srcExclude: ['**/MOCKUPS-PENDIENTES.md'],

  // Dead links are expected — markdown links use .md extension for GitHub compatibility
  ignoreDeadLinks: true,

  markdown: {
    defaultHighlightLang: 'text',
  },

  // Prevent Vue from interpreting {{ }} as template expressions.
  // Critical for Angular guides where {{ }} is component template syntax.
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: () => false,
      },
    },
  },

  themeConfig: {
    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Etapa 1', link: '/stage-1-foundations/' },
      { text: 'Etapa 2', link: '/stage-2-component-architecture/' },
      { text: 'Etapa 3', link: '/stage-3-state-and-data/' },
      { text: 'Etapa 4', link: '/stage-4-usability-and-design/' },
      { text: 'Etapa 5', link: '/stage-5-performance/' },
      { text: 'Etapa 6', link: '/stage-6-security-and-resilience/' },
      { text: 'Etapa 7', link: '/stage-7-testing-and-quality/' },
      { text: 'Etapa 8', link: '/stage-8-architecture-at-scale/' },
    ],

    sidebar: [
      {
        text: 'Guía',
        items: [
          { text: 'Empieza aquí', link: '/' },
          { text: 'Lineamientos', link: '/LINEAMIENTOS' },
        ],
      },
      {
        text: 'Etapa 1: Fundamentos',
        collapsed: true,
        items: [
          { text: 'Resumen', link: '/stage-1-foundations/' },
          {
            text: 'Actividades',
            collapsed: true,
            items: [
              { text: '1.0 Entorno', link: '/stage-1-foundations/actividades/1.0-entorno-de-desarrollo' },
              { text: '1.1 HTML semántico', link: '/stage-1-foundations/actividades/1.1-perfil-semantico' },
              { text: '1.2 Formularios', link: '/stage-1-foundations/actividades/1.2-formulario-contacto' },
              { text: '1.3 Box model + Flexbox', link: '/stage-1-foundations/actividades/1.3-box-model-flexbox' },
              { text: '1.4 CSS Grid', link: '/stage-1-foundations/actividades/1.4-css-grid' },
              { text: '1.5 JavaScript', link: '/stage-1-foundations/actividades/1.5-javascript-moderno' },
              { text: '1.6 TypeScript', link: '/stage-1-foundations/actividades/1.6-typescript-transformador' },
              { text: '1.6b Testing básico', link: '/stage-1-foundations/actividades/1.6b-testing-basico' },
              { text: '1.7 Accesibilidad', link: '/stage-1-foundations/actividades/1.7-accesibilidad-teclado' },
              { text: '1.8 DOM', link: '/stage-1-foundations/actividades/1.8-interactividad-dom' },
            ],
          },
          {
            text: 'Lecturas',
            collapsed: true,
            items: [
              { text: 'Pilares de diseño', link: '/stage-1-foundations/lecturas/00-pilares-de-diseno' },
              { text: 'HTML semántico', link: '/stage-1-foundations/lecturas/01-html-semantico' },
              { text: 'Formularios', link: '/stage-1-foundations/lecturas/02-formularios-nativos' },
              { text: 'CSS Box Model', link: '/stage-1-foundations/lecturas/03-css-box-model' },
              { text: 'CSS Flexbox', link: '/stage-1-foundations/lecturas/04-css-flexbox' },
              { text: 'CSS Grid', link: '/stage-1-foundations/lecturas/05-css-grid' },
              { text: 'JavaScript moderno', link: '/stage-1-foundations/lecturas/06-javascript-moderno' },
              { text: 'Arrays y closures', link: '/stage-1-foundations/lecturas/07-arrays-closures-event-loop' },
              { text: 'TypeScript', link: '/stage-1-foundations/lecturas/08-typescript-basico' },
              { text: 'Accesibilidad', link: '/stage-1-foundations/lecturas/09-accesibilidad-fundamentos' },
              { text: 'Entorno', link: '/stage-1-foundations/lecturas/10-entorno-de-desarrollo' },
              { text: 'Testing básico', link: '/stage-1-foundations/lecturas/11-testing-basico' },
            ],
          },
        ],
      },
      {
        text: 'Etapa 2: Componentes',
        collapsed: true,
        items: [
          { text: 'Resumen', link: '/stage-2-component-architecture/' },
        ],
      },
      {
        text: 'Etapa 3: Estado',
        collapsed: true,
        items: [
          { text: 'Resumen', link: '/stage-3-state-and-data/' },
        ],
      },
      {
        text: 'Etapa 4: Usabilidad',
        collapsed: true,
        items: [
          { text: 'Resumen', link: '/stage-4-usability-and-design/' },
        ],
      },
      {
        text: 'Etapa 5: Rendimiento',
        collapsed: true,
        items: [
          { text: 'Resumen', link: '/stage-5-performance/' },
        ],
      },
      {
        text: 'Etapa 6: Seguridad',
        collapsed: true,
        items: [
          { text: 'Resumen', link: '/stage-6-security-and-resilience/' },
        ],
      },
      {
        text: 'Etapa 7: Testing',
        collapsed: true,
        items: [
          { text: 'Resumen', link: '/stage-7-testing-and-quality/' },
        ],
      },
      {
        text: 'Etapa 8: Arquitectura',
        collapsed: true,
        items: [
          { text: 'Resumen', link: '/stage-8-architecture-at-scale/' },
        ],
      },
    ],

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
