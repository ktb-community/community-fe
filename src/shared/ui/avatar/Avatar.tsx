import { FC } from 'react';
import Div, { DivProps } from '@/shared/ui/box/Div.tsx';

export type AvatarProps = DivProps & {
  size?: string
}

const Avatar: FC<AvatarProps> = ({ className: _className, style: _style, src, size, ...props }) => {
  const w_or_h = size ?? '6rem';
  const className = ['rounded-full bg-cover bg-gray-300', _className].join(' ');

  return (
    <Div
      {...props}
      src={src}
      width={w_or_h}
      height={w_or_h}
      className={className}
      style={_style}
    />
  );
};

export default Avatar;