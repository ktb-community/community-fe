import { FC } from 'react';
import BoardCommentCard from '@/features/board/detail/ui/BoardCommentCard.tsx';
import { BoardComment, BoardDeleteRequest, BoardModifyRequest } from '@/entities/board/types.ts';
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
    mutationFn: async (boardModifyRequest: BoardModifyRequest) => await modifyBoardComment(boardModifyRequest),
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
    mutationFn: async (boardDeleteRequest: BoardDeleteRequest) => await deleteBoardComment(boardDeleteRequest),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'board_comments' && query.queryKey[1] === boardId
      })
    },
    onError: () => {
      alert('댓글 삭제에 실패하였습니다.');
    },
  });

  const handleModifyComment = (boardModifyRequest: BoardModifyRequest) => {
    modifyCommentMutation.mutate(boardModifyRequest);
  };

  const handleDeleteComment = (boardDeleteRequest: BoardDeleteRequest) => {
    deleteCommentMutation.mutate(boardDeleteRequest);
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