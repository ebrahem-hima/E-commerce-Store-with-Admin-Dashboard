import { MouseEvent, useRef, useState } from "react";

const Slider = ({
  children,
  parentRef,
  // search,
  sliderType,
}: Readonly<{
  children: React.ReactNode;
  parentRef: React.RefObject<HTMLDivElement | null>;
  search?: boolean;
  sliderType: "category" | "product" | "search";
}>) => {
  const slider = parentRef.current;
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const isDragging = useRef(false);

  const startDragging = (e: MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    slider?.classList.add("dragging");

    setStartX(e.pageX);
    setScrollLeft(slider?.scrollLeft || 0);
  };

  const stopDragging = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    isDragging.current = false;
    slider?.classList.remove("dragging");
  };

  const Dragging = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return false;
    if (slider) slider.scrollLeft = scrollLeft - (e.pageX - startX);
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
      onMouseDown={startDragging}
      onMouseUp={stopDragging}
      onMouseMove={Dragging}
      onMouseLeave={stopDragging}
      onDragStart={(e) => {
        e.preventDefault();
      }}
      className={`${style} slider scroll-smooth overflow-x-auto scrollbar-hide snap-x snap-mandatory`}
      ref={parentRef}
    >
      {children}
    </div>
  );
};

export default Slider;
