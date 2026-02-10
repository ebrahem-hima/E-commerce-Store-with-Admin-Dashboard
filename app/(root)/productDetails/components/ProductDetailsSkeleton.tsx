import { Skeleton } from "@/components/ui/skeleton";

export const ProductDetailsSkeleton = () => {
  return (
    <div className="grid grid-cols-[1fr_350px] gap-2 max-tablet:grid-cols-1! mb-6">
      {/* Image Gallery Skeleton */}
      <div className="grid grid-cols-[100px_minmax(0,550px)] max-md:grid-cols-1 max-md:grid-flow-dense justify-center gap-3">
        {/* Thumbnails */}
        <div className="self-start max-md:order-2 flex flex-col max-md:flex-row gap-2 w-full">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton
              key={i}
              className="w-25 h-25 max-md:w-20 max-md:h-20 shrink-0"
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="flex-center max-md:order-1 w-full h-full">
          <Skeleton className="w-1/2 h-1/2 aspect-square max-w-137.5 rounded-lg" />
        </div>
      </div>

      {/* 2. Right Column: Product Description Skeleton */}
      <div className="flex flex-col gap-4 w-full">
        {/* Title + Price + Rate */}
        <div className="flex flex-col gap-2">
          {/* Title */}
          <Skeleton className="h-8 w-3/4" />

          {/* Reviews + Stock */}
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-4 w-4 rounded-full" />
              ))}
            </div>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>

          {/* Price */}
          <div className="mt-2">
            <Skeleton className="h-8 w-32" />
          </div>
        </div>

        {/* Description Paragraph */}
        <div className="flex flex-col gap-2 mt-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-200 rounded-sm my-2" />

        {/* Counter + Options (Color/Size) */}
        <div className="flex flex-col gap-4">
          {/* Option 1 */}
          <div className="flex gap-2">
            <Skeleton className="h-8 w-16 rounded-md" />
            <Skeleton className="h-8 w-16 rounded-md" />
            <Skeleton className="h-8 w-16 rounded-md" />
          </div>
          {/* Counter + Buttons */}
          <div className="flex gap-4 h-12">
            <Skeleton className="h-full w-32 rounded-md" /> {/* Counter */}
            <Skeleton className="h-full flex-1 rounded-md" />{" "}
            {/* Add to cart */}
            <Skeleton className="h-full w-12 rounded-md" /> {/* Wishlist */}
          </div>
        </div>

        {/* Delivery Info Box */}
        <div className="border border-gray-200 rounded-sm mt-2">
          {/* Item 1 */}
          <div className="px-2 py-4 flex gap-3 items-center border-b border-gray-200">
            <Skeleton className="h-10 w-10 rounded-full shrink-0" />
            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>
          {/* Item 2 */}
          <div className="px-2 py-4 flex gap-3 items-center">
            <Skeleton className="h-10 w-10 rounded-full shrink-0" />
            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
