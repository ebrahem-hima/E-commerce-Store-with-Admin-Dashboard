import { createClient } from "@/app/utils/supabase/server";
import fetchProductDetails from "./fetchProductDetails";

export default async function fetchRelatedProduct(productId: string) {
  const supabase = await createClient();
  const data = await fetchProductDetails(productId);

  const { data: relatedProducts } = await supabase
    .from("products")
    .select()
    .eq("category_id", data.category_id);

  return relatedProducts?.filter((product) => product.id !== productId) || [];
}
