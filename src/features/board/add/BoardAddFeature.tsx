import BoardAddForm from '@/features/board/add/ui/BoardAddForm.tsx';
import { useMutation } from '@tanstack/react-query';
import { addBoard } from '@/entities/board/api.ts';
import { useNavigate } from 'react-router-dom';
import { BoardAddRequest } from '@/entities/board/types.ts';
import { useAuthStore } from '@/entities/auth/model.ts';
import { useEffect } from 'react';
import { useAlertStore } from '@/shared/model/alertStore.ts';

const BoardAddFeature = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { showAlert } = useAlertStore();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      showAlert('게시글을 작성하려면 로그인이 필요합니다.', 'warning');
      navigate('/auth/login');
    }
  }, [isAuthenticated, user]);

  const boardAddMutation = useMutation({
    mutationKey: ['board_add'],
    mutationFn: async (formData: FormData) => await addBoard(formData),
    onSuccess: () => {
      navigate('/');
      showAlert('게시글이 성공적으로 추가되었습니다.', 'success');
    },
    onError: (err) => {
      console.error(err);
      showAlert('게시글 추가 중 예상치 못한 에러가 발생하였습니다.', 'error');
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
    <div className="w-[640px] border-2 rounded-xl py-12 px-6 shadow-uniform dark:border-dk-default dark:text-dk-text">
      <BoardAddForm
        userId={user!!.id}
        onSubmit={handleBoardAdd}
      />
    </div>
  );
};

export default BoardAddFeature;