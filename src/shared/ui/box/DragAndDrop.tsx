import React, { FC, useEffect, useRef, useState } from 'react';
import useDragAndDrop from '@/shared/hooks/useDragAndDrop.ts';
import { ENV } from '@/shared/config/env.ts';
import { getBlobBoardImg } from '@/entities/board/api.ts';
import { MEDIA_TYPE } from '@/shared/constants/const.ts';

interface DragAndDropProps {
  boardImg?: string | undefined;
  contentType: 'VIDEO' | 'IMAGE';
  selectedBoardImgName: string | undefined;
  setSelectedBoardImg: (file: File | null) => void;
}

const DragAndDrop: FC<DragAndDropProps> = ({ boardImg, contentType, selectedBoardImgName, setSelectedBoardImg }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imgPreviewUrl, setImgPreviewUrl] = useState(boardImg ? `${ENV.STORAGE_URL}/${boardImg}` : null);
  const [mediaType, setMediaType] = useState<string>(contentType);

  useEffect(() => {
    if (boardImg) {
      getBlobBoardImg(boardImg)
        .then(blob => new File([blob], boardImg, { type: blob.type }))
        .then(file => setSelectedBoardImg(file));
    }
  }, [boardImg]);

  useEffect(() => {
    return () => {
      if (imgPreviewUrl) {
        URL.revokeObjectURL(imgPreviewUrl);
      }
    };
  }, [imgPreviewUrl]);

  const handleSetFilePreview = (file: File | null) => {
    setSelectedBoardImg(file);
    setMediaType(file && file.type?.startsWith('video') ? MEDIA_TYPE.VIDEO : MEDIA_TYPE.IMAGE);
    setImgPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      handleSetFilePreview(file);
      setMediaType(file.type?.startsWith('video') ? MEDIA_TYPE.VIDEO : MEDIA_TYPE.IMAGE);
    } else {
      handleSetFilePreview(null);
    }
  };

  const handleFileInputBoxClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const { isDragActive, handleDragOver, handleDragDrop, handleDragLeave } = useDragAndDrop(handleSetFilePreview);

  const dragContainerClassName = [
    `h-fit border-2 hover:border-blue-500 w-full p-6`,
    isDragActive ? 'border-blue-500 text-blue-500' : 'border-gray-300 text-gray-500',
    `border-dashed rounded-lg flex flex-col justify-center items-center p-4 text-center cursor-pointer transition duration-200`,
  ].join(' ');

  return (
    <>
      <p className="text-sm font-bold">이미지 첨부</p>
      <div>
        <input ref={fileInputRef} type="file" accept="image/*, video/*" onChange={handleFileInput} className="hidden" />
        <div
          className={dragContainerClassName}
          onClick={handleFileInputBoxClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDragDrop}
        >
          <p>파일을 선택하거나 이곳에 드래그하세요.</p>
          <p className="break-words text-sm w-full">{selectedBoardImgName}</p>
          {imgPreviewUrl && (
            <div className="mt-3">
              {mediaType === MEDIA_TYPE.IMAGE
                ? <img src={imgPreviewUrl} className="h-[120px]" />
                : <video src={imgPreviewUrl} autoPlay={true} muted className="w-full h-[120px]" />
              }
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DragAndDrop;