// src/App.tsx — setup de TanStack Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductList from './components/ProductList';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <h1>Tienda de Productos</h1>
        <ProductList />
      </main>
    </QueryClientProvider>
  );
}
