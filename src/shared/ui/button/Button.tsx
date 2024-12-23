import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  PropsWithChildren,
} from 'react';

type ReactButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type ButtonProps = ReactButtonProps & {}

const Button: FC<PropsWithChildren<ButtonProps>> = ({ className: _className, name, disabled, ...buttonProps }) => {
  const className = [
    'btn btn-primary',
    disabled ? 'dark:bg-gray-500 dark:text-gray-300' : '',
    _className
  ].join(' ');

  return (
    <button {...buttonProps} disabled={disabled} className={className}>
      {name}
    </button>
  );
};

export default Button;