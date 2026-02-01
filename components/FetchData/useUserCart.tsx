"use client";

import { useEffect, useState } from "react";
import { typeProduct } from "../../types/productTypes";
import { createClient } from "@/app/utils/supabase/client";

interface Props {
  isAuth: boolean;
  userId: string;
}

const UseUserCart = ({ isAuth, userId }: Props) => {
  const [cartData, setCartData] = useState<typeProduct[]>([]);
  const [userCartLoading, setUserCartLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const mergeUnique = (
      data: typeProduct[],
      cartGuest: typeProduct[],
      // userId: string,
    ) => {
      const map = new Map<string, typeProduct>();

      [...data, ...cartGuest].forEach((item) => {
        const itemWithUserId = {
          ...item,
          user_id: userId,
        };
        if (!map.has(item.product_id!)) {
          map.set(item.product_id!, itemWithUserId);
        }
      });
      const mapData = Array.from(map.values());
      return mapData;
    };
    const insetDataIntoDB = async ({
      dataSelect,
      getCartGuest,
      // userId,
    }: {
      dataSelect: typeProduct[];
      getCartGuest: typeProduct[];
      // userId: string;
    }) => {
      // console.log("start insertData");
      const supabase = createClient();
      const collectData = mergeUnique(dataSelect, getCartGuest);
      const getNewData =
        dataSelect.length > 0
          ? collectData.filter(
              (item) =>
                !dataSelect.some(
                  (d: typeProduct) => item.product_id === d.product_id,
                ),
            )
          : collectData;
      const normalizeCartProducts = collectData.map(
        ({ product_id, ...rest }) => ({
          ...rest,
          id: product_id!,
        }),
      );
      setCartData(normalizeCartProducts);
      const { error } = await supabase.from("user_cart").insert(getNewData);
      if (error) throw error;
    };
    const handleGuestCart = () => {
      console.log("start guest");
      const getItems = localStorage.getItem("cart_guest") || "[]";
      setCartData(JSON.parse(getItems));
    };
    const handleUserCart = async () => {
      console.log("start userCart");
      try {
        const supabase = createClient();
        setUserCartLoading(true);
        const getCartGuest = JSON.parse(
          localStorage.getItem("cart_guest") || "[]",
        ).map(({ id, ...rest }: typeProduct) => ({
          ...rest,
          product_id: id,
          user_id: userId,
        }));
        const { data: dataSelect, error: selectError } = await supabase
          .from("user_cart")
          .select();

        if (selectError) throw selectError;
        if (dataSelect.length > 0) {
          insetDataIntoDB({ dataSelect, getCartGuest });
        } else {
          const { error } = await supabase
            .from("user_cart")
            .insert(getCartGuest);
          if (error) throw error;
          const changeProduct = getCartGuest.map(
            ({ product_id, ...rest }: typeProduct) => ({
              ...rest,
              id: product_id,
            }),
          );
          setCartData(changeProduct);
          console.log("start remove cart_guest");
          localStorage.removeItem("cart_guest");
        }
      } catch (err) {
        console.error("Error syncing user cart:", err);
      } finally {
        setUserCartLoading(false);
      }
    };
    const syncCart = async () => {
      if (!userId) return handleGuestCart();
      if (userId) await handleUserCart();
    };
    syncCart();
  }, [isAuth, userId]);

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

  return { cartData, userCartLoading, total, setCartData };
};

export default UseUserCart;
