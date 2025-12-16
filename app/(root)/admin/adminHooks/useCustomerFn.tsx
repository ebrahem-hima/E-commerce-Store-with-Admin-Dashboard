"use client";

import { CustomerTableType } from "@/types/adminTableCheckboxtype";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

interface Props {
  isCustomerChange?: boolean;
  searchText?: string;
  selectFilter?: string;
}

const useCustomerFn = ({ searchText, selectFilter }: Props) => {
  const [customer, setCustomer] = useState<CustomerTableType[]>([]);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const supabase = createClient();
      try {
        let query = supabase
          .from("user_profile")
          .select(`id,first_name,last_name,email, user_order(total)`);
        if (searchText) {
          query = query.ilike("first_name", `%${searchText}%`);
        }
        if (selectFilter) {
          query = query.order("created_at", {
            ascending: selectFilter === "Oldest" ? true : false,
          });
        }
        const { data: profileData, error: profileError } = await query;
        if (profileError) throw profileError;

        const ordersWithType = profileData?.map((o) => ({
          id: o.id,
          email: o.email,
          type: "customerTable" as const,
          name: o.first_name + " " + o.last_name,
          order_count: o.user_order.length,
          total_spent:
            o.user_order.length > 0
              ? o.user_order.reduce((acc, curr) => acc + curr.total, 0)
              : 0,
        }));

        setCustomer(ordersWithType);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    const debounceTimeout = setTimeout(fetchOrders, 500);

    return () => clearTimeout(debounceTimeout);
  }, [searchText, selectFilter]);
  return {
    Loading,
    customer,
    setCustomer,
  };
};

export default useCustomerFn;
