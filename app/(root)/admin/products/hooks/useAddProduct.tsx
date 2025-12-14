import { optionType, typeProduct } from "@/types/productTypes";
import { useEffect, useState } from "react";
import GetProductDetail from "../../adminHooks/getProductDetail";
import { useParams, useRouter } from "next/navigation";
import useProductActions from "./useProductActions";
import { validateProduct } from "./validateProduct";
import { toast } from "sonner";
import { typeMode } from "@/types/adminType";
import handleImage from "./handleImage/handleImage";

interface Props {
  mode: typeMode;
  file: File | null;
  files: File[];
  ImageGalleryDeleted: string[];
}

const useProduct = ({ mode, file, files, ImageGalleryDeleted }: Props) => {
  const { push } = useRouter();
  const params = useParams<{ productID: string }>();
  const { productID } = params;
  const { product } = GetProductDetail(productID);

  const [productDetail, setProductDetail] = useState<typeProduct>({
    id: product?.id || "",
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    discount: product?.discount || 0,
    discount_type: product?.discount_type || "",
    img: product?.img || "",
    imgGallery: product?.imgGallery || [],
    categories: { id: Number(product?.id) },
    active: product?.active || true,
    stock: product?.stock || 0,
    options: product?.options,
  });
  const { createProduct, updateProduct } = useProductActions();
  const [getOptions, setGetOptions] = useState<optionType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    if (product) {
      setProductDetail({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        discount: product.discount,
        discount_type: product.discount_type,
        img: product.img,
        imgGallery: product.imgGallery,
        categories: { id: product.categories?.id || 0 },
        active: product.active,
        stock: product.stock,
        options: product.options,
      });
      setGetOptions(product.options || []);
    }
  }, [product]);

  useEffect(() => {
    setSelectedCategory(productDetail.categories?.id || null);
  }, [productDetail]);

  const addProduct = async () => {
    const productUUID = crypto.randomUUID();
    if (mode === "create") {
      const validateError = validateProduct(
        productDetail,
        file?.name || null,
        selectedCategory
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
        selectedCategory
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
        (DBImage) => !ImageGalleryDeleted?.includes(DBImage)
      );
      await updateProduct(productID, {
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
    push(`/admin/products`);
  };

  return {
    setSelectedCategory,
    addProduct,
    setProductDetail,
    productDetail,
    selectedCategory,
    setGetOptions,
    getOptions,
  };
};

export default useProduct;
