import { MESSAGES } from "@/lib/message";
import { typeProduct } from "@/types/productTypes";

export const validateProduct = (
  productDetail: typeProduct,
  file: string | null,
  selectedCategory: number | null
) => {
  const fields = ["name", "description", "price", "stock"];

  const checkEmpty = fields.some(
    (field) => productDetail[field as keyof typeProduct] === ""
  );
  if (!file) return "Main image is required";

  if (checkEmpty) return MESSAGES.admin.product.requiredField;
  if (!selectedCategory) return "Please select a category";
  if (
    (productDetail.discount! > 0 && !productDetail.discount_type) ||
    (productDetail.discount_type && productDetail.discount! <= 0)
  ) {
    return "Please specify both discount and discount type";
  }

  if (
    (productDetail?.discount || 0) > 100 &&
    productDetail.discount_type === "Percentage"
  )
    return "Discount cannot exceed 100";

  return null;
};
