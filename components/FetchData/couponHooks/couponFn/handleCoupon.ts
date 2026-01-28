import { MESSAGES } from "@/lib/message";
import { createClient } from "@/app/utils/supabase/client";
import { toast } from "sonner";

interface checkPermissionProps {
  appliesTo?: "specific" | "all";
  couponId: number;
  userId: string;
  userLimitUsage?: number;
}
const supabase = createClient();

const checkUserUsages = async ({
  userId,
  couponId,
  userLimitUsage,
}: checkPermissionProps) => {
  const { data, error } = await supabase
    .from("coupon_usage")
    .select()
    .eq("coupon_id", couponId)
    .eq("user_id", userId);
  if (error) {
    console.log(error);
    return;
  }
  console.log("coupon_usage", data);
  if (userLimitUsage && data.length >= userLimitUsage) {
    toast.info(MESSAGES.admin.coupon.couponLimitMessage);
    return false;
  }
  return true;
};

// to handle public coupons
export const handlePublicCoupon = async ({
  couponId,
  userId,
  userLimitUsage,
}: checkPermissionProps) => {
  const check = await checkUserUsages({ userId, couponId, userLimitUsage });
  if (!check) {
    return;
  }
  return true;
};

// to handle custom coupons
const checkUserPermission = async ({
  couponId,
  userId,
}: checkPermissionProps) => {
  const { data, error } = await supabase
    .from("coupon_assignments")
    .select()
    .eq("coupon_id", couponId)
    .eq("user_id", userId);
  if (error) {
    console.log(error);
    return;
  }
  console.log("coupon_assignments", data);
  if (data.length > 0) {
    return true;
  }
  return false;
};
export const handleCustomCoupon = async ({
  couponId,
  userId,
  userLimitUsage,
}: checkPermissionProps) => {
  const checkUserPermissionVar = await checkUserPermission({
    couponId,
    userId,
  });
  if (!checkUserPermissionVar) {
    toast.error(MESSAGES.admin.coupon.couponNotValid);
    return;
  }
  const checkUserUsage = await checkUserUsages({
    userId,
    couponId,
    userLimitUsage,
  });
  if (!checkUserUsage) {
    return false;
  }
  return true;
};

export const checkCouponDate = async (code: string) => {
  const { data, error } = await supabase
    .from("coupons")
    .select("expired_at")
    .eq("coupon_code", code)
    .maybeSingle();
  // console.log("data", data);
  if (error) {
    console.log(error);
    return false;
  }
  // const toDay2 = getTodayDate();
  const today = new Date(new Date().toISOString());

  const expired = new Date(data?.expired_at);
  // console.log("today", today);
  // console.log("expired", expired);
  return expired >= today;
};

export const checkCouponValid = async (code: string) => {
  const { data, error } = await supabase
    .from("coupons")
    .select("coupon_code")
    .eq("coupon_code", code)
    .maybeSingle();
  if (error) {
    console.log(error);
    return false;
  }
  console.log("couponName", data);
  const valid = data?.coupon_code === code;
  if (!valid) {
    return false;
  }
  return true;
};
