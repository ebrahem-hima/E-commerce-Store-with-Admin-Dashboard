import { createClient } from "@/app/utils/supabase/server";
import { typeProduct } from "@/types/productTypes";

export default async function fetchProductDetails(id: string) {
  const supabase = await createClient();
  const { data: productDetail } = await supabase
    .from("products")
    .select()
    .eq("id", id)
    .maybeSingle();

  return productDetail as typeProduct;
}
