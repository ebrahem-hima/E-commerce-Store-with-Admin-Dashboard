"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProductContext } from "@/context/productContext";
import { useRouter } from "next/navigation";
import { typeUserOrder } from "@/types/productTypes";

const Page = () => {
  const { userOrders } = useProductContext();
  const [userOrder, setUserOrder] = useState<typeUserOrder[]>([]);

  useEffect(() => {
    setUserOrder(userOrders);
  }, [userOrders]);
  const { push } = useRouter();

  return (
    <div className="h-[450px] overflow-y-auto">
      {userOrder.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order_Code</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="cursor-pointer hover:b-[#e4dfdf]">
            {userOrder.map((item) => (
              <TableRow
                onClick={() => push(`/account/orders/${item.order_code}`)}
                key={item.order_code}
              >
                <TableCell>{item.order_code}</TableCell>
                <TableCell>{item.order_status}</TableCell>
                <TableCell className="w-fi">{item.total}</TableCell>
                <TableCell className="w-fi">{item.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-gray-500 text-lg mb-4">
            Your cart is empty. Start shopping now!
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
