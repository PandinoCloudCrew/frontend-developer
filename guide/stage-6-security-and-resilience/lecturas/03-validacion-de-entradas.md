# Validación de Entradas

La validación y sanitizacion de entradas es una capa fundamental de defensa que protege tanto la experiencia del usuario (feedback inmediato) como la seguridad del sistema (protección contra inyección de datos maliciosos).

---

## Validación vs Sanitizacion

- **Validación de entradas:** Asegura que los datos enviados por el usuario se ajusten a los formatos, tipos y restricciones esperados antes del procesamiento. Rechaza datos que no cumplen.
- **Sanitizacion:** Limpia o neutraliza datos, eliminando caracteres potencialmente maliciosos o fragmentos de código. Transforma los datos para que sean seguros.

---

## Defensa en Profundidad

Sanitiza en el cliente para retroalimentacion inmediata, pero **siempre valida y sanitiza en el servidor** -- la validación del lado del cliente es facilmente evitable.

La validación en el frontend es una conveniencia de UX, no una medida de seguridad. Cualquier validación en el navegador puede ser evitada con DevTools, curl o una petición modificada. Toda validación critica de seguridad (autenticación, autorizacion, sanitizacion de entrada, reglas de negocio) debe ocurrir en el servidor.

---

## Herramientas de Validación

Usa bibliotecas establecidas en lugar de regex personalizado para sanitizacion:

- **DOMPurify:** Para sanitizar HTML y prevenir XSS cuando se necesita renderizar HTML del usuario.
- **validator.js:** Para validar y sanitizar strings (emails, URLs, numeros, etc.).
- **Zod / Valibot:** Para validar la forma y tipos de datos en TypeScript, tanto en cliente como en servidor.

```typescript
import { z } from 'zod';

const UserInput = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  age: z.number().int().min(0).max(150),
});

// Validate and parse — throws on invalid data
const validated = UserInput.parse(userInput);
```

---

## Puntos Clave

- La validación en el cliente es UX, no seguridad. Siempre valida en el servidor.
- Usa bibliotecas establecidas (DOMPurify, Zod, Valibot) en lugar de regex personalizado.
- Valida la forma, el tipo y los limites de todos los datos del usuario.
- Sanitiza HTML con DOMPurify antes de renderizarlo con `dangerouslySetInnerHTML`/`v-html`.
