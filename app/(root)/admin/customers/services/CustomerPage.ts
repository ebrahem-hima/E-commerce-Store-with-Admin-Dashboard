import { createClient } from "@/app/utils/supabase/server";
import { CustomerUI } from "@/types/adminFetchType";
import { TypeUserOrder } from "@/types/adminTableCheckboxtype";

export default async function CustomerPage(customerId: string) {
  const supabase = await createClient();

  // Fetch Customer
  const { data: customerData, error: customerError } = await supabase
    .from("user_profile")
    .select()
    .eq("id", customerId)
    .maybeSingle();

  if (customerError) {
    throw new Error("Error fetching customer");
  }

  const customer: CustomerUI = {
    id: customerData.id,
    name:
      customerData.first_name + " " + customerData.last_name || "Unknown Name",
    country: customerData.country || "Unknown",
    memberSince: customerData.created_at,
    address1: customerData.address1 || "",
    address2: customerData.address2 || "",
    email: customerData.email || "",
    phone: customerData.phone || "",
  };

  // Fetch Orders
  const { data: ordersData, error: ordersError } = await supabase
    .from("user_order")
    .select()
    .eq("user_id", customerId);

  if (ordersError) {
    throw new Error("Error fetching orders");
  }

  const Orders: TypeUserOrder[] =
    ordersData?.map((item) => ({
      ...item,
      type: "order_table",
    })) || [];

  return { Orders, customer };
}
