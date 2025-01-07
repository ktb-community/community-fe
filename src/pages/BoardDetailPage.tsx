import HeaderWidget from '@/widgets/common/HeaderWidget.tsx';
import FooterWidget from '@/widgets/common/FooterWidget.tsx';
import BoardDetailWidget from '@/widgets/board/BoardDetailWidget.tsx';

const BoardDetailPage = () => {
  return (
    <div className="dark:bg-dk-default dark:text-dk-text">
      <HeaderWidget />
      <div className="h-max flex flex-col items-center my-16">
        <BoardDetailWidget />
      </div>
      <FooterWidget />
    </div>
  );
};

export default BoardDetailPage;