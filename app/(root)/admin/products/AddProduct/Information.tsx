"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import InputBadge from "../../shared/InputBadge";

const Information = () => {
  return (
    <div className="space-y-6 order-2 lg:order-1">
      <h2 className="text-2xl font-semibold">Information</h2>

      {/* Product Name */}
      <div className="flex flex-col gap-2">
        <Label>Product Name</Label>
        <Input placeholder="Enter Product Name" />
      </div>

      {/* Product Description */}
      <div className="flex flex-col gap-2">
        <Label>Product Description</Label>
        <Textarea
          className="h-32"
          placeholder="Write description..."
          rows={5}
        />
      </div>

      {/* Images */}
      <div className="flex flex-col gap-2">
        <Label>Images</Label>
        <div className="border border-dashed border-[#646363a4] rounded-lg p-6 text-center text-muted-foreground">
          Upload product images here
        </div>
      </div>

      {/* Price */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Price</Label>
          <Input type="number" placeholder="Enter Price" />
        </div>
        <div>
          <Label>Discount Price</Label>
          <Input type="number" placeholder="Price at Discount" />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Label className="text-[20px]">Options</Label>
        <InputBadge />
      </div>
    </div>
  );
};

export default Information;
