# Etapa 4: Usabilidad y Principios de Diseño

[Inicio](../README.md) > Etapa 4

> Construir interfaces que la gente realmente quiera usar. Esta etapa es el corazon del pilar de **Usabilidad** y profundiza en el pilar de **Accesibilidad**.

**Prerrequisitos:** Etapa 3 completada.

**Por que esta etapa importa:** Una aplicación puede ser tecnicamente perfecta — cero errores, TypeScript estricto, tests pasando — y aun así frustrar al usuario. Si los formularios validan todo al final en vez de campo por campo, si el dashboard es ilegible en móvil, si el color rojo es la única pista de que algo fallo (y el usuario es daltonico), la aplicación falla en su proposito fundamental: ayudar al usuario a completar su tarea. Los pilares de **Usabilidad** ("¿el usuario puede completar su tarea sin frustrarse?") y **Accesibilidad** ("¿todas las personas pueden usar la aplicación?") son los protagonistas de esta etapa.

> **Pilares que ejercita esta etapa:**
> - **Usabilidad** — el pilar central. Cada actividad responde a la pregunta: "¿el usuario puede completar su tarea sin frustrarse?"
> - **Accesibilidad** — contraste de color, indicadores no-cromaticos, `prefers-reduced-motion`, touch targets
> - **Rendimiento** — skeleton screens como percepcion de velocidad, LCP awareness

---

## Progreso

**Esenciales:** 0/4 | **Recomendadas:** 0/3 | **Avanzadas:** 0/2

---

## Actividades Esenciales 🟢

| # | Actividad | Duracion | Estado |
|:-:|-----------|:--------:|:------:|
| 4.1 | [Construir sistema tipografico y paleta de color](#41--construir-sistema-tipografico-y-paleta-de-color) | ~55 min | ☐ |
| 4.2 | [Implementar sistema de espaciado y disenar formularios](#42--implementar-sistema-de-espaciado-y-disenar-formularios) | ~55 min | ☐ |
| 4.3 | [Dominar las heuristicas de Nielsen](#43--dominar-las-heuristicas-de-nielsen) | ~55 min | ☐ |
| 4.4 | [Construir dashboard responsivo con mobile-first](#44--construir-dashboard-responsivo-con-mobile-first) | ~60 min | ☐ |

## Actividades Recomendadas 🟡

| # | Actividad | Duracion | Estado |
|:-:|-----------|:--------:|:------:|
| 4.5 | [Aplicar Fitts, Hick y Gestalt](#45--aplicar-fitts-hick-y-gestalt) | ~45 min | ☐ |
| 4.6 | [Implementar skeleton screens](#46--implementar-skeleton-screens-que-coincidan-con-el-layout) | ~50 min | ☐ |
| 4.7 | [Auditar y corregir dark patterns](#47--auditar-y-corregir-dark-patterns) | ~45 min | ☐ |

## Actividades Avanzadas 🔴

| # | Actividad | Duracion | Estado |
|:-:|-----------|:--------:|:------:|
| 4.8 | [Diseño de color para accesibilidad y prefers-reduced-motion](#48--diseño-de-color-para-accesibilidad-y-prefers-reduced-motion) | ~45 min | ☐ |
| 4.9 | [Validación integral de Etapa 4](#49--validación-integral-de-etapa-4) | ~55 min | ☐ |

---

## Detalle de actividades

### 4.1 — Construir sistema tipografico y paleta de color

**Por que:** Elegir tamanos de texto y colores "a ojo" produce interfaces inconsistentes donde el usuario no sabe que es importante. Un **type scale** (escala tipografica con ratio matematico) y una **paleta de 3 capas** (brand, neutral, semantic) resuelven esto: defines las reglas una vez y todo el equipo las sigue. Pilar: **Usabilidad** (jerarquia visual clara) + **Accesibilidad** (contraste WCAG AA).

| | |
|---|---|
| **Requiere** | Etapa 3 completada. Saber CSS con custom properties (Etapa 1) |
| **Aprenderas** | Type scale con `clamp()`, paleta de 3 capas en custom properties, dark mode con `prefers-color-scheme`, verificar contraste en DevTools |
| **Al completar** | Tienes un archivo CSS con sistema tipografico completo y paleta de color con dark mode. Cero `px` en font sizes, contraste WCAG AA verificado |

[→ Ir a la actividad](./actividades/4.1-tipografia-color.md)

---

### 4.2 — Implementar sistema de espaciado y disenar formularios

**Por que:** Un formulario de 20 campos en una sola pantalla abruma al usuario. Y cuando el espaciado no sigue un patrón, la interfaz se siente desordenada. El **grid de 8px** con tokens de espaciado elimina las decisiones arbitrarias. El patrón **wizard multi-paso** con validación inline on-blur transforma formularios de "funciona" a "es agradable de usar". Pilar: **Usabilidad** (formularios que guian al usuario).

| | |
|---|---|
| **Requiere** | Actividad 4.1 completada. Saber crear formularios HTML (Etapa 1, Actividad 1.2) |
| **Aprenderas** | Tokens de espaciado en grid de 8px, formularios con labels arriba del input, validación inline on-blur, wizard multi-paso con indicador de progreso |
| **Al completar** | Tienes un wizard de 3 pasos con validación inline, espaciado con tokens, y navegación entre pasos (avanzar y retroceder) |

[→ Ir a la actividad](./actividades/4.2-espaciado-formularios.md)

---

### 4.3 — Dominar las heuristicas de Nielsen

**Por que:** Las **heuristicas de Nielsen** son 10 reglas practicas de usabilidad que funcionan como un checklist para evaluar cualquier interfaz. "Heuristica" suena academico, pero es simplemente una regla empirica: "¿el usuario siempre sabe que esta pasando?", "¿puede deshacer su acción?", "¿los mensajes de error son comprensibles?". No necesitas ser disenador para aplicarlas. Pilar: **Usabilidad** (evaluación sistematica de la interfaz).

| | |
|---|---|
| **Requiere** | Actividades 4.1 y 4.2 completadas |
| **Aprenderas** | Las 10 heuristicas de Nielsen, como hacer una auditoria heuristica, como documentar violaciones con evidencia y solución accionable |
| **Al completar** | Has completado una auditoria identificando 10 violaciones (una por heuristica) con nombre, evidencia y solución. Has auditado tu propio wizard |

[→ Ir a la actividad](./actividades/4.3-heuristicas-nielsen.md)

---

### 4.4 — Construir dashboard responsivo con mobile-first

**Por que:** Un dashboard que muestra 6 columnas en un telefono de 320px es tecnicamente responsivo pero inutilizable. **Mobile-first** significa disenar primero para la pantalla mas pequena y agregar complejidad conforme hay mas espacio. Los breakpoints no deben ser numeros magicos (768px, 1024px) sino basarse en el contenido. Pilar: **Usabilidad** (funcional en cada tamaño) + **Accesibilidad** (touch targets >= 44x44px).

| | |
|---|---|
| **Requiere** | Actividades 4.1-4.3 completadas. CSS Grid y Flexbox (Etapa 1) |
| **Aprenderas** | Disenar mobile-first, breakpoints por contenido, sidebar colapsable, touch targets adecuados |
| **Al completar** | Dashboard funcional en 3 layouts (móvil, tablet, escritorio). Redimensionar de 320px a 1920px sin que nada se rompa |

[→ Ir a la actividad](./actividades/4.4-dashboard-responsivo.md)

---

### 4.5 — Aplicar Fitts, Hick y Gestalt

**Por que:** Las heuristicas de Nielsen dicen **que** buscar. Fitts, Hick y Gestalt explican **por que** ciertos disenos funcionan mejor — son la ciencia detras de la usabilidad. Fitts: los botones grandes y cercanos son mas faciles de clicar. Hick: menos opciones visibles = decision mas rápida. Gestalt: el cerebro agrupa por proximidad, similitud y continuidad. Pilar: **Usabilidad** (optimizar interacciones basandose en como funciona la percepcion humana).

| | |
|---|---|
| **Requiere** | Actividad 4.4 completada (dashboard responsivo) |
| **Aprenderas** | Dimensionar y posicionar acciones con Fitts, progressive disclosure con Hick (max 2 niveles), agrupacion visual con Gestalt |
| **Al completar** | Tu dashboard tiene grupos visuales claros, acciones frecuentes accesibles, y opciones que se revelan progresivamente |

[→ Ir a la actividad](./actividades/4.5-fitts-hick-gestalt.md)

---

### 4.6 — Implementar skeleton screens que coincidan con el layout

**Por que:** Un spinner dice "estoy cargando" pero no dice **que** va a aparecer. Un **skeleton screen** muestra la silueta del contenido: "va a aparecer una tarjeta con un titulo, un número y un texto pequeno". Esto reduce la ansiedad y hace que la espera se sienta mas corta. Pero un skeleton generico que no coincide con el layout real no aporta nada — la clave es que las formas coincidan. Pilar: **Usabilidad** (percepcion de velocidad) + **Rendimiento** (LCP awareness).

| | |
|---|---|
| **Requiere** | Actividad 4.4 completada. Concepto de 4 estados de data fetching (Etapa 3) |
| **Aprenderas** | Disenar skeletons que reflejen el contenido real, animación de pulse/shimmer con CSS, excluir el LCP del skeleton |
| **Al completar** | Tu dashboard muestra skeletons que coinciden con las tarjetas de metricas. Animación de pulse funcional. El titulo (LCP) no tiene skeleton |

[→ Ir a la actividad](./actividades/4.6-skeleton-screens.md)

---

### 4.7 — Auditar y corregir dark patterns

**Por que:** Un **dark pattern** es un truco de diseño que engana al usuario: confirm-shaming ("¿Seguro que quieres irte? Te vas a perder ofertas INCREIBLES"), misdirection (botón de "Aceptar" grande y colorido, "Rechazar" diminuto y gris), o costos ocultos. Como desarrollador, tu construyes estas interfaces — conocerlos te permite no crearlos por accidente y argumentar contra ellos. Pilar: **Usabilidad** (interfaces eticas que respetan al usuario).

| | |
|---|---|
| **Requiere** | Actividades 4.1-4.4 completadas |
| **Aprenderas** | Identificar dark patterns comunes (confirm-shaming, misdirection, hidden costs, roach motel, toast fatigue), auditar interfaces, implementar alternativas eticas |
| **Al completar** | Has auditado tu wizard y dashboard, documentado hallazgos, y tus botones deshabilitados explican por que estan deshabilitados |

[→ Ir a la actividad](./actividades/4.7-dark-patterns.md)

---

### 4.8 — Diseño de color para accesibilidad y prefers-reduced-motion

**Por que:** El 8% de los hombres tiene algun tipo de daltonismo. Si tu interfaz usa solo color para comunicar estados (rojo = error, verde = exito), esas personas no pueden distinguirlos. Y las animaciones que parecen inofensivas pueden causar mareo a personas con trastornos vestibulares. Pilar: **Accesibilidad** (WCAG 1.4.1, prefers-reduced-motion).

| | |
|---|---|
| **Requiere** | Actividades 4.1-4.4 completadas. Accesibilidad básica (Etapa 1, Actividad 1.7) |
| **Aprenderas** | Verificar que ningun estado depende solo del color, agregar indicadores no-cromaticos, implementar `prefers-reduced-motion`, simular daltonismo en DevTools |
| **Al completar** | Tu interfaz es comprensible en simulacion de daltonismo. Las animaciones se desactivan con prefers-reduced-motion. Todo estado tiene indicador visual ademas del color |

[→ Ir a la actividad](./actividades/4.8-accesibilidad-color.md)

---

### 4.9 — Validación integral de Etapa 4

**Por que:** Has construido multiples piezas de usabilidad a lo largo de la etapa. Esta actividad verifica que todas funcionan **juntas** — que no rompiste algo en una actividad posterior y que el conjunto es coherente. Es la misma lógica que testing de integracion.

| | |
|---|---|
| **Requiere** | Todas las actividades esenciales (4.1-4.4) completadas |
| **Aprenderas** | Ejecutar validación integral, verificar criterios cruzados, documentar y corregir inconsistencias |
| **Al completar** | Todos los criterios de aceptacion de 4.1-4.8 se cumplen simultaneamente. Tienes un reporte de validación completo |

[→ Ir a la actividad](./actividades/4.9-validacion-integral.md)

---

## Material de lectura

| Archivo | Contenido |
|---------|-----------|
| [01-tipografia-y-jerarquia.md](./lecturas/01-tipografia-y-jerarquia.md) | Tipografia: type scale, jerarquia visual, custom properties |
| [02-color-para-ui.md](./lecturas/02-color-para-ui.md) | Color para UI: paletas, contraste, accesibilidad, dark mode |
| [03-sistema-de-espaciado.md](./lecturas/03-sistema-de-espaciado.md) | Sistema de espaciado: grid 8px, tokens, consistencia |
| [04-diseño-de-formularios.md](./lecturas/04-diseno-de-formularios.md) | Diseño de formularios: labels, validación inline, wizards |
| [05-heuristicas-de-nielsen.md](./lecturas/05-heuristicas-de-nielsen.md) | Las 10 heuristicas de Nielsen con ejemplos |
| [06-fitts-hick-gestalt.md](./lecturas/06-fitts-hick-gestalt.md) | Leyes de Fitts, Hick y principios Gestalt |
| [07-mobile-first-y-responsive.md](./lecturas/07-mobile-first-y-responsive.md) | Mobile-first, responsive design, breakpoints por contenido |
| [08-anti-patterns-de-usabilidad.md](./lecturas/08-anti-patterns-de-usabilidad.md) | Anti-patterns de usabilidad: dark patterns, toast fatigue |

## Material de Angular

| Archivo | Contenido |
|---------|-----------|
| [01-angular-material-y-cdk.md](./angular/01-angular-material-y-cdk.md) | Angular Material, CDK y componentes de UI |

---

[← Etapa anterior: Estado](../stage-3-state-and-data/) | [Siguiente: Etapa 5 →](../stage-5-performance/)
