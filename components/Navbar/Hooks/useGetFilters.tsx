import { createClient } from "@/app/utils/supabase/client";
import { useEffect, useState } from "react";

const useGetFilters = () => {
  const [filter, setFilter] = useState<
    { id: string; name: string; products: { id: string; name: string }[] }[]
  >([]);
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    const supabase = createClient();
    const getFilters = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("categories").select(`
            id,
            name,
            products (
              id,
              name
            )
          `);
        if (error) {
          console.error(error);
          return null;
        }
        setFilter(data);
      } catch (error) {
        console.error(error);
        setLoading(false);
        return;
      } finally {
        setLoading(false);
      }
    };
    getFilters();
  }, []);
  return { filter, Loading };
};

export default useGetFilters;
