// src/components/UserDashboard.tsx — componente dios (antes de refactorizar)
import { useState, useMemo } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  city: string;
  role: 'admin' | 'editor' | 'viewer';
  salary: number;
}

const initialUsers: User[] = [
  { id: 1, name: 'Ana Garcia', email: 'ana@mail.com', city: 'Madrid', role: 'admin', salary: 55000 },
  { id: 2, name: 'Carlos Lopez', email: 'carlos@mail.com', city: 'Barcelona', role: 'editor', salary: 42000 },
  { id: 3, name: 'Diana Ruiz', email: 'diana@mail.com', city: 'Madrid', role: 'viewer', salary: 38000 },
  { id: 4, name: 'Eduardo Soto', email: 'edu@mail.com', city: 'Sevilla', role: 'editor', salary: 45000 },
  { id: 5, name: 'Fernanda Vega', email: 'fer@mail.com', city: 'Barcelona', role: 'admin', salary: 60000 },
  { id: 6, name: 'Gabriel Mora', email: 'gab@mail.com', city: 'Madrid', role: 'viewer', salary: 35000 },
];

export default function UserDashboard() {
  const [users] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [sortField, setSortField] = useState<keyof User>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const cities = useMemo(
    () => [...new Set(users.map((u) => u.city))].sort(),
    [users],
  );

  const filteredUsers = useMemo(() => {
    let result = [...users];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(term) ||
          u.email.toLowerCase().includes(term),
      );
    }
    if (selectedCity) result = result.filter((u) => u.city === selectedCity);
    if (selectedRole) result = result.filter((u) => u.role === selectedRole);

    result.sort((a, b) => {
      const dir = sortDirection === 'asc' ? 1 : -1;
      if (a[sortField] < b[sortField]) return -1 * dir;
      if (a[sortField] > b[sortField]) return 1 * dir;
      return 0;
    });
    return result;
  }, [users, searchTerm, selectedCity, selectedRole, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handleSort = (field: keyof User) => {
    if (sortField === field) {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <section className="dashboard">
      <h2>Panel de Usuarios</h2>
      {/* filtros, tabla y paginación — todo en un solo componente */}
    </section>
  );
}
