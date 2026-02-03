import { Checkbox } from "@/components/ui/checkbox";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { tableBodyCheckBoxType } from "@/types/adminTableCheckboxtype";
import { SelectCheckBox } from "@/types/typeAliases";

export interface Props {
  dataBody: tableBodyCheckBoxType;
  titles: { title: string }[];
  selectCheckBox: SelectCheckBox[];
  setSelectCheckBox: React.Dispatch<React.SetStateAction<SelectCheckBox[]>>;
}
const TableHeadCheckbox = ({
  titles,
  selectCheckBox,
  dataBody,
  setSelectCheckBox,
}: Props) => {
  return (
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
                  : [],
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
  );
};

export default TableHeadCheckbox;
