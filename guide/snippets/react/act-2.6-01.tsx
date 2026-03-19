// src/hooks/useUserFilter.ts — hook que reemplaza al servicio de filtrado
import { useState, useMemo, useCallback } from 'react';
import { User } from './useUsers';

export function useUserFilter(allUsers: User[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [sortField, setSortField] = useState<keyof User>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(3);

  const cities = useMemo(
    () => [...new Set(allUsers.map((u) => u.city))].sort(),
    [allUsers],
  );

  const filteredUsers = useMemo(() => {
    let result = [...allUsers];
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
  }, [allUsers, searchTerm, selectedCity, selectedRole, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const search = useCallback((term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  }, []);

  const filterByCity = useCallback((city: string) => {
    setSelectedCity(city);
    setCurrentPage(1);
  }, []);

  const filterByRole = useCallback((role: string) => {
    setSelectedRole(role);
    setCurrentPage(1);
  }, []);

  const sort = useCallback((field: keyof User) => {
    setSortField((prev) => {
      if (prev === field) {
        setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
        return prev;
      }
      setSortDirection('asc');
      return field;
    });
  }, []);

  const reset = useCallback(() => {
    setSearchTerm('');
    setSelectedCity('');
    setSelectedRole('');
    setSortField('name');
    setSortDirection('asc');
    setCurrentPage(1);
  }, []);

  return {
    cities,
    filteredUsers,
    paginatedUsers,
    currentPage,
    totalPages,
    search,
    filterByCity,
    filterByRole,
    sort,
    goToPage: setCurrentPage,
    reset,
  };
}
