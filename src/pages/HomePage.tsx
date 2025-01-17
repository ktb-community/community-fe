import HeaderWidget from '@/widgets/common/HeaderWidget.tsx';
import BoardListWidget from '@/widgets/home/BoardListWidget.tsx';
import Button from '@/shared/ui/button/Button.tsx';
import { useAuthStore } from '@/entities/auth/model.ts';
import { useNavigate } from 'react-router-dom';
import FooterWidget from '@/widgets/common/FooterWidget.tsx';

const HomePage = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const navigate = useNavigate();

  return (
    <div
      className={`bg-gray-100 dark:bg-dk-default dark:text-dk-text text-black overflow-hidden min-w-screen flex flex-col ${isAuthenticated ? '' : 'overflow-y-hidden'}`}>
      <div className={`flex flex-col min-h-screen flex-grow gap-16 mb-32 ${isAuthenticated ? '' : 'blur-[2px] pointer-events-none'}`}>
        <HeaderWidget />
        <BoardListWidget />
      </div>
      <FooterWidget />
      {!isAuthenticated && (
        <div>
          {/* 배경 Blur 처리 */}
          <div
            className="
          glass blur-2xl fixed w-[calc(100%-16px)] h-1/2 opacity-95 bottom-0 right-0 left-0
          bg-gradient-to-br from-gray-200 via-gray-400 to-orange-100 pointer-events-none
        "
            aria-hidden="true"
          />

          {/* 로그인 메시지와 버튼 */}
          <div
            className="fixed bottom-[20%] flex flex-col justify-center items-center gap-6 right-0 left-0 pointer-events-none">
            <span className="font-bold text-2xl z-10 pointer-events-auto">
              로그인하고 더 다양한 서비스를 만나보세요.
            </span>
            <Button
              className="w-[128px] z-10 pointer-events-auto"
              name="로그인"
              onClick={() => navigate('/auth/login')}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;