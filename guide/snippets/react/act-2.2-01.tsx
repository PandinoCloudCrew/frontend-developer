// src/components/Button.tsx
interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  label,
  variant = 'primary',
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={() => !disabled && onClick?.()}
    >
      {label}
    </button>
  );
}
