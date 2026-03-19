import { forwardRef } from 'react';

interface InputProps {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, error, ...rest }, ref) {
    return (
      <div>
        <label>{label}</label>
        <input ref={ref} {...rest} />
        {error && <span className="error">{error}</span>}
      </div>
    );
  }
);
