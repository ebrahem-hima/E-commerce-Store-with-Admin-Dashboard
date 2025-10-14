import { MESSAGES } from "@/lib/message";
import { supabase } from "@/supabase-client";
import { MouseEvent, useRef } from "react";
import { toast } from "sonner";
import { useProductContext } from "../../context/productContext";

interface checkTotalType {
  discount: number;
  discountType: "percentage" | "fixed";
  total: number;
  ID: number;
}

interface Props {
  total: number;
}

const CouponFn = ({ total }: Props) => {
  const { getCoupon, setGetCoupon, setIsCouponApplied } = useProductContext();
  const couponRef = useRef<HTMLInputElement | null>(null);
  const getValue = useRef<string | null>(null);

  const checkTotal = async ({
    discount,
    discountType,
    total,
    ID,
  }: checkTotalType) => {
    if (discountType === "percentage") {
      const result = total * (discount / 100);
      console.log("result", result);
      const totalDiscount = getCoupon.reduce(
        (acc, curr) => acc + curr.value,
        0
      );
      const newTotalDiscount = totalDiscount + result;
      if (newTotalDiscount > total) {
        toast.error("Discount More total");
        return false;
      }
      setGetCoupon((prev) => [
        ...prev,
        { name: getValue.current || "", value: result, id: ID },
      ]);

      return true;
    } else if (discountType === "fixed") {
      const totalDiscount = getCoupon.reduce(
        (acc, curr) => acc + curr.value,
        0
      );
      const newTotalDiscount = totalDiscount + discount;
      if (newTotalDiscount > total) {
        toast.error("Discount More total");
        return false;
      }
      setGetCoupon((prev) => [
        ...prev,
        { name: getValue.current || "", value: discount, id: ID },
      ]);
      return true;
    }
  };

  const applyCoupon = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (couponRef.current?.value === "") return false;
    const { data, error } = await supabase
      .from("coupons")
      .select()
      .eq("coupon_id", couponRef.current?.value)
      .single();
    if (error) {
      console.log(error);
      // toast.error(MESSAGES.coupon.notFound);
      return false;
    }
    if (data.coupon_id !== couponRef.current?.value) {
      toast.error(MESSAGES.coupon.notFound);
      return false;
    }
    if (!data.is_active) {
      toast.error(MESSAGES.coupon.invalid);
      return false;
    }
    if (couponRef.current?.value) {
      getValue.current = couponRef.current.value;
    }
    const check = await checkTotal({
      discount: data.discount,
      discountType: data.discount_type,
      total,
      ID: data.id,
    });

    if (!check) {
      if (couponRef.current) couponRef.current.value = "";
      return false;
    }
    setIsCouponApplied(true);
    if (couponRef.current) couponRef.current.value = "";
  };

  return { applyCoupon, couponRef, getCoupon };
};

export default CouponFn;
