type InputProps = {
  name: string;
  type: string;
  label: string;
  className?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function Input({ name, type, label, className, value, onChange }: InputProps) {
  return (
    <label>
      <span>{label}</span>
      <input
        name={name}
        type={type}
        className={className}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

export default Input;
