# Form State Management

Los formularios son el patron interactivo mas complejo en el desarrollo frontend. Un input de busqueda tiene un estado. Un formulario de registro de multiples pasos tiene docenas: valores de campo, errores de validacion, estado touched, estado dirty, estado de envio, errores del servidor. Los formularios merecen patrones dedicados porque combinan multiples problemas dificiles a la vez.

---

## Por Que los Formularios Son Especiales

Un formulario no es solo una coleccion de inputs. Tiene preocupaciones que el estado normal de UI no tiene:

| Preocupacion      | Que significa                                      |
|-------------------|----------------------------------------------------|
| **Values**        | Datos actuales en cada campo                       |
| **Errors**        | Mensajes de validacion por campo y/o para todo el formulario |
| **Touched**       | Ha interactuado el usuario con este campo?        |
| **Dirty**         | Ha cambiado el valor respecto al valor inicial?   |
| **Submitting**    | Se esta enviando el formulario actualmente?       |
| **Submit count**  | Cuantas veces ha intentado enviar el usuario?     |

Una llamada tipica a `useState` gestiona un valor. Los formularios necesitan estado coordinado en todas estas dimensiones.

## Controlled vs Uncontrolled Forms

**Controlled forms** — el estado de React o del framework mantiene el valor de cada campo. Cada pulsacion de tecla dispara una actualizacion de estado.

```tsx
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Log in</button>
    </form>
  );
}
```

Controlled: predecible, inspeccionable, facil de validar en cada cambio. Pero verboso — cada campo necesita su propio estado y handler.

**Uncontrolled forms** — el DOM mantiene los valores. Los lees al enviar.

```tsx
function LoginForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    // submit { email, password }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" defaultValue="" />
      <input name="password" type="password" />
      <button type="submit">Log in</button>
    </form>
  );
}
```

Uncontrolled: simple, menos codigo, aprovecha el manejo de formularios integrado del navegador. Pero mas dificil de validar antes de enviar, mas dificil de habilitar/deshabilitar campos condicionalmente, mas dificil de mostrar feedback en tiempo real.

| | Controlled | Uncontrolled |
|---|---|---|
| Volumen de codigo | Mas | Menos |
| Validacion en tiempo real | Facil | Dificil |
| Rendimiento (muchos campos) | Puede ser lento (re-renders) | Mejor (sin re-renders) |
| Leer valores en cualquier momento | Si | Solo al enviar |
| Mejor para | Formularios complejos con validacion | Formularios simples, rendimiento critico |

## Librerias de Formularios

Para cualquier cosa mas alla de un formulario de login, usa una libreria de formularios. Resuelven el problema de coordinacion.

**React Hook Form** — el estandar actual para React. Uncontrolled por defecto para rendimiento, con campos controlled opcionales.

```tsx
import { useForm } from "react-hook-form";

function SignupForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: "", name: "" },
  });

  const onSubmit = (data) => api.createUser(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email", { required: "Email is required" })} />
      {errors.email && <span>{errors.email.message}</span>}
      <input {...register("name", { required: "Name is required" })} />
      {errors.name && <span>{errors.name.message}</span>}
      <button type="submit">Sign up</button>
    </form>
  );
}
```

**VeeValidate** — manejo de formularios para Vue:

```vue
<script setup>
import { useForm } from 'vee-validate';

const { handleSubmit, defineField, errors } = useForm({
  initialValues: { email: '', name: '' },
});

const [email, emailAttrs] = defineField('email');
const [name, nameAttrs] = defineField('name');

const onSubmit = handleSubmit((values) => api.createUser(values));
</script>
```

**Angular Reactive Forms** — integrados en el framework:

```typescript
@Component({ /* ... */ })
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.form.valid) api.createUser(this.form.value);
  }
}
```

## Estrategias de Validacion

Cuando validas importa tanto como que validas.

**On change** — validar en cada pulsacion de tecla. Feedback inmediato pero puede ser molesto ("Invalid email" mientras el usuario aun esta escribiendo).

**On blur** — validar cuando el usuario abandona el campo. Le da tiempo al usuario para terminar de escribir antes de mostrar errores. Este es generalmente el mejor valor predeterminado.

**On submit** — validar cuando se envia el formulario. Menos intrusivo pero da el feedback mas tardio. Los usuarios podrian llenar un formulario entero antes de enterarse de que el primer campo estaba mal.

La mejor UX suele ser una combinacion:

```
First validation: on blur (or on submit)
Subsequent validation: on change (clear the error as soon as the user fixes it)
```

```tsx
// React Hook Form supports this out of the box
const { register, handleSubmit, formState: { errors } } = useForm({
  mode: "onBlur",           // First validation on blur
  reValidateMode: "onChange" // After first error, re-validate on change
});
```

## Validacion Basada en Schemas

Define tus reglas de validacion como un schema. Reutilizalo en cliente y servidor.

```typescript
import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Must be at least 8 characters"),
  age: z.number().min(13, "Must be at least 13 years old"),
});

// Use on the client with React Hook Form
import { zodResolver } from "@hookform/resolvers/zod";

const { register, handleSubmit } = useForm({
  resolver: zodResolver(signupSchema),
});

// Use on the server (same schema)
function handleSignup(body: unknown) {
  const result = signupSchema.safeParse(body);
  if (!result.success) return { errors: result.error.flatten() };
  createUser(result.data);
}
```

Una definicion de schema. Dos contextos de validacion. Cero divergencia entre las reglas del cliente y del servidor.

**Zod, Yup, Valibot** — todos cumplen este proposito. Zod tiene la integracion mas fuerte con TypeScript y es la opcion mas comun en proyectos modernos. Valibot es la mas pequena (tree-shakable). Yup es la mas antigua y la mas probada en batalla.

## Formularios de Multiples Pasos (Wizards)

Los formularios de multiples pasos agregan complejidad: preservar estado entre pasos, validar por paso y permitir a los usuarios navegar hacia atras sin perder datos.

```tsx
function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const updateFields = (fields: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  switch (step) {
    case 1: return <PersonalInfo data={formData} onUpdate={updateFields} onNext={next} />;
    case 2: return <Address data={formData} onUpdate={updateFields} onNext={next} onBack={back} />;
    case 3: return <Review data={formData} onSubmit={submitAll} onBack={back} />;
  }
}
```

Reglas clave para formularios de multiples pasos:

1. **Valida cada paso independientemente.** No dejes que el usuario avance al paso 2 con datos invalidos del paso 1.
2. **Preserva el estado al navegar hacia atras.** Volver al paso 1 deberia mostrar los valores que ya ingresaron.
3. **Muestra el progreso.** Un indicador de paso ("Step 2 of 3") reduce la ansiedad y el abandono.
4. **Envia solo al final.** No hagas llamadas al servidor en cada transicion de paso a menos que lo necesites (p.ej., verificar si un email ya esta registrado).

## Envio del Formulario

Maneja el envio como una maquina de estados: idle, submitting, success, error.

```tsx
function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    setStatus("submitting");
    try {
      await api.submitContact(data);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      // If the server returns field-level errors, apply them
      if (err.fieldErrors) {
        Object.entries(err.fieldErrors).forEach(([field, message]) => {
          setError(field, { message });
        });
      }
    }
  };

  if (status === "success") {
    return <p>Thanks! We'll be in touch.</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {status === "error" && <div role="alert">Submission failed. Please try again.</div>}
      {/* fields */}
      <button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
```

**Prevenir doble envio:** Deshabilita el boton de enviar mientras `status === "submitting"`. Nunca confies en que el usuario no hara clic dos veces.

**Errores de validacion del servidor:** El servidor podria rechazar datos que pasaron la validacion del cliente (p.ej., "email already registered"). Mapea los errores del servidor de vuelta a campos especificos.

## Errores a Nivel de Campo vs a Nivel de Formulario

**Errores a nivel de campo** aparecen junto al campo al que se refieren: "Email is required", "Password must be at least 8 characters". Usalos para problemas de validacion vinculados a un input especifico.

**Errores a nivel de formulario** aparecen en la parte superior o inferior del formulario: "Unable to create account. Please try again." Usalos para fallos de envio, errores del servidor y problemas de validacion entre campos ("End date must be after start date").

```tsx
<form>
  {/* Form-level error */}
  {formError && <div role="alert" className="form-error">{formError}</div>}

  {/* Field-level error */}
  <label>
    Email
    <input {...register("email")} aria-invalid={!!errors.email} />
    {errors.email && <span role="alert">{errors.email.message}</span>}
  </label>
</form>
```

## Errores Comunes

**Validar en cada pulsacion de tecla desde el principio.** El usuario escribe "j" en el campo de email e inmediatamente ve "Invalid email address." Lo sabe. No ha terminado de escribir. Valida on blur primero, luego revalida on change despues de que el primer error aparezca.

**Validar solo on submit.** El usuario llena 15 campos, presiona enviar y recibe un muro de errores. Valida incrementalmente para que los errores se detecten temprano.

**Validacion solo del lado del cliente.** La validacion del cliente es una funcionalidad de UX, no una funcionalidad de seguridad. Un atacante puede saltarse tu cliente por completo. Siempre valida tambien en el servidor — y usa el mismo schema (Zod) para ambos.

**Perder datos del formulario al navegar.** El usuario llena un formulario largo, accidentalmente hace clic en un enlace y pierde todo. Advierte antes de navegar fuera de un formulario dirty.

```tsx
// React Router: warn on navigation away from dirty form
useEffect(() => {
  const handler = (e: BeforeUnloadEvent) => {
    if (isDirty) e.preventDefault();
  };
  window.addEventListener("beforeunload", handler);
  return () => window.removeEventListener("beforeunload", handler);
}, [isDirty]);
```

**Form state en un global store.** Poner valores de formulario en Redux/Zustand/Pinia casi nunca es necesario. El form state es local — pertenece en el componente (o en una libreria de formularios). Los global stores son para estado que multiples componentes no relacionados necesitan leer.

**Un unico componente gigante de formulario.** Un componente de 500 lineas que renderiza todos los campos, maneja toda la validacion y gestiona toda la logica de envio. Dividelo en grupos de campos, extrae la validacion a un schema y separa la logica de envio en un custom hook o servicio.

## Puntos Clave

- Los formularios tienen preocupaciones unicas (values, errors, touched, dirty, estado de envio) que los patrones regulares de gestion de estado no abordan bien. Usa una libreria de formularios para cualquier cosa no trivial.
- Valida on blur primero, luego revalida on change despues de que aparezcan errores. Esto da el mejor balance de UX.
- Usa validacion basada en schemas (Zod) para compartir reglas entre cliente y servidor.
- Previen el doble envio deshabilitando el boton durante el submit. Maneja los errores de validacion del servidor mapeandolos de vuelta a los campos.
- El form state es local. Casi nunca pertenece en un global store.
