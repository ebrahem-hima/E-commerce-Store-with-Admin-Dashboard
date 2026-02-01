import { typeProduct } from "@/types/productTypes";
import { profileType } from "@/types/profileFnTypes";
import { createClient } from "@/app/utils/supabase/client";
import { placeOrderSchema } from "@/validation/validation";
import { toast } from "sonner";

export const handleCheckOutValidation = (profileData: profileType) => {
  const result = placeOrderSchema.safeParse({
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    email: profileData.email,
    phone: profileData.phone,
    address1: profileData.address1,
    address2: profileData.address2,
    state: profileData.state,
    country: profileData.country,
  });
  if (!result.success) {
    console.log(result.error.issues);
    toast.error(result.error.issues[0].message);
    return false;
  }
  return true;
};
const supabase = createClient();

interface addOrderItemsProps {
  userId: string;
  cartData: typeProduct[];
  orderId: string;
}
export const addOrderItems = async ({
  userId,
  cartData,
  orderId,
}: addOrderItemsProps) => {
  // to get data without id of row and add order_id
  console.log("cartData", cartData);
  const getData = cartData.map((item) => ({
    img: item.img,
    user_id: userId,
    name: item.name,
    price: item.price,
    order_id: orderId,
    quantity: item.count,
    options: item.options,
    discount: item.discount,
    product_id: item.id,
    discount_type: item.discount_type,
  }));
  const { error: orderItemsError } = await supabase
    .from("order_details")
    .insert(getData);

  if (orderItemsError) {
    console.log("orderError", orderItemsError);
    return false;
  }
  return true;
};

export const incrementCouponUsage = async (
  userId: string,
  couponId: number,
  orderId: string,
) => {
  const { error } = await supabase
    .from("coupon_usage")
    .insert({ user_id: userId, coupon_id: couponId, order_id: orderId });

  if (error) {
    console.log(error);
    return false;
  }
  return true;
};
