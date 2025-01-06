import React, { FC, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { checkBoardLike, toggleBoardLike } from '@/entities/board/api.ts';

interface BoardLikeFeatureProps {
  userId: number;
  boardId: number;
}

const BoardLikeFeature: FC<BoardLikeFeatureProps> = ({ userId, boardId }) => {
  const [isLike, setIsLike] = useState<boolean>(false);

  useEffect(() => {
    checkBoardLike(boardId, userId)
      .then(({ data }) => setIsLike(data));
  }, []);

  const mutation = useMutation({
    mutationKey: ['toggle_board_like', userId, boardId],
    mutationFn: async () => await toggleBoardLike(boardId, userId),
    onSuccess: ({ data }) => setIsLike(data),
    onError: (err) => {
      console.error(err);
      alert("예상치 못한 에러가 발생하였습니다. 다시 시도해주세요.");
    }
  });

  const handleBoardLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutation.mutate();
  }

  const btnClassName = [
    'btn',
    isLike ? 'btn-primary' : ''
  ].join(' ')

  return (
    <div className="flex justify-center items-center">
      <button className={btnClassName} onClick={e => handleBoardLike(e)}>좋아요</button>
    </div>
  );
};

export default BoardLikeFeature;