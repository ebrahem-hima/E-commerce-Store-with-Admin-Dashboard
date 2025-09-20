import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { typeProduct } from "../../types/productTypes";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { MESSAGES } from "./message";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface WishListFnType {
  type: string;
  item: typeProduct;
  setWishList: Dispatch<SetStateAction<typeProduct[]>>;
  wishList: typeProduct[];
}

export const addWishList = ({
  type,
  item,
  setWishList,
  wishList,
}: WishListFnType) => {
  const productWishList = {
    id: item.id,
    name: item.name,
    img: item.img,
    description: item.description,
    imgGallery: item.imgGallery,
    rate: item.rate,
    stock: item.stock,
    discount: item.discount,
    discount_type: item.discount_type,
    price: item.price,
    options: item.options,
    active: item.active,
    reviews: item.reviews,
  };
  const exist = wishList.some((wishList) => wishList.id === item.id);
  const removeItem = wishList.filter((product) => product.id !== item.id);
  if (exist) {
    toast.info(MESSAGES.wishlist.alreadyExists(item.name));
  } else {
    toast.success(MESSAGES.wishlist.added(item.name));
  }
  if (type === "remove") toast.info(MESSAGES.wishlist.removed(item.name));
  console.log("exist", exist);
  setWishList((prev) =>
    type === "add" ? (exist ? prev : [...prev, productWishList]) : removeItem
  );
};

interface addToCartType {
  item: typeProduct;
  setCartData: Dispatch<SetStateAction<typeProduct[]>>;
  cartData: typeProduct[];
}

export const AddToCart = ({ item, setCartData, cartData }: addToCartType) => {
  const exist = cartData.find((product) => product.id === item.id);
  if (!item.active) {
    toast.error(MESSAGES.cart.outOfStock(item.name));
    return;
  }
  if (exist) {
    toast.info(MESSAGES.cart.alreadyExists(item.name));
  } else {
    toast.success(MESSAGES.cart.added(item.name));
  }
  setCartData((prev) => (exist ? prev : item.active ? [...prev, item] : prev));
};
