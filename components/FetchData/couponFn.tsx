import { FormEvent, useRef } from "react";
import { useProductContext } from "../../context/productContext";
import {
  checkCouponDate,
  checkCouponValid,
  handleCustomCoupon,
  handlePublicCoupon,
} from "./couponHooks/couponFn/handleCoupon";
import checkTotal from "./couponHooks/hooks/checkTotal";
import { MESSAGES } from "@/lib/message";
import { toast } from "sonner";
import getCouponDetails from "./couponHooks/hooks/getCouponDetails";

interface checkPermissionProps {
  isPublic?: boolean;
  couponId: number;
  userId: string;
  userLimitUsage: number;
}

const CouponFn = () => {
  const { getCoupon, setGetCoupon, total, userId } = useProductContext();
  const couponRef = useRef<HTMLInputElement | null>(null);
  const getValue = useRef<string | null>(null);

  const checkPermissions = async ({
    isPublic,
    couponId,
    userId,
    userLimitUsage,
  }: checkPermissionProps) => {
    if (!isPublic) {
      const check = await handleCustomCoupon({
        couponId,
        userId,
        userLimitUsage,
      });
      if (!check) return false;
      return true;
    } else if (isPublic) {
      const check = await handlePublicCoupon({
        couponId,
        userId,
        userLimitUsage,
      });
      if (!check) return false;
      return true;
    }
  };

  const applyCoupon = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const code = couponRef.current?.value?.trim();
    if (!code) return false;

    const validCoupon = await checkCouponValid(code);
    if (!validCoupon) {
      toast.error(MESSAGES.admin.coupon.couponNotValid);
      return false;
    }
    const checkDate = await checkCouponDate(code);
    if (!checkDate) {
      toast.error(MESSAGES.admin.coupon.couponDateExpired);
      return false;
    }
    const data = await getCouponDetails(code);

    const checkPermission = await checkPermissions({
      isPublic: data.isPublic,
      couponId: data.id,
      userId: userId || "",
      userLimitUsage: data.usage_limit_per_user,
    });

    if (!checkPermission) return false;

    getValue.current = code;
    const check = await checkTotal({
      discount: data.discount,
      discountType: data.coupon_type,
      total,
      ID: data.id,
      setGetCoupon,
      getCoupon,
      getValue,
    });
    if (!check) {
      if (couponRef.current) couponRef.current.value = "";
      return;
    }
    if (couponRef.current) couponRef.current.value = "";
  };
  return { applyCoupon, couponRef, getCoupon };
};

export default CouponFn;
