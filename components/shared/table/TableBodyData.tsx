import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import { tableBodyType } from "../../../types/tabletypes";
import { TopMemberType, TopProductType } from "../../../types/admintypes";

interface Prop {
  dataBody: tableBodyType;
}

function isTopMember(value: tableBodyType): value is TopMemberType[] {
  console.log("topMemberValue", value);
  return value[0].type === "topMember";
}
function isTopProduct(value: tableBodyType): value is TopProductType[] {
  console.log("topProductValue", value);
  return value[0].type === "topProduct";
}

const TableBodyData = ({ dataBody }: Prop) => {
  if (isTopMember(dataBody)) {
    return (
      <TableBody>
        {dataBody.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.date}</TableCell>
            <TableCell>{item.amount}</TableCell>
            <TableCell>{item.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  }
  if (isTopProduct(dataBody)) {
    return (
      <TableBody>
        {dataBody.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell>{item.unitSold}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  }
  return null;
};

export default TableBodyData;
