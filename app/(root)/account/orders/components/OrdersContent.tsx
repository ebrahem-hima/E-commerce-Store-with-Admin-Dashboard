import CustomTable from "@/components/shared/table/customTable";
import { getUserOrders } from "../fetch/fetchUserOrders";

const OrdersContent = async () => {
  const orderData = await getUserOrders();
  const titles = [
    { title: "Order_Code" },
    { title: "Status" },
    { title: "Total" },
    { title: "Date" },
  ];

  return (
    <>
      <CustomTable
        empty_table="No orders have been placed yet."
        dataBody={orderData || []}
        titles={titles}
      />
    </>
  );
};

export default OrdersContent;
