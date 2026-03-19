// src/components/DetalleProducto.tsx — React.memo evita re-renders innecesarios
import { memo, useState } from 'react';

interface Config {
  color: string;
  tamano: string;
}

const DetalleProducto = memo(function DetalleProducto({
  config,
}: {
  config: Config;
}) {
  console.log('DetalleProducto: render ejecutado');
  return (
    <div>
      {config.color} - {config.tamano}
    </div>
  );
});

// MAL: objeto inline crea una nueva referencia en cada render
function PadreIncorrecto() {
  const [contador, setContador] = useState(0);
  return (
    <>
      {/* { color: 'rojo', tamano: 'grande' } es un objeto nuevo cada render */}
      <DetalleProducto config={{ color: 'rojo', tamano: 'grande' }} />
      <button onClick={() => setContador((c) => c + 1)}>
        Clicks: {contador}
      </button>
    </>
  );
}

// BIEN: objeto estable fuera del render (o con useMemo)
const CONFIG: Config = { color: 'rojo', tamano: 'grande' };

function PadreCorrecto() {
  const [contador, setContador] = useState(0);
  return (
    <>
      <DetalleProducto config={CONFIG} />
      <button onClick={() => setContador((c) => c + 1)}>
        Clicks: {contador}
      </button>
    </>
  );
}

export { PadreIncorrecto, PadreCorrecto };
