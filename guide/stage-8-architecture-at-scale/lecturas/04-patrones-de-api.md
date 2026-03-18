# Patrones de API en Frontend

> Cómo elegir y combinar patrones de API en aplicaciones frontend modernas. Cubre REST, tRPC, GraphQL, el patrón BFF y cuándo usar cada uno.

---

## Por Qué Esto Importa

La capa de API define cómo tu frontend se comunica con el backend. Elegir el patrón incorrecto --- o combinar demasiados --- crea sobrecarga cognitiva, bugs sutiles y complejidad innecesaria. La mayoría de las aplicaciones en 2026 usan una combinación de enfoques, pero con reglas claras sobre cuándo usar cada uno.

---

## La Realidad Multi-Protocolo

| Patrón | Mejor Para | Adopción |
|---------|----------|----------|
| **REST** | APIs públicas, webhooks, integraciones de terceros | Estándar universal |
| **tRPC** | APIs internas con frontend/backend en TypeScript | 15% de las ofertas de trabajo, creciendo rápido |
| **GraphQL** | Patrón BFF, móvil/web con diferentes necesidades de datos | Maduro, adopción estable |
| **gRPC** | Servicio a servicio, microservicios de alto rendimiento | Enfocado en backend |

---

## Arquitectura Típica de 2026

- **tRPC** para la API principal de la aplicación (operaciones autenticadas orientadas al usuario): proporciona type safety de extremo a extremo con cero generación de código.
- **REST** para asuntos externos (webhooks, callbacks de OAuth, health checks, datos públicos).
- **GraphQL** como BFF (Backend for Frontend) cuando móvil y web necesitan formas de datos fundamentalmente diferentes.

---

## Patrón BFF (Backend for Frontend)

Reconoce que los clientes móviles y web tienen necesidades diferentes:

- **Móvil:** payloads pequeños y distintos (conservación de batería/datos).
- **Web:** cargas de datos más ricas, capacidades de prefetching.
- GraphQL sobresale aquí al permitir que cada cliente solicite exactamente lo que necesita.

---

## Recomendación

Para la mayoría de las aplicaciones full-stack en TypeScript: **tRPC para proyectos nuevos**. Para APIs públicas o consumidores multi-lenguaje: REST. Para escenarios complejos con múltiples clientes: GraphQL como capa BFF.

```typescript
// tRPC — end-to-end type safety example
// server: router definition
export const appRouter = router({
  users: router({
    getById: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        return db.users.findUnique({ where: { id: input.id } });
      }),
    create: protectedProcedure
      .input(z.object({ name: z.string(), email: z.string().email() }))
      .mutation(async ({ input }) => {
        return db.users.create({ data: input });
      }),
  }),
});

// client: fully typed, zero codegen
const user = await trpc.users.getById.query({ id: '123' });
// user is fully typed based on the server definition
```

---

## Errores Comunes

- **Queries N+1 de GraphQL y ataques de complejidad.** Sin limitación de profundidad de queries y patrones de dataloader, una sola query de GraphQL puede desencadenar cientos de consultas a la base de datos. Implementa análisis de complejidad de queries, límites de profundidad y dataloaders desde el primer día.
- **tRPC filtrando detalles de implementación del backend.** La type safety de extremo a extremo de tRPC puede exponer esquemas internos de base de datos al frontend si los tipos no se curan deliberadamente. Define tipos de entrada/salida explícitos para tus procedures en lugar de pasar tipos crudos de Prisma/Drizzle al cliente.
- **Sobre-ingeniería de la capa de API.** Usar GraphQL para una aplicación CRUD simple con un solo tipo de cliente agrega definición de esquemas, boilerplate de resolvers y generación de código que REST maneja trivialmente. GraphQL rinde frutos cuando múltiples clientes necesitan diferentes formas de datos.
- **Ejecutar demasiados patrones de API simultáneamente.** Tener REST, GraphQL, tRPC y WebSockets todos sirviendo al mismo frontend crea sobrecarga cognitiva. Limita a dos patrones máximo y ten reglas claras sobre cuándo usar cada uno.
- **Errores de REST: nombrado inconsistente, códigos de estado incorrectos, APIs charlatanas.** Mezclar `camelCase` y `snake_case`, devolver 200 para errores, crear endpoints para cada vista de la UI. Sigue una guía de estilo, usa códigos de estado HTTP correctos y diseña endpoints orientados a recursos.

---

## Puntos Clave

- La mayoría de las aplicaciones usan una combinación de patrones de API con reglas claras sobre cuándo usar cada uno.
- tRPC es la opción ideal para full-stack TypeScript: type safety de extremo a extremo sin generación de código.
- REST sigue siendo el estándar universal para APIs públicas e integraciones externas.
- GraphQL brilla como BFF cuando múltiples clientes (móvil, web) necesitan formas de datos diferentes.
- Limita a dos patrones de API máximo. Cada uno adicional es sobrecarga cognitiva para todo el equipo.
