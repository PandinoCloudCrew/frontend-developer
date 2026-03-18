# Entorno de Desarrollo

Antes de escribir tu primera linea de código en un proyecto real, necesitas un entorno de desarrollo que te ayude a detectar errores, mantener consistencia y ofrecer feedback rápido. Esta lectura cubre las herramientas fundamentales de linting, formateo, dev servers y gestion de paquetes que forman la base de cualquier proyecto frontend moderno.

---

## Linting y Formateo

El linting detecta errores y patrones problematicos en tu código. El formateo se encarga de la consistencia visual (indentacion, comillas, punto y coma). Son dos preocupaciones diferentes que a menudo se confunden.

### Biome

**Biome** es el retador emergente de ESLint + Prettier:

- Un solo binario, un archivo de configuración (`biome.json`), reemplaza ESLint + Prettier + sus plugins.
- **10-25x mas rápido**: Linting de 10K archivos en 0.8s (vs 45.2s de ESLint). Formateo de 10K archivos en 0.3s (vs 12.1s de Prettier).
- 423+ reglas de lint en v2.x, incluyendo linting type-aware.
- Funcionalidad completa para proyectos React/TypeScript.

### ESLint v10

- Flat config (`eslint.config.js`) es el único formato soportado. `.eslintrc` esta completamente deprecado.
- La nueva API de language plugins permite soporte de primera clase para lenguajes no-JavaScript.
- El ecosistema mas fuerte de plugins sigue siendo su ventaja clave sobre Biome.

**Recomendacion**: Biome para proyectos nuevos que buscan simplicidad y velocidad. ESLint para equipos que necesitan reglas personalizadas o soporte de plugins de nicho.

### Ejemplo de configuración con Biome

```json
{
  "$schema": "https://biomejs.dev/schemas/2.0.0/schema.json",
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2
  }
}
```

Con Biome configurado, ejecutas un solo comando para lint y formato:

```bash
# Lint and format
biome check --write .

# Only lint
biome lint .

# Only format
biome format --write .
```

### Ejemplo de configuración con ESLint v10

```js
// eslint.config.js (flat config — the only format in v10)
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
    },
  },
];
```

---

## Dev Servers y HMR

El Hot Module Replacement (HMR) te permite ver cambios en tu código reflejados en el navegador casi instantaneamente, sin perder el estado de la aplicación.

- El dev server de **Vite** con ES modules nativos proporciona HMR en menos de 50ms independientemente del tamaño del proyecto.
- **React Fast Refresh**, **Vue HMR** y **Svelte HMR** funcionan perfectamente a traves de Vite.
- **Turbopack** logra HMR en menos de 10ms dentro de Next.js.

El flujo típico con Vite:

```bash
# Create a new project
npm create vite@latest my-app -- --template react-ts

# Install dependencies
cd my-app && npm install

# Start dev server with HMR
npm run dev
```

Cada vez que guardas un archivo, Vite recompila solo el modulo cambiado y lo inyecta en el navegador sin recargar la página. Esto mantiene el estado de la aplicación intacto mientras ves tus cambios reflejados.

---

## Gestion de Paquetes

Los gestores de paquetes instalan y organizan las dependencias de tu proyecto.

| Gestor | Fortaleza principal | Mejor para |
|--------|---------------------|------------|
| **npm** | Compatibilidad universal | Maxima compatibilidad, proyectos simples |
| **pnpm** | Disco eficiente, dependencias estrictas | Proyectos que necesitan seguridad de dependencias |
| **Bun** | Velocidad de instalacion, runtime integrado | Maxima velocidad, ejecución directa de TypeScript |

Comandos equivalentes:

```bash
# Install all dependencies
npm install          # npm
pnpm install         # pnpm
bun install          # bun

# Add a dependency
npm install react    # npm
pnpm add react       # pnpm
bun add react        # bun

# Run a script
npm run dev          # npm
pnpm dev             # pnpm
bun run dev          # bun
```

---

## Errores comunes y anti-patrones

**Fatiga por cambio constante de herramientas:** Cambiar de ESLint a Biome, luego al siguiente linter, mientras también se migra de Jest a Vitest y de npm a pnpm a Bun, todo en el mismo trimestre, quema la energia del equipo en yak-shaving en lugar de entregar funcionalidades. Evalua los costos de cambio frente a las ganancias marginales. Migra herramientas de una en una, solo cuando la herramienta actual es un cuello de botella medible.

**Sobre-linting:** Cuando los desarrolladores pasan mas tiempo luchando contra el linter que escribiendo código, el linter se ha vuelto contraproducente. Las reglas que imponen preferencias de estilo arbitrarias (sin ternarios, longitud maxima de linea de 80, destructuring forzado) generan ruido sin detectar bugs. Manten las reglas de lint enfocadas en correccion y consistencia; deja que el formateador maneje el estilo. Desactiva las reglas que el equipo sobrescribe consistentemente.

**Falsa confianza del HMR:** El código que funciona perfectamente con Hot Module Replacement puede romperse en un refresh completo de página porque HMR preserva el estado a nivel de modulo, closures y el orden de inicializacion que un arranque en frio no preserva. Haz refreshes completos periodicamente durante el desarrollo. El CI siempre deberia testear contra builds frescos, no contra estado actualizado por HMR.

**Dependencias fantasma:** npm y Bun permiten importar paquetes que no estan en tu `package.json` si resultan estar hoisted desde una dependencia transitiva. Esto funciona hasta que la dependencia transitiva se actualiza o se elimina, y entonces tu build se rompe sin causa obvia. El modo estricto de pnpm detecta esto. Si usas npm o Bun, audita las importaciones contra `package.json` periodicamente.

---

## Puntos clave

- Configura linting y formateo desde el dia uno del proyecto. Es mucho mas fácil que adaptarlo despues.
- Biome simplifica el setup (un solo binario) y es significativamente mas rápido. ESLint tiene el ecosistema de plugins mas amplio.
- Vite es el dev server estandar del ecosistema. Su HMR es casi instantaneo.
- Elige un gestor de paquetes y mantente con el. pnpm ofrece el mejor balance entre velocidad y seguridad de dependencias.
- No cambies herramientas por moda. Migra solo cuando hay un cuello de botella medible.
