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
  const getUserCart = JSON.parse(localStorage.getItem("user_cart") || "[]");
  console.log("cartData", getUserCart);
  const isExist = getUserCart.find(
    (cartItem: typeProduct) => cartItem.product_id === item.product_id
  );
  if (isExist) {
    toast.info(MESSAGES.cart.alreadyExists(item.name));
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
  toast.success(MESSAGES.cart.added(item.name));
  if (error) {
    console.log("errorAdd To Cart", error);
    return;
  }
  setIsCartDataUpdated((prev) => !prev);
};

interface addGuestCartItemsType {
  cartData: typeProduct[];
  setCartData: Dispatch<SetStateAction<typeProduct[]>>;
  item: typeProduct;
  count?: number;
  getOptions?: { optionTitle: string; values: string[] }[];
}

export const addGuestCartItems = ({
  cartData,
  setCartData,
  item,
  count,
  getOptions,
}: addGuestCartItemsType) => {
  if (!item.active) {
    toast.info(MESSAGES.cart.outOfStock(item.name));
    return;
  }
  const isExist = cartData.find(
    (cartItem: typeProduct) => cartItem.product_id === item.product_id
  );
  if (isExist) {
    toast.info(MESSAGES.cart.alreadyExists(item.name));
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
  setCartData,
  userId,
}: deleteProductCart) => {
  toast.success(MESSAGES.cart.removed(name));
  if (!userId) {
    setCartData((prev) => prev.filter((item) => item.product_id !== ID));
    return false;
  }
  const { error } = await supabase
    .from("user_cart")
    .delete()
    .eq("product_id", ID);
  if (error) throw error;
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
