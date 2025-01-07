import BoardEditWidget from '@/widgets/board/BoardEditWidget.tsx';
import HeaderWidget from '@/widgets/common/HeaderWidget.tsx';
import FooterWidget from '@/widgets/common/FooterWidget.tsx';

const BoardEditPage = () => {
  return (
    <div className="dark:text-dk-text dark:bg-dk-default">
      <HeaderWidget />
      <BoardEditWidget />
      <FooterWidget />
    </div>
  );
};

export default BoardEditPage;