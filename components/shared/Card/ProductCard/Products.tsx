import { typeProduct } from "@/types/productTypes";
import ProductCard from "./ProductCard";
import { Dispatch, SetStateAction } from "react";

interface Props {
  data: typeProduct[];
  setData: Dispatch<SetStateAction<typeProduct[]>>;
}

const Products = ({ data, setData }: Props) => {
  const toggleProducts = (productId: string) => {
    setData((prev) => {
      const exist = prev.some((p) => p.id === productId);
      if (exist) {
        return prev.filter((p) => p.id !== productId);
      } else {
        const product = prev.find((p) => p.id === productId);
        if (!product) return prev;
        return [...prev, product];
      }
    });
    return data;
  };

  return (
    <>
      {data.map((item) => (
        <ProductCard
          key={item.id}
          item={item}
          toggleProducts={toggleProducts}
        />
      ))}
    </>
  );
};

export default Products;
