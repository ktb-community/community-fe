import Button from '@/shared/ui/button/Button.tsx';
import React, { FC, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addBoardComment } from '@/entities/board/api.ts';

interface BoardCommentFeatureProps {
  boardId: number;
  userId: number;
}

const BoardCommentFeature: FC<BoardCommentFeatureProps> = ({ boardId, userId }) => {
  const queryClient = useQueryClient();
  const [comment, setComment] = useState('');

  const mutation = useMutation({
    mutationKey: ['add_comment', boardId, userId],
    mutationFn: async () => await addBoardComment(boardId, userId, comment),
    onSuccess: async () => {
      setComment('');
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'board_comments' && query.queryKey[1] === boardId
      })
    },
    onError: () => alert('댓글 등록에 실패하였습니다.'),
  });

  const handleAddComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="relative">
      <form>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글을 작성해주세요."
          className="resize-none border-2 rounded-md p-3 w-full h-[128px] text-sm"
        />
        <Button
          name="등록"
          className="absolute right-6 bottom-6"
          disabled={comment === ''}
          onClick={handleAddComment}
        />
      </form>
    </div>
  );
};

export default BoardCommentFeature;