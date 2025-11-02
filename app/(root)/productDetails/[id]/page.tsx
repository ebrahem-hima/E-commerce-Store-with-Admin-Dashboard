"use client";

import { useParams } from "next/navigation";
import {
  components,
  firstProduct,
  secondProduct,
  thirdProduct,
} from "@/constant/product";
import ImgProductDetails from "@/components/shared/productDetails/ImgProductDetails";
import DescriptionProductDetails from "@/components/shared/productDetails/DescriptionProductDetails";
import SliderComponent from "@/components/shared/SliderComponent/SliderComponent";

const Page = () => {
  const params = useParams();
  const { id } = params;
  const concatArrays = [...firstProduct, ...secondProduct, ...thirdProduct];
  const getProductDetails = concatArrays.find((item) => item.product_id === id);
  if (!getProductDetails) return;
  return (
    <div className="mt-10">
      <div className="grid grid-cols-[1fr_350px] gap-2 max-tablet:!grid-cols-1 mb-6">
        {/* productImg + imgGallery */}
        <ImgProductDetails item={getProductDetails} />
        <DescriptionProductDetails item={getProductDetails} />
      </div>
      <SliderComponent
        titleComponent="Related Item"
        Product={components[0].products}
        category={components[0].category}
      />
    </div>
  );
};

export default Page;
