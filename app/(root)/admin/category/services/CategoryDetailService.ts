// app/actions/getProductsByCategory.ts
import { createClient } from "@/app/utils/supabase/server";

export interface ProductWithCategory {
  id: number;
  name: string;
  price: number;
  stock: number;
  discount: number | null;
  discount_type: string | null;
  img: string;
}

export const getProductsByCategory = async (
  categoryId: number,
): Promise<{
  products: ProductWithCategory[];
  categoryInfo: { name: string; id: number } | null;
}> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      name,
      price,
      stock,
      discount,
      discount_type,
      img
    `,
    )
    .eq("category_id", categoryId);

  if (error) {
    console.error("Error fetching products:", error);
    return { products: [], categoryInfo: null };
  }

  const { data: categoryData, error: CategoryError } = await supabase
    .from("categories")
    .select()
    .eq("id", categoryId)
    .maybeSingle();

  if (CategoryError) {
    console.error("Error fetching categories:", CategoryError);
    return { products: [], categoryInfo: null };
  }

  const products: ProductWithCategory[] = data.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    stock: product.stock,
    discount: product.discount,
    discount_type: product.discount_type,
    img: product.img,
  }));

  const categoryInfo: { name: string; id: number } = {
    name: categoryData.name,
    id: categoryId,
  };

  return { products, categoryInfo };
};
