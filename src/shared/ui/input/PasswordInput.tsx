import React, { forwardRef } from 'react';
import Input from '@/shared/ui/input/Input.tsx';
import HelperText from '@/shared/ui/text/HelperText.tsx';

interface PasswordInputProps {
  id?: string;
  label: string;
  helperText: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
  const { id, label, helperText, onChange, value, placeholder, name} = props

  return (
    <div className="flex flex-col gap-1">
      <p className="font-bold dark:text-dk-text">{label}</p>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70 dark:text-white">
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd" />
        </svg>
        <Input
          id={id}
          ref={ref}
          autoComplete="new-password"
          type="password"
          name={name}
          className="grow"
          placeholder={placeholder}
          value={value}
          onChange={onChange} />
      </label>
      <HelperText text={helperText}/>
    </div>
  );
});

export default PasswordInput;