import { MouseEvent, useRef, useState } from "react";
import "../Card/Card.css";

const Slider = ({
  children,
  parentRef,
  sliderType,
  setStopScroll,
}: Readonly<{
  children: React.ReactNode;
  parentRef: React.RefObject<HTMLDivElement | null>;
  sliderType: "category" | "product" | "search";
  setStopScroll?: React.Dispatch<React.SetStateAction<boolean>>;
}>) => {
  const slider = parentRef.current;
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const isDragging = useRef(false);
  const wasMoved = useRef(false);

  const startDragging = (clientX: number) => {
    setStopScroll?.(true);
    isDragging.current = true;
    wasMoved.current = false;

    if (slider) {
      slider.classList.add("dragging");
      slider.style.scrollBehavior = "auto";
      slider.style.scrollSnapType = "none";
    }

    setStartX(clientX);
    setScrollLeft(slider?.scrollLeft || 0);
  };

  const onDragging = (clientX: number) => {
    if (!isDragging.current) return;

    const walk = clientX - startX;

    if (Math.abs(walk) > 5) {
      wasMoved.current = true;
    }

    if (slider) {
      slider.scrollLeft = scrollLeft - walk;
    }
  };

  const stopDragging = () => {
    isDragging.current = false;

    if (slider) {
      slider.classList.remove("dragging");
      slider.style.scrollBehavior = "smooth";
      slider.style.scrollSnapType = "x mandatory";
    }
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    startDragging(e.pageX);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    onDragging(e.pageX);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startDragging(e.touches[0].pageX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    onDragging(e.touches[0].pageX);
    setStopScroll?.(true);
  };

  const handleChildClick = (e: MouseEvent<HTMLDivElement>) => {
    if (wasMoved.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  let style = "";
  switch (sliderType) {
    case "category":
      style = "categoryGrid";
      break;
    case "product":
      style = "productGrid";
      break;
    case "search":
      style = "searchGrid";
      break;
    default:
      style = "productGrid";
      break;
  }

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={stopDragging}
      onClickCapture={handleChildClick}
      onDragStart={(e) => e.preventDefault()}
      className={`${style} slider scroll-smooth overflow-x-auto scrollbar-hide snap-x snap-mandatory`}
      ref={parentRef}
    >
      {children}
    </div>
  );
};

export default Slider;
