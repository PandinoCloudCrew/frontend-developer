// src/features/cart/presentation/CartSummary.tsx
// Capa de presentacion — solo UI, delega logica al dominio
import { useEffect, useState } from 'react';
import { loadCart } from '../infrastructure/cart-api.repository';
import { calculateSubtotal, calculateTotal, type Cart } from '../domain/cart';

export default function CartSummary() {
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    loadCart().then(setCart);
  }, []);

  if (!cart) return null;

  return (
    <div>
      <p>Subtotal: ${calculateSubtotal(cart).toFixed(2)}</p>
      <p>Total: ${calculateTotal(cart).toFixed(2)}</p>
    </div>
  );
}
