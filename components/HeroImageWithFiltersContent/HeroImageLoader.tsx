const HeroImageLoader = () => {
  return (
    <div className="grid gap-10 grid-cols-[280px_1fr] h-70 items-start max-lg:grid-cols-1 w-full p-4">
      <div className="max-lg:hidden flex flex-col gap-4">
        {/* Filter */}
        <div className="flex flex-col gap-3 mt-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-7 w-3/4 bg-gray-200 animate-pulse rounded"
            />
          ))}
        </div>
      </div>

      {/* Hero Slider */}
      <div className="relative w-[90%] md:ml-auto max-md:mx-auto max-md:w-full group overflow-hidden">
        {/* Main Image Area */}
        <div className="relative rounded-lg w-full h-75 md:h-80 bg-gray-300 animate-pulse"></div>

        {/* Arrows */}
        <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
          <div className="h-10 w-10 bg-gray-400/50 animate-pulse rounded-md" />
          <div className="h-10 w-10 bg-gray-400/50 animate-pulse rounded-md" />
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-4 rounded-full bg-gray-400/50 animate-pulse ${i === 1 ? "w-12" : "w-8"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroImageLoader;
