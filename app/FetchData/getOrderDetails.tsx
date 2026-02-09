import { OrderDetailsType } from "@/types/productTypes";
import { createClient } from "@/app/utils/supabase/client";
import { useEffect, useState } from "react";

const GetOrderDetails = (orderId: string) => {
  const [products, setProducts] = useState<OrderDetailsType[]>([]);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    const supabase = createClient();

    const getOrderItems = async () => {
      try {
        setLoading(true);
        const { data: orderData, error: orderError } = await supabase
          .from("user_order")
          .select("id")
          .eq("order_code", orderId);

        if (orderError) throw orderData;
        const { data, error } = await supabase
          .from("order_details")
          .select(
            `
              id,
              product_id,
              img,
              name,
              price,
              discount,
              discount_type,
              quantity,
              options
            `,
          )
          .eq("order_id", orderData[0].id);
        if (error) {
          console.log(error);
          return false;
        }
        if (data) {
          const getOrderDetails = data.map((item) => ({
            ...item,
            type: "orderDetails",
          }));
          setProducts(getOrderDetails);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getOrderItems();
  }, [orderId]);
  return { products, Loading };
};

export default GetOrderDetails;
