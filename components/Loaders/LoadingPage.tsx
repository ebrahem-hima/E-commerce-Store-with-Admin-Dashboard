import LoadingSpinner from "./LoadingSpinner";

const LoadingPage = () => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center w-full h-full bg-white/50 backdrop-blur-xs rounded-md transition-all duration-300">
      <LoadingSpinner />
    </div>
  );
};

export default LoadingPage;
