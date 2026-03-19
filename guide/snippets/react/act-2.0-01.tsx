// src/components/Greeting.tsx
import { useState } from 'react';

export default function Greeting() {
  const [name, setName] = useState('Mundo');

  return (
    <>
      <label htmlFor="nameInput">Tu nombre:</label>
      <input
        id="nameInput"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <h1>Hola, {name}!</h1>
    </>
  );
}
