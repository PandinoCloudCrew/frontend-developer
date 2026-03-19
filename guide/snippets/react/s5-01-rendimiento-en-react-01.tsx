import { memo } from 'react';

interface ProductCardProps {
  name: string;
  price: number;
  onAddToCart: () => void;
}

const ProductCard = memo(function ProductCard({ name, price, onAddToCart }: ProductCardProps) {
  return (
    <article>
      <h3>{name}</h3>
      <p>${price.toFixed(2)}</p>
      <button onClick={onAddToCart}>Agregar al carrito</button>
    </article>
  );
});
