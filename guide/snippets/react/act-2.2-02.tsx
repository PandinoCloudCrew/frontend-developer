// src/components/SearchBar.tsx
import { useState } from 'react';
import Button from './Button';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export default function SearchBar({
  placeholder = 'Buscar...',
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button label="Buscar" onClick={() => onSearch?.(query)} />
    </div>
  );
}
