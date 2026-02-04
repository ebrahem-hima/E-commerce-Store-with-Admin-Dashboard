import { createClient } from "@/app/utils/supabase/server";
import { categoryType, couponDetailType } from "@/types/adminType";

export async function getCouponDetails(couponId: string) {
  const supabase = await createClient();

  try {
    const { data: usersCoupon, error: usersCouponError } = await supabase
      .from("coupon_assignments")
      .select("user_id")
      .eq("coupon_id", couponId);

    if (usersCouponError) throw usersCouponError;

    const userIds = usersCoupon.map((u) => u.user_id);

    // 2️⃣ Get user profiles
    const { data: profileData, error: profileError } = await supabase
      .from("user_profile")
      .select("first_name,last_name,email,id")
      .in("id", userIds);

    if (profileError) throw profileError;

    // 3️⃣ Get coupon categories
    const { data: categoryData, error: categoryError } = await supabase
      .from("coupon_category")
      .select(`categories(name,id)`)
      .eq("coupon_id", couponId);

    if (categoryError) throw categoryError;

    const categories: categoryType[] = categoryData.map((cat) => {
      const categoryItem = Array.isArray(cat.categories)
        ? cat.categories[0]
        : cat.categories;

      return {
        name: categoryItem?.name,
        id: categoryItem?.id,
      };
    });

    // 4️⃣ Get coupon main info
    const { data: couponData, error: couponError } = await supabase
      .from("coupons")
      .select()
      .eq("id", couponId)
      .maybeSingle();

    if (couponError) throw couponError;

    if (!couponData) return null;

    // ✅ Final Result Object
    const couponDetail: couponDetailType = {
      appliesTo: profileData,
      couponName: couponData.coupon_name,
      couponCode: couponData.coupon_code,
      couponType: couponData.coupon_type,
      discountValue: couponData.discount,
      expired_at: couponData.expired_at,
      usage_limit_per_user: couponData.usage_limit_per_user,
      max_uses_total: couponData.max_uses_total,
      isPublic: profileData.length > 0 ? false : true,
    };

    return {
      couponDetail,
      categorySelected: categories,
    };
  } catch (error) {
    console.error("Error fetching coupon details:", error);
    return null;
  }
}
