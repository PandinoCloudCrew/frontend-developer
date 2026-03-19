// src/api/products.ts — fetching con cache via TanStack Query
import { useQuery } from '@tanstack/react-query';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
}

async function fetchProducts(): Promise<Product[]> {
  const res = await fetch('https://fakestoreapi.com/products');
  if (!res.ok) throw new Error('Error al cargar productos');
  return res.json();
}

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: Infinity, // cache: no re-fetch mientras la app esté abierta
  });
}
