import { MESSAGES } from "@/lib/message";
import { typeProduct } from "@/types/productTypes";
import { createClient } from "@/app/utils/supabase/client";
import { toast } from "sonner";

const useProductActions = () => {
  const supabase = createClient();
  const createProduct = async (data: typeProduct) => {
    const { error } = await supabase.from("products").insert(data);

    if (error) {
      console.log(error);
      return;
    }
    toast.success(MESSAGES.admin.product.createdSuccessfully);
  };
  const updateProduct = async (productID: string, data: typeProduct) => {
    const { error } = await supabase
      .from("products")
      .update(data)
      .eq("id", productID);

    if (error) {
      console.log(error);
      return;
    }
    toast.success(MESSAGES.admin.product.updatedSuccessfully);
  };
  return { createProduct, updateProduct };
};

export default useProductActions;
