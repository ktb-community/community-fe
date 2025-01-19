const NotFoundPage = () => {
  return (
    <div className="dark:text-dk-text dark:bg-dk-default">
      <div className="flex flex-col justify-center items-center w-screen h-screen z-1">
        <p className="font-bold text-4xl text-black">Sorry,</p>
        <p className="font-bold text-3xl text-black">The page you are looking for is unavailable.</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
