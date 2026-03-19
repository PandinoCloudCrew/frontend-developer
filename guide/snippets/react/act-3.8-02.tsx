// src/components/MutationDemo.tsx — demo de mutación invisible con useState
import { useState } from 'react';

export default function MutationDemo() {
  const [user, setUser] = useState({ name: 'Ana', age: 25 });

  const mutateBuggy = () => {
    // BUG: muta el objeto directamente — React NO re-renderiza
    user.age = user.age + 1;
    setUser(user); // misma referencia, React ignora el cambio
    console.log('Mutado:', user.age);
  };

  const mutateFixed = () => {
    // CORRECTO: crea un objeto nuevo
    setUser((u) => ({ ...u, age: u.age + 1 }));
  };

  return (
    <>
      <h2>Demo: Mutación Invisible</h2>
      <p>
        {user.name}, {user.age} años
      </p>
      <button onClick={mutateBuggy}>+1 edad (buggy)</button>
      <button onClick={mutateFixed}>+1 edad (fixed)</button>
    </>
  );
}
