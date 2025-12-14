"use client";

import { Dispatch, SetStateAction } from "react";
import TableCheckbox from "@/components/shared/tableCheckbox/TableCheckBox";
import { SelectCheckBox } from "@/types/typeAliases";
import FilterSearch from "./filterSearch";
import { selectFilterType, typeEditValue } from "@/types/adminType";

interface Props<T> {
  Edit?: boolean;
  setEdit?: Dispatch<SetStateAction<boolean>>;
  setEditValue?: Dispatch<SetStateAction<typeEditValue[]>>;
  EditValue?: typeEditValue[];
  //
  typeTable: string;
  selectCheckBox: SelectCheckBox[];
  setSelectCheckBox: Dispatch<SetStateAction<SelectCheckBox[]>>;
  selectOptions: selectFilterType[];
  setSearchText: Dispatch<SetStateAction<string>>;
  tableData: T[];
  headers: { title: string }[];
  Loading: boolean;
  emptyMessage: string;
  setSelectFilter: Dispatch<SetStateAction<string>>;
  tableWidth?: string;
}

const TableSearch = <T extends { id: string }>({
  Edit,
  setEditValue,
  setEdit,
  EditValue,
  //
  tableWidth,
  typeTable,
  selectCheckBox,
  setSelectFilter,
  setSelectCheckBox,
  selectOptions,
  setSearchText,
  tableData,
  headers,
  Loading,
  emptyMessage = "No Data Found",
}: Props<T>) => {
  return (
    <div>
      <FilterSearch
        Edit={Edit}
        setEdit={setEdit}
        typeTable={typeTable}
        EditValue={EditValue}
        selectOptions={selectOptions}
        setSearchText={setSearchText}
        setSelectFilter={setSelectFilter}
        selectCheckBox={selectCheckBox}
        setSelectCheckBox={setSelectCheckBox}
      />

      {Loading ? (
        <div className="flex justify-center mt-8">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : (
        <TableCheckbox<T>
          Edit={Edit}
          setEditValue={setEditValue}
          selectCheckBox={selectCheckBox}
          tableWidth={tableWidth}
          titles={headers}
          dataBody={tableData}
          setSelectCheckBox={setSelectCheckBox}
          emptyMessage={emptyMessage}
        />
      )}
    </div>
  );
};

export default TableSearch;
