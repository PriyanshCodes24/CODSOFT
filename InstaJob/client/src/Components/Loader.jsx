const Loading = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
    </div>
  );
};

export default Loading;
