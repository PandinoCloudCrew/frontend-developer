function Example() {
  const user = { name: 'Ana', age: 28 };

  return (
    <div>
      {/* Expresiones */}
      <p>Nombre: {user.name}</p>
      <p>Edad: {user.age} años</p>
      <p>Mayor de edad: {user.age >= 18 ? 'Sí' : 'No'}</p>

      {/* Atributos dinámicos */}
      <img src={`/avatars/${user.name.toLowerCase()}.jpg`} alt={user.name} />

      {/* Estilos inline (objeto, no string) */}
      <span style={{ color: 'green', fontWeight: 'bold' }}>Activo</span>
    </div>
  );
}
