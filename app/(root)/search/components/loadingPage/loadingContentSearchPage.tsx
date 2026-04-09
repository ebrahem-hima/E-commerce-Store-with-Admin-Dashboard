const LoadingContentSearchPage = () => {
  return (
    <>
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
      <div className="relative">
        <div className="flex flex-col gap-6">
          <div className="w-full flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div className="h-8 w-48 bg-gray-300 animate-pulse rounded" />{" "}
              {/* Section Title */}
              <div className="flex gap-3">
                {/* Arrows */}
                <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-full" />{" "}
                <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-full" />{" "}
              </div>
            </div>

            {/* Best Sellers Products */}
            <div className="searchGrid overflow-hidden">
              {[1, 2, 3, 4].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center py-3">
            <div className="flex gap-2">
              <div className="h-6 w-6 bg-gray-300 animate-pulse rounded" />{" "}
              {/* Grid Icon */}
              <div className="h-6 w-6 bg-gray-300 animate-pulse rounded" />{" "}
              {/* List Icon */}
            </div>
            <div className="h-6 w-32 bg-gray-300 animate-pulse rounded" />{" "}
            {/* Sort dropdown */}
          </div>

          {/* Search Products Grid */}
          <div className="searchGrid overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>

      <div className="lg:hidden fixed z-50 bottom-3 left-1/2 transform -translate-x-1/2 h-10 w-32 bg-black/20 animate-pulse rounded-md" />
    </>
  );
};

const SkeletonCard = () => (
  <div className="flex flex-col gap-2 min-w-full">
    {/* Product Image Area */}
    <div className="h-40 w-full bg-gray-300 animate-pulse rounded-md" />
    {/* Product Title */}
    <div className="h-4 w-3/4 bg-gray-300 animate-pulse rounded" />
    {/* Product Price */}
    <div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded" />
  </div>
);

export default LoadingContentSearchPage;
