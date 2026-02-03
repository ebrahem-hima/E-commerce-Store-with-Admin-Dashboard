import { Dispatch, SetStateAction } from "react";
import { coupon_type } from "./type";

export interface checkTotalType {
  discount: number;
  discountType: coupon_type;
  total: number;
  ID: number;
  setGetCoupon: Dispatch<SetStateAction<typeGetCoupon>>;
  getCoupon: typeGetCoupon;
  getValue: RefObject<string | null>;
}
