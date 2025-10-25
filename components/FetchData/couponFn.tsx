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
    const code = couponRef.current?.value?.trim();
    if (!code) return false;
    if (couponRef.current?.value === "") return false;
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
      return false;
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
      return false;
    }
    setIsCouponApplied(true);
    if (couponRef.current) couponRef.current.value = "";
  };

  return { applyCoupon, couponRef, getCoupon };
};

export default CouponFn;
