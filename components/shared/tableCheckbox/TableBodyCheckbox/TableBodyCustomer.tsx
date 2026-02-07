"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { TableBody, TableRow, TableCell } from "@/components/ui/table";
import { SelectCheckBox } from "@/types/typeAliases";
import { useRouter } from "next/navigation";

export interface Customer {
  id: string;
  name: string;
  email: string;
  order_count: number;
  total_spent: number;
}

interface Props {
  dataBody: Customer[];
  selectCheckBox: SelectCheckBox[];
  handleCheckboxChange: (id: string, checked: boolean) => void;
}

const TableBodyCustomer = ({
  dataBody,
  selectCheckBox,
  handleCheckboxChange,
}: Props) => {
  const { push } = useRouter();

  return (
    <TableBody>
      {dataBody.map((c) => (
        <TableRow
          onClick={() => push(`/admin/customers/customerInformation/${c.id}`)}
          key={c.id}
          className="h-10 cursor-pointer"
        >
          <TableCell>
            <Checkbox
              checked={selectCheckBox.some(
                (check) => check.ID === c.id && check.value,
              )}
              onClick={(e) => e.stopPropagation()}
              onCheckedChange={(checked) =>
                handleCheckboxChange(c.id, checked as boolean)
              }
            />
          </TableCell>
          <TableCell className="flex items-center gap-2">
            <span className="w-10 h-10 bg-[#777] flex-center rounded-full text-white text-[18px] font-medium">
              {c.name.charAt(0).toUpperCase()}
            </span>
            <span>{c.name}</span>
          </TableCell>
          <TableCell className="overflow-hidden">{c.email}</TableCell>
          <TableCell>{c.order_count}</TableCell>
          <TableCell>{c.total_spent} EGP</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableBodyCustomer;
