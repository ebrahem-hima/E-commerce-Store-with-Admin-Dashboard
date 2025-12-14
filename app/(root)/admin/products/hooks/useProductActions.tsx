import { MESSAGES } from "@/lib/message";
import { optionType } from "@/types/productTypes";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

interface productType {
  id?: string;
  product_id?: string;
  name: string;
  img: string;
  description: string;
  imgGallery?: string[];
  rate?: number;
  stock: number;
  category_id: number;
  count?: number;
  discount?: number;
  discount_type?: string;
  price: number;
  options?: optionType[];
  active: boolean;
  created_at?: string;
}

const useProductActions = () => {
  const supabase = createClient();
  const createProduct = async (data: productType) => {
    const { error } = await supabase.from("products").insert(data);

    if (error) {
      console.log(error);
      return;
    }
    toast.success(MESSAGES.admin.product.createdSuccessfully);
  };
  const updateProduct = async (productID: string, data: productType) => {
    const { error } = await supabase
      .from("products")
      .update(data)
      .eq("id", productID);

    if (error) {
      console.log(error);
      return;
    }
    toast.success(MESSAGES.admin.product.createdSuccessfully);
  };
  return { createProduct, updateProduct };
};

export default useProductActions;
