import React, { FC, useEffect, useState } from 'react';
import { ENV } from '@/shared/config/env.ts';
import UserAvatar from '@/shared/ui/avatar/UserAvatar.tsx';
import DeleteModal from '@/shared/ui/modal/DeleteModal.tsx';
import Button from '@/shared/ui/button/Button.tsx';
import TextArea from '@/shared/ui/input/TextArea.tsx';
import MultiLineText from '@/shared/ui/text/MultiLineText.tsx';
import {
  BoardComment,
  BoardCommentDeleteRequest,
  BoardCommentModifyRequest,
} from '@/entities/board/types.ts';

interface BoardCommentCardProps {
  comment: BoardComment;
  userId: number;
  boardId: number;
  handleModifyComment: (boardCommentModifyRequest: BoardCommentModifyRequest) => void;
  handleDeleteComment: (boardCommentDeleteRequest: BoardCommentDeleteRequest) => void;
}

const BoardCommentCard: FC<BoardCommentCardProps> = ({
                                                       comment,
                                                       userId,
                                                       boardId,
                                                       handleModifyComment: _handleModifyComment,
                                                       handleDeleteComment: _handleDeleteComment,
                                                     }) => {
  const [modifyBtnClicked, setModifyBtnClicked] = useState<boolean>(false);
  const [modifyComment, setModifyComment] = useState(comment.content);
  const { content, createdAt, writerId, writerNickname, writerProfileImg, commentId } = comment;

  useEffect(() => {
    setModifyComment(comment.content);
    setModifyBtnClicked(false);
  }, [comment]);

  const handleModifyComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setModifyBtnClicked(false);
    _handleModifyComment({ commentId, boardId, comment: modifyComment });
  };

  const modalId = `delete-comment-modal-${boardId}-${commentId}`;

  const handleModalOpen = () => {
    const modalElement = document.getElementById(modalId) as HTMLElement & { showModal: () => void };
    if (modalElement && modalElement.showModal) {
      modalElement.showModal();
    }
  };

  return (
    <div className="w-full border-1 rounded-xl p-3 shadow-uniform dark:border-dk-default">
      <DeleteModal
        modalId={modalId}
        modalTitle="정말로 삭제하시겠습니까?"
        modalText="삭제한 댓글은 복구할 수 없습니다."
        onDelete={() => _handleDeleteComment({ commentId, boardId })}
      />

      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row gap-2 items-center">
            <UserAvatar src={`${ENV.STORAGE_URL}/${writerProfileImg}`} size="32px" />
            <p className="font-bold">{writerNickname}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">{createdAt}</p>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between">
          <div className="w-[400px] min-h-fit">
            {modifyBtnClicked ?
              (
                <TextArea
                  className="w-full"
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setModifyComment(e.target.value)}
                  value={modifyComment} />
              ) : (
                <MultiLineText>{content}</MultiLineText>
              )}
          </div>
          {userId === writerId && (
            <div className="flex flex-row gap-1">
              {modifyBtnClicked ? (
                <>
                  <Button
                    className="btn-sm"
                    name="완료"
                    onClick={handleModifyComment}
                  />
                  <Button
                    className="btn-sm btn-ghost"
                    name="취소"
                    onClick={() => {
                      setModifyBtnClicked(false);
                      setModifyComment(comment.content);
                    }}
                  />
                </>
              ) : (
                <>
                  <Button
                    className="btn-sm"
                    name="수정"
                    onClick={() => setModifyBtnClicked(true)}
                  />
                  <Button
                    className="btn-sm btn-ghost"
                    name="삭제"
                    onClick={handleModalOpen}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardCommentCard;