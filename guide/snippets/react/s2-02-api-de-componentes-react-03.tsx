// El consumidor puede hacer focus programáticamente
import { useRef } from 'react';

function SearchForm() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form>
      <Input ref={inputRef} label="Buscar" />
      <button type="button" onClick={() => inputRef.current?.focus()}>
        Enfocar
      </button>
    </form>
  );
}
