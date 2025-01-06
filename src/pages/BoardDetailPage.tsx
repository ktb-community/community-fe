import HeaderWidget from '@/widgets/common/HeaderWidget.tsx';
import FooterWidget from '@/widgets/common/FooterWidget.tsx';
import BoardDetailWidget from '@/widgets/board/BoardDetailWidget.tsx';

const BoardDetailPage = () => {
  return (
    <div>
      <HeaderWidget />
      <div className="h-screen flex flex-col items-center mt-16">
        <BoardDetailWidget />
      </div>
      <FooterWidget />
    </div>
  );
};

export default BoardDetailPage;