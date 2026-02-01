import { profileType } from "@/types/profileFnTypes";
import { createClient } from "@/app/utils/supabase/client";

const supabase = createClient();

interface InsetOrderProps {
  userId: string;
  someDiscount: number;
  total: number;
  profileData: profileType;
  code: string;
  checkOut: "bank" | "delivery";
}

const createOrder = async ({
  userId,
  someDiscount,
  total,
  profileData,
  code,
  checkOut,
}: InsetOrderProps) => {
  const { data: orderData, error: orderError } = await supabase
    .from("user_order")
    .insert({
      user_id: userId,
      total: someDiscount ? total - someDiscount : total,
      customer: profileData.firstName + " " + profileData.lastName,
      payment_status: checkOut === "delivery" ? "pending" : "paid",
      order_status: "ready",
      order_code: code,
    })
    .select()
    .maybeSingle();
  if (orderError) {
    console.log("orderError", orderError);
    return false;
  }
  return orderData;
};

export default createOrder;
