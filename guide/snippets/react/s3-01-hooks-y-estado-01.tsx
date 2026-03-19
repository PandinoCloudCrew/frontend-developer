import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(prev => Math.max(0, prev - 1))}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
