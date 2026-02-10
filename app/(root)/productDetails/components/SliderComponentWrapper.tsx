import SliderComponent from "@/components/shared/SliderComponent/SliderComponent";
import fetchRelatedProduct from "../fetch/fetchRelatedProducts";

const SliderComponentWrapper = async ({ productId }: { productId: string }) => {
  const relatedProducts = await fetchRelatedProduct(productId);
  return (
    <>
      <SliderComponent
        search={false}
        titleComponent="Related Item"
        Product={relatedProducts || []}
      />
    </>
  );
};

export default SliderComponentWrapper;
