import LoginWidget from '@/widgets/auth/LoginWidget.tsx';
import salguImage from '@/shared/assets/salgu2.jpg';
import salguImage2 from '@/shared/assets/salgu3.jpg';

const LoginPage = () => {
  return (
    <div className="bg-gray-100 text-black dark:text-dk-text dark:bg-dk-default overflow-x-hidden h-screen w-screen">
      <div className="flex flex-row w-full h-full items-center">
        <div
          className="flex-1 h-full"
          style={{
            backgroundImage: `url(${salguImage2})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}>
        </div>
        <div
          className="flex-1 h-full"
          style={{
            backgroundImage: `url(${salguImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}>
        </div>
        <div
          className="flex-1 h-full"
          style={{
            backgroundImage: `url(${salguImage2})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            transform: "scaleX(-1)"
          }}>
        </div>
      </div>
      <div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col gap-16 items-center justify-center z-1">
        <LoginWidget />
      </div>
    </div>
  );
};

export default LoginPage;