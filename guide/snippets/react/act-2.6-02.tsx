// src/components/UserDashboard.tsx — simplificado con custom hook
import { useUsers } from '../hooks/useUsers';
import { useUserFilter } from '../hooks/useUserFilter';
import UserFilters from './UserFilters';
import UserTable from './UserTable';
import Pagination from './Pagination';

export default function UserDashboard() {
  const { users } = useUsers();
  const filter = useUserFilter(users);

  return (
    <section className="dashboard">
      <h2>Panel de Usuarios</h2>
      <UserFilters
        cities={filter.cities}
        onSearchChange={filter.search}
        onCityChange={filter.filterByCity}
        onRoleChange={filter.filterByRole}
      />
      <UserTable users={filter.paginatedUsers} onSort={filter.sort} />
      <Pagination
        currentPage={filter.currentPage}
        totalPages={filter.totalPages}
        onPageChange={filter.goToPage}
      />
      <p>
        Mostrando {filter.paginatedUsers.length} de{' '}
        {filter.filteredUsers.length} usuarios (pagina {filter.currentPage}{' '}
        de {filter.totalPages})
      </p>
    </section>
  );
}
