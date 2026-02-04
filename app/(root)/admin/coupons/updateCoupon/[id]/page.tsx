import { Suspense } from "react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import CouponFormWrapper from "../../CouponComponent/CouponFormWrapper";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: couponId } = await params;
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <CouponFormWrapper couponId={couponId} />
      </Suspense>
    </>
  );
};

export default Page;
