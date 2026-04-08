import { Skeleton } from "../ui/skeleton";

export const ProductCardSkeleton = () => {
  return (
    <div>
      <Skeleton className="w-full h-35 bg-gray-300 rounded animate-pulse" />
      <div className={`flex flex-col gap-1 mt-2 w-full`}>
        <Skeleton className="h-4.5 w-full" />
        <Skeleton className="h-4.5 w-1/2" />
        <Skeleton className="h-9 w-full mt-0.5" />
      </div>
    </div>
  );
};

export const SliderSkeleton = () => {
  return (
    <div className="w-full relative top-100-">
      <div className="flex-between mb-4">
        <Skeleton className="h-7 w-48" />

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
