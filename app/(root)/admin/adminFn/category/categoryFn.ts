import { MESSAGES } from "@/lib/message";
import { getTodayDate } from "@/lib/utils";
import {
  categoryDetailType,
  categorySelectType,
  categoryType,
} from "@/types/adminType";
import { createClient } from "@/app/utils/supabase/client";
import { Dispatch, MouseEvent, RefObject, SetStateAction } from "react";
import { toast } from "sonner";

interface handleAddCategoryType {
  e: MouseEvent<HTMLButtonElement>;
  category: categoryDetailType;
  setShowCategory: Dispatch<SetStateAction<boolean>>;
  Edit: boolean;
}

const supabase = createClient();

export const handleAddCategory = async ({
  e,
  category,
  setShowCategory,
  Edit,
}: handleAddCategoryType) => {
  e.preventDefault();
  const emptyArr = ["name", "type", "description"];

  if (!category) return;
  const checkEmpty = emptyArr.some(
    (field) => category[field as keyof categoryDetailType] === "",
  );
  if (checkEmpty) {
    toast.error(MESSAGES.admin.category.requiredField);
    return;
  }
  if (Edit) {
    const { error } = await supabase
      .from("categories")
      .update({
        name: category?.name,
        type: category?.type,
        description: category?.description,
        created_at: getTodayDate(),
      })
      .eq("id", category?.id);
    if (error) {
      console.log(error);
    }
    toast.success(MESSAGES.admin.category.updateCategory);
  } else {
    const { error } = await supabase.from("categories").insert({
      name: category?.name,
      type: category?.type,
      description: category?.description,
      created_at: getTodayDate(),
    });
    if (error) {
      console.log(error);
      return;
    }
    toast.success(MESSAGES.admin.category.createCategory);
  }
  setShowCategory(false);
};

interface handleCloseType {
  e: MouseEvent<HTMLButtonElement>;
  setShowCategory: Dispatch<SetStateAction<boolean>>;
  inputRef: RefObject<HTMLInputElement | null>;
}

export const handleDeleteCategory = async (
  categoryIds: (number | undefined)[],
  couponId: number,
) => {
  const { error } = await supabase
    .from("coupon_category")
    .delete()
    .in("category_id", categoryIds)
    .eq("coupon_id", couponId);
  if (error) {
    console.log(error);
    return;
  }
};

export const handleClose = ({
  e,
  setShowCategory,
  inputRef,
}: handleCloseType) => {
  e.preventDefault();
  if (inputRef?.current) inputRef.current.value = "";
  setShowCategory(false);
};

export const handleCouponCategory = async (
  categorySelected: categoryType[],
  couponId: number,
) => {
  const categorySelectedVar = categorySelected.map((category) => ({
    category_id: category.id,
    coupon_id: couponId,
  }));
  const { error } = await supabase
    .from("coupon_category")
    .insert(categorySelectedVar);

  if (error) {
    console.log(error);
    return false;
  }
};

// to avoid send same category
export const handleCategoryDuplicate = async (
  selectedCategory: categorySelectType,
  couponId: number,
) => {
  const { data, error } = await supabase
    .from("coupon_category")
    .select("category_id")
    .eq("coupon_id", couponId);
  if (error) {
    console.log(error);
    return false;
  }
  // filter categories to find duplicates
  const handleDuplicate = selectedCategory.categorySelected.filter(
    (category: categoryType) =>
      !data.some((cat) => cat.category_id === category.id),
  );
  // category that doesn't exist in DB
  if (handleDuplicate.length > 0) {
    await handleCouponCategory(handleDuplicate, couponId);
  }
};
