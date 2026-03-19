import { useMemo } from 'react';

function CartSummary({ items }: { items: CartItem[] }) {
  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items] // solo recalcula cuando items cambia
  );

  return <p>Total: ${total.toFixed(2)}</p>;
}
