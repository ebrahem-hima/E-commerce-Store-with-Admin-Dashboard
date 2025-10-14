import { toast } from "sonner";
import { MESSAGES } from "./message";
import { Dispatch, MouseEvent, SetStateAction } from "react";
import { supabase } from "@/supabase-client";

type typeGetCoupon = { name: string; value: number };

interface sameType {
  total: number;
  setGetCoupon: Dispatch<SetStateAction<typeGetCoupon[]>>;
  getCoupon: typeGetCoupon[];
}

interface checkTotalType extends sameType {
  couponRef: React.RefObject<HTMLInputElement | null>;
  discount: number;
  discountType: "percentage" | "fixed";
}

const checkTotal = async ({
  discount,
  discountType,
  getCoupon,
  total,
  setGetCoupon,
  couponRef,
}: checkTotalType) => {
  if (discountType === "percentage") {
    const result = total - total * (discount / 100);
    const totalDiscount = getCoupon.reduce((acc, curr) => acc + curr.value, 0);
    const newTotalDiscount = totalDiscount + result;
    if (newTotalDiscount > total) {
      toast.error("Discount More total");
      return false;
    }
    setGetCoupon((prev) => [
      ...prev,
      { name: couponRef.current?.value || "", value: result },
    ]);
  } else if (discountType === "fixed") {
    const totalDiscount = getCoupon.reduce((acc, curr) => acc + curr.value, 0);
    const newTotalDiscount = totalDiscount + discount;
    if (newTotalDiscount > total) {
      toast.error("Discount More total");
      return false;
    }
    setGetCoupon((prev) => [
      ...prev,
      { name: couponRef.current?.value || "", value: discount },
    ]);
  }
};

interface applyCouponType extends sameType {
  e: MouseEvent<HTMLButtonElement>;
  couponRef: React.RefObject<HTMLInputElement | null>;
  setIsCouponApplied: Dispatch<SetStateAction<boolean>>;
}

export const applyCoupon = async ({
  e,
  setIsCouponApplied,
  couponRef,
  total,
  setGetCoupon,
  getCoupon,
}: applyCouponType) => {
  e.preventDefault();
  if (couponRef.current?.value === "") return false;
  const { data, error } = await supabase
    .from("coupons")
    .select()
    .eq("coupon_id", couponRef.current?.value)
    .single();
  if (error) {
    console.log(error);
    return false;
  }
  if (!data.is_active) {
    toast.error(MESSAGES.coupon.invalid);
    return false;
  }
  if (data.coupon_id !== couponRef.current?.value) {
    toast.error(MESSAGES.coupon.notFound);
    return false;
  }
  const check = checkTotal({
    discount: data.discount,
    discountType: data.discount_type,
    total,
    setGetCoupon,
    getCoupon,
    couponRef,
  });
  if (!check) {
    if (couponRef.current) couponRef.current.value = "";
    return false;
  }
  setIsCouponApplied(true);
  if (couponRef.current) couponRef.current.value = "";
};
