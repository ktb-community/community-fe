import React, { forwardRef } from 'react';
import Input from '@/shared/ui/input/Input.tsx';
import HelperText from '@/shared/ui/text/HelperText.tsx';

interface NicknameInputProps {
  id: string
  label: string;
  helperText: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NicknameInput = forwardRef<HTMLInputElement, NicknameInputProps>((props, ref) => {
  const { id, label, name, placeholder, value, helperText, onChange, ...rest } = props;

  return (
    <div {...rest} className="flex flex-col gap-1">
      <p className="font-bold dark:text-dk-text">{label}</p>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70 dark:text-white">
          <path
            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <Input
          id={id}
          ref={ref}
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

export default NicknameInput;