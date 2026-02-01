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
  count?: number;
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
}
export const handleAddToCart = withLock(
  async ({
    userId,
    isExist,
    setCartData,
    cartData,
    item,
    getOptions,
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
    });
  },
);
export const AddToCart = withLock(
  async ({ item, userId, count, getOptions, setCartData }: AddToCartType) => {
    if (!item.active) {
      toast.info(MESSAGES.cart.outOfStock(item.name));
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { product_id, search_text, ...rest } = item;
    const product = {
      ...rest,
      count: count || item.count || 1,
      options: getOptions || [],
      user_id: userId,
    };
    // console.log("item", item);
    // console.log("product", product);
    setCartData((prev) => [...prev, product]);
    if (userId) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, search_text, ...rest } = item;
      const product = {
        ...rest,
        product_id: id,
        count: count || item.count || 1,
        options: getOptions || [],
        user_id: userId,
      };

      const { error } = await supabase.from("user_cart").insert(product);
      // const { error } = await supabase.from("user_cart").insert({
      //   product_id: item.id,
      //   user_id: userId,
      //   name: item.name,
      //   img: item.img,
      //   description: item.description,
      //   rate: item.rate,
      //   count: count || item.count,
      //   stock: item.stock,
      //   imgGallery: item.imgGallery,
      //   discount: item.discount,
      //   discount_type: item.discount_type,
      //   price: item.price,
      //   options: getOptions || [],
      //   active: item.active,
      //   created_at: item.created_at,
      //   category_id: item.category_id,
      // });
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
  count: { count: number; id: string }[];
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
    const updateProductCount = cartData.map((product) => ({
      product_id: product.id,
      user_id: userId,
      name: product.name,
      img: product.img,
      description: product.description,
      rate: product.rate,
      stock: product.stock,
      imgGallery: product.imgGallery,
      discount: product.discount,
      discount_type: product.discount_type,
      price: product.price,
      options: product.options || [],
      active: product.active,
      created_at: product.created_at,
      category_id: product.category_id,
      count: count.find((c) => c.id === product.id)?.count || product.count,
    }));
    const { error } = await supabase
      .from("user_cart")
      .upsert(updateProductCount, { onConflict: "product_id, user_id" });

    if (error) {
      console.log(error);
      return false;
    }
    setCartData((prev) =>
      prev.map((item) => ({
        ...item,
        count: count.find((c) => c.id === item.id)?.count || item.count,
      })),
    );

    toast.success(MESSAGES.table.tableUpdate);
    setDisableBtn(true);
  },
);

export const handleDeleteProductCart = withLock(
  async ({ ID, name, setCartData, userId }: deleteProductCart) => {
    setCartData((prev) => prev.filter((item) => item.id !== ID));
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
