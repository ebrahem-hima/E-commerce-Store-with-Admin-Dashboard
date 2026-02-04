import CustomerHeaderOrders from "./CustomerHeaderOrders";
import CustomerOverview from "./CustomerOverview";
import CustomerPage from "../services/CustomerPage";

const CustomerContent = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id: customerId } = await params;
  if (!customerId) return <p>Customer Not Found</p>;

  const { Orders, customer } = await CustomerPage(customerId);
  const titles = [
    { title: "Order_Code" },
    { title: "Status" },
    { title: "Total" },
    { title: "Date" },
  ];
  return (
    <>
      <CustomerHeaderOrders
        customer={customer}
        Orders={Orders}
        titles={titles}
      />
      <CustomerOverview customer={customer} />
    </>
  );
};

export default CustomerContent;
