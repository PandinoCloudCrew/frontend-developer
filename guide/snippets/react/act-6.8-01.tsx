// src/auth/OidcAuthProvider.tsx — Login OIDC con oidc-client-ts + react-oidc-context
import { AuthProvider, useAuth as useOidc } from 'react-oidc-context';
import type { ReactNode } from 'react';

const oidcConfig = {
  // Para Auth0:
  authority: 'https://TU-TENANT.auth0.com',
  // Para Keycloak:
  // authority: 'http://localhost:8080/realms/mi-app',
  client_id: 'TU-CLIENT-ID',
  redirect_uri: window.location.origin,
  post_logout_redirect_uri: window.location.origin,
  scope: 'openid profile email',
  automaticSilentRenew: true,
};

export function OidcProvider({ children }: { children: ReactNode }) {
  return <AuthProvider {...oidcConfig}>{children}</AuthProvider>;
}

export function AuthStatus() {
  const auth = useOidc();

  if (auth.isAuthenticated) {
    return (
      <div className="user-info">
        <p>Hola, {auth.user?.profile.name ?? 'usuario'}</p>
        <p className="email">{auth.user?.profile.email}</p>
        <button onClick={() => auth.removeUser()}>Cerrar sesion</button>
      </div>
    );
  }

  return <button onClick={() => auth.signinRedirect()}>Iniciar sesion</button>;
}
