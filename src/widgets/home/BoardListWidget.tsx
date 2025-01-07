import BoardListFeature from '@/features/board/list/BoardListFeature.tsx';
import Button from '@/shared/ui/button/Button.tsx';
import { useNavigate } from 'react-router-dom';

const BoardListWidget = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center relative gap-8">
      <div className="flex flex-col items-center mb-8 text-[20px]">
        <p>안녕하세요.</p>
        <p>아무말 대잔치 <span className="font-bold">게시판</span> 입니다.</p>
      </div>
      <div className="flex flex-col items-end justify-center gap-4">
        <Button
          name="게시글 추가"
          onClick={() => navigate('/boards/new')}/>
        <BoardListFeature />
      </div>
    </div>
  );
};

export default BoardListWidget;