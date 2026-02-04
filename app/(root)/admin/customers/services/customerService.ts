import { createClient } from "@/utils/supabase/server";
import { CustomerTableType } from "@/types/adminTableCheckboxtype";


export const getCustomers = async (searchParams: {
  search: string;
  filter: string;
}): Promise<CustomerTableType[]> => {
  const supabase = await createClient();
  
  const searchText = searchParams.search;
  const selectFilter = searchParams.filter;

  let query = supabase
    .from("user_profile")
    .select(`id,first_name,last_name,email,user_order(total)`);

  if (searchText) {
    query = query.ilike("first_name", `%${searchText}%`);
  }

  if (selectFilter) {
    query = query.order("created_at", {
      ascending: selectFilter === "oldest",
    });
  }

  const { data: profileData, error } = await query;
  if (error) throw error;
  if (!profileData) return [];

  const customers: CustomerTableType[] = profileData.map((o) => ({
    id: o.id,
    email: o.email,
    type: "customerTable",
    name: o.first_name + " " + o.last_name,
    order_count: o.user_order.length,
    total_spent:
      o.user_order.length > 0
        ? o.user_order.reduce((acc, curr) => acc + curr.total, 0)
        : 0,
  }));

  return customers;
};
