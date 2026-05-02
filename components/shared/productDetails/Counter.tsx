"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddToCart } from "@/lib/userCartFn";
import { typeProduct } from "../../../types/productTypes";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useMemo, useState } from "react";
import { useProductContext } from "@/context/productContext";
import { useSearchParams } from "next/navigation";
import HeartWishListButton from "../Card/ProductCard/HeartWishListButton";
import { IfProductExist } from "@/lib/utils";
import QuantityControl from "./QuantityControl";
import { toast } from "sonner";

interface Props {
  item: typeProduct;
}

const Counter = ({ item }: Props) => {
  const { stock } = item;
  const { userId, cartData, setCartData, setOpenCart } = useProductContext();
  const [quantity, setQuantity] = useState(1);

  const searchParams = useSearchParams();

  const getOptions = useMemo(() => {
    const options: { optionTitle: string; values: string[] }[] = [];
    searchParams.forEach((values, key) => {
      options.push({ optionTitle: key, values: [values] });
    });
    return options;
  }, [searchParams]);

  const isExist = IfProductExist(cartData, getOptions, item);

  return (
    <div className="flex items-center gap-2">
      <QuantityControl
        quantity={quantity}
        setQuantity={setQuantity}
        stock={item.stock}
      />

      <Button
        size="sm"
        disabled={stock === 0}
        className={`w-fit hover:opacity-85! text-[15px] px-3 rounded-sm 
          ${
            stock === 0
              ? "bg-red-900"
              : isExist
                ? "bg-red-900 hover:bg-[#9c2929] duration-200"
                : "bg-black hover:bg-[#000000ea] duration-200"
          }
          `}
        onClick={(e) => {
          e.preventDefault();
          if (isExist) {
            setOpenCart(true);
          } else {
            if (
              getOptions.length === 0 &&
              item.options &&
              item.options?.length > 0
            ) {
              toast.info("please choose option");
              return;
            }
            AddToCart({
              userId: userId || "",
              setCartData,
              cartData,
              item,
              getOptions,
              quantity,
              isExist,
            });
          }
        }}
      >
        {/* Buy Now */}
        {stock === 0 ? (
          <span>Out of Stock</span>
        ) : isExist ? (
          <div className="flex gap-2 items-center text-sm">
            <span>View in Cart</span>
            <MdOutlineAddShoppingCart className="h-5! w-5!" />
          </div>
        ) : (
          <div className="flex gap-2 items-center text-sm">
            <span>Add to Cart</span>
            <MdOutlineAddShoppingCart className="h-5.5! w-5.5!" />
          </div>
        )}
      </Button>
      <HeartWishListButton isProductSlider={false} item={item} />
    </div>
  );
};

export default Counter;
