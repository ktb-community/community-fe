import { useQuery } from '@tanstack/react-query';
import { getBoard } from '@/entities/board/api.ts';
import BoardDetailForm from '@/features/board/detail/ui/BoardDetailForm.tsx';
import { FC } from 'react';

interface BoardDetailFeatureProps {
  boardId: number;
}

const BoardDetailFeature: FC<BoardDetailFeatureProps> = ({ boardId }) => {
  const { isPending: isBoardDetailPending, data: boardDetailData } = useQuery({
    queryKey: ['board_detail', boardId],
    queryFn: async () => await getBoard(boardId),
  });


  if (isBoardDetailPending) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <BoardDetailForm boardDetail={boardDetailData!!.data} />
    </div>
  );
};

export default BoardDetailFeature;