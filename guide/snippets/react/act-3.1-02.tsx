// src/components/ProductList.tsx — los 4 estados con TanStack Query
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/products';

export default function ProductList() {
  const {
    data: products,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return (
      <div className="skeleton-list">
        <div className="skeleton-card" />
        <div className="skeleton-card" />
        <div className="skeleton-card" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="error-state">
        <p>No pudimos cargar los productos. Verifica tu conexión.</p>
        <button onClick={() => refetch()}>Reintentar</button>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="empty-state">
        <h2>No hay productos todavía</h2>
        <p>Cuando se agreguen productos, aparecerán aquí.</p>
      </div>
    );
  }

  return (
    <ul className="product-list">
      {products.map((product) => (
        <li key={product.id} className="product-card">
          <h3>{product.title}</h3>
          <p className="price">$ {product.price}</p>
        </li>
      ))}
    </ul>
  );
}
