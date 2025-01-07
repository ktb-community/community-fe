import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/entities/auth/model.ts';
import { getBoard, modifyBoard } from '@/entities/board/api.ts';
import { BoardDetailResponse, BoardModifyRequest } from '@/entities/board/types.ts';
import BoardEditForm from '@/features/board/edit/ui/BoardEditForm.tsx';

const BoardEditFeature = () => {
  const { user } = useAuthStore();
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
    return <div>로딩 중...</div>;
  }

  if (isError) {
    navigate('/');
    return null;
  }

  const boardDetail = boardDetailData?.data as BoardDetailResponse;

  // 작성자 검증
  if (user?.id !== boardDetail.writerId) {
    alert('비정상적인 접근 시도입니다.');
    navigate('/');
    return null;
  }

  const boardModifyMutation = useMutation({
    mutationKey: ['board_modify', bid],
    mutationFn: async (boardModifyRequest: BoardModifyRequest) => await modifyBoard(boardModifyRequest),
    onSuccess: () => {
      navigate(`/boards/${bid}`);
    },
    onError: (err) => {
      console.error(err);
      alert('게시글 수정 중 에러가 발생하였습니다.');
    },
  });

  const handleBoardModify = (formData: FormData) => {
    boardModifyMutation.mutate({ formData, boardId: bid });
  };

  return (
    <div className="w-[640px]">
      <BoardEditForm
        userId={user.id}
        boardDetail={boardDetail}
        onSubmit={handleBoardModify}
      />
    </div>
  );
};

export default BoardEditFeature;