import { FC } from 'react';

interface UserAvatarProps {
  src: string;
  size: string;
}

const UserAvatar: FC<UserAvatarProps> = ({ src, size }) => {
  const w_or_h = size ?? '12rem';

  return (
    <div
      style={{
        width: w_or_h,
        height: w_or_h,
      }}
      className="avatar">
      <div
        className="rounded-full">
        <img src={src} />
      </div>
    </div>
  );
};

export default UserAvatar;