// src/components/OfflineStatus.tsx — Deteccion de red + cola offline
import { useState, useEffect, useSyncExternalStore } from 'react';
import { offlineQueue } from '../services/offline-queue';

function subscribeOnline(callback: () => void) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function getOnlineSnapshot() {
  return navigator.onLine;
}

export default function OfflineStatus() {
  const isOnline = useSyncExternalStore(subscribeOnline, getOnlineSnapshot);
  const [pendientes, setPendientes] = useState(0);

  useEffect(() => {
    offlineQueue.inicializar().then(() =>
      setPendientes(offlineQueue.pendingCount()),
    );
  }, []);

  async function sincronizar() {
    const resultado = await offlineQueue.reproducir();
    setPendientes(offlineQueue.pendingCount());
    if (resultado.fallos > 0) {
      console.warn(
        `Sincronizacion parcial: ${resultado.exitos} exitos, ${resultado.fallos} fallos`,
      );
    }
  }

  if (!isOnline) {
    return (
      <div className="offline-banner">
        Sin conexion — las acciones se guardaran localmente
        {pendientes > 0 && ` (${pendientes} pendientes)`}
      </div>
    );
  }

  if (pendientes > 0) {
    return (
      <div className="sync-banner">
        Conexion restaurada —{' '}
        <button onClick={sincronizar}>
          Sincronizar {pendientes} acciones pendientes
        </button>
      </div>
    );
  }

  return null;
}
