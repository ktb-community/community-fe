import {
  BoardComment,
  BoardCommentDeleteRequest,
  BoardCommentModifyRequest,
} from '@/entities/board/types.ts';
import React, { FC, useEffect, useRef, useState } from 'react';
import UserAvatar from '@/shared/ui/avatar/UserAvatar.tsx';
import { ENV } from '@/shared/config/env.ts';
import Button from '@/shared/ui/button/Button.tsx';
import DeleteModal from '@/shared/ui/modal/DeleteModal.tsx';

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
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [modifyBtnClicked, setModifyBtnClicked] = useState<boolean>(false);
  const [modifyComment, setModifyComment] = useState(comment.content);
  const { content, createdAt, writerId, writerNickname, writerProfileImg, commentId } = comment;

  useEffect(() => {
    if (modifyBtnClicked && textAreaRef && textAreaRef.current) {
      const target = textAreaRef.current;
      target.style.height = `auto`;
      target.style.height = `${target.scrollHeight}px`;
    }
  }, [modifyBtnClicked, textAreaRef]);

  useEffect(() => {
    setModifyComment(comment.content);
    setModifyBtnClicked(false);
  }, [comment]);

  const handleModifyComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setModifyBtnClicked(false);
    _handleModifyComment({ commentId, userId, boardId, comment: modifyComment });
  };

  const modalId = `delete-comment-modal-${boardId}-${commentId}`;

  const handleModalOpen = () => {
    const modalElement = document.getElementById(modalId) as HTMLElement & { showModal: () => void };
    if (modalElement && modalElement.showModal) {
      modalElement.showModal();
    }
  };

  return (
    <div className="w-full border-2 rounded-lg p-3">
      <DeleteModal
        modalId={modalId}
        modalTitle="정말로 삭제하시겠습니까?"
        modalText="삭제한 댓글은 복구할 수 없습니다."
        onDelete={() => _handleDeleteComment({ commentId, userId, boardId })}
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
                <textarea
                  ref={textAreaRef}
                  className="textarea textarea-bordered w-full resize-none overflow-y-hidden"
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setModifyComment(e.target.value)}
                  value={modifyComment} />
              ) : (
                <p>{content}</p>
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