import SignupFeature from '@/features/auth/signup/SignupFeature.tsx';
import { Link } from 'react-router-dom';

const SignupWidget = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="z-10 border-4 rounded-2xl py-6 shadow-2xl dark:border-gray-700 dark:z-1">
        <div className="flex flex-col items-center mb-16">
          <h1 className="font-bold text-3xl dark:text-dk-text">SIGN-UP</h1>
          <p className="dark:text-dk-text">가입하고 커뮤니티에 합류하세요.</p>
        </div>
        <SignupFeature />
      </div>

      <Link className="mt-6 text-[14px] underline underline-offset-2" to="/auth/login">로그인하러 가기</Link>
    </div>
  );
};

export default SignupWidget;