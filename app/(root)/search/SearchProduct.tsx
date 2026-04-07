"use client";

import Products from "@/components/shared/Card/ProductCard/Products";
import { typeProduct } from "@/types/productTypes";
import { useState } from "react";
import { IoList } from "react-icons/io5";
import { SlGrid } from "react-icons/sl";

const SearchProduct = ({ products }: { products: typeProduct[] }) => {
  const [isGrid, setIsGrid] = useState(false);
  const [productSearch, setProductSearch] = useState(products);

  return (
    <div>
      <div className="flex-between">
        <div className="flex gap-2 items-center">
          <SlGrid
            onClick={() => setIsGrid(true)}
            size={19}
            className="cursor-pointer"
          />
          <IoList
            onClick={() => setIsGrid(false)}
            size={27}
            className="cursor-pointer"
          />
        </div>
      </div>
      <div
        className={`${
          isGrid
            ? "flex flex-col"
            : "grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-400:grid-cols-1"
        } gap-4 `}
      >
        <Products
          isGrid={isGrid}
          data={productSearch}
          setData={setProductSearch}
        />
      </div>
    </div>
  );
};

export default SearchProduct;
