import { Board } from '@/entities/board/types.ts';
import { FC } from 'react';
import { ENV } from '@/shared/config/env.ts';
import { useNavigate } from 'react-router-dom';

interface BoardCardProps {
  board: Board;
}

const BoardCard: FC<BoardCardProps> = ({ board }) => {
  const { boardId, title, createdAt, likeCnt, viewCnt, commentCnt, writerProfileImg, writerNickname} = board;
  const navigate = useNavigate();

  return (
    <div
      className="
        w-[450px] h-fit border-2 rounded-3xl px-2 shadow-lg cursor-pointer
        hover:shadow-2xl hover:bg-base-200
      "
      onClick={() => navigate(`/boards/${boardId}`)}
    >
      <div className="p-4 flex flex-col justify-between">
        <div>
          <div className="text-gray-900 dark:text-gray-300 font-bold text-xl mb-2 line-clamp-1">{title}</div>
        </div>

        <div className="flex flex-row justify-between items-center">
          <div className="text-[12px] flex flex-row gap-2 items-center justify-center text-gray-400">
            <span>좋아요 {likeCnt}</span>
            <span>조회수 {viewCnt}</span>
            <span>댓글 {commentCnt}</span>
          </div>
          <div className="text-[12px] mt-[3px] text-gray-400 dark:text-gray-400">
            <span>{createdAt}</span>
          </div>
        </div>

        <hr className="my-3 border-2" />

        <div className="flex items-center">
          <img className="w-10 h-10 rounded-full mr-4" src={`${ENV.BASE_URL}/uploads/${writerProfileImg}`} alt="" />
          <div className="text-sm">
            <p className="text-gray-900 leading-none text-[16px] font-semibold">{writerNickname}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardCard;