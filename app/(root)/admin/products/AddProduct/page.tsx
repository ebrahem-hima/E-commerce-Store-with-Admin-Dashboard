"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Badge from "@/components/shared/Badge";
import { Checkbox } from "@/components/ui/checkbox";
import Information from "./Information";
import HeaderSaveActions from "../../shared/HeaderSaveActions";

const categories = ["Electronics", "Accessories", "Fashion", "Gaming"];

export default function Page() {
  return (
    <>
      <HeaderSaveActions link="/admin/products" title="Add Product" />
      <div className="grid lg:grid-cols-[1fr_250px] sm:grid-cols-1 gap-6">
        <div className="space-y-6 order-1 lg:order-2">
          <h3 className="text-xl font-semibold">Categories</h3>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            {categories.map((category) => (
              <div key={category} className="flex items-center gap-2">
                <Checkbox id={category} />
                <Label htmlFor={category}>{category}</Label>
              </div>
            ))}
          </div>

          <Button variant="link" className="p-0 h-auto text-blue-600">
            Create New
          </Button>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2">
              <Badge text="New" />
              <Badge text="Sale" />
              <Badge text="Hot" />
            </div>
          </div>
        </div>

        <Information />
      </div>
    </>
  );
}
