import React from "react";
import PageHeader from "../shared/PageHeader";
import Image from "next/image";
import { Edit2 } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <div>
      <PageHeader title="Categories" buttonText="Add Category" />
      <div className="grid grid-cols-1 400:grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
        <Link href={`/admin/category/123`}>
          {/* Image */}
          <div className="relative w-full h-[250px] group cursor-pointer duration-300 hover:bg-[#0000004b]">
            <Image
              src={"/images/adminCategory/Bitmap.png"}
              alt="category-img"
              fill
              className="object-cover rounded-t-sm z-[-1]"
            />
            {/* Edit */}
            <div className="hidden group-hover:block duration-300 absolute top-1/2 left-1/2 transform translate-x-[-50%] text-blue-500 bg-white rounded-sm px-2 py-1">
              <span className="flex items-center gap-2">
                <Edit2 size={20} />
                Edit
              </span>
            </div>
          </div>
          {/* text */}
          <div className="pl-6 py-2">
            <p className="font-inter font-medium text-[18px]">Men Clothes</p>
            <span className="text-[#777] text-sm">24 items</span>
          </div>
        </Link>
        <Link href={`/admin/category/1234`}>
          {/* Image */}
          <div className="relative w-full h-[250px] group cursor-pointer duration-300 hover:bg-[#0000004b]">
            <Image
              src={"/images/adminCategory/Bitmap1.png"}
              alt="category-img"
              fill
              className="object-cover rounded-t-sm z-[-1]"
            />
            {/* Edit */}
            <div className="hidden group-hover:block duration-300 absolute top-1/2 left-1/2 transform translate-x-[-50%] text-blue-500 bg-white rounded-sm px-2 py-1">
              <span className="flex items-center gap-2">
                <Edit2 size={20} />
                Edit
              </span>
            </div>
          </div>
          {/* text */}
          <div className="pl-6 py-2">
            <p className="font-inter font-medium text-[18px]">Men Clothes</p>
            <span className="text-[#777] text-sm">24 items</span>
          </div>
        </Link>
        <Link href={`/admin/category/12345`}>
          {/* Image */}
          <div className="relative w-full h-[250px] group cursor-pointer duration-300 hover:bg-[#0000004b]">
            <Image
              src={"/images/adminCategory/image.png"}
              alt="category-img"
              fill
              className="object-cover rounded-t-sm z-[-1]"
            />
            {/* Edit */}
            <div className="hidden group-hover:block duration-300 absolute top-1/2 left-1/2 transform translate-x-[-50%] text-blue-500 bg-white rounded-sm px-2 py-1">
              <span className="flex items-center gap-2">
                <Edit2 size={20} />
                Edit
              </span>
            </div>
          </div>
          {/* text */}
          <div className="pl-6 py-2">
            <p className="font-inter font-medium text-[18px]">Men Clothes</p>
            <span className="text-[#777] text-sm">24 items</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Page;
