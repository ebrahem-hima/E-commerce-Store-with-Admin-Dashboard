import { supabase } from "@/supabase-client";
import { deleteProductCart, typeProduct } from "@/types/productTypes";
import { toast } from "sonner";
import { MESSAGES } from "./message";
import { Dispatch, SetStateAction } from "react";

interface AddToCartType {
  item: typeProduct;
  userId: string;
  count?: number;
  options?: { optionTitle: string; values: string[] }[];
  setIsCartDataUpdated: Dispatch<SetStateAction<boolean>>;
  setCartData: Dispatch<SetStateAction<typeProduct[]>>;
  cartData: typeProduct[];
  getOptions?: { optionTitle: string; values: string[] }[];
}

export const AddToCart = async ({
  item,
  userId,
  count,
  setIsCartDataUpdated,
  getOptions,
}: AddToCartType) => {
  if (!item.active) {
    toast.info(MESSAGES.cart.outOfStock(item.name));
    return;
  }

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
    options: getOptions || [],
    active: item.active,
    reviews: item.reviews,
  });
  if (error) {
    console.log("errorAdd To Cart", error);
    return;
  }
  toast.success(MESSAGES.cart.added(item.name));
  setIsCartDataUpdated((prev) => !prev);
};

interface addGuestCartItemsType {
  setCartData: Dispatch<SetStateAction<typeProduct[]>>;
  item: typeProduct;
  count?: number;
  getOptions?: { optionTitle: string; values: string[] }[];
  setIsCartDataUpdated: Dispatch<SetStateAction<boolean>>;
}

export const addGuestCartItems = ({
  setCartData,
  item,
  count,
  getOptions,
  setIsCartDataUpdated,
}: addGuestCartItemsType) => {
  if (!item.active) {
    toast.info(MESSAGES.cart.outOfStock(item.name));
    return;
  }
  setCartData((prev) => [
    ...prev,
    {
      ...item,
      count: count ? count : item.count ? item.count : 1,
      options: getOptions || [],
    },
  ]);

  toast.success(MESSAGES.cart.added(item.name));
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
  console.log("count", count);
  const updatePromises = count.map((product) =>
    supabase
      .from("user_cart")
      .update({ count: product.count })
      .eq("product_id", product.id)
  );

  const results = await Promise.all(updatePromises);

  const errors = results.filter((r) => r.error);
  if (errors.length) {
    console.log(errors);
    return false;
  }

  toast.success(MESSAGES.table.tableUpdate);
  setDisableBtn(true);
  setIsCartDataUpdated((prev) => !prev);
};

export const handleDeleteProductCart = async ({
  ID,
  name,
  setIsCartDataUpdated,
  setCartData,
  userId,
}: deleteProductCart) => {
  if (!userId) {
    setCartData((prev) => prev.filter((item) => item.product_id !== ID));
    setIsCartDataUpdated((prev) => !prev);
    toast.success(MESSAGES.cart.removed(name));
    return;
  }
  const { error } = await supabase
    .from("user_cart")
    .delete()
    .eq("product_id", ID);
  if (error) {
    console.log("error", error);
    return;
  }
  toast.success(MESSAGES.cart.removed(name));
  setIsCartDataUpdated((prev) => !prev);
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
  wishList,
  setIsCartDataUpdated,
  cartData,
}: moveAllBagType) => {
  const addWishList = wishList
    .filter(
      (wish) => !cartData.some((cart) => cart.product_id === wish.product_id)
    )
    .filter((item) => item.active);
  const isNotActive = wishList.filter((item) => !item.active);
  if (isNotActive.length > 0) {
    toast.info(
      MESSAGES.cart.outOfStock(isNotActive.map((item) => item.name).join(", "))
    );
    // when there is only one product and it is out of stock
    if (wishList.length === 1) return;
  }
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
};
