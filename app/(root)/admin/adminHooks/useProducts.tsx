"use client";

import { TypeProductTable } from "@/types/adminTableCheckboxtype";
import { createClient } from "@/app/utils/supabase/client";
import { useEffect, useState } from "react";

interface Props {
  searchText?: string;
  selectFilter?: string;
}

const useProducts = ({ searchText, selectFilter }: Props) => {
  const [Products, setProducts] = useState<TypeProductTable[]>([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const supabase = createClient();
      try {
        let query = supabase.from("products").select(`
            id,discount,discount_type,img,name,stock,price,created_at,
            categories (
              name
            )
          `);

        if (searchText) {
          query = query.ilike("name", `%${searchText}%`);
        }

        switch (selectFilter) {
          case "newest":
            query = query.order("created_at", { ascending: false });
            break;
          case "oldest":
            query = query.order("created_at", { ascending: true });
            break;
          case "price_high":
            query = query.order("price", { ascending: false });
            break;
          case "price_low":
            query = query.order("price", { ascending: true });
            break;
          default:
            break;
        }

        const { data, error } = await query;

        if (error) throw error;
        if (!data) return;
        const productsWithType = data.map((c) => ({
          ...c,
          type: "productTable" as const,
          // I check if it is an array or an object
          // because TypeScript thinks Supabase always gives an array
          categories: Array.isArray(c.categories)
            ? c.categories[0]
            : c.categories,
        }));
        setProducts(productsWithType);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchProducts, 500);
    return () => clearTimeout(debounceTimeout);
  }, [searchText, selectFilter]);

  return { Loading, Products, setProducts };
};

export default useProducts;
