// src/api/products.ts — función de fetching (reemplaza al service)
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
}

const API_URL = 'https://fakestoreapi.com/products';

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al cargar productos');
  return res.json();
}
