import { Checkbox } from "@/components/ui/checkbox";
import { Dispatch, SetStateAction } from "react";
import { Label } from "@/components/ui/label";
import LoadingSpinner from "@/components/Loaders/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { categoryDetailType } from "@/types/adminType";

interface Props {
  selectedCategory: number | null;
  setSelectedCategory: Dispatch<SetStateAction<number | null>>;
  setShowCategory: Dispatch<SetStateAction<boolean>>;
  categories: categoryDetailType[];
  Loading: boolean;
}

const CategoryList = ({
  selectedCategory,
  setSelectedCategory,
  setShowCategory,
  categories,
  Loading,
}: Props) => {
  return (
    <>
      <div className="flex flex-col gap-2 text-sm text-muted-foreground">
        {Loading ? (
          <LoadingSpinner />
        ) : (
          categories.map((category) => (
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
          ))
        )}
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
    </>
  );
};

export default CategoryList;
