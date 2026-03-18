# TypeScript Basico

TypeScript es la linea base para el desarrollo frontend profesional en 2026. Agrega type safety a JavaScript, detectando errores en tiempo de compilacion en lugar de en produccion. Con un 78% de adopcion en proyectos React y el 82% de las ofertas de trabajo frontend requiriendo o prefiriendo TypeScript, es una habilidad esencial que debes dominar desde los fundamentos.

---

## Adopcion y relevancia

- **El 48.8% de todos los desarrolladores profesionales** usan TypeScript (Stack Overflow 2025).
- **Tasa de satisfaccion del 84.1%** entre los usuarios actuales.
- **78% de adopcion en proyectos React** especificamente.
- **El 82% de las ofertas de trabajo frontend** requieren o prefieren TypeScript.
- TypeScript supero a Python y JavaScript para convertirse en **el lenguaje mas usado en GitHub** en agosto de 2025.

---

## Rol en el ecosistema actual

Escribir JavaScript plano para produccion se considera un enfoque legacy. Aspectos clave del rol de TypeScript:

- **Type safety de extremo a extremo**: TypeScript conecta frontend y backend mediante herramientas como tRPC, proporcionando inferencia de tipos completa a traves de los limites de la API.
- **Integracion con React Compiler**: React Compiler entiende los tipos de TypeScript para una mejor optimizacion.
- **Alineacion con frameworks**: Todos los frameworks principales (React, Angular, Vue, Svelte, Solid) tienen soporte de primera clase para TypeScript.

---

## Mejores practicas

- **Usa `strict: true`** en `tsconfig.json`. El costo de la estrictez es bajo cuando se adopta desde el primer dia; es enorme cuando se adapta retroactivamente.
- **Prefiere la inferencia de tipos** sobre las anotaciones explicitas donde los tipos son obvios. TypeScript es inteligente — no necesitas anotar todo.
- **Usa uniones discriminadas** para el modelado de estado. Esto te permite representar estados complejos de forma segura:

```ts
type RequestState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: User[] }
  | { status: 'error'; error: string };
```

- **Aprovecha el operador `satisfies`** para verificacion de tipos sin widening:

```ts
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
} satisfies Record<string, string | number>;
// TypeScript verifica el tipo pero mantiene los tipos literales
```

- **Usa template literal types** para validacion de patrones de cadenas:

```ts
type Route = `/${string}`;
type HexColor = `#${string}`;
```

- **Evita `any`; usa `unknown`** cuando el tipo es genuinamente desconocido. `any` desactiva todas las verificaciones de tipo; `unknown` te obliga a verificar el tipo antes de usarlo.

```ts
// Bad
function parse(input: any) {
  return input.name; // no type checking
}

// Good
function parse(input: unknown) {
  if (typeof input === 'object' && input !== null && 'name' in input) {
    return (input as { name: string }).name;
  }
  throw new Error('Invalid input');
}
```

---

## Errores comunes y anti-patrones

**Aserciones de tipo con `as` como muleta para silenciar errores:**

Escribir `data as User` le dice al compilador "confia en mi" sin ninguna validacion en runtime. Si los datos no coinciden con el tipo, obtienes errores en runtime sin advertencia en tiempo de compilacion: lo peor de ambos mundos. Usa type guards, bibliotecas de validacion (Zod, Valibot) o narrowing de tipos adecuado en su lugar.

```ts
// Bad
const user = response.data as User;

// Good — validate at the boundary
const user = userSchema.parse(response.data); // Zod validates and infers type
```

**Sobre-ingenieria de tipos genericos:**

Una firma de tipo como `type Merge<T extends object, U extends object> = Omit<T, keyof U> & U extends infer O ? { [K in keyof O]: O[K] } : never` puede ser tecnicamente correcta pero es ilegible para la mayoria de los miembros del equipo. Si un tipo generico requiere un doctorado para entenderse, simplificalo o agrega documentacion exhaustiva. La legibilidad supera a la astucia.

**Proliferacion de `@ts-ignore` / `@ts-expect-error`:**

Cada supresion es un agujero en tu red de seguridad de tipos. Un codebase con docenas de estas directivas ha cambiado el valor de TypeScript por la sobrecarga de TypeScript. Registra estos como deuda tecnica, corrigelos incrementalmente y bloquea nuevos en la revision de codigo a menos que vayan acompanados de un comentario de justificacion.

**Confiar en los tipos en los limites del runtime:**

Los tipos de TypeScript se borran en runtime. Los datos de APIs, `localStorage`, parametros de URL, `JSON.parse` y `postMessage` son `unknown` en runtime independientemente de lo que digan tus tipos. Valida los datos externos en el limite usando Zod, Valibot o Arktype, y luego deja que TypeScript infiera el tipo validado.

```ts
// Bad — trusts the API response blindly
const users: User[] = await fetch('/api/users').then(r => r.json());

// Good — validates at the boundary
const users = usersSchema.parse(await fetch('/api/users').then(r => r.json()));
```

**Peculiaridades de Enum: prefiere `as const` o uniones de string literals:**

Los enums de TypeScript tienen comportamiento sorprendente: los enums numericos permiten mapeo inverso y aceptan cualquier numero, `const enum` es incompatible con `isolatedModules`, y los enums son nominales (no estructuralmente compatibles). Usa objetos `as const` o tipos de union de string literals para un comportamiento mas simple y predecible:

```ts
// Instead of enum
// enum Status { Active = 'active', Inactive = 'inactive' }

// Prefer
type Status = 'active' | 'inactive';

// Or
const STATUS = { Active: 'active', Inactive: 'inactive' } as const;
type Status = typeof STATUS[keyof typeof STATUS];
```

**No habilitar `strict: true` desde el inicio:**

Adaptar el modo estricto a un codebase existente significa corregir cientos o miles de errores de una vez, lo que los equipos inevitablemente posponen para siempre. Comienza cada nuevo proyecto con `strict: true` en `tsconfig.json`.

---

## Puntos clave

- TypeScript es la linea base del desarrollo frontend profesional. Todos los frameworks principales lo soportan nativamente.
- Usa `strict: true` desde el dia uno. Es mucho mas facil que adaptarlo despues.
- Prefiere inferencia de tipos sobre anotaciones explicitas. Anota funciones publicas, interfaces de API y tipos complejos.
- Nunca uses `any`. Usa `unknown` y valida los datos en los limites del runtime con librerias como Zod o Valibot.
- Prefiere `as const` y union types sobre enums. Son mas simples, mas predecibles y mas compatibles con el ecosistema.
- Las aserciones de tipo (`as`) no son validacion. Valida los datos externos antes de confiar en ellos.
