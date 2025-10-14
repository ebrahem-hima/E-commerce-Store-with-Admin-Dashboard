import React from "react";
import { useProductContext } from "../../../context/productContext";
import useUserCart from "../../FetchData/useUserCart";

interface Props {
  someDiscount: number;
}

const TotalComponent = ({ someDiscount }: Props) => {
  const { isCartDataUpdated } = useProductContext();

  const { total } = useUserCart(isCartDataUpdated);
  return (
    <div className="flex flex-col gap-2 font-medium">
      <p className="flex-between text-sm">
        <span>Subtotal:</span>
        <span className="flex items-center gap-4">
          <span>${total}</span>
        </span>
      </p>
      <div className="w-full h-[1px] bg-[#999]" />
      {someDiscount ? (
        <p className="flex-between text-sm">
          <span>Total:</span>
          <span className="flex items-center gap-4">
            <span className="text-[#777] line-through">${total}</span>
            <span>${total - someDiscount}</span>
          </span>
        </p>
      ) : (
        <p className="flex-between text-sm">
          <span>Total:</span>
          <span>${total}</span>
        </p>
      )}
    </div>
  );
};

export default TotalComponent;
