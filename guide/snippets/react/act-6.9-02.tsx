// src/router.tsx — Rutas protegidas con RBAC
import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { RequireRole, ROLES } from './auth/PermissionContext';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminUsuarios = lazy(() => import('./pages/admin/AdminUsuarios'));
const SinPermiso = lazy(() => import('./pages/SinPermiso'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<p>Cargando...</p>}>
        <Dashboard />
      </Suspense>
    ),
  },
  {
    path: '/admin',
    element: (
      <RequireRole roles={[ROLES.ADMIN]} fallback={<Navigate to="/sin-permiso" />}>
        <Suspense fallback={<p>Cargando...</p>}>
          <AdminDashboard />
        </Suspense>
      </RequireRole>
    ),
  },
  {
    path: '/admin/usuarios',
    element: (
      <RequireRole roles={[ROLES.ADMIN]} fallback={<Navigate to="/sin-permiso" />}>
        <Suspense fallback={<p>Cargando...</p>}>
          <AdminUsuarios />
        </Suspense>
      </RequireRole>
    ),
  },
  {
    path: '/sin-permiso',
    element: (
      <Suspense fallback={<p>Cargando...</p>}>
        <SinPermiso />
      </Suspense>
    ),
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
