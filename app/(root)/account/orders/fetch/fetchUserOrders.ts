import { getUser } from "@/app/(root)/(auth)/authActions/getUser";
import { createClient } from "@/app/utils/supabase/server";
import { TypeUserOrder } from "@/types/adminTableCheckboxtype";

export const getUserOrders = async (): Promise<TypeUserOrder[]> => {
  const user = await getUser();
  if (!user) return [];

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_order")
    .select()
    .eq("user_id", user.id);

  if (error) {
    console.error("Error fetching user orders:", error);
    return [];
  }

  if (!data) return [];

  const orderData: TypeUserOrder[] = data.map((item) => ({
    ...item,
    type: "order_table",
  }));

  return orderData;
};
