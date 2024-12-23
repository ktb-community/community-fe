import SignupWidget from '@/widgets/auth/SignupWidget.tsx';
import FooterWidget from '@/widgets/common/FooterWidget.tsx';
import DarkModeWidget from '@/widgets/common/DarkModeWidget.tsx';

const SignupPage = () => {
  return (
    <div className="bg-gray-100 dark:bg-[#121212] text-black dark:text-gray-300 overflow-x-hidden">
      <div className="mt-24 flex flex-col gap-16">
        <SignupWidget />
        <FooterWidget />
      </div>
      <DarkModeWidget className="fixed bottom-10 right-10" />
    </div>
  );
};

export default SignupPage;