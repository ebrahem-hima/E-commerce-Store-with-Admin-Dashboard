"use client";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { typeProduct } from "../../../../types/productTypes";
import { supabase } from "@/supabase-client";
import { IoIosClose } from "react-icons/io";
import Link from "next/link";
import { toast } from "sonner";
import { MESSAGES } from "@/lib/message";
import useUserCart from "../../../../components/shared/useUserCart";

type typeCount = { count: number; id: string }[];

const Page = () => {
  const [count, setCount] = useState<typeCount>([]);
  const [disableBtn, setDisableBtn] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const { push } = useRouter();

  const updateProduct = async () => {
    try {
      for (const product of count) {
        const { error } = await supabase
          .from("user_cart")
          .update({ count: product.count })
          .eq("product_id", product.id);
        if (error) console.log(error);
      }
      toast.success(MESSAGES.table.tableUpdate);
      setDisableBtn(true);
    } catch (error) {
      if (error) console.log(error);
    }
  };

  const { cartData } = useUserCart<boolean, boolean>(refresh, disableBtn);

  const handleDeleteProduct = async (ID: string, Name: string) => {
    const { error } = await supabase
      .from("user_cart")
      .delete()
      .eq("product_id", ID);
    if (error) console.log(error);
    setRefresh((prev) => !prev);
    toast.success(MESSAGES.table.tableRemove(Name));
  };
  const total = cartData.reduce(
    (acc, curr) => acc + (curr.count || 1) * curr.price,
    0
  );
  return (
    <div className="grid grid-cols-[350px_1fr] max-lg:grid-cols-1 gap-4 max-lg:grid-flow-dense">
      <div className="flex flex-col gap-4 max-lg:order-2">
        <div className=" border border-[#000000] rounded-[4px] py-4 px-2 h-fit flex flex-col gap-4">
          <p className="font-poppins font-medium text-[18px] tracking-[0.4px]">
            Cart Total
          </p>
          <div className="flex flex-col gap-2">
            <p className="flex-between text-sm">
              <span>Subtotal:</span>
              <span>${total}</span>
            </p>
            <div className="w-full h-[1px] bg-[#999]" />
            <p className="flex-between text-sm">
              <span>Total:</span>
              <span>${total}</span>
            </p>
          </div>
          <Button
            type="submit"
            variant="primary"
            className="w-fit mx-auto"
            onClick={() =>
              disableBtn
                ? push(`/checkout`)
                : toast.error("You must submit changes")
            }
          >
            Process to checkout
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <Input type="text" placeholder="Add Coupon" className="" />
          <Button variant="primary" size="sm">
            Apply Coupon
          </Button>
        </div>
      </div>
      <div className="overflow-auto min-h-[50px] max-h-screen max-md:order-1">
        <TableDemo
          count={count}
          setCount={setCount}
          cartData={cartData}
          handleDeleteProduct={handleDeleteProduct}
          setDisableBtn={setDisableBtn}
        />
        <div className="flex-between mt-6">
          <Button
            asChild
            variant="white"
            className="border border-[#999] hover:border-[#e2e1e193] hover:bg-[#e2e1e193] w-fit"
          >
            <Link href={`/`}>Return To Shop</Link>
          </Button>
          <Button
            disabled={disableBtn}
            variant="white"
            className="border border-[#999] hover:border-[#bdbbbb93] hover:bg-[#d8d4d493] w-fit"
            onClick={() => updateProduct()}
          >
            Update Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;

interface Props {
  handleDeleteProduct: (ID: string, Name: string) => void;
  cartData: typeProduct[];
  count: typeCount;
  setCount: Dispatch<SetStateAction<typeCount>>;
  setDisableBtn: Dispatch<SetStateAction<boolean>>;
}

export function TableDemo({
  cartData,
  handleDeleteProduct,
  count,
  setCount,
  setDisableBtn,
}: Props) {
  const { push } = useRouter();
  // const [count, setCount] = useState<typeCount>({});
  // console.log("count", count);
  return (
    <div>
      {cartData.length > 0 ? (
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">item</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="w-[70px]">Quantity</TableHead>
              <TableHead className="text-right">Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full">
            {cartData.map((item) => (
              <TableRow key={item.product_id}>
                <TableCell className="w-[200px] font-medium">
                  <div className="flex items-center gap-3 relative">
                    <Image
                      src={item.img}
                      alt="product-img"
                      width={100}
                      height={100}
                      className=""
                    />
                    <IoIosClose
                      size={23}
                      onClick={() =>
                        handleDeleteProduct(item.product_id, item.name)
                      }
                      className="absolute rounded-full top-0 left-0 bg-primary text-white cursor-pointer"
                    />
                    <span className="line-clamp-2 w-[200px]">{item.name}</span>
                  </div>
                </TableCell>
                <TableCell className="w-[100px]">{item.price}</TableCell>
                <TableCell className="w-fit">
                  <Input
                    onChange={(e) => {
                      setCount((prev) => [
                        ...prev,
                        { count: Number(e.target.value), id: item.product_id },
                      ]);
                      setDisableBtn(false);
                    }}
                    // value={item.count}
                    type="number"
                    defaultValue={item.count}
                    min={1}
                  />
                </TableCell>
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
          <Button
            type="submit"
            onClick={() => push("/")}
            className="px-6 py-2 bg-primary text-white rounded-sm hover:bg-hover transition"
          >
            Go to Shop
          </Button>
        </div>
      )}
    </div>
  );
}
