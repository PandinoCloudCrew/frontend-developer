// src/App.tsx — setup de React Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductList from './components/ProductList';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <main>
          <h1>Tienda de Productos</h1>
          <Routes>
            <Route path="/" element={<ProductList />} />
          </Routes>
        </main>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
