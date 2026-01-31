"use client";

import { useEffect, useState } from "react";
import { useProductContext } from "@/context/productContext";
import CustomTable from "@/components/shared/table/customTable";
import { TypeUserOrder } from "@/types/adminTableCheckboxtype";

const Page = () => {
  const { userOrders } = useProductContext();
  const [userOrder, setUserOrder] = useState<TypeUserOrder[]>([]);

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
    <div className="h-122.5 overflow-y-auto">
      <h2 className="text-primary font-bold text-xl mb-2">Your Orders</h2>
      <CustomTable
        empty_table="No orders have been placed yet."
        dataBody={userOrder || []}
        titles={titles}
      />
    </div>
  );
};

export default Page;
