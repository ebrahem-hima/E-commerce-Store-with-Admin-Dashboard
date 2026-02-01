"use client";

import Slider from "./Slider";
import TitleComponent from "./titleComponent";
import { SliderComponentType } from "@/types/productTypes";
import { Suspense, useRef } from "react";
import Products from "../Card/ProductCard/Products";
import { useProductContext } from "@/context/productContext";

const SliderSkeleton = () => {
  return (
    <div className="w-full">
      <div className="h-8 mb-2 w-40 bg-[#b4b3b3] rounded animate-pulse" />
      <div className="productGrid overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="w-full h-50 bg-[#b4b3b3] rounded animate-pulse"
          />
        ))}
      </div>
    </div>
  );
};

const SliderClientComponent = ({
  titleComponent,
  Product,
  search,
}: SliderComponentType) => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const { setCartData } = useProductContext();
  if (Product?.length === 0) return null;
  return (
    <div className="w-full flex flex-col gap-3 overflow-hidden">
      <Suspense fallback={<SliderSkeleton />}>
        <TitleComponent
          products={Product || undefined}
          parentRef={parentRef}
          titleComponent={titleComponent}
        />
        <Slider parentRef={parentRef}>
          <div className={search ? "searchGrid" : "productGrid"}>
            <Products
              // type="wishlist"
              data={Product || []}
              setData={setCartData}
            />
            {/* {Product?.map((item) => (
              <ProductCard productId={item.id} key={item.id} item={item} />
            ))} */}
          </div>
        </Slider>
      </Suspense>
    </div>
  );
};

export default SliderClientComponent;
