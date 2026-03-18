# Mobile-First y Responsive Design

El diseño mobile-first y los principios responsive son enfoques complementarios que aseguran que las interfaces funcionen bien en cualquier tamaño de pantalla. Mobile-first establece la estrategia de diseño; responsive design proporciona las tecnicas de implementación.

---

## Diseño Mobile-First

**Disena primero para la ventana grafica mas pequena y con mas restricciones, luego mejora progresivamente para pantallas mas grandes.**

- Fuerza la priorizacion del contenido y las funcionalidades esenciales.
- CSS: escribe estilos base para móvil, luego usa media queries `min-width` para anadir complejidad para pantallas mas grandes.
- Targets tactiles: minimo 44x44px, con espaciado adecuado entre elementos interactivos.
- Navegación: menus hamburguesa para navegación secundaria, pero manten la navegación critica visible.
- Rendimiento: las redes moviles son mas lentas; optimiza los assets y difiere la carga no esencial.

**Ejemplo de CSS mobile-first:**

```css
/* Base: mobile styles */
.grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Enhancement: tablet and up */
@media (min-width: 48rem) {
  .grid {
    flex-direction: row;
    flex-wrap: wrap;
  }
  .grid > * {
    flex: 1 1 calc(50% - 0.5rem);
  }
}

/* Enhancement: desktop and up */
@media (min-width: 64rem) {
  .grid > * {
    flex: 1 1 calc(33.333% - 0.667rem);
  }
}
```

---

## Principios de Diseño Responsive

- **Layouts fluidos:** Usa unidades relativas (%, vw, vh, rem, em) y CSS Grid/Flexbox en lugar de anchos fijos en pixeles.
- **Breakpoints basados en contenido, no en dispositivos.** Anade breakpoints donde el layout se rompe, no en anchos arbitrarios de dispositivos.
- **Imagenes responsive:** `srcset`, `<picture>` y CSS `object-fit` para dimensionamiento apropiado de imagenes.
- **Container queries (CSS moderno):** Estiliza componentes basandote en el tamaño de su contenedor, no de la ventana grafica -- habilitando componentes responsive verdaderamente modulares.
- **Tipografia:** Escalas de tipo fluido usando `clamp()` para escalado suave entre ventanas graficas.

**Container queries -- componentes que responden a su contexto:**

```css
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}

@container card (max-width: 399px) {
  .card {
    display: flex;
    flex-direction: column;
  }
}
```

**Imagenes responsive:**

```html
<img
  src="photo-400.jpg"
  srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1200.jpg 1200w"
  sizes="(min-width: 64rem) 33vw, (min-width: 48rem) 50vw, 100vw"
  alt="Description"
  loading="lazy"
>
```

---

## Puntos Clave

- Mobile-first significa *empezar* con móvil, luego *mejorar* para viewports mas grandes -- no detenerse en móvil.
- Usa media queries `min-width` (mobile-first) en lugar de `max-width` (desktop-first).
- Establece breakpoints donde tu contenido se rompe, no en anchos de dispositivos especificos.
- Container queries permiten componentes verdaderamente modulares que se adaptan a su contexto.
- Targets tactiles de al menos 44x44px con espaciado adecuado entre elementos interactivos.
