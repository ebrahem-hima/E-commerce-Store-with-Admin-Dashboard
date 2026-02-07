"use client";

import { typeProduct } from "@/types/productTypes";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export const GetProductsByName = ({ inputValue }: { inputValue: string }) => {
  const [Loading, setLoading] = useState(false);
  const [productSearch, setProductSearch] = useState<typeProduct[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        if (inputValue !== "") {
          const supabase = createClient();
          const { data, error } = await supabase
            .from("products")
            .select()
            .ilike("name", `%${inputValue}%`);

          if (error) {
            console.log("Error fetching products:", error);
            return;
          }
          setProductSearch(data || []);
        }
      } catch (error) {
        console.log("Error fetching products:", error);
        // return false
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [inputValue]);
  return { Loading, productSearch };
};

export default GetProductsByName;
