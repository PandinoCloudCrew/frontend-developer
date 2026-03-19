// app/dashboard/page.tsx — Pagina con SSR en Next.js (App Router)
interface UserData {
  name: string;
}

// Al ser un Server Component con fetch, Next.js ejecuta SSR automaticamente
export default async function DashboardPage() {
  const res = await fetch('https://api.example.com/me', {
    cache: 'no-store', // SSR: datos frescos en cada peticion
  });
  const user: UserData = await res.json();

  return (
    <>
      <h1>Dashboard</h1>
      <p>Bienvenido, {user.name}</p>
    </>
  );
}
