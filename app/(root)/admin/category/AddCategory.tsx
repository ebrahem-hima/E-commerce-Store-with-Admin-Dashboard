import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { categoryDetailType } from "@/types/adminType";
import { handleAddCategory, handleClose } from "../adminFn/category/categoryFn";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  setShowCategory: Dispatch<SetStateAction<boolean>>;
  categoryDetail?: categoryDetailType;
  Edit?: boolean;
  handleAddCategoryProductPage?: (newCategory: categoryDetailType) => void;
}

const AddCategory = ({
  categoryDetail,
  setShowCategory,
  Edit = false,
  // handleAddCategoryProductPage,
}: Props) => {
  const [category, setCategory] = useState<categoryDetailType>({
    id: categoryDetail?.id || 0,
    name: categoryDetail?.name || "",
    type: categoryDetail?.type || "",
    description: categoryDetail?.description || "",
  });
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className="absolute top-1/5 left-1/2 transform -translate-x-1/2 w-112.5 h-auto z-60 bg-white text-black p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add Category</h2>

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

      <div className="mt-3 flex-end">
        <Button
          variant="outline"
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
              category,
              setShowCategory,
              Edit,
            });
            // handleAddCategoryProductPage?.({
            //   id: category?.id,
            //   name: category?.name || "",
            //   type: category?.type || "",
            //   description: category?.description || "",
            //   productCount: 0,
            // });
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
