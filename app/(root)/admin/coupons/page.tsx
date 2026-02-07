import PageHeader from "../shared/PageHeader";
import { Suspense } from "react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import CouponContent from "./CouponComponent/CouponContent";

interface Props {
  searchParams: Promise<{
    filter: string;
    search: string;
  }>;
}

const Page = async ({ searchParams }: Props) => {
  const getSearchParams = await searchParams;

  return (
    <>
      <PageHeader
        link="/admin/coupons/createCoupon"
        title="Coupons"
        buttonText="Create coupon"
      />
      <Suspense fallback={<LoadingSpinner />}>
        <CouponContent getSearchParams={getSearchParams} />
      </Suspense>
    </>
  );
};

export default Page;
