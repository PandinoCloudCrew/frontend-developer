# Design Systems y Bibliotecas de Componentes

> Cómo construir y consumir design systems en frontend. Cubre el patrón Headless UI, shadcn/ui, Design Tokens y las mejores prácticas para escalar componentes compartidos.

---

## Por Qué Esto Importa

Un design system es la infraestructura visual de un producto. Sin uno, cada equipo reinventa botones, modales y formularios con estilos inconsistentes, comportamiento diferente y bugs de accesibilidad únicos. Con uno bien implementado, los equipos ensamblan interfaces consistentes y accesibles a partir de primitivas probadas.

Pero un design system prematuro o mal gobernado puede ser peor que no tener ninguno --- se convierte en un cuello de botella que ralentiza a todos los equipos.

---

## El Patrón Headless UI

El patrón dominante en 2026: **primitivas de componentes sin estilo y accesibles** que tú mismo estilizas.

| Biblioteca | Soporte de Frameworks | Notas |
|---------|-------------------|-------|
| **Radix UI** | Solo React | 130M descargas mensuales. La biblioteca headless más grande. |
| **Base UI** | React | Respaldada por MUI, ingeniería dedicada a tiempo completo. |
| **Ark UI** | React, Vue, Solid | Máquinas de estado basadas en XState. La mejor biblioteca headless cross-framework. |
| **Headless UI** | React, Vue | Proyecto de Tailwind Labs. Enfocada en la integración con Tailwind. |
| **React Aria** | React | Primitivas accessibility-first de Adobe. La cobertura de a11y más completa. |

**Por qué headless:** separar comportamiento (keyboard handling, ARIA attributes, focus management) de estilos te da control total sobre la apariencia sin sacrificar accesibilidad.

---

## shadcn/ui

No es una biblioteca de componentes: es una **colección de componentes de copiar y pegar que tú posees**.

- **75K estrellas en GitHub** y creciendo.
- Ahora soporta tanto Radix como Base UI como capas de primitivas.
- Se agregó un Visual Builder para generar componentes.
- Originó el patrón de "UI de copiar y pegar" que muchas otras bibliotecas ahora siguen.

**Ventaja:** posees el código, puedes modificarlo sin esperar un release upstream. **Riesgo:** sin gobernanza, 15 equipos producen 15 variantes diferentes de Button.

---

## Design Tokens (Estándar W3C)

La **Design Tokens Specification (2025.10)** alcanzó su primera versión estable:

- Formato agnóstico del proveedor para compartir decisiones de diseño entre herramientas y plataformas.
- Soporta tematización, multi-marca, modos claro/oscuro, variantes de accesibilidad.
- Soporte completo para espacios de color Display P3, Oklch y CSS Color Module 4.
- Cross-platform: un archivo de tokens genera código para iOS, Android, web y Flutter.
- Adoptado por Figma, Penpot, Sketch, Framer, Supernova, zeroheight y otros.

```json
{
  "color": {
    "primary": {
      "$value": "#2563eb",
      "$type": "color",
      "$description": "Primary brand color"
    },
    "primary-hover": {
      "$value": "#1d4ed8",
      "$type": "color"
    }
  },
  "spacing": {
    "sm": { "$value": "8px", "$type": "dimension" },
    "md": { "$value": "16px", "$type": "dimension" },
    "lg": { "$value": "24px", "$type": "dimension" }
  }
}
```

Los tokens se transforman a variables CSS, objetos de tema JavaScript/TypeScript o formatos nativos de cada plataforma usando herramientas como Style Dictionary o Cobalt UI.

---

## Cuándo Crear un Design System

**Demasiado pronto:** antes de tener 3-5 superficies de producto distintas usando patrones similares.

**El momento correcto:** cuando los mismos patrones (botones, formularios, tablas, modales) se repiten entre equipos y la inconsistencia visual se vuelve un problema real para los usuarios.

**Cómo empezar:**
1. Comienza con una carpeta de componentes compartidos en el repositorio.
2. Documenta los patrones con Storybook o similar.
3. Formaliza en un paquete/librería cuando los patrones se estabilicen.
4. Establece gobernanza: quién puede contribuir, cómo se revisan cambios, ciclo de releases.

---

## Errores Comunes

- **Creación prematura de sistema de diseño.** Construir un sistema de diseño antes de tener suficiente superficie de producto significa codificar suposiciones que estarán equivocadas. Necesitas al menos 3-5 superficies distintas antes de que las abstracciones se vuelvan claras.
- **El equipo del sistema de diseño como cuello de botella.** Cuando cada cambio de componente requiere un PR al repositorio del sistema de diseño, revisión por el equipo del sistema de diseño y un ciclo de lanzamiento, los equipos de producto se ralentizan. Habilita la contribución de los equipos de producto con guías claras y testing automatizado.
- **Deriva de componentes de copiar y pegar (shadcn sin gobernanza).** Sin gobernanza, 15 variantes diferentes de Button entre equipos. Establece un mecanismo de sincronización: auditorías periódicas o verificaciones automatizadas que señalen la divergencia.
- **Eliminar comportamiento de accesibilidad durante la estilización.** Los componentes headless proporcionan keyboard handling, focus management y ARIA attributes de forma nativa. Cuando los desarrolladores sobrescriben estos comportamientos durante la estilización personalizada, el componente se vuelve menos accesible que un `<div>`.
- **Riesgo de dependencia de biblioteca.** Construir todo sobre una biblioteca de terceros crea un punto único de fallo. Las bibliotecas se adquieren, se abandonan o cambian de dirección. Mitiga con una capa de abstracción para que intercambiar la implementación subyacente no requiera reescribir cada consumidor.

---

## Puntos Clave

- Los componentes headless (Radix, Ark UI, React Aria) separan comportamiento de estilos: accesibilidad gratis, control visual total.
- shadcn/ui popularizó el patrón de copiar y poseer componentes. Poderoso, pero requiere gobernanza.
- Design Tokens (W3C) son el estándar para compartir decisiones de diseño entre plataformas y herramientas.
- No crees un design system antes de tener patrones probados en 3-5 superficies de producto.
- El equipo del design system debe ser un habilitador, no un gatekeeper.
