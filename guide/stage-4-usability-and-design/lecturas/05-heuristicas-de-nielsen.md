# Heuristicas de Nielsen

Las 10 heuristicas de usabilidad de Jakob Nielsen son el marco de referencia mas ampliamente citado para evaluar el diseno de interfaces. Esta lectura combina la tabla de referencia con ejemplos concretos de violacion antes/despues para construir reconocimiento de patrones.

---

## Las 10 Heuristicas Aplicadas a la Web

| # | Heuristica | Aplicacion Web |
|---|-----------|----------------|
| 1 | **Visibilidad del Estado del Sistema** | Indicadores de carga, barras de progreso, notificaciones toast, confirmaciones de guardado |
| 2 | **Correspondencia entre el Sistema y el Mundo Real** | Usar terminologia familiar, etiquetas en lenguaje natural, iconografia intuitiva |
| 3 | **Control y Libertad del Usuario** | Deshacer/rehacer, navegacion "atras" clara, modales faciles de cerrar, botones "Cancelar" |
| 4 | **Consistencia y Estandares** | Seguir convenciones de plataforma, comportamiento consistente de componentes, navegacion predecible |
| 5 | **Prevencion de Errores** | Confirmaciones para acciones destructivas, restricciones de entrada, botones deshabilitados para estados invalidos |
| 6 | **Reconocimiento antes que Recuerdo** | Navegacion visible, busquedas recientes, autocompletado, ayuda contextual |
| 7 | **Flexibilidad y Eficiencia de Uso** | Atajos de teclado, dashboards personalizables, acciones rapidas para usuarios avanzados |
| 8 | **Diseno Estetico y Minimalista** | Eliminar elementos innecesarios, jerarquia visual clara, contenido enfocado |
| 9 | **Ayudar a los Usuarios a Reconocer, Diagnosticar y Recuperarse de Errores** | Mensajes de error claros con pasos de remediacion, validacion inline, campos problematicos resaltados |
| 10 | **Ayuda y Documentacion** | Ayuda con busqueda, tours de onboarding, tooltips contextuales |

---

## Ejemplos de Violacion y Correccion

### H1: Visibilidad del Estado del Sistema

**La heuristica:** El sistema siempre debe mantener informados a los usuarios sobre lo que esta sucediendo, a traves de retroalimentacion apropiada dentro de un tiempo razonable.

**Violacion (Antes):** Un formulario de carga de archivos tiene un boton "Upload." Cuando el usuario hace clic, nada visible sucede durante 10-30 segundos mientras el archivo se carga. El boton no cambia, no hay spinner, no hay barra de progreso ni indicacion de que algo este sucediendo. El usuario hace clic en el boton de nuevo (causando una carga duplicada) o navega fuera asumiendo que esta roto.

**Por que falla:** El usuario no tiene retroalimentacion de que el sistema recibio su accion. Sin estado visible, cualquier retraso mayor a ~1 segundo se siente como un fallo.

**Correccion (Despues):** Cuando el usuario hace clic en "Upload," el boton cambia inmediatamente a un estado de loading: la etiqueta cambia a "Uploading...", aparece un spinner y el boton se deshabilita. Una barra de progreso aparece debajo del boton mostrando el porcentaje completado. Al completarse, un checkmark verde reemplaza al spinner y la etiqueta cambia a "Upload complete."

**Nota de implementacion:** Usa `XMLHttpRequest` o `fetch` con eventos de progreso (`xhr.upload.onprogress`). Muestra la barra de progreso como un elemento `<progress>` o un `div` con `role="progressbar"`, `aria-valuenow`, `aria-valuemin` y `aria-valuemax`.

---

### H2: Correspondencia entre el Sistema y el Mundo Real

**La heuristica:** El sistema debe hablar el idioma de los usuarios, con palabras, frases y conceptos familiares para el usuario, en lugar de terminos orientados al sistema.

**Violacion (Antes):** Una app de delivery de comida muestra el mensaje de error: "Error 422: Entity validation failed -- addressLine1 must not be null." Las etiquetas de los campos usan nombres de columnas de base de datos: "addr_line_1," "postal_cd."

**Por que falla:** Los usuarios no saben que significa "422", que es "entity validation" o a que se refiere "null." El sistema esta hablando su propio idioma interno.

**Correccion (Despues):** El mensaje de error dice: "Please enter your street address." Las etiquetas se reescriben en lenguaje natural: "Street address," "ZIP code." Los mensajes de error hacen referencia al concepto humano: "We need your street address to deliver your order."

**Nota de implementacion:** Mapea los codigos de error del backend a mensajes orientados al usuario en una capa de traduccion. Nunca expongas errores crudos de API a la UI.

---

### H3: Control y Libertad del Usuario

**La heuristica:** Los usuarios frecuentemente eligen funciones del sistema por error. Necesitan una "salida de emergencia" claramente marcada.

**Violacion (Antes):** Una app de gestion de proyectos tiene una opcion "Delete Project" sin dialogo de confirmacion. Al hacer clic se elimina inmediata y permanentemente el proyecto y todas sus tareas. No hay undo, no hay papelera.

**Por que falla:** Las acciones destructivas sin confirmacion o undo violan el control del usuario. Un clic accidental se convierte en una perdida de datos catastrofica.

**Correccion (Despues):** Al hacer clic en "Delete Project" se abre un dialogo de confirmacion que indica las consecuencias. El proyecto se mueve a una carpeta Trash donde permanece por 30 dias. Aparece un toast: "Project moved to Trash" con un boton "Undo."

**Nota de implementacion:** Implementa soft-delete (una columna `deleted_at`) en lugar de hard-delete. Para soft-deletes, muestra un toast con una accion de undo que limpia el campo `deleted_at`.

---

### H4: Consistencia y Estandares

**La heuristica:** Los usuarios no deberian tener que preguntarse si diferentes palabras, situaciones o acciones significan lo mismo. Sigue las convenciones de la plataforma.

**Violacion (Antes):** Un sitio de e-commerce usa tres patrones diferentes para la misma accion: "Add to Cart" (azul), "Buy" (verde), "Add to Bag" (con borde). Los terminos "cart," "bag" y "buy" se usan intercambiablemente.

**Por que falla:** Los usuarios deben re-aprender la interfaz en cada pagina. La terminologia inconsistente los obliga a preguntarse si "Add to Bag" y "Add to Cart" hacen lo mismo.

**Correccion (Despues):** Cada instancia usa la misma etiqueta: "Add to Cart." El estilo del boton es el mismo en cada pagina. Una libreria de componentes compartida asegura que el componente `<AddToCartButton>` se renderice identicamente.

**Nota de implementacion:** Crea un componente compartido y usalo en todas partes. Audita el codigo para inconsistencias terminologicas y estandariza en un termino.

---

### H5: Prevencion de Errores

**La heuristica:** Mejor aun que buenos mensajes de error es un diseno cuidadoso que previene que el problema ocurra en primer lugar.

**Violacion (Antes):** Un formulario de reserva de vuelos tiene dos campos de fecha implementados como inputs de texto libre que aceptan cualquier string. El usuario puede escribir "February 30" (no existe) o ingresar una fecha de regreso anterior a la de salida.

**Por que falla:** Los inputs de texto libre para fechas permiten docenas de estados invalidos.

**Correccion (Despues):** Reemplaza los inputs de texto libre con un componente date picker. El date picker deshabilita las fechas pasadas. Cuando se selecciona una fecha de salida, el date picker de regreso automaticamente establece su minimo a la fecha de salida. Las fechas invalidas (February 30) no se pueden seleccionar.

**Nota de implementacion:** Usa `<input type="date">` con atributos `min` y `max`, o un componente de libreria de date picker. Actualiza `min` en el campo de regreso dinamicamente cuando cambie la fecha de salida.

---

### H6: Reconocimiento en Lugar de Recuerdo

**La heuristica:** Minimiza la carga de memoria del usuario haciendo que objetos, acciones y opciones sean visibles.

**Violacion (Antes):** Un dashboard de analiticas requiere que los usuarios escriban nombres exactos de metricas ("monthly_active_users_v2") en un input de texto. No hay lista de metricas disponibles, no hay autocomplete y no hay busqueda.

**Por que falla:** El usuario se ve obligado a recordar un string exacto de memoria en lugar de reconocerlo de una lista.

**Correccion (Despues):** Reemplaza el input con un dropdown con busqueda (combobox) que lista todas las metricas disponibles. El dropdown soporta busqueda difusa. Las metricas usadas recientemente aparecen en la parte superior.

**Nota de implementacion:** Implementa un componente combobox (usando `role="combobox"`, `aria-expanded`, `aria-activedescendant`). Implementa busqueda difusa del lado del cliente (librerías como Fuse.js). Rastrea las metricas usadas recientemente en local storage.

---

### H7: Flexibilidad y Eficiencia de Uso

**La heuristica:** Los aceleradores -- invisibles para el usuario novato -- pueden frecuentemente acelerar la interaccion para el usuario experto.

**Violacion (Antes):** Un sistema de tickets de soporte requiere 6 clics para cerrar un ticket resuelto. No hay atajos de teclado, no hay acciones masivas y no hay macros.

**Por que falla:** El sistema trata a todos los usuarios identicamente, sin aceleradores para expertos. Los flujos de trabajo de alta frecuencia son lentos y tediosos.

**Correccion (Despues):** Agrega un boton "Quick Resolve" directamente en el ticket. Atajos de teclado: `R` para resolver, `E` para escalar, `N` para agregar una nota. Acciones masivas para multiples tickets. Respuestas guardadas (macros). Hoja de referencia accesible via `?`.

**Nota de implementacion:** Implementa atajos de teclado usando un event listener global que verifica `event.key` y solo se dispara cuando ningun input/textarea tiene foco. Muestra pistas de teclado junto a los botones (p.ej., "Resolve `R`").

---

### H8: Diseno Estetico y Minimalista

**La heuristica:** Los dialogos no deben contener informacion irrelevante o raramente necesaria. Cada unidad extra de informacion compite con las unidades relevantes.

**Violacion (Antes):** Una app de clima muestra mas de 20 datos en el viewport inicial: temperatura, presion barometrica, punto de rocio, indice UV, fase lunar, pronostico de 14 dias, mapa de radar, articulos de noticias, un anuncio -- todo con el mismo tamano y peso.

**Por que falla:** Cuando todo se presenta por igual, nada es prominente. La sobrecarga de informacion incrementa la carga cognitiva.

**Correccion (Despues):** La pantalla principal muestra tres cosas: temperatura actual, maxima/minima de hoy y un resumen de precipitacion. Info secundaria en una fila debajo. Todo lo demas es accesible via una expansion "Details" o pestanas separadas. La jerarquia visual usa tamano y peso para hacer de la temperatura el punto focal.

**Nota de implementacion:** Audita los datos mostrados. Clasifica por frecuencia de uso. Mueve cualquier cosa usada por menos del 20% de los usuarios detras de revelacion progresiva.

---

### H9: Ayudar a los Usuarios a Reconocer, Diagnosticar y Recuperarse de Errores

**La heuristica:** Los mensajes de error deben expresarse en lenguaje llano (sin codigos), indicar con precision el problema y sugerir una solucion.

**Violacion (Antes):** Una aplicacion SaaS muestra una pagina de error de pantalla completa con "500 Internal Server Error" y un ID de referencia. No hay explicacion, no hay sugerencia de accion y no hay navegacion.

**Por que falla:** "500 Internal Server Error" es un codigo de estado del servidor, no un mensaje humano. La pagina de error es un callejon sin salida sin navegacion.

**Correccion (Despues):** La pagina de error muestra: "Something went wrong on our end. We have been notified." Debajo: "What you can do: Try refreshing the page." La pagina retiene la navegacion del header. Un enlace "Go back to dashboard" se muestra de forma prominente.

**Nota de implementacion:** Crea un componente de error boundary personalizado. Renderiza una pagina amigable que incluya la navegacion del sitio. Registra los detalles del error en tu servicio de tracking (Sentry, Datadog) -- no los muestres al usuario.

---

### H10: Ayuda y Documentacion

**La heuristica:** Aunque es mejor si el sistema puede usarse sin documentacion, puede ser necesario proporcionar ayuda. Dicha informacion debe ser facil de buscar y enfocada en la tarea.

**Violacion (Antes):** Una herramienta de visualizacion de datos tiene un panel de configuracion con mas de 30 opciones. No hay tooltips, no hay ayuda inline. El elemento "Help" abre un manual de 200 paginas organizado por funcionalidad, no por tarea.

**Por que falla:** La ayuda no es contextual -- esta desconectada de la tarea actual del usuario. El usuario debe abandonar su flujo de trabajo para encontrar ayuda.

**Correccion (Despues):** Cada opcion de configuracion tiene un icono de info con un tooltip de 1-2 oraciones y un enlace "Learn more." Un boton "?" abre un sidebar de ayuda contextual con contenido relevante al panel actual. Cada articulo de ayuda esta orientado a tareas: "How to set a logarithmic scale" con 3-4 pasos numerados.

**Nota de implementacion:** Agrega componentes de tooltip a cada opcion de configuracion. Construye un sistema de ayuda contextual que mapee la vista actual de la UI a articulos relevantes. Almacena el contenido de ayuda como datos estructurados (titulo, cuerpo, temas relacionados) para que pueda ser buscado y filtrado.
