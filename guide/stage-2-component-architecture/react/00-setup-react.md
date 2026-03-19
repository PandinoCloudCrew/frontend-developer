# Setup de React --- Tu Primer Proyecto



> Por qué React, cómo crear un proyecto con Vite, la estructura de archivos y tu primer componente funcional con TypeScript.

---

## Contenido
- [Por qué React](#por-qué-react)
- [Crear un proyecto con Vite](#crear-un-proyecto-con-vite)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Tu primer componente](#tu-primer-componente)
- [JSX: lo básico](#jsx-lo-básico)
- [Anti-patterns](#anti-patterns)

---

## Por Qué React

React es una **biblioteca de UI** (no un framework completo como Angular). Se enfoca en una sola cosa: renderizar componentes de forma declarativa. Todo lo demás --- routing, formularios, data fetching --- lo eliges tú con bibliotecas del ecosistema.

- **Modelo mental simple.** Un componente es una función que recibe props y retorna JSX. Sin decoradores, sin módulos, sin dependency injection.
- **Ecosistema masivo.** La comunidad más grande del frontend. Prácticamente cualquier problema tiene una solución probada.
- **TypeScript first-class.** Desde React 19, el soporte de TypeScript es nativo sin configuración extra.

En Angular todo viene integrado; en React tú armas tu stack. Eso da flexibilidad pero requiere tomar decisiones.

---

## Crear un Proyecto con Vite

```bash
# Crea un nuevo proyecto con la plantilla React + TypeScript
npm create vite@latest mi-app -- --template react-ts

# Entra al directorio e instala dependencias
cd mi-app
npm install

# Levanta el servidor de desarrollo
npm run dev
```

Abre `http://localhost:5173` en tu navegador. Verás la página de bienvenida de Vite + React.

> **¿Por qué Vite?** Vite es el bundler estándar para proyectos React nuevos. Create React App (CRA) está **deprecado** desde 2023 --- no lo uses.

---

## Estructura del Proyecto

```
mi-app/
  public/                  ← Archivos estáticos (favicon, imágenes)
  src/
    App.tsx                ← Componente raíz
    App.css                ← Estilos del componente raíz
    main.tsx               ← Entry point de la aplicación
    index.css              ← Estilos globales
    vite-env.d.ts          ← Tipos de Vite para TypeScript
  index.html               ← Página HTML principal
  vite.config.ts           ← Configuración de Vite
  tsconfig.json            ← Configuración de TypeScript
  package.json             ← Dependencias
```

A diferencia de Angular (que genera carpetas por componente con CLI), React no tiene generador de código oficial. Tú creas los archivos manualmente.

---

## Tu Primer Componente

Crea el archivo `src/Greeting.tsx`:

```
// src/Greeting.tsx
interface GreetingProps {
  name: string;
}

function Greeting({ name }: GreetingProps) {
  return <h1>Hola, {name}!</h1>;
}

export default Greeting;
```

Para usarlo en `App.tsx`:

```
// src/App.tsx
import Greeting from './Greeting';

function App() {
  return (
    <main>
      <Greeting name="mundo" />
    </main>
  );
}

export default App;
```

Un componente React es una función que retorna JSX. Sin decoradores, sin clases, sin archivos separados para template y estilos.

---

## JSX: Lo Básico

JSX es la sintaxis que mezcla HTML con JavaScript. Se compila a llamadas de funciones, no es HTML real.

```
function ProductCard() {
  const price = 89.99;
  const inStock = true;

  return (
    <article>
      {/* Expresiones JavaScript entre llaves */}
      <h3>Teclado mecánico</h3>
      <p>Precio: ${price.toFixed(2)}</p>

      {/* Renderizado condicional */}
      {inStock && <span>En stock</span>}
      {!inStock && <span>Agotado</span>}
    </article>
  );
}
```

En Angular escribes templates HTML con directivas (`@if`, `@for`). En React escribes JavaScript directamente con JSX.

---

## Comandos Esenciales

```bash
npm run dev       # Servidor de desarrollo con hot reload
npm run build     # Build de producción
npm run preview   # Preview del build de producción
npx tsc --noEmit  # Verificar tipos sin compilar
```

---

## Anti-patterns

- **Usar Create React App (CRA).** CRA está deprecado y sin mantenimiento. Usa Vite para proyectos nuevos.
- **Escribir class components en 2026.** Los class components son legacy. Todo el código nuevo debe usar funciones. Los hooks solo funcionan en componentes funcionales.
- **No tipar las props.** Definir componentes sin interfaces de props pierde toda la ventaja de TypeScript. Siempre crea una interface `XxxProps`.

---

## Puntos Clave

- React es una biblioteca de UI, no un framework completo. Tú eliges las piezas del ecosistema.
- `npm create vite@latest mi-app -- --template react-ts` crea un proyecto listo para desarrollar.
- Un componente React es una función que recibe props y retorna JSX.
- Create React App está deprecado --- usa Vite.
- Todo el código React moderno usa componentes funcionales con TypeScript.


