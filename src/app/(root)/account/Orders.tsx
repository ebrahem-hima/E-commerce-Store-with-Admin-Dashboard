import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { useProductContext } from "../../../../context/productContext";
import { userOrdersType } from "../../../../types/fetchType";

const Orders = () => {
  const { userOrders } = useProductContext();
  const [userOrder, setUserOrder] = useState<userOrdersType[]>([]);

  useEffect(() => {
    setUserOrder(userOrders);
  }, []);

  return (
    <div>
      {userOrder.length > 0 ? (
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="w-[70px]">Quantity</TableHead>
              <TableHead className="text-right">Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full">
            {userOrder.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="w-[200px] font-medium">
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.img}
                      alt="product-img"
                      width={100}
                      height={100}
                      className=""
                    />
                    <span className="line-2 w-[200px]">{item.name}</span>
                  </div>
                </TableCell>
                <TableCell className="w-[100px]">{item.price}</TableCell>
                <TableCell className="w-fit">{item.count}</TableCell>
                <TableCell className="text-center w-[50px]">
                  {item.price * (item.count || 0)}
                </TableCell>
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

export default Orders;
