import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import { tableBodyType } from "../../../types/tabletypes";
import { TopMemberType, TopProductType } from "../../../types/admintypes";

interface Prop {
  dataBody: tableBodyType;
}

function isTopMember(value: tableBodyType): value is TopMemberType[] {
  return value && value[0].type === "topMember";
}
function isTopProduct(value: tableBodyType): value is TopProductType[] {
  return value && value[0].type === "topProduct";
}

const TableBodyData = ({ dataBody }: Prop) => {
  if (isTopMember(dataBody)) {
    <TableBody>
      {dataBody.map((item) => (
        <TableRow key={item.id}>
          <TableCell>{item.name}</TableCell>
          <TableCell className="w-[100px]">{item.date}</TableCell>
          <TableCell className="w-fit">{item.amount}</TableCell>
          <TableCell className="text-center w-[50px]">{item.status}</TableCell>
        </TableRow>
      ))}
    </TableBody>;
  }
  if (isTopProduct(dataBody)) {
    <TableBody>
      {dataBody.map((item) => (
        <TableRow key={item.id}>
          <TableCell>{item.name}</TableCell>
          <TableCell className="w-fit">{item.price}</TableCell>
          <TableCell className="text-center w-[50px]">
            {item.unitSold}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>;
  }
  return null;
};

export default TableBodyData;
