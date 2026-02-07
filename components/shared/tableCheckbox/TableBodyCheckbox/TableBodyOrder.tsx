"use client";

import { TableBody, TableRow, TableCell } from "@/components/ui/table";
import { TypeUserOrder } from "@/types/adminTableCheckboxtype";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { SelectCheckBox } from "@/types/typeAliases";
import { Checkbox } from "@/components/ui/checkbox";
import { typeEditValue } from "@/types/adminType";

interface Props {
  dataBody: TypeUserOrder[];
  selectCheckBox: SelectCheckBox[];
  handleCheckboxChange: (id: string | number, checked: boolean) => void;
  Edit?: boolean;
  setEditValue?: Dispatch<SetStateAction<typeEditValue[]>>;
}

const TableBodyOrder = ({
  dataBody,
  selectCheckBox,
  handleCheckboxChange,
  Edit,
  setEditValue,
}: Props) => {
  console.log("dataBody", dataBody);
  const { push } = useRouter();

  const getSelected = selectCheckBox.map((item) => item.ID);

  const handleEdit = (ID: string, status: string) => {
    setEditValue?.((prev) => {
      const existing = prev.find((item) => item.ID === ID);
      if (existing) {
        return prev.map((item) =>
          item.ID === ID ? { ...item, status } : item,
        );
      } else {
        return [...prev, { ID, status }];
      }
    });
  };

  const orderStatusClasses: Record<string, string> = {
    Pending: "bg-[#F99600] text-white",
    Shipped: "bg-[#5A607F] text-white",
    Delivered: "bg-[#1E5EFF] text-white",
  };

  return (
    <TableBody>
      {dataBody.map((o) => (
        <TableRow
          onClick={() => push(`/admin/orders/orderDetails/${o.order_code}`)}
          key={o.id}
          className="h-10 cursor-pointer"
        >
          <TableCell>
            <Checkbox
              checked={selectCheckBox.some(
                (check) => check.ID === o.id && check.value,
              )}
              onClick={(e) => e.stopPropagation()}
              onCheckedChange={(checked) =>
                handleCheckboxChange(o.id, checked as boolean)
              }
            />
          </TableCell>
          <TableCell>{o.order_code}</TableCell>
          <TableCell>{o.date}</TableCell>
          <TableCell>{o.customer}</TableCell>
          <TableCell>{o.payment_status}</TableCell>
          <TableCell>
            {getSelected.includes(o.id) && Edit ? (
              <select
                onClick={(e) => e.stopPropagation()}
                className={`px-2 py-1 rounded bg-transparent border border-gray-300 ${
                  orderStatusClasses[o.order_status] || "text-gray-500"
                }`}
                onChange={(e) => handleEdit(o.id, e.target.value)}
              >
                <option value={o.order_status}>{o.order_status}</option>
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            ) : (
              <span
                className={`px-2 py-1 rounded ${
                  orderStatusClasses[o.order_status] || "bg-gray-500"
                }`}
              >
                {o.order_status}
              </span>
            )}
          </TableCell>
          <TableCell className="text-right font-medium">${o.total}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableBodyOrder;
