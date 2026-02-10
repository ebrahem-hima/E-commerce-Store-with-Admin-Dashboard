import { Skeleton } from "@/components/ui/skeleton";

export const WishListSkeleton = () => {
  return (
    <div className="w-full">
      {/* 1. Header Skeleton (Wishlist Count + Button) */}
      <div className="flex justify-between items-center my-4 animate-pulse">
        {/* Wishlist (n) Text */}
        <Skeleton className="h-6 w-32" />

        {/* Move All to Bag Button */}
        <Skeleton className="h-10 w-40" />
      </div>

      {/* 2. Products Grid Skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <Skeleton
            key={item}
            className="h-57.5 flex flex-col items-center gap-2 bg-gray-200"
          >
            {/* Image Area (ImgProduct) */}
            <div className="w-full aspect-square bg-gray-200 rounded-md relative overflow-hidden">
              <Skeleton className="absolute top-2 bg-gray-300 left-2 h-5 w-10 rounded" />
              <Skeleton className="absolute top-2 bg-gray-300 right-2 h-8 w-8 rounded-full" />
            </div>

            {/* Text Area (TextProduct) */}
            <div className="flex flex-col gap-2 w-full pt-2 bg-white">
              {/* Title */}
              <Skeleton className="h-4 bg-gray-200 rounded w-3/4" />
              {/* Price */}
              <Skeleton className="h-4 bg-gray-200 rounded w-1/2" />
              {/* Stars / Rate */}
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-3 w-3 rounded-full" />
                ))}
              </div>
            </div>
          </Skeleton>
        ))}
      </div>
    </div>
  );
};

export default WishListSkeleton;
