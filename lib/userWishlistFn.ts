import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { typeProduct } from "@/types/productTypes";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { MESSAGES } from "./message";
import { supabase } from "@/supabase-client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
interface Props {
  item: typeProduct;
}
export const handleDeleteItemWishList = async ({ item }: Props) => {
  const { error } = await supabase
    .from("user_wishlist")
    .delete()
    .eq("product_id", item.product_id);
  toast.success(MESSAGES.wishlist.removed(item.name));
  if (error) throw error;
};

export const addWishList = async (
  item: typeProduct,
  Action: string,
  userId: string
) => {
  const { data: exist } = await supabase
    .from("user_wishlist")
    .select()
    .eq("product_id", item.product_id)
    .eq("user_id", userId)
    .maybeSingle();
  if (exist) {
    if (Action === "remove") {
      handleDeleteItemWishList({ item });
    } else if (Action === "add") {
      toast.info(MESSAGES.wishlist.alreadyExists(item.name));
    }
    return;
  }
  try {
    const { error } = await supabase.from("user_wishlist").insert({
      product_id: item.product_id,
      user_id: userId,
      name: item.name,
      img: item.img,
      description: item.description,
      rate: item.rate,
      stock: item.stock,
      imgGallery: item.imgGallery,
      discount: item.discount,
      discount_type: item.discount_type,
      price: item.price,
      options: item.options,
      active: item.active,
      reviews: item.reviews,
    });
    toast.success(MESSAGES.wishlist.added(item.name));
    if (error) throw error;
  } catch (error) {
    console.log("error", error);
  }
};

interface isProductWishListType {
  setIsWishList: Dispatch<SetStateAction<boolean>>;
  item: typeProduct;
}

export const isProductWishList = async ({
  setIsWishList,
  item,
}: isProductWishListType) => {
  if (!item.product_id) return;
  try {
    const { count, error } = await supabase
      .from("user_wishlist")
      .select("id", { count: "exact", head: true })
      .eq("product_id", item.product_id);
    if (error) {
      console.log(error);
      return false;
    }
    const exists = (count ?? 0) > 0;
    setIsWishList(exists);
  } catch (error) {
    console.log("error", error);
  }
};

interface getProductWishListType {
  setWishList: Dispatch<SetStateAction<typeProduct[]>>;
}

export const getProductWishList = async ({
  setWishList,
}: getProductWishListType) => {
  const { data, error } = await supabase.from("user_wishlist").select();
  if (error) {
    console.error("Error fetching wishlist:", error);
    return;
  }
  if (data) {
    setWishList(data);
  }
};

interface isInWishListType {
  item: typeProduct;
  setHeart: Dispatch<SetStateAction<boolean>>;
}

export const isInWishList = async ({ item, setHeart }: isInWishListType) => {
  const { data: exist } = await supabase
    .from("user_wishlist")
    .select()
    .eq("product_id", item.product_id)
    .maybeSingle();
  setHeart(!!exist);
};
