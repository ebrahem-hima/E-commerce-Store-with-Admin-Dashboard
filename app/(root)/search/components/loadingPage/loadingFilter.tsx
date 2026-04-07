const LoadingFilter = () => {
  return (
    <div className="hidden lg:block">
      <div className="px-4">
        <div className="flex justify-between items-center mb-4">
          <div className="h-5 w-16 bg-gray-200 animate-pulse rounded" />{" "}
          {/* FILTER text */}
          <div className="h-4 w-12 bg-gray-200 animate-pulse rounded" />{" "}
          {/* Reset text */}
        </div>

        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex flex-col gap-2">
              {/* Filter Header Box */}
              <div className="h-10 w-full bg-gray-300 animate-pulse border border-gray-300 rounded-sm" />
            </div>
          ))}
          <div className="h-10 w-full bg-gray-300 animate-pulse rounded mt-4" />{" "}
          {/* Search Button */}
        </div>
      </div>
    </div>
  );
};

export default LoadingFilter;
