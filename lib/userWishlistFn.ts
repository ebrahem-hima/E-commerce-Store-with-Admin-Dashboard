import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { typeProduct } from "@/types/productTypes";
import { Dispatch, MouseEvent, SetStateAction } from "react";
import { toast } from "sonner";
import { MESSAGES } from "./message";
import { withLock } from "./utils";
import { createClient } from "@/app/utils/supabase/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const supabase = createClient();

export const handleDeleteItemWishList = withLock(
  async (productId: string, product_name: string) => {
    const { error } = await supabase
      .from("user_wishlist")
      .delete()
      .eq("product_id", productId);

    if (error) {
      console.log("error", error);
      return;
    }

    toast.success(MESSAGES.wishlist.removed(product_name));
  },
);

interface addWishListType {
  e?: MouseEvent<SVGElement>;
  item: typeProduct;
  userId: string;
}

export const addWishList = withLock(
  async ({ e, item, userId }: addWishListType) => {
    e?.stopPropagation();
    e?.preventDefault();
    const exist = await isProductWishList(item.id);
    if (exist) {
      await handleDeleteItemWishList(item.id, item.name);
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, search_text: _, ...rest } = item;
    const product = {
      ...rest,
      product_id: id,
      user_id: userId,
    };
    const { error } = await supabase.from("user_wishlist").insert(product);
    if (error) {
      console.log("error", error);
      return;
    }
    toast.success(MESSAGES.wishlist.added(item.name));
  },
);

export const isProductWishList = async (productId: string) => {
  if (!productId) return;
  try {
    const { data, error } = await supabase
      .from("user_wishlist")
      .select("id")
      .eq("product_id", productId)
      .maybeSingle();

    const exists = !!data;

    if (error) {
      console.log(error);
      return false;
    }
    return exists;
  } catch (error) {
    console.log("error", error);
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
    .eq("product_id", item.id)
    .maybeSingle();

  setHeart(!!exist);
};
