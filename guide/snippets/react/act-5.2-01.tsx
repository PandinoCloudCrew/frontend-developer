// src/router.tsx
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Perfil = lazy(() => import('./pages/Perfil'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<p>Cargando...</p>}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: '/perfil',
    element: (
      <Suspense fallback={<p>Cargando...</p>}>
        <Perfil />
      </Suspense>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <Suspense fallback={<p>Cargando...</p>}>
        <Dashboard />
      </Suspense>
    ),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
