# Optimistic Updates y Estrategias de Retry

Las optimistic updates y las estrategias de retry son patrones de resiliencia que mejoran la experiencia del usuario en aplicaciones que dependen de operaciones asincronas. Optimistic updates hacen que la UI se sienta instantanea; los reintentos manejan fallos transitorios de red de forma transparente.

---

## Optimistic Updates

### Concepto

**Actualiza la UI inmediatamente** como si la operación hubiera tenido exito, luego confirma con el servidor en segundo plano. Si la operación del servidor falla, **revierte automáticamente** la UI al estado anterior y notifica al usuario.

### Casos de Uso

- Dar like/favorito a un elemento.
- Anadir al carrito.
- Cambiar configuraciones o preferencias.
- Enviar mensajes en un chat.
- Marcar como leido/no leido.

**Regla critica:** Solo usa optimistic updates para operaciones que tienen muy alta probabilidad de exito. Para operaciones riesgosas (pagos, reservas, transferencias bancarias), usa estados de carga en su lugar -- el usuario necesita confirmacion real, no una suposicion.

### Implementación

```javascript
// Pseudocode: optimistic update with rollback
async function toggleLike(postId) {
  // 1. Save previous state for rollback
  const previousState = getState();

  // 2. Optimistically update the UI
  updateUI({ liked: true, likeCount: previousState.likeCount + 1 });

  try {
    // 3. Send the actual request
    await api.post(`/posts/${postId}/like`);
  } catch (error) {
    // 4. Rollback on failure and notify user
    updateUI(previousState);
    showNotification('Failed to like post. Please try again.');
  }
}
```

### Soporte de Bibliotecas

TanStack Query, SWR y Apollo Client tienen soporte integrado para optimistic updates con rollback automático. Estas bibliotecas manejan el almacenamiento del estado previo, la actualizacion optimista y el rollback en caso de error.

```javascript
// TanStack Query: optimistic update
const mutation = useMutation({
  mutationFn: (postId) => api.likePost(postId),
  onMutate: async (postId) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries(['posts', postId]);
    // Snapshot previous value
    const previous = queryClient.getQueryData(['posts', postId]);
    // Optimistically update
    queryClient.setQueryData(['posts', postId], (old) => ({
      ...old,
      liked: true,
    }));
    return { previous };
  },
  onError: (err, postId, context) => {
    // Rollback on error
    queryClient.setQueryData(['posts', postId], context.previous);
  },
  onSettled: () => {
    // Refetch to ensure consistency
    queryClient.invalidateQueries(['posts']);
  },
});
```

### Error Critico: Rollback Silencioso

La UI muestra que un "like" tuvo exito, luego silenciosamente lo revierte segundos despues cuando el servidor rechaza la petición. Los usuarios pierden confianza cuando las acciones parecen tener exito y luego se deshacen silenciosamente. **Siempre notifica a los usuarios cuando ocurre un rollback.**

---

## Estrategias de Retry

### Backoff Exponencial

Espera un tiempo exponencialmente creciente entre reintentos para evitar sobrecargar un servicio en dificultades:

```
Intento 1: espera 1 segundo
Intento 2: espera 2 segundos
Intento 3: espera 4 segundos
Intento 4: espera 8 segundos
```

### Jitter

Anade variacion aleatoria (tipicamente mas o menos 20%) a los intervalos de backoff para prevenir problemas de "thundering herd" donde todos los clientes reintentan simultaneamente despues de una caida.

```javascript
function getRetryDelay(attempt) {
  const baseDelay = Math.pow(2, attempt) * 1000; // exponential backoff
  const jitter = baseDelay * 0.2 * (Math.random() * 2 - 1); // ±20%
  return baseDelay + jitter;
}
```

### Limite de Reintentos

Tipicamente 3-5 intentos antes de rendirse y mostrar un error al usuario. Reintentar indefinidamente puede mantener al usuario esperando para siempre y sobrecargar el servidor.

### Idempotencia

**La idempotencia es critica:** Solo reintenta operaciones idempotentes (GET, operaciones de lectura) de forma automática. Para operaciones no idempotentes (pagos, creacion de pedidos), usa claves de idempotencia para que el backend pueda proteger contra duplicados.

**Peligro:** Reintentar silenciosamente una petición POST fallida puede causar efectos secundarios duplicados (dobles cobros, envios duplicados). Haz los reintentos visibles para el usuario, o asegura que la operación sea idempotente antes de reintentar automáticamente.

### Soporte de Bibliotecas

TanStack Query y SWR tienen estrategias de retry configurables integradas:

```javascript
// TanStack Query: built-in retry with exponential backoff
const { data } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  retry: 3,                    // 3 retry attempts
  retryDelay: (attempt) =>     // exponential backoff
    Math.min(1000 * 2 ** attempt, 30000),
});
```

---

## Puntos Clave

- Usa optimistic updates solo para operaciones con alta probabilidad de exito.
- Siempre guarda el estado previo para poder hacer rollback si la operación falla.
- Nunca hagas rollback silencioso -- siempre notifica al usuario cuando una acción optimista falla.
- Usa backoff exponencial con jitter para reintentos. Limita a 3-5 intentos.
- Solo reintenta automáticamente operaciones idempotentes. Para operaciones no idempotentes, usa claves de idempotencia.
- TanStack Query, SWR y Apollo Client proporcionan soporte integrado para ambos patrones.
