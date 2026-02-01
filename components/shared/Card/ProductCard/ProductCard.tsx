import { typeProduct } from "../../../../types/productTypes";
import "../Card.css";

import ImgProduct from "./ImgProduct";
import TextProduct from "./textProduct";
import Link from "next/link";

interface Props {
  item: typeProduct;
  isGrid?: boolean;
  toggleProducts: (productId: string) => void;
}

const ProductCard = ({ item, isGrid, toggleProducts }: Props) => {
  return (
    <Link
      href={`/productDetails/${item.id}`}
      className={`h-57.5 productCard snap-start group ${
        isGrid ? "flex-row flex items-center" : "flex-col flex-center"
      } gap-2 cursor-pointer`}
    >
      {/* Img + Icons */}
      <ImgProduct toggleProducts={toggleProducts} isGrid={isGrid} item={item} />
      <TextProduct isGrid={isGrid} item={item} />
    </Link>
  );
};

export default ProductCard;
