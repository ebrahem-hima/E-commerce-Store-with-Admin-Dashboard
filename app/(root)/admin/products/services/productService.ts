import { createClient } from "@/app/utils/supabase/server";

export const getProducts = async (searchParams: {
  search: string;
  filter: string;
}) => {
  const supabase = await createClient();
  let query = supabase.from("products").select(
    `
          id,discount,discount_type,img,name,stock,price,created_at,
          categories (
            name
          )
        `,
  );

  const searchText = searchParams.search;
  const selectFilter = searchParams.filter;

  console.log("selectFilter", selectFilter);

  if (searchText) {
    query = query.ilike("name", `%${searchText}%`);
  }

  switch (selectFilter) {
    case "newest":
      query = query.order("created_at", { ascending: false });
      break;
    case "oldest":
      query = query.order("created_at", { ascending: true });
      break;
    case "price_high":
      query = query.order("price", { ascending: false });
      break;
    case "price_low":
      query = query.order("price", { ascending: true });
      break;
    default:
      query = query.order("created_at", { ascending: false });
      break;
  }

  const { data, error } = await query;

  console.log("data", data);

  if (error) throw error;
  if (!data) return;
  return data.map((c) => ({
    ...c,
    type: "productTable" as const,
    // I check if it is an array or an object
    // because TypeScript thinks Supabase always gives an array
    categories: Array.isArray(c.categories) ? c.categories[0] : c.categories,
  }));
};
