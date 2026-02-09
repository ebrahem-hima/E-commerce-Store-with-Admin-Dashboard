"use client";

import Slider from "./Slider";
import TitleComponent from "./titleComponent";
import { SliderComponentType } from "@/types/productTypes";
import { useRef } from "react";
import Products from "../Card/ProductCard/Products";
import { useProductContext } from "@/context/productContext";

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
      <TitleComponent
        products={Product || undefined}
        parentRef={parentRef}
        titleComponent={titleComponent}
      />
      <Slider parentRef={parentRef}>
        <div className={search ? "searchGrid" : "productGrid"}>
          <Products data={Product || []} setData={setCartData} />
        </div>
      </Slider>
    </div>
  );
};

export default SliderClientComponent;
