import React from "react";
import HeaderSaveActions from "../../shared/HeaderSaveActions";
import Image from "next/image";
import { Edit2, Plus, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import DragAndDropImage from "../../shared/DragAndDropImage";
import Link from "next/link";

const Page = () => {
  return (
    <div>
      <HeaderSaveActions link="/admin/category" />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
        {/* Products */}
        <div className="ml-4">
          <p className="mb-2 font-medium text-[18px]">Products 12</p>
          <div className="flex flex-col gap-4">
            <div className="px-4 group flex-between cursor-pointer">
              <div className="flex items-center gap-4">
                <Image
                  src={`/images/adminCategory/Bitmap.png`}
                  alt="product-img"
                  width={80}
                  height={80}
                  className="object-cover rounded-sm"
                />
                <span className="font-medium text-[16px]">
                  Women Striped T-Shirt
                </span>
              </div>
              <div className="hidden group-hover:flex items-center gap-4 text-[#777]">
                <Link href={`/admin/products/AddProduct`}></Link>
                <Edit2 size={23} />
                <Trash2 size={23} />
              </div>
            </div>
          </div>
          <Link
            href={`/admin/products/AddProduct`}
            className="text-sm mt-4 cursor-pointer duration-300 hover:border-[#5656ee00] hover:bg-[#5656ee0c] flex-center py-1 w-full border border-[#77777742] rounded-sm text-blue-500"
          >
            <Plus size={20} /> Add Product
          </Link>
        </div>
        {/* Category Info */}
        <div>
          <p className="font-medium mb-3">Category Info</p>
          <div className="mb-4">
            <Label className="text-sm text-[#777]">Category Name</Label>
            <Input type="text" placeholder="Enter Category Name" />
          </div>

          <DragAndDropImage />
        </div>
      </div>
    </div>
  );
};

export default Page;
