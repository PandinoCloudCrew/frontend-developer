interface StatusProps {
  status: 'loading' | 'error' | 'success';
  data?: string[];
  errorMessage?: string;
}

function StatusDisplay({ status, data, errorMessage }: StatusProps) {
  // Ternario para if/else
  if (status === 'loading') {
    return <p>Cargando...</p>;
  }

  if (status === 'error') {
    return <p className="error">{errorMessage}</p>;
  }

  // && para condicionales simples
  return (
    <div>
      {data && data.length > 0 && (
        <ul>
          {data.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      )}
      {data?.length === 0 && <p>Sin resultados</p>}
    </div>
  );
}
