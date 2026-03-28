"use client";

import { typeProduct } from "@/types/productTypes";
import { createClient } from "@/app/utils/supabase/client";
import { useEffect, useState } from "react";
import { setTimeout } from "timers";

export const GetProductsByName = ({ inputValue }: { inputValue: string }) => {
  const [Loading, setLoading] = useState(true);
  const [productSearch, setProductSearch] = useState<typeProduct[]>([]);
  useEffect(() => {
    let active = true;
    setLoading(true);
    if (inputValue === "") {
      setProductSearch([]);
      setLoading(false);
      return;
    }
    const fetchProducts = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("products")
          .select()
          .ilike("name", `%${inputValue}%`);

        if (error) {
          console.log("Error fetching products:", error);
          if (active) setLoading(false);
          setProductSearch([]);
          return;
        }
        if (active) {
          setProductSearch(data || []);
          setLoading(false);
        }
      } catch (error) {
        console.log("Error fetching products:", error);
        if (active) setLoading(false);
        return;
      }
    };

    const timer = setTimeout(async () => {
      if (active) await fetchProducts();
    }, 300);

    return () => {
      clearTimeout(timer);
      active = false;
    };
  }, [inputValue]);
  return { Loading, productSearch };
};

export default GetProductsByName;
