import PageHeader from "../shared/PageHeader";
import { Suspense } from "react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import TableSearch from "../shared/TableSearch";
import { getOrders } from "./orderService";
import {
  orderSortOptions,
  orderTableColumns,
} from "@/constant/admin/admin-tables/order_table";

interface Props {
  searchParams: {
    filter: string;
    search: string;
  };
}

const Page = async ({ searchParams }: Props) => {
  const getSearchParams = await searchParams;
  const data = await getOrders(getSearchParams);
  return (
    <>
      <PageHeader title="Orders" />
      <Suspense fallback={<LoadingSpinner />}>
        <TableSearch
          tableWidth="min-w-[630px]"
          typeTable="user_order"
          selectOptions={orderSortOptions}
          tableData={data || []}
          headers={orderTableColumns}
          emptyMessage="There are no orders to display"
        />
      </Suspense>
    </>
  );
};

export default Page;
