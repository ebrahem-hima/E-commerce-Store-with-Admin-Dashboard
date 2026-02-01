"use client";

import Products from "@/components/shared/Card/ProductCard/Products";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
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
          <span>Sort By</span>
          <div className="w-50">
            <Select>
              <SelectTrigger className="h-8!">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="border-none">
                <SelectItem value="high-to-low">Price (High to Low)</SelectItem>
                <SelectItem value="low-to-high">Price (Low to High)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
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
        <Products data={productSearch} setData={setProductSearch} />
        {/* {products.map((item) => (
          <ProductCard
            productId={item.id}
            isGrid={isGrid}
            key={item.id}
            item={item}
          />
        ))} */}
      </div>
    </div>
  );
};

export default SearchProduct;
