"use client";

import { useEffect, useRef, useState } from "react";
import { typeProduct } from "../../types/productTypes";
import { supabase } from "@/supabase-client";
import { getUser } from "@/app/(root)/(auth)/authActions/getUser";

interface Props {
  isCartDataUpdated: boolean;
  userId: string;
  isAuth: boolean;
}

const useUserCart = ({ isCartDataUpdated, userId, isAuth }: Props) => {
  const saved =
    typeof window !== "undefined" ? localStorage.getItem("user_cart") : "";
  const getCartData = saved ? JSON.parse(saved) : [];

  const [cartData, setCartData] = useState<typeProduct[]>(getCartData);
  const getUniqueCart = useRef<typeProduct[]>([]);

  const [Loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const handleGuestCart = () => {
    localStorage.setItem("cart_guest", JSON.stringify(cartData));
    return;
  };
  const mergeUnique = (data: typeProduct[], cartGuest: typeProduct[]) =>
    [...data, ...cartGuest].filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.product_id === item.product_id)
    );

  const handleUserCart = async (userId: string) => {
    console.log("start syncing user cart");
    try {
      setLoading(true);
      const getCartGuest = JSON.parse(
        localStorage.getItem("cart_guest") || "[]"
      );

      const { data, error: selectError } = await supabase
        .from("user_cart")
        .select();

      if (selectError) throw selectError;

      const collectData = mergeUnique(data, getCartGuest);
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
              (item) => !data.some((d) => item.product_id === d.product_id)
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

  useEffect(() => {
    const syncCart = async () => {
      const user = await getUser();
      console.log("user cart sync", user);
      if (!user?.id && cartData.length > 0) return handleGuestCart();
      if (user?.id) await handleUserCart(user?.id);
    };
    syncCart();
  }, [isAuth, isCartDataUpdated]);

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
  }, [cartData, isCartDataUpdated]);
  // console.log("cartData", cartData);

  return { cartData, Loading, total, setCartData };
};

export default useUserCart;
