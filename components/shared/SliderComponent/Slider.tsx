const Slider = ({
  children,
  parentRef,
}: Readonly<{
  children: React.ReactNode;
  parentRef: React.RefObject<HTMLDivElement | null>;
}>) => {
  return (
    <div
      className="overflow-x-auto scrollbar-hide snap-x 
      snap-mandatory
      px-max-lg:px-4 max-md:px-3 max-sm:px-2 max-400:px-1"
      ref={parentRef}
    >
      {children}
    </div>
  );
};

export default Slider;
