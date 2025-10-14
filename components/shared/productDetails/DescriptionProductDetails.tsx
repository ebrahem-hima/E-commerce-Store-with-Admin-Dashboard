"use client";
import React, { useEffect, useState } from "react";
import { typeProduct } from "../../../types/productTypes";
import { Minus, Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

import { HiOutlineHeart } from "react-icons/hi2";
import { HiMiniHeart } from "react-icons/hi2";
import { useProductContext } from "../../../context/productContext";
import "../Card/Card.css";
import { iconsDescription } from "../../../constant/product";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/supabase-client";
import { AddToCart } from "@/lib/userCartFn";
import { addWishList, isInWishList } from "@/lib/userWishlistFn";

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
  const { userId, setIsCartDataUpdated } = useProductContext();

  const addOptions = (value: string, optionTitle: string) => {
    setGetOptions((prev) =>
      prev.some((item) => item.optionTitle === optionTitle)
        ? prev.map((item) =>
            item.optionTitle === optionTitle
              ? { ...item, values: [value] }
              : item
          )
        : [
            ...prev,
            {
              optionTitle: optionTitle,
              values: [value],
            },
          ]
    );
  };

  useEffect(() => {
    isInWishList({ item, setHeart });
  }, [item]);
  console.log("getOptions", getOptions);
  const Counter = () => {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap- w-fit rounded-[4px]">
          <button
            onClick={() => setCount((c) => Math.max(1, c - 1))}
            className="cursor-pointer active:text-white active:border-primary active:bg-primary hover:text-white flex-center h-8 w-8 border border-[#777] hover:bg-primary hover:border-primary rounded-l-[3px] duration-200"
          >
            <Minus size={17} />
          </button>

          <span className="flex-center w-13 text-center border-t border-b h-8  border-[#777]">
            {count}
          </span>
          <button
            className="cursor-pointer active:text-white active:border-primary active:bg-primary hover:text-white flex-center h-8 w-8 border border-[#777] hover:bg-primary hover:border-primary rounded-r-[3px] duration-200"
            onClick={() => {
              setCount((c) => (c < item.stock ? c + 1 : c));
            }}
          >
            <Plus size={17} />
          </button>
        </div>
        <Button
          size="sm"
          disabled={!active}
          className="w-fit text-[15px] px-6 rounded-[4px] hover:bg-hover duration-300"
          onClick={() =>
            AddToCart({
              item,
              userId: userId || "",
              count,
              options: getOptions,
              setIsCartDataUpdated,
            })
          }
        >
          Buy Now
        </Button>
        <button onClick={() => setHeart((prev) => !prev)}>
          {heart ? (
            <HiMiniHeart
              size={33}
              className="text-primary cursor-pointer border border-[#777] rounded-[4px] p-[4px]"
              onClick={() => addWishList(item, "remove", userId || "")}
            />
          ) : (
            <HiOutlineHeart
              size={33}
              className="cursor-pointer border border-[#777] rounded-[4px] p-[4px]"
              onClick={() => addWishList(item, "add", userId || "")}
            />
          )}
        </button>
      </div>
    );
  };
  const Options = () => {
    return (
      <div className="flex flex-col gap-3">
        {options?.map((option, idx) => (
          <div key={idx} className="flex gap-2">
            <span className="font-inter font-normal text-[20px]  tracking-[0.03em]">
              {option.optionTitle}:
            </span>
            <div className="flex gap-2">
              {option.values.map((value, idx) => (
                <span
                  key={idx}
                  className={`${
                    getOptions.some((item) => item.values[0] === value)
                      ? "bg-primary text-white !border-primary"
                      : ""
                  } cursor-pointer duration-200 py-0.5 px-3 border border-gray-400 hover:border-primary hover:text-white hover:bg-primary rounded-[4px] active:bg-primary active:border-primary active:text-white`}
                  onClick={() => addOptions(value, option.optionTitle)}
                >
                  {value}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

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
      <div className="w-full h-[1px] bg-[#777] rounded-[4px]" />
      {/* Options */}
      <Options />
      {/* Counter + buy + wishlist */}
      <Counter />
      {/* Free delivery */}
      <div className="border border-[rgba(0, 0, 0, 0.5)] rounded-[4px]">
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
