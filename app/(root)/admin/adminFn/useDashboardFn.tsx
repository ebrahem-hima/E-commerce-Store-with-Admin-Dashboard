"use client";

import { typeUserOrder } from "@/types/productTypes";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

type orderType = {
  totalOrders: number;
  orderCount: number;
  orderDetails: typeUserOrder[];
};

interface Props {
  isOrderChange?: boolean;
  searchText?: string;
  selectFilter?: string;
}

const useDashboardFn = ({ isOrderChange, searchText, selectFilter }: Props) => {
  const [orders, setOrders] = useState<orderType>({
    totalOrders: 0,
    orderCount: 0,
    orderDetails: [],
  });
  const [Loading, setLoading] = useState(true);
  const [customersCount, setCustomersCount] = useState(0);
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const supabase = createClient();
      try {
        let data, count;
        if (searchText) {
          const res = await supabase
            .from("user_order")
            .select("*")
            .ilike("order_code", `%${searchText}%`);
          data = res.data || [];
          count = data.length;
        } else {
          const res = await supabase
            .from("user_order")
            .select("*", { count: "exact" })
            .order("date", {
              ascending: selectFilter === "Oldest" ? true : false,
            });
          data = res.data || [];
          count = res.count || 0;
        }

        const ordersWithType = data.map((o) => ({
          ...o,
          type: "orderTable" as const,
        }));

        setOrders({
          orderCount: count || 0,
          totalOrders: data.reduce((acc, o) => acc + o.total, 0),
          orderDetails: ordersWithType,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchOrders, 500);

    const getCustomers = async () => {
      const supabase = createClient();

      const { count, error: customerError } = await supabase
        .from("user_profile")
        .select("*", { count: "exact", head: true });
      if (customerError) {
        console.log(customerError);
        return;
      }
      setCustomersCount(count || 0);
    };
    getCustomers();
    return () => clearTimeout(debounceTimeout);
  }, [isOrderChange, searchText, selectFilter]);
  return {
    OrderCount: orders.orderCount,
    OrderTotal: orders.totalOrders,
    OrderDetails: orders.orderDetails,
    customersCount,
    Loading,
    setOrders,
  };
};

export default useDashboardFn;
