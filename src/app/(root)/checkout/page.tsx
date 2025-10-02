"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React, { useState } from "react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useUserCart from "../../../../components/shared/useUserCart";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import BankForm from "./BankForm";
import DeliveryForm from "./DeliveryForm";
// import { typeProduct } from "../../../../types/productTypes";

const Page = () => {
  const [checkOut, setCheckOut] = useState<"bank" | "delivery">("bank");
  const { cartData, Loading } = useUserCart();
  const total = cartData.reduce(
    (acc, curr) => acc + (curr.count || 1) * curr.price,
    0
  );
  if (!cartData) return;
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
            {Loading ? (
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ) : (
              cartData.map((item) => (
                <li
                  key={item.product_id}
                  className="grid grid-cols-[40px_1fr_auto_auto] items-center gap-4"
                >
                  <Image
                    src={item.img}
                    alt={`img ${item.name}`}
                    width={120}
                    height={120}
                    className=""
                  />
                  <span className="line-clamp-1 break-all">{item.name}</span>
                  <span>x{item.count}</span>
                  <span>${(item.count || 0) * item.price}</span>
                </li>
              ))
            )}
          </ul>
          {/* Total */}
          <div className="flex flex-col gap-2">
            <p className="flex-between text-sm">
              <span>Subtotal:</span>
              <span>${total}</span>
            </p>
            <div className="w-full h-[1px] bg-[#999]" />
            <p className="flex-between text-sm">
              <span>Total:</span>
              <span>${total}</span>
            </p>
          </div>
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
          <div className="flex items-center gap-4">
            <Input type="text" placeholder="Add Coupon" className="" />
            <Button variant="primary" size="sm">
              Apply Coupon
            </Button>
          </div>
          <Button variant="primary" className="w-fit">
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
