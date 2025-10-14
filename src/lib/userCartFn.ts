import { supabase } from "@/supabase-client";
import { deleteProductCart, typeProduct } from "../../types/productTypes";
import { toast } from "sonner";
import { MESSAGES } from "./message";
import { Dispatch, SetStateAction } from "react";

interface AddToCartType {
  item: typeProduct;
  userId: string;
  count?: number;
  options?: { optionTitle: string; values: string[] }[];
  setIsCartDataUpdated: Dispatch<SetStateAction<boolean>>;
}

export const AddToCart = async ({
  item,
  userId,
  count,
  options,
  setIsCartDataUpdated,
}: AddToCartType) => {
  const { data: exist } = await supabase
    .from("user_cart")
    .select()
    .eq("product_id", item.product_id)
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
  setIsCartDataUpdated((prev) => !prev);
};

interface updateProductCount {
  setDisableBtn: Dispatch<SetStateAction<boolean>>;
  count: { count: number; id: string }[];
  setIsCartDataUpdated: Dispatch<SetStateAction<boolean>>;
}

export const updateProduct = async ({
  setDisableBtn,
  count,
  setIsCartDataUpdated,
}: updateProductCount) => {
  for (const product of count) {
    const { error } = await supabase
      .from("user_cart")
      .update({ count: product.count })
      .eq("product_id", product.id);
    if (error) {
      console.log(error);
      return false;
    }
  }

  toast.success(MESSAGES.table.tableUpdate);
  setDisableBtn(true);
  setIsCartDataUpdated((prev) => !prev);
};

export const handleDeleteProductCart = async ({
  ID,
  name,
  setIsCartDataUpdated,
}: deleteProductCart) => {
  try {
    const { error } = await supabase
      .from("user_cart")
      .delete()
      .eq("product_id", ID);
    if (error) throw error;
    toast.success(MESSAGES.cart.removed(name));
    setIsCartDataUpdated((prev) => !prev);
  } catch (error) {
    console.log("error", error);
  }
};

interface deleteAllProductCartType {
  cartData: typeProduct[];
}

export const handleDeleteAllProductCart = async ({
  cartData,
}: deleteAllProductCartType) => {
  const IDS = cartData.map((item) => item.product_id);
  const { error: cartError } = await supabase
    .from("user_cart")
    .delete()
    .in("product_id", IDS);
  if (cartError) {
    console.log(cartError);
    return false;
  }
};

interface moveAllBagType {
  // setIsMove: Dispatch<SetStateAction<boolean>>;
  wishList: typeProduct[];
  setIsCartDataUpdated: Dispatch<SetStateAction<boolean>>;
  cartData: typeProduct[];
}

export const moveAllToBag = async ({
  // setIsMove,
  wishList,
  setIsCartDataUpdated,
  cartData,
}: moveAllBagType) => {
  // setIsMove(false);
  const addWishList = wishList.filter(
    (wish) => !cartData.some((cart) => cart.product_id === wish.product_id)
  );
  if (addWishList.length === 0) {
    toast.info(MESSAGES.wishlist.ExistCartShop);
    return false;
  }
  const { error } = await supabase
    .from("user_cart")
    .upsert(addWishList, { count: "exact" })
    .select();
  if (error) {
    console.log(error);
    return false;
  }
  // to run useEffect in shop cart and update it instantly
  setIsCartDataUpdated((prev) => !prev);
  toast.success(MESSAGES.cart.added);
  // setIsMove(true);
};
