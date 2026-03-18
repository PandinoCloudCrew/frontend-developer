# Maquinas de Estado (State Machines)

Las state machines modelan transiciones de estado complejas de forma explicita, eliminando estados invalidos y haciendo que los flujos sean visualmente comprensibles.

---

## Que Son y Como Funcionan

**Principio:** Modela las transiciones de estado complejas explicitamente para evitar estados invalidos.

- Las state machines enumeran cada estado posible y las transiciones entre ellos.
- **XState** proporciona state machines y statecharts para flujos explicitos y testeables.
- Los eventos sirven como fuente de verdad; las transiciones de estado son funciones puras; los efectos secundarios se declaran, no se incrustan.

## Casos de Uso Ideales

Las state machines son particularmente valiosas para:

- Formularios de multiples pasos
- Flujos de autenticación
- Interacciones de UI complejas (drag-and-drop)
- Procesos de pago

## Cuando Usar State Machines

- Cuando una funcionalidad tiene mas de 3-4 estados con transiciones no triviales.
- Cuando los "estados imposibles" son una fuente recurrente de bugs (por ejemplo, un formulario que esta simultaneamente "enviando" y "editando").
- Cuando necesitas un diagrama visual del flujo de estado para comunicacion con personas no desarrolladoras.

## Cuando NO Usar State Machines

Recurrir a XState para gestionar un toggle booleano o un flag de carga de dos estados anade una curva de aprendizaje significativa y boilerplate para algo que `useState(false)` maneja perfectamente. Las state machines justifican su peso para flujos con 4+ estados y transiciones no triviales.

## Errores Comunes

- **State machines en exceso.** Usar XState para un toggle booleano o un indicador de loading simple anade complejidad innecesaria. Reserva las state machines para flujos genuinamente complejos.
- **No visualizar la maquina.** Una de las mayores ventajas de XState es la posibilidad de generar diagramas visuales del flujo de estados. Si no aprovechas esta capacidad, pierdes gran parte del valor.

## Puntos Clave

- Las state machines enumeran cada estado posible y las transiciones validas entre ellos, eliminando estados imposibles.
- Usa state machines cuando tengas 4+ estados con transiciones no triviales o cuando los estados imposibles sean una fuente recurrente de bugs.
- No uses state machines para toggles simples o flags de loading — `useState` es suficiente para esos casos.
- XState permite generar diagramas visuales que facilitan la comunicacion con personas no tecnicas.
