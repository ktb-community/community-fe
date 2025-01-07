import LoginFeature from '@/features/auth/login/LoginFeature.tsx';
import { Link } from 'react-router-dom';

const LoginWidget = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="z-10 border-2 rounded-2xl py-6 shadow-2xl dark:border-gray-500 dark:z-1 w-[600px] bg-white opacity-90">
        <div className="flex flex-col items-center mb-16">
          <h1 className="font-bold text-3xl">LOGIN</h1>
          <p></p>
        </div>
      <LoginFeature />
      </div>

      <Link className="mt-6 text-[14px] underline underline-offset-2" to="/auth/signup">회원가입</Link>
    </div>
  )
}

export default LoginWidget;