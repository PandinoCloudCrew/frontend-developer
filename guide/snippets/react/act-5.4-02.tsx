// src/components/ListaGrande.tsx — CON @tanstack/virtual
import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

const items = Array.from({ length: 10_000 }, (_, i) => ({
  id: i + 1,
  nombre: `Usuario ${i + 1}`,
  email: `usuario${i + 1}@example.com`,
}));

export default function ListaGrande() {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48, // altura de cada item en px
  });

  return (
    <div ref={parentRef} style={{ height: 500, overflowY: 'auto' }}>
      <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
        {virtualizer.getVirtualItems().map((vItem) => {
          const item = items[vItem.index];
          return (
            <div
              key={item.id}
              style={{
                position: 'absolute',
                top: vItem.start,
                width: '100%',
                height: 48,
                padding: '0.5rem 1rem',
                borderBottom: '1px solid #eee',
              }}
            >
              {item.id} - {item.nombre} - {item.email}
            </div>
          );
        })}
      </div>
    </div>
  );
}
