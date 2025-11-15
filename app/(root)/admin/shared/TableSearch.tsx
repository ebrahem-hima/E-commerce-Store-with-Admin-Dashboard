"use client";

import React from "react";
import TableCheckbox from "@/components/shared/tableCheckbox/TableCheckBox";
import { SelectCheckBox } from "@/types/typeAliases";
import FilterSearch from "./filterSearch";
import { tableBodyType } from "@/types/tabletypes";
import { typeEditValue } from "@/types/adminType";

interface Props {
  Edit?: boolean;
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  setEditValue?: React.Dispatch<React.SetStateAction<typeEditValue[]>>;
  EditValue?: typeEditValue[];
  //
  typeTable: string;
  secondaryTypeTable?: string;
  selectCheckBox: SelectCheckBox[];
  setSelectCheckBox: React.Dispatch<React.SetStateAction<SelectCheckBox[]>>;
  selectOptions: string[];
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  tableData: tableBodyType;
  handleCheckboxChange: (ID: string, checked: boolean) => void;
  headers: { title: string }[];
  Loading: boolean;
  emptyMessage: string;
  setSelectFilter: React.Dispatch<React.SetStateAction<string>>;
  isTableChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const TableSearch = ({
  Edit,
  setEditValue,
  setEdit,
  EditValue,
  //
  typeTable,
  secondaryTypeTable,
  isTableChange,
  selectCheckBox,
  setSelectFilter,
  setSelectCheckBox,
  selectOptions,
  setSearchText,
  tableData,
  handleCheckboxChange,
  headers,
  Loading,
  emptyMessage = "No Data Found",
}: Props) => {
  return (
    <div>
      <FilterSearch
        Edit={Edit}
        setEdit={setEdit}
        EditValue={EditValue}
        selectOptions={selectOptions}
        setSearchText={setSearchText}
        setSelectFilter={setSelectFilter}
        selectCheckBox={selectCheckBox}
        isTableChange={isTableChange}
        typeTable={typeTable}
        secondaryTypeTable={secondaryTypeTable}
        setSelectCheckBox={setSelectCheckBox}
      />

      {Loading ? (
        <div className="flex justify-center mt-8">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <TableCheckbox
          Edit={Edit}
          setEditValue={setEditValue}
          selectCheckBox={selectCheckBox}
          handleCheckboxChange={handleCheckboxChange}
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
