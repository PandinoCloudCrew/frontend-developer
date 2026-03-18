# Reactive Forms en Angular

> Cómo construir formularios complejos con el módulo de Reactive Forms de Angular. Cubre `FormGroup`, `FormControl`, `FormArray`, validators, `valueChanges`, formularios dinámicos y validación cross-field.

---

## Por Qué Reactive Forms

Angular ofrece dos enfoques de formularios: Template-driven (más simple, para formularios triviales) y Reactive (más control, para formularios complejos). Los Reactive Forms son el estándar para formularios profesionales porque:

- El modelo del formulario vive en TypeScript, no en el template.
- Validación programática, no mediante atributos HTML.
- Testing sin renderizar el template.
- Formularios dinámicos (agregar/quitar campos en runtime).

---

## `FormGroup` y `FormControl`

```typescript
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <label>
        Nombre
        <input formControlName="name" />
        @if (form.controls.name.errors?.['required'] && form.controls.name.touched) {
          <span class="error">El nombre es requerido</span>
        }
      </label>

      <label>
        Email
        <input formControlName="email" type="email" />
        @if (form.controls.email.errors?.['email'] && form.controls.email.touched) {
          <span class="error">Email inválido</span>
        }
      </label>

      <label>
        Contraseña
        <input formControlName="password" type="password" />
        @if (form.controls.password.errors?.['minlength'] && form.controls.password.touched) {
          <span class="error">Mínimo 8 caracteres</span>
        }
      </label>

      <button type="submit" [disabled]="form.invalid">Registrarse</button>
    </form>
  `,
})
export class RegistrationComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      // { name: 'Jane', email: 'jane@example.com', password: '...' }
    }
  }
}
```

`FormBuilder` es un helper que simplifica la creación de `FormGroup` y `FormControl`.

---

## Validators Personalizados

```typescript
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Sync validator
export function noWhitespace(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const hasWhitespace = /\s/.test(control.value);
    return hasWhitespace ? { noWhitespace: true } : null;
  };
}

// Async validator (e.g., check if email exists)
export function emailAvailable(
  userService: UserService
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return userService.checkEmail(control.value).pipe(
      map(exists => (exists ? { emailTaken: true } : null)),
      catchError(() => of(null)),
    );
  };
}
```

```typescript
// Uso
form = this.fb.group({
  username: ['', [Validators.required, noWhitespace()]],
  email: ['', [Validators.required, Validators.email], [emailAvailable(this.userService)]],
});
```

---

## `FormArray` --- Campos Dinámicos

Para listas de campos que se pueden agregar o quitar:

```typescript
@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <h3>Ingredientes</h3>

      <div formArrayName="ingredients">
        @for (ingredient of ingredients.controls; track $index) {
          <div [formGroupName]="$index" class="ingredient-row">
            <input formControlName="name" placeholder="Ingrediente" />
            <input formControlName="quantity" placeholder="Cantidad" />
            <button type="button" (click)="removeIngredient($index)">Eliminar</button>
          </div>
        }
      </div>

      <button type="button" (click)="addIngredient()">+ Agregar ingrediente</button>
    </form>
  `,
})
export class RecipeFormComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    title: ['', Validators.required],
    ingredients: this.fb.array([this.createIngredient()]),
  });

  get ingredients() {
    return this.form.controls.ingredients;
  }

  createIngredient() {
    return this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
    });
  }

  addIngredient() {
    this.ingredients.push(this.createIngredient());
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }
}
```

---

## `valueChanges` Observable

Cada `FormControl`, `FormGroup` y `FormArray` expone un observable `valueChanges` para reaccionar a cambios:

```typescript
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({ /* ... */ })
export class SearchFormComponent {
  private fb = inject(FormBuilder);
  private searchService = inject(SearchService);

  searchControl = this.fb.control('');

  // Reactive search: debounce, skip duplicates, fetch results
  results = toSignal(
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.searchService.search(query ?? '')),
    ),
    { initialValue: [] }
  );
}
```

---

## Validación Cross-Field

Para validaciones que dependen de múltiples campos (ej: confirmar contraseña):

```typescript
import { AbstractControl, ValidationErrors } from '@angular/forms';

function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return password === confirm ? null : { passwordsMismatch: true };
}

// Aplicar al FormGroup
form = this.fb.group(
  {
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required],
  },
  { validators: passwordsMatch }
);
```

```html
@if (form.errors?.['passwordsMismatch'] && form.controls.confirmPassword.touched) {
  <span class="error">Las contraseñas no coinciden</span>
}
```

---

## Errores Comunes

- **No importar `ReactiveFormsModule`.** Sin él en el array `imports`, las directivas `formGroup`, `formControlName`, etc. no se reconocen.
- **Usar template-driven forms para formularios complejos.** Los template-driven forms son convenientes para formularios de 2-3 campos, pero se vuelven difíciles de manejar con validación compleja, campos dinámicos o lógica condicional.
- **Acceder a `.value` sin verificar `.valid`.** Siempre verifica `form.valid` antes de usar `form.value` para enviar datos.
- **No mostrar errores en el momento correcto.** Muestra errores después de `touched` (el usuario interactuó con el campo) o `dirty` (el usuario cambió el valor), no inmediatamente al renderizar.

---

## Puntos Clave

- Reactive Forms manejan el modelo del formulario en TypeScript, no en el template. Más control, más testeable.
- `FormBuilder` simplifica la creación de `FormGroup`, `FormControl` y `FormArray`.
- Validators personalizados son funciones puras que retornan `null` (válido) o un objeto de errores.
- `FormArray` permite campos dinámicos (agregar/quitar en runtime).
- `valueChanges` es un Observable que permite reaccionar a cambios con operadores RxJS (debounce, distinctUntilChanged).
