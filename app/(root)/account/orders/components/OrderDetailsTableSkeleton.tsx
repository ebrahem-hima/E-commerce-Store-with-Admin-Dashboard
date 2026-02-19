import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface PropsSkeleton {
  columns?: number;
  rows?: number;
}

export const OrderDetailsTableSkeleton = ({}: PropsSkeleton) => {
  return (
    <Table className="min-w-115">
      <TableHeader>
        <TableRow>
          {Array.from({ length: 3 }).map((_, idx) => (
            <TableHead key={idx}>
              <Skeleton className="h-4 w-24" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 3 }).map((_, rowIdx) => (
          <TableRow key={rowIdx} className="text-medium">
            {Array.from({ length: 5 }).map((_, colIdx) => (
              <TableCell key={colIdx}>
                {colIdx === 0 ? (
                  <Skeleton className="h-18 w-30 rounded-md" />
                ) : (
                  <Skeleton className="h-5 w-20" />
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderDetailsTableSkeleton;
