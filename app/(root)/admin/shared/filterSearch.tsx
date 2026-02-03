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
import { useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { handleDeleteUsers } from "../adminFn/handleDeleteUsers";
import { handleDeleteProducts } from "./adminServices/product_service";

import { SelectCheckBox } from "@/types/typeAliases";
import { typeEditValue, selectFilterType } from "@/types/adminType";
import { Dispatch, SetStateAction, TransitionStartFunction } from "react";
import {
  handleDeleteAction,
  handleEditTableHook,
  handleFilter,
  handleSearch,
  startEdit,
} from "./handlers/tableHandlers";
import { tableBodyCheckBoxType } from "@/types/adminTableCheckboxtype";

interface Props {
  selectOptions: selectFilterType[];
  setEdit?: Dispatch<SetStateAction<boolean>>;
  Edit?: boolean;
  typeTable: string;
  selectCheckBox: SelectCheckBox[];
  EditValue?: typeEditValue[];
  setSelectCheckBox?: Dispatch<SetStateAction<SelectCheckBox[]>>;
  isPending: boolean;
  startTransition: TransitionStartFunction;
  setData?: Dispatch<SetStateAction<tableBodyCheckBoxType>>;
  data?: tableBodyCheckBoxType;
}

const FilterSearch = ({
  selectOptions,
  setEdit,
  Edit,
  typeTable,
  selectCheckBox,
  EditValue,
  setSelectCheckBox,
  startTransition,
  isPending,
  setData,
  data,
}: Props) => {
  const searchText = useRef<HTMLInputElement | null>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const userIds = selectCheckBox.map((user) => String(user.ID));

  return (
    <div className="grid grid-cols-[auto_1fr_auto] max-md:grid-flow-col max-md:grid-rows-2 items-center gap-3 max-lg:gap-x-0 mb-3 bg-background">
      {/* Select */}
      <Select
        onValueChange={(value) =>
          handleFilter(value, searchParams, pathname, replace, startTransition)
        }
      >
        <SelectTrigger className="w-37.5">
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
      <form
        onSubmit={(e) =>
          handleSearch(
            e,
            searchText.current,
            searchParams,
            pathname,
            replace,
            startTransition,
          )
        }
        className="flex items-center gap-2 max-md:row-span-1 max-md:grid grid-rows-subgrid max-md:col-span-2"
      >
        <Input placeholder="Search..." ref={searchText} disabled={isPending} />
      </form>

      {/* Trash & Edit Icons */}
      <div className="flex items-center justify-end gap-5">
        {typeTable === "user_order" &&
          (Edit ? (
            <Check
              onClick={() =>
                handleEditTableHook({
                  data,
                  EditValue: EditValue || [],
                  typeTable,
                  setData,
                  setEdit,
                  setSelectCheckBox,
                })
              }
              className="w-5 h-5 cursor-pointer"
            />
          ) : (
            <Edit2
              onClick={() => startEdit(selectCheckBox, setEdit)}
              className="w-5 h-5 cursor-pointer"
            />
          ))}

        <Trash2
          onClick={() => {
            if (typeTable === "user_profile") handleDeleteUsers(userIds);
            else if (typeTable === "products")
              handleDeleteProducts(selectCheckBox);
            else
              handleDeleteAction({
                typeTable,
                selectCheckBox,
                setData,
                setSelectCheckBox,
              });
          }}
          className="w-5 h-5 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default FilterSearch;
