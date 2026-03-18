# Anti-patterns de State Management

Estos son los errores mas comunes en la gestion de estado en aplicaciones frontend. Conocerlos te ayudara a evitar bugs sutiles, problemas de rendimiento y arquitecturas innecesariamente complejas.

---

## 1. Cadenas de Estado Derivado Circulares

Cuando A deriva B, B deriva C, C deriva D, y D de alguna manera influye en A, obtienes re-renders en cascada y bugs sutiles de desactualizacion. Manten los grafos de derivacion aciclicos y poco profundos. Si una cadena tiene mas de dos niveles, reconsidera la forma del estado.

## 2. `useMemo` con Arrays de Dependencias Incorrectos

Omitir una dependencia retorna silenciosamente valores cacheados desactualizados; incluir una referencia inestable (objeto inline, función no guardada) anula la memoization completamente. Las reglas de linting (`react-hooks/exhaustive-deps`) existen por una razón — no las suprimas sin una justificacion clara.

## 3. State Machines en Exceso

Recurrir a XState para gestionar un toggle booleano o un flag de carga de dos estados anade una curva de aprendizaje significativa y boilerplate para algo que `useState(false)` maneja perfectamente. Las state machines justifican su peso para flujos con 4+ estados y transiciones no triviales.

## 4. Trampas de Rendimiento de Immutability

Hacer spread de objetos grandes en cada frame (`{...bigObject, x: newX}`) a 60fps crea presion de garbage collection. Para actualizaciones a frecuencia de animación, usa refs mutables o bibliotecas de animación dedicadas (Framer Motion, GSAP) que evitan el ciclo de render de React.

## 5. Estado de URL Descuidado

Los filtros, la paginación, el orden de clasificacion y las pestanas activas pertenecen a la URL para que los usuarios puedan compartir, marcar como favorito y usar adelante/atras del navegador. Almacenar estos solo en estado del componente rompe expectativas fundamentales de la web.

## 6. Flujo Unidireccional Violado por Mutaciones de `useRef`

Mutar el valor `.current` de un ref para almacenar estado que afecta el renderizado sin disparar un re-render crea estado invisible que la UI no refleja. Los refs son para valores que *no* afectan la salida; para todo lo demas, usa state.

## 7. Anti-pattern de "Simplemente Ponlo en el Store"

Los valores de input de formulario, los booleanos de abrir/cerrar modales y el estado efimero de UI no pertenecen al estado global. Los stores globales deben contener datos que son genuinamente compartidos entre partes distantes de la aplicación. El estado local es el predeterminado.

---

## Como Evitarlos: Reglas Generales

- **Predetermina a estado local.** Eleva a global solo cuando sea genuinamente necesario.
- **Separa server state de client state.** Usa bibliotecas dedicadas para datos del servidor.
- **Deriva en lugar de almacenar.** Si un valor puede ser computado de otro estado, no lo dupliques.
- **Respeta la URL.** El estado compartible pertenece en la URL.
- **Usa la herramienta adecuada para la complejidad.** No uses state machines para toggles ni `useState` para flujos de 8 estados.
- **No suprimas reglas de linting** de hooks sin justificacion clara y documentada.

## Puntos Clave

- La mayoria de los anti-patterns de estado surgen de usar la herramienta equivocada para el nivel de complejidad.
- El estado local es el predeterminado. El global store es la excepcion, no la regla.
- Los grafos de derivacion deben ser aciclicos y poco profundos.
- La URL es un gestor de estado legit — usala para filtros, busquedas, paginación y tabs activos.
- Los refs son para valores que no afectan el render. Para todo lo que impacta la UI, usa state.
