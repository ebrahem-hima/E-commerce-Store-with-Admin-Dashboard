"use client";

import React, { useState } from "react";
import Filters from "../Navbar/Filters";
import Image from "next/image";

const HeroImageFilter = () => {
  const [isOptimized, setIsOptimized] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="grid gap-10 grid-cols-[300px_1fr] h-[340px] max-md:grid-cols-1">
      <Filters />
      <div className="relative">
        {isLoading && <div>...Loading</div>}
        <Image
          // src={`/kari-shea-1SAnrIxw5OY-unsplash.jpg`}
          src={`/images/Frame_560.webp`}
          // src={`/images/pexels-tuurt-812264.webp`}
          alt="Hero-Image"
          priority
          fill
          unoptimized={!isOptimized}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
          className="object-cover rounded-md"
          onError={() => {
            setIsOptimized(false);
          }}
          onLoad={() => {
            setIsLoading(false);
          }}
        />
      </div>
    </div>
  );
};

export default HeroImageFilter;
