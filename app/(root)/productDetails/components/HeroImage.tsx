"use client";

import { typeProduct } from "@/types/productTypes";
import Image from "next/image";
import { useState } from "react";

const HeroImage = ({ productDetail }: { productDetail: typeProduct }) => {
  const [getImg, setGetImg] = useState(productDetail.img);
  return (
    <div className="grid grid-cols-[100px_minmax(0,550px)] max-lg:grid-cols-1 max-lg:grid-flow-dense justify-center items-center gap-3">
      <div className="max-lg:flex self-start max-lg:order-2 max-sm:overflow-x-auto h-fi">
        {productDetail.imgGallery?.map((img) => (
          <div key={img} className="">
            <Image
              src={img}
              alt="img-gallery"
              width={120}
              height={120}
              onClick={() => setGetImg(img)}
              className={`${
                img === getImg ? "border-primary" : "border-none"
              } min-w-30 min-h-15 object-contain  border cursor-pointer hover:border-primary rounded-sm p-1`}
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
