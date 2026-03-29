import { createClient } from "@/app/utils/supabase/client";
import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  img: string;
};

interface Props {
  open: boolean;
  search: string;
}

export const GetProductSearch = ({ search, open }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const supabase = createClient();
    const fetchProducts = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("id, name, img")
        .ilike("name", `%${search}%`)
        .limit(10);

      if (!error && data) {
        setProducts(data);
      }

      setLoading(false);
    };

    fetchProducts();
  }, [search, open]);
  return { products, loading };
};

export default GetProductSearch;
