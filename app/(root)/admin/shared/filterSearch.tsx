"use client";

import { Check, Edit2, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClient } from "@/utils/supabase/client";
import { SelectCheckBox } from "@/types/typeAliases";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";
import { selectFilterType, typeEditValue } from "@/types/adminType";
import { handleDeleteUsers } from "../adminFn/handleDeleteUsers";

interface Props {
  selectOptions: selectFilterType[];
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  setSelectFilter: React.Dispatch<React.SetStateAction<string>>;
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  Edit?: boolean;
  typeTable: string;
  selectCheckBox: SelectCheckBox[];
  EditValue?: typeEditValue[];
  setSelectCheckBox?: Dispatch<SetStateAction<SelectCheckBox[]>>;
}

const FilterSearch = ({
  selectOptions,
  setSearchText,
  setSelectFilter,
  setEdit,
  Edit,
  typeTable,
  selectCheckBox,
  EditValue,
  setSelectCheckBox,
}: Props) => {
  const supabase = createClient();
  const startEdit = () => {
    if (!selectCheckBox.length) return toast.info("Please Choose Orders");
    setEdit?.(true);
  };

  const deleteProductFolder = async (productId: string) => {
    const bucketName = "products-images";
    const pathsToDelete: string[] = [];

    const { data: mainFiles, error: mainError } = await supabase.storage
      .from(bucketName)
      .list(`${productId}/main`);
    if (mainError) {
      console.log(mainError);
    }
    if (mainFiles) {
      mainFiles.forEach((file) => {
        pathsToDelete.push(`${productId}/main/${file.name}`);
      });
    }
    const { data: galleryFiles, error: galleryError } = await supabase.storage
      .from(bucketName)
      .list(`${productId}/gallery`);

    if (galleryFiles) {
      galleryFiles.forEach((file) => {
        pathsToDelete.push(`${productId}/gallery/${file.name}`);
      });
    }
    if (galleryError) {
      console.log(galleryError);
    }
    if (pathsToDelete.length > 0) {
      const { error } = await supabase.storage
        .from(bucketName)
        .remove(pathsToDelete);

      if (error) {
        console.error("Error deleting files:", error);
        return false;
      }
    }

    return true;
  };

  const handleDeleteProducts = async () => {
    const productIds = selectCheckBox.map((item) => item.ID);
    for (const productId of productIds) {
      await deleteProductFolder(productId as string);
    }
  };

  const handleDelete = async () => {
    const getIDs = selectCheckBox.map((item) => item.ID);
    if (!getIDs.length) return;

    const { error } = await supabase.from(typeTable).delete().in("id", getIDs);
    if (error) {
      console.log(error);
      return;
    }
    toast.success("Successfully deleted");
    setSelectCheckBox?.([]);
  };

  const handleEditTable = async () => {
    if (!EditValue || EditValue?.length === 0) return;
    try {
      const updatePromises = EditValue.map((item) =>
        supabase
          .from("user_order")
          .update({ order_status: item.status })
          .eq("id", item.ID)
      );

      const results = await Promise.all(updatePromises);

      results.forEach(({ error }, idx) => {
        if (error)
          console.log(`Error updating ID ${EditValue[idx].ID}:`, error);
      });
    } catch (err) {
      console.log("Unexpected error:", err);
    }
    setEdit?.(false);
    setSelectCheckBox?.([]);
    toast.success("Updated");
  };

  const userIds = selectCheckBox.map((user) => String(user.ID));

  return (
    <div className="grid grid-cols-[auto_1fr_auto] max-md:grid-flow-col max-md:grid-rows-2 items-center gap-3 mb-3 bg-background">
      {/* Select */}
      <Select onValueChange={(value) => setSelectFilter(value)}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Select option" />
        </SelectTrigger>
        <SelectContent>
          {selectOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Input */}
      <div className="max-md:row-span-1 max-md:grid grid-rows-subgrid max-md:col-span-2">
        <Input
          placeholder="Search..."
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* Trash Icon */}
      <div className="flex items-center justify-end gap-5">
        {typeTable === "user_order" &&
          (Edit ? (
            <Check
              onClick={handleEditTable}
              className="w-5 h-5 cursor-pointer"
            />
          ) : (
            <Edit2 onClick={startEdit} className="w-5 h-5 cursor-pointer" />
          ))}
        <Trash2
          onClick={() => {
            if (typeTable === "user_profile") {
              handleDeleteUsers(userIds);
            } else {
              handleDelete();
            }
            if (typeTable === "products") {
              handleDeleteProducts();
            }
          }}
          className="w-5 h-5 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default FilterSearch;
