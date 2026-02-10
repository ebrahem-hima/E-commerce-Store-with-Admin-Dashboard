import { Skeleton } from "@/components/ui/skeleton";

export function CartListSkeleton() {
  return (
    <ul className="flex flex-col gap-4 w-full">
      {[1, 2, 3].map((i) => (
        <li
          key={i}
          className="grid grid-cols-[40px_1fr_auto_auto] items-center gap-4"
        >
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-6" />
          <Skeleton className="h-4 w-12" />
        </li>
      ))}
    </ul>
  );
}
