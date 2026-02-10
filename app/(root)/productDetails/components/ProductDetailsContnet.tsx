import fetchProductDetails from "../fetch/fetchProductDetails";
import HeroImage from "./HeroImage";
import ProductDescription from "./productDescription";

const ProductDetailsContent = async ({ productId }: { productId: string }) => {
  const productDetail = await fetchProductDetails(productId);
  return (
    <>
      <div className="grid grid-cols-[1fr_350px] gap-2 max-tablet:grid-cols-1! mb-6">
        <HeroImage productDetail={productDetail} />
        <ProductDescription productDetail={productDetail} />
      </div>
    </>
  );
};

export default ProductDetailsContent;
