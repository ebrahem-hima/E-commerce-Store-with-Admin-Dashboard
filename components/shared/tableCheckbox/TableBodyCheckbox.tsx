"use client";

import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { SelectCheckBox } from "@/types/typeAliases";
import { typeEditValue } from "@/types/adminType";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import PriceDisplay from "../priceDisplay";
import {
  CouponTableType,
  CustomerTableType,
  InboxTableType,
  tableBodyCheckBoxType,
  TypeProductTable,
  TypeUserOrder,
} from "@/types/adminTableCheckboxtype";
import InboxPopup from "@/app/(root)/admin/inbox/InboxPopup";

interface Props {
  Edit?: boolean;
  setEditValue?: Dispatch<SetStateAction<typeEditValue[]>>;
  dataBody: tableBodyCheckBoxType;
  handleCheckboxChange: (ID: string | number, checked: boolean) => void;
  selectCheckBox: SelectCheckBox[];
}

function isOrderTable(value: tableBodyCheckBoxType): value is TypeUserOrder[] {
  return value[0].type === "orderTable";
}
function isProductTable(
  value: tableBodyCheckBoxType
): value is TypeProductTable[] {
  return value[0].type === "productTable";
}
function isCustomerTable(
  value: tableBodyCheckBoxType
): value is CustomerTableType[] {
  return value[0].type === "customerTable";
}
function isCouponTable(
  value: tableBodyCheckBoxType
): value is CouponTableType[] {
  return value[0].type === "couponTable";
}
function isInboxTable(value: tableBodyCheckBoxType): value is InboxTableType[] {
  return value[0].type === "inboxTable";
}

interface MessageType {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  status: string;
}

const TableBodyCheckbox = ({
  Edit,
  setEditValue,
  dataBody,
  handleCheckboxChange,
  selectCheckBox,
}: Props) => {
  const [onOpenChange, setonOpenChange] = useState(false);
  const [MessageDetails, setMessageDetails] = useState<MessageType | null>(
    null
  );

  const { push } = useRouter();
  if (isOrderTable(dataBody)) {
    const getSelected = selectCheckBox.map((item) => item.ID);
    const handleEdit = (ID: string, status: string) => {
      setEditValue?.((prev) => {
        const existing = prev.find((item) => item.ID === ID);
        if (existing) {
          return prev.map((item) =>
            item.ID === ID ? { ...item, status } : item
          );
        } else {
          return [...prev, { ID, status }];
        }
      });
    };
    return (
      <TableBody>
        {dataBody.map((o) => (
          <TableRow key={o.id} className="h-10">
            <TableCell>
              <Checkbox
                checked={selectCheckBox.some(
                  (check) => check.ID === o.id && check.value
                )}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(o.id, checked as boolean)
                }
              />
            </TableCell>
            <TableCell>{o.order_code}</TableCell>
            <TableCell>{o.date}</TableCell>
            <TableCell>{o.customer}</TableCell>
            <TableCell>{o.payment_status}</TableCell>
            <TableCell>
              {getSelected.includes(o.id) && Edit ? (
                <select
                  className={`px-2 py-1 rounded bg-transparent border border-gray-300 ${
                    o.order_status === "Pending"
                      ? "text-[#F99600]"
                      : o.order_status === "Shipped"
                      ? "text-[#5A607F]"
                      : o.order_status === "Delivered"
                      ? "text-[#1E5EFF]"
                      : "text-gray-500"
                  }`}
                  onChange={(e) =>
                    handleEdit(o.id, (e.target as HTMLSelectElement).value)
                  }
                >
                  <option value={o.order_status}>{o.order_status}</option>
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              ) : (
                <span
                  className={`px-2 py-1 rounded text-white ${
                    o.order_status === "Pending"
                      ? "bg-[#F99600]"
                      : o.order_status === "Shipped"
                      ? "bg-[#5A607F]"
                      : o.order_status === "Delivered"
                      ? "bg-[#1E5EFF]"
                      : "bg-gray-500"
                  }`}
                >
                  {o.order_status}
                </span>
              )}
            </TableCell>
            <TableCell className="text-right font-medium">${o.total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  }

  if (isProductTable(dataBody)) {
    return (
      <TableBody>
        {dataBody.map((p, idx) => (
          <TableRow
            onClick={() => push(`/admin/products/updateProduct/${p.id}`)}
            key={idx}
            className="cursor-pointer hover:bg-[#f1f1f196] h-10 font-medium"
          >
            <TableCell>
              <Checkbox
                checked={selectCheckBox.some(
                  (check) => check.ID === p.id && check.value
                )}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(p.id || "", checked as boolean)
                }
              />
            </TableCell>
            <TableCell className="flex items-center gap-2">
              <Image
                src={p.img}
                alt="product-img"
                width={55}
                height={55}
                className="rounded-md"
              />
              <span className="line-clamp-2 max-w-[170px]">{p.name}</span>
            </TableCell>
            <TableCell>
              {p.stock > 0 ? (
                <span>{p.stock} in stock</span>
              ) : (
                <span className="bg-[#E6E9F4] text-[#5A607F] rounded-sm px-2 py-1">
                  Out of Stock
                </span>
              )}
            </TableCell>
            <TableCell>
              <PriceDisplay
                isProduct={true}
                price={p.price}
                discount={p.discount}
                discountType={p.discount_type}
              />
            </TableCell>
            <TableCell>{p.categories?.name}</TableCell>
            <TableCell>{p.created_at}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  }

  if (isCustomerTable(dataBody)) {
    return (
      <TableBody>
        {dataBody.map((c, idx) => (
          <TableRow
            onClick={() => push(`/admin/customers/customerInformation/${c.id}`)}
            key={idx}
            className="h-10 cursor-pointer"
          >
            <TableCell>
              <Checkbox
                checked={selectCheckBox.some(
                  (check) => check.ID === c.id && check.value
                )}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(c.id, checked as boolean)
                }
              />
            </TableCell>
            <TableCell className="flex items-center gap-2">
              <span className="w-10 h-10 bg-[#777] flex-center rounded-full text-white text-[18px] font-medium">
                {c.first_name.charAt(0).toUpperCase()}
              </span>
              <span>{c.first_name + " " + c.last_name}</span>
            </TableCell>
            <TableCell className="bg-[red] overflow-hidden">
              {c.email}
            </TableCell>
            <TableCell>{c.order_count}</TableCell>
            <TableCell>{c.total_spent}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  }

  if (isCouponTable(dataBody)) {
    console.log("dataBody", dataBody);
    return (
      <TableBody>
        {dataBody.map((c, idx) => (
          <TableRow
            onClick={() => push(`/admin/coupons/updateCoupon/${c.id}`)}
            key={idx}
            className="h-10 cursor-pointer"
          >
            <TableCell>
              <Checkbox
                checked={selectCheckBox.some(
                  (check) => check.ID === c.id && check.value
                )}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(c.id, checked as boolean)
                }
              />
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <span className="font-medium">{c.coupon_name}</span>
                <span className="text-[#5A607F]">
                  <span className="font-medium">Code:</span> {c.coupon_code}
                </span>
              </div>
            </TableCell>
            <TableCell>
              {c.max_uses} / {c.times_used}
            </TableCell>
            <TableCell>
              {c.is_active ? (
                <span className="px-2 py-1 rounded-sm bg-[#C4F8E2] text-[#06A561]">
                  Active
                </span>
              ) : (
                <span className="px-2 py-1 rounded-sm bg-[#E6E9F4] text-[#5A607F]">
                  Expired
                </span>
              )}
            </TableCell>
            <TableCell>
              {c.applies_to_type === "specific" ? (
                <span className="px-2 py-1 rounded-sm bg-[#C4F8E2] text-[#06A561]">
                  Specific
                </span>
              ) : (
                <span className="px-2 py-1 rounded-sm bg-[#E6E9F4] text-[#5A607F]">
                  All Users
                </span>
              )}
            </TableCell>
            <TableCell>
              {c.created_at} / {c.expired_at}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  }

  if (isInboxTable(dataBody)) {
    return (
      <>
        <TableBody>
          {dataBody.map((c, idx) => (
            <TableRow
              onClick={() => {
                setonOpenChange(true);
                setMessageDetails({
                  id: c.id,
                  name: c.user_profile.first_name,
                  email: c.user_profile.email,
                  phone: c.user_profile.phone,
                  message: c.message,
                  date: c.created_at,
                  status: c.status,
                });
              }}
              key={idx}
              className="h-10 cursor-pointer"
            >
              <TableCell>
                <Checkbox
                  checked={selectCheckBox.some(
                    (check) => check.ID === c.id && check.value
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(c.id, checked as boolean)
                  }
                />
              </TableCell>
              <TableCell className="overflow-hidden">
                {c.user_profile.email}
              </TableCell>
              <TableCell>{c.message}</TableCell>
              <TableCell>
                <span
                  className={`text-center px-3 py-1 rounded-md font-medium ${
                    c.status === "New"
                      ? "text-green-700 bg-green-100"
                      : c.status === "Seen"
                      ? "text-gray-600 bg-gray-100"
                      : c.status === "Reply"
                      ? "text-blue-700 bg-blue-100"
                      : "text-black bg-white"
                  }`}
                >
                  {c.status}
                </span>
              </TableCell>
              <TableCell>{c.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {onOpenChange && (
          <InboxPopup
            onOpenChange={setonOpenChange}
            isOpen={onOpenChange}
            data={MessageDetails}
          />
        )}
      </>
    );
  }
};

export default TableBodyCheckbox;
