"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

type CustomerType = {
  img: string;
  name: string;
  location: string;
  orders: number;
  totalSpent: number;
};

interface Props {
  isCustomerChange?: boolean;
  searchText?: string;
  selectFilter?: string;
}

const useCustomerFn = ({
  isCustomerChange,
  searchText,
  selectFilter,
}: Props) => {
  const [customer, setCustomer] = useState<CustomerType[]>([]);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const supabase = createClient();
      try {
        let data;
        if (searchText) {
          const res = await supabase
            .from("user_profile")
            .select("*")
            .ilike("first_name", `%${searchText}%`);
          data = res.data || [];
        } else {
          const res = await supabase
            .from("user_profile")
            .select("*", { count: "exact" })
            .order("created_at", {
              ascending: selectFilter === "Oldest" ? true : false,
            });
          data = res.data || [];
        }

        const ordersWithType = data.map((o) => ({
          ...o,
          type: "customerTable" as const,
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
  }, [isCustomerChange, searchText, selectFilter]);
  return {
    Loading,
    customer,
  };
};

export default useCustomerFn;
