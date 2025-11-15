"use client";

import Image from "next/image";
import Filters from "../Navbar/Filters";

const HeroImageFilter = () => {
  return (
    <div className="grid gap-10 grid-cols-[300px_1fr] h-[340px] max-lg:grid-cols-1">
      <Filters />
      <div className="relative">
        <Image
          src={`/images/heroImage.webp`}
          alt="Hero-Image"
          priority
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
          className="object-cove rounded-md"
        />
      </div>
    </div>
  );
};

export default HeroImageFilter;
