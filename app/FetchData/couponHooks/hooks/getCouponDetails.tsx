import { MESSAGES } from "@/lib/message";
import { createClient } from "@/app/utils/supabase/client";
import { toast } from "sonner";

const getCouponDetails = async (code: string) => {
  const supabase = createClient();
  if (!code) return;

  const { data, error } = await supabase
    .from("coupons")
    .select()
    .eq("coupon_code", code)
    .maybeSingle();

  if (!data) {
    toast.error(MESSAGES.admin.coupon.notFound);
    return false;
  }
  if (error) {
    console.log(error);
    return false;
  }

  if (!data.is_active) {
    toast.error(MESSAGES.admin.coupon.invalid);
    return;
  }
  return data;
};

export default getCouponDetails;
