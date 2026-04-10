import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { categoryDetailType } from "@/types/adminType";
import { handleAddCategory, handleClose } from "../adminFn/category/categoryFn";
import { Textarea } from "@/components/ui/textarea";
import { Boxes } from "lucide-react";

interface Props {
  setShowCategory: Dispatch<SetStateAction<boolean>>;
  categoryDetail?: categoryDetailType;
  Edit?: boolean;
  setCategories: Dispatch<SetStateAction<categoryDetailType[]>>;
}

const AddCategory = ({
  categoryDetail,
  setShowCategory,
  Edit = false,
  setCategories,
}: Props) => {
  const [category, setCategory] = useState<categoryDetailType>({
    id: categoryDetail?.id || 0,
    name: categoryDetail?.name || "",
    type: categoryDetail?.type || "",
    description: categoryDetail?.description || "",
    productCount: categoryDetail?.productCount || 0,
  });

  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className="fixed top-1/5 left-1/2 transform -translate-x-1/2 w-112.5 h-auto z-60 bg-white text-black p-4 rounded-lg">
      <div className="flex-between mb-4">
        <h2 className="text-xl font-bold">Add Category</h2>
        <div className="flex items-center gap-2 text-primary">
          <Boxes className="w-5 h-5" />
          <strong>{category?.productCount}</strong> Products
        </div>
      </div>

      <div className="flex flex-col gap-3 mb-4">
        <div>
          <Label htmlFor="categoryName" className="mb-2 font-medium">
            Category Name
          </Label>
          <Input
            ref={inputRef}
            type="text"
            id="categoryName"
            name="categoryName"
            value={category?.name}
            onChange={(e) =>
              setCategory((prev) => {
                if (!prev) return prev;
                return {
                  ...prev,
                  name: e.target.value ?? "",
                };
              })
            }
            placeholder="Enter category name"
            className="p-1 pl-2 rounded border border-gray-400"
          />
        </div>
        <div>
          <Label>Category Type</Label>
          <Input
            // ref={inputRef}
            type="text"
            name="categoryType"
            id="categoryType"
            value={category?.type}
            onChange={(e) =>
              setCategory((prev) => {
                if (!prev) return prev;
                return {
                  ...prev,
                  type: e.target.value ?? "",
                };
              })
            }
            placeholder="Enter category type"
            className="p-1 pl-2 rounded border border-gray-400"
          />
        </div>
        <div>
          <Label>Category Description</Label>
          <Textarea
            value={category?.description}
            onChange={(e) =>
              setCategory((prev) => {
                if (!prev) return prev;
                return {
                  ...prev,
                  description: e.target.value ?? "",
                };
              })
            }
            name="categoryDescription"
            className="focus:outline-none"
            placeholder="Enter category description"
            id="categoryDescription"
          ></Textarea>
        </div>
      </div>

      <div className="mt-3 flex-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={(e) =>
            handleClose({
              e,
              setShowCategory,
              inputRef,
            })
          }
        >
          Cancel
        </Button>
        <Button
          onClick={(e) => {
            handleAddCategory({
              e,
              Edit,
              category,
              setCategories,
              setShowCategory,
            });
          }}
          variant="default"
          size="sm"
        >
          {Edit ? "Update Category" : "Add Category"}
        </Button>
      </div>
    </div>
  );
};

export default AddCategory;
