import { CouponTableType } from "@/types/adminTableCheckboxtype";
import { createClient } from "@/app/utils/supabase/client";
import { Dispatch, SetStateAction, useEffect } from "react";

const CouponRealTime = ({
  setCoupon,
}: {
  setCoupon: Dispatch<SetStateAction<CouponTableType[]>>;
}) => {
  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel("coupon-changes")
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "coupons",
        },
        (payload) => {
          setCoupon((prev) =>
            prev.filter((category) => category?.id !== payload.old.id),
          );
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [setCoupon]);
  return null;
};

export default CouponRealTime;
