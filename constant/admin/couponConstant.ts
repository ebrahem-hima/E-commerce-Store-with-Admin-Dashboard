import { Percent, Truck, Tag } from "lucide-react";
import { CiMoneyBill } from "react-icons/ci";

export const couponTypes = [
  { icon: CiMoneyBill, label: "Fixed Discount", value: "fixed_discount" },
  { icon: Percent, label: "Percentage Discount", value: "percentage" },
  { icon: Truck, label: "Free Shipping", value: "shipping" },
  { icon: Tag, label: "Price Discount", value: "price_discount" },
];
