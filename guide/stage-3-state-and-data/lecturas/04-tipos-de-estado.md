# Tipos de Estado en Frontend

Entender los diferentes tipos de estado y donde vive cada uno es fundamental para construir aplicaciones frontend mantenibles. No todo el estado es igual — confundir las categorias lleva a soluciones sobredimensionadas o subdimensionadas.

---

## Local vs. Global State

| Aspecto | Local State | Global State |
|---------|------------|--------------|
| **Alcance** | Componente individual o pequeno subarbol | Aplicacion completa o area de funcionalidad grande |
| **Ejemplos** | Valores de input de formulario, estados de toggle, animaciones de UI | Usuario autenticado, tema, carrito de compras |
| **Herramientas** | `useState`, `ref()`, estado del componente | Redux, Zustand, Pinia, NgRx, Svelte stores |
| **Directriz** | Predeterminar a local; elevar solo cuando sea necesario | Usar con moderacion; solo para estado genuinamente compartido |

**Principio Moderno (2026):** La mayoria del tiempo no necesitas una "biblioteca de state management" en absoluto. Los dias de poner todo en Redux han terminado. Divide tu estado en diferentes responsabilidades — esto produce mejores soluciones que cualquier biblioteca de state management "generica".

## Server State vs. Client State

Uno de los cambios de paradigma mas grandes en los ultimos anos: **los datos del servidor y el estado de UI son responsabilidades fundamentalmente diferentes**.

| Aspecto | Server State | Client State |
|---------|-------------|--------------|
| **Naturaleza** | Asincrono, compartido, potencialmente desactualizado | Sincrono, local, siempre actual |
| **Responsabilidades** | Caching, deduplicacion, invalidacion, reintentos, paginacion, optimistic updates | Toggles de UI, estado de formulario, navegacion |
| **Herramientas** | TanStack Query, SWR, RTK Query, Apollo Client | useState, Zustand, Jotai, Pinia, Signals |

**Idea Clave:** Las bibliotecas de obtencion de datos como TanStack Query o SWR resuelven caching, deduplicacion, invalidacion, reintentos, paginacion y optimistic updates de forma nativa. Tratar los datos del servidor con un gestor de estado generico (como Redux vanilla) duplica trabajo que estas bibliotecas manejan mejor.

## Derived/Computed State

**Principio:** Nunca almacenes estado que pueda ser computado a partir de otro estado. Derivalo.

- **React:** `useMemo` para computaciones costosas; variables simples en el render para las baratas.
- **Vue:** Las propiedades `computed()` rastrean dependencias automaticamente y cachean resultados.
- **Angular:** Computed Signals (`computed()`) derivan estado declarativamente. NgRx Signal Store combina la estructura de NgRx con el rendimiento de Signals.
- **Svelte:** Las declaraciones reactivas (`$:`) derivan estado automaticamente.
- **Bibliotecas:** Los atoms y selectors de Jotai crean estado derivado basado en grafos. Recoil fue pionero en este patron.

**Beneficio:** Elimina bugs de sincronizacion de estado. Una unica fuente de verdad, muchas vistas derivadas.

## Errores Comunes

- **Anti-pattern de "simplemente ponlo en el store".** Los valores de input de formulario, los booleanos de abrir/cerrar modales y el estado efimero de UI no pertenecen al estado global. Los stores globales deben contener datos que son genuinamente compartidos entre partes distantes de la aplicacion. El estado local es el predeterminado.
- **Estado de URL descuidado.** Los filtros, la paginacion, el orden de clasificacion y las pestanas activas pertenecen a la URL para que los usuarios puedan compartir, marcar como favorito y usar adelante/atras del navegador. Almacenar estos solo en estado del componente rompe expectativas fundamentales de la web.
- **Cadenas de estado derivado volviendose circulares o desactualizadas.** Cuando A deriva B, B deriva C, C deriva D, y D de alguna manera influye en A, obtienes re-renders en cascada y bugs sutiles de desactualizacion. Manten los grafos de derivacion aciclicos y poco profundos.

## Puntos Clave

- Predetermina a estado local. Eleva a global solo cuando multiples componentes no relacionados necesitan leer el mismo dato.
- Separa server state de client state. Usa bibliotecas dedicadas (TanStack Query, SWR) para datos del servidor.
- Nunca almacenes estado que puedas derivar de otro estado. Una unica fuente de verdad, muchas vistas derivadas.
- La mayoria de las aplicaciones necesitan menos state management global de lo que crees.
