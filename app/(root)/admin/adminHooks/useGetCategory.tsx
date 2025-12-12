import { categoryDetailType } from "@/types/adminType";
import { createClient } from "@/utils/supabase/client";
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface getCategoryProps {
  categoryID: number;
  e: MouseEvent<HTMLButtonElement>;
  setShowCategory: Dispatch<SetStateAction<boolean>>;
}

interface handleDeleteCategoryType {
  setShowDeleteDialog: Dispatch<SetStateAction<boolean>>;
  categoryID: number;
  e: MouseEvent<HTMLButtonElement>;
}

const useCategory = () => {
  const [categoryDetail, setCategoryDetail] = useState<categoryDetailType>({
    name: "",
    description: "",
    type: "",
  });
  const [categories, setCategories] = useState<categoryDetailType[]>([]);

  const supabase = createClient();
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("categories").select();

        if (error) throw error;
        if (data) setCategories(data);
      } catch (error) {
        console.log("Error fetching category:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, []);

  const handleGetCategory = async ({
    categoryID,
    e,
    setShowCategory,
  }: getCategoryProps) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("categories")
        .select()
        .eq("id", categoryID)
        .maybeSingle();

      if (error) throw error;
      setCategoryDetail(data);
    } catch (error) {
      if (error) {
        console.log(error);
        return;
      }
    } finally {
      setShowCategory(true);
    }
  };

  const handleDeleteCategory = async (
    { categoryID, e, setShowDeleteDialog }: handleDeleteCategoryType // e: MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
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
  return {
    handleGetCategory,
    categoryDetail,
    categories,
    Loading,
    handleDeleteCategory,
    setCategoryDetail,
    setCategories,
  };
};

export default useCategory;
