import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { typeProduct } from "../../types/productTypes";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { MESSAGES } from "./message";
import { supabase } from "@/supabase-client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const addWishList = async (item: typeProduct, Action: string) => {
  const userId = localStorage.getItem("user_id");
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

export const AddToCart = async (
  item: typeProduct,
  count?: number,
  options?: { optionTitle: string; values: string[] }[]
) => {
  const userId = localStorage.getItem("user_id");
  console.log("userId", userId);
  const { data: exist } = await supabase
    .from("user_cart")
    .select()
    .eq("product_id", item.product_id)
    .eq("user_id", userId)
    .maybeSingle();
  if (exist) {
    toast.info(MESSAGES.cart.alreadyExists(item.name));
    return;
  }

  if (!item.active) {
    toast.info(MESSAGES.cart.outOfStock(item.name));
    return;
  }
  try {
    const { error } = await supabase.from("user_cart").insert({
      product_id: item.product_id,
      user_id: userId,
      name: item.name,
      img: item.img,
      description: item.description,
      rate: item.rate,
      count: count || item.count,
      stock: item.stock,
      imgGallery: item.imgGallery,
      discount: item.discount,
      discount_type: item.discount_type,
      price: item.price,
      options: options || [],
      active: item.active,
      reviews: item.reviews,
    });
    toast.success(MESSAGES.cart.added(item.name));
    if (error) throw error;
  } catch (error) {
    console.log("error", error);
  }
};

interface Props {
  setLoading?: Dispatch<SetStateAction<boolean>>;
  item: typeProduct;
}

export const handleDeleteItemWishList = async ({ setLoading, item }: Props) => {
  setLoading?.(true);
  try {
    const { error } = await supabase
      .from("user_wishlist")
      .delete()
      .eq("product_id", item.product_id);
    toast.success(MESSAGES.wishlist.removed(item.name));
    if (error) throw error;
  } catch (error) {
    console.log(error);
  } finally {
    setLoading?.(false);
  }
};

// interface addToCartType {
//   item: typeProduct;
//   setCartData: Dispatch<SetStateAction<typeProduct[]>>;
//   cartData: typeProduct[];
// }

// export const AddToCart = ({ item, setCartData, cartData }: addToCartType) => {
//   const exist = cartData.find(
//     (product) => product.product_id === item.product_id
//   );
//   if (!item.active) {
//     toast.error(MESSAGES.cart.outOfStock(item.name));
//     return;
//   }
//   if (exist) {
//     toast.info(MESSAGES.cart.alreadyExists(item.name));
//   } else {
//     toast.success(MESSAGES.cart.added(item.name));
//   }
//   setCartData((prev) => (exist ? prev : item.active ? [...prev, item] : prev));
// };
