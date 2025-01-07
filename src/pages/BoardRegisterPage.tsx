import HeaderWidget from '@/widgets/common/HeaderWidget.tsx';
import BoardAddWidget from '@/widgets/board/BoardAddWidget.tsx';
import FooterWidget from '@/widgets/common/FooterWidget.tsx';

const BoardRegisterPage = () => {
  return (
    <div className="dark:bg-dk-default dark:text-dk-text">
      <HeaderWidget />
      <BoardAddWidget />
      <FooterWidget />
    </div>
  )
}

export default BoardRegisterPage;