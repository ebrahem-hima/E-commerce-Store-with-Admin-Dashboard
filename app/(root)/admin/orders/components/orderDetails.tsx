import CustomTable from "@/components/shared/table/customTable";
import { titleOrderDetails } from "@/constant/table";
import fetchOrderDetails from "../fetchOrderDetails";

const OrderDetails = async ({ orderId }: { orderId: string }) => {
  const products = await fetchOrderDetails(orderId);
  return (
    <>
      {products.length > 0 ? (
        <CustomTable
          empty_table="There are no order details to display."
          role="admin"
          dataBody={products}
          titles={titleOrderDetails}
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-gray-500 text-lg mb-4">There is No Products</div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
