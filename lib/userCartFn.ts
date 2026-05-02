import {
  handleDeleteProductCartProps,
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
  isExist: boolean;
}
const supabase = createClient();

interface handleAddToCartType {
  isExist: boolean;
  setOpenCart: Dispatch<SetStateAction<boolean>>;
  setOpenProductModal: Dispatch<SetStateAction<boolean>>;
  item: typeProduct;
  userId: string;
  quantity: number;
  getOptions: optionType[];
  setCartData: Dispatch<SetStateAction<typeProduct[]>>;
  cartData: typeProduct[];
}
export const handleAddToCart = withLock(
  async ({
    isExist,
    item,
    userId,
    quantity,
    setCartData,
    cartData,
    getOptions,
  }: handleAddToCartType) => {
    AddToCart({
      item,
      userId,
      quantity,
      getOptions,
      setCartData,
      cartData,
      isExist,
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
    cartData,
    isExist,
  }: AddToCartType) => {
    const previousCartData = cartData;
    if (isExist) {
      toast.info(MESSAGES.cart.ALREADY_OPTIONS);
      return;
    }
    if (!item.active) {
      toast.info(MESSAGES.cart.outOfStock(item.name));
      return;
    }
    if (item.stock === 0) {
      toast.error(MESSAGES.cart.OUT_OF_STOCK);
      return;
    }
    try {
      const options = getOptions && getOptions?.length > 0 ? getOptions : [];
      const cartId = crypto.randomUUID();
      const product = {
        ...item,
        cartId,
        quantity: quantity || item.quantity || 1,
        selected_options: options,
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
          id: cartId,
          product_id: item.id,
          user_id: userId,
          quantity: 1,
          selected_options: options,
        };

        const { error } = await supabase.from("user_cart").insert(product);
        if (error) throw error;
      }

      toast.success(MESSAGES.cart.added(item.name));
    } catch (error) {
      console.log("error Add To Cart", error);
      setCartData(previousCartData);
      toast.error(MESSAGES.ERROR_MESSAGES.SomethingWentWrong);
      return;
    }
  },
);

interface updateProductCount {
  setDisableBtn: Dispatch<SetStateAction<boolean>>;
  setCartData: Dispatch<SetStateAction<typeProduct[]>>;
  count: { quantity: number; id: string }[];
  cartData: typeProduct[];
}

export const updateProduct = withLock(
  async ({
    setDisableBtn,
    count,
    setCartData,
    cartData,
  }: updateProductCount) => {
    const previousCartData = [...cartData];
    try {
      setCartData((prev) =>
        prev.map((item) => ({
          ...item,
          quantity:
            count.find((c) => c.id === item.cartId)?.quantity || item.quantity,
        })),
      );
      const updatePromises = count.map((product) => {
        return supabase
          .from("user_cart")
          .update({ quantity: product.quantity })
          .eq("id", product.id);
      });

      const results = await Promise.all(updatePromises);

      const hasError = results.some((res) => res.error);
      if (hasError) console.error("One or more updates failed");

      toast.success(MESSAGES.table.tableUpdate);
      setDisableBtn(true);
    } catch (error) {
      console.log(error);
      setCartData(previousCartData);
      toast.error(MESSAGES.ERROR_MESSAGES.SomethingWentWrong);
      setDisableBtn(true);
    }
  },
);

export const handleDeleteProductCart = withLock(
  async ({
    ID,
    name,
    setCartData,
    userId,
    cartData,
  }: handleDeleteProductCartProps) => {
    const previousCartData = cartData;
    try {
      setCartData((prev) => {
        const data = prev.filter((item) => item.cartId !== ID);
        if (!userId) {
          localStorage.setItem("cart_guest", JSON.stringify(data));
        }
        return data;
      });
      if (!userId) {
        toast.success(MESSAGES.cart.removed(name));
        return;
      }

      const { error } = await supabase.from("user_cart").delete().eq("id", ID);

      if (error) {
        console.log("error", error);
        throw error;
      }

      toast.success(MESSAGES.cart.removed(name));
    } catch (error) {
      setCartData(previousCartData);
      console.log(error);
      toast.error(MESSAGES.ERROR_MESSAGES.SomethingWentWrong);
      return;
    }
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
