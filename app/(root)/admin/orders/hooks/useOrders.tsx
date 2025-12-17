import { TypeUserOrder } from "@/types/adminTableCheckboxtype";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

interface Props {
  searchText?: string;
  selectFilter?: string;
}

const useOrders = ({ searchText, selectFilter }: Props) => {
  const [orders, setOrders] = useState<TypeUserOrder[]>([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const supabase = createClient();
      try {
        let query = supabase.from("user_order").select();

        if (searchText) {
          query = query.ilike("order_code", `%${searchText}%`);
        }

        switch (selectFilter) {
          case "newest":
            query = query.order("date", { ascending: false });
            break;
          case "oldest":
            query = query.order("date", { ascending: true });
            break;
        }

        const { data, error } = await query;

        if (error) throw error;
        if (!data) return;

        const ordersWithType = data.map((o) => ({
          ...o,
          type: "orderTable" as const,
        }));

        setOrders(ordersWithType);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [searchText, selectFilter]);
  return { orders, setOrders, Loading };
};

export default useOrders;
