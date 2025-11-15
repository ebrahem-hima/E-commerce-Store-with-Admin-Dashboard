import { useEffect } from "react";
import { typeUserOrder } from "@/types/productTypes";
import { createClient } from "@/utils/supabase/client";

type orderType = {
  totalOrders: number;
  orderCount: number;
  orderDetails: typeUserOrder[];
};

export default function OrdersRealtime({
  setOrders,
}: {
  setOrders: React.Dispatch<React.SetStateAction<orderType>>;
}) {
  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel("orders-changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "user_order",
        },
        (payload) => {
          setOrders((prev) => ({
            ...prev,
            orderDetails: prev.orderDetails.map((item) =>
              item.id === payload.new.id
                ? { ...item, order_status: payload.new.order_status }
                : item
            ),
          }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [setOrders]);

  return null;
}
