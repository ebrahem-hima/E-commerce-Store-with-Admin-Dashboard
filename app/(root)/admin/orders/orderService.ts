import { createClient } from "@/utils/supabase/server";

interface SearchParams {
  filter: string;
  search: string;
}

export const getOrders = async (
  searchParams: SearchParams = { filter: "newest", search: "" },
) => {
  const supabase = await createClient();

  let query = supabase.from("user_order").select();

  const searchText = searchParams.search;
  const selectFilter = searchParams.filter;

  if (searchText) {
    query = query.ilike("order_code", `%${searchText}%`);
  }

  switch (selectFilter) {
    case "newest":
      query = query.order("date", { ascending: false });
      break;
    case "oldest":
      query = query.order("date", { ascending: true });
      break;
  }

  const { data, error } = await query;

  if (error) {
    console.log(error);
    return [];
  }

  return data?.map((o) => ({ ...o, type: "order_table" })) || [];
};
