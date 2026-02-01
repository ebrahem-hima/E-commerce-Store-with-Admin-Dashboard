import { useState } from "react";
import { useEffect } from "react";
import { getUser } from "@/app/(root)/(auth)/authActions/getUser";
import { createClient } from "@/app/utils/supabase/client";
import { TypeUserOrder } from "@/types/adminTableCheckboxtype";
// import { TypeUserOrder } from "@/types/adminTableCheckboxtype";

const UserOrdersFn = (isUserOrderUpdated: boolean) => {
  const [userOrders, setUserOrders] = useState<TypeUserOrder[]>([]);
  useEffect(() => {
    const getUserOrders = async () => {
      const user = await getUser();
      if (!user) return;
      const supabase = createClient();

      const { data, error } = await supabase
        .from("user_order")
        .select()
        .eq("user_id", user.id);
      if (error) {
        console.log(error);
        return false;
      }
      if (data) {
        const orderData = data.map((item) => ({
          ...item,
          type: "orderTable",
        }));
        setUserOrders(orderData);
      }
    };
    getUserOrders();
  }, [isUserOrderUpdated]);

  return { userOrders };
};

export default UserOrdersFn;
