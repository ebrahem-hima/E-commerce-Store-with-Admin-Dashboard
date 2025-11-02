import { useEffect, useRef, useState } from "react";

const Slider = ({
  children,
  parentRef,
}: Readonly<{
  children: React.ReactNode;
  parentRef: React.RefObject<HTMLDivElement | null>;
}>) => {
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const isDragging = useRef(false);

  const handleMouseUp = () => {};

  const handleMouseDown = (e: MouseEvent) => {
    isDragging.current = true;
    setStartX(e.pageX);
    setScrollLeft(parentRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = () => {
    if (isDragging) {
    }
  };

  useEffect(() => {
    const slider = parentRef.current;
  }, []);

  return (
    <div
      onMouseUp={handleMouseUp}
      // onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      className="overflow-x-auto scrollbar-hide snap-x snap-mandatory"
      ref={parentRef}
    >
      {children}
    </div>
  );
};

export default Slider;
