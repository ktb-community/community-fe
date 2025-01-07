const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <span className="loading loading-dots loading-lg"></span>
    </div>
  );
};

export default Loading;