import { BoardAddRequest } from '@/entities/board/types.ts';
import { FC } from 'react';

interface BoardAddFormProps {
  userId: number;
  onSubmit: (boardAddRequest: BoardAddRequest) => void;
}

const BoardAddForm: FC<BoardAddFormProps> = ({ userId, onSubmit }) => {

  return (
    <div>

    </div>
  )
}

export default BoardAddForm;