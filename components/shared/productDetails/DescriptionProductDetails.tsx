import { Star } from "lucide-react";

import "../Card/Card.css";
import { iconsDescription } from "../../../constant/index";
import PriceDisplay from "../priceDisplay";
import CounterWithOptions from "./CounterWithOptions";
import { typeProduct } from "@/types/productTypes";

const DescriptionProductDetails = ({ item }: { item: typeProduct }) => {
  const { name, description, rate, active } = item;

  return (
    <div className="flex flex-col gap-4">
      {/* Name + Price + Rate */}
      <div className="flex flex-col gap-2">
        <span className="font-inter not-italic font-semibold text-2xl">
          {name}
        </span>
        {/* Reviews + Stock */}
        <div className="text-[#999] font-poppins text-sm flex items-center gap-2">
          <div className="flex items-center">
            {[1, 2, 3, 4].map((start) => (
              <Star key={start} size={18} />
            ))}
          </div>
          <span>({rate}) Reviews | </span>
          {active ? (
            <span className="text-[#47B486] font-poppins font-normal text-sm">
              In Stock
            </span>
          ) : (
            <span className="text-red-500 ">Out of Stock</span>
          )}
        </div>
        {/* Price */}
        <PriceDisplay
          price={item.price}
          discount={item.discount}
          discountType={item.discount_type}
          productDetail={true}
        />
      </div>
      {/* description */}
      <div className="font-poppins font-normal text-sm">{description}</div>
      <div className="w-full h-px bg-[#777] rounded-sm" />
      {/* Options + Counter + buy + wishlist */}
      <CounterWithOptions item={item} />
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

export default DescriptionProductDetails;
