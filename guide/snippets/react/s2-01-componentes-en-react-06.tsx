interface Product {
  id: string;
  name: string;
  price: number;
}

function ProductList({ products }: { products: Product[] }) {
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name} --- ${product.price.toFixed(2)}
        </li>
      ))}
    </ul>
  );
}
