// src/components/SearchBar.tsx
import { useState, type FormEvent } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (query.trim() === '') {
      setErrorMessage('Escribe algo para buscar');
      return;
    }
    setErrorMessage('');
    onSearch(query.trim());
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="search-input">Buscar</label>
      <input
        id="search-input"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Escribe tu busqueda..."
      />
      <button type="submit">Buscar</button>
      {errorMessage && <p role="alert">{errorMessage}</p>}
    </form>
  );
}
