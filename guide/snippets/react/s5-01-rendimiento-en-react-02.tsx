// BAD — inline object creates a new reference every render
<ProductCard product={{ name: 'Teclado', price: 89.99 }} />

// GOOD — stable reference
const product = useMemo(() => ({ name: 'Teclado', price: 89.99 }), []);
<ProductCard product={product} />
