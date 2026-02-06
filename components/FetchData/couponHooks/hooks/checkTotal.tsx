import { checkTotalType } from "@/types/fetchType";
import { toast } from "sonner";

const checkTotal = async ({
  discount,
  discountType,
  total,
  ID,
  setGetCoupon,
  getCoupon,
  getValue,
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
  } else if (discountType === "fixed_discount") {
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
  return null;
};

export default checkTotal;
