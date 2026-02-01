"use client";

import Image from "next/image";
import { HiMiniHeart, HiOutlineHeart } from "react-icons/hi2";
import "../Card.css";
import { useProductContext } from "../../../../context/productContext";
import { useEffect, useState } from "react";
import { addWishList, isProductWishList } from "@/lib/userWishlistFn";
import { typeProduct } from "@/types/productTypes";
import { Button } from "@/components/ui/button";

interface Props {
  item: typeProduct;
  isGrid?: boolean;
  toggleProducts: (productId: string) => void;
}

const ImgProduct = ({ item, isGrid, toggleProducts }: Props) => {
  const { name, discount, price, discount_type, img } = item;
  const discountPercentage = ((discount! / price) * 100).toFixed(0);
  const { userId } = useProductContext();
  const [isWishList, setIsWishList] = useState(false);

  const handleToggleWishList = async () => {
    const exist = await isProductWishList(item.id);
    setIsWishList(!exist);
  };

  useEffect(() => {
    const isExist = async () => {
      const exist = await isProductWishList(item.id);
      setIsWishList(exist || false);
    };
    isExist();
  }, [item.id]);

  return (
    <div
      className={`group relative h-full w-full overflow-hidden flex-center ${
        isGrid && "w-1/2"
      } `}
    >
      <Image
        src={img}
        alt={`img-${name}`}
        width={200}
        height={200}
        className="object-contain p-6"
        sizes="100%"
        priority
        draggable={false}
      />

      <div className="flex flex-col absolute items-center top-2 right-2">
        <Button
          variant="link"
          className="p-0"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addWishList({
              item,
              userId: userId || "",
            });
            toggleProducts(item.id);
            handleToggleWishList();
          }}
        >
          {isWishList ? (
            <HiMiniHeart size={25} />
          ) : (
            <HiOutlineHeart size={25} />
          )}
        </Button>
      </div>
      {discount !== 0 &&
        (discount_type === "percentage" ? (
          <span className="absolute text-[13px] px-2 py-0.5 top-2 left-2 rounded-sm bg-primary text-white">
            -{discount}%
          </span>
        ) : (
          <span className="absolute text-[13px] px-2 py-0.5 top-2 left-2 rounded-sm bg-primary text-white">
            -{discountPercentage}%
          </span>
        ))}
    </div>
  );
};

export default ImgProduct;
