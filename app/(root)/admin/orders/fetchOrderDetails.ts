import { OrderDetailsType } from "@/types/productTypes";
import { createClient } from "@/app/utils/supabase/server";

const fetchOrderDetails = async (orderId: string) => {
  const supabase = await createClient();

  try {
    const { data: orderData, error: orderError } = await supabase
      .from("user_order")
      .select("id")
      .eq("order_code", orderId)
      .single();

    if (orderError || !orderData) {
      console.error(orderError);
      return [];
    }

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

    if (error) {
      console.error(error);
      return [];
    }

    return (data?.map((item) => ({
      ...item,
      type: "order_details",
    })) || []) as OrderDetailsType[];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export default fetchOrderDetails;
