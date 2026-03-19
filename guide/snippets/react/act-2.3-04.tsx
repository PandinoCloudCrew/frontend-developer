// src/components/UserTable.tsx
import { User } from '../hooks/useUsers';

interface UserTableProps {
  users: User[];
  onSort: (field: keyof User) => void;
}

export default function UserTable({ users, onSort }: UserTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => onSort('name')}>Nombre</th>
          <th onClick={() => onSort('email')}>Email</th>
          <th onClick={() => onSort('city')}>Ciudad</th>
          <th onClick={() => onSort('role')}>Rol</th>
          <th onClick={() => onSort('salary')}>Salario</th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 ? (
          <tr>
            <td colSpan={5}>No se encontraron usuarios</td>
          </tr>
        ) : (
          users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.city}</td>
              <td>{user.role}</td>
              <td>
                {user.salary.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
