import LoginWidget from '@/widgets/auth/LoginWidget.tsx';
import DarkModeWidget from '@/widgets/common/DarkModeWidget.tsx';

const LoginPage = () => {
  return (
    <div className="bg-gray-100 dark:bg-[#121212] text-black dark:text-gray-300 overflow-x-hidden h-screen w-screen">
      <div className="flex flex-col gap-16 items-center justify-center w-full h-full">
        <LoginWidget />
      </div>
      <DarkModeWidget className="fixed bottom-10 right-10" />
    </div>
  );
};

export default LoginPage;