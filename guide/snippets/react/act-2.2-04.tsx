// src/App.tsx
import SearchBar from './components/SearchBar';
import ProductCard from './components/ProductCard';

export default function App() {
  const handleSearch = (query: string) => {
    console.log('Busqueda:', query);
  };

  const handleAddToCart = (productName: string) => {
    console.log('Agregado al carrito:', productName);
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Mi Tienda</h1>

      <SearchBar
        placeholder="Buscar productos..."
        onSearch={handleSearch}
      />

      <div
        style={{
          display: 'flex',
          gap: '1rem',
          marginTop: '2rem',
          flexWrap: 'wrap',
        }}
      >
        <ProductCard
          name="Teclado Mecanico"
          price={89.99}
          description="Teclado mecanico con switches Cherry MX Blue"
          onAddToCart={handleAddToCart}
        />
        <ProductCard
          name="Mouse Ergonomico"
          price={45.5}
          description="Mouse vertical para reducir fatiga en la muneca"
          onAddToCart={handleAddToCart}
        />
      </div>
    </main>
  );
}
