import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteBoard, getBoard } from '@/entities/board/api.ts';
import BoardDetailForm from '@/features/board/detail/ui/BoardDetailForm.tsx';
import { FC } from 'react';
import { BoardDeleteRequest } from '@/entities/board/types.ts';
import { useNavigate } from 'react-router-dom';
import Loading from '@/shared/ui/ux/Loading.tsx';
import { useAlertStore } from '@/shared/model/alertStore.ts';

interface BoardDetailFeatureProps {
  boardId: number;
}

const BoardDetailFeature: FC<BoardDetailFeatureProps> = ({ boardId }) => {
  const navigate = useNavigate();
  const { showAlert } = useAlertStore();

  const { isPending: isBoardDetailPending, isError: isBoardDetailError, data: boardDetailData } = useQuery({
    queryKey: ['board_detail', boardId],
    queryFn: async () => await getBoard(boardId),
    retry: 1,
  });

  if (isBoardDetailError) {
    showAlert('예상치 못한 에러가 발생하였습니다.', 'error');
    navigate('/');
    return null;
  }

  const boardDeleteMutation = useMutation({
    mutationKey: ['board_delete', boardId],
    mutationFn: (boardDeleteRequest: BoardDeleteRequest) => deleteBoard(boardDeleteRequest),
    onSuccess: () => {
      showAlert('게시글이 삭제되었습니다.', 'success');
      navigate('/');
    },
    onError: (err) => {
      console.error(err);
      showAlert('게시글 삭제 중 에러가 발생하였습니다.', 'error');
    },
  });

  const handleBoardDelete = (boardDeleteRequest: BoardDeleteRequest) => {
    boardDeleteMutation.mutate(boardDeleteRequest);
  };

  if (isBoardDetailPending) {
    return <Loading />;
  }

  return (
    <div>
      <BoardDetailForm
        boardDetail={boardDetailData!!.data}
        handleBoardDelete={handleBoardDelete}
      />
    </div>
  );
};

export default BoardDetailFeature;