import { MESSAGES } from "@/lib/message";
import { getTodayDate } from "@/lib/utils";
import { categoryDetailType } from "@/types/adminType";
import { createClient } from "@/utils/supabase/client";
import { Dispatch, MouseEvent, RefObject, SetStateAction } from "react";
import { toast } from "sonner";

interface handleAddCategoryType {
  e: MouseEvent<HTMLButtonElement>;
  category: categoryDetailType;
  setShowCategory: Dispatch<SetStateAction<boolean>>;
  Edit: boolean;
}

export const handleAddCategory = async ({
  e,
  category,
  setShowCategory,
  Edit,
}: handleAddCategoryType) => {
  e.preventDefault();
  const supabase = createClient();
  const emptyArr = ["name", "type", "description"];

  if (!category) return;
  const checkEmpty = emptyArr.some(
    (field) => category[field as keyof categoryDetailType] === ""
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
  // setIsCategoryUpdated((prev) => !prev);
  setShowCategory(false);
};

interface handleCloseType {
  e: MouseEvent<HTMLButtonElement>;
  setShowCategory: Dispatch<SetStateAction<boolean>>;
  inputRef: RefObject<HTMLInputElement | null>;
}

export const handleClose = ({
  e,
  setShowCategory,
  inputRef,
}: handleCloseType) => {
  e.preventDefault();
  if (inputRef?.current) inputRef.current.value = "";
  setShowCategory(false);
};
