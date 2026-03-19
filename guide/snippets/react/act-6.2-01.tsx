// src/components/ListaUsuarios.tsx — Los 4 estados de una vista con datos
import { useState, useEffect, useCallback } from 'react';

interface Usuario {
  id: number;
  name: string;
  email: string;
}

type Estado = 'loading' | 'success' | 'error' | 'empty';

export default function ListaUsuarios() {
  const [estado, setEstado] = useState<Estado>('loading');
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  const cargar = useCallback(async () => {
    setEstado('loading');
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!res.ok) throw new Error('Error de red');
      const datos: Usuario[] = await res.json();
      setUsuarios(datos);
      setEstado(datos.length === 0 ? 'empty' : 'success');
    } catch {
      setEstado('error');
    }
  }, []);

  useEffect(() => { cargar(); }, [cargar]);

  if (estado === 'loading') {
    return (
      <div className="skeleton-list">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="skeleton-item">
            <div className="skeleton-line skeleton-name" />
            <div className="skeleton-line skeleton-email" />
          </div>
        ))}
      </div>
    );
  }

  if (estado === 'error') {
    return (
      <div className="error-state">
        <p>No pudimos cargar los usuarios. Verifica tu conexion e intenta de nuevo.</p>
        <button onClick={cargar}>Reintentar</button>
      </div>
    );
  }

  if (estado === 'empty') {
    return (
      <div className="empty-state">
        <p>No hay usuarios registrados todavia.</p>
        <p>Cuando alguien se registre, aparecera aqui.</p>
      </div>
    );
  }

  return (
    <ul>
      {usuarios.map((u) => (
        <li key={u.id}>
          <strong>{u.name}</strong>
          <span>{u.email}</span>
        </li>
      ))}
    </ul>
  );
}
