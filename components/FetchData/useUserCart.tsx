"use client";

import { useEffect, useState } from "react";
import { typeProduct } from "../../types/productTypes";
import { supabase } from "@/supabase-client";

const useUserCart = (isCartDataUpdated: boolean) => {
  const saved =
    typeof window !== "undefined" ? localStorage.getItem("user_cart") : null;
  const getCartData = saved
    ? JSON.parse(saved)
    : [
        {
          product_id: "",
          name: "",
          img: "",
          description: "",
          imgGallery: "",
          rate: 0,
          sales: "",
          stock: 0,
          count: 0,
          discount: 0,
          discount_type: "",
          price: 0,
          options: { optionTitle: "", values: "" },
          active: false,
          reviews: {
            userId: "",
            username: "",
            rating: 0,
            comment: "",
          },
        },
      ];
  const [cartData, setCartData] = useState<typeProduct[]>(getCartData);
  const [Loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getProductCart = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from("user_cart").select();
        if (error) {
          console.error("Error fetching Cart:", error);
          return;
        }
        localStorage.setItem("user_cart", JSON.stringify(data));
        if (data) {
          setCartData(data);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };
    getProductCart();
  }, [isCartDataUpdated]);

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

  return { cartData, Loading, total };
};

export default useUserCart;
