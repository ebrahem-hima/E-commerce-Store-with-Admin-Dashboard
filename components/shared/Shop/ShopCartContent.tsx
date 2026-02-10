import { typeProduct } from "@/types/productTypes";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { Trash2 } from "lucide-react";
import PriceDisplay from "../priceDisplay";

interface Props {
  cartData: typeProduct[];
  userId: string | null;
  total: number;
  handleDeleteProductCart: (args: {
    ID: string;
    name: string;
    userId: string;
    setCartData: Dispatch<SetStateAction<typeProduct[]>>;
  }) => void;
  setCartData: Dispatch<SetStateAction<typeProduct[]>>;
}

const ShopCartContent = ({
  cartData,
  userId,
  total,
  handleDeleteProductCart,
  setCartData,
}: Props) => {
  return (
    <div>
      <div className="flex flex-col gap-4 h-103.75 mt-3 overflow-y-auto scrollbar-hide mb-1">
        {cartData.length > 0 ? (
          cartData.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[80px_1fr_auto] items-center gap-3 border-t border-[#d4d3d3] pt-3"
            >
              <div className="relative">
                <Image
                  src={item.img}
                  alt={`img` + item.name}
                  height={100}
                  width={100}
                  priority
                  className="object-contain"
                />
              </div>
              <div className="text-sm">
                <span className="font-medium line-clamp-2 break-all text-sm">
                  {item.name}
                </span>
                <span>
                  <PriceDisplay
                    price={item.price}
                    discount={item.discount}
                    discountType={item.discount_type}
                  />
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
                        {(option.values || []).map((val) => (
                          <span key={val}>{val}</span>
                        ))}
                      </div>
                    ))}
                </div>
              </div>
              <Trash2
                className="cursor-pointer"
                size={22}
                onClick={() =>
                  handleDeleteProductCart({
                    ID: item.id || "",
                    name: item.name,
                    userId: userId || "",
                    setCartData,
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
      <SheetFooter className="flex flex-col! gap-2 border-t border-[#77777754] pt-1">
        <div className="flex-between">
          <span className="font-poppins text-[18px]">Subtotal:</span>
          <span>${total}</span>
        </div>
        <Link href="/Cart" className="w-full">
          <SheetClose asChild>
            <Button
              asChild
              type="submit"
              className="w-full bg-white text-primary hover:bg-[#e6e1e1] mr-0!"
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
    </div>
  );
};

export default ShopCartContent;
