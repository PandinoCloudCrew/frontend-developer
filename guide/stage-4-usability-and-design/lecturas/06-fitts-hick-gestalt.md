# Ley de Fitts, Ley de Hick y Principios Gestalt

Tres leyes fundamentales de la psicologia aplicadas al diseno de interfaces. Estas leyes explican como los usuarios interactuan con elementos visuales, toman decisiones y perciben agrupaciones, y proporcionan guias practicas para diseno de UI.

---

## Ley de Fitts

**El tiempo para alcanzar un objetivo es una funcion de la distancia al objetivo y su tamano.**

- **Haz los objetivos clicables lo suficientemente grandes** -- minimo 44x44px para targets tactiles (Apple HIG), 48x48dp (Material Design).
- **Coloca las acciones de uso frecuente al alcance facil** -- acciones primarias en la zona del pulgar en movil, cerca del area de foco actual en escritorio.
- **Reduce la distancia** entre acciones relacionadas (por ejemplo, un boton "Guardar" cerca del formulario que guarda).
- Especialmente critico para el diseno movil donde las interacciones precisas son desafiantes.
- **Ventaja de bordes y esquinas:** Los botones en los bordes o esquinas de la pantalla son efectivamente targets de profundidad infinita (el cursor se detiene en el borde), haciendolos mas rapidos de alcanzar.

**Aplicacion practica:**
- Botones de accion primaria deben ser mas grandes que los secundarios.
- En movil, coloca las acciones principales en la parte inferior de la pantalla (zona del pulgar).
- No disperses acciones relacionadas en extremos opuestos de la interfaz.

---

## Ley de Hick

**El tiempo para tomar una decision aumenta con el numero y la complejidad de las opciones.**

- **Reduce las opciones:** Agrupa opciones relacionadas, usa progressive disclosure, limita los elementos de navegacion visibles.
- **Simplifica la navegacion** categorizando y agrupando opciones.
- **Ayudas de decision:** Recomienda valores predeterminados, resalta opciones populares, proporciona herramientas de comparacion.
- **Busqueda y filtros** como alternativas a escanear listas largas.

**Aplicacion practica:**
- Un menu de navegacion con 3-7 items es mas facil de procesar que uno con 15.
- Para formularios con muchas opciones, usa un combobox con busqueda en lugar de un dropdown largo.
- En e-commerce, usa "Mas vendidos" o "Recomendados" para reducir la carga de decision.
- Progressive disclosure: muestra primero las opciones esenciales, revela las avanzadas bajo demanda.

---

## Principios Gestalt en UI

Los principios de la psicologia Gestalt describen como los humanos perciben y agrupan naturalmente los elementos visuales:

| Principio | Aplicacion en UI |
|-----------|------------------|
| **Proximidad** | Agrupa elementos relacionados cerca entre si (etiquetas de formulario cerca de los inputs, acciones relacionadas juntas) |
| **Similitud** | Estilo consistente para elementos similares (todos los enlaces de un color, todos los botones de una forma) |
| **Cierre** | Los usuarios completan formas incompletas (indicadores de progreso, layouts de tarjetas con contenido recortado) |
| **Continuidad** | Alinea elementos para crear flujo visual (cuadriculas, lineas de tiempo, breadcrumbs) |
| **Region Comun** | Usa bordes, fondos o tarjetas para agrupar contenido relacionado |
| **Figura/Fondo** | Contraste claro entre contenido principal y fondo; overlays de modales |

### Proximidad en la Practica

El principio de proximidad es quizas el mas directamente aplicable al desarrollo frontend. Afecta todo, desde formularios hasta layouts de pagina:

- Las etiquetas de formulario deben estar mas cerca de su campo asociado que del campo anterior.
- Los botones de accion (Guardar, Cancelar) deben estar juntos, no dispersos.
- Los items de navegacion relacionados se agrupan visualmente mediante proximidad.

### Similitud en la Practica

Cuando los elementos se ven iguales, los usuarios asumen que se comportan igual:

- Todos los botones primarios deben tener el mismo estilo en toda la aplicacion.
- Los enlaces siempre deben ser del mismo color y tener el mismo comportamiento visual (underline, hover).
- Los iconos que representan la misma accion deben ser identicos en todas las pantallas.

### Region Comun en la Practica

Agrupar visualmente contenido relacionado usando contenedores:

- Cards para agrupar informacion de una entidad (producto, usuario, ticket).
- Secciones con fondos diferentes para separar areas de la pagina.
- Fieldsets en formularios para agrupar campos relacionados.

---

## Interaccion entre las Tres Leyes

Estas leyes no operan en aislamiento. Un buen diseno las aplica en conjunto:

- **Fitts + Gestalt (Proximidad):** Coloca el boton de accion principal cerca del area de interaccion (Fitts), y agrupa acciones relacionadas juntas (Proximidad).
- **Hick + Gestalt (Similitud):** Cuando reduzcas opciones (Hick), usa estilos consistentes para que el usuario pueda escanear rapidamente (Similitud).
- **Fitts + Hick:** Para acciones frecuentes, hazlas grandes y accesibles (Fitts) y reduce las opciones intermedias para llegar a ellas (Hick).

---

## Puntos Clave

- **Fitts:** Haz los targets tactiles de al menos 44x44px, coloca acciones frecuentes al alcance, reduce la distancia entre acciones relacionadas.
- **Hick:** Reduce opciones visibles, agrupa y categoriza, usa progressive disclosure, proporciona valores predeterminados.
- **Gestalt:** Usa proximidad para agrupar, similitud para consistencia, region comun para delimitar secciones, y cierre para indicar progreso.
