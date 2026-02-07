import { optionType, typeProduct } from "@/types/productTypes";
// import { useEffect, useState } from "react";
// import GetProductDetail from "../../adminHooks/getProductDetail";
import { useParams, useRouter } from "next/navigation";
import useProductActions from "./useProductActions";
import { validateProduct } from "./validateProduct";
import { toast } from "sonner";
import { typeMode } from "@/types/adminType";
import handleImage from "./handleImage/handleImage";
import { useState } from "react";

interface Props {
  mode: typeMode;
  file: File | null;
  files: File[];
  ImageGalleryDeleted: string[];
  productDetail: typeProduct;
  getOptions: optionType[];
  selectedCategory: number | null;
}

const useProduct = ({
  mode,
  file,
  files,
  ImageGalleryDeleted,
  productDetail,
  getOptions,
  selectedCategory,
}: Props) => {
  const { push } = useRouter();
  const params = useParams<{ productID: string }>();
  const { productID } = params;
  const [Loading, setLoading] = useState(false);

  const { createProduct, updateProduct } = useProductActions();

  const addProduct = async () => {
    const productUUID = crypto.randomUUID();
    try {
      setLoading(true);
      if (mode === "create") {
        const validateError = validateProduct(
          productDetail,
          file?.name || null,
          selectedCategory,
        );

        if (validateError) {
          toast.error(validateError);
          return;
        }
        const { uploadMainImageUrl, uploadGalleryUrls } = await handleImage({
          productID: productUUID,
          mode,
          file,
          files,
        });

        await createProduct({
          id: productUUID,
          name: productDetail?.name,
          description: productDetail?.description,
          price: productDetail?.price,
          discount: productDetail?.discount,
          discount_type: productDetail?.discount_type,
          img: uploadMainImageUrl || "",
          stock: productDetail.stock,
          imgGallery: uploadGalleryUrls,
          category_id: selectedCategory!,
          active: productDetail?.active,
          options: getOptions,
        });
      } else if (mode === "edit") {
        const validateError = validateProduct(
          productDetail,
          file?.name || productDetail.img,
          selectedCategory,
        );
        if (validateError) {
          toast.error(validateError);
          return;
        }

        const { updateGalleryUrls, updateMainImageUrl } = await handleImage({
          productID,
          mode,
          file,
          files,
          imgGalleryDeleted: ImageGalleryDeleted,
          oldMainImg: productDetail.img,
        });
        const filterImages = productDetail.imgGallery?.filter(
          (DBImage) => !ImageGalleryDeleted?.includes(DBImage),
        );
        await updateProduct(productID, {
          id: productDetail.id,
          name: productDetail?.name,
          description: productDetail?.description,
          price: productDetail?.price,
          discount: productDetail?.discount,
          discount_type: productDetail.discount_type,
          img: updateMainImageUrl ? updateMainImageUrl : productDetail.img,
          stock: productDetail.stock,
          imgGallery:
            updateGalleryUrls.length > 0
              ? [...(filterImages || []), ...updateGalleryUrls]
              : filterImages,
          category_id: selectedCategory!,
          active: productDetail?.active,
          options: getOptions,
        });
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      return false;
    } finally {
      setLoading(false);
    }
    push(`/admin/products`);
  };

  return {
    addProduct,
    Loading,
  };
};

export default useProduct;
