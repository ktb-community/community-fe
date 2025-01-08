import React, { FC, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { checkBoardLike, toggleBoardLike } from '@/entities/board/api.ts';
import { FaRegThumbsUp } from 'react-icons/fa';
import { useAlertStore } from '@/shared/model/alertStore.ts';

interface BoardLikeFeatureProps {
  userId: number;
  boardId: number;
}

const BoardLikeFeature: FC<BoardLikeFeatureProps> = ({ userId, boardId }) => {
  const [isLike, setIsLike] = useState<boolean>(false);
  const { showAlert } = useAlertStore();

  useEffect(() => {
    checkBoardLike(boardId, userId)
      .then(({ data }) => setIsLike(data));
  }, []);

  const mutation = useMutation({
    mutationKey: ['toggle_board_like', userId, boardId],
    mutationFn: async () => await toggleBoardLike(boardId, userId),
    onSuccess: ({ data }) => {
      setIsLike(data);
      showAlert(`좋아요가 ${!isLike ? '등록' : '취소'} 되었습니다.`, 'success');
    },
    onError: (err) => {
      console.error(err);
      showAlert('예상치 못한 에러가 발생하였습니다. 다시 시도해주세요.', 'error');
    },
  });

  const handleBoardLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutation.mutate();
  };

  const btnClassName = [
    'btn h-fit py-2',
    isLike ? 'btn-primary' : '',
  ].join(' ');

  return (
    <div className="flex flex-row gap-3 justify-center items-center">
      <button className={btnClassName} onClick={e => handleBoardLike(e)}>
        <div className="flex flex-col justify-center items-center gap-2">
          <FaRegThumbsUp className="text-2xl" />
          <p>좋아요</p>
        </div>
      </button>
    </div>
  );
};

export default BoardLikeFeature;