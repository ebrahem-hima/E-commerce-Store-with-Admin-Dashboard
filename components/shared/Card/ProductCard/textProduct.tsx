import "../Card.css";
import PriceDisplay from "../../priceDisplay";
import { typeProduct } from "@/types/productTypes";
// import dynamic from "next/dynamic";
import AddToCartComponent from "./AddtoCartComponent";

// const AddToCartComponent = dynamic(() => import("./AddtoCartComponent"), {
//   ssr: false,
// });

const TextProduct = ({
  item,
  isGrid,
}: {
  item: typeProduct;
  isGrid?: boolean;
}) => {
  const { name, discount, price, rate, discount_type } = item;

  return (
    <div className={`${isGrid && "w-3/3"} w-full flex flex-col mr-auto`}>
      {/* <div className={`${isGrid ? "w-3/3" : 'w-full'} flex flex-col mr-auto`}> */}
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

      <AddToCartComponent isGrid={isGrid!} item={item} />
    </div>
  );
};

export default TextProduct;
