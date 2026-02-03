"use client";

import HeaderSaveActions from "@/app/(root)/admin/shared/HeaderSaveActions";
import GetOrderDetails from "@/components/FetchData/getOrderDetails";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import CustomTable from "@/components/shared/table/customTable";
import { titleOrderDetails } from "@/constant/table";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams<{ orderId: string }>();
  const { orderId } = params;
  const { Loading, products } = GetOrderDetails(orderId);

  return (
    <div>
      <HeaderSaveActions
        title="Order Details"
        link={`/admin/orders`}
        hideSave={true}
      />
      {Loading ? (
        <LoadingSpinner />
      ) : products.length > 0 ? (
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
    </div>
  );
};

export default Page;
