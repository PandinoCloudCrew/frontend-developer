// src/hooks/useUsers.ts — hook que reemplaza al servicio de datos
import { useState } from 'react';

export interface User {
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

export function useUsers() {
  const [users] = useState<User[]>(initialUsers);
  return { users };
}
