import React from "react";
import Filters from "../Navbar/Filters";
import Image from "next/image";

const HeroImageFilter = () => {
  return (
    <div className="grid gap-10 grid-cols-[300px_1fr] h-[340px] max-md:grid-cols-1">
      <Filters />
      <div className="relative">
        <Image
          src={`/images/Frame 560.webp`}
          alt="Hero-Image"
          priority
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
          className="object-fill rounded-md"
        />
      </div>
    </div>
  );
};

export default HeroImageFilter;
