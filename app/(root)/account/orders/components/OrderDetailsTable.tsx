import { getOrderDetails } from "@/app/(root)/admin/customers/services/getOrderDetails";
import CustomTable from "@/components/shared/table/customTable";
import { titleOrderDetails } from "@/constant/table";

const OrderDetailsTable = async ({ orderId }: { orderId: string }) => {
  const { products } = await getOrderDetails(orderId);
  return (
    <>
      <CustomTable
        empty_table="There are no order details to display."
        dataBody={products}
        titles={titleOrderDetails}
      />
    </>
  );
};

export default OrderDetailsTable;
