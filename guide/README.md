# Guía para Desarrolladores Frontend

> Una referencia agnóstica de framework, basada en principios, para construir aplicaciones web modernas.
> Cubre principios de desarrollo de software, usabilidad y mejores prácticas adaptables a React, Angular, Vue, Svelte y otros.

---

## Estructura de Etapas

La guía está organizada en 8 etapas progresivas. Cada etapa se construye sobre la anterior. Cada etapa incluye:
- **Documento del capítulo** (markdown) — conceptos, principios y patrones agnósticos de framework
- **Mockups** (exportados desde archivos .pen) — referencias visuales que el estudiante implementa por su cuenta
- **Ejercicios** — tareas prácticas para reforzar los conceptos

---

### Etapa 1: Fundamentos
> *La base que todo desarrollador frontend debe dominar antes de tocar un framework.*

- Semantic HTML y el DOM
- Fundamentos de CSS: Box model, Flexbox, Grid, unidades responsivas
- JavaScript esencial: ES2020+, async/await, módulos
- Accesibilidad desde el primer día (elementos semánticos, navegación por teclado)
- Entorno de desarrollo: editor, browser DevTools, terminal
- TypeScript como la línea base profesional

### Etapa 2: Arquitectura de Componentes
> *Pensar en componentes — el bloque de construcción universal de los frontends modernos.*

- ¿Qué es un componente? (modelo mental agnóstico de framework)
- Principios SOLID aplicados a componentes
- Composición sobre herencia
- Props, slots y contratos de componentes
- Atomic Design: atoms, molecules, organisms, templates, pages
- Compound components y patrones headless
- Hooks / Composables como la abstracción de lógica universal

### Etapa 3: Estado y Flujo de Datos
> *Dominar los datos que impulsan tu UI.*

- Estado local vs global — cuándo elevar
- Server state vs client state (el cambio de paradigma)
- Flujo de datos unidireccional
- Estado derivado / computado — nunca almacenes lo que puedes calcular
- Inmutabilidad y por qué importa
- Máquinas de estado para flujos complejos (XState)
- Patrones de data fetching: estados de loading, error, success

### Etapa 4: Usabilidad y Principios de Diseño
> *Construir interfaces que la gente realmente quiera usar.*

- Las 10 Heurísticas de Nielsen aplicadas a la web
- Ley de Fitts y Ley de Hick en la práctica
- Principios de Gestalt en el layout de UI
- Progressive disclosure y reducción de carga cognitiva
- Diseño mobile-first y responsivo
- Tipografía, color, espaciado y jerarquía visual
- Diseño de formularios y patrones de entrada

### Etapa 5: Rendimiento
> *Cada milisegundo cuenta — enviar rápido, mantener rápido.*

- Core Web Vitals: LCP, INP, CLS
- El modelo RAIL
- Lazy loading: rutas, componentes, imágenes
- Code splitting y optimización de bundles
- Virtualización para listas grandes
- Memoización — cuándo usarla y cuándo no
- Optimización de imágenes y formatos modernos
- Medición y monitoreo de rendimiento

### Etapa 6: Seguridad y Resiliencia
> *Proteger a tus usuarios y manejar lo inesperado con elegancia.*

- Prevención de XSS y auto-escaping del framework
- Protección CSRF y SameSite cookies
- Content Security Policy (CSP)
- Autenticación segura: almacenamiento de JWT, OAuth + PKCE, patrón BFF
- Validación y sanitización de entradas
- Error boundaries y degradación elegante
- Optimistic updates con rollback
- Estrategias de retry con exponential backoff

### Etapa 7: Testing y Calidad
> *Confianza en cada deploy.*

- La pirámide de testing: unit, component, integration, E2E
- Testing Library — testear desde la perspectiva del usuario
- Estrategias de mocking: MSW para API mocking
- Testing de accesibilidad (automatizado + manual)
- Linting y formateo: ESLint, Biome, Prettier
- Estrategia de pipeline de CI: ciclos de feedback rápidos
- Prácticas de code review

### Etapa 8: Arquitectura a Escala
> *Patrones para equipos y aplicaciones grandes.*

- Organización de carpetas basada en features
- Feature-Sliced Design (FSD)
- Clean Architecture / Hexagonal en frontend
- Separación de responsabilidades: arquitectura de 4 capas
- Design systems: primitivos headless + design tokens
- Patrones de API: REST, GraphQL, tRPC — cuándo usar cada uno
- Build tools: Vite, configuración del bundler
- Meta-frameworks: SSR, SSG, ISR — elegir la estrategia de renderizado correcta
- Monorepos y estrategias de código compartido

---

## Cómo Usar Esta Guía

1. **Secuencial para aprendices**: Ir etapa por etapa, completando ejercicios antes de avanzar.
2. **Referencia para profesionales**: Saltar a cualquier etapa/tema según sea necesario.
3. **Adaptador de framework**: Cada concepto se enseña primero de forma agnóstica al framework, luego muestra cómo se mapea a React, Angular, Vue y Svelte.

## Mockups

Los mockups visuales para cada etapa están en el archivo `frontend-guide.pen` y exportados como imágenes en el directorio de cada etapa. Sirven como **objetivos de implementación** — el estudiante construye la implementación real.
