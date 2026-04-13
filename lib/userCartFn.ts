import {
  deleteProductCart,
  optionType,
  typeProduct,
} from "@/types/productTypes";
import { toast } from "sonner";
import { MESSAGES } from "./message";
import { Dispatch, SetStateAction } from "react";
import { withLock } from "./utils";
import { createClient } from "@/app/utils/supabase/client";

interface AddToCartType {
  item: typeProduct;
  userId: string;
  quantity?: number;
  options?: { optionTitle: string; values: string[] }[];
  setCartData: Dispatch<SetStateAction<typeProduct[]>>;
  cartData: typeProduct[];
  getOptions?: optionType[];
}
const supabase = createClient();

interface handleAddToCartType {
  isExist: boolean;
  userId: string;
  setCartData: Dispatch<SetStateAction<typeProduct[]>>;
  cartData: typeProduct[];
  item: typeProduct;
  getOptions?: optionType[];
  quantity?: number;
}
export const handleAddToCart = withLock(
  async ({
    userId,
    isExist,
    setCartData,
    cartData,
    item,
    getOptions,
    quantity,
  }: handleAddToCartType) => {
    if (isExist) {
      await handleDeleteProductCart({
        ID: item.id || "",
        name: item.name,
        userId: userId || "",
        setCartData,
      });
      return;
    }

    await AddToCart({
      item,
      userId: userId || "",
      cartData,
      getOptions,
      setCartData,
      quantity,
    });
  },
);
export const AddToCart = withLock(
  async ({
    item,
    userId,
    quantity,
    getOptions,
    setCartData,
  }: AddToCartType) => {
    if (!item.active) {
      toast.info(MESSAGES.cart.outOfStock(item.name));
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { search_text, ...rest } = item;
    const product = {
      ...rest,
      quantity: quantity || item.quantity || 1,
      options: getOptions || [],
      user_id: userId,
    };
    setCartData((prev) => {
      const updated = [...prev, product];
      if (!userId) {
        localStorage.setItem("cart_guest", JSON.stringify(updated));
      }
      return updated;
    });
    if (userId) {
      const product = {
        product_id: item.id,
        user_id: userId,
        quantity: 1,
      };

      const { error } = await supabase.from("user_cart").insert(product);
      if (error) {
        console.log("error Add To Cart", error);
        return;
      }
    }

    toast.success(MESSAGES.cart.added(item.name));
  },
);

interface updateProductCount {
  setDisableBtn: Dispatch<SetStateAction<boolean>>;
  setCartData: Dispatch<SetStateAction<typeProduct[]>>;
  count: { quantity: number; id: string }[];
  userId: string;
  cartData: typeProduct[];
}

export const updateProduct = withLock(
  async ({
    setDisableBtn,
    count,
    setCartData,
    userId,
    cartData,
  }: updateProductCount) => {
    setCartData((prev) =>
      prev.map((item) => ({
        ...item,
        quantity:
          count.find((c) => c.id === item.id)?.quantity || item.quantity,
      })),
    );
    const updateProductCount = cartData.map((product) => ({
      user_id: userId,
      quantity:
        count.find((c) => c.id === product.id)?.quantity || product.quantity,
      product_id: product.id,
    }));

    const { error } = await supabase
      .from("user_cart")
      .upsert(updateProductCount, { onConflict: "product_id, user_id" });

    if (error) {
      console.log(error);
      return false;
    }

    toast.success(MESSAGES.table.tableUpdate);
    setDisableBtn(true);
  },
);

export const handleDeleteProductCart = withLock(
  async ({ ID, name, setCartData, userId }: deleteProductCart) => {
    setCartData((prev) => {
      const data = prev.filter((item) => item.id !== ID);
      if (!userId) {
        localStorage.setItem("cart_guest", JSON.stringify(data));
      }
      return data;
    });
    if (!userId) {
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
  },
);

interface deleteAllProductCartType {
  cartData: typeProduct[];
  setCartData: Dispatch<SetStateAction<typeProduct[]>>;
}

export const handleDeleteAllProductCart = withLock(
  async ({ cartData, setCartData }: deleteAllProductCartType) => {
    const IDS = cartData.map((item) => item.id);
    const { error: cartError } = await supabase
      .from("user_cart")
      .delete()
      .in("product_id", IDS);

    if (cartError) {
      console.log(cartError);
      return false;
    }
    setCartData([]);
  },
);

interface moveAllBagType {
  wishList: typeProduct[];
  setCartData: Dispatch<SetStateAction<typeProduct[]>>;
  cartData: typeProduct[];
}

export const moveAllToBag = withLock(
  async ({ wishList, cartData, setCartData }: moveAllBagType) => {
    const addWishList = wishList
      .filter((wish) => !cartData.some((cart) => cart.id === wish.id))
      .filter((item) => item.active);

    const isNotActive = wishList.filter((item) => !item.active);
    if (isNotActive.length > 0) {
      toast.info(
        MESSAGES.cart.outOfStock(
          isNotActive.map((item) => item.name).join(", "),
        ),
      );
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
    setCartData((prev) => [...prev, ...addWishList]);
    toast.success(MESSAGES.cart.added);
  },
);
