"use client";

import Image from "next/image";
import { HiMiniHeart, HiOutlineHeart } from "react-icons/hi2";
import "../Card.css";
import { useProductContext } from "../../../../context/productContext";
import { useEffect, useState } from "react";
import {
  addWishList,
  handleDeleteItemWishList,
  isProductWishList,
} from "@/lib/userWishlistFn";
import { typeProduct } from "@/types/productTypes";

interface Props {
  item: typeProduct;
  isGrid?: boolean;
}

const ImgProduct = ({ item, isGrid }: Props) => {
  const { name, discount, price, discount_type, img } = item;
  const discountPercentage = ((discount! / price) * 100).toFixed(0);
  const { userId, setWishListStatus } = useProductContext();
  const [isWishList, setIsWishList] = useState(false);
  useEffect(() => {
    isProductWishList({
      setIsWishList,
      item,
    });
  }, [item, userId]);

  return (
    <div
      className={`group relative h-full w-full overflow-hidden flex-center ${
        isGrid && "w-1/2"
      } `}
    >
      <div className="relative w-[130px] h-[130px]">
        <Image
          src={img}
          alt={`img-${name}`}
          fill
          className="object-contain"
          priority
          draggable={false}
        />
      </div>

      <div className="flex flex-col absolute items-center top-2 right-2">
        {isWishList ? (
          <HiMiniHeart
            onClick={(e) =>
              handleDeleteItemWishList({
                e,
                item,
                setWishListStatus,
                setIsWishList,
              })
            }
            size={28}
            className={`${
              isWishList ? "text-primary" : "hover:bg-primary hover:text-white"
            } iconImg duration-300 p-0.5 rounded-lg`}
          />
        ) : (
          <HiOutlineHeart
            onClick={(e) => {
              addWishList({
                e,
                item,
                userId: userId || "",
                setWishListStatus,
                setIsWishList,
              });
            }}
            size={28}
            className="iconImg hover:bg-primary hover:text-white duration-300 p-0.5 rounded-sm"
          />
        )}
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
