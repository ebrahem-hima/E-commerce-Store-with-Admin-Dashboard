import React from "react";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { tableBodyType } from "../../../types/tabletypes";
import TableBodyCheckbox from "./TableBodyCheckbox";
import { Checkbox } from "@/components/ui/checkbox";
import { SelectCheckBox } from "@/types/typeAliases";
import { typeEditValue } from "@/types/adminType";

export interface Props {
  Edit?: boolean;
  setEditValue?: React.Dispatch<React.SetStateAction<typeEditValue[]>>;
  dataBody: tableBodyType;
  titles: { title: string }[];
  emptyMessage: string;
  handleCheckboxChange: (ID: string, checked: boolean) => void;
  selectCheckBox: SelectCheckBox[];
  setSelectCheckBox: React.Dispatch<React.SetStateAction<SelectCheckBox[]>>;
}

const TableCheckbox = ({
  dataBody,
  titles,
  emptyMessage,
  selectCheckBox,
  setSelectCheckBox,
  handleCheckboxChange,
  Edit,
  setEditValue,
}: Props) => {
  console.log("selectCheckBox", selectCheckBox);
  return (
    <>
      {dataBody.length > 0 ? (
        <Table className="bg-white rounded-md">
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
            dataBody={dataBody}
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
