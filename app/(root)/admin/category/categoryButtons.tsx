import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Edit, Trash2 } from "lucide-react";
import { MouseEvent, useState } from "react";
import { handleDeleteCategory } from "./hooks/handleDeleteCategory";
import { categoryDetailType } from "@/types/adminType";

interface CategoryButtonsProps {
  item: categoryDetailType;
  handleEditClick: (
    e: MouseEvent<HTMLButtonElement>,
    category: categoryDetailType,
  ) => void;
  handleDelete: (id: number) => void;
}

const CategoryButtons = ({
  item,
  handleEditClick,
  handleDelete,
}: CategoryButtonsProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  if (!item) return;
  const categoryData = {
    id: item.id,
    name: item.name,
    description: item.description,
    type: item.type,
  };
  return (
    <div className="flex flex-col gap-2 ml-2">
      <Button
        variant="outline"
        size="sm"
        onClick={(e) => handleEditClick(e, categoryData)}
        title="isEdit"
        className="p-2 rounded-lg hover:bg-gray-100 transition"
      >
        <Edit className="w-5 h-5 text-gray-700" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        title="Delete"
        className="p-2 rounded-lg hover:bg-red-100 transition"
        onClick={(e) => {
          e.preventDefault();
          setShowDeleteDialog(true);
        }}
      >
        <Trash2 className="w-5 h-5 text-red-600" />
      </Button>
      {/* Dialog to Check Delete */}
      {showDeleteDialog && (
        <Dialog open onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogTitle>
              Are you sure you want to delete this category?
            </DialogTitle>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  setShowDeleteDialog(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteCategory({
                    categoryID: item.id,
                    setShowDeleteDialog,
                  });
                  handleDelete(item.id);
                }}
              >
                Delete
                {/* <LoadingName name="Delete" isPending={true} /> */}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CategoryButtons;
