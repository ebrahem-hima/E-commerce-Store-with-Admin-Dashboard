import { typeProduct } from "../../../../types/productTypes";
import "../Card.css";

import ImgProduct from "./ImgProduct";
import TextProduct from "./textProduct";
import Link from "next/link";

interface Props {
  item: typeProduct;
  isGrid?: boolean;
}

const ProductCard = ({ item, isGrid }: Props) => {
  return (
    <Link
      href={`/productDetails/${item.product_id}`}
      className={`h-[230px] productCard snap-start group ${
        isGrid ? "flex-row flex items-start" : "flex-col flex-center"
      } gap-2 cursor-pointer`}
    >
      {/* Img + Icons */}
      <ImgProduct isGrid={isGrid} item={item} />
      <TextProduct isGrid={isGrid} item={item} />
    </Link>
  );
};

export default ProductCard;
