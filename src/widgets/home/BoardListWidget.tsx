import BoardListFeature from '@/features/home/boardList/BoardListFeature.tsx';

const BoardListWidget = () => {
  return (
    <div className="flex flex-col justify-center items-center relative">
      <div className="flex flex-col items-center mb-8 text-[20px]">
        <p>
          안녕하세요.
        </p>
        <p>
          아무말 대잔치 <span className="font-bold">게시판</span> 입니다.
        </p>
      </div>
      <BoardListFeature />
    </div>
  );
};

export default BoardListWidget;