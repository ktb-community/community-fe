import { useNavigate, useParams } from 'react-router-dom';
import UserMyPageWidget from '@/widgets/user/UserMyPageWidget.tsx';
import { useAuthStore } from '@/entities/auth/model.ts';
import { useEffect } from 'react';
import { useAlertStore } from '@/shared/model/alertStore.ts';
import HeaderWidget from '@/widgets/common/HeaderWidget.tsx';
import FooterWidget from '@/widgets/common/FooterWidget.tsx';

const UserMyPage = () => {
  const { user } = useAuthStore();
  const { userId } = useParams();
  const { showAlert } = useAlertStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId || user?.id !== parseInt(userId)) {
      showAlert('비정상적인 접근 시도입니다.', 'warning');
      navigate('/');
    }
  }, [user]);

  return (
    <div className="dark:text-dk-text dark:bg-dk-default min-w-screen min-h-screen flex flex-col">
      <HeaderWidget />
      <div className="flex flex-col flex-grow items-center justify-center h-max">
        <UserMyPageWidget />
      </div>
      <div className="h-16 text-white max-w-full">
        <FooterWidget />
      </div>
    </div>
  );
};

export default UserMyPage;