// src/components/ProductList.tsx — filtros en la URL con useSearchParams
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/products';

export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get('category') || 'all';
  const sortBy = searchParams.get('sort') || 'default';
  const page = Number(searchParams.get('page')) || 1;
  const pageSize = 6;

  const { data: products, isLoading, isError, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const updateFilters = (
    newCategory: string,
    newSort: string,
    newPage: number,
  ) => {
    setSearchParams({
      category: newCategory,
      sort: newSort,
      page: String(newPage),
    });
  };

  // Filtrado y ordenamiento derivados de la URL
  const filtered = (products ?? [])
    .filter((p) => category === 'all' || p.category === category)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });

  const paginated = filtered.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  // ... render con los 4 estados usando isLoading, isError, etc.
  return (
    <>
      <div className="filters">
        <label>
          Categoría:
          <select
            value={category}
            onChange={(e) => updateFilters(e.target.value, sortBy, 1)}
          >
            <option value="all">Todas</option>
            <option value="electronics">Electrónica</option>
            <option value="jewelery">Joyería</option>
          </select>
        </label>
        <label>
          Ordenar:
          <select
            value={sortBy}
            onChange={(e) => updateFilters(category, e.target.value, 1)}
          >
            <option value="default">Sin orden</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
          </select>
        </label>
      </div>

      {/* ... render de productos con paginated */}

      <div className="pagination">
        <button
          disabled={page <= 1}
          onClick={() => updateFilters(category, sortBy, page - 1)}
        >
          ← Anterior
        </button>
        <span>Página {page}</span>
        <button
          onClick={() => updateFilters(category, sortBy, page + 1)}
        >
          Siguiente →
        </button>
      </div>
    </>
  );
}
