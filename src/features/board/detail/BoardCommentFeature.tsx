import Button from '@/shared/ui/button/Button.tsx';
import React, { FC, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addBoardComment } from '@/entities/board/api.ts';
import TextArea from '@/shared/ui/input/TextArea.tsx';
import { useAlertStore } from '@/shared/model/alertStore.ts';

interface BoardCommentFeatureProps {
  boardId: number;
  userId: number;
}

const BoardCommentFeature: FC<BoardCommentFeatureProps> = ({ boardId, userId }) => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlertStore();
  const [comment, setComment] = useState('');

  const addCommentMutation = useMutation({
    mutationKey: ['add_comment', boardId, userId],
    mutationFn: async () => await addBoardComment(boardId, comment),
    onSuccess: async () => {
      setComment('');
      showAlert('댓글이 정상적으로 추가되었습니다.', 'success');
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'board_comments' && query.queryKey[1] === boardId,
      });
    },
    onError: () => {
      showAlert('댓글 등록에 실패하였습니다.', 'error');
    },
  });

  const handleAddComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addCommentMutation.mutate();
  };

  return (
    <div className="w-full">
      <form className="flex flex-row justify-between items-center">
        <TextArea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글을 작성해주세요."
          className="w-[85%]"
        />
        <Button
          name="등록"
          className=""
          disabled={comment === ''}
          onClick={handleAddComment}
        />
      </form>
    </div>
  );
};

export default BoardCommentFeature;