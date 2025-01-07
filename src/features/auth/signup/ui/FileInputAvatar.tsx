import React, { FC, useState } from 'react';
import Avatar, { AvatarProps } from '@/shared/ui/avatar/Avatar';
import Input from '@/shared/ui/input/Input.tsx';
import { validateProfileImg } from '@/shared/utils/validator.ts';

type FileInputAvatar = AvatarProps & {
  onImageChange: (file: File | null) => void;
  className?: string;
};

const FileInputAvatar: FC<FileInputAvatar> = ({ onImageChange, className: _className, ...props }) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (file && validateProfileImg(file)) {
      const objectURL = URL.createObjectURL(file);
      setImageUrl(objectURL);
      onImageChange(file);
    } else {
      alert('유효하지 않은 파일입니다.');
      onImageChange(null);
    }
  };

  return (
    <div className={_className}>
      <Avatar
        size="10rem"
        src={imageUrl}
        className="hover:opacity-75 dark:bg-gray-700"
        style={{
          ...props.style,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          cursor: 'pointer',
        }}
        onClick={() => document.getElementById('file-input')?.click()}
      />
      <Input
        id="file-input"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileInputAvatar;
