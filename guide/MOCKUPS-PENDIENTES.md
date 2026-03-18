# Mockups Pendientes

> Lista de mockups que deben crearse en `frontend-guide.pen` y exportarse a cada etapa.

## Existentes ✓

| Etapa | Archivo | Actividad |
|-------|---------|-----------|
| 1 | `1.1-perfil-semantico.png` | HTML semántico sin CSS |
| 1 | `1.2-formulario-contacto.png` | Formulario con validación nativa |
| 1 | `1.4-css-grid-dashboard.png` | Dashboard con CSS Grid |

## Pendientes — Etapa 2 (Angular + Tailwind)

| Archivo | Actividad | Qué mostrar | Estilo |
|---------|-----------|-------------|--------|
| `2.0-hello-angular.png` | 2.0 Setup Angular | `ng serve` mostrando componente de saludo con input y binding | Angular default + Tailwind |
| `2.2-biblioteca-componentes.png` | 2.2 Biblioteca 3 niveles | Button, SearchBar, ProductCard compuestos | spartan/ui style |
| `2.4-compound-tabs.png` | 2.4 Compound Tabs | TabGroup con 3 tabs, uno activo con indicador, contenido | spartan/ui Tabs |

## Pendientes — Etapa 3 (Estado)

| Archivo | Actividad | Qué mostrar | Estilo |
|---------|-----------|-------------|--------|
| `3.1-data-fetching-estados.png` | 3.1 Data Fetching | 4 paneles: loading (skeleton), success (datos), error (retry), empty | spartan/ui + Tailwind |
| `3.2-lista-filtrable.png` | 3.2 URL State | Lista con filtros, sort, paginación. URL visible con query params | spartan/ui |
| `3.5-wizard-checkout.png` | 3.5 Wizard | Wizard de 3 pasos con indicador de progreso, paso actual con formulario | spartan/ui |

## Pendientes — Etapa 4 (Usabilidad)

| Archivo | Actividad | Qué mostrar | Estilo |
|---------|-----------|-------------|--------|
| `4.1-type-scale-palette.png` | 4.1 Tipografía + Color | Type scale (xs a 3xl) + paleta de 3 capas (brand, neutral, semantic) | Tailwind tokens |
| `4.4-dashboard-responsive.png` | 4.4 Dashboard Responsivo | 3 viewports lado a lado: mobile (1 col), tablet (2 col), desktop (sidebar + main) | Tailwind responsive |
| `4.6-skeleton-screens.png` | 4.6 Skeletons | Lado a lado: skeleton pulsante vs contenido cargado, formas coinciden | spartan/ui |

## Pendientes — Etapa 5 (Rendimiento)

No requiere mockups de diseño. Los mockups serían capturas de herramientas (Lighthouse, DevTools Performance), no diseños en Pencil.

## Pendientes — Etapa 6 (Seguridad)

| Archivo | Actividad | Qué mostrar | Estilo |
|---------|-----------|-------------|--------|
| `6.2-error-states-ui.png` | 6.2 Error States | 4 estados de una misma vista: loading, success, error + retry btn, empty | spartan/ui |

## Reglas de diseño (de LINEAMIENTOS.md)

Para Etapas 2+:
- Colores: `slate-50` fondos, `slate-900` texto, `slate-200` bordes, un accent
- Tipografía: Inter, 14px base
- Bordes: `4px` radius
- Espaciado: múltiplos de 4px (4, 8, 12, 16, 24, 32)
- Inputs: borde `slate-300`, padding 8px 12px
- Botones: `slate-900` + texto blanco (primary), borde `slate-300` (secondary)
