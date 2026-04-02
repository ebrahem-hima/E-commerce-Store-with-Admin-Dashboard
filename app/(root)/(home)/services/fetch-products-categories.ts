import { createClient } from "@/app/utils/supabase/server";

export default async function fetchProductsCategories() {
  const supabase = await createClient();
  const { data: hero_banners, error } = await supabase
    .from("categories")
    .select(`name,id`)
    .limit(12);
  if (error) console.error("Error fetching categories:", error);

  return hero_banners;
}
