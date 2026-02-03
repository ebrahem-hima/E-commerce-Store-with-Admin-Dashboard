import { TopMemberType, TopProductType } from "@/types/adminTabletypes";
import { createClient } from "@/utils/supabase/server";

export interface DashboardData {
  order_count: number;
  order_total: number;
  customers_count: number;
  top_customers: TopMemberType[];
  top_products: TopProductType[];
}

export const getDashboardData = async (): Promise<DashboardData> => {
  const supabase = await createClient();

  const [ordersRes, customersRes, topCustRes, topProdRes] = await Promise.all([
    supabase.from("user_order").select("total"),

    supabase.from("user_profile").select("*", { count: "exact", head: true }),

    supabase.from("top_customers_spent").select().limit(5),

    supabase
      .from("top_products")
      .select()
      .limit(5)
      .order("product_quantity", { ascending: false }),
  ]);

  const orders = ordersRes.data || [];
  const order_count = orders.length;
  const order_total = orders.reduce((acc, o) => acc + (o.total || 0), 0);

  return {
    order_count,
    order_total,
    customers_count: customersRes.count || 0,
    top_customers: topCustRes.data || [],
    top_products: topProdRes.data || [],
  };
};
