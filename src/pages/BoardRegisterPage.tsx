import BoardAddFeature from '@/features/board/add/BoardAddFeature.tsx';
import HeaderWidget from '@/widgets/common/HeaderWidget.tsx';
import FooterWidget from '@/widgets/common/FooterWidget.tsx';

const BoardRegisterPage = () => {
  return (
    <div>
      <HeaderWidget />
      <BoardAddFeature />
      <FooterWidget />
    </div>
  )
}

export default BoardRegisterPage;