interface ProductCardProps {
  name: string;
  price: number;
  onSale?: boolean; // opcional con ?
}

function ProductCard({ name, price, onSale = false }: ProductCardProps) {
  return (
    <article>
      <h3>{name}</h3>
      <p>${price.toFixed(2)}</p>
      {onSale && <span className="badge">En oferta</span>}
    </article>
  );
}
