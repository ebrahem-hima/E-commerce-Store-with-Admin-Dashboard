import { MESSAGES } from "@/lib/message";
import { formatDateForPostgres, getTodayDate } from "@/lib/utils";
import {
  categorySelectType,
  couponDetailType,
  userType,
} from "@/types/adminType";
import { createClient } from "@/app/utils/supabase/client";
import { couponSchema } from "@/validation/adminValidation";
import { toast } from "sonner";
import {
  handleCategoryDuplicate,
  handleDeleteCategory,
} from "./category/categoryFn";

interface handleEditCouponType {
  couponDetails: couponDetailType;
  id: string;
  deletedUsers: string[];
  selectedCategory: categorySelectType;
}
interface handleInsertUniqueUsersProps {
  appliesTo: userType[];
  id: string;
}
const supabase = createClient();
//  Functions to EditCoupon
const handleDeleteSpecificUser = async (deletedUsers: string[], id: string) => {
  const { error: couponErr } = await supabase
    .from("coupon_assignments")
    .delete()
    .eq("coupon_id", id)
    .in("user_id", deletedUsers);
  if (couponErr) console.log(couponErr);
};
const handleInsertUniqueUsers = async ({
  appliesTo,
  id,
}: handleInsertUniqueUsersProps) => {
  const { data: existingUsers } = await supabase
    .from("coupon_assignments")
    .select("user_id,id")
    .eq("coupon_id", id);

  const existingUserIds = existingUsers?.map((u) => u.user_id);
  const usersToInsert = appliesTo
    .filter((user) => !existingUserIds?.includes(user.id))
    .map((user) => ({
      coupon_id: id,
      user_id: user.id,
    }));
  if (usersToInsert.length > 0) {
    const { error } = await supabase
      .from("coupon_assignments")
      .insert(usersToInsert);

    if (error) {
      console.log(error);
      toast.error(MESSAGES.ERROR_MESSAGES.SomethingWentWrong);
      return;
    }
  }
};
const handleMakeCouponPublic = async (id: string) => {
  const { error: couponErr } = await supabase
    .from("coupon_assignments")
    .delete()
    .eq("coupon_id", id);
  if (couponErr) {
    console.log(couponErr);
    return;
  }
  return toast.success(MESSAGES.admin.coupon.updated);
};

// const handleCouponCategory = async (
//   selectedCategory: { name: string | undefined; id: number | undefined }[]
// ) => {
//   const selectedCategoryVar = selectedCategory.map((category) => ({
//     name: category.name,
//     id: category.id,
//   }));
//   const { error } = await supabase
//     .from("coupon_category")
//     .insert(selectedCategoryVar);

//   if (error) {
//     console.log(error);
//     return false;
//   }
// };
// // to avoid send same category
// const handleCategoryDuplicate = async (
//   selectedCategory: { name: string | undefined; id: number | undefined }[]
// ) => {
//   const { data, error } = await supabase.from("coupon_category").select('category_id');
//   if (error) {
//     console.log(error);
//     return false;
//   }
//   const handleDuplicate = selectedCategory.filter((category) =>
//     !data.includes({category_id: category.id})
//   );
//   console.log("handleDuplicate", handleDuplicate);
//   if (handleDuplicate.length > 0) {
//     await handleCouponCategory(handleDuplicate);
//   } else {
//     return;
//   }
// };

export const handleEditCoupon = async ({
  couponDetails,
  id,
  deletedUsers,
  selectedCategory,
}: handleEditCouponType) => {
  const expired_at = formatDateForPostgres(couponDetails.expired_at);
  const { data, error } = await supabase
    .from("coupons")
    .update({
      coupon_code: couponDetails.couponCode,
      coupon_name: couponDetails.couponName,
      discount: couponDetails.discountValue,
      coupon_type: couponDetails.couponType,
      isPublic: couponDetails.isPublic,
      expired_at,
      is_active: true,
      usage_limit_per_user: couponDetails.usage_limit_per_user,
      max_uses_total: couponDetails.max_uses_total,
    })
    .eq("id", id)
    .select()
    .maybeSingle();
  if (error) {
    console.log(error);
    toast.error(MESSAGES.ERROR_MESSAGES.SomethingWentWrong);
    return;
  }
  if (selectedCategory.categorySelected.length > 0) {
    await handleCategoryDuplicate(selectedCategory, data.id);
  }
  if (selectedCategory.categoryDeleted.length > 0) {
    const categoryIds = selectedCategory.categoryDeleted.map((cat) => cat.id);
    await handleDeleteCategory(categoryIds, data.id);
  }
  if (couponDetails.isPublic) {
    await handleMakeCouponPublic(id);
    toast.success(MESSAGES.admin.coupon.updated);
    return;
  } else {
    if (deletedUsers.length > 0) {
      await handleDeleteSpecificUser(deletedUsers, id);
    }
  }

  // Get Existing Users to avoid add user is exist in DB
  if (couponDetails.appliesTo.length > 0) {
    await handleInsertUniqueUsers({ appliesTo: couponDetails.appliesTo, id });
  }

  toast.success(MESSAGES.admin.coupon.updated);
};

// Functions to CreateCoupon
const handelInsertUsers = async (users: userType[], couponID: number) => {
  const insertPromises2 = users.map((cop) => ({
    coupon_id: couponID,
    user_id: cop.id,
  }));
  const { error } = await supabase
    .from("coupon_assignments")
    .insert(insertPromises2);

  if (error) {
    console.log(error);
    toast.error(MESSAGES.ERROR_MESSAGES.SomethingWentWrong);
    return;
  }
};

export const handleCreateCoupon = async (
  couponDetails: couponDetailType,
  selectedCategory: categorySelectType,
) => {
  const expired_at = formatDateForPostgres(couponDetails.expired_at);
  const { data, error } = await supabase
    .from("coupons")
    .insert({
      coupon_code: couponDetails.couponCode,
      coupon_name: couponDetails.couponName,
      discount: couponDetails.discountValue,
      coupon_type: couponDetails.couponType,
      isPublic: couponDetails.isPublic,
      expired_at,
      is_active: true,
      usage_limit_per_user: couponDetails.usage_limit_per_user,
      max_uses_total: couponDetails.max_uses_total,
    })
    .select()
    .maybeSingle();
  if (error) {
    console.log(error);
    toast.error(MESSAGES.ERROR_MESSAGES.SomethingWentWrong);
    return;
  }
  if (selectedCategory.categorySelected.length > 0) {
    await handleCategoryDuplicate(selectedCategory, data.id);
  }
  if (couponDetails.appliesTo.length > 0) {
    await handelInsertUsers(couponDetails.appliesTo, data.id);
  }
  toast.success(MESSAGES.admin.coupon.created);
};

// function Validation
export const handleValidation = async (couponDetails: couponDetailType) => {
  const result = couponSchema.safeParse({
    couponCode: couponDetails.couponCode,
    couponName: couponDetails.couponName,
    couponType: couponDetails.couponType,
    discountValue: couponDetails.discountValue,
    appliesTo: couponDetails.appliesTo,
    expired_at: couponDetails.expired_at,
    usage_limit_per_user: couponDetails.usage_limit_per_user,
    max_uses_total: couponDetails.max_uses_total,
  });
  if (!result.success) {
    console.log("error", result.error);
    toast.error(result.error.issues[0].message);
    return false;
  }
  const toDay = getTodayDate();
  const toDayDate = new Date(toDay);
  const expiredDate = new Date(couponDetails.expired_at);
  if (toDayDate >= expiredDate) {
    toast.error(MESSAGES.admin.coupon.InvalidExpirationDate);
    return false;
  }
  if (couponDetails.usage_limit_per_user > couponDetails.max_uses_total) {
    toast.error(MESSAGES.admin.coupon.UserLimitExceedsMax);
    return false;
  }
  const totalUsers = couponDetails.appliesTo.length;

  if (
    couponDetails.usage_limit_per_user * totalUsers >
    couponDetails.max_uses_total
  ) {
    toast.error(
      "The total coupon limit is too low for the number of users and per-user limit.",
    );
    return false;
  }

  return true;
};
