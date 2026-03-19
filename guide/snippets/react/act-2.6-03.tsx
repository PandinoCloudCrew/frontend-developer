// src/components/TextInput.tsx — componente controlled
interface TextInputProps {
  inputId: string;
  label: string;
  value: string;
  onValueChange: (value: string) => void;
}

export default function TextInput({
  inputId,
  label,
  value,
  onValueChange,
}: TextInputProps) {
  return (
    <>
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        type="text"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
      />
    </>
  );
}
