"use client";

import { useEffect, useState } from "react";
import { typeProduct } from "../../types/productTypes";
import { supabase } from "@/supabase-client";
import { getUser } from "@/app/(root)/(auth)/authActions/getUser";

interface Props {
  isCartDataUpdated: boolean;
  isAuth: boolean;
}

const UseUserCart = ({ isAuth, isCartDataUpdated }: Props) => {
  const saved =
    typeof window !== "undefined" ? localStorage.getItem("cart_guest") : "";
  const getCartData = saved ? JSON.parse(saved) : [];
  const [cartData, setCartData] = useState<typeProduct[]>(getCartData);

  const [Loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const mergeUnique = (data: typeProduct[], cartGuest: typeProduct[]) =>
    [...data, ...cartGuest].filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.product_id === item.product_id)
    );

  useEffect(() => {
    const handleGuestCart = () => {
      localStorage.setItem("cart_guest", JSON.stringify(cartData));
      return;
    };
    const handleUserCart = async (userId: string) => {
      // console.log("start Sync CartData");
      try {
        // console.log("start Sync CartData");
        setLoading(true);
        const getCartGuest = JSON.parse(
          localStorage.getItem("cart_guest") || "[]"
        );
        // localStorage.setItem("user_cart", JSON.stringify(cartData));
        // console.log("cartData", cartData);
        // const getUserCart = JSON.parse(
        //   localStorage.getItem("user_cart") || "[]"
        // );

        const { data, error: selectError } = await supabase
          .from("user_cart")
          .select();

        if (selectError) throw selectError;

        const collectData = mergeUnique(data, getCartGuest);
        // console.log("data", data);
        localStorage.setItem("user_cart", JSON.stringify(collectData));
        setCartData(collectData);
        localStorage.removeItem("cart_guest");

        const addUserIdToCartData = collectData.map((item) => ({
          ...item,
          user_id: userId,
        }));

        const getNewData =
          data.length > 0
            ? addUserIdToCartData.filter(
                (item) =>
                  !data.some(
                    (d: typeProduct) => item.product_id === d.product_id
                  )
              )
            : addUserIdToCartData;

        if (getNewData.length > 0) {
          const { error } = await supabase.from("user_cart").insert(getNewData);
          if (error) throw error;
        }
      } catch (err) {
        console.error("Error syncing user cart:", err);
      } finally {
        setLoading(false);
      }
    };
    const syncCart = async () => {
      const user = await getUser();
      // console.log("user?.id", user?.id);
      if (!user?.id) return handleGuestCart();
      // if (!user?.id && cartData.length > 0) return handleGuestCart();
      if (user?.id) await handleUserCart(user?.id);
    };
    syncCart();
  }, [isAuth, cartData]);

  useEffect(() => {
    const getTotal = cartData.reduce((acc, curr) => {
      let price = curr.price;

      if (curr.discount && curr.discount_type) {
        if (curr.discount_type === "fixed") {
          price -= curr.discount;
        } else if (curr.discount_type === "percentage") {
          price -= (curr.discount / 100) * price;
        }
      }
      return acc + (curr.count || 1) * price;
    }, 0);

    setTotal(getTotal);
  }, [cartData]);

  return { cartData, Loading, total, setCartData };
};

export default UseUserCart;
