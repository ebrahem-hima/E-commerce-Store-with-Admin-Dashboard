import PriceDisplay from "../../priceDisplay";
import { typeProduct } from "@/types/productTypes";
import AddToCartComponent from "./AddtoCartComponent";

const TextProduct = ({
  item,
  isGrid,
}: {
  item: typeProduct;
  isGrid?: boolean;
}) => {
  const { name, discount, price, rate, discount_type } = item;

  return (
    <div className={`w-full flex flex-col`}>
      <span
        className={`${
          isGrid ? "line-clamp-4 break-all" : "line-clamp-2 break-all"
        }`}
      >
        {name}
      </span>

      <PriceDisplay
        price={price}
        discount={discount}
        discountType={discount_type}
        isProduct={true}
      />

      {rate && (
        <span className="text-sm text-[#777] font-medium">Rate({rate})</span>
      )}

      <AddToCartComponent item={item} />
    </div>
  );
};

export default TextProduct;
