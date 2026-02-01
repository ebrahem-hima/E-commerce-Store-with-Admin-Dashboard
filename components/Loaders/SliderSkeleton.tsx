export const SliderSkeleton = () => {
  return (
    <div className="w-full">
      <div className="h-8 mb-2 w-40 bg-[#b4b3b3] rounded animate-pulse" />
      <div className="productGrid overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="w-full h-50 bg-[#b4b3b3] rounded animate-pulse"
          />
        ))}
      </div>
    </div>
  );
};
