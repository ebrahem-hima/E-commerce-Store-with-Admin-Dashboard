import { typeProduct } from "@/types/productTypes";

export const splitProducts = (data: typeProduct[]) => {
  const bestSellersProducts = data.filter(
    (product) => product.discount && product.discount > 0,
  );
  const otherProducts = data.filter((product) => !product.discount);

  return { bestSellersProducts, otherProducts };
};
