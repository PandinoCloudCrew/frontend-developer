# Etapa 6: Seguridad y Resiliencia

> Proteger a los usuarios y manejar los fallos con elegancia.

**Prerrequisitos:** Etapa 5 completada.

---

## Progreso

**Esenciales:** 0/4 | **Recomendadas:** 0/2 | **Avanzadas:** 0/1

---

## Actividades Esenciales

### 🟢 Actividad 6.1 — Prevenir XSS y entender auto-escaping

- [ ] Completada

**Duración:** ~55 min

**Lectura:**
- [XSS, CSRF y CSP](./lecturas/01-xss-csrf-csp.md) (~15 min)

**Angular:**
- [Seguridad en Angular](./angular/01-seguridad-en-angular.md) (~10 min)

**Práctica:** En una app con 5 vulnerabilidades XSS (innerHTML, eval, URL injection, template injection, stored XSS), encontrar y corregir las 5 (~35 min)

**Validación:** Ingresar `<img src=x onerror=alert(1)>` en cada input — cero alerts (~5 min)

**Criterios de aceptación:**
- [ ] Cero XSS vulnerabilities restantes
- [ ] Cada `dangerouslySetInnerHTML`/`v-html` usa DOMPurify o está justificado
- [ ] Cero uso de `eval` o `new Function`

---

### 🟢 Actividad 6.2 — Implementar los 4 estados de error para toda vista con datos

- [ ] Completada

**Duración:** ~55 min

**Lectura:**
- [Error Boundaries y Degradación](./lecturas/04-error-boundaries-y-degradacion.md) (~10 min)

**Práctica:** Para cada vista con data fetching, implementar: skeleton (loading), datos (success), mensaje + retry (error), empty state útil. Agregar error boundaries estratégicos (~35 min)

**Validación:** Slow 3G -> skeleton; bloquear API -> error + retry; retry funciona; array vacío -> empty state (~10 min)

**Criterios de aceptación:**
- [ ] Skeleton visible en carga lenta
- [ ] Error con botón reintentar funcional
- [ ] Empty state con orientación al usuario
- [ ] Error boundaries en secciones independientes (no solo root)

---

### 🟢 Actividad 6.3 — Implementar autenticación segura

- [ ] Completada

**Duración:** ~60 min

**Lectura:**
- [Autenticación Segura](./lecturas/02-autenticacion-segura.md) (~10 min)

**Práctica:** Implementar login con OAuth + PKCE. Access token en memoria (no localStorage), refresh token en HttpOnly cookie, renovación automática (~40 min)

**Validación:** Verificar que no hay tokens en localStorage/sessionStorage (~10 min)

**Criterios de aceptación:**
- [ ] Cero tokens visibles en localStorage/sessionStorage
- [ ] Access token en memoria
- [ ] Refresh token en HttpOnly cookie
- [ ] Renovación automática funciona

---

### 🟢 Actividad 6.4 — Validación doble: cliente + servidor

- [ ] Completada

**Duración:** ~50 min

**Lectura:**
- [Validación de Entradas](./lecturas/03-validacion-de-entradas.md) (~5 min)

**Práctica:** Agregar validación con Zod (cliente) + validación independiente en servidor. Saltear validación cliente vía DevTools -> el servidor debe rechazar (~35 min)

**Validación:** Desactivar validación cliente -> enviar datos inválidos -> servidor rechaza (~10 min)

**Criterios de aceptación:**
- [ ] Validación en cliente con schema
- [ ] Servidor rechaza datos inválidos independientemente
- [ ] `grep "sk_\|api_key\|secret\|password" dist/` devuelve cero (sin secretos en bundle)

---

## Actividades Recomendadas

### 🟡 Actividad 6.5 — Configurar CSP y protección CSRF

- [ ] Completada

**Duración:** ~45 min

**Lectura:**
- [XSS, CSRF y CSP](./lecturas/01-xss-csrf-csp.md) (secciones CSRF/CSP, ~10 min)

**Práctica:** Configurar CSP header restrictivo (sin `*` ni `unsafe-inline`). Configurar SameSite cookies (~30 min)

**Validación:** Verificar CSP en response headers; verificar SameSite en cookies (~5 min)

**Criterios de aceptación:**
- [ ] CSP header presente y restrictivo
- [ ] No contiene `*` ni `unsafe-inline` para `script-src`
- [ ] SameSite cookies configuradas

---

### 🟡 Actividad 6.6 — Optimistic updates con rollback y retry con backoff

- [ ] Completada

**Duración:** ~55 min

**Lectura:**
- [Optimistic Updates y Retry](./lecturas/05-optimistic-updates-y-retry.md) (~10 min)

**Práctica:** Like optimista -> bloquear API -> rollback visible + error toast. Retry con intervalos crecientes (~35 min)

**Validación:** Verificar rollback visible; verificar intervalos ~1s, ~2s, ~4s en Network (~10 min)

**Criterios de aceptación:**
- [ ] Optimistic update se revierte visiblemente en caso de fallo
- [ ] Error toast aparece al fallar
- [ ] Intervalos de retry son crecientes (exponential backoff)

---

## Actividades Avanzadas

### 🔴 Actividad 6.7 — Validación integral de Etapa 6

- [ ] Completada

**Duración:** ~55 min

**Lectura:** Revisar los criterios de aceptación de toda la etapa (~5 min)

**Práctica:** Verificar todos los criterios 6.1-6.6 (~40 min)

**Validación:** Los criterios pasan (~10 min)

**Criterios de aceptación:**
- [ ] Todos los criterios 6.1-6.6 se cumplen

---

## Material de lectura en esta etapa

### Lecturas generales

| Archivo | Contenido |
|---------|-----------|
| [01-xss-csrf-csp.md](./lecturas/01-xss-csrf-csp.md) | XSS, CSRF y CSP: prevención, auto-escaping, headers de seguridad |
| [02-autenticación-segura.md](./lecturas/02-autenticacion-segura.md) | Autenticación segura: OAuth, PKCE, tokens, cookies HttpOnly |
| [03-validación-de-entradas.md](./lecturas/03-validacion-de-entradas.md) | Validación de entradas: cliente + servidor, schemas con Zod |
| [04-error-boundaries-y-degradacion.md](./lecturas/04-error-boundaries-y-degradacion.md) | Error boundaries, degradación elegante, los 4 estados de error |
| [05-optimistic-updates-y-retry.md](./lecturas/05-optimistic-updates-y-retry.md) | Optimistic updates, rollback, retry con exponential backoff |
| [06-anti-patterns-de-seguridad.md](./lecturas/06-anti-patterns-de-seguridad.md) | Anti-patterns de seguridad: secretos en bundle, eval, localStorage para tokens |

### Material de Angular

| Archivo | Contenido |
|---------|-----------|
| [01-seguridad-en-angular.md](./angular/01-seguridad-en-angular.md) | Seguridad en Angular: sanitización, DomSanitizer, HttpInterceptors |

---

[← Etapa anterior: Rendimiento](../stage-5-performance/) | [Volver al índice](../README.md) | [Etapa siguiente: Testing →](../stage-7-testing-and-quality/)
