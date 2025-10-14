import { cn } from "@/lib/userWishlistFn";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/30", className)}
      {...props}
    />
  );
}

export { Skeleton };
