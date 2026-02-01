"use client";

import Image from "next/image";
import { MouseEvent, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import BankForm from "./BankForm";
import DeliveryForm from "./DeliveryForm";
import { toast } from "sonner";
import { useProductContext } from "@/context/productContext";
import { useRouter } from "next/navigation";
import { MESSAGES } from "@/lib/message";
import PriceDisplay from "@/components/shared/priceDisplay";
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

const Page = () => {
  const [checkOut, setCheckOut] = useState<"bank" | "delivery">("delivery");

  const {
    profileData,
    userId,
    cartData,
    getCoupon,
    setGetCoupon,
    setIsUserOrderUpdated,
    total,
    setCartData,
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
      setIsUserOrderUpdated((prev) => !prev);
      setGetCoupon(null);
      setTimeout(() => {
        push(`/thankyou`);
      }, 100);
      setLoading(false);
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
          <ul className="flex flex-col gap-4">
            {/* Item */}
            {cartData?.length > 0 &&
              cartData.map((item) => (
                <li
                  key={item.id}
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
          <TotalComponent someDiscount={someDiscount || 0} />
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
            </fieldset>
          </form>
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
