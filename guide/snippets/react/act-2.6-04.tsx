// src/components/SearchInput.tsx — componente uncontrolled
import { useState } from 'react';

interface SearchInputProps {
  inputId?: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  onSearch?: (value: string) => void;
}

export default function SearchInput({
  inputId = 'search',
  label = 'Buscar',
  placeholder = 'Escribe para buscar...',
  defaultValue = '',
  onSearch,
}: SearchInputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <>
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        type="text"
        value={internalValue}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </>
  );
}
