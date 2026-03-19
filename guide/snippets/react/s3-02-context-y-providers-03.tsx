// En main.tsx o App.tsx — envuelve la app
function App() {
  return (
    <AuthProvider>
      <Header />
      <main>
        <RouterProvider router={router} />
      </main>
    </AuthProvider>
  );
}

// Cualquier componente descendiente puede consumir
function Header() {
  const { user, logout } = useAuth();

  return (
    <header>
      {user ? (
        <>
          <span>Hola, {user.name}</span>
          <button onClick={logout}>Cerrar sesión</button>
        </>
      ) : (
        <a href="/login">Iniciar sesión</a>
      )}
    </header>
  );
}
