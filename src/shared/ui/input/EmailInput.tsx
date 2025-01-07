import React, { forwardRef } from 'react';
import Input from '@/shared/ui/input/Input.tsx';
import HelperText from '@/shared/ui/text/HelperText.tsx';

interface EmailInputProps {
  id: string
  label: string;
  helperText: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>((props, ref) => {
  const { id, label, name, value, placeholder, helperText, onChange, ...rest } = props;

  return (
    <div {...rest} className="flex flex-col gap-1">
      <p className="font-bold dark:text-dk-text">{label}</p>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70 dark:text-dk-text">
          <path
            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
          <path
            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
        </svg>
        <Input
          id={id}
          ref={ref}
          autoComplete="email"
          type="text"
          name={name}
          className="grow"
          placeholder={placeholder}
          value={value}
          onChange={onChange} />
      </label>
      <HelperText text={helperText} />
    </div>
  );
});

export default EmailInput;