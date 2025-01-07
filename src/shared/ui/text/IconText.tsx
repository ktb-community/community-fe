import { FC, ReactNode } from 'react';

interface IconTextProps {
  Icon: ReactNode;
  value: string | number;
}

const IconText: FC<IconTextProps> = ({ Icon, value }) => {
  return (
    <div className="flex flex-row items-center justify-center gap-1">
      <span>{Icon}</span>
      <span>{value}</span>
    </div>
  )
}

export default IconText;