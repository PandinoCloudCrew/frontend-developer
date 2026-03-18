# Flujo Unidireccional de Datos e Inmutabilidad

Estos dos principios son pilares de la arquitectura frontend moderna. El flujo unidireccional hace el comportamiento predecible; la inmutabilidad hace los cambios de estado explicitos y auditables.

---

## Unidirectional Data Flow

**Principio:** Los datos fluyen en una direccion: desde el estado, a traves de la vista, hacia acciones que actualizan el estado.

```
State --> View --> User Action --> State Update --> State --> View ...
```

- Se impone centralizando el estado y asegurando que las actualizaciones ocurran de manera lineal y controlada.
- Central en la arquitectura Redux/Flux, el arbol de componentes de Angular y el patron props-down/events-up de Vue.
- **Beneficios:** Comportamiento predecible, depuracion mas facil (time-travel debugging), procedencia de datos clara.
- Todos los frameworks principales imponen o recomiendan fuertemente esto: el data binding unidireccional de React, las verificaciones de flujo de datos unidireccional de Angular, el patron props-down/events-up de Vue.

## Immutability

**Principio:** Los objetos de estado no deben ser mutados directamente. Cada cambio crea una nueva copia.

- Habilita la deteccion de cambios (optimizacion de re-render de React, verificaciones de igualdad superficial de Redux).
- Hace que los cambios de estado sean explicitos y auditables.
- Simplifica la depuracion: compara los objetos de estado anterior y siguiente.
- **Herramientas:** Immer (structural sharing para actualizaciones inmutables ergonomicas), operadores nativos de spread, `Object.freeze()` para imposicion en tiempo de desarrollo.
- Angular Signals y el sistema de reactividad de Vue manejan esto internamente, pero el principio sigue aplicandose a nivel arquitectonico.

## Errores Comunes

- **Flujo unidireccional violado por mutaciones de `useRef`.** Mutar el valor `.current` de un ref para almacenar estado que afecta el renderizado sin disparar un re-render crea estado invisible que la UI no refleja. Los refs son para valores que *no* afectan la salida; para todo lo demas, usa state.
- **Trampas de rendimiento de Immutability.** Hacer spread de objetos grandes en cada frame (`{...bigObject, x: newX}`) a 60fps crea presion de garbage collection. Para actualizaciones a frecuencia de animacion, usa refs mutables o bibliotecas de animacion dedicadas (Framer Motion, GSAP) que evitan el ciclo de render de React.

## Puntos Clave

- El flujo unidireccional hace que el comportamiento sea predecible: estado -> vista -> accion -> actualizacion de estado -> vista.
- La inmutabilidad hace que los cambios de estado sean explicitos: nunca mutes directamente, crea nuevas copias.
- Usa Immer para actualizaciones inmutables ergonomicas cuando el spread nativo se vuelve verboso.
- Los refs son para valores que no afectan el renderizado. Para todo lo que impacta la UI, usa state.
- Para actualizaciones a frecuencia de animacion, usa herramientas dedicadas en lugar de re-renders inmutables.
