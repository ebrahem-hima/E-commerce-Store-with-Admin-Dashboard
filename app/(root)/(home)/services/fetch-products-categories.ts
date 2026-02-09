import { createClient } from "@/app/utils/supabase/server";

export default async function fetchProductsCategories() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("categories").select(`name,id`);
  if (error) console.error("Error fetching categories:", error);

  return data;
}
