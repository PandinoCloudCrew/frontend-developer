# Setup de Angular --- Tu Primer Proyecto

> Por qué existen los frameworks, qué problemas resuelve Angular, y cómo crear tu primera aplicación con Angular CLI.

---

## Por Qué Existen los Frameworks

En la Etapa 1 construiste interfaces con HTML, CSS y JavaScript vanilla. Funciona, pero a medida que la aplicación crece, te enfrentas a problemas repetitivos:

- **Sincronización manual del DOM.** Cada cambio de datos requiere encontrar el elemento correcto y actualizarlo manualmente. En una app con 50 elementos dinámicos, esto se vuelve inmanejable.
- **Sin estructura para componentes.** No hay una forma estándar de encapsular UI reutilizable con su lógica y estilos.
- **Gestión de estado ad-hoc.** Sin un patrón claro, el estado se dispersa en variables globales, atributos de datos y el DOM mismo.

Los frameworks resuelven estos problemas proporcionando: renderizado declarativo (describes qué mostrar, no cómo actualizarlo), un sistema de componentes y herramientas integradas de desarrollo.

---

## Qué Resuelve Angular

Angular es un **framework completo** (batteries-included): routing, formularios, HTTP client, dependency injection, testing --- todo viene integrado. No necesitas elegir y configurar 15 bibliotecas separadas.

- **TypeScript por defecto.** Angular fue el primer framework grande en adoptar TypeScript como lenguaje principal.
- **Dependency Injection.** El sistema de DI más maduro del ecosistema frontend.
- **Opiniones fuertes.** Angular tiene una forma "correcta" de hacer las cosas. Esto reduce decisiones de arquitectura y facilita que equipos grandes mantengan consistencia.

---

## Crear un Proyecto con Angular CLI

```bash
# Instala Angular CLI globalmente
npm install -g @angular/cli

# Crea un nuevo proyecto (standalone components por defecto desde Angular 19)
ng new mi-primera-app

# Opciones que te preguntará:
# - Stylesheet format: CSS (o SCSS si prefieres)
# - SSR/SSG: No (para empezar)
```

```bash
# Entra al directorio y levanta el servidor de desarrollo
cd mi-primera-app
ng serve
```

Abre `http://localhost:4200` en tu navegador. Verás la página de bienvenida de Angular.

---

## Estructura del Proyecto

```
mi-primera-app/
  src/
    app/
      app.component.ts       ← Componente raíz
      app.component.html     ← Template del componente raíz
      app.component.css      ← Estilos del componente raíz
      app.component.spec.ts  ← Tests del componente raíz
      app.config.ts          ← Configuración de la app
      app.routes.ts          ← Definición de rutas
    index.html               ← Página HTML principal
    main.ts                  ← Entry point de la aplicación
    styles.css               ← Estilos globales
  angular.json               ← Configuración de Angular CLI
  tsconfig.json              ← Configuración de TypeScript
  package.json               ← Dependencias
```

---

## Tu Primer Componente

```bash
# Genera un nuevo componente
ng generate component greeting
# Shorthand: ng g c greeting
```

Esto crea cuatro archivos en `src/app/greeting/`:

```typescript
// greeting.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-greeting',
  standalone: true,
  templateUrl: './greeting.component.html',
  styleUrl: './greeting.component.css',
})
export class GreetingComponent {
  name = 'mundo';
}
```

```html
<!-- greeting.component.html -->
<h1>Hola, {{ name }}!</h1>
```

Para usarlo en `app.component.html`:

```typescript
// app.component.ts — importa el componente
import { Component } from '@angular/core';
import { GreetingComponent } from './greeting/greeting.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GreetingComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
```

```html
<!-- app.component.html -->
<app-greeting />
```

---

## Comandos Esenciales de Angular CLI

```bash
ng serve              # Servidor de desarrollo con HMR
ng build              # Build de producción
ng test               # Ejecutar unit tests
ng generate component # Generar componente
ng generate service   # Generar servicio
ng add @angular/material  # Agregar biblioteca
```

---

## Errores Comunes

- **No importar el componente en `imports`.** Desde Angular 19, los componentes son standalone por defecto. Debes importar explícitamente cada componente que uses en el template dentro del array `imports` del decorador `@Component`.
- **Confundir módulos y standalone.** Los proyectos nuevos de Angular 19+ no usan `NgModule` por defecto. Si un tutorial menciona `declarations` o `NgModule`, probablemente es de una versión anterior.
- **Ignorar el CLI.** Crear archivos manualmente en vez de usar `ng generate` lleva a errores de nombrado y archivos faltantes. El CLI aplica convenciones automáticamente.

---

## Puntos Clave

- Angular es un framework batteries-included: routing, HTTP, formularios, DI y testing vienen integrados.
- `ng new` crea un proyecto listo para desarrollar. `ng generate component` crea componentes con la estructura correcta.
- Desde Angular 19, los componentes son standalone por defecto --- no necesitas `NgModule`.
- Usa siempre Angular CLI para generar código. Aplica convenciones y evita errores manuales.
