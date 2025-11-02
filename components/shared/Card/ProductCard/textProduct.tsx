"use client";

import { typeProduct } from "../../../../types/productTypes";
import "../Card.css";
import PriceDisplay from "../../priceDisplay";
import AddToCartComponent from "./AddtoCartComponent";
import { useProductContext } from "@/context/productContext";

const TextProduct = ({
  item,
  isGrid,
}: {
  item: typeProduct;
  isGrid?: boolean;
}) => {
  const { cartData } = useProductContext();

  const { name, discount, price, rate, discount_type } = item;
  const isExist = cartData.some(
    (cartItem: typeProduct) => cartItem.product_id === item.product_id
  );
  return (
    <div className={`${isGrid && "w-3/3"} w-full flex flex-col mr-auto`}>
      <span
        className={`${
          isGrid ? "line-clamp-4 break-all" : "line-clamp-2  break-all"
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
      <AddToCartComponent isExist={isExist} item={item} />
    </div>
  );
};

export default TextProduct;
