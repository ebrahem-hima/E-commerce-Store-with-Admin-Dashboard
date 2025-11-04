"use client";
import React, { useEffect, useState } from "react";
import { typeProduct } from "../../../types/productTypes";
import { Star } from "lucide-react";

import { useProductContext } from "../../../context/productContext";
import "../Card/Card.css";
import { usePathname, useRouter } from "next/navigation";
import { isInWishList } from "@/lib/userWishlistFn";
import { iconsDescription } from "../../../constant/index";
import Counter from "./Counter";
import Options from "./Options";

type optionsType = { optionTitle: string; values: string[] };

const DescriptionProductDetails = ({ item }: { item: typeProduct }) => {
  const {
    name,
    description,
    price,
    discount,
    options,
    rate,
    active,
    discount_type,
  } = item;
  const [count, setCount] = useState(1);
  const [getOptions, setGetOptions] = useState<optionsType[]>([]);
  const [heart, setHeart] = useState(false);
  const { replace } = useRouter();
  const pathName = usePathname();
  const {
    userId,
    cartData,
    setCartData,
    setIsCartDataUpdated,
    setWishListStatus,
  } = useProductContext();

  useEffect(() => {
    isInWishList({ item, setHeart });
  }, [item]);

  useEffect(() => {
    const getURl = getOptions.map(
      ({ optionTitle, values }) => `${optionTitle + "=" + values}`
    );
    replace(`?${getURl}`, { scroll: false });
  }, [getOptions, pathName, replace]);

  return (
    <div className="flex flex-col gap-4">
      {/* Name + Price + Rate */}
      <div className="flex flex-col gap-2">
        <span className="font-inter not-italic font-semibold text-2xl">
          {name}
        </span>
        {/* Reviews + Stock */}
        <div className="text-[#999] font-poppins text-sm flex items-center gap-2">
          <div className="flex items-center">
            {[1, 2, 3, 4].map((start) => (
              <Star key={start} size={18} />
            ))}
          </div>
          <span>({rate}) Reviews | </span>
          {active ? (
            <span className="text-[#47B486] font-poppins font-normal text-sm">
              In Stock
            </span>
          ) : (
            <span className="text-red-500 ">Out of Stock</span>
          )}
        </div>
        {/* Price */}
        <span className="font-inter font-normal text-2xl tracking-[0.03em]">
          {discount ? (
            discount_type === "percentage" ? (
              <div className="flex items-center gap-2">
                <span>${price - price * (1 / discount)}</span>
                <span className="line-through text-[#777]">${price}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>${price - discount}</span>
                <span className="line-through text-[#777]">${price}</span>
              </div>
            )
          ) : (
            <span>${price}</span>
          )}
        </span>
      </div>
      {/* description */}
      <div className="font-poppins font-normal text-sm">{description}</div>
      <div className="w-full h-[1px] bg-[#777] rounded-sm" />
      {/* Options */}
      <Options
        options={options || []}
        getOptions={getOptions}
        setGetOptions={setGetOptions}
      />
      {/* Counter + buy + wishlist */}
      <Counter
        setCount={setCount}
        count={count}
        item={item}
        userId={userId || ""}
        setHeart={setHeart}
        heart={heart}
        setIsCartDataUpdated={setIsCartDataUpdated}
        cartData={cartData}
        setCartData={setCartData}
        getOptions={getOptions}
        setWishListStatus={setWishListStatus}
      />

      {/* Free delivery */}
      <div className="border border-[rgba(0, 0, 0, 0.5)] rounded-sm">
        {iconsDescription.map((icons) => (
          <div
            key={icons.text}
            className="px-2 py-4 flex gap-3 items-center [&:not(:last-child)]:border-b border-[rgba(0, 0, 0, 0.5)]"
          >
            {/* Icon */}
            {<icons.icon size={35} />}
            <div className="flex flex-col font-poppins">
              <p className="font-bold">{icons.text}</p>
              <span className="font-medium text-xs">{icons.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DescriptionProductDetails;
