// src/auth/PermissionContext.tsx — RBAC con Context + hooks
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';

interface UserProfile {
  id: string;
  roles: string[];
  permissions: string[];
}

export const ROLES = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  VIEWER: 'viewer',
} as const;

export const PERMISSIONS = {
  USERS_READ: 'users:read',
  USERS_WRITE: 'users:write',
  USERS_DELETE: 'users:delete',
  POSTS_READ: 'posts:read',
  POSTS_WRITE: 'posts:write',
  POSTS_PUBLISH: 'posts:publish',
} as const;

interface PermissionContextValue {
  roles: string[];
  permissions: string[];
  isLoaded: boolean;
  hasRole: (role: string) => boolean;
  hasPermission: (perm: string) => boolean;
  cargarPermisos: () => Promise<void>;
}

const PermissionContext = createContext<PermissionContextValue | null>(null);

export function PermissionProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const roles = profile?.roles ?? [];
  const permissions = profile?.permissions ?? [];
  const isLoaded = profile !== null;

  const hasRole = useCallback(
    (role: string) => roles.includes(role),
    [roles],
  );
  const hasPermission = useCallback(
    (perm: string) => permissions.includes(perm),
    [permissions],
  );

  const cargarPermisos = useCallback(async () => {
    const res = await fetch('/api/me');
    const data: UserProfile = await res.json();
    setProfile(data);
  }, []);

  const value = useMemo<PermissionContextValue>(
    () => ({ roles, permissions, isLoaded, hasRole, hasPermission, cargarPermisos }),
    [roles, permissions, isLoaded, hasRole, hasPermission, cargarPermisos],
  );

  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  );
}

export function usePermissions() {
  const ctx = useContext(PermissionContext);
  if (!ctx) throw new Error('usePermissions debe usarse dentro de <PermissionProvider>');
  return ctx;
}

// Componente wrapper para proteger rutas por rol
export function RequireRole({
  roles,
  children,
  fallback,
}: {
  roles: string[];
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const { hasRole } = usePermissions();
  const allowed = roles.some(hasRole);
  if (!allowed) return fallback ?? <p>Acceso denegado</p>;
  return <>{children}</>;
}
