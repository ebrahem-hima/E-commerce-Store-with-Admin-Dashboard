import React from "react";

interface PriceDisplayProps {
  price: number;
  discount?: number;
  discountType?: string;
  count?: number;
  isProduct?: boolean;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  discount,
  discountType,
  count = 1,
  isProduct = false,
}) => {
  const discountedPrice =
    discount && discountType === "percentage"
      ? price - (price * discount) / 100
      : discount && discountType === "fixed"
      ? price - discount
      : price;

  const hasDiscount = discount && discount > 0;

  if (!isProduct) {
    return (
      <span className="text-black font-poppins font-medium">
        {discountedPrice * count} EGP
      </span>
    );
  }

  return hasDiscount ? (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-primary font-poppins font-medium">
        {discountedPrice * count} EGP
      </span>
      <span className="font-poppins line-through text-gray-500 font-medium">
        {price * count} EGP
      </span>
    </div>
  ) : (
    <span className="text-primary font-poppins font-medium">
      {price * count} EGP
    </span>
  );
};

export default PriceDisplay;
