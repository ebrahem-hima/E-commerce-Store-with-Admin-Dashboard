import { TypeUserOrder } from "@/types/adminTableCheckboxtype";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";

interface CustomerUI {
  id: string;
  name: string;
  country: string;
  memberSince: string;
  address1: string;
  address2?: string;
  email: string;
  phone: string;
}

export function useCustomerData(customerId: string) {
  const [customer, setCustomer] = useState<CustomerUI | null>(null);
  const [Orders, setOrders] = useState<TypeUserOrder[] | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const supabase = createClient();
    async function fetchCustomer() {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("user_profile")
          .select()
          .eq("id", customerId)
          .single();

        if (error) throw error;

        if (data) {
          const formattedData: CustomerUI = {
            id: data.id,
            name: data.first_name + " " + data.last_name || "Unknown Name",
            country: data.country || "Unknown",
            memberSince: data.created_at,
            address1: data.address1 || "",
            address2: data.address2 || "",
            email: data.email || "",
            phone: data.phone || "",
          };

          setCustomer(formattedData);
        }
      } catch (err) {
        console.error("Error fetching customer:", err);
        return;
      } finally {
        setLoading(false);
      }
    }

    async function fetchOrders() {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("user_order")
          .select()
          .eq("user_id", customerId);

        if (error) throw error;

        if (data) {
          const orderData = data.map((item) => ({
            ...item,
            type: "orderTable",
          }));
          setOrders(orderData);
        }
      } catch (err) {
        console.error("Error fetching customer:", err);
      } finally {
        setLoading(false);
      }
    }

    if (customerId) {
      fetchCustomer();
      fetchOrders();
    }
  }, [customerId]);

  // Return the state
  return { customer, loading, Orders };
}
