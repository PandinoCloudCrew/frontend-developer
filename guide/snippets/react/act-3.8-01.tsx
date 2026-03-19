// src/components/StaleDemo.tsx — demo de stale closure con useState
import { useState } from 'react';

export default function StaleDemo() {
  const [counter, setCounter] = useState(0);

  const incrementBuggy = () => {
    // BUG: captura el valor actual en la closure
    const current = counter;
    setTimeout(() => {
      setCounter(current + 1);
    }, 100);
  };

  const incrementFixed = () => {
    // CORRECTO: usa la forma funcional que siempre lee el valor más reciente
    setTimeout(() => {
      setCounter((c) => c + 1);
    }, 100);
  };

  return (
    <>
      <h2>Demo: Stale Closure</h2>
      <p>Contador: {counter}</p>
      <button onClick={incrementBuggy}>+1 (buggy)</button>
      <button onClick={incrementFixed}>+1 (fixed)</button>
      <button onClick={() => setCounter(0)}>Reset</button>
      <p className="hint">
        Haz click rápido 10 veces en cada botón y compara.
      </p>
    </>
  );
}
