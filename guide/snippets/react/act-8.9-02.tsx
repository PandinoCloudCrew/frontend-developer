// src/components/TareaList.tsx — Componente que usa el hook de IndexedDB
import { useState, type FormEvent } from 'react';
import { useTareaStore } from '../hooks/useTareaStore';

export default function TareaList() {
  const store = useTareaStore();
  const [nuevoTitulo, setNuevoTitulo] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (nuevoTitulo.trim()) {
      await store.agregar(nuevoTitulo.trim());
      setNuevoTitulo('');
    }
  }

  return (
    <div className="container">
      <h2>Tareas ({store.totalPendientes} pendientes)</h2>

      <form onSubmit={handleSubmit}>
        <input
          value={nuevoTitulo}
          onChange={(e) => setNuevoTitulo(e.target.value)}
          placeholder="Nueva tarea..."
          required
        />
        <button type="submit">Agregar</button>
      </form>

      {store.todas.length === 0 ? (
        <p>No hay tareas. Agrega una para empezar.</p>
      ) : (
        store.todas.map((tarea) => (
          <div
            key={tarea.id}
            className={`tarea${tarea.completada ? ' completada' : ''}`}
          >
            <input
              type="checkbox"
              checked={tarea.completada}
              onChange={() => store.toggleCompletada(tarea.id)}
            />
            <span>{tarea.titulo}</span>
            <button onClick={() => store.eliminar(tarea.id)}>Eliminar</button>
          </div>
        ))
      )}

      {store.completadas.length > 0 && (
        <button onClick={store.eliminarCompletadas}>
          Limpiar completadas ({store.completadas.length})
        </button>
      )}
    </div>
  );
}
