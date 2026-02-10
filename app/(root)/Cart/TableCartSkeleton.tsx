import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export function TableCartSkeleton() {
  return (
    <div className="w-full">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">
              <Skeleton className="h-4 w-20" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-20" />
            </TableHead>
            <TableHead className="w-17.5">
              <Skeleton className="h-4 w-20" />
            </TableHead>
            <TableHead className="text-right">
              <Skeleton className="h-4 w-20 ml-auto" />
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="w-full">
          {[1, 2, 3].map((row) => (
            <TableRow key={row}>
              <TableCell className="w-50 font-medium">
                <div className="flex items-center gap-3 relative">
                  <Skeleton className="h-20 w-20 rounded-md" />
                  <Skeleton className="absolute h-6 w-6 rounded-full top-0 left-0" />
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </TableCell>

              <TableCell className="w-30">
                <Skeleton className="h-5 w-16" />
              </TableCell>

              <TableCell className="w-fit">
                <Skeleton className="h-10 w-16 rounded-md" />
              </TableCell>

              <TableCell className="text-center w-12.5">
                <Skeleton className="h-5 w-16 mx-auto" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
