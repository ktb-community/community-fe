import { BoardComment } from '@/entities/board/types.ts';
import { FC } from 'react';
import UserAvatar from '@/shared/ui/avatar/UserAvatar.tsx';
import { ENV } from '@/shared/config/env.ts';
import Button from '@/shared/ui/button/Button.tsx';

interface BoardCommentCardProps {
  comment: BoardComment;
  userId: number;
}

const BoardCommentCard: FC<BoardCommentCardProps> = ({ comment, userId }) => {
  const { content, createdAt, writerId, writerNickname, writerProfileImg } = comment;

  return (
    <div className="w-full border-2 rounded-lg p-3">
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
          <div>
            <p>{content}</p>
          </div>
          {userId === writerId && (
            <div className="flex flex-row gap-1">
              <Button
                className="btn-sm"
                name="수정"
                onClick={() => {}}
              />
              <Button
                className="btn-sm btn-ghost"
                name="삭제"
                onClick={() => {}}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardCommentCard;