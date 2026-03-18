# Etapa 6: Seguridad y Resiliencia

[Inicio](../README.md) > Etapa 6

> Proteger a los usuarios y manejar los fallos con elegancia.

**Prerrequisitos:** Etapa 5 completada.

**Por que esta etapa importa:** Una aplicación rapida y bien disenada que filtra tokens en localStorage, no maneja errores de red o permite XSS no es profesional — es un riesgo. La seguridad y la resiliencia no son features opcionales que se agregan al final; son restricciones de diseño que deben estar presentes desde el primer commit. Los desarrolladores que ignoran estas areas construyen aplicaciones que funcionan en el "happy path" y colapsan ante el primer fallo real o el primer atacante curioso.

> **Pilares de diseño que se profundizan en esta etapa:** [Seguridad](../stage-1-foundations/lecturas/00-pilares-de-diseno.md) (XSS, CSRF, CSP, autenticacion, validacion), [Resiliencia](../stage-1-foundations/lecturas/00-pilares-de-diseno.md) (error states, optimistic updates, retry con backoff), [Usabilidad](../stage-1-foundations/lecturas/00-pilares-de-diseno.md) (estados de error claros que orientan al usuario).

---

## Progreso

**Esenciales:** 0/4 | **Recomendadas:** 0/2 | **Avanzadas:** 0/1

---

## Actividades Esenciales 🟢

| # | Actividad | Pilares | Duracion | Estado |
|:-:|-----------|---------|:--------:|:------:|
| 6.1 | [Prevenir XSS](#61--prevenir-xss-y-entender-auto-escaping) | Seguridad | ~55 min | ☐ |
| 6.2 | [Error states](#62--implementar-los-4-estados-de-error-para-toda-vista-con-datos) | Resiliencia, Usabilidad | ~55 min | ☐ |
| 6.3 | [Auth segura](#63--implementar-autenticacion-segura) | Seguridad | ~60 min | ☐ |
| 6.4 | [Validacion doble](#64--validacion-doble-cliente--servidor) | Seguridad | ~50 min | ☐ |

## Actividades Recomendadas 🟡

| # | Actividad | Pilares | Duracion | Estado |
|:-:|-----------|---------|:--------:|:------:|
| 6.5 | [CSRF/CSP](#65--configurar-csp-y-proteccion-csrf) | Seguridad | ~45 min | ☐ |
| 6.6 | [Optimistic/retry](#66--optimistic-updates-con-rollback-y-retry-con-backoff) | Resiliencia | ~55 min | ☐ |

## Actividades Avanzadas 🔴

| # | Actividad | Pilares | Duracion | Estado |
|:-:|-----------|---------|:--------:|:------:|
| 6.7 | [Validacion integral](#67--validacion-integral-de-etapa-6) | Todos | ~55 min | ☐ |

---

## Detalle de actividades

### 6.1 — Prevenir XSS y entender auto-escaping

**Por que:** XSS es la vulnerabilidad mas comun en aplicaciones web. Angular escapa automáticamente los datos renderizados en templates, pero basta un `[innerHTML]` sin sanitizar o un `eval()` para abrir la puerta. Encontrar y corregir vulnerabilidades XSS en una app preparada te da el ojo para detectarlas en proyectos reales.

| | |
|---|---|
| **Requiere** | Etapa 5 completada, proyecto Angular funcionando |
| **Aprenderas** | Identificar 5 tipos de XSS (innerHTML, eval, URL injection, template injection, stored XSS), corregirlos usando el auto-escaping de Angular y `DomSanitizer`, validar que cero alerts se disparan |
| **Al completar** | Cero vulnerabilidades XSS restantes, cero uso de `eval` o `new Function`, cada uso de `[innerHTML]` sanitizado con `DomSanitizer` o DOMPurify |

[→ Ir a la actividad](./actividades/6.1-xss-prevencion.md)

---

### 6.2 — Implementar los 4 estados de error para toda vista con datos

**Por que:** Una vista que solo muestra datos cuando todo sale bien no esta terminada. Los usuarios experimentan conexiones lentas, APIs caidas y listas vacias. Implementar los 4 estados (loading, success, error, empty) con skeletons, retry y mensajes claros es lo que separa una app profesional de un prototipo.

| | |
|---|---|
| **Requiere** | Actividad 6.1 completada |
| **Aprenderas** | Implementar skeleton loading, error con boton de retry, empty state orientador, error boundaries estrategicos en secciones independientes |
| **Al completar** | Skeleton visible en carga lenta, error con retry funcional, empty state con orientacion, error boundaries en secciones independientes |

[→ Ir a la actividad](./actividades/6.2-error-states.md)

---

### 6.3 — Implementar autenticacion segura

**Por que:** Guardar tokens en localStorage es una de las peores practicas de seguridad frontend, pero es lo que hacen la mayoria de tutoriales. Implementar OAuth + PKCE con access token en memoria y refresh token en HttpOnly cookie te ensena el patron correcto que se usa en produccion.

| | |
|---|---|
| **Requiere** | Actividades 6.1-6.2 completadas |
| **Aprenderas** | Implementar login con OAuth + PKCE, almacenar access token en memoria (no localStorage), refresh token en HttpOnly cookie, renovacion automatica con `HttpInterceptor` |
| **Al completar** | Cero tokens visibles en localStorage/sessionStorage, access token en memoria, refresh token en HttpOnly cookie, renovacion automatica funciona |

[→ Ir a la actividad](./actividades/6.3-auth-segura.md)

---

### 6.4 — Validacion doble: cliente + servidor

**Por que:** La validacion en cliente mejora la experiencia pero NO es seguridad — cualquier usuario puede saltearla con DevTools. La validacion en servidor es la unica garantia real. Implementar ambas y demostrar que el servidor rechaza datos invalidos independientemente del cliente es una practica fundamental.

| | |
|---|---|
| **Requiere** | Actividades 6.1-6.3 completadas |
| **Aprenderas** | Validacion en cliente con schema (Zod), validacion independiente en servidor, verificar que no hay secretos en el bundle |
| **Al completar** | Validacion en cliente con schema, servidor rechaza datos invalidos independientemente, cero secretos en `dist/` |

[→ Ir a la actividad](./actividades/6.4-validacion-doble.md)

---

### 6.5 — Configurar CSP y proteccion CSRF

**Por que:** CSP (Content Security Policy) es tu segunda linea de defensa contra XSS — incluso si una vulnerabilidad se escapa, CSP puede bloquear la ejecucion de scripts inyectados. SameSite cookies previenen CSRF. Estas cabeceras HTTP son configuracion basica de seguridad que todo frontend profesional debe tener.

| | |
|---|---|
| **Requiere** | Actividades 6.1-6.4 completadas |
| **Aprenderas** | Configurar CSP header restrictivo (sin `*` ni `unsafe-inline`), configurar SameSite cookies, verificar headers en DevTools |
| **Al completar** | CSP header presente y restrictivo, sin `*` ni `unsafe-inline` para `script-src`, SameSite cookies configuradas |

[→ Ir a la actividad](./actividades/6.5-csrf-csp.md)

---

### 6.6 — Optimistic updates con rollback y retry con backoff

**Por que:** En una app real, las acciones del usuario deben sentirse instantaneas aunque dependan de una API. Optimistic updates muestran el resultado esperado inmediatamente y revierten si falla. Retry con exponential backoff maneja fallos transitorios sin bombardear el servidor. Juntos hacen que la app se sienta resiliente y responsiva.

| | |
|---|---|
| **Requiere** | Actividades 6.1-6.4 completadas |
| **Aprenderas** | Implementar optimistic update con rollback visible, mostrar error toast al fallar, retry con intervalos crecientes (exponential backoff) |
| **Al completar** | Optimistic update se revierte visiblemente en caso de fallo, error toast aparece, intervalos de retry crecientes (~1s, ~2s, ~4s) |

[→ Ir a la actividad](./actividades/6.6-optimistic-retry.md)

---

### 6.7 — Validacion integral de Etapa 6

**Por que:** Antes de avanzar a la Etapa 7, necesitas confirmar que dominas seguridad y resiliencia. Esta actividad es tu "code review" propio: verificas todos los criterios de aceptacion de la etapa y cierras brechas.

| | |
|---|---|
| **Requiere** | Todas las actividades esenciales (6.1-6.4) completadas |
| **Aprenderas** | Ejecutar la validacion completa, interpretar resultados, corregir fallos restantes |
| **Al completar** | Todos los criterios de aceptacion de la etapa pasan |

[→ Ir a la actividad](./actividades/6.7-validacion-integral.md)

---

## Material de lectura

### Lecturas generales

| Archivo | Contenido |
|---------|-----------|
| [01-xss-csrf-csp.md](./lecturas/01-xss-csrf-csp.md) | XSS, CSRF y CSP: prevención, auto-escaping, headers de seguridad |
| [02-autenticacion-segura.md](./lecturas/02-autenticacion-segura.md) | Autenticación segura: OAuth, PKCE, tokens, cookies HttpOnly |
| [03-validacion-de-entradas.md](./lecturas/03-validacion-de-entradas.md) | Validación de entradas: cliente + servidor, schemas con Zod |
| [04-error-boundaries-y-degradacion.md](./lecturas/04-error-boundaries-y-degradacion.md) | Error boundaries, degradación elegante, los 4 estados de error |
| [05-optimistic-updates-y-retry.md](./lecturas/05-optimistic-updates-y-retry.md) | Optimistic updates, rollback, retry con exponential backoff |
| [06-anti-patterns-de-seguridad.md](./lecturas/06-anti-patterns-de-seguridad.md) | Anti-patterns de seguridad: secretos en bundle, eval, localStorage para tokens |
| [07-seguridad-avanzada-frontend.md](./lecturas/07-seguridad-avanzada-frontend.md) | Seguridad avanzada: MFA, protección de datos, sanitización de input, supply chain, principios de diseño seguro |

### Material de Angular

| Archivo | Contenido |
|---------|-----------|
| [01-seguridad-en-angular.md](./angular/01-seguridad-en-angular.md) | Seguridad en Angular: sanitización, DomSanitizer, HttpInterceptors |

---

[← Etapa anterior: Rendimiento](../stage-5-performance/) | [Volver al índice](../README.md) | [Etapa siguiente: Testing →](../stage-7-testing-and-quality/)
