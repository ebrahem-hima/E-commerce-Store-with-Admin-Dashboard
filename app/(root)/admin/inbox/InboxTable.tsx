import TableSearch from "../shared/TableSearch";
import {
  inboxSortOptions,
  inboxTableColumns,
} from "@/constant/admin/admin-tables/inbox_table";
import { getInboxServer } from "./services/InboxService";

const InboxTable = async ({
  searchParams,
}: {
  searchParams: { search: string; filter: string };
}) => {
  const data = await getInboxServer({ searchParams });
  return (
    <>
      <TableSearch
        selectOptions={inboxSortOptions}
        typeTable="inbox"
        tableData={data}
        headers={inboxTableColumns}
        emptyMessage="There are no Messages to display"
      />
    </>
  );
};

export default InboxTable;
