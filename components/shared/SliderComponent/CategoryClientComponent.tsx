"use client";

import { SliderSkeleton } from "@/components/Loaders/SliderSkeleton";
import CardCategory from "../Card/CardCategory";
import Slider from "./Slider";
import TitleComponent from "./titleComponent";
import { SliderComponentType } from "@/types/productTypes";
import { Suspense, useRef } from "react";

const CategoryClientComponent = ({
  titleComponent,
  Product,
  categories,
}: SliderComponentType) => {
  const parentRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="w-full flex flex-col gap-3 overflow-hidden">
      <Suspense fallback={<SliderSkeleton />}>
        <TitleComponent
          products={Product || undefined}
          parentRef={parentRef}
          titleComponent={titleComponent}
        />
        <Slider sliderType={"category"} parentRef={parentRef}>
          {categories?.map((category) => (
            <CardCategory
              key={category.id}
              // icon={category.icon}
              text={category.name}
            />
          ))}
        </Slider>
      </Suspense>
    </div>
  );
};

export default CategoryClientComponent;
