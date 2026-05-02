"use client";

import { IoCartOutline } from "react-icons/io5";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useProductContext } from "../../../context/productContext";
import { handleDeleteProductCart } from "@/lib/userCartFn";
import { CartSkeleton } from "../../Loaders/CartSkeleton";
import ShopCartContent from "./ShopCartContent";

export function ShopCart() {
  const {
    cartData,
    openCart,
    setOpenCart,
    setCartData,
    userId,
    total,
    userCartLoading,
  } = useProductContext();
  const count = cartData.length;
  return (
    <Sheet open={openCart} onOpenChange={setOpenCart}>
      <div onClick={() => setOpenCart(true)} className="relative inline-block">
        <IoCartOutline size={25} className="cursor-pointer" />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-white text-[10px] shadow-sm">
            {count}
          </span>
        )}
      </div>
      <SheetContent isStrongOverlay>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        {userCartLoading ? (
          <CartSkeleton />
        ) : (
          <ShopCartContent
            cartData={cartData}
            userId={userId}
            total={total}
            handleDeleteProductCart={handleDeleteProductCart}
            setCartData={setCartData}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}

export default ShopCart;
