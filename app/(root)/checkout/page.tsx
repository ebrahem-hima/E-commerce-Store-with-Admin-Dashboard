"use client";

import { MouseEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import BankForm from "./checkoutFn/BankForm";
import DeliveryForm from "./components/DeliveryForm";
import { toast } from "sonner";
import { useProductContext } from "@/context/productContext";
import { useRouter } from "next/navigation";
import { MESSAGES } from "@/lib/message";
import { handleDeleteAllProductCart } from "@/lib/userCartFn";
import CouponComponent from "@/components/shared/checkoutComponent/couponComponent";
import TotalComponent from "@/components/shared/checkoutComponent/totalComponent";
import { nanoid } from "nanoid";
import {
  addOrderItems,
  handleCheckOutValidation,
  incrementCouponUsage,
} from "./checkoutFn/checkout";
import createOrder from "./hooks/createOrderFn";
import CartListContent from "./components/CartListContent";
import PaymentMethodSelector from "./components/PaymentMethodSelector";

const Page = () => {
  const [checkOut, setCheckOut] = useState<"bank" | "delivery">("delivery");

  const {
    profileData,
    userId,
    cartData,
    getCoupon,
    setGetCoupon,
    total,
    setCartData,
    userCartLoading,
  } = useProductContext();
  const { push } = useRouter();
  const [Loading, setLoading] = useState(false);
  const someDiscount = getCoupon?.value;

  const placeOrder = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    const code = nanoid(8);
    if (cartData.length === 0) {
      toast.error(MESSAGES.buy.no_products);
      return false;
    }
    try {
      if (!profileData) return;
      const validate = handleCheckOutValidation(profileData);
      if (!validate) return false;

      const orderData = await createOrder({
        userId: userId || "",
        someDiscount: someDiscount!,
        total,
        profileData,
        code,
        checkOut,
      });
      const addOrderItemsCheck = await addOrderItems({
        userId: userId || "",
        cartData,
        orderId: orderData.id,
      });
      if (!addOrderItemsCheck) {
        return false;
      }

      if (getCoupon) {
        await incrementCouponUsage(userId || "", getCoupon.id, orderData.id);
      }

      // Delete All Product Cart
      await handleDeleteAllProductCart({ cartData, setCartData });

      toast.success(MESSAGES.buy.success);
      setGetCoupon(null);
      push(`/thankyou`);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-[30px]">Billing Details</h1>
      <div className="grid md:grid-cols-[1fr_350px] grid-cols-1 gap-8 max-md:grid-flow-dense">
        <div className="max-md:order-2">
          {checkOut === "bank" && <BankForm />}
          {checkOut === "delivery" && <DeliveryForm />}
        </div>
        {/* products */}
        <div className="flex flex-col gap-5 max-md:order-1 text-sm">
          <CartListContent
            userCartLoading={userCartLoading}
            cartData={cartData}
          />
          {/* Total */}
          <TotalComponent someDiscount={someDiscount || 0} />
          {/* Checkbox */}
          <PaymentMethodSelector
            checkOut={checkOut}
            setCheckOut={setCheckOut}
          />
          {/* Coupon */}
          <CouponComponent />
          <Button
            disabled={Loading}
            onClick={placeOrder}
            variant="primary"
            className="w-fit"
          >
            Place Order
            <span className="w-10 h-6 absolute top-1.5 left-[30%]">
              {Loading && (
                <span className="block w-6 h-6 rounded-full border-4 border-white border-t-[#DB4444] animate-spin"></span>
              )}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
