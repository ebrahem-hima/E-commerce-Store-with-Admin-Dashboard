import TableSearch from "../shared/TableSearch";
import {
  orderSortOptions,
  orderTableColumns,
} from "@/constant/admin/admin-tables/order_table";
import { getOrders } from "./orderService";

const OrderTable = async ({
  getSearchParams,
}: {
  getSearchParams: { search: string; filter: string };
}) => {
  const data = await getOrders(getSearchParams);
  return (
    <>
      <TableSearch
        tableWidth="min-w-[630px]"
        typeTable="user_order"
        selectOptions={orderSortOptions}
        tableData={data || []}
        headers={orderTableColumns}
        emptyMessage="There are no orders to display"
      />
    </>
  );
};

export default OrderTable;
