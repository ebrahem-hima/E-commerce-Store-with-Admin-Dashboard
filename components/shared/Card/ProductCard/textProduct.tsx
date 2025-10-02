import React from "react";
import { typeProduct } from "../../../../types/productTypes";
import "../Card.css";

const TextProduct = ({ item }: { item: typeProduct }) => {
  const { name, discount, price, rate, discount_type } = item;
  return (
    <div className="flex flex-col mr-auto">
      <span>{name}</span>
      {discount ? (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-primary font-poppins font-medium">
            {discount_type === "percentage" ? (
              <span>{price - (price * discount) / 100}EGP</span>
            ) : (
              <span>{price - discount}EGP</span>
            )}
          </span>
          <span className="font-poppins line-through text-gray-500 font-medium">
            {price}EGP
          </span>
        </div>
      ) : (
        <span className="text-primary font-poppins font-medium">
          {price}EGP
        </span>
      )}
      {rate && (
        <span className="text-sm text-[#777] font-medium">Rate({rate})</span>
      )}
    </div>
  );
};

export default TextProduct;
