import { createClient } from "@/app/utils/supabase/server";
import { categoryDetailType } from "@/types/adminType";

export const getAllCategories = async (): Promise<categoryDetailType[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("categories").select(`
      id,
      name,
      type,
      description,
      products(count)
    `);

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return (
    data?.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description,
      type: category.type,
      productCount: category.products?.[0]?.count ?? 0,
    })) ?? []
  );
};
