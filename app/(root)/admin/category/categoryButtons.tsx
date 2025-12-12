import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Edit, Trash2 } from "lucide-react";
import React from "react";

interface CategoryButtonsProps {
  itemId: number;
  handleGetCategory: (args: {
    e: React.MouseEvent<HTMLButtonElement>;
    setShowCategory: React.Dispatch<React.SetStateAction<boolean>>;
    categoryID: number;
  }) => void;
  setShowCategory: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteCategory: (args: {
    categoryID: number;
    setShowDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
    e: React.MouseEvent<HTMLButtonElement>;
  }) => void;
  showDeleteDialog: boolean;
  setShowDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoryButtons = ({
  itemId,
  handleGetCategory,
  setShowCategory,
  handleDeleteCategory,
  showDeleteDialog,
  setShowDeleteDialog,
  setEdit,
}: CategoryButtonsProps) => {
  return (
    <div className="flex flex-col gap-2 ml-2">
      <Button
        variant="outline"
        size="sm"
        onClick={(e) => {
          {
            setEdit(true);
            handleGetCategory({
              e,
              setShowCategory,
              categoryID: itemId,
            });
          }
        }}
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
                    categoryID: itemId,
                    setShowDeleteDialog,
                    e,
                  });
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
