import { createClient } from "@/app/utils/supabase/server";
import { splitProducts } from "./productHelpers";
import { extractUniqueFilters } from "./filterUtils";

interface FetchProductsParams {
  querySearch?: string;
  sort?: string;
  filters: { optionTitle: string; values: string[] }[];
}

export async function getSearchProducts({
  querySearch,
  filters,
  sort,
}: FetchProductsParams) {
  const supabase = await createClient();
  let query = supabase.from("products").select();
  if (querySearch) {
    query = query.ilike("search_text", `%${querySearch}%`);
  }
  if (sort === "hight-to-low") {
    query = query.order(sort, { ascending: false });
  } else if (sort === "low-to-high") {
    query = query.order(sort, { ascending: true });
  }
  if (filters.length > 0) {
    const orConditions: string[] = [];
    filters.forEach(({ optionTitle, values }) => {
      values.forEach((singleValue) => {
        const rawJson = JSON.stringify([
          { optionTitle, values: [singleValue] },
        ]);
        const escapedJson = rawJson.replace(/"/g, '\\"');
        const condition = `options.cs."${escapedJson}"`;
        orConditions.push(condition);
      });
    });

    if (orConditions.length > 0) {
      query = query.or(orConditions.join(","));
    }
  }

  const { data, error } = await query;

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error("Failed to fetch products");
  }
  const mergeArray = extractUniqueFilters(data || []);
  const { bestSellersProducts, otherProducts } = splitProducts(data || []);

  return { bestSellersProducts, otherProducts, mergeArray };
}
