"use client";

import { useEffect, useState } from "react";
import { useProductContext } from "@/context/productContext";
import { typeUserOrder } from "@/types/productTypes";
import CustomTable from "@/components/shared/table/customTable";

const Page = () => {
  const { userOrders } = useProductContext();
  const [userOrder, setUserOrder] = useState<typeUserOrder[]>([]);

  const titles = [
    { title: "Order_Code" },
    { title: "Status" },
    { title: "Total" },
    { title: "Date" },
  ];

  useEffect(() => {
    setUserOrder(userOrders);
  }, [userOrders]);

  return (
    <div className="h-[450px] overflow-y-auto">
      <CustomTable dataBody={userOrder || []} titles={titles} />
    </div>
  );
};

export default Page;
