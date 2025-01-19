import React, { FC, useState } from 'react';
import Input from '@/shared/ui/input/Input.tsx';
import HelperText from '@/shared/ui/text/HelperText.tsx';
import TextArea from '@/shared/ui/input/TextArea.tsx';
import Button from '@/shared/ui/button/Button.tsx';
import { PLACEHOLDER } from '@/shared/constants/helperText.ts';
import { handleBoardTitleHelperText } from '@/shared/utils/helper.ts';
import { BoardDetailResponse } from '@/entities/board/types.ts';
import DragAndDrop from '@/shared/ui/box/DragAndDrop.tsx';

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
    contentType
  } = boardDetail;

  const [boardTitle, setBoardTitle] = useState(title);
  const [boardContent, setBoardContent] = useState(content);
  const [selectedBoardImg, setSelectedBoardImg] = useState<File | null>(null);

  const handleModifyBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('userId', userId.toString());
    formData.append('title', boardTitle);
    formData.append('content', boardContent);
    if (selectedBoardImg) formData.append('boardImg', selectedBoardImg);
    onSubmit(formData);
  };

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
        <DragAndDrop
          boardImg={boardImg}
          contentType={contentType}
          selectedBoardImgName={selectedBoardImg?.name}
          setSelectedBoardImg={setSelectedBoardImg}
        />
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