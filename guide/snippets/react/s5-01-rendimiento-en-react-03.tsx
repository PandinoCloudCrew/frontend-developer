import { useMemo, useCallback, useState } from 'react';

function ProductList({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState('');

  // Only recalculates when products or filter change
  const filteredProducts = useMemo(
    () => products.filter(p => p.name.toLowerCase().includes(filter.toLowerCase())),
    [products, filter],
  );

  // Stable reference — safe to pass to memoized children
  const handleAddToCart = useCallback((id: string) => {
    console.log('Adding', id);
  }, []);

  return (
    <div>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      {filteredProducts.map(p => (
        <ProductCard key={p.id} name={p.name} price={p.price} onAddToCart={() => handleAddToCart(p.id)} />
      ))}
    </div>
  );
}
