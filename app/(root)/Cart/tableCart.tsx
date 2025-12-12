import React, { ChangeEvent, useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { deleteProductCart, typeProduct } from "@/types/productTypes";
import { IoIosClose } from "react-icons/io";
import PriceDisplay from "@/components/shared/priceDisplay";
import { Input } from "@/components/ui/input";
import { useProductContext } from "@/context/productContext";

type typeCount = { count: number; id: string }[];

interface Props {
  handleDeleteProductCart: ({ ID, name }: deleteProductCart) => void;
  cartData: typeProduct[];
  count: typeCount;
  setCount: Dispatch<SetStateAction<typeCount>>;
  setDisableBtn: Dispatch<SetStateAction<boolean>>;
  setIsCartDataUpdated: Dispatch<SetStateAction<boolean>>;
  // isCartDataUpdated: boolean;
  disableBtn: boolean;
}

interface handleCountType {
  item: typeProduct;
  e: ChangeEvent<HTMLInputElement>;
}

export function TableCart({
  cartData,
  handleDeleteProductCart,
  count,
  setCount,
  setDisableBtn,
  setIsCartDataUpdated,
}: Props) {
  const { push } = useRouter();
  const { userId, setCartData } = useProductContext();
  const [userData, setUserData] = useState<typeProduct[]>([]);

  useEffect(() => {
    setUserData(cartData);
  }, [cartData]);

  if (!userData) return null;
  const handleCount = ({ item, e }: handleCountType) => {
    const exist = count.some((countItem) => countItem.id === item.product_id);
    setCount((prev) =>
      exist
        ? prev.map((countItem) =>
            countItem.id === item.product_id
              ? { ...countItem, count: Number(e.target.value) }
              : countItem
          )
        : [
            ...prev,
            {
              count: Number(e.target.value),
              id: item.product_id || "",
            },
          ]
    );
    setDisableBtn(false);
  };
  return (
    <div>
      {userData.length > 0 ? (
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
            {userData.map((item) => {
              return (
                <TableRow key={item.product_id}>
                  <TableCell className="w-[200px] font-medium">
                    <div className="flex items-center gap-3 relative">
                      <Image
                        src={item.img}
                        alt="product-img"
                        width={100}
                        height={100}
                        priority
                        className="w-auto h-auto"
                      />
                      <IoIosClose
                        size={23}
                        onClick={() =>
                          handleDeleteProductCart({
                            ID: item.product_id || "",
                            name: item.name,
                            setIsCartDataUpdated,
                            userId: userId || "",
                            setCartData,
                          })
                        }
                        className="absolute rounded-full top-0 left-0 bg-primary text-white cursor-pointer"
                      />
                      <span className="line-clamp-2 w-[200px]">
                        {item.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="w-[120px]">
                    <PriceDisplay
                      discount={item.discount}
                      price={item.price}
                      discountType={item.discount_type}
                    />
                  </TableCell>
                  <TableCell className="w-fit">
                    <Input
                      onChange={(e) => handleCount({ item, e })}
                      // value={
                      //   count.find((c) => c.id === item.product_id)?.count ??
                      //   item.count
                      // }
                      type="number"
                      defaultValue={item.count}
                      min={1}
                    />
                  </TableCell>
                  <TableCell className="text-center w-[50px]">
                    <PriceDisplay
                      discount={item.discount}
                      price={item.price}
                      discountType={item.discount_type}
                      count={item.count}
                      // count={count[idx].count}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <span className="text-gray-500 text-lg mb-4">
            Your cart is empty. Start shopping now!
          </span>
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

// export default tableCart;
