import salgu from '@/shared/assets/salgu3.jpg';

const NotFoundPage = () => {
  return (
    <div className="dark:text-dk-text dark:bg-dk-default">
      <div className="flex flex-col justify-center items-center w-screen h-screen z-1">
        <p className="font-bold text-4xl text-black">Sorry,</p>
        <p className="font-bold text-3xl text-black">The page you are looking for does not exist.</p>
        <div
          className="w-screen h-screen fixed -z-10 opacity-60"
          style={{
            backgroundImage: `url(${salgu})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
