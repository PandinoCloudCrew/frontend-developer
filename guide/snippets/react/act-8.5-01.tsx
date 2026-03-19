// pages/about.tsx — Pagina estatica (SSG) con Next.js
export default function AboutPage() {
  return (
    <>
      <h1>Sobre nosotros</h1>
      <p>Esta pagina se genera como HTML estatico en build time.</p>
    </>
  );
}

// Next.js genera esta pagina como HTML estatico por defecto (SSG).
// No necesitas configuracion adicional.
