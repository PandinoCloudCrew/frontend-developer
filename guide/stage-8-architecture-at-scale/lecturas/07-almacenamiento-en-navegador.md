# Almacenamiento en el Navegador

[<- Volver a Etapa 8](../README.md)

El navegador ofrece multiples mecanismos de almacenamiento, cada uno con capacidades, limitaciones y propositos diferentes. Elegir el correcto impacta rendimiento, experiencia offline, y seguridad. Usar `localStorage` para todo es como usar una cuchara para cortar, servir y comer: funciona a medias, pero hay herramientas mejores para cada tarea.

## Contenido

- [Panorama de opciones](#panorama-de-opciones)
- [localStorage y sessionStorage](#localstorage-y-sessionstorage)
- [IndexedDB en profundidad](#indexeddb-en-profundidad)
- [Cache API](#cache-api)
- [OPFS (Origin Private File System)](#opfs-origin-private-file-system)
- [Cookies](#cookies)
- [Quotas y eviction](#quotas-y-eviction)
- [Implementacion en Angular](#implementacion-en-angular)
- [Anti-patterns](#anti-patterns)
- [Puntos clave](#puntos-clave)

---

## Panorama de opciones

| Storage | Capacidad | Persistencia | Estilo de API | Mejor para |
|---------|-----------|-------------|---------------|------------|
| `localStorage` | ~5 MB | Permanente | Sync key-value | Preferencias simples, tema |
| `sessionStorage` | ~5 MB | Sesion del tab | Sync key-value | Datos temporales de formulario |
| `IndexedDB` | Cientos de MB+ | Permanente | Async, transaccional | Apps offline-first, cache de datasets grandes |
| `Cache API` | Cientos de MB+ | Permanente | Async, request/response | Service Worker caching, assets offline |
| `OPFS` | GB+ | Permanente | Async file system | Archivos grandes, SQLite en el navegador |
| Cookies | ~4 KB | Configurable | Sync, se envian con cada request | Auth tokens (HttpOnly), estado del servidor |

---

## localStorage y sessionStorage

Son la opcion mas simple: pares key-value donde tanto la key como el value son strings.

```typescript
// Guardar preferencia de tema
localStorage.setItem('theme', 'dark');

// Leer
const theme = localStorage.getItem('theme'); // 'dark' | null

// Guardar un objeto (requiere serializar)
localStorage.setItem('prefs', JSON.stringify({ lang: 'es', fontSize: 16 }));
const prefs = JSON.parse(localStorage.getItem('prefs') ?? '{}');
```

`sessionStorage` tiene la misma API pero los datos se borran cuando el tab se cierra.

**Limitaciones criticas:**
- **Sync:** `localStorage` bloquea el main thread. Con datos grandes, la UI se congela.
- **Solo strings:** Necesitas `JSON.stringify`/`JSON.parse` para todo, con su costo de serializacion.
- **5 MB:** Suficiente para preferencias, insuficiente para datos de aplicacion.
- **Sin estructura:** No hay indices, no hay queries. Solo `getItem(key)`.

---

## IndexedDB en profundidad

IndexedDB es una base de datos transaccional en el navegador. Almacena objetos JavaScript directamente (no solo strings), soporta indices para queries rapidas, y puede manejar cientos de megabytes. La API nativa es verbose y basada en eventos — usa la libreria `idb` que la envuelve en Promises modernas:

```typescript
import { openDB } from 'idb';

// Abrir/crear la base de datos
const db = await openDB('miApp', 1, {
  upgrade(db) {
    const store = db.createObjectStore('tareas', { keyPath: 'id' });
    store.createIndex('estado', 'estado');
  },
});

// Escribir
await db.put('tareas', {
  id: crypto.randomUUID(),
  titulo: 'Comprar leche',
  estado: 'pendiente',
  creadoEn: Date.now(),
});

// Leer por key
const tarea = await db.get('tareas', 'id-123');

// Leer todas
const todas = await db.getAll('tareas');

// Query por indice
const pendientes = await db.getAllFromIndex('tareas', 'estado', 'pendiente');

// Eliminar
await db.delete('tareas', 'id-123');
```

### Conceptos clave de IndexedDB

- **Object store:** Equivalente a una tabla. Cada store tiene una key path (campo que sirve como ID).
- **Index:** Un campo indexado para queries rapidas. Sin indice, buscar por un campo requiere recorrer todos los registros.
- **Transaction:** Todas las operaciones ocurren dentro de una transaccion. Si algo falla, la transaccion se revierte completa.
- **Versionamiento:** El parametro `version` controla migraciones. Al incrementar la version, se ejecuta el callback `upgrade` donde puedes crear/modificar stores e indices.

---

## Cache API

El Cache API almacena pares `Request`/`Response`. Esta disenado para usarse con Service Workers pero tambien funciona desde el main thread.

```typescript
// Almacenar una respuesta de API en cache
const cache = await caches.open('api-v1');
const response = await fetch('/api/productos');
await cache.put('/api/productos', response.clone());

// Leer del cache
const cachedResponse = await cache.match('/api/productos');
if (cachedResponse) {
  const datos = await cachedResponse.json();
}

// Eliminar una entrada
await cache.delete('/api/productos');

// Eliminar un cache completo
await caches.delete('api-v1');
```

### Estrategias de caching

| Estrategia | Comportamiento | Ideal para |
|------------|----------------|------------|
| **Cache-first** | Busca en cache; si no esta, va a la red y guarda en cache | Assets estaticos (CSS, JS, imagenes) |
| **Network-first** | Intenta la red; si falla, usa el cache | Datos de API que cambian frecuentemente |
| **Stale-while-revalidate** | Sirve del cache inmediatamente, actualiza el cache en background | Datos que cambian pero tolerar datos ligeramente viejos esta bien |

---

## OPFS (Origin Private File System)

OPFS es la API mas reciente: un sistema de archivos real en el navegador, privado por origin. Permite operaciones de archivo de alto rendimiento y puede almacenar gigabytes de datos.

```typescript
const root = await navigator.storage.getDirectory();
const fileHandle = await root.getFileHandle('datos.json', { create: true });

// Escribir
const writable = await fileHandle.createWritable();
await writable.write(JSON.stringify({ version: 1, items: [] }));
await writable.close();

// Leer
const file = await fileHandle.getFile();
const datos = JSON.parse(await file.text());
```

El caso mas potente de OPFS es ejecutar **SQLite directamente en el navegador** usando `wa-sqlite` o `sql.js`. Esto es util cuando necesitas queries relacionales complejas sobre datos locales (JOINs, GROUP BY, subqueries) que IndexedDB no soporta.

---

## Cookies

Las cookies son el mecanismo de storage mas antiguo. Su caracteristica unica: **se envian automaticamente con cada request HTTP** al mismo dominio. Con los atributos `HttpOnly` (inaccesible desde JS), `Secure` (solo HTTPS) y `SameSite=Strict` (sin cross-site), son la opcion correcta para tokens de autenticacion. Para cualquier otro dato, usa las opciones anteriores.

---

## Quotas y eviction

Los navegadores imponen limites de almacenamiento y pueden borrar datos cuando el espacio es insuficiente:

```typescript
// Verificar cuanto espacio tienes
const estimate = await navigator.storage.estimate();
console.log(`Usado: ${(estimate.usage! / 1e6).toFixed(1)} MB`);
console.log(`Disponible: ${(estimate.quota! / 1e6).toFixed(1)} MB`);
```

Los navegadores otorgan hasta el 60% del disco al origin. Cuando necesitan espacio, borran datos de origins menos usados (**eviction**). Para datos criticos, solicita persistent storage con `navigator.storage.persist()` — esto evita que el navegador elimine tus datos automaticamente.

---

## Implementacion en Angular

Un servicio que encapsula IndexedDB con signals para reactividad:

```typescript
// tarea-store.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';

interface Tarea {
  id: string;
  titulo: string;
  completada: boolean;
}

@Injectable({ providedIn: 'root' })
export class TareaStoreService {
  private db!: IDBPDatabase;
  private tareas = signal<Tarea[]>([]);

  pendientes = computed(() => this.tareas().filter(t => !t.completada));

  async inicializar(): Promise<void> {
    this.db = await openDB('miApp', 1, {
      upgrade(db) {
        db.createObjectStore('tareas', { keyPath: 'id' });
      },
    });
    this.tareas.set(await this.db.getAll('tareas'));
  }

  async agregar(titulo: string): Promise<void> {
    const tarea: Tarea = { id: crypto.randomUUID(), titulo, completada: false };
    await this.db.put('tareas', tarea);
    this.tareas.set(await this.db.getAll('tareas'));
  }
}
```

En los componentes, inyecta el servicio con `inject(TareaStoreService)` y usa `store.pendientes()` en el template. El signal se actualiza automaticamente al agregar o modificar tareas.

---

## Anti-patterns

- **Usar localStorage para todo.** Es sync (bloquea el main thread), limitado a 5 MB, sin estructura de datos. Para datos complejos o grandes, usa IndexedDB.
- **No manejar QuotaExceededError.** Cuando el storage esta lleno, `localStorage.setItem` y `db.put` lanzan excepciones. Si no las capturas, la app se rompe silenciosamente.

```typescript
// BIEN — manejar el error
try {
  await db.put('cache', datos);
} catch (error) {
  if (error instanceof DOMException && error.name === 'QuotaExceededError') {
    // Limpiar datos viejos del cache
    await limpiarCacheAntiguo();
    await db.put('cache', datos); // Reintentar
  }
}
```

- **Almacenar datos sensibles en cualquier browser storage.** `localStorage`, `sessionStorage`, IndexedDB y OPFS son legibles por cualquier JavaScript en el mismo origin. Un XSS los compromete todos. Los tokens van en cookies `HttpOnly`.
- **No indexar queries en IndexedDB.** Sin un indice, buscar por un campo recorre todos los registros secuencialmente. Con miles de registros, esto se nota.
- **Usar IndexedDB de forma sincrona conceptualmente.** Toda la API es asincrona, pero hacer `await` en un loop crea un cuello de botella. Usa transacciones para operaciones en lote.

```typescript
// MAL — una transaccion por operacion
for (const item of items) {
  await db.put('store', item); // N transacciones
}

// BIEN — una sola transaccion
const tx = db.transaction('store', 'readwrite');
await Promise.all([
  ...items.map(item => tx.store.put(item)),
  tx.done,
]);
```

---

## Puntos clave

- Cada mecanismo de storage tiene un proposito: `localStorage` para preferencias simples, IndexedDB para datos estructurados, Cache API para responses HTTP, OPFS para archivos grandes, cookies para auth.
- IndexedDB es la opcion correcta para apps offline-first o datos que no caben en los 5 MB de `localStorage`. Usa la libreria `idb` para una API moderna basada en Promises.
- OPFS permite ejecutar SQLite en el navegador — util cuando necesitas queries relacionales complejas sobre datos locales.
- Cache API trabaja con pares Request/Response y es la base del caching con Service Workers.
- Los navegadores imponen quotas y pueden eliminar datos automaticamente (eviction). Usa `navigator.storage.persist()` para datos criticos.
- Nunca almacenes datos sensibles en browser storage — todos son legibles por JavaScript. Los tokens de autenticacion van en cookies `HttpOnly`.

---

[<- Volver a Etapa 8](../README.md)
