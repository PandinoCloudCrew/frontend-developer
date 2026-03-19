// src/components/ListaProductos.tsx — SIN memoizacion
import { useState } from 'react';

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

  // SIN memoizacion: se recalcula en cada render
  console.log('Recalculando productosFiltrados...');
  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar..."
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <p>Total filtrado: {productosFiltrados.length}</p>
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
