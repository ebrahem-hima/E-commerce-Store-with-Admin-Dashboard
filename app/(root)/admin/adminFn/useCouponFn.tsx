"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

type CustomerType = {
  img: string;
  name: string;
  location: string;
  orders: number;
  totalSpent: number;
};

interface Props {
  isCouponChange?: boolean;
  searchText?: string;
  selectFilter?: string;
}

const useCouponFn = ({ isCouponChange, searchText, selectFilter }: Props) => {
  const [coupon, setCoupon] = useState<CustomerType[]>([]);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const supabase = createClient();
      try {
        let data;
        if (searchText) {
          const res = await supabase
            .from("coupons")
            .select("*")
            .ilike("coupon_id", `%${searchText}%`);
          data = res.data || [];
        } else {
          const res = await supabase
            .from("coupons")
            .select("*", { count: "exact" })
            .order("created_at", {
              ascending: selectFilter === "Oldest" ? true : false,
            });
          data = res.data || [];
        }

        const ordersWithType = data.map((o) => ({
          ...o,
          type: "couponTable" as const,
        }));

        setCoupon(ordersWithType);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchOrders, 500);

    return () => clearTimeout(debounceTimeout);
  }, [isCouponChange, searchText, selectFilter]);
  return {
    Loading,
    coupon,
  };
};

export default useCouponFn;
