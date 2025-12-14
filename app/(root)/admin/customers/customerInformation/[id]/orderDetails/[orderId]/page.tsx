"use client";

import HeaderSaveActions from "@/app/(root)/admin/shared/HeaderSaveActions";
import GetOrderDetails from "@/components/FetchData/getOrderDetails";
import CustomTable from "@/components/shared/table/customTable";
import { Skeleton } from "@/components/ui/skeleton";
import { titleOrderDetails } from "@/constant/table";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams<{ orderId: string }>();
  const paramId = useParams<{ id: string }>();
  const { id } = paramId;
  const { orderId } = params;
  const { Loading, products } = GetOrderDetails(orderId);

  return (
    <div>
      <HeaderSaveActions
        title="Order Details"
        link={`/admin/customers/customerInformation/${id}`}
        hideSave={true}
      />
      {Loading ? (
        <Skeleton className="h-60 w-full rounded-md" />
      ) : products.length > 0 ? (
        <CustomTable
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
