"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import PriceDisplay from "@/components/shared/priceDisplay";
import { createClient } from "@/utils/supabase/client";

interface OrderItemsType {
  product_id: string;
  name: string;
  img: string;
  price: number;
  discount?: number;
  discount_type?: string;
  count: number;
  options?: {
    optionTitle: string;
    values: string[];
  }[];
}

const Page = () => {
  const params = useParams();
  const { orderId } = params;
  const [products, setProducts] = useState<OrderItemsType[]>([]);
  useEffect(() => {
    const supabase = createClient();

    const getOrderItems = async () => {
      const { data: orderData, error: orderError } = await supabase
        .from("user_order")
        .select("id")
        .eq("order_code", orderId);

      if (orderError) {
        console.log(orderError);
        return false;
      }
      console.log("orderData", orderData);
      const { data, error } = await supabase
        .from("user_ordersItems")
        .select(
          `
            product_id,
            img,
            name,
            price,
            discount,
            discount_type,
            count,
            options
          `
        )
        .eq("order_id", orderData[0].id);
      console.log("data", data);
      if (error) {
        console.log(error);
        return false;
      }
      if (data) setProducts(data);
    };
    getOrderItems();
  }, [orderId]);
  return (
    <div>
      {products.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Options</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((item) => (
              <TableRow key={item.product_id} className="text-medium">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={100}
                      height={100}
                    />
                    <span className="font-medium text-gray-800">
                      {item.name}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <PriceDisplay
                    price={item.price}
                    discount={item.discount}
                    discountType={item.discount_type}
                  />
                </TableCell>

                <TableCell>{item.count}</TableCell>

                <TableCell>
                  <PriceDisplay
                    price={item.price}
                    discount={item.discount}
                    discountType={item.discount_type}
                    count={item.count}
                  />
                </TableCell>
                <TableCell>
                  {item.options &&
                    (item.options?.length > 0 ? (
                      item.options.map((option) => (
                        <div
                          key={option.optionTitle}
                          className="flex items-center gap-1"
                        >
                          <span className="font-medium">
                            {option.optionTitle}:
                          </span>
                          {option.values.map((val) => (
                            <span key={val}>{val}</span>
                          ))}
                        </div>
                      ))
                    ) : (
                      <span className="text-medium">Null</span>
                    ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-gray-500 text-lg mb-4">There is No Products</div>
        </div>
      )}
    </div>
  );
};

export default Page;
