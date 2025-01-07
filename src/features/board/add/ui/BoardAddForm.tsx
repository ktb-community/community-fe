import React, { FC, useEffect, useState } from 'react';
import { BoardAddRequest } from '@/entities/board/types.ts';
import Input from '@/shared/ui/input/Input.tsx';
import HelperText from '@/shared/ui/text/HelperText.tsx';
import TextArea from '@/shared/ui/input/TextArea.tsx';
import Button from '@/shared/ui/button/Button.tsx';
import { PLACEHOLDER } from '@/shared/constants/helperText.ts';
import { handleBoardTitleHelperText } from '@/shared/utils/helper.ts';

interface BoardAddFormProps {
  userId: number;
  onSubmit: (boardAddRequest: BoardAddRequest) => void;
}

const BoardAddForm: FC<BoardAddFormProps> = ({ userId, onSubmit }) => {
  const [boardTitle, setBoardTitle] = useState<string>('');
  const [boardContent, setBoardContent] = useState<string>('');
  const [imgObjectUrl, setImgObjectUrl] = useState<string | null>(null);
  const [boardImg, setBoardImg] = useState<File | null>(null);

  const handleAddBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (boardImg) {
      onSubmit({ userId, title: boardTitle, content: boardContent, file: boardImg });
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setBoardImg(file);
      setImgObjectUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    return () => {
      if (imgObjectUrl) {
        URL.revokeObjectURL(imgObjectUrl);
      }
    };
  }, [imgObjectUrl]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-bold">게시글 제목</p>
        <Input type="text"
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

      {imgObjectUrl && (
        <div>
          <img src={imgObjectUrl} className="w-[120px] h-[120px] mt-3" />
        </div>
      )}

      <div className="flex flex-col gap-2 mt-2">
        <p className="text-sm font-bold">이미지 첨부</p>
        <input type="file" accept="image/*" onChange={handleFileInput} />
      </div>

      <Button
        onClick={handleAddBtnClick}
        name="등록"
        className="m-auto w-[120px] mt-10"
        disabled={boardTitle.length > 26 || boardContent.trim() === '' || boardImg === null}
      />
    </div>
  );
};

export default BoardAddForm;