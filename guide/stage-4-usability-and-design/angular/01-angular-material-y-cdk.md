# Angular Material y CDK

> Cómo usar Angular CDK (Component Dev Kit) para accesibilidad, layout, overlays y drag-drop. Angular Material como opción de componentes listos para usar. La relación con el patrón headless UI.

---

## Angular CDK: La Capa Headless de Angular

El CDK (Component Dev Kit) es una colección de **primitivas de comportamiento sin estilo** --- el equivalente de Angular a las bibliotecas headless como Radix o React Aria. Proporciona la lógica compleja (focus management, keyboard handling, overlays, virtual scrolling) sin imponer estilos.

```bash
ng add @angular/cdk
```

---

## Módulo de Accesibilidad (a11y)

Herramientas para gestionar focus, live regions y navegación por teclado:

```typescript
import { Component, inject } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [A11yModule],
  template: `
    <div
      cdkTrapFocus
      cdkTrapFocusAutoCapture
      class="dialog"
    >
      <h2>Confirmar acción</h2>
      <p>¿Estás seguro?</p>
      <button (click)="confirm()">Sí</button>
      <button (click)="cancel()">No</button>
    </div>
  `,
})
export class ConfirmDialogComponent {
  private announcer = inject(LiveAnnouncer);

  confirm() {
    this.announcer.announce('Acción confirmada', 'polite');
  }

  cancel() {
    this.announcer.announce('Acción cancelada', 'polite');
  }
}
```

- **`cdkTrapFocus`:** atrapa el focus dentro de un contenedor (esencial para modales y dialogs).
- **`cdkTrapFocusAutoCapture`:** mueve el focus automáticamente al primer elemento focusable.
- **`LiveAnnouncer`:** anuncia mensajes a lectores de pantalla sin elementos visibles.
- **`FocusMonitor`:** detecta el origen del focus (mouse, keyboard, touch, programmatic).

---

## Overlay --- Popups, Tooltips, Dropdowns

El sistema de overlay de CDK gestiona el posicionamiento, scroll blocking y stacking de elementos flotantes:

```typescript
import { Component, inject } from '@angular/core';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [OverlayModule],
  template: `
    <button cdkOverlayOrigin #trigger="cdkOverlayOrigin" (click)="isOpen = !isOpen">
      Opciones
    </button>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="trigger"
      [cdkConnectedOverlayOpen]="isOpen"
      [cdkConnectedOverlayHasBackdrop]="true"
      (backdropClick)="isOpen = false"
    >
      <div class="dropdown-menu">
        <button (click)="select('edit')">Editar</button>
        <button (click)="select('delete')">Eliminar</button>
      </div>
    </ng-template>
  `,
})
export class DropdownComponent {
  isOpen = false;

  select(action: string) {
    this.isOpen = false;
    // handle action...
  }
}
```

---

## Drag and Drop

```typescript
import { Component, signal } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [DragDropModule],
  template: `
    <div cdkDropList (cdkDropListDropped)="drop($event)">
      @for (task of tasks(); track task.id) {
        <div cdkDrag class="task-card">
          {{ task.title }}
        </div>
      }
    </div>
  `,
})
export class TaskBoardComponent {
  tasks = signal([
    { id: '1', title: 'Diseñar wireframes' },
    { id: '2', title: 'Implementar login' },
    { id: '3', title: 'Escribir tests' },
  ]);

  drop(event: CdkDragDrop<string[]>) {
    this.tasks.update(tasks => {
      const updated = [...tasks];
      moveItemInArray(updated, event.previousIndex, event.currentIndex);
      return updated;
    });
  }
}
```

---

## Layout Module

Detección responsive de breakpoints sin media queries en CSS:

```typescript
import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({ /* ... */ })
export class ResponsiveNavComponent {
  private breakpointObserver = inject(BreakpointObserver);

  isMobile = toSignal(
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(map(result => result.matches)),
    { initialValue: false }
  );
}
```

---

## Angular Material: Componentes con Estilo

Angular Material es una biblioteca de componentes con estilo completo basada en Material Design. Está construida sobre CDK:

```bash
ng add @angular/material
```

```typescript
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  template: `
    <mat-form-field>
      <mat-label>Email</mat-label>
      <input matInput formControlName="email" />
    </mat-form-field>

    <button mat-raised-button color="primary" (click)="login()">
      Iniciar sesión
    </button>
  `,
})
export class LoginComponent {}
```

**Cuándo usar Material vs CDK:**
- **CDK:** cuando quieres control total sobre los estilos y solo necesitas el comportamiento (focus, overlay, drag-drop, virtual scroll).
- **Material:** cuando quieres componentes listos para usar con buen diseño y accesibilidad incluida, y el estilo Material Design es aceptable.

---

## Errores Comunes

- **Importar todo Angular Material.** Solo importa los módulos que usas. `import { MatButtonModule }` en vez de importar el módulo completo.
- **Ignorar CDK y saltar directo a Material.** CDK te da las primitivas para construir tus propios componentes accesibles. Si necesitas un design system personalizado, CDK es la base correcta.
- **Sobreescribir estilos de Material con `!important`.** Si necesitas personalización profunda más allá del theming, probablemente Material no es la opción correcta. Usa CDK + tus propios estilos.
- **No usar `cdkTrapFocus` en modales.** Sin focus trap, los usuarios de teclado pueden tabular fuera del modal hacia contenido de fondo, violando accesibilidad.

---

## Puntos Clave

- Angular CDK es la capa headless: comportamiento sin estilos. Focus management, overlays, drag-drop, virtual scrolling y detección de breakpoints.
- Angular Material es una capa de componentes con estilo construida sobre CDK. Buena para prototipos y apps con estilo Material Design.
- CDK es comparable a Radix o React Aria: proporciona accesibilidad y comportamiento, tú controlas los estilos.
- Usa CDK cuando construyas un design system personalizado. Usa Material cuando el estilo por defecto sea aceptable.
