import React from "react";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { tableType } from "../../../types/tabletypes";
import TableBodyData from "./TableBodyData";

const CustomTable = ({ dataBody, titles }: tableType) => {
  return (
    <>
      {dataBody.length > 0 ? (
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              {titles &&
                titles.map((title, idx) => (
                  <TableHead key={idx}>{title.title}</TableHead>
                ))}
            </TableRow>
          </TableHeader>
          <TableBodyData dataBody={dataBody} />
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-gray-500 text-lg mb-4">
            Your cart is empty. Start shopping now!
          </div>
        </div>
      )}
    </>
  );
};

export default CustomTable;
