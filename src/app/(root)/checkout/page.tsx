"use client";

import Image from "next/image";
import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import BankForm from "./BankForm";
import DeliveryForm from "./DeliveryForm";
import { placeOrderSchema } from "../../../../validation";
import { toast } from "sonner";
import { useProductContext } from "../../../../context/productContext";
import { supabase } from "@/supabase-client";
import { useRouter } from "next/navigation";
import { MESSAGES } from "@/lib/message";
import PriceDisplay from "../../../../components/shared/priceDisplay";
import { handleDeleteAllProductCart } from "@/lib/userCartFn";
import useUserCart from "../../../../components/FetchData/useUserCart";
import CouponComponent from "../../../../components/shared/checkoutComponent/couponComponent";
import TotalComponent from "../../../../components/shared/checkoutComponent/totalComponent";

const Page = () => {
  const [checkOut, setCheckOut] = useState<"bank" | "delivery">("delivery");

  const {
    profileData,
    userId,
    cartData,
    setIsCartDataUpdated,
    isCartDataUpdated,
    getCoupon,
    setGetCoupon,
    isCouponApplied,
    setIsCouponApplied,
  } = useProductContext();

  const { push } = useRouter();
  const { Loading } = useUserCart(isCartDataUpdated);
  const someDiscount = getCoupon.reduce((acc, curr) => acc + curr.value, 0);
  const placeOrder = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (cartData.length === 0) {
      toast.error(MESSAGES.buy.no_products);
      return false;
    }
    try {
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
    } catch (error) {
      console.log("error", error);
      return false;
    }
    const { error: orderError } = await supabase
      .from("user_orders")
      .insert(cartData)
      .eq("user_id", userId);
    if (orderError) {
      console.log("orderError", orderError);
      return false;
    }
    // Delete All Product Cart
    await handleDeleteAllProductCart({ cartData });

    const getCouponIDs = getCoupon.map((coupon) => coupon.id);
    if (isCouponApplied) {
      const { error } = await supabase.rpc("increment_coupons_usage", {
        coupon_ids: getCouponIDs,
      });

      if (error) {
        console.log("RPC Error:", error);
        return false;
      }
    }
    setIsCartDataUpdated((prev) => !prev);
    toast.success(MESSAGES.buy.success);
    setIsCouponApplied(false);
    setGetCoupon([]);
    push(`/thankyou`);
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || Loading) {
    return <div>Loading....</div>;
  }
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-[30px]">Billing Details</h1>
      <div className="grid md:grid-cols-[1fr_350px] grid-cols-1 gap-10 max-md:grid-flow-dense">
        <div className="max-md:order-2">
          {checkOut === "bank" && <BankForm />}
          {checkOut === "delivery" && <DeliveryForm />}
        </div>
        {/* products */}
        <div className="flex flex-col gap-5 max-md:order-1 text-sm">
          <ul className="flex flex-col gap-4">
            {/* Item */}
            {cartData?.length > 0 &&
              cartData.map((item) => (
                <li
                  key={item.product_id}
                  className="grid grid-cols-[40px_1fr_auto_auto] items-center gap-4"
                >
                  <Image
                    src={item.img}
                    alt={item.name || "Product image"}
                    width={120}
                    height={120}
                    priority
                  />
                  <span className="line-clamp-1 break-all">{item.name}</span>
                  <span>x{item.count}</span>
                  <span>
                    <PriceDisplay
                      price={item.price}
                      discount={item.discount}
                      discountType={item.discount_type}
                    />
                  </span>
                </li>
              ))}
          </ul>
          {/* Total */}
          <TotalComponent someDiscount={someDiscount} />
          {/* Checkbox */}
          <form>
            <fieldset className="flex-between">
              <RadioGroup
                value={checkOut}
                onValueChange={(value) =>
                  setCheckOut(value as "bank" | "delivery")
                }
                className="flex flex-col gap-2"
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="bank" id="rBank1" />
                  <label htmlFor="rBank1">Bank</label>
                </div>

                <div className="flex items-center gap-3">
                  <RadioGroupItem value="delivery" id="delivery" />
                  <label htmlFor="delivery">Cash on delivery</label>
                </div>
              </RadioGroup>

              {/* Bank icons */}
              <div className="flex items-center">Icon</div>
            </fieldset>
          </form>
          <CouponComponent />

          <Button onClick={placeOrder} variant="primary" className="w-fit">
            Place Order
            <span className="w-10 h-6 absolute top-1.5 left-[30%]">
              {Loading && (
                <span className="block w-6 h-6 rounded-full border-4 border-white border-t-[#DB4444] animate-spin "></span>
              )}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
