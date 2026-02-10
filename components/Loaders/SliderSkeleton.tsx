import { Skeleton } from "../ui/skeleton";

export const ProductCardSkeleton = () => {
  return (
    <div>
      <Skeleton className="w-full h-40 bg-gray-300 rounded animate-pulse" />
      <div className={`flex flex-col gap-2 mt-5 w-full`}>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
};

export const SliderSkeleton = () => {
  return (
    <div className="w-full">
      <div className="flex-between mb-4">
        <Skeleton className="h-8 w-48" />

        <div className="flex items-center gap-3">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
      </div>
      <div className="productGrid overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
