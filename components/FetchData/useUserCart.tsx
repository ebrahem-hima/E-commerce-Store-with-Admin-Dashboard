"use client";

import { useEffect, useRef, useState } from "react";
import { typeProduct } from "../../types/productTypes";
import { getUser } from "@/app/(root)/(auth)/authActions/getUser";
import { createClient } from "@/utils/supabase/client";

interface Props {
  isCartDataUpdated: boolean;
  isAuth: boolean;
}

const UseUserCart = ({ isAuth, isCartDataUpdated }: Props) => {
  const userCart =
    typeof window !== "undefined" ? localStorage.getItem("user_cart") : "";
  const guestCart =
    typeof window !== "undefined" ? localStorage.getItem("cart_guest") : "";
  const getCartData = JSON.parse(guestCart || userCart || "[]");
  const [cartData, setCartData] = useState<typeProduct[]>(getCartData);

  const [Loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const mergeUnique = async (data: typeProduct[], cartGuest: typeProduct[]) =>
    [...data, ...cartGuest].filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.product_id === item.product_id)
    );
  const data = useRef(cartData);
  useEffect(() => {
    data.current = cartData;
  }, [cartData]);

  useEffect(() => {
    const handleGuestCart = () => {
      localStorage.setItem("cart_guest", JSON.stringify(data.current));
      return;
    };
    const handleUserCart = async (userId: string) => {
      try {
        const supabase = createClient();

        setLoading(true);
        const getCartGuest = JSON.parse(
          localStorage.getItem("cart_guest") || "[]"
        );

        const { data: dataSelect, error: selectError } = await supabase
          .from("user_cart")
          .select();

        if (selectError) throw selectError;

        const collectData = await mergeUnique(dataSelect, getCartGuest);
        const addUserIdToCartData = collectData.map((item) => ({
          ...item,
          user_id: userId,
        }));

        const getNewData =
          dataSelect.length > 0
            ? addUserIdToCartData.filter(
                (item) =>
                  !dataSelect.some(
                    (d: typeProduct) => item.product_id === d.product_id
                  )
              )
            : addUserIdToCartData;
        if (getNewData.length > 0) {
          console.log("push Items");
          const { data, error } = await supabase
            .from("user_cart")
            .insert(getNewData)
            .select();
          setCartData([...(data || []), ...dataSelect]);
          localStorage.setItem(
            "user_cart",
            JSON.stringify([...(data || []), ...dataSelect])
          );
          if (error) throw error;
        } else {
          setCartData(dataSelect);
          localStorage.setItem("user_cart", JSON.stringify(dataSelect));
        }
        localStorage.removeItem("cart_guest");
      } catch (err) {
        console.error("Error syncing user cart:", err);
      } finally {
        setLoading(false);
      }
    };
    const syncCart = async () => {
      const user = await getUser();
      if (!user?.id) return handleGuestCart();
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
  }, [isCartDataUpdated, cartData]);

  return { cartData, Loading, total, setCartData };
};

export default UseUserCart;
