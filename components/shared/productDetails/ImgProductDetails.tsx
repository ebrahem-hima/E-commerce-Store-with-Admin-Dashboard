"use client";
import React, { useState } from "react";
import { typeProduct } from "../../../types/productTypes";
import Image from "next/image";

const ImgProductDetails = ({ item }: { item: typeProduct }) => {
  const [getImg, setGetImg] = useState(item.img);
  return (
    <div className="grid grid-cols-[100px_minmax(0,550px)] max-md:grid-cols-1 max-md:grid-flow-dense justify-center items-center gap-3">
      <div className="max-md:order-2 flex-center items-center max-sm:overflow-x-auto h-fit">
        {item.imgGallery?.map((img) => (
          <div key={img} className="max-md:flex gap-2">
            <Image
              src={img}
              alt="img-gallery"
              width={120}
              height={120}
              onClick={() => setGetImg(img)}
              className="border-1 border-gray-50 cursor-pointer hover:border-primary rounded-sm p-1"
              priority
            />
            <Image
              src={img}
              alt="img-gallery"
              width={120}
              height={120}
              onClick={() => setGetImg(img)}
              className="border-1 border-gray-50 cursor-pointer hover:border-primary rounded-sm p-1"
              priority
            />
            <Image
              src={img}
              alt="img-gallery"
              width={120}
              height={120}
              onClick={() => setGetImg(img)}
              className="border-1 border-gray-50 cursor-pointer hover:border-primary rounded-sm p-1"
              priority
            />
            <Image
              src={img}
              alt="img-gallery"
              width={120}
              height={120}
              onClick={() => setGetImg(img)}
              className="border-1 border-gray-50 cursor-pointer hover:border-primary rounded-sm p-1"
              priority
            />
          </div>
        ))}
      </div>
      {/* bigImg */}
      <div className="flex-center max-md:order-1">
        <Image
          priority
          className="w-[300px] h-[300px] max-sm:w-[250px] max-sm:h-[250px]"
          src={getImg}
          alt={"img" + item.name}
          width={300}
          height={300}
        />
      </div>
    </div>
  );
};

export default ImgProductDetails;
