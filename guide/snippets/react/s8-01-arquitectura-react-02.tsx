// app/routes/products.tsx
import type { LoaderFunctionArgs } from 'react-router';

export async function loader({ request }: LoaderFunctionArgs) {
  const products = await fetchProducts();
  return { products };
}

export default function Products({ loaderData }: { loaderData: { products: Product[] } }) {
  return (
    <ul>
      {loaderData.products.map(p => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}
