interface ButtonProps {
  /** Contenido del botón */
  children: React.ReactNode;
  /** Variante visual */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** Tamaño */
  size?: 'sm' | 'md' | 'lg';
  /** Deshabilitado */
  disabled?: boolean;
  /** Handler de click */
  onClick?: () => void;
}

function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
