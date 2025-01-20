import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/entities/auth/model.ts';
import { getBoard, modifyBoard } from '@/entities/board/api.ts';
import { BoardDetailResponse, BoardModifyRequest } from '@/entities/board/types.ts';
import BoardEditForm from '@/features/board/edit/ui/BoardEditForm.tsx';
import Loading from '@/shared/ui/ux/Loading.tsx';
import { useAlertStore } from '@/shared/model/alertStore.ts';

const BoardEditFeature = () => {
  const { showAlert } = useAlertStore();
  const { boardId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // boardId 검증
  if (!boardId || isNaN(Number(boardId))) {
    showAlert('비정상적인 접근 시도입니다.', 'error');
    navigate('/');
  }

  const bid = parseInt(boardId!!, 10);

  const {
    isLoading,
    isError,
    data: boardDetailData,
  } = useQuery({
    queryKey: ['board_detail', bid],
    queryFn: () => getBoard(bid),
    retry: 1,
    enabled: !!bid,
  });

  const boardDetail = boardDetailData?.data as BoardDetailResponse;

  const boardModifyMutation = useMutation({
    mutationKey: ['board_modify', bid],
    mutationFn: async (boardModifyRequest: BoardModifyRequest) => await modifyBoard(boardModifyRequest),
    onSuccess: async () => {
      navigate(`/boards/${bid}`);
      showAlert('게시글이 성공적으로 수정되었습니다.', 'success');
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'board_detail' && query.queryKey[1] === bid,
      });
    },
    onError: (err) => {
      console.error(err);
      showAlert('게시글 수정 중 에러가 발생하였습니다.', 'error');
    },
  });

  const handleBoardModify = (formData: FormData) => {
    boardModifyMutation.mutate({ formData, boardId: bid });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    navigate('/');
    showAlert('유효하지 않은 요청입니다.', 'warning');
  }

  return (
    <div className="w-[640px] border-2 rounded-xl py-12 px-6 shadow-uniform dark:border-dk-default dark:text-dk-text">
      {boardModifyMutation.isPending && <Loading />}
      <BoardEditForm
        boardDetail={boardDetail}
        onSubmit={handleBoardModify}
      />
    </div>
  );
};

export default BoardEditFeature;