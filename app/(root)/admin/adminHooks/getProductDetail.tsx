import { typeProduct } from "@/types/productTypes";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const GetProductDetail = (productID?: string) => {
  const [product, setProduct] = useState<typeProduct | null>(null);
  useEffect(() => {
    const supabase = createClient();
    const getProductDetail = async () => {
      const { data, error } = await supabase
        .from("products")
        .select()
        .eq("id", productID)
        .maybeSingle();

      if (error) {
        console.log(error);
        return;
      }

      if (data) {
        setProduct({
          ...data,
          categories: { id: data.category_id },
        });
      }
    };
    if (productID) getProductDetail();
  }, [productID]);
  return { product };
};

export default GetProductDetail;
