// src/components/ProductList.tsx — estado derivado con useMemo
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../api/products';

export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: products, isLoading, isError, refetch } = useProducts();

  // Estado de URL (leído de query params)
  const category = searchParams.get('category') || 'all';
  const sortBy = searchParams.get('sort') || 'default';
  const page = Number(searchParams.get('page')) || 1;
  const pageSize = 6;

  // Estado derivado — se calcula automáticamente
  const filteredProducts = useMemo(() => {
    let result = [...(products ?? [])];
    if (category !== 'all') {
      result = result.filter((p) => p.category === category);
    }
    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);

    return result;
  }, [products, category, sortBy]);

  const paginatedProducts = useMemo(
    () => filteredProducts.slice((page - 1) * pageSize, page * pageSize),
    [filteredProducts, page, pageSize],
  );

  const updateFilters = (cat: string, sort: string, pg: number) => {
    setSearchParams({ category: cat, sort, page: String(pg) });
  };

  // ... render con isLoading, isError, paginatedProducts, etc.
  return <>{/* UI aquí */}</>;
}
