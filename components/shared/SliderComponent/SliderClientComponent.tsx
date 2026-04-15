"use client";

import Slider from "./Slider";
import TitleComponent from "./titleComponent";
import { SliderComponentType } from "@/types/productTypes";
import { useRef, useState } from "react";
import Products from "../Card/ProductCard/Products";

const SliderClientComponent = ({
  titleComponent,
  Product,
  sliderType,
}: SliderComponentType) => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [stopScroll, setStopScroll] = useState(false);
  if (Product?.length === 0) return null;
  return (
    <div
      onMouseLeave={() => setStopScroll(false)}
      onMouseEnter={() => setStopScroll(true)}
      onTouchStart={() => setStopScroll(true)}
      onTouchEnd={() => setStopScroll(false)}
      className="w-full flex flex-col gap-3 overflow-hidden"
    >
      <TitleComponent
        products={Product || undefined}
        parentRef={parentRef}
        titleComponent={titleComponent}
        stopScroll={stopScroll}
      />
      <Slider
        setStopScroll={setStopScroll}
        parentRef={parentRef}
        sliderType={sliderType || "product"}
      >
        <Products data={Product || []} />
      </Slider>
    </div>
  );
};

export default SliderClientComponent;
