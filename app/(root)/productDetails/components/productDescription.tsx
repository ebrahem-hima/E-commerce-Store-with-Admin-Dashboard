import PriceDisplay from "@/components/shared/priceDisplay";
import { typeProduct } from "@/types/productTypes";
// import { Star } from "lucide-react";
import CounterWithOptions from "./productDescriptionComponents/CounterWithOptions";
import { iconsDescription } from "@/constant";

const ProductDescription = async ({
  productDetail,
}: {
  productDetail: typeProduct;
}) => {
  const { name, description, price, discount, discount_type, stock } =
    productDetail;

  return (
    <div className="flex flex-col gap-4">
      {/* Name + Price + Rate */}
      <div className="flex flex-col gap-2">
        <span className="font-inter not-italic font-semibold text-2xl">
          {name}
        </span>
        {/* Price */}
        <PriceDisplay
          price={price}
          discount={discount}
          discountType={discount_type}
          productDetail={true}
        />
        {/* Reviews + Stock */}
        <div className="text-gray-600 font-poppins text-sm flex items-center gap-2">
          {/* <div className="flex items-center">
            {[1, 2, 3, 4].map((start) => (
              <Star key={start} size={18} />
            ))}
          </div>
          <span> Reviews | </span> */}
          {stock > 0 ? (
            <span className="text-green-700 font-poppins font-normal text-sm">
              In Stock
            </span>
          ) : (
            <span className="text-red-500 ">Out of Stock</span>
          )}
        </div>
      </div>
      {/* description */}
      <div className="w-full min-h-16 line-3 font-poppins font-normal text-sm">
        {description}
      </div>
      <div className="w-full h-px bg-[#777] rounded-sm" />
      {/* Options + Counter + buy + wishlist */}
      <CounterWithOptions item={productDetail} />
      {/* Free delivery */}
      <div className="border border-[rgba(0, 0, 0, 0.5)] rounded-sm">
        {iconsDescription.map((icons) => (
          <div
            key={icons.text}
            className="px-2 py-4 flex gap-3 items-center not-last:border-b border-[rgba(0, 0, 0, 0.5)]"
          >
            {/* Icon */}
            {<icons.icon size={35} />}
            <div className="flex flex-col font-poppins">
              <p className="font-bold">{icons.text}</p>
              <span className="font-medium text-xs">{icons.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDescription;
