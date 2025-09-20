"use client";

import React, { useRef } from "react";
import TitleComponent from "./titleComponent";
import { SliderComponentType } from "../../../types/productTypes";
import Slider from "./Slider";
import CardCategory from "../Card/CardCategory";
import { categoryCard } from "../../../constant/filterNavbar";
import "../Card/Card.css";
import ProductCard from "../Card/ProductCard/ProductCard";

const SliderComponent = ({
  type,
  titleComponent,
  Product,
  category,
}: SliderComponentType) => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="w-full flex flex-col gap-3 overflow-hidden red">
      <TitleComponent parentRef={parentRef} titleComponent={titleComponent} />
      {type === "category" ? (
        <Slider parentRef={parentRef}>
          <div className="categoryGrid">
            {/* <div className="categoryGrid"> */}
            {categoryCard.map((category) => (
              <CardCategory
                key={category.text}
                icon={category.icon}
                text={category.text}
                value={category.value}
              />
            ))}
          </div>
        </Slider>
      ) : (
        <Slider parentRef={parentRef}>
          <div className="productGrid">
            {Product.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </Slider>
      )}
    </div>
  );
};

export default SliderComponent;
