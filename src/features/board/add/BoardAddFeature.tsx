import BoardAddForm from '@/features/board/add/ui/BoardAddForm.tsx';
import { useMutation } from '@tanstack/react-query';
import { addBoard } from '@/entities/board/api.ts';
import { useNavigate } from 'react-router-dom';
import { BoardAddRequest } from '@/entities/board/types.ts';
import { useAuthStore } from '@/entities/auth/model.ts';
import { useEffect } from 'react';

const BoardAddFeature = () => {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      alert('게시글을 작성하려면 로그인이 필요합니다.');
      navigate('/auth/login');
    }
  }, [isAuthenticated, user]);

  const boardAddMutation = useMutation({
    mutationKey: ['board_add'],
    mutationFn: async (formData: FormData) => await addBoard(formData),
    onSuccess: () => {
      navigate('/');
    },
    onError: (err) => {
      console.error(err);
      alert('게시글 추가 중 예상치 못한 에러가 발생하였습니다.');
    },
  });

  const handleBoardAdd = (boardAddRequest: BoardAddRequest) => {
    const { userId, title, content, file } = boardAddRequest;
    const formData = new FormData();
    formData.append('userId', userId.toString());
    formData.append('title', title);
    formData.append('content', content);
    if (file) formData.append('boardImg', file);

    boardAddMutation.mutate(formData);
  };

  return (
    <div className="w-[640px]">
      <BoardAddForm
        userId={user!!.id}
        onSubmit={handleBoardAdd}
      />
    </div>
  );
};

export default BoardAddFeature;