import { FC } from 'react';
import { BoardDeleteRequest, BoardDetailResponse } from '@/entities/board/types.ts';
import { PiEyesBold } from 'react-icons/pi';
import { BiLike } from 'react-icons/bi';
import { AiOutlineComment } from 'react-icons/ai';
import UserAvatar from '@/shared/ui/avatar/UserAvatar.tsx';
import { ENV } from '@/shared/config/env.ts';
import { useAuthStore } from '@/entities/auth/model.ts';
import Button from '@/shared/ui/button/Button.tsx';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '@/shared/ui/modal/DeleteModal.tsx';

interface BoardDetailFormProps {
  boardDetail: BoardDetailResponse,
  handleBoardDelete: (boardDeleteRequest: BoardDeleteRequest) => void
}

const BoardDetailForm: FC<BoardDetailFormProps> = ({ boardDetail, handleBoardDelete: _handleBoardDelete }) => {
  const user = useAuthStore(state => state.user);
  const navigate = useNavigate();

  const {
    boardId,
    boardImg,
    title,
    content,
    createdAt,
    writerId,
    writerNickname,
    writerProfileImg,
    viewCnt,
    commentCnt,
    likeCnt,
  } = boardDetail;

  const modalId = `delete-board-${boardId}`;

  const handleModalOpen = () => {
    const modalElement = document.getElementById(modalId) as HTMLElement & { showModal: () => void };
    if (modalElement && modalElement.showModal) {
      modalElement.showModal();
    }
  };

  const handleBoardDelete = () => {
    const params = { userId: user!!.id, boardId: boardId };
    _handleBoardDelete(params);
  };

  return (
    <div>
      <DeleteModal
        modalId={modalId}
        modalTitle="정말로 삭제하시겠습니까?"
        modalText="삭제한 게시글은 다시 복구할 수 없습니다."
        onDelete={handleBoardDelete}
      />
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between items-center">
          <div>
            <h1 className="font-bold text-2xl">{title}</h1>
          </div>
          <div>
            {user?.id === parseInt(writerId) && (
              <div className="flex flex-row gap-2">
                <Button name="수정" className="btn-sm" onClick={() => navigate(`/boards/${boardId}/edit`)} />
                <Button
                  name="삭제"
                  className="btn-sm bg-gray-700 border-none hover:bg-gray-400 text-white"
                  onClick={handleModalOpen}
                />
              </div>
            )}
          </div>
        </div>

        <div className="text-[14px] flex flex-row gap-3 text-gray-400">
          <div className="flex flex-row items-center justify-center gap-1">
            <span><PiEyesBold /></span>
            <span>{viewCnt}</span>
          </div>
          <div className="flex flex-row items-center justify-center gap-1">
            <span><BiLike /></span>
            <span>{likeCnt}</span>
          </div>
          <div className="flex flex-row items-center justify-center gap-1">
            <span><AiOutlineComment /></span>
            <span>{commentCnt}</span>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center my-2">
          <div className="flex flex-row gap-2 items-center">
            <UserAvatar src={`${ENV.STORAGE_URL}/${writerProfileImg}`} size={'36px'} />
            <p className="font-semibold">{writerNickname}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">{createdAt}</p>
          </div>
        </div>
      </div>

      <hr className="mt-3" />

      <div className="flex flex-col justify-center gap-3">
        <div>
          <img src={`${ENV.STORAGE_URL}/${boardImg}`} className="w-max" />
        </div>
        <div>
          {content}
        </div>
      </div>
    </div>
  );
};

export default BoardDetailForm;