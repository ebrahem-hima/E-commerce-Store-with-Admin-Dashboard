import { typeProduct } from "@/types/productTypes";
import { createClient } from "@/utils/supabase/server";

export const getProductDetailServer = async (productID: string) => {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("products")
      .select()
      .eq("id", productID)
      .maybeSingle();

    if (error) throw error;

    if (!data) return null;

    const product: typeProduct = {
      ...data,
      category_id: data.category_id,
    };

    return product;
  } catch (error) {
    console.error(error);
    return null;
  }
};
