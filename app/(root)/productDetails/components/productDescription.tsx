import DescriptionProductDetails from "@/components/shared/productDetails/DescriptionProductDetails";
import { typeProduct } from "@/types/productTypes";

const ProductDescription = async ({
  productDetail,
}: {
  productDetail: typeProduct;
}) => {
  return (
    <>
      <DescriptionProductDetails item={productDetail} />
    </>
  );
};

export default ProductDescription;
