# Formularios en React



> Cómo construir formularios robustos en React. Cubre controlled vs uncontrolled, React Hook Form, validación con Zod, timing de validación y formularios multi-step.

---

## Contenido
- [Controlled vs uncontrolled: resumen rápido](#controlled-vs-uncontrolled-resumen-rápido)
- [React Hook Form: el estándar](#react-hook-form-el-estándar)
- [Validación con Zod](#validación-con-zod)
- [Timing de validación](#timing-de-validación)
- [Formularios multi-step](#formularios-multi-step)
- [Anti-patterns](#anti-patterns)

---

## Controlled vs Uncontrolled: Resumen Rápido

En la lectura de API de componentes viste la diferencia:

- **Controlled:** React controla el valor con `value` + `onChange`. Cada keystroke causa un re-render.
- **Uncontrolled:** el DOM mantiene el valor. React solo lo lee cuando lo necesita.

Para formularios con más de 2-3 campos, **no uses controlled inputs manuales**. Cada campo con `useState` + `onChange` es boilerplate innecesario. React Hook Form hace esto mejor.

---

## React Hook Form: El Estándar

React Hook Form usa inputs uncontrolled internamente para evitar re-renders innecesarios:

```bash
npm install react-hook-form
```

```
import { useForm } from 'react-hook-form';

interface RegistrationData {
  name: string;
  email: string;
  password: string;
}

function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationData>();

  async function onSubmit(data: RegistrationData) {
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Nombre
        <input {...register('name', { required: 'El nombre es requerido' })} />
        {errors.name && <span className="error">{errors.name.message}</span>}
      </label>

      <label>
        Email
        <input
          type="email"
          {...register('email', {
            required: 'El email es requerido',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Email inválido',
            },
          })}
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </label>

      <label>
        Contraseña
        <input
          type="password"
          {...register('password', {
            required: 'La contraseña es requerida',
            minLength: { value: 8, message: 'Mínimo 8 caracteres' },
          })}
        />
        {errors.password && <span className="error">{errors.password.message}</span>}
      </label>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Registrando...' : 'Registrarse'}
      </button>
    </form>
  );
}
```

- **`register('name')`** conecta el input al formulario (equivalente a `formControlName` en Angular).
- **`handleSubmit(onSubmit)`** valida antes de ejecutar `onSubmit`. Si hay errores, no llama a la función.
- **`formState.errors`** contiene los errores de validación de cada campo.
- **Sin re-renders innecesarios.** React Hook Form no usa `useState` internamente para cada campo.

React Hook Form en React ≈ Reactive Forms en Angular. `register` ≈ `FormControl`, `handleSubmit` ≈ `ngSubmit` + `.valid`.

---

## Validación con Zod

Para validación type-safe, integra Zod con React Hook Form:

```bash
npm install zod @hookform/resolvers
```

```
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const registrationSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

// El tipo se infiere automáticamente del schema
type RegistrationData = z.infer<typeof registrationSchema>;

function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
  });

  async function onSubmit(data: RegistrationData) {
    // data está validado y tipado
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}

      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}

      <input type="password" {...register('password')} />
      {errors.password && <span>{errors.password.message}</span>}

      <input type="password" {...register('confirmPassword')} />
      {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

      <button type="submit">Registrarse</button>
    </form>
  );
}
```

**Ventaja de Zod:** el schema define validación Y tipos. `z.infer<typeof schema>` genera el tipo TypeScript automáticamente --- una sola fuente de verdad.

---

## Timing de Validación

React Hook Form permite controlar cuándo se ejecuta la validación:

```
const { register, handleSubmit } = useForm<FormData>({
  resolver: zodResolver(schema),
  mode: 'onBlur',            // valida cuando el campo pierde focus
  // mode: 'onChange',        // valida en cada keystroke (puede ser lento)
  // mode: 'onSubmit',        // valida solo al submit (default)
  // mode: 'onTouched',       // valida la primera vez al blur, luego en cada cambio
  // mode: 'all',             // valida en blur Y en cada cambio
});
```

**Recomendación:** `onBlur` para la mayoría de los formularios. Valida cuando el usuario termina de escribir en un campo, no mientras escribe.

---

## Formularios Multi-Step

```
import { useForm } from 'react-hook-form';
import { useState } from 'react';

interface WizardData {
  name: string;
  email: string;
  address: string;
  city: string;
}

function WizardForm() {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, trigger, formState: { errors } } = useForm<WizardData>();

  async function nextStep() {
    // Valida solo los campos del paso actual
    const fieldsToValidate = step === 1
      ? ['name', 'email'] as const
      : ['address', 'city'] as const;

    const isValid = await trigger(fieldsToValidate);
    if (isValid) setStep(step + 1);
  }

  async function onSubmit(data: WizardData) {
    await fetch('/api/registration', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {step === 1 && (
        <div>
          <input {...register('name', { required: 'Requerido' })} placeholder="Nombre" />
          {errors.name && <span>{errors.name.message}</span>}
          <input {...register('email', { required: 'Requerido' })} placeholder="Email" />
          {errors.email && <span>{errors.email.message}</span>}
          <button type="button" onClick={nextStep}>Siguiente</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <input {...register('address', { required: 'Requerido' })} placeholder="Dirección" />
          {errors.address && <span>{errors.address.message}</span>}
          <input {...register('city', { required: 'Requerido' })} placeholder="Ciudad" />
          {errors.city && <span>{errors.city.message}</span>}
          <button type="button" onClick={() => setStep(1)}>Atrás</button>
          <button type="submit">Enviar</button>
        </div>
      )}
    </form>
  );
}
```

`trigger(['name', 'email'])` valida solo los campos especificados, permitiendo validación parcial por paso.

---

## Anti-patterns

- **`useState` + `onChange` para cada campo.** Si tienes más de 2 campos, usa React Hook Form. Menos boilerplate, menos re-renders, validación integrada.
- **No validar antes del submit.** Esperar al submit para mostrar todos los errores de golpe es mala UX. Usa `mode: 'onBlur'` para feedback inmediato.
- **Duplicar tipos y validación.** Si defines una interface TypeScript Y reglas de validación separadas, se pueden desincoronizar. Usa Zod + `z.infer` para una sola fuente de verdad.
- **Inputs controlled para formularios grandes.** Cada keystroke causa un re-render del formulario completo. React Hook Form evita esto con inputs uncontrolled internos.

---

## Puntos Clave

- React Hook Form es el estándar para formularios en React. Usa inputs uncontrolled internamente para rendimiento.
- `register` conecta inputs al formulario. `handleSubmit` valida antes de llamar a tu función.
- Zod + `zodResolver` unifican validación y tipos en un solo schema.
- `mode: 'onBlur'` es el mejor balance entre UX y rendimiento para la mayoría de formularios.
- `trigger` permite validación parcial para formularios multi-step.


