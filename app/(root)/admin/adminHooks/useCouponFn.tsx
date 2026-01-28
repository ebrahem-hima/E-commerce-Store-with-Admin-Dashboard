"use client";

import { CouponTableType } from "@/types/adminTableCheckboxtype";
import { createClient } from "@/app/utils/supabase/client";
import { useEffect, useState } from "react";

interface Props {
  searchText?: string;
  selectFilter?: string;
}

const useCouponFn = ({ searchText, selectFilter }: Props) => {
  const [coupon, setCoupon] = useState<CouponTableType[]>([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoupons = async () => {
      setLoading(true);
      const supabase = createClient();
      try {
        let query = supabase.from("coupons").select(`
          *,
          coupon_assignments(
            user_profile(
            first_name,
            last_name,
            id)
            ),
            usage_count
        `);

        switch (selectFilter) {
          case "created_desc":
            query = query.order("created_at", { ascending: false });
            break;
          case "created_asc":
            query = query.order("created_at", { ascending: true });
            break;
          case "discount_desc":
            query = query.order("discount", { ascending: false });
            break;
          case "discount_asc":
            query = query.order("discount", { ascending: true });
            break;
          case "used_desc":
            query = query.order("times_used", { ascending: false });
            break;
          case "used_asc":
            query = query.order("times_used", { ascending: true });
            break;
          case "expire_asc":
            query = query.order("expired_at", { ascending: true });
            break;
          case "active_desc":
            query = query.order("is_active", { ascending: false });
            break;
          default:
            break;
        }

        const { data, error } = await query;
        // console.log("data", data);
        if (error) throw error;

        if (searchText) {
          query = query.ilike("coupon_id", `%${searchText}%`);
        }

        if (!data) return;

        const couponsWithType = data.map((c) => ({
          ...c,
          type: "couponTable" as const,
        }));

        setCoupon(couponsWithType);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchCoupons, 500);
    return () => clearTimeout(debounceTimeout);
  }, [searchText, selectFilter]);

  return { Loading, coupon, setCoupon };
};

export default useCouponFn;
