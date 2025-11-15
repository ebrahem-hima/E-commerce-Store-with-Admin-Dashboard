import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CouponFn from "../../FetchData/couponFn";
import { useProductContext } from "../../../context/productContext";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

const CouponComponent = () => {
  const { setGetCoupon } = useProductContext();
  const { applyCoupon, couponRef, getCoupon } = CouponFn();
  const [couponValue, setCouponValue] = useState("");

  return (
    <div>
      <div className="flex items-center gap-4 mb-2">
        <Input
          ref={couponRef}
          type="text"
          placeholder="Add Coupon"
          value={couponValue}
          onChange={(e) => setCouponValue(e.target.value)}
        />
        <Button
          disabled={couponValue.trim() === ""}
          onClick={(e) => {
            applyCoupon(e);
            setCouponValue("");
          }}
          variant="primary"
          size="sm"
        >
          Apply Coupon
        </Button>
      </div>
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
