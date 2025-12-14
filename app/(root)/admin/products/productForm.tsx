"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Badge from "@/components/shared/Badge";
import { Checkbox } from "@/components/ui/checkbox";
import HeaderSaveActions from "../shared/HeaderSaveActions";
import useCategory from "../adminHooks/useGetCategory";
import Information from "./AddProduct/Information";
import { useState } from "react";
import AddCategory from "../category/AddCategory";
import CategoryRealTime from "../category/categoryRealTime";
import useProduct from "./hooks/useAddProduct";
import { typeMode } from "@/types/adminType";

export default function ProductForm({ mode }: { mode: typeMode }) {
  const { categories, setCategories } = useCategory();
  const [showCategory, setShowCategory] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [ImageGalleryDeleted, setImageGalleryDeleted] = useState<string[]>([]);

  const {
    addProduct,
    setProductDetail,
    selectedCategory,
    productDetail,
    setSelectedCategory,
    setGetOptions,
    getOptions,
  } = useProduct({
    ImageGalleryDeleted,
    mode,
    file,
    files,
  });

  // console.log("ImageGalleryDeleted", ImageGalleryDeleted);

  return (
    <>
      <CategoryRealTime setCategories={setCategories} />
      {showCategory && (
        <div>
          <div className="absolute top-0 left-0 z-50 bg-black/75 w-full h-full"></div>
          <AddCategory setShowCategory={setShowCategory} />
        </div>
      )}
      <HeaderSaveActions
        onClick={addProduct}
        link="/admin/products"
        title="Add Product"
      />
      <div className="grid lg:grid-cols-[minmax(200px,1fr)_250px] sm:grid-cols-1 gap-6">
        <div className="space-y-6 order-1 lg:order-2">
          <h3 className="text-xl font-semibold">Categories</h3>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            {categories.map((category) => (
              <div key={category?.id} className="flex items-center gap-2">
                <Checkbox
                  checked={selectedCategory === category?.id}
                  onCheckedChange={(isChecked) => {
                    if (isChecked) {
                      setSelectedCategory(category?.id || null);
                    } else {
                      setSelectedCategory(null);
                    }
                  }}
                  id={category?.name}
                />
                <Label htmlFor={category?.name}>{category?.name}</Label>
              </div>
            ))}
          </div>

          <Button
            onClick={(e) => {
              e.preventDefault();
              setShowCategory(true);
            }}
            variant="link"
            className="p-0 h-auto text-blue-600"
          >
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

        <Information
          setImageGalleryDeleted={setImageGalleryDeleted}
          setGetOptions={setGetOptions}
          getOptions={getOptions}
          productDetail={productDetail}
          setProductDetail={setProductDetail}
          setFile={setFile}
          setFiles={setFiles}
        />
      </div>
    </>
  );
}
