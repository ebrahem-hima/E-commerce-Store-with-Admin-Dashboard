import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_ROWS = 3;

export function TableCartSkeleton() {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">item</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="w-17.5">Quantity</TableHead>
          <TableHead className="text-right">Subtotal</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="w-full">
        {Array.from({ length: SKELETON_ROWS }).map((_, idx) => (
          <TableRow key={idx}>
            {/* ITEM */}
            <TableCell className="w-50 font-medium">
              <div className="flex items-center gap-3 relative">
                {/* image */}
                <Skeleton className="w-18 h-18 rounded-md" />

                {/* name */}
                <Skeleton className="h-4 w-35" />
              </div>
            </TableCell>

            {/* PRICE */}
            <TableCell className="w-30">
              <Skeleton className="h-4 w-20" />
            </TableCell>

            {/* QUANTITY */}
            <TableCell className="w-fit p-0">
              <Skeleton className="h-10 w-20 rounded-md" />
            </TableCell>

            {/* SUBTOTAL */}
            <TableCell className="text-center w-12.5">
              <Skeleton className="h-4 w-16 mx-auto" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
