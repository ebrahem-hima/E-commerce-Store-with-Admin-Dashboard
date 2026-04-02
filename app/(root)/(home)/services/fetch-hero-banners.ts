import { createClient } from "@/app/utils/supabase/server";

export default async function fetchHeroBanners() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("hero_banners")
    .select(`id,name,image_url,productId`);
  if (error) console.error("Error fetching hero banners:", error);

  return data;
}
