# Resiliencia en el Navegador: Offline-First y Service Workers

[<- Volver a Etapa 6](../README.md)

Un usuario en el metro pierde conexion a mitad de un formulario. Otro en una zona rural tiene 2G intermitente. Otro en un avion quiere revisar datos que ya cargo. Si tu app depende al 100% de la red, todos estos usuarios ven una pantalla en blanco. La resiliencia en el navegador es la capacidad de tu app de seguir funcionando (o degradarse con gracia) cuando la red falla.

## Contenido

- [El espectro de resiliencia](#el-espectro-de-resiliencia)
- [Service Workers](#service-workers)
- [Estrategias de caching](#estrategias-de-caching)
- [Offline queue pattern](#offline-queue-pattern)
- [Deteccion del estado de red](#deteccion-del-estado-de-red)
- [Implementacion en Angular](#implementacion-en-angular)
- [Anti-patterns](#anti-patterns)
- [Puntos clave](#puntos-clave)

---

## El espectro de resiliencia

No todas las apps necesitan el mismo nivel de soporte offline. Hay tres niveles:

| Nivel | Comportamiento | Complejidad | Ejemplo |
|-------|---------------|-------------|---------|
| **Online-only** | La app se rompe sin red | Ninguna | La mayoria de las apps hoy |
| **Offline-tolerant** | Muestra datos cacheados, encola escrituras | Moderada | Gmail, Google Docs |
| **Offline-first** | Funciona completamente offline, sincroniza despues | Alta | Notion, apps de campo |

**La recomendacion para la mayoria de las apps es offline-tolerant:** cachear datos ya cargados para lectura y encolar acciones de escritura para cuando vuelva la conexion. No necesitas resolver sincronizacion bidireccional completa para dar una experiencia decente sin red.

---

## Service Workers

Un Service Worker es un script que el navegador ejecuta en un hilo separado, entre tu app y la red. Actua como un **proxy programable**: intercepta cada request HTTP que tu app hace y decide si responder desde cache, ir a la red, o ambos.

### Ciclo de vida

```
1. REGISTRO      Tu app registra el Service Worker
      |
2. INSTALL       El SW descarga y cachea assets iniciales
      |
3. ACTIVATE      El SW toma control de las paginas del origin
      |
4. FETCH         El SW intercepta requests y decide como responder
      |
5. UPDATE        Cuando hay una nueva version, se repite el ciclo
```

**Puntos importantes:**
- El Service Worker **no tiene acceso al DOM**. Solo intercepta requests de red.
- El Service Worker **persiste entre sesiones**. Una vez instalado, funciona incluso si el usuario cierra y reabre el navegador.
- El Service Worker **solo funciona sobre HTTPS** (excepto `localhost` para desarrollo).

En la practica, no escribiras Service Workers manualmente. Angular proporciona `@angular/service-worker` que genera y gestiona el Service Worker por ti.

---

## Estrategias de caching

| Estrategia | Comportamiento | Ideal para |
|------------|----------------|------------|
| **Cache-first** | Sirve del cache; si no esta, va a la red | Assets estaticos (CSS, JS, imagenes) |
| **Network-first** | Intenta la red; si falla, usa cache | Datos de API que cambian frecuentemente |
| **Stale-while-revalidate** | Sirve del cache inmediatamente, actualiza en background | Datos que cambian pero tolerar 5 min de delay esta bien |

---

## Offline queue pattern

Cuando el usuario realiza una accion offline (crear, editar, eliminar), no puedes enviarla al servidor. La solucion: encolar la accion en IndexedDB y reproducirla cuando vuelva la conexion.

```typescript
// offline-queue.service.ts
import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { openDB } from 'idb';
import { firstValueFrom } from 'rxjs';

interface QueuedAction {
  id: string;
  method: 'POST' | 'PUT' | 'DELETE';
  url: string;
  body?: unknown;
  timestamp: number;
}

@Injectable({ providedIn: 'root' })
export class OfflineQueueService {
  private http = inject(HttpClient);
  pendientes = signal(0);

  private async getDb() {
    return openDB('offline-queue', 1, {
      upgrade(db) {
        db.createObjectStore('acciones', { keyPath: 'id' });
      },
    });
  }

  async encolar(action: Omit<QueuedAction, 'id' | 'timestamp'>): Promise<void> {
    const db = await this.getDb();
    await db.put('acciones', {
      ...action,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    });
    this.pendientes.update(n => n + 1);
  }

  async reproducir(): Promise<void> {
    const db = await this.getDb();
    const acciones = await db.getAll('acciones');

    // Ordenar por timestamp para mantener el orden
    acciones.sort((a, b) => a.timestamp - b.timestamp);

    for (const accion of acciones) {
      try {
        await firstValueFrom(
          this.http.request(accion.method, accion.url, { body: accion.body })
        );
        await db.delete('acciones', accion.id);
        this.pendientes.update(n => n - 1);
      } catch {
        // Si falla, dejar en la cola para el proximo intento
        break;
      }
    }
  }
}
```

### Resolucion de conflictos

Cuando la cola se reproduce, puede haber conflictos (otro usuario modifico el mismo recurso mientras estabas offline):

| Estrategia | Como funciona | Cuando usarla |
|------------|---------------|---------------|
| **Last-write-wins** | El ultimo en escribir gana. Simple pero puede perder datos. | Datos de baja importancia (preferencias, borradores) |
| **Server-wins** | El servidor rechaza si hay conflicto (409 Conflict). El frontend muestra ambas versiones. | Datos compartidos por multiples usuarios |
| **Manual merge** | El usuario decide que version mantener. | Datos criticos (documentos, registros financieros) |

---

## Deteccion del estado de red

`navigator.onLine` y los eventos `online`/`offline` detectan si hay conexion de red **fisica**, pero no si puedes llegar a tu API (WiFi sin internet, captive portals, firewalls). La estrategia robusta combina ambos: usa `navigator.onLine` como filtro rapido y confirma con un fetch real:

```typescript
async function checkConnection(): Promise<boolean> {
  if (!navigator.onLine) return false;
  try {
    const response = await fetch('/api/health', { method: 'HEAD', cache: 'no-store' });
    return response.ok;
  } catch {
    return false;
  }
}
```

---

## Implementacion en Angular

### Agregar soporte PWA

```bash
ng add @angular/pwa
```

Esto genera:
- `ngsw-config.json` — configuracion del Service Worker
- `manifest.webmanifest` — metadatos de la PWA (nombre, icono, colores)
- Registra el Service Worker en `app.config.ts`

### Configuracion del Service Worker

```typescript
// app.config.ts
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig = {
  providers: [
    provideServiceWorker('ngsw-worker.js', {
      enabled: true, // En produccion. Usa environment.production en proyectos reales
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
```

### ngsw-config.json

El archivo `ngsw-config.json` define que cachear y con que estrategia:

- **`assetGroups`:** Assets estaticos. `installMode: "prefetch"` los descarga inmediatamente, `"lazy"` los cachea cuando se piden.
- **`dataGroups`:** Datos de API. `strategy: "freshness"` = network-first, `"performance"` = cache-first. El campo `timeout` define cuanto esperar antes de usar el cache.

Usa el servicio `SwUpdate` para detectar cuando hay una nueva version disponible y notificar al usuario con `swUpdate.versionUpdates`.

---

## Anti-patterns

- **Asumir que `navigator.onLine` es confiable.** `navigator.onLine === true` no significa que puedas llegar a tu API. Solo significa que hay una conexion de red fisica. Siempre confirma con un fetch real antes de asumir que hay conectividad.
- **Cachear todo.** No todo necesita estar disponible offline. Cachea solo lo que el usuario necesitara sin conexion: datos que ya vio, assets de la app, y formularios en progreso. Cachear todo desperdicia storage y complica las actualizaciones.
- **No versionar el Service Worker.** Si el Service Worker cachea assets sin control de versiones, los usuarios se quedan atrapados en versiones viejas de tu app. Angular's `@angular/service-worker` maneja esto automaticamente con hashes de archivos.
- **No manejar conflictos de sincronizacion.** Si dos usuarios editan el mismo recurso offline y ambos sincronizan, uno sobreescribe al otro. Define una estrategia de resolucion de conflictos (last-write-wins, server-wins, o merge manual) antes de implementar sync.
- **Registrar el Service Worker en desarrollo.** El caching agresivo del Service Worker hace que los cambios de codigo no se reflejen al recargar. Solo activa el Service Worker en builds de produccion. Angular's `provideServiceWorker` acepta `enabled: !isDevMode()` para esto.
- **Ignorar el tamanio de la cola offline.** Si un usuario trabaja offline durante horas, la cola puede acumular cientos de acciones. Establece un limite y notifica al usuario cuando la cola es grande.

---

## Puntos clave

- La resiliencia en el navegador tiene tres niveles: online-only, offline-tolerant, y offline-first. Para la mayoria de las apps, offline-tolerant (cache de lectura + cola de escritura) es el balance correcto.
- Un Service Worker es un proxy programable entre tu app y la red. Intercepta requests y decide si responder desde cache o desde la red.
- Tres estrategias de caching: cache-first (rendimiento), network-first (frescura), stale-while-revalidate (balance). Usa la correcta segun el tipo de dato.
- El offline queue pattern encola acciones en IndexedDB y las reproduce cuando vuelve la conexion. Define una estrategia de resolucion de conflictos desde el inicio.
- `navigator.onLine` es un indicador inicial, no una fuente de verdad. Confirma conectividad real con un fetch al endpoint de tu API.
- En Angular, usa `@angular/service-worker` con `ngsw-config.json` para configurar caching de assets y datos. Usa `SwUpdate` para notificar al usuario cuando hay una nueva version.
- Nunca registres el Service Worker en modo desarrollo — el caching hara que tus cambios de codigo no se reflejen al recargar.

---

[<- Volver a Etapa 6](../README.md)
