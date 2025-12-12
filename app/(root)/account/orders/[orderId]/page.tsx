"use client";

import { useParams } from "next/navigation";
import GetOrderDetails from "@/components/FetchData/getOrderDetails";
import CustomTable from "@/components/shared/table/customTable";
import { titleOrderDetails } from "@/constant/table";

const Page = () => {
  const params = useParams<{ orderId: string }>();
  const { orderId } = params;
  const { Loading, products } = GetOrderDetails(orderId);

  return (
    <div>
      {Loading ? (
        "Loading..."
      ) : products.length > 0 ? (
        <CustomTable dataBody={products} titles={titleOrderDetails} />
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-gray-500 text-lg mb-4">There is No Products</div>
        </div>
      )}
    </div>
  );
};

export default Page;
