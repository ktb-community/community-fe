import React, { FC, useEffect, useState } from 'react';
import Avatar, { AvatarProps } from '@/shared/ui/avatar/Avatar';
import Input from '@/shared/ui/input/Input.tsx';
import { validateProfileImg } from '@/shared/utils/validator.ts';
import { ENV } from '@/shared/config/env.ts';
import { useAlertStore } from '@/shared/model/alertStore.ts';

type FileInputAvatar = AvatarProps & {
  onImageChange: (file: File | null) => void;
  className?: string;
  defaultImageUrl?: string;
};

const FileInputAvatar: FC<FileInputAvatar> = ({ defaultImageUrl, onImageChange, className: _className, ...props }) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(defaultImageUrl ? `${ENV.STORAGE_URL}/${defaultImageUrl}` : '');
  const { showAlert } = useAlertStore();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (file && validateProfileImg(file)) {
      setImageUrl(URL.createObjectURL(file));
      onImageChange(file);
    } else {
      showAlert('유효하지 않은 파일입니다.', 'warning');
      onImageChange(null);
    }
  };

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

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
