"use client";

import { useEffect, useState } from "react";
import { typeProduct } from "../../types/productTypes";
import { supabase } from "@/supabase-client";
import { useProductContext } from "../../context/productContext";

const useUserCart = <T1, T2>(firstDepend?: T1, secondDepend?: T2) => {
  const [cartData, setCartData] = useState<typeProduct[]>([]);
  const [Loading, setLoading] = useState(false);
  const { isProductAdded, wishListStatus } = useProductContext();
  useEffect(() => {
    const getProductCart = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from("user_cart").select();
        if (error) {
          console.error("Error fetching Cart:", error);
          return;
        }
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
  }, [isProductAdded, wishListStatus, firstDepend, secondDepend]);
  return { cartData, Loading };
};

export default useUserCart;
