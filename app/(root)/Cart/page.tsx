"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { useProductContext } from "@/context/productContext";
import { updateProduct } from "@/lib/userCartFn";
import CouponComponent from "@/components/shared/checkoutComponent/couponComponent";
import TotalComponent from "@/components/shared/checkoutComponent/totalComponent";
import { TableCart } from "./tableCart";
import { TableCartSkeleton } from "./TableCartSkeleton";

type typeCount = { count: number; id: string }[];
const Page = () => {
  const [count, setCount] = useState<typeCount>([]);
  const { getCoupon, setCartData, userId, cartData, userCartLoading } =
    useProductContext();
  const [disableBtn, setDisableBtn] = useState(true);
  const { push } = useRouter();
  const someDiscount = getCoupon?.value;

  return (
    <div className="grid grid-cols-[350px_1fr] max-lg:grid-cols-1 gap-4 max-lg:grid-flow-dense">
      <div className="flex flex-col gap-4 max-lg:order-2">
        <div className="border border-black rounded-sm py-4 px-2 h-fit flex flex-col gap-4">
          <p className="font-poppins font-medium text-[18px] tracking-[0.4px]">
            Cart Total
          </p>
          <TotalComponent someDiscount={someDiscount || 0} />
          <Button
            type="submit"
            variant="primary"
            className="w-fit mx-auto"
            onClick={() =>
              disableBtn
                ? push(`/checkout`)
                : toast.error("You must submit changes")
            }
          >
            Process to checkout
          </Button>
        </div>
        <CouponComponent />
      </div>
      <div className="overflow-auto min-h-12.5 max-h-screen max-md:order-1">
        {userCartLoading ? (
          <TableCartSkeleton />
        ) : (
          <TableCart
            count={count}
            setCount={setCount}
            setDisableBtn={setDisableBtn}
            disableBtn={disableBtn}
          />
        )}
        <div className="flex-between mt-6">
          <Button
            asChild
            variant="white"
            className="border border-[#999] hover:border-[#e2e1e193] hover:bg-[#e2e1e193] w-fit"
          >
            <Link href={`/`}>Return To Shop</Link>
          </Button>
          <Button
            disabled={disableBtn}
            variant="white"
            className="border border-[#999] hover:border-[#bdbbbb93] hover:bg-[#d8d4d493] w-fit"
            onClick={() => {
              updateProduct({
                setDisableBtn,
                count,
                setCartData,
                userId: userId || "",
                cartData,
              });
            }}
          >
            Update Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
