"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

type orderType = {
  totalOrders: number;
  orderCount: number;
};

const useDashboardFn = () => {
  const [orders, setOrders] = useState<orderType>({
    totalOrders: 0,
    orderCount: 0,
  });
  const [Loading, setLoading] = useState(true);
  const [customersCount, setCustomersCount] = useState(0);
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const supabase = createClient();
      try {
        const { data, error } = await supabase.from("user_order").select();

        if (error) throw error;
        if (!data) return;

        setOrders({
          orderCount: data.length || 0,
          totalOrders: data.reduce((acc, o) => acc + o.total, 0),
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
  }, []);
  return {
    OrderCount: orders.orderCount,
    OrderTotal: orders.totalOrders,
    customersCount,
    Loading,
  };
};

export default useDashboardFn;
