"use client";

import { IoCartOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useProductContext } from "../../context/productContext";
import { handleDeleteProductCart } from "@/lib/userCartFn";

export function ShopCart() {
  const { cartData, setIsCartDataUpdated } = useProductContext();

  const subtotal = cartData.reduce(
    (acc, curr) => acc + (curr.count || 1) * curr.price,
    0
  );
  return (
    <Sheet>
      <SheetTrigger asChild>
        <IoCartOutline size={25} className="cursor-pointer" />
      </SheetTrigger>
      <SheetContent isStrongOverlay>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 h-[360px] mt-3 overflow-y-auto scrollbar-hide mb-1">
          {cartData.length > 0 ? (
            cartData.map((item) => (
              <div
                key={item.product_id}
                className="grid grid-cols-[80px_1fr_auto] gap-3 border-t border-[#d4d3d3] pt-3"
              >
                <div className="relative">
                  <Image
                    src={item.img}
                    alt={`img` + item.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="text-sm">
                  <span className="font-medium line-clamp-2 break-all text-sm">
                    {item.name}
                  </span>
                  <span>
                    <span className="font-medium">Price:</span> ${item.price}{" "}
                    <span>x</span> {item.count || 1}
                  </span>
                  {/* Options */}
                  <div className="flex flex-wrap gap-1 text-sm">
                    {item.options &&
                      item.options?.length > 0 &&
                      item.options.map((option) => (
                        <div
                          key={option.optionTitle}
                          className="flex items-center gap-1"
                        >
                          <span className="font-medium">
                            {option.optionTitle}:
                          </span>
                          {option.values.map((val) => (
                            <span key={val}>{val}</span>
                          ))}
                        </div>
                      ))}
                  </div>
                </div>
                <Trash2
                  className="duration-300 p-1 hover:duration-300 hover:text-white active:text-white rounded-sm hover:bg-primary active:bg-primary cursor-pointer"
                  size={30}
                  onClick={() =>
                    handleDeleteProductCart({
                      ID: item.product_id,
                      name: item.name,
                      setIsCartDataUpdated,
                    })
                  }
                />
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center text-primary font-medium text-md">
              There are no products in your cart.
            </div>
          )}
        </div>
        <SheetFooter className="flex !flex-col gap-2 border-t border-[#77777754] pt-1">
          <div className="flex-between">
            <span className="font-poppins text-[18px]">Subtotal:</span>
            <span>${subtotal}</span>
          </div>
          <Link href="/Cart" className="w-full">
            <SheetClose asChild>
              <Button
                asChild
                type="submit"
                className="w-full bg-white text-primary hover:bg-[#e6e1e1] !mr-0"
              >
                <span>View Cart</span>
              </Button>
            </SheetClose>
          </Link>

          <SheetClose asChild>
            <Link href="/checkout" className="w-full">
              <Button asChild className="w-full">
                <span>Checkout</span>
              </Button>
            </Link>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default ShopCart;
