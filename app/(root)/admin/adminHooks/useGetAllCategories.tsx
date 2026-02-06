import { useEffect } from "react";
import { createClient } from "@/app/utils/supabase/client";
import { useState } from "react";
import { categoryDetailType } from "@/types/adminType";

const useGetAllCategories = () => {
  const [categories, setCategories] = useState<categoryDetailType[]>([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("categories").select(`
          id,
          name,
          type,
          description,
          products(count)
          `);

        if (error) throw error;
        if (data) {
          const categories = data.map((category) => ({
            id: category.id,
            name: category.name,
            description: category.description,
            type: category.type,
            productCount: category.products[0].count,
          }));
          setCategories(categories);
        }
      } catch (error) {
        console.log("Error fetching category:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, []);
  return { categories, Loading, setCategories };
};

export default useGetAllCategories;
