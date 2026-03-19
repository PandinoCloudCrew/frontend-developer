// app/products/page.tsx — Server Component by default
async function ProductsPage() {
  const products = await fetch('https://api.example.com/products').then(r => r.json());

  return (
    <ul>
      {products.map((p: Product) => (
        <li key={p.id}>{p.name} — ${p.price}</li>
      ))}
    </ul>
  );
}

export default ProductsPage;
