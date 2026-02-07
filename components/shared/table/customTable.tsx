import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { tableType } from "../../../types/tabletypes";
import TableBodyData from "./TableBodyData";

const CustomTable = ({ dataBody, titles, role, empty_table }: tableType) => {
  if (!dataBody)
    return (
      <p className="text-gray-500 text-sm mt-2">There is not Data to display</p>
    );
  return (
    <>
      {dataBody.length > 0 ? (
        <Table className="min-w-115">
          <TableHeader>
            <TableRow>
              {titles &&
                titles.map((title, idx) => (
                  <TableHead key={idx}>{title.title}</TableHead>
                ))}
            </TableRow>
          </TableHeader>
          <TableBodyData role={role} dataBody={dataBody} />
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <span className="text-gray-500 text-lg mb-4">{empty_table}</span>
        </div>
      )}
    </>
  );
};

export default CustomTable;
