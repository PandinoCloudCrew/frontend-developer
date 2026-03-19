// src/design-system/components/DsButton.tsx — Componente con design tokens
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './ds-button.css';

interface DsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: ReactNode;
}

export function DsButton({
  variant = 'primary',
  children,
  ...rest
}: DsButtonProps) {
  return (
    <button className={`ds-button ds-button--${variant}`} {...rest}>
      {children}
    </button>
  );
}

// Uso:
// <DsButton variant="primary" onClick={addToCart}>
//   Agregar al carrito
// </DsButton>
