import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Badge from "../Badge";
import CouponFn from "../../FetchData/couponFn";
import { useProductContext } from "../../../context/productContext";

const CouponComponent = () => {
  const { total, setGetCoupon } = useProductContext();
  const { applyCoupon, couponRef, getCoupon } = CouponFn({
    total,
  });
  return (
    <div>
      <div className="flex items-center gap-4 mb-2">
        <Input
          ref={couponRef}
          type="text"
          placeholder="Add Coupon"
          className=""
        />
        <Button onClick={applyCoupon} variant="primary" size="sm">
          Apply Coupon
        </Button>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {getCoupon.map((item, idx) => (
          <Badge setBadge={setGetCoupon} key={idx} text={item.name} />
        ))}
      </div>
    </div>
  );
};

export default CouponComponent;
