// src/components/ProductCard.tsx
import Button from './Button';

interface ProductCardProps {
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  onAddToCart?: (name: string) => void;
}

export default function ProductCard({
  name,
  price,
  description = '',
  imageUrl = '',
  onAddToCart,
}: ProductCardProps) {
  return (
    <article className="product-card">
      {imageUrl && (
        <img src={imageUrl} alt={name} className="product-image" />
      )}
      <div className="product-body">
        <h3>{name}</h3>
        <p className="price">
          {price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </p>
        {description && <p className="description">{description}</p>}
        <Button
          label="Agregar al carrito"
          onClick={() => onAddToCart?.(name)}
        />
      </div>
    </article>
  );
}
