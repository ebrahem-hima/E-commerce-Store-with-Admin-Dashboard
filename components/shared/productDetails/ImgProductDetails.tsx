"use client";
import { useState } from "react";
import { typeProduct } from "../../../types/productTypes";
import Image from "next/image";

const ImgProductDetails = ({ item }: { item: typeProduct }) => {
  const [getImg, setGetImg] = useState(item.img);
  return (
    <div className="grid grid-cols-[100px_minmax(0,550px)] max-md:grid-cols-1 max-md:grid-flow-dense justify-center items-center gap-3">
      <div className="self-start max-md:order-2 max-sm:overflow-x-auto h-fi">
        {item.imgGallery?.map((img) => (
          <div key={img} className="flex flex-col max-md:flex-row gap-2">
            <Image
              src={img}
              alt="img-gallery"
              width={120}
              height={120}
              onClick={() => setGetImg(img)}
              className={`${
                img === getImg ? "border-primary" : "border-none"
              } border cursor-pointer hover:border-primary rounded-sm p-1`}
              priority
            />
          </div>
        ))}
      </div>
      {/* bigImg */}
      <div className="flex-center max-md:order-1">
        <Image
          width={270}
          height={270}
          // width={128}
          // height={128}
          src={getImg}
          alt="img-gallery"
          priority
        />
      </div>
    </div>
  );
};

export default ImgProductDetails;
