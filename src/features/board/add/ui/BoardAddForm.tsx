import React, { FC, useState } from 'react';
import { BoardAddRequest } from '@/entities/board/types.ts';
import Input from '@/shared/ui/input/Input.tsx';
import HelperText from '@/shared/ui/text/HelperText.tsx';
import TextArea from '@/shared/ui/input/TextArea.tsx';
import Button from '@/shared/ui/button/Button.tsx';
import { PLACEHOLDER } from '@/shared/constants/helperText.ts';
import { handleBoardTitleHelperText } from '@/shared/utils/helper.ts';
import DragAndDrop from '@/shared/ui/box/DragAndDrop.tsx';
import { MEDIA_TYPE } from '@/shared/constants/const.ts';

interface BoardAddFormProps {
  userId: number;
  onSubmit: (boardAddRequest: BoardAddRequest) => void;
}

const BoardAddForm: FC<BoardAddFormProps> = ({ userId, onSubmit }) => {
  const [boardTitle, setBoardTitle] = useState<string>('');
  const [boardContent, setBoardContent] = useState<string>('');
  const [selectedBoardImg, setSelectedBoardImg] = useState<File | null>(null);

  const handleAddBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (selectedBoardImg) {
      onSubmit({ userId, title: boardTitle, content: boardContent, file: selectedBoardImg });
    }
  };

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

      <div className="flex flex-col gap-2 mt-2">
        <DragAndDrop
          selectedBoardImgName={selectedBoardImg?.name}
          contentType={selectedBoardImg?.type.startsWith('video') ? MEDIA_TYPE.VIDEO : MEDIA_TYPE.IMAGE}
          setSelectedBoardImg={setSelectedBoardImg}
        />
      </div>

      <Button
        onClick={handleAddBtnClick}
        name="등록"
        className="m-auto w-[120px] mt-10"
        disabled={boardTitle.length > 26 || boardContent.trim() === '' || selectedBoardImg === null}
      />
    </div>
  );
};

export default BoardAddForm;