import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/entities/auth/model.ts';
import { getBoard, modifyBoard } from '@/entities/board/api.ts';
import { BoardDetailResponse, BoardModifyRequest } from '@/entities/board/types.ts';
import BoardEditForm from '@/features/board/edit/ui/BoardEditForm.tsx';
import Loading from '@/shared/ui/ux/Loading.tsx';
import { useAlertStore } from '@/shared/model/alertStore.ts';

const BoardEditFeature = () => {
  const { user } = useAuthStore();
  const { showAlert } = useAlertStore();
  const { boardId } = useParams();
  const navigate = useNavigate();

  // boardId 검증
  if (!boardId || isNaN(Number(boardId))) {
    alert('비정상적인 접근 시도입니다.');
    navigate('/');
    return null; // navigate 후 컴포넌트 렌더링 방지
  }

  const bid = parseInt(boardId, 10);

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

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    navigate('/');
    showAlert('게시글 상세 정보를 가져오지 못했습니다.', 'error');
    return null;
  }

  const boardDetail = boardDetailData?.data as BoardDetailResponse;

  // 작성자 검증
  if (user?.id !== boardDetail.writerId) {
    showAlert('비정상적인 접근 시도입니다.', 'warning');
    navigate('/');
    return null;
  }

  const boardModifyMutation = useMutation({
    mutationKey: ['board_modify', bid],
    mutationFn: async (boardModifyRequest: BoardModifyRequest) => await modifyBoard(boardModifyRequest),
    onSuccess: () => {
      navigate(`/boards/${bid}`);
      showAlert('게시글이 성공적으로 수정되었습니다.', 'success');
    },
    onError: (err) => {
      console.error(err);
      showAlert('게시글 수정 중 에러가 발생하였습니다.', 'error');
    },
  });

  const handleBoardModify = (formData: FormData) => {
    boardModifyMutation.mutate({ formData, boardId: bid });
  };

  return (
    <div className="w-[640px] border-2 rounded-xl py-12 px-6 shadow-uniform dark:border-dk-default dark:text-dk-text">
      <BoardEditForm
        userId={user.id}
        boardDetail={boardDetail}
        onSubmit={handleBoardModify}
      />
    </div>
  );
};

export default BoardEditFeature;