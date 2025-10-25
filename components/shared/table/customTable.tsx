import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { IoIosClose } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { tableType } from "../../../types/tabletypes";
import TableBodyData from "./TableBodyData";

const CustomTable = ({ dataBody, titles }: tableType) => {
  // const cartData = [
  //   {
  //     product_id: "123",
  //     img: "/images/productImages/Controller.webp",
  //     name: "ProductName",
  //     price: 1200,
  //     count: 1,
  //   },
  //   {
  //     product_id: "12345",
  //     img: "/images/productImages/Controller.webp",
  //     name: "ProductName2",
  //     price: 1200,
  //     count: 4,
  //   },
  // ];
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
              {/* <TableHead>Price</TableHead>
              <TableHead className="w-[70px]">Quantity</TableHead>
              <TableHead className="text-right">Subtotal</TableHead> */}
            </TableRow>
          </TableHeader>
          {/* <TableBody className="w-full"> */}
          <TableBodyData dataBody={dataBody} />
          {/* {cartData.map((item) => (
              <TableRow key={item.product_id}>
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
            ))} */}
          {/* </TableBody> */}
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
