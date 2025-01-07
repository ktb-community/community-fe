import SignupWidget from '@/widgets/auth/SignupWidget.tsx';
import FooterWidget from '@/widgets/common/FooterWidget.tsx';

const SignupPage = () => {
  return (
    <div className="bg-gray-100 text-black overflow-x-hidden">
      <div className="mt-24 flex flex-col gap-16">
        <SignupWidget />
        <FooterWidget />
      </div>
    </div>
  );
};

export default SignupPage;