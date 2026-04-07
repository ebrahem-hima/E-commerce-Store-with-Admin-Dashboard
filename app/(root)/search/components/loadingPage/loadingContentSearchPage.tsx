const LoadingContentSearchPage = () => {
  return (
    <>
      {/* 2. Main Content Area */}
      <div className="relative">
        <div className="flex flex-col gap-6">
          {/* Best Sellers Section */}
          <div className="w-full flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div className="h-8 w-48 bg-gray-300 animate-pulse rounded" />{" "}
              {/* Section Title */}
              <div className="flex gap-3">
                <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-full" />{" "}
                {/* Back Arrow */}
                <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-full" />{" "}
                {/* Next Arrow */}
              </div>
            </div>

            {/* Horizontal Product Slider Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>

          {/* Controls (Grid/List Toggle & Sort) */}
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

          {/* Main Products Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Floating Button Skeleton */}
      <div className="lg:hidden fixed z-50 bottom-3 left-1/2 transform -translate-x-1/2 h-10 w-32 bg-black/20 animate-pulse rounded-md" />
    </>
  );
};

const SkeletonCard = () => (
  <div className="flex flex-col gap-2">
    {/* Product Image Area */}
    <div className="h-40 w-full bg-gray-300 animate-pulse rounded-md" />
    {/* Product Title */}
    <div className="h-4 w-3/4 bg-gray-300 animate-pulse rounded" />
    {/* Product Price */}
    <div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded" />
  </div>
);

export default LoadingContentSearchPage;
