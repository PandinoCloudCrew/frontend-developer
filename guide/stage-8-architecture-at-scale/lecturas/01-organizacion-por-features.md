# Organización por Features --- Estructura de Proyecto a Escala

> Cómo organizar el código de una aplicación frontend grande para que sea mantenible, navegable y escalable. Cubre organización basada en features, Feature-Sliced Design, organización por dominio, y el equilibrio entre DRY y WET.

---

## Por Qué Esto Importa

La estructura de carpetas de un proyecto es la primera cosa que un desarrollador nuevo ve. Si no puede encontrar dónde vive algo en 30 segundos, la estructura ha fallado. A medida que una aplicación crece, una mala organización se convierte en fricción constante: archivos dispersos, dependencias circulares y miedo a tocar cualquier cosa porque no sabes qué romperás.

---

## Organización Basada en Features (Recomendada)

Agrupa todo lo que pertenece a una feature en el mismo directorio. Cuando trabajas en "checkout", todo está en `features/checkout/`.

```
src/
  features/
    auth/
      components/
      hooks/
      services/
      types/
      auth.routes.ts
    checkout/
      components/
      hooks/
      services/
      types/
      checkout.routes.ts
  shared/
    components/
    hooks/
    utils/
    types/
```

**Ventajas:** Alta cohesión (todo lo relacionado junto), bajo acoplamiento entre features, fácil de eliminar una feature entera, fácil de encontrar archivos.

**La regla de oro:** los archivos que cambian juntos deben vivir juntos.

---

## Feature-Sliced Design (FSD)

Una arquitectura más formal, popular en equipos grandes, que define capas con reglas estrictas de dependencia:

```
src/
  app/        # Configuración a nivel de app, providers, routing
  pages/      # Componentes a nivel de página (componen features)
  widgets/    # Bloques de UI compuestos grandes
  features/   # Interacciones del usuario (add-to-cart, login)
  entities/   # Entidades de negocio (user, product, order)
  shared/     # Utilidades reutilizables, UI kit, clientes API
```

**Regla clave:** las capas superiores pueden importar de capas inferiores, pero nunca al revés. `features/` puede importar de `entities/` y `shared/`, pero `entities/` nunca importa de `features/`.

FSD brilla en aplicaciones con 50+ features y múltiples equipos. Para aplicaciones pequeñas o medianas, la organización basada en features simple es suficiente.

---

## Organización Basada en Dominio

Para aplicaciones con lógica de negocio compleja, organiza por dominio de negocio:

```
src/
  domains/
    user/
    product/
    order/
  infrastructure/
    api/
    storage/
  presentation/
    components/
    layouts/
```

Este patrón refleja la estructura de Clean Architecture y es útil cuando la lógica de negocio es lo más complejo de la aplicación (no la UI).

---

## Guías Prácticas

- **Limita el anidamiento de directorios a 3-4 niveles máximo.** Más allá de eso, navegar el sistema de archivos se vuelve tedioso.
- **Coloca archivos relacionados (componente + estilos + tests + tipos) en el mismo directorio.** No disperses un componente entre `components/`, `hooks/`, `types/` y `__tests__/` cuando siempre cambian juntos.
- **Archivos index para API pública:** cada feature exporta solo lo que otras features necesitan consumir.
- **Un archivo debería poder encontrarse solo por su nombre.** Evita 30 archivos llamados `index.ts`.

---

## DRY vs. WET en Componentes

### DRY (Don't Repeat Yourself)

Cada pieza de conocimiento debe tener una representación única, inequívoca y autoritativa. Reduce la superficie para bugs cuando la lógica necesita cambiar.

### WET (Write Everything Twice) / AHA (Avoid Hasty Abstractions)

Desafía el DRY excesivo al abrazar la duplicación consciente para evitar abstracciones prematuras y frágiles.

**La Regla de Tres:** Abstrae código cuando veas el mismo patrón tres veces, no antes. Dos instancias de código similar es una coincidencia; tres es un patrón.

### Guía Específica para Frontend

- **La abstracción prematura es peor que la duplicación.** Una abstracción incorrecta fuerza a todos los consumidores a trabajar en torno a ella, mientras que el código duplicado puede evolucionar independientemente.
- Extrae componentes compartidos solo cuando el patrón sea estable y bien comprendido.
- Es aceptable tener dos componentes de apariencia similar que sirven a diferentes dominios de negocio, porque es probable que diverjan con el tiempo.
- Las utilidades y hooks compartidos (validación, formateo, llamadas a APIs) generalmente son seguros para aplicar DRY tempranamente.
- Los componentes de UI que se ven similares pero pertenecen a diferentes features deben permanecer separados hasta que se demuestre que son verdaderamente idénticos.

---

## Errores Comunes

- **Exceso de DRY entre límites de features.** Extraer un componente compartido `<Card>` usado tanto por "Productos" como por "Perfiles de Usuario" acopla dos features no relacionadas. Cuando Productos necesita un cambio de layout, Perfiles de Usuario se rompe. Aplica DRY dentro de una feature; tolera WET entre features hasta que el patrón sea comprobadamente estable.
- **Proliferación de barrel files anulando tree shaking.** Un `index.ts` que re-exporta todo de un directorio fuerza a los bundlers a parsear cada módulo incluso si solo se usa una exportación. Usa barrel files con moderación y solo para APIs públicas verdaderas.
- **Estructura de carpetas como burocracia.** Crear directorios `components/`, `hooks/`, `services/`, `types/`, `utils/` y `__tests__/` para una feature con un componente, un hook y un test produce 6 archivos en 4+ directorios. Coloca features pequeñas en un solo directorio; añade estructura cuando la feature crezca.
- **Convenciones de nombres sin cumplimiento automatizado.** Acordar `camelCase` para variables y `PascalCase` para componentes sin reglas de linter que lo impongan garantiza drift. Usa reglas de ESLint y commit hooks para imponer convenciones automáticamente.
- **30 archivos llamados `index.ts`.** Git blame muestra un muro de archivos con nombres idénticos, los stack traces son ilegibles y las pestañas del editor son indistinguibles. Nombra los archivos por lo que contienen: `UserProfile.tsx`, `useAuth.ts`, `cartService.ts`.
- **Violaciones de YAGNI: construir para requisitos hipotéticos.** Implementar un sistema de plugins o infraestructura de internacionalización para un MVP de un solo idioma desperdicia tiempo y añade complejidad. Construye lo que se necesita ahora; refactoriza cuando el requisito se materialice.

---

## Puntos Clave

- Organiza por features, no por tipo técnico (`components/`, `hooks/`, `utils/`). Los archivos que cambian juntos viven juntos.
- Feature-Sliced Design es una opción formal para aplicaciones grandes con múltiples equipos.
- Aplica DRY dentro de una feature; tolera WET entre features hasta confirmar que el patrón es estable.
- La Regla de Tres: no abstraigas antes de ver el patrón repetirse tres veces.
- Nombra los archivos por lo que contienen. Limita el anidamiento a 3-4 niveles.
