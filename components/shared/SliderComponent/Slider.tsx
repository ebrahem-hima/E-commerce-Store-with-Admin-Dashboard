const Slider = ({
  children,
  parentRef,
}: Readonly<{
  children: React.ReactNode;
  parentRef: React.RefObject<HTMLDivElement | null>;
}>) => {
  return (
    <div
      className="overflow-x-auto scrollbar-hide snap-x snap-mandatory"
      ref={parentRef}
    >
      {children}
    </div>
  );
};

export default Slider;
