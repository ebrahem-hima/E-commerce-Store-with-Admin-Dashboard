import { useState } from "react";
import { supabase } from "@/supabase-client";
import { useEffect } from "react";
import { userOrdersType } from "../../types/fetchType";

const UserOrdersFn = (isUserOrderUpdated: boolean) => {
  const [userOrders, setUserOrders] = useState<userOrdersType[]>([]);
  useEffect(() => {
    const getUserOrders = async () => {
      const { data, error } = await supabase.from("user_orders").select();
      if (error) {
        console.log(error);
        return false;
      }
      if (data) setUserOrders(data);
    };
    getUserOrders();
  }, [isUserOrderUpdated]);

  return { userOrders };
};

export default UserOrdersFn;
