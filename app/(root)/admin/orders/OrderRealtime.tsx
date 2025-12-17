import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { TypeUserOrder } from "@/types/adminTableCheckboxtype";

export default function OrdersRealtime({
  setOrders,
}: {
  setOrders: React.Dispatch<React.SetStateAction<TypeUserOrder[]>>;
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
          setOrders((prev) =>
            prev.map((item) =>
              item.id === payload.new.id
                ? { ...item, order_status: payload.new.order_status }
                : item
            )
          );
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "user_order",
        },
        (payload) => {
          setOrders((prev) =>
            prev.filter((order) => order.id !== payload.old.id)
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [setOrders]);

  return null;
}
