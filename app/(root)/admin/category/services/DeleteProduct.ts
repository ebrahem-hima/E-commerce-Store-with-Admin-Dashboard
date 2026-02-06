import { createClient } from "@/app/utils/supabase/client";

export const deleteProductById = async (productId: number) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);

  if (error) {
    console.error("Error deleting product:", error);
    return false;
  }
};
