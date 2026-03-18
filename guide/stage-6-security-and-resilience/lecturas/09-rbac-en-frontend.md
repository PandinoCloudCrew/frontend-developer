# RBAC (Role-Based Access Control) en Frontend

[<- Volver a Etapa 6](../README.md)

En toda aplicacion con usuarios, no todos pueden hacer lo mismo. Un admin puede borrar usuarios, un editor puede publicar contenido, un viewer solo puede leer. RBAC (Role-Based Access Control) es el modelo mas comun para manejar esto: los usuarios tienen **roles**, los roles tienen **permisos**, y los permisos controlan **acciones**. En el frontend, RBAC determina que ve y que puede hacer cada usuario en la interfaz.

## Contenido

- [Que es RBAC](#que-es-rbac)
- [RBAC vs ABAC](#rbac-vs-abac)
- [La regla critica: frontend RBAC es UX, no seguridad](#la-regla-critica-frontend-rbac-es-ux-no-seguridad)
- [De donde vienen los roles y permisos](#de-donde-vienen-los-roles-y-permisos)
- [Granularidad: roles vs permisos](#granularidad-roles-vs-permisos)
- [Implementacion en Angular](#implementacion-en-angular)
- [Ocultar vs deshabilitar](#ocultar-vs-deshabilitar)
- [El patron "admin panel"](#el-patron-admin-panel)
- [Anti-patterns](#anti-patterns)
- [Puntos clave](#puntos-clave)

---

## Que es RBAC

RBAC organiza la autorizacion en tres niveles:

```
Usuario  -->  Rol  -->  Permisos
  Juan       admin      users:read, users:write, users:delete
  Maria      editor     posts:read, posts:write, posts:publish
  Pedro      viewer     posts:read
```

Un usuario tiene uno o mas roles. Cada rol agrupa un conjunto de permisos. La aplicacion verifica permisos, no usuarios individuales. Cuando un nuevo empleado entra, le asignas un rol y automaticamente hereda todos sus permisos.

---

## RBAC vs ABAC

| | RBAC | ABAC |
|---|------|------|
| **Decide basado en** | Rol del usuario | Atributos (rol + departamento + hora + ubicacion + recurso) |
| **Ejemplo** | "Solo los admin pueden borrar usuarios" | "Solo los admin del departamento de RRHH pueden borrar usuarios de su departamento, en horario laboral" |
| **Complejidad** | Baja — roles y permisos fijos | Alta — reglas combinatorias |
| **Cuando usarlo** | La mayoria de las aplicaciones | Cuando los roles no son suficientes para expresar las reglas de negocio |

RBAC cubre el 80% de los casos. Usa ABAC solo cuando necesites reglas que dependan del contexto (hora, ubicacion, relacion entre el usuario y el recurso).

---

## La regla critica: frontend RBAC es UX, no seguridad

**Ocultar un boton no es seguridad.** Cualquier usuario puede abrir DevTools, modificar el DOM, o hacer un `fetch` directo a la API. Si la API no verifica permisos independientemente, tu "seguridad" es una ilusion.

```typescript
// Esto es UX — mejora la experiencia, pero NO es seguridad
@if (permisos().includes('users:delete')) {
  <button (click)="eliminarUsuario()">Eliminar</button>
}

// La seguridad REAL esta en el servidor
// DELETE /api/users/123
// El servidor verifica: "El token de este request tiene permiso users:delete?"
// Si no -> 403 Forbidden, sin importar que el boton exista en el DOM
```

El frontend RBAC tiene dos propositos legitimos:
1. **UX:** No mostrar opciones que el usuario no puede usar (evita frustacion).
2. **Rendimiento:** No cargar modulos o datos que el usuario no necesita.

---

## De donde vienen los roles y permisos

| Fuente | Ventaja | Desventaja |
|--------|---------|------------|
| **Claims en el JWT** | Sin request adicional | JWT crece si hay muchos permisos |
| **Endpoint `/me`** | Permisos siempre actualizados | Request adicional al iniciar sesion |
| **OIDC UserInfo** | Integrado con el proveedor de identidad | Limitado a claims del proveedor |

**Recomendacion:** El JWT contiene el rol basico; un endpoint `/me` devuelve la lista completa de permisos. Asi el JWT se mantiene pequenio y los permisos siempre estan actualizados.

---

## Granularidad: roles vs permisos

### Nivel de rol (simple)

```typescript
// Verificar: "es admin?"
if (usuario.rol === 'admin') { ... }
```

Funciona para apps simples con 2-3 roles bien definidos. Se rompe cuando necesitas combinaciones: "un editor que tambien puede moderar comentarios pero no puede borrar usuarios".

### Nivel de permiso (granular)

```typescript
// Verificar: "puede borrar usuarios?"
if (permisos.includes('users:delete')) { ... }
```

Mas flexible. Los roles son agrupaciones de permisos, pero la verificacion se hace a nivel de permiso individual. Una convencion comun es `recurso:accion`:

```
users:read      users:write     users:delete
posts:read      posts:write     posts:publish
comments:read   comments:write  comments:moderate
```

---

## Implementacion en Angular

### Permission service con signals

```typescript
// permission.service.ts
import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface UserProfile {
  id: string;
  roles: string[];
  permissions: string[];
}

@Injectable({ providedIn: 'root' })
export class PermissionService {
  private http = inject(HttpClient);
  private profile = signal<UserProfile | null>(null);

  roles = computed(() => this.profile()?.roles ?? []);
  permissions = computed(() => this.profile()?.permissions ?? []);

  async cargarPermisos(): Promise<void> {
    const perfil = await firstValueFrom(
      this.http.get<UserProfile>('/api/me')
    );
    this.profile.set(perfil);
  }

  hasRole(role: string): boolean {
    return this.roles().includes(role);
  }

  hasPermission(permission: string): boolean {
    return this.permissions().includes(permission);
  }

  hasAnyPermission(...perms: string[]): boolean {
    return perms.some(p => this.permissions().includes(p));
  }
}
```

### Route guard basado en roles

```typescript
// role.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PermissionService } from './permission.service';

export function requireRole(...roles: string[]): CanActivateFn {
  return () => {
    const perms = inject(PermissionService);
    const router = inject(Router);

    const tieneRol = roles.some(r => perms.hasRole(r));
    return tieneRol ? true : router.createUrlTree(['/sin-permiso']);
  };
}

export function requirePermission(...permissions: string[]): CanActivateFn {
  return () => {
    const perms = inject(PermissionService);
    const router = inject(Router);

    const tienePermiso = permissions.every(p => perms.hasPermission(p));
    return tienePermiso ? true : router.createUrlTree(['/sin-permiso']);
  };
}

// Uso en las rutas
export const routes = [
  {
    path: 'admin/usuarios',
    loadComponent: () => import('./admin/usuarios.component'),
    canActivate: [requireRole('admin')],
  },
  {
    path: 'posts/nuevo',
    loadComponent: () => import('./posts/nuevo-post.component'),
    canActivate: [requirePermission('posts:write')],
  },
];
```

### Mostrar/ocultar en templates

En los templates, usa `@if` con el servicio para controlar visibilidad:

```typescript
// En el template de cualquier componente
@if (perms.hasPermission('posts:write')) {
  <a routerLink="/posts/nuevo">Nuevo Post</a>
}

@if (perms.hasRole('admin')) {
  <a routerLink="/admin">Admin Panel</a>
}
```

---

## Ocultar vs deshabilitar

| Estrategia | Cuando usarla | Accesibilidad |
|------------|---------------|---------------|
| **Ocultar** (`@if`) | El usuario no deberia saber que la opcion existe | Mejor — screen readers no ven el elemento |
| **Deshabilitar** (`[disabled]`) | El usuario sabe que la opcion existe pero no puede usarla ahora | Requiere explicacion de POR QUE esta deshabilitado |

**Regla general:** Oculta por **permisos** (el usuario no puede hacer esto nunca), deshabilita por **estado** (el usuario puede pero ahora no se puede).

---

## El patron "admin panel"

Para interfaces de administracion, usa lazy-loaded routes que solo se cargan para usuarios con el rol adecuado:

```typescript
// app.routes.ts
export const routes = [
  {
    path: 'admin',
    canActivate: [requireRole('admin')],
    loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES),
  },
];

// admin/admin.routes.ts
export const ADMIN_ROUTES = [
  { path: '', loadComponent: () => import('./admin-dashboard.component') },
  { path: 'usuarios', loadComponent: () => import('./usuarios.component') },
  { path: 'configuracion', loadComponent: () => import('./config.component') },
];
```

**Beneficio doble:**
1. **Seguridad (UX):** Un usuario sin rol `admin` nunca ve las rutas de admin.
2. **Rendimiento:** El bundle de admin no se descarga para usuarios normales.

Pero recuerda: aunque el bundle no se descargue, la API detras de cada endpoint de admin **debe** verificar permisos independientemente.

---

## Anti-patterns

- **Verificar permisos en cada componente individualmente.** Centraliza la logica en un `PermissionService`. Si la logica de permisos esta dispersa en 50 componentes, un cambio en la estructura de permisos requiere modificar 50 archivos.
- **Confiar en el frontend para seguridad.** El usuario puede modificar cualquier cosa en el navegador. Si la API no rechaza requests no autorizados con un 403, no tienes seguridad.
- **JWT con todos los permisos.** Si un usuario tiene 200 permisos y los metes todos en el JWT, el token crece significativamente y se envia en cada request. Usa un endpoint `/me` para permisos granulares.
- **Guardar permisos en localStorage.** Son modificables por el usuario y persisten entre sesiones. Si el admin revoca un permiso, el usuario lo mantiene hasta que limpie el storage. Usa memoria o un signal que se recargue al iniciar sesion.
- **Roles hardcodeados como strings magicos.** Define constantes o un enum para roles y permisos. `if (rol === 'adm1n')` es un bug silencioso que nunca lanza error.

```typescript
// MAL — strings magicos
if (usuario.rol === 'admin') { ... }

// BIEN — constantes tipadas
const ROLES = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  VIEWER: 'viewer',
} as const;

if (usuario.rol === ROLES.ADMIN) { ... }
```

---

## Puntos clave

- RBAC organiza autorizacion en tres niveles: usuario -> rol -> permisos. Es el modelo mas comun y cubre la mayoria de los casos.
- **Frontend RBAC es UX, no seguridad.** Ocultar un boton mejora la experiencia pero la API debe rechazar requests no autorizados independientemente.
- Obtiene roles y permisos del JWT (basico) o de un endpoint `/me` (granular). Evita JWTs inflados con cientos de permisos.
- Usa un `PermissionService` centralizado con signals. Los guards protegen rutas, los templates usan `@if` para mostrar/ocultar elementos.
- Oculta por **permisos** (el usuario no puede), deshabilita por **estado** (el usuario puede pero ahora no). Si deshabilitas, explica por que (accesibilidad).
- El patron "admin panel" usa lazy-loaded routes: el bundle de admin no se descarga para usuarios sin el rol adecuado.
- Define roles y permisos como constantes tipadas, no como strings magicos dispersos por el codigo.

---

[<- Volver a Etapa 6](../README.md)
