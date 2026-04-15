import { typeProduct } from "@/types/productTypes";
import ProductCard from "./ProductCard";

interface Props {
  data: typeProduct[];
  isGrid?: boolean;
  toggleProducts?: (productId: string) => void;
}

const Products = ({ data, isGrid, toggleProducts }: Props) => {
  return (
    <>
      {data.map((item) => (
        <ProductCard
          isGrid={isGrid}
          key={item.id}
          item={item}
          toggleProducts={toggleProducts}
        />
      ))}
    </>
  );
};

export default Products;
