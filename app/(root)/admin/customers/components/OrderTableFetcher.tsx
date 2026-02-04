import CustomTable from "@/components/shared/table/customTable";
import { titleOrderDetails } from "@/constant/table";
import { getOrderDetails } from "../services/getOrderDetails";

const OrderTableFetcher = async ({ orderId }: { orderId: string }) => {
  const { products } = await getOrderDetails(orderId);

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-gray-500 text-lg mb-4">There is No Products</div>
      </div>
    );
  }

  return (
    <CustomTable
      empty_table="There are no order details to display."
      role="admin"
      dataBody={products}
      titles={titleOrderDetails}
    />
  );
};

export default OrderTableFetcher;
