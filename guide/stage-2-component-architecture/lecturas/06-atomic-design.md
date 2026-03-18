# Atomic Design

Atomic Design es una metodologia creada por Brad Frost para organizar componentes de UI en cinco niveles jerarquicos, desde los bloques mas basicos hasta paginas completas.

---

## Los Cinco Niveles

| Nivel | Descripcion | Ejemplos |
|-------|-------------|----------|
| **Atoms** | Bloques de construccion basicos de UI | Button, Input, Icon, Label |
| **Molecules** | Grupos de atoms funcionando juntos | Barra de busqueda (input + button), Campo de formulario (label + input + error) |
| **Organisms** | Secciones de UI complejas compuestas de molecules | Barra de navegacion, Cuadricula de tarjetas de producto, Formulario de registro |
| **Templates** | Layouts a nivel de pagina sin datos reales | Layout de dashboard, Layout de pagina de articulo |
| **Pages** | Templates poblados con contenido real | Dashboard real con datos en vivo |

## Perspectiva 2025

- Para **proyectos centrados en UI con poca complejidad de negocio**, Atomic Design funciona bien como metodologia organizativa.
- Para **aplicaciones complejas con logica de negocio significativa**, metodologias como **Feature-Sliced Design** o **Modular Architecture** son mas adecuadas porque organizan por dominio de negocio en lugar de solo por granularidad de UI.
- Atomic Design y Compound Components son complementarios — Atomic Design proporciona estructura y jerarquia, mientras que Compound Components mejoran la flexibilidad.
- Muchos equipos usan un enfoque hibrido: Atomic Design para el design system/biblioteca de componentes compartida, organizacion basada en features para el codigo de la aplicacion.

## Errores Comunes

- **Ambiguedad en los niveles causando debates interminables.** Los equipos pierden horas debatiendo si un componente es un "molecule" u un "organism". Si la clasificacion no es obvia, la distincion no esta anadiendo valor. Usa Atomic Design como un modelo mental flexible, no como una taxonomia rigida.

## Puntos Clave

- Atomic Design organiza componentes en cinco niveles: atoms, molecules, organisms, templates y pages.
- Funciona mejor para design systems y bibliotecas de componentes compartidas.
- Para aplicaciones con logica de negocio compleja, complementalo con organizacion basada en features o dominios.
- Usalo como modelo mental flexible, no como taxonomia rigida que genere debates improductivos.
