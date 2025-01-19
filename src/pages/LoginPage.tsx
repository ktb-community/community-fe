import LoginWidget from '@/widgets/auth/LoginWidget.tsx';

const LoginPage = () => {
  return (
    <div className="bg-gray-100 text-black dark:text-dk-text dark:bg-dk-default overflow-x-hidden h-screen w-screen">
      <div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col gap-16 items-center justify-center z-1">
        <LoginWidget />
      </div>
    </div>
  );
};

export default LoginPage;