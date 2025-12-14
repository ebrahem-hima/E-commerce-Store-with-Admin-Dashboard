import React from "react";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TableBodyCheckbox from "./TableBodyCheckbox";
import { Checkbox } from "@/components/ui/checkbox";
import { SelectCheckBox } from "@/types/typeAliases";
import { typeEditValue } from "@/types/adminType";
import { tableBodyCheckBoxType } from "@/types/adminTableCheckboxtype";

export interface Props<T extends { id: string }> {
  Edit?: boolean;
  setEditValue?: React.Dispatch<React.SetStateAction<typeEditValue[]>>;
  dataBody: T[];
  titles: { title: string }[];
  emptyMessage: string;
  selectCheckBox: SelectCheckBox[];
  setSelectCheckBox: React.Dispatch<React.SetStateAction<SelectCheckBox[]>>;
  tableWidth?: string;
}

const TableCheckbox = <T extends { id: string }>({
  dataBody,
  titles,
  emptyMessage,
  selectCheckBox,
  setSelectCheckBox,
  Edit,
  setEditValue,
  tableWidth,
}: Props<T>) => {
  const handleCheckboxChange = (ID: string, checked: boolean) => {
    setSelectCheckBox((prev) =>
      prev.some((check) => check.ID === ID)
        ? prev.filter((check) => check.ID !== ID)
        : [
            ...prev,
            {
              ID,
              value: checked,
            },
          ]
    );
  };
  return (
    <>
      {dataBody.length > 0 ? (
        <Table className={`${tableWidth} bg-white rounded-md`}>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox
                  checked={selectCheckBox.length === dataBody.length}
                  onCheckedChange={(checked) =>
                    setSelectCheckBox(() =>
                      checked
                        ? dataBody.map((check) => ({
                            ID: check.id,
                            value: true,
                          }))
                        : []
                    )
                  }
                />
              </TableHead>
              {titles &&
                titles.map((title, idx) => (
                  <TableHead key={idx}>{title.title}</TableHead>
                ))}
            </TableRow>
          </TableHeader>
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
    </>
  );
};

export default TableCheckbox;
