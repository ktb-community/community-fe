import LoginWidget from '@/widgets/auth/LoginWidget.tsx';

const LoginPage = () => {
  return (
    <div className="bg-gray-100 text-black dark:text-dk-text dark:bg-dk-default overflow-x-hidden h-screen w-screen">
      <div className="flex flex-col gap-16 items-center justify-center w-full h-full">
        <LoginWidget />
      </div>
    </div>
  );
};

export default LoginPage;