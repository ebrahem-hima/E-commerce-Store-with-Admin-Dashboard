"use client";

import React, { useEffect, useState } from "react";
import { IoMdArrowForward } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";

interface Props {
  titleComponent: string;
  parentRef: React.RefObject<HTMLDivElement | null>;
}

const TitleComponent = ({ titleComponent, parentRef }: Props) => {
  const [isDisabled, setIsDisabled] = useState({ left: false, right: false });

  useEffect(() => {
    const parent = parentRef.current;
    if (!parent) return;
    const firstChild = parent?.children[0].firstChild as Element;
    const lastChild = parent?.children[0].lastChild as Element;
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

  const handleClickArrow = (direction: string) => {
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
  };

  return (
    <div className="flex-between">
      <div className="font-inter not-italic font-medium text-[25px]">
        {titleComponent}
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleClickArrow("left")}
          disabled={isDisabled.left}
          className="cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed"
        >
          <IoArrowBack size={22} />
        </button>
        <button
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
