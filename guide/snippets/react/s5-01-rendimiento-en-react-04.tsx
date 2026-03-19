// With React Compiler, this "just works" — no manual memoization needed
function ProductList({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState('');

  // Compiler auto-memoizes this
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase()),
  );

  // Compiler auto-memoizes the callback
  const handleClick = (id: string) => console.log('click', id);

  return filtered.map(p => <ProductCard key={p.id} name={p.name} price={p.price} onClick={() => handleClick(p.id)} />);
}
