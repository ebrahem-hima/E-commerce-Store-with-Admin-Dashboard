import { FormEvent, TransitionStartFunction } from "react";

import { toast } from "sonner";
import { SelectCheckBox } from "@/types/typeAliases";
import { deleteItemsService } from "../adminServices/shared_service";
import { EditValue, handleEditTable } from "../adminServices/order_service";
import {
  tableBodyCheckBoxType,
  TypeUserOrder,
} from "@/types/adminTableCheckboxtype";

// Types
interface sharedTypes {
  typeTable: string;
  setData?: React.Dispatch<React.SetStateAction<tableBodyCheckBoxType>>;
  setSelectCheckBox?: React.Dispatch<React.SetStateAction<SelectCheckBox[]>>;
}
export interface DeleteTableOptions extends sharedTypes {
  selectCheckBox: SelectCheckBox[];
}

export interface EditTableOptions extends sharedTypes {
  EditValue: EditValue[];
  data?: tableBodyCheckBoxType;
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>;
}

// Function: Delete
export const handleDeleteAction = async ({
  typeTable,
  selectCheckBox,
  setData,
  setSelectCheckBox,
}: DeleteTableOptions) => {
  const ids = selectCheckBox.map((item) => item.ID);
  if (!ids.length) return;
  setData?.(
    (prev) =>
      prev.filter(
        (data) => !ids.some((id) => data.id === id),
      ) as tableBodyCheckBoxType,
  );
  setSelectCheckBox?.([]);
  try {
    // Server Call
    await deleteItemsService({
      typeTable,
      ids,
    });
    toast.success("Successfully deleted");
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const handleFilter = (
  term: string,
  searchParams: URLSearchParams,
  pathname: string,
  replace: (url: string, options?: { scroll?: boolean }) => void,
  startTransition: TransitionStartFunction,
) => {
  const params = new URLSearchParams(searchParams);
  if (term) params.set("filter", term);
  else params.delete("filter");

  startTransition(() => {
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  });
};

export const handleSearch = (
  e: FormEvent,
  searchText: HTMLInputElement | null,
  searchParams: URLSearchParams,
  pathname: string,
  replace: (url: string, options?: { scroll?: boolean }) => void,
  startTransition: TransitionStartFunction,
) => {
  e.preventDefault();
  const params = new URLSearchParams(searchParams);
  if (searchText && searchText.value !== "")
    params.set("search", searchText.value);
  else params.delete("search");

  startTransition(() => {
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  });
};

// Function: Edit table orders
export const handleEditTableHook = async ({
  typeTable,
  EditValue,
  setData,
  setEdit,
  setSelectCheckBox,
  data,
}: EditTableOptions) => {
  if (!EditValue || EditValue.length === 0 || !data) return;
  const previousData = [...data];
  if (typeTable === "user_order") {
    setData?.((prev) => {
      const prevOrders = prev as unknown as TypeUserOrder[];
      const updatedOrders = prevOrders.map((item) => {
        const found = EditValue.find((val) => val.ID === item.id);
        return found ? { ...item, order_status: found.status } : item;
      });
      return updatedOrders as unknown as TypeUserOrder[];
    });
  }
  setEdit?.(false);
  setSelectCheckBox?.([]);
  try {
    // Server Call
    await handleEditTable(EditValue);
    toast.success("Orders has been updated");
  } catch (err) {
    console.log("Unexpected error:", err);
    setData?.(previousData as TypeUserOrder[]);
    return false;
  }
};

// Function: Start edit mode
export const startEdit = (
  selectCheckBox: { ID: string | number }[],
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  if (!selectCheckBox.length) return toast.info("Please Choose Orders");
  setEdit?.(true);
};
