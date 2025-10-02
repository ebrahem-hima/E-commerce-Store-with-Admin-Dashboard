"use client";

import React, { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { supabase } from "@/supabase-client";
import { toast } from "sonner";
import { MESSAGES } from "@/lib/message";
import useUserCart from "./useUserCart";
import { useProductContext } from "../../context/productContext";

export function ShopCart() {
  const { setIsProductAdded } = useProductContext();
  const { cartData } = useUserCart();

  const handleDeleteProductCart = async (ID: string, name: string) => {
    try {
      const { error } = await supabase
        .from("user_cart")
        .delete()
        .eq("product_id", ID);
      toast.success(MESSAGES.cart.removed(name));
      if (error) throw error;
      setIsProductAdded((prev) => !prev);
    } catch (error) {
      console.log("error", error);
    }
  };

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
        <div className="flex flex-col gap-4 h-[445px] mt-3 overflow-y-auto scrollbar-hide mb-1">
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
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Color:</span>
                      <span>Red</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Size:</span>
                      <span>M</span>
                    </div>
                  </div>
                </div>
                <Trash2
                  className="duration-300 p-1 hover:duration-300 hover:text-white active:text-white rounded-sm hover:bg-primary active:bg-primary cursor-pointer"
                  size={30}
                  onClick={() =>
                    handleDeleteProductCart(item.product_id, item.name)
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
            <Button
              asChild
              type="submit"
              className="w-full bg-white text-primary hover:bg-[#e6e1e1] !mr-0"
            >
              <span>View Cart</span>
            </Button>
          </Link>
          <Link href="/checkout" className="w-full">
            <Button asChild className="w-full">
              <span>Checkout</span>
            </Button>
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default ShopCart;
