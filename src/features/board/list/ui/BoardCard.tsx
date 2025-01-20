import { Board } from '@/entities/board/types.ts';
import { FC } from 'react';
import { ENV } from '@/shared/config/env.ts';
import { useNavigate } from 'react-router-dom';
import { BiLike } from 'react-icons/bi';
import { AiOutlineComment } from 'react-icons/ai';
import { changeNumberExpression } from '@/shared/utils/expression.ts';
import IconText from '@/shared/ui/text/IconText.tsx';
import { LuEye } from 'react-icons/lu';

interface BoardCardProps {
  board: Board;
}

const BoardCard: FC<BoardCardProps> = ({ board }) => {
  const { boardId, title, createdAt, likeCnt, viewCnt, commentCnt, writerProfileImg, writerNickname} = board;
  const navigate = useNavigate();

  return (
    <div
      className="
        w-[450px] h-fit border-2 rounded-3xl px-2 shadow-uniform cursor-pointer
        hover:shadow-2xl hover:bg-base-200
        dark:hover:bg-opacity-80 dark:border-dk-default
      "
      onClick={() => navigate(`/boards/${boardId}`)}
    >
      <div className="p-4 flex flex-col justify-between">
        <div>
          <div className="text-gray-900 dark:text-dk-text font-bold text-xl mb-2 line-clamp-1">{title}</div>
        </div>

        <div className="flex flex-row justify-between items-center">
          <div className="text-[12px] flex flex-row gap-2 items-center justify-center text-gray-400">
            <IconText Icon={<LuEye />} value={changeNumberExpression(viewCnt)} />
            <IconText Icon={<BiLike />} value={changeNumberExpression(likeCnt)} />
            <IconText Icon={<AiOutlineComment />} value={changeNumberExpression(commentCnt)} />
          </div>
          <div className="text-[12px] mt-[3px] text-gray-400 dark:text-gray-400">
            <span>{createdAt}</span>
          </div>
        </div>

        <hr className="my-3 border-1 border-gray-400" />

        <div className="flex items-center">
          <img className="w-10 h-10 rounded-full mr-4" src={`${ENV.STORAGE_URL}/${writerProfileImg}`} alt="" />
          <div className="text-sm">
            <p className="text-gray-900 leading-none text-[16px] font-semibold dark:text-dk-text">{writerNickname}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardCard;