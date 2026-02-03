"use client";

import { useEffect, useState, useTransition } from "react";
import TableCheckbox from "@/components/shared/tableCheckbox/TableCheckBox";
import FilterSearch from "./filterSearch";
import { selectFilterType, typeEditValue } from "@/types/adminType";
import { SelectCheckBox } from "@/types/typeAliases";
import { tableBodyCheckBoxType } from "@/types/adminTableCheckboxtype";

interface Props {
  typeTable: string;
  selectOptions: selectFilterType[];
  tableData: tableBodyCheckBoxType;
  headers: { title: string }[];
  emptyMessage: string;
  tableWidth?: string;
}

const TableSearch = ({
  tableWidth,
  typeTable,
  selectOptions,
  tableData,
  headers,
  emptyMessage = "No Data Found",
}: Props) => {
  const [data, setData] = useState<tableBodyCheckBoxType>(tableData);
  // to sync data when update
  useEffect(() => {
    setData(tableData);
  }, [tableData]);
  const [Edit, setEdit] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [EditValue, setEditValue] = useState<typeEditValue[]>([]);
  const [selectCheckBox, setSelectCheckBox] = useState<SelectCheckBox[]>([]);
  return (
    <div>
      <FilterSearch
        data={data}
        Edit={Edit}
        setData={setData}
        setEdit={setEdit}
        typeTable={typeTable}
        EditValue={EditValue}
        isPending={isPending}
        selectOptions={selectOptions}
        selectCheckBox={selectCheckBox}
        startTransition={startTransition}
        setSelectCheckBox={setSelectCheckBox}
      />

      <TableCheckbox
        Edit={Edit}
        isPending={isPending}
        setEditValue={setEditValue}
        selectCheckBox={selectCheckBox}
        tableWidth={tableWidth}
        titles={headers}
        dataBody={data}
        setSelectCheckBox={setSelectCheckBox}
        emptyMessage={emptyMessage}
      />
    </div>
  );
};

export default TableSearch;
