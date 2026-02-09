import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CouponFn from "../../../app/FetchData/couponFn";
import { useProductContext } from "../../../context/productContext";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

const CouponComponent = () => {
  const { setGetCoupon } = useProductContext();
  const { applyCoupon, couponRef, getCoupon } = CouponFn();
  const [couponValue, setCouponValue] = useState("");

  return (
    <div>
      <form
        onSubmit={(e) => {
          applyCoupon(e);
          setCouponValue("");
        }}
        className="flex items-center gap-4 mb-2"
      >
        <Input
          ref={couponRef}
          type="text"
          placeholder="Add Coupon"
          value={couponValue}
          onChange={(e) => setCouponValue(e.target.value)}
        />
        <Button
          disabled={couponValue.trim() === ""}
          type="submit"
          variant="primary"
          size="sm"
          className="whitespace-nowrap"
        >
          Apply Coupon
        </Button>
      </form>
      <div className="flex items-center gap-2 flex-wrap">
        {getCoupon?.name && (
          <div
            onClick={() => setGetCoupon(null)}
            className="flex items-center gap-1 w-fit px-2 py-1 bg-[#777] rounded-sm text-white text-sm cursor-pointer"
          >
            <span className="text-[11px]">{getCoupon?.name}</span>
            <IoClose />
          </div>
        )}
      </div>
    </div>
  );
};

export default CouponComponent;
