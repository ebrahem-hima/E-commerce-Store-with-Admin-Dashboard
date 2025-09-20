import React from "react";
import { typeProduct } from "../../../../types/productTypes";
import "../Card.css";

import ImgProduct from "./ImgProduct";
import TextProduct from "./textProduct";
import Link from "next/link";

interface Props {
  item: typeProduct;
  type?: string;
}

const ProductCard = ({ item, type }: Props) => {
  return (
    <Link
      href={`/productDetails/${item.id}`}
      className="h-[180px] group flex-center flex-col gap-2 cursor-pointer"
    >
      {/* Img + Icons */}
      <ImgProduct item={item} type={type} />
      <TextProduct item={item} />
    </Link>
  );
};

export default ProductCard;
