import Image from "next/image";
import { HiMiniHeart, HiOutlineHeart } from "react-icons/hi2";
import { typeProduct } from "../../../../types/productTypes";
import "../Card.css";
import { AddToCart, addWishList, handleDeleteItemWishList } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { useProductContext } from "../../../../context/productContext";
import { supabase } from "@/supabase-client";
import { MouseEvent, useEffect, useState } from "react";

interface Props {
  type?: string;
  item: typeProduct;
}

const ImgProduct = ({ item, type }: Props) => {
  const { name, discount, price, discount_type, img } = item;
  const discountPercentage = ((discount! / price) * 100).toFixed(0);
  const { setIsProductAdded, setWishListStatus } = useProductContext();
  const [isWishList, setIsWishList] = useState(false);

  useEffect(() => {
    const isProductWishList = async () => {
      // try {
      const { data, error } = await supabase
        .from("user_wishlist")
        .select("id")
        .eq("product_id", item.product_id)
        .single();
      if (error) console.log(error);
      console.log("data", data);
      const exists = data ? true : false;
      console.log("exists", exists);
      setIsWishList(exists);
      // } catch (error) {
      //   console.log("error", error);
      // }
    };
    isProductWishList();
  }, [item.product_id]);
  console.log("isWishList", isWishList);
  // <HiMiniHeart
  //   size={33}
  //   className="text-primary cursor-pointer border border-[#777] rounded-[4px] p-[4px]"
  //   onClick={() => addWishList(item, "remove")}
  // />
  return (
    <div className="group relative h-full overflow-hidden w-full flex-center">
      <Image
        src={img}
        alt={`img-${name}`}
        className="object-cover"
        width={110}
        height={110}
        priority
      />
      <div className="flex flex-col absolute top-2 right-2">
        {type === "wishList" ? (
          <Trash2
            onClick={async (e) => {
              e.stopPropagation();
              e.preventDefault();
              await handleDeleteItemWishList({ item });
              setWishListStatus((prev) => ({
                ...prev,
                isDeleted: !prev.isDeleted,
              }));
            }}
            className="iconImg hover:bg-primary hover:text-white duration-300 p-0.5 rounded-[4px]"
            size={28}
          />
        ) : isWishList ? (
          <HiMiniHeart
            onClick={async (e) => {
              e.stopPropagation();
              e.preventDefault();
              await addWishList(item, "remove");
              setIsWishList(false);
            }}
            size={28}
            className={`${
              isWishList ? "text-primary" : "hover:bg-primary hover:text-white"
            } iconImg duration-300 p-0.5 rounded-[4px]`}
          />
        ) : (
          <HiOutlineHeart
            onClick={async (e) => {
              e.stopPropagation();
              e.preventDefault();
              await addWishList(item, "add");
              setIsWishList(true);
            }}
            size={28}
            className="iconImg hover:bg-primary hover:text-white duration-300 p-0.5 rounded-[4px]"
          />
        )}
      </div>
      {discount !== 0 &&
        (discount_type === "percentage" ? (
          <span className="absolute text-[13px] px-2 py-0.5 top-2 left-2 rounded-[4px] bg-primary text-white">
            -{discount}%
          </span>
        ) : (
          <span className="absolute text-[13px] px-2 py-0.5 top-2 left-2 rounded-[4px] bg-primary text-white">
            -{discountPercentage}%
          </span>
        ))}
      <div
        onClick={async (e) => {
          e.preventDefault();
          await AddToCart(item);
          setIsProductAdded((prev) => !prev);
        }}
        className="addProduct group-hover:bottom-0"
      >
        Add to Cart
      </div>
    </div>
  );
};

export default ImgProduct;
