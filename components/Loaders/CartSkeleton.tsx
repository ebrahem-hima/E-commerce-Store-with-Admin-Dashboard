import { Skeleton } from "../ui/skeleton";

export function CartSkeleton() {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col gap-4 h-103.75 mt-3 overflow-hidden mb-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="grid grid-cols-[80px_1fr_auto] items-center gap-3 border-t border-[#d4d3d3] pt-3"
          >
            <Skeleton className="h-15 w-20 rounded-md" />

            <div className="flex flex-col gap-2">
              <Skeleton className="h-3 w-[85%]" />
              <Skeleton className="h-3 w-[60%]" />

              <div className="flex gap-2">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>

            <Skeleton className="h-6 w-6 rounded-md" />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 border-t border-[#77777754] pt-1 mt-auto">
        <div className="flex justify-between items-center py-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-16" />
        </div>

        <Skeleton className="h-10 w-full rounded-md" />

        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  );
}
