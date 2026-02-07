import React from "react";
import TableSearch from "../../shared/TableSearch";
import { getCustomers } from "../services/customerService";
import {
  customerSortOptions,
  customerTableColumns,
} from "@/constant/admin/admin-tables/customer_table";

const CustomerTable = async ({
  getSearchParams,
}: {
  getSearchParams: { search: string; filter: string };
}) => {
  const customer = await getCustomers(getSearchParams);

  return (
    <>
      <TableSearch
        tableWidth="min-w-[600px]"
        typeTable="user_profile"
        selectOptions={customerSortOptions}
        tableData={customer}
        headers={customerTableColumns}
        emptyMessage="There are no orders to display"
      />
    </>
  );
};

export default CustomerTable;
