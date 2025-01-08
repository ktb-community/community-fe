import React, { FC, useEffect, useRef, useState } from 'react';
import useDragAndDrop from '@/shared/hooks/useDragAndDrop.ts';
import { ENV } from '@/shared/config/env.ts';
import { getBlobBoardImg } from '@/entities/board/api.ts';

interface DragAndDropProps {
  boardImg?: string | undefined;
  selectedBoardImgName: string | undefined;
  setSelectedBoardImg: (file: File) => void;
}

const DragAndDrop: FC<DragAndDropProps> = ({ boardImg, selectedBoardImgName, setSelectedBoardImg }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imgPreviewUrl, setImgPreviewUrl] = useState(boardImg ? `${ENV.STORAGE_URL}/${boardImg}` : null);

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

  const handleSetFilePreview = (file: File) => {
    setSelectedBoardImg(file);
    setImgPreviewUrl(URL.createObjectURL(file));
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;

    if (files) {
      const file = files[0];
      handleSetFilePreview(file);
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
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className="hidden" />
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
            <div>
              <img src={imgPreviewUrl} className="w-fit h-fit max-h-[120px] mt-3" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DragAndDrop;