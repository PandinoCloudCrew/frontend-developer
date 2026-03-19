// src/components/ListaProductos.tsx — CON memoizacion
import { useState, useMemo } from 'react';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
}

function generarProductos(cantidad: number): Producto[] {
  return Array.from({ length: cantidad }, (_, i) => ({
    id: i,
    nombre: `Producto ${i}`,
    precio: Math.round(Math.random() * 100),
    categoria: ['Electronica', 'Ropa', 'Hogar'][i % 3],
  }));
}

const productos = generarProductos(5000);

export default function ListaProductos() {
  const [busqueda, setBusqueda] = useState('');
  const [contador, setContador] = useState(0);

  // CON useMemo: se recalcula solo cuando busqueda cambia
  const productosFiltrados = useMemo(() => {
    console.log('Recalculando productosFiltrados...');
    return productos.filter((p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()),
    );
  }, [busqueda]);

  const totalFiltrado = useMemo(
    () => productosFiltrados.length,
    [productosFiltrados],
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar..."
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <p>Total filtrado: {totalFiltrado}</p>
      <ul>
        {productosFiltrados.map((p) => (
          <li key={p.id}>
            {p.nombre} - ${p.precio}
          </li>
        ))}
      </ul>
      <button onClick={() => setContador((c) => c + 1)}>
        Clicks: {contador}
      </button>
    </div>
  );
}
