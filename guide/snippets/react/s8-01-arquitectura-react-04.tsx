import { useQuery } from '@tanstack/react-query';

function ProductList() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetch('/api/products').then(r => r.json()),
  });

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;

  return products.map((p: Product) => <ProductCard key={p.id} product={p} />);
}
