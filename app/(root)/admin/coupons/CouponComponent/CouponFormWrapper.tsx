import CouponForm from "./CouponForm";
import { getCouponDetails } from "../services/couponDetailService";

const CouponFormWrapper = async ({ couponId }: { couponId: string }) => {
  const result = await getCouponDetails(couponId);

  if (!result) {
    return <p>Coupon Not Found</p>;
  }
  const { couponDetail, categorySelected } = result;
  return (
    <>
      <CouponForm
        couponDetail={couponDetail}
        categorySelected={categorySelected}
        mode="edit"
      />
    </>
  );
};

export default CouponFormWrapper;
