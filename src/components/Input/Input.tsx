import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | null;
  reactHookFormProps?: Record<string, unknown>;
  className?: string;
  inputClassName?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  inputClassName,
  reactHookFormProps,
  ...rest
}) => {
  return (
    <label>
      {label}
      <input
        {...rest}
        {...reactHookFormProps}
        autoComplete="off"
      />
    </label>
  );
};

export default Input;
