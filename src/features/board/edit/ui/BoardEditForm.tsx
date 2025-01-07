import React, { FC, useEffect, useRef, useState } from 'react';
import { BoardDetailResponse } from '@/entities/board/types.ts';
import { getBlobBoardImg } from '@/entities/board/api.ts';
import Input from '@/shared/ui/input/Input.tsx';
import { PLACEHOLDER } from '@/shared/constants/helperText.ts';
import HelperText from '@/shared/ui/text/HelperText.tsx';
import { handleBoardTitleHelperText } from '@/shared/utils/helper.ts';
import TextArea from '@/shared/ui/input/TextArea.tsx';
import Button from '@/shared/ui/button/Button.tsx';
import { ENV } from '@/shared/config/env.ts';

interface BoardEditFormProps {
  userId: number;
  boardDetail: BoardDetailResponse;
  onSubmit: (formData: FormData) => void;
}

const BoardEditForm: FC<BoardEditFormProps> = ({ userId, boardDetail, onSubmit }) => {
  const {
    title,
    content,
    boardImg,
  } = boardDetail;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [boardTitle, setBoardTitle] = useState(title);
  const [boardContent, setBoardContent] = useState(content);
  const [imgPreviewUrl, setImgPreviewUrl] = useState(`${ENV.STORAGE_URL}/${boardImg}`);
  const [selectedBoardImg, setSelectedBoardImg] = useState<File | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  useEffect(() => {
    getBlobBoardImg(boardImg)
      .then(blob => new File([blob], boardImg, { type: blob.type }))
      .then(file => setSelectedBoardImg(file));
  }, [boardImg]);

  useEffect(() => {
    return () => {
      if (imgPreviewUrl) {
        URL.revokeObjectURL(imgPreviewUrl);
      }
    };
  }, [imgPreviewUrl]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDragDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedBoardImg(file);
        setImgPreviewUrl(URL.createObjectURL(file));
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;

    if (files) {
      const file = files[0];
      setSelectedBoardImg(file);
      setImgPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleFileInputBoxClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleModifyBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('userId', userId.toString());
    formData.append('title', boardTitle);
    formData.append('content', boardContent);
    if (selectedBoardImg) formData.append('boardImg', selectedBoardImg);
    onSubmit(formData);
  };

  const dragContainerClassName = [
    `h-fit border-2 hover:border-blue-500 w-full p-6`,
    isDragActive ? 'border-blue-500 text-blue-500' : 'border-gray-300 text-gray-500',
    `border-dashed rounded-lg flex flex-col justify-center items-center p-4 text-center cursor-pointer transition duration-200`,
  ].join(' ');

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-bold">게시글 제목</p>
        <Input
          type="text"
          value={boardTitle}
          placeholder={PLACEHOLDER.BOARD_TITLE}
          className="input input-sm input-bordered w-full"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBoardTitle(e.target.value)}
        />
        <HelperText text={handleBoardTitleHelperText(boardTitle)} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-bold">게시글 본문</p>
        <TextArea
          value={boardContent}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBoardContent(e.target.value)}
          className="w-full min-h-[360px] overflow-y-scroll"
        />
      </div>

      <div className="flex flex-col gap-2 mt-2">
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
            <p className="break-words text-sm w-full">{selectedBoardImg?.name}</p>
            {boardImg && (
              <div>
                <img src={imgPreviewUrl} className="w-fit h-fit max-h-[120px] mt-3" />
              </div>
            )}
          </div>
        </div>
      </div>

      <Button
        onClick={handleModifyBtnClick}
        name="수정"
        className="m-auto w-[120px] mt-10"
        disabled={boardTitle.length > 26 || boardContent.trim() === '' || boardImg === null}
      />
    </div>
  );
};

export default BoardEditForm;