<List
  items={products}
  renderItem={product => (
    <span>{product.name} --- ${product.price}</span>
  )}
/>
