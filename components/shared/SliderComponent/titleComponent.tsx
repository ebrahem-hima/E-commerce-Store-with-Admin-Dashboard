"use client";

import { typeProduct } from "@/types/productTypes";
import React, { useCallback, useEffect, useState } from "react";
import { IoMdArrowForward } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";

interface Props {
  titleComponent: string | undefined;
  parentRef: React.RefObject<HTMLDivElement | null>;
  products: typeProduct[] | undefined;
  stopScroll?: boolean;
}

const TitleComponent = ({
  titleComponent,
  parentRef,
  products,
  stopScroll,
}: Props) => {
  const [isDisabled, setIsDisabled] = useState({ left: false, right: false });
  useEffect(() => {
    const parent = parentRef.current;
    const firstChild = parent?.firstElementChild as Element;
    const lastChild = parent?.lastElementChild as Element;
    const options = {
      root: parent,
      threshold: 1.0,
      rootMargin: "0px 10px",
    };
    const observe = new IntersectionObserver((entries) => {
      let firstVisible = false;
      let lastVisible = false;
      entries.forEach((entry) => {
        if (entry.target === firstChild) firstVisible = entry.isIntersecting;
        if (entry.target === lastChild) lastVisible = entry.isIntersecting;
      });
      setIsDisabled({
        left: firstVisible,
        right: lastVisible,
      });
    }, options);
    if (firstChild) observe.observe(firstChild);
    if (lastChild) observe.observe(lastChild);
    return () => {
      if (firstChild) observe.unobserve(firstChild);
      if (lastChild) observe.unobserve(lastChild);
    };
  }, [parentRef]);

  const handleClickArrow = useCallback(
    (direction: string) => {
      const parent = parentRef.current;
      if (!parent) return;

      const firstChild = parent?.children[0].firstChild as HTMLElement;
      if (!firstChild) return;

      const computedStyle = window.getComputedStyle(parent.children[0]);
      const gapValue = parseFloat(computedStyle.columnGap || "0");

      const scrollAmount =
        direction === "right"
          ? firstChild.clientWidth + gapValue
          : -(firstChild.clientWidth + gapValue);

      parent.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    },
    [parentRef],
  );

  const handleAutoScroll = useCallback(() => {
    if (isDisabled.right) {
      parentRef.current?.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    } else {
      handleClickArrow("right");
    }
  }, [handleClickArrow, isDisabled.right, parentRef]);

  useEffect(() => {
    if (!products || products.length <= 1 || stopScroll) return;
    const interval = setInterval(() => handleAutoScroll(), 4000);
    return () => clearInterval(interval);
  }, [handleAutoScroll, products, stopScroll]);

  return (
    <div className="flex-between">
      <div className="font-inter not-italic font-medium text-[25px]">
        {titleComponent}
      </div>
      <div className="flex items-center gap-3">
        <button
          aria-label="Previous Slide"
          onClick={() => handleClickArrow("left")}
          disabled={isDisabled.left}
          className="cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed"
        >
          <IoArrowBack size={22} />
        </button>
        <button
          aria-label="Next Slide"
          onClick={() => handleClickArrow("right")}
          disabled={isDisabled.right}
          className="cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <IoMdArrowForward size={22} />
        </button>
      </div>
    </div>
  );
};

export default TitleComponent;
