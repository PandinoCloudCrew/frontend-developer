// src/components/UserFilters.tsx
interface UserFiltersProps {
  cities: string[];
  onSearchChange: (term: string) => void;
  onCityChange: (city: string) => void;
  onRoleChange: (role: string) => void;
}

export default function UserFilters({
  cities,
  onSearchChange,
  onCityChange,
  onRoleChange,
}: UserFiltersProps) {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Buscar por nombre o email..."
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select onChange={(e) => onCityChange(e.target.value)}>
        <option value="">Todas las ciudades</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      <select onChange={(e) => onRoleChange(e.target.value)}>
        <option value="">Todos los roles</option>
        <option value="admin">Admin</option>
        <option value="editor">Editor</option>
        <option value="viewer">Viewer</option>
      </select>
    </div>
  );
}
