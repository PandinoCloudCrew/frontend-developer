// src/auth/AuthContext.tsx — Servicio de autenticacion con Context + hooks
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';

interface TokenResponse {
  access_token: string;
  expires_in: number;
}

interface AuthContextValue {
  estaAutenticado: boolean;
  obtenerToken: () => string | null;
  iniciarLogin: () => void;
  manejarCallback: (code: string) => Promise<void>;
  renovarToken: () => Promise<void>;
  cerrarSesion: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // El access token se guarda en MEMORIA — no en localStorage
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [tokenExpiraEn, setTokenExpiraEn] = useState(0);

  const estaAutenticado = accessToken !== null && Date.now() < tokenExpiraEn;

  const obtenerToken = useCallback(() => accessToken, [accessToken]);

  const iniciarLogin = useCallback(() => {
    const codeVerifier = crypto.randomUUID();
    sessionStorage.setItem('pkce_code_verifier', codeVerifier);

    const authUrl = new URL('https://tu-auth-provider.com/authorize');
    authUrl.searchParams.set('client_id', 'TU_CLIENT_ID');
    authUrl.searchParams.set('redirect_uri', window.location.origin + '/callback');
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('scope', 'openid profile email');
    authUrl.searchParams.set('code_challenge', codeVerifier);
    authUrl.searchParams.set('code_challenge_method', 'S256');

    window.location.href = authUrl.toString();
  }, []);

  const manejarCallback = useCallback(async (code: string) => {
    const codeVerifier = sessionStorage.getItem('pkce_code_verifier') ?? '';
    sessionStorage.removeItem('pkce_code_verifier');

    const res = await fetch('/api/auth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        code_verifier: codeVerifier,
        redirect_uri: window.location.origin + '/callback',
      }),
    });

    const data: TokenResponse = await res.json();
    setAccessToken(data.access_token);
    setTokenExpiraEn(Date.now() + data.expires_in * 1000);
  }, []);

  const renovarToken = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include', // envia la cookie HttpOnly
      });
      const data: TokenResponse = await res.json();
      setAccessToken(data.access_token);
      setTokenExpiraEn(Date.now() + data.expires_in * 1000);
    } catch {
      setAccessToken(null);
      setTokenExpiraEn(0);
    }
  }, []);

  const cerrarSesion = useCallback(() => {
    setAccessToken(null);
    setTokenExpiraEn(0);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      estaAutenticado,
      obtenerToken,
      iniciarLogin,
      manejarCallback,
      renovarToken,
      cerrarSesion,
    }),
    [estaAutenticado, obtenerToken, iniciarLogin, manejarCallback, renovarToken, cerrarSesion],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}
