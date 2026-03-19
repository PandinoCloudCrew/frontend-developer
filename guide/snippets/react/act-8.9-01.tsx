// src/hooks/useTareaStore.ts — Hook con IndexedDB + estado reactivo
import { useState, useCallback, useMemo, useEffect } from 'react';
import { openDB, type IDBPDatabase } from 'idb';

export interface Tarea {
  id: string;
  titulo: string;
  descripcion: string;
  completada: boolean;
  creadaEn: number;
  actualizadaEn: number;
}

let db: IDBPDatabase;

async function initDB() {
  if (db) return db;
  db = await openDB('mi-app-tareas', 1, {
    upgrade(database) {
      const store = database.createObjectStore('tareas', { keyPath: 'id' });
      store.createIndex('completada', 'completada');
      store.createIndex('creadaEn', 'creadaEn');
    },
  });
  return db;
}

export function useTareaStore() {
  const [tareas, setTareas] = useState<Tarea[]>([]);

  const recargar = useCallback(async () => {
    const database = await initDB();
    const todas = await database.getAll('tareas');
    todas.sort((a, b) => b.creadaEn - a.creadaEn);
    setTareas(todas);
  }, []);

  useEffect(() => { recargar(); }, [recargar]);

  const agregar = useCallback(async (titulo: string, descripcion = '') => {
    const database = await initDB();
    const tarea: Tarea = {
      id: crypto.randomUUID(),
      titulo,
      descripcion,
      completada: false,
      creadaEn: Date.now(),
      actualizadaEn: Date.now(),
    };
    await database.put('tareas', tarea);
    await recargar();
    return tarea;
  }, [recargar]);

  const actualizar = useCallback(async (
    id: string,
    cambios: Partial<Omit<Tarea, 'id' | 'creadaEn'>>,
  ) => {
    const database = await initDB();
    const tarea = await database.get('tareas', id);
    if (!tarea) throw new Error(`Tarea ${id} no encontrada`);
    await database.put('tareas', { ...tarea, ...cambios, actualizadaEn: Date.now() });
    await recargar();
  }, [recargar]);

  const toggleCompletada = useCallback(async (id: string) => {
    const database = await initDB();
    const tarea = await database.get('tareas', id);
    if (!tarea) throw new Error(`Tarea ${id} no encontrada`);
    await actualizar(id, { completada: !tarea.completada });
  }, [actualizar]);

  const eliminar = useCallback(async (id: string) => {
    const database = await initDB();
    await database.delete('tareas', id);
    await recargar();
  }, [recargar]);

  const eliminarCompletadas = useCallback(async () => {
    const database = await initDB();
    const completadas = tareas.filter((t) => t.completada);
    const tx = database.transaction('tareas', 'readwrite');
    await Promise.all([
      ...completadas.map((t) => tx.store.delete(t.id)),
      tx.done,
    ]);
    await recargar();
  }, [tareas, recargar]);

  const pendientes = useMemo(() => tareas.filter((t) => !t.completada), [tareas]);
  const completadas = useMemo(() => tareas.filter((t) => t.completada), [tareas]);

  return {
    todas: tareas,
    pendientes,
    completadas,
    totalPendientes: pendientes.length,
    agregar,
    actualizar,
    toggleCompletada,
    eliminar,
    eliminarCompletadas,
  };
}
