import React from "react";
import { Table } from "@/components/ui/table";
import TableBodyCheckbox from "./TableBodyCheckbox";
import { SelectCheckBox } from "@/types/typeAliases";
import { typeEditValue } from "@/types/adminType";
import { tableBodyCheckBoxType } from "@/types/adminTableCheckboxtype";
import LoadingPage from "../LoadingPage";
import TableHeadCheckbox from "./TableHeadCheckbox";

export interface Props {
  Edit?: boolean;
  setEditValue?: React.Dispatch<React.SetStateAction<typeEditValue[]>>;
  dataBody: tableBodyCheckBoxType;
  titles: { title: string }[];
  emptyMessage: string;
  selectCheckBox: SelectCheckBox[];
  setSelectCheckBox: React.Dispatch<React.SetStateAction<SelectCheckBox[]>>;
  tableWidth?: string;
  isPending: boolean;
}

const TableCheckbox = ({
  dataBody,
  titles,
  emptyMessage,
  selectCheckBox,
  setSelectCheckBox,
  Edit,
  setEditValue,
  tableWidth,
  isPending,
}: Props) => {
  const handleCheckboxChange = (ID: string | number, checked: boolean) => {
    setSelectCheckBox((prev) =>
      prev.some((check) => check.ID === ID)
        ? prev.filter((check) => check.ID !== ID)
        : [
            ...prev,
            {
              ID,
              value: checked,
            },
          ],
    );
  };

  return (
    <div className="relative">
      {isPending && <LoadingPage />}
      {dataBody.length > 0 ? (
        <Table className={`${tableWidth} bg-white rounded-md`}>
          <TableHeadCheckbox
            titles={titles}
            selectCheckBox={selectCheckBox}
            dataBody={dataBody}
            setSelectCheckBox={setSelectCheckBox}
          />
          <TableBodyCheckbox
            setEditValue={setEditValue}
            Edit={Edit}
            selectCheckBox={selectCheckBox}
            handleCheckboxChange={handleCheckboxChange}
            dataBody={dataBody as unknown as tableBodyCheckBoxType}
          />
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-gray-500 text-lg mb-4">{emptyMessage}</div>
        </div>
      )}
    </div>
  );
};

export default TableCheckbox;
