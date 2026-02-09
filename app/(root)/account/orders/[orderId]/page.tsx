"use client";

import { useParams } from "next/navigation";
import GetOrderDetails from "@/app/FetchData/getOrderDetails";
import CustomTable from "@/components/shared/table/customTable";
import { titleOrderDetails } from "@/constant/table";
import LoadingSpinner from "@/components/Loaders/LoadingSpinner";

const Page = () => {
  const params = useParams<{ orderId: string }>();
  const { orderId } = params;
  const { Loading, products } = GetOrderDetails(orderId);
  return (
    <div>
      <h2 className="text-primary font-bold text-xl mb-2">Order Details</h2>
      {Loading ? (
        <LoadingSpinner />
      ) : (
        <CustomTable
          empty_table="There are no order details to display."
          dataBody={products}
          titles={titleOrderDetails}
        />
      )}
    </div>
  );
};

export default Page;
