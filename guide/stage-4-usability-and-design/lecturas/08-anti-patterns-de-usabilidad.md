# Anti-patterns de Usabilidad

Los anti-patterns de usabilidad son errores recurrentes en el diseño de interfaces que perjudican la experiencia del usuario. Reconocer estos patrones es tan importante como conocer las buenas practicas, porque aparecen con frecuencia en proyectos reales y son faciles de introducir sin darse cuenta.

---

## 1. Dark Patterns

Confirm-shaming ("No gracias, no quiero ahorrar dinero"), continuidad forzada (inscripcion automática en pruebas sin cancelacion clara), costos ocultos revelados en el checkout y misdirection (enfatizar visualmente la opción que beneficia al negocio, no al usuario) erosionan la confianza y pueden violar regulaciones. Disena para el beneficio del usuario, no en su contra.

**Senal de alerta:** Si necesitas "convencer" al usuario con lenguaje manipulador o diseño enganoso, el producto o la oferta necesitan mejorar, no la retorica.

---

## 2. Progressive Disclosure que Oculta Funcionalidades Criticas

Si los usuarios no pueden encontrar una funcionalidad porque esta enterrada detras de tres niveles de disclosure, la funcionalidad efectivamente no existe. Aplica progressive disclosure a opciones *secundarias*, no a flujos de trabajo principales. La investigacion de usuarios y la analitica deben validar que pertenece a cada nivel.

**Senal de alerta:** Los tickets de soporte con "no encuentro como hacer X" indican que X esta demasiado oculto.

---

## 3. Mobile-First que Ignora Escritorio

Disenar primero para 375px es una buena practica, pero entregar un layout de una sola columna en un monitor de 27 pulgadas desperdicia espacio de pantalla y frustra a los usuarios de escritorio. Mobile-first significa *empezar* con móvil, luego *mejorar* para ventanas graficas mas grandes -- no detenerse en móvil.

**Senal de alerta:** Un layout identico en un telefono de 375px y un monitor de 2560px.

---

## 4. Fatiga de Notificaciones Toast

Mostrar un toast para cada acción menor ("Configuración guardada," "Elemento anadido," "Perfil actualizado") entrena a los usuarios a ignorar todas las notificaciones, incluidas las importantes. Reserva los toasts para resultados que son inciertos, asincronos o requieren atención. Para resultados esperados y sincronos, una confirmacion inline sutil es suficiente.

**Senal de alerta:** Si hay un toast visible en la pantalla en mas del 50% del tiempo de uso, hay fatiga de notificacion.

---

## 5. Malinterpretar la Ley de Fitts

La Ley de Fitts describe el tiempo *relativo* de adquisicion de objetivo, no es una instrucción para hacer cada elemento de tamaño excesivo. Botones enormes desplazan el contenido, rompen la jerarquia visual y no mejoran la usabilidad cuando no hay desafio de precision.

**Senal de alerta:** Botones que ocupan el 100% del ancho de la pantalla en desktop sin razón funcional.

---

## 6. Ley de Hick Usada para Eliminar Funcionalidades

Reducir opciones no significa eliminar funcionalidades que los usuarios necesitan. Significa agrupar, categorizar, proporcionar valores predeterminados y usar progressive disclosure para gestionar la complejidad sin sacrificar capacidad.

**Senal de alerta:** Usuarios avanzados quejandose de que funcionalidades que usaban frecuentemente fueron eliminadas en una "simplificacion."

---

## 7. Inconsistencia Disfrazada de Creatividad

Scrollbars personalizados, controles de formulario no estandar, patrones de navegación novedosos y checkboxes reimaginados fuerzan a los usuarios a reaprender interacciones que ya conocen. Las convenciones de plataforma existen porque los usuarios ya las han aprendido. Desviate solo cuando la ganancia de UX supere claramente el costo de aprendizaje.

**Senal de alerta:** El equipo dedica tiempo a explicar como funciona un control básico en tutoriales o tooltips.

---

## 8. Breakpoints Responsive Basados en Dispositivos Especificos

Breakpoints en 375px, 768px y 1024px apuntan a los dispositivos populares de hoy pero se rompen con los de manana. Establece breakpoints donde *tu contenido* se rompe, no donde los dispositivos actuales casualmente miden.

**Senal de alerta:** El layout se ve "roto" en un dispositivo con un ancho de pantalla ligeramente diferente a los breakpoints definidos.

---

## Como Detectar Anti-patterns en Tu Proyecto

1. **Revisa la analitica:** Busca puntos de abandono, tasas de error altas en formularios y flujos donde los usuarios hacen clic repetidamente.
2. **Lee los tickets de soporte:** Los patrones en las quejas de usuarios revelan problemas de usabilidad sistematicos.
3. **Prueba con usuarios reales:** La observacion directa revela problemas que la analitica y el código no pueden mostrar.
4. **Heuristicas de Nielsen como checklist:** Recorre las 10 heuristicas contra cada pantalla principal de tu aplicación.
5. **Revision entre pares enfocada en UX:** Pide a un companero que complete una tarea en tu interfaz sin instrucciones y observa donde tropieza.
