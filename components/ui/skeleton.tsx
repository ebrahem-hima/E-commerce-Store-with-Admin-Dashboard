import { cn } from "@/lib/userWishlistFn";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-[#0000008f]", className)}
      {...props}
    />
  );
}

export { Skeleton };
