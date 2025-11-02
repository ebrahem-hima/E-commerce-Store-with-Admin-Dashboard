"use client";

import Image from "next/image";
import { HiMiniHeart, HiOutlineHeart } from "react-icons/hi2";
import "../Card.css";
import { Trash2 } from "lucide-react";
import { useProductContext } from "../../../../context/productContext";
import { useEffect, useState } from "react";
import {
  addWishList,
  handleDeleteItemWishList,
  isProductWishList,
} from "@/lib/userWishlistFn";
import { typeProduct } from "@/types/productTypes";

interface Props {
  type?: string;
  item: typeProduct;
  isGrid?: boolean;
}

const ImgProduct = ({ item, type, isGrid }: Props) => {
  const { name, discount, price, discount_type, img } = item;
  const discountPercentage = ((discount! / price) * 100).toFixed(0);
  const { setWishListStatus, userId } = useProductContext();
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
      } pointer-events-none`}
    >
      <Image
        src={img}
        alt={`img-${name}`}
        className="object-cover w-auto h-auto"
        width={100}
        height={100}
        priority
      />
      <div className="flex flex-col absolute items-center top-2 right-2">
        {type === "wishList" ? (
          <Trash2
            onClick={async (e) => {
              e.stopPropagation();
              e.preventDefault();
              await handleDeleteItemWishList({ item });
              setWishListStatus((prev) => !prev);
            }}
            className="iconImg hover:bg-primary hover:text-white duration-300 p-0.5 rounded-sm"
            size={28}
          />
        ) : isWishList ? (
          <HiMiniHeart
            onClick={async (e) => {
              e.stopPropagation();
              e.preventDefault();
              await addWishList(item, "remove", userId || "");
              setIsWishList(false);
            }}
            size={28}
            className={`${
              isWishList ? "text-primary" : "hover:bg-primary hover:text-white"
            } iconImg duration-300 p-0.5 rounded-lg`}
          />
        ) : (
          <HiOutlineHeart
            onClick={async (e) => {
              e.stopPropagation();
              e.preventDefault();
              await addWishList(item, "add", userId || "");
              setIsWishList(true);
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
