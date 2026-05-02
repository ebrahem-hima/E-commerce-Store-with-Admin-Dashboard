import React from "react";

interface PriceDisplayProps {
  price: number;
  discount?: number;
  discountType?: string;
  quantity?: number;
  isProduct?: boolean;
  productDetail?: boolean;
}

const PriceDisplay = ({
  price,
  discount,
  discountType,
  quantity = 1,
  isProduct = false,
  productDetail,
}: PriceDisplayProps) => {
  const discountedPrice =
    discount && discountType === "percentage"
      ? price - (price * discount) / 100
      : discount && discountType === "fixed"
        ? price - discount
        : price;

  const hasDiscount = discount && discount > 0;

  if (productDetail) {
    return hasDiscount ? (
      <div className="flex items-center gap-2 font-poppins text-2xl tracking-[0.03em]">
        <span className="text-black">{discountedPrice * quantity}EGP</span>
        <span className="line-through text-gray-500">
          {price * quantity}EGP
        </span>
      </div>
    ) : (
      <span className="line-through text-gray-500">{price * quantity}EGP</span>
    );
  }

  return isProduct ? (
    hasDiscount ? (
      <div className="flex items-center gap-2 text-sm">
        <span className="text-primary text-sm font-poppins font-medium">
          {discountedPrice * quantity} EGP
        </span>
        <span className="font-poppins line-through text-gray-500 font-medium">
          {price * quantity} EGP
        </span>
      </div>
    ) : (
      <span className="text-primary text-sm font-poppins font-medium">
        {price * quantity} EGP
      </span>
    )
  ) : (
    <span className="text-black font-poppins font-medium">
      {discountedPrice * quantity}EGP
    </span>
  );
};

export default PriceDisplay;
