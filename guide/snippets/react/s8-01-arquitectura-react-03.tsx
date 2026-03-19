import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';

const Products = lazy(() => import('./features/products/pages/ProductList'));
const ProductDetail = lazy(() => import('./features/products/pages/ProductDetail'));
const Checkout = lazy(() => import('./features/checkout/pages/Checkout'));
const Admin = lazy(() => import('./features/admin/pages/AdminDashboard'));

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
