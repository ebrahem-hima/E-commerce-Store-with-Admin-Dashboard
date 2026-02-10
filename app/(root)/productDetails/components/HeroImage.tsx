import ImgProductDetails from "@/components/shared/productDetails/ImgProductDetails";
import { typeProduct } from "@/types/productTypes";

const HeroImage = async ({ productDetail }: { productDetail: typeProduct }) => {
  return (
    <>
      <ImgProductDetails item={productDetail} />
    </>
  );
};

export default HeroImage;
