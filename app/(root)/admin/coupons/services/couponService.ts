import { createClient } from "@/app/utils/supabase/server";
import { CouponTableType } from "@/types/adminTableCheckboxtype";

interface Props {
  getSearchParams: { filter: string; search: string };
}

export async function getCoupons({ getSearchParams }: Props) {
  const supabase = await createClient();

  const selectFilter = getSearchParams.filter;
  const searchText = getSearchParams.search;

  try {
    let query = supabase.from("coupons").select(`
      *,
      coupon_assignments(
        user_profile(
          first_name,
          last_name,
          id
        )
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

    if (searchText) {
      query = query.ilike("coupon_code", `%${searchText}%`);
    }

    const { data, error } = await query;

    if (error) throw error;
    console.log("data", data);
    if (!data) return [];

    const couponsWithType: CouponTableType[] = data.map((c) => ({
      ...c,
      type: "couponTable",
    }));

    return couponsWithType;
  } catch (error) {
    console.error("Error fetching coupons:", error);
    return [];
  }
}
