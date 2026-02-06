import ProductForm from "../../productForm";
import { getProductDetailServer } from "../../services/productDetailService";

const page = async ({ params }: { params: Promise<{ productID: string }> }) => {
  const { productID } = await params;
  const product = await getProductDetailServer(productID);
  return (
    <>
      <ProductForm product={product} mode="edit" />
    </>
  );
};

export default page;
