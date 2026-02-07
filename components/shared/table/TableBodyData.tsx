"use client";

import { TableBody, TableCell, TableRow } from "@/components/ui/table";

import { TypeUserOrder } from "@/types/adminTableCheckboxtype";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PriceDisplay from "../priceDisplay";
import {
  tableBodyType,
  TopMemberType,
  TopProductType,
  typeOrderDetailsTable,
} from "@/types/adminTabletypes";

interface Prop {
  dataBody: tableBodyType;
  role?: "user" | "admin";
}

function isTopMember(value: tableBodyType): value is TopMemberType[] {
  return value[0].type === "top_customers";
}
function isTopProduct(value: tableBodyType): value is TopProductType[] {
  return value[0].type === "top_product";
}
function isOrderCustomer(value: tableBodyType): value is TypeUserOrder[] {
  return value[0].type === "order_table";
}
function isOrderDetails(
  value: tableBodyType,
): value is typeOrderDetailsTable[] {
  return value[0].type === "orderDetails";
}

const TableBodyData = ({ dataBody, role = "user" }: Prop) => {
  const { push } = useRouter();
  if (isTopMember(dataBody)) {
    return (
      <TableBody>
        {dataBody.map((item) => (
          <TableRow
            className="cursor-pointer"
            onClick={() =>
              push(`/admin/customers/customerInformation/${item.user_id}`)
            }
            key={item.user_id}
          >
            <TableCell>{item.username}</TableCell>
            <TableCell>{item.order_counts}</TableCell>
            <TableCell>${item.total_spent}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  }
  if (isTopProduct(dataBody)) {
    return (
      <TableBody>
        {dataBody.map((p) => (
          <TableRow
            onClick={() =>
              push(`/admin/products/updateProduct/${p.product_id}`)
            }
            className="cursor-pointer"
            key={p.product_id}
          >
            <TableCell className="flex gap-2 items-center max-w-100">
              <Image
                width={80}
                height={80}
                src={p.product_img}
                className="object-contain"
                alt={`img + ${p.product_img}`}
              />
              <span className="line-2">{p.product_name}</span>
            </TableCell>
            <TableCell>{p.product_price}</TableCell>
            <TableCell>{p.product_quantity}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  }
  if (isOrderCustomer(dataBody)) {
    return (
      <TableBody>
        {dataBody.map((item) => (
          <TableRow
            onClick={() =>
              role === "user"
                ? push(`/account/orders/${item.order_code}`)
                : push(
                    `/admin/customers/customerInformation/${item.user_id}/orderDetails/${item.order_code}`,
                  )
            }
            className="cursor-pointer"
            key={item.order_code}
          >
            <TableCell>{item.order_code}</TableCell>
            <TableCell>{item.order_status}</TableCell>
            <TableCell>{item.total}</TableCell>
            <TableCell>{item.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  }
  if (isOrderDetails(dataBody)) {
    return (
      <TableBody>
        {dataBody.map((item) => (
          <TableRow key={item.id} className="text-medium">
            <TableCell>
              <div className="flex items-center gap-3">
                <Image
                  src={item.img}
                  alt={item.name}
                  width={100}
                  height={100}
                />
                <span className="font-medium text-gray-800">{item.name}</span>
              </div>
            </TableCell>

            <TableCell>
              <PriceDisplay
                price={item.price}
                discount={item.discount}
                discountType={item.discount_type}
              />
            </TableCell>

            <TableCell>{item.quantity}</TableCell>

            <TableCell>
              <PriceDisplay
                price={item.price}
                discount={item.discount}
                discountType={item.discount_type}
                count={item.quantity}
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
                      <span className="font-medium">{option.optionTitle}:</span>
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
    );
  }
  return null;
};

export default TableBodyData;
