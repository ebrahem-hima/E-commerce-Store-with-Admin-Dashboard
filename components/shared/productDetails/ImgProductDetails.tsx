"use client";
import React, { useState } from "react";
import { typeProduct } from "../../../types/productTypes";
import Image from "next/image";

const ImgProductDetails = ({ item }: { item: typeProduct }) => {
  const [getImg, setGetImg] = useState(item.img);
  return (
    <div className="grid grid-cols-[100px_500px] justify-center h-[300px] gap-3">
      <div className="">
        {item.imgGallery?.map((img) => (
          <div key={img} className="max-lg:flex flex-center">
            <Image
              src={img}
              alt="img-gallery"
              width={80}
              height={80}
              onClick={() => setGetImg(img)}
              className="border-1 border-gray-50 cursor-pointer hover:border-primary rounded-[4px] p-1"
            />
          </div>
        ))}
      </div>
      {/* bigImg */}
      <div className="flex-center">
        <Image
          src={getImg}
          alt={"img" + item.name}
          width={300}
          height={300}
          className=""
        />
      </div>
    </div>
  );
};

export default ImgProductDetails;
