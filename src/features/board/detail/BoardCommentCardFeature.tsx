import { FC } from 'react';
import BoardCommentCard from '@/features/board/detail/ui/BoardCommentCard.tsx';
import {
  BoardComment,
  BoardCommentDeleteRequest,
  BoardCommentModifyRequest,
} from '@/entities/board/types.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBoardComment, modifyBoardComment } from '@/entities/board/api.ts';

interface BoardCommentCardFeatureProps {
  userId: number;
  boardId: number;
  comment: BoardComment;
}

const BoardCommentCardFeature: FC<BoardCommentCardFeatureProps> = ({ userId, boardId, comment }) => {
  const queryClient = useQueryClient();

  const modifyCommentMutation = useMutation({
    mutationKey: ['modify_comment', boardId, comment.commentId],
    mutationFn: async (boardCommentModifyRequest: BoardCommentModifyRequest) => await modifyBoardComment(boardCommentModifyRequest),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'board_comments' && query.queryKey[1] === boardId,
      });
    },
    onError: () => {
      alert('댓글 수정에 실패하였습니다.');
    },
  });

  const deleteCommentMutation = useMutation({
    mutationKey: ['delete_comment', boardId, comment.commentId],
    mutationFn: async (boardCommentDeleteRequest: BoardCommentDeleteRequest) => await deleteBoardComment(boardCommentDeleteRequest),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'board_comments' && query.queryKey[1] === boardId,
      });
    },
    onError: () => {
      alert('댓글 삭제에 실패하였습니다.');
    },
  });

  const handleModifyComment = (boardCommentModifyRequest: BoardCommentModifyRequest) => {
    modifyCommentMutation.mutate(boardCommentModifyRequest);
  };

  const handleDeleteComment = (boardCommentDeleteRequest: BoardCommentDeleteRequest) => {
    deleteCommentMutation.mutate(boardCommentDeleteRequest);
  };

  return (
    <div>
      <BoardCommentCard
        comment={comment}
        userId={userId}
        boardId={boardId}
        handleModifyComment={handleModifyComment}
        handleDeleteComment={handleDeleteComment} />
    </div>
  );
};

export default BoardCommentCardFeature;