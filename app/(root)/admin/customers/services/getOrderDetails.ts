import { OrderDetailsType } from "@/types/productTypes";
import { createClient } from "@/app/utils/supabase/server";

export async function getOrderDetails(orderId: string) {
  const supabase = await createClient();

  try {
    const { data: orderData, error: orderError } = await supabase
      .from("user_order")
      .select("id")
      .eq("order_code", orderId)
      .maybeSingle();

    if (orderError) throw orderError;
    if (!orderData) return { products: [] };

    const { data, error } = await supabase
      .from("order_details")
      .select(
        `
        id,
        product_id,
        img,
        name,
        price,
        discount,
        discount_type,
        quantity,
        options
      `,
      )
      .eq("order_id", orderData.id);

    if (error) throw error;

    const products: OrderDetailsType[] =
      data?.map((item) => ({
        ...item,
        type: "orderDetails",
      })) || [];

    return { products };
  } catch (error) {
    console.error("Error fetching order details:", error);
    return { products: [] };
  }
}
