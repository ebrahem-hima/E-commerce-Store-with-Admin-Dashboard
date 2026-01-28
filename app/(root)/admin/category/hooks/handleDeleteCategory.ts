import { createClient } from "@/app/utils/supabase/client";
import { Dispatch, SetStateAction } from "react";

interface handleDeleteCategoryType {
  setShowDeleteDialog: Dispatch<SetStateAction<boolean>>;
  categoryID: number | undefined;
}

const supabase = createClient();
export const handleDeleteCategory = async (
  { categoryID, setShowDeleteDialog }: handleDeleteCategoryType, // e: MouseEvent<HTMLButtonElement>
) => {
  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", categoryID);

  if (error) {
    console.log(error);
    return;
  }
  setShowDeleteDialog(false);
};
