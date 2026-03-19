// src/components/UserDashboard.tsx — refactorizado
import { useState, useMemo } from 'react';
import { useUsers, User } from '../hooks/useUsers';
import UserFilters from './UserFilters';
import UserTable from './UserTable';
import Pagination from './Pagination';

export default function UserDashboard() {
  const { users } = useUsers();
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

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  return (
    <section className="dashboard">
      <h2>Panel de Usuarios</h2>
      <UserFilters
        cities={cities}
        onSearchChange={handleSearch}
        onCityChange={(c) => { setSelectedCity(c); setCurrentPage(1); }}
        onRoleChange={(r) => { setSelectedRole(r); setCurrentPage(1); }}
      />
      <UserTable users={paginatedUsers} onSort={handleSort} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <p>
        Mostrando {paginatedUsers.length} de {filteredUsers.length} usuarios
        (pagina {currentPage} de {totalPages})
      </p>
    </section>
  );
}
