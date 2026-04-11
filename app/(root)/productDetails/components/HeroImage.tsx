"use client";

import { typeProduct } from "@/types/productTypes";
import Image from "next/image";
import { useState } from "react";

const HeroImage = ({ productDetail }: { productDetail: typeProduct }) => {
  const [getImg, setGetImg] = useState(productDetail.img);
  return (
    <div className="grid grid-cols-[100px_minmax(0,550px)] max-lg:grid-cols-1 max-lg:grid-flow-dense justify-center items-center gap-3">
      <div
        className="flex lg:flex-col self-start max-lg:order-2 lg:h-92 lg:w-fit 
        max-lg:overflow-x-auto lg:overflow-y-auto gap-1 scrollbar-thin 
        scrollbar-thumb-gray-400 scrollbar-track-transparent
      hover:scrollbar-thumb-gray-500"
      >
        {productDetail.imgGallery?.map((img, idx) => (
          <div key={img + idx}>
            <Image
              src={img}
              alt="img-gallery"
              width={120}
              height={120}
              onClick={() => setGetImg(img)}
              className={`${
                img === getImg ? "border-[#777]" : ""
              } min-w-30 min-h-15 object-contain border cursor-pointer hover:border-[#777] rounded-sm `}
              priority
            />
          </div>
        ))}
      </div>
      {/* bigImg */}
      <div className="grid justify-center self-start max-lg:order-1">
        <div className="relative max-lg:h-60 h-90 aspect-square">
          <Image
            src={getImg}
            fill
            className="object-contain"
            alt={`${productDetail.name} image`}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroImage;
