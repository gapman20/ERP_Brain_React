import { memo } from 'react';

export const SanitizedInput = memo(function SanitizedInput({
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  className,
  disabled,
  required,
  maxLength,
  ...props
}) {
  const handleChange = (e) => {
    const inputValue = e.target.value;
    onChange(inputValue, name);
  };

  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
      disabled={disabled}
      required={required}
      maxLength={maxLength}
      autoComplete="off"
      {...props}
    />
  );
});

export default SanitizedInput;
