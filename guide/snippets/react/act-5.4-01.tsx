// src/components/ListaGrande.tsx — SIN virtualizar
const items = Array.from({ length: 10_000 }, (_, i) => ({
  id: i + 1,
  nombre: `Usuario ${i + 1}`,
  email: `usuario${i + 1}@example.com`,
}));

export default function ListaGrande() {
  return (
    <div style={{ height: 500, overflowY: 'auto' }}>
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            padding: '0.5rem 1rem',
            borderBottom: '1px solid #eee',
            height: 48,
          }}
        >
          {item.id} - {item.nombre} - {item.email}
        </div>
      ))}
    </div>
  );
}
