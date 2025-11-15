import { MESSAGES } from "@/lib/message";
import { MouseEvent, useRef } from "react";
import { toast } from "sonner";
import { useProductContext } from "../../context/productContext";
import { createClient } from "@/utils/supabase/client";

interface checkTotalType {
  discount: number;
  discountType: "percentage" | "fixed";
  total: number;
  ID: number;
}

const CouponFn = () => {
  const { getCoupon, setGetCoupon, total } = useProductContext();
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
      const totalDiscount = getCoupon?.value;
      const newTotalDiscount = totalDiscount || 0 + result;
      if (newTotalDiscount > total) {
        toast.error("Discount More total");
        return false;
      }
      setGetCoupon({
        name: getValue.current || "",
        value: result,
        id: ID,
      });

      return true;
    } else if (discountType === "fixed") {
      const totalDiscount = getCoupon?.value;
      const newTotalDiscount = totalDiscount || 0 + discount;
      if (newTotalDiscount > total) {
        toast.error("Discount More total");
        return false;
      }
      setGetCoupon({
        name: getValue.current || "",
        value: discount,
        id: ID,
      });

      return true;
    }
  };

  const applyCoupon = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const code = couponRef.current?.value?.trim();
    if (couponRef.current?.value === "" || !code) return;
    const supabase = createClient();

    const { data, error } = await supabase
      .from("coupons")
      .select()
      .eq("coupon_id", code)
      .single();

    if (error) {
      // PGRST116 => code from supabase mean error because code.id !== any code in database (No rows found)
      if (error.code === "PGRST116") {
        toast.error(MESSAGES.coupon.notFound);
      } else {
        console.log(error);
        toast.error("something went wrong");
      }
      return false;
    }
    if (!data.is_active) {
      toast.error(MESSAGES.coupon.invalid);
      return;
    }

    getValue.current = code;

    const check = await checkTotal({
      discount: data.discount,
      discountType: data.discount_type,
      total,
      ID: data.id,
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
