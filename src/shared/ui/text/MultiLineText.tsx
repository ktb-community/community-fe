import { FC } from 'react';

interface MultiLineTextProps {
  children: string;
}

const MultiLineText: FC<MultiLineTextProps> = ({ children }) => {
  return (
    <p className="break-words whitespace-pre-line leading-7">{children}</p>
  )
}

export default MultiLineText;