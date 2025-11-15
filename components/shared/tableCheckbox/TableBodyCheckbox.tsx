import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  couponTableType,
  customerTableType,
  productAdminTable,
  tableBodyType,
} from "../../../types/tabletypes";
import { typeUserOrder } from "@/types/productTypes";
import { Checkbox } from "@/components/ui/checkbox";
import { SelectCheckBox } from "@/types/typeAliases";
import { typeEditValue } from "@/types/adminType";
import Image from "next/image";
import Link from "next/link";

interface Props {
  Edit?: boolean;
  setEditValue?: React.Dispatch<React.SetStateAction<typeEditValue[]>>;
  dataBody: tableBodyType;
  handleCheckboxChange: (ID: string, checked: boolean) => void;
  selectCheckBox: SelectCheckBox[];
}

function isOrderTable(value: tableBodyType): value is typeUserOrder[] {
  return value[0].type === "orderTable";
}
function isProductTable(value: tableBodyType): value is productAdminTable[] {
  return value[0].type === "productTable";
}
function isCustomerTable(value: tableBodyType): value is customerTableType[] {
  return value[0].type === "customerTable";
}
function isCouponTable(value: tableBodyType): value is couponTableType[] {
  return value[0].type === "couponTable";
}

const TableBodyCheckbox = ({
  Edit,
  setEditValue,
  dataBody,
  handleCheckboxChange,
  selectCheckBox,
}: Props) => {
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
          <TableRow key={idx} className="h-10">
            <TableCell>
              {/* <Link href={`/`} className="flex"> */}
              <Checkbox
                checked={selectCheckBox.some(
                  (check) => check.ID === p.id && check.value
                )}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(p.id, checked as boolean)
                }
              />
              {/* </Link> */}
            </TableCell>
            <TableCell className="flex items-center gap-2">
              <Image src={p.img} alt="product-img" width={70} height={70} />
              <span className="font-medium line-clamp-2 max-w-[200px]">
                {p.name}
              </span>
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
            <TableCell>{p.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  }

  if (isCustomerTable(dataBody)) {
    return (
      <TableBody>
        {dataBody.map((c, idx) => (
          <TableRow key={idx} className="h-10">
            <TableCell>
              <Checkbox
                checked={selectCheckBox.some(
                  (check) => check.ID === c.id && check.value
                )}
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
            <TableCell>{c.email}</TableCell>
            <TableCell>{c.country + " " + c.address1}</TableCell>
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
          <TableRow key={idx} className="h-10">
            <TableCell>
              <Checkbox
                checked={selectCheckBox.some(
                  (check) => check.ID === c.id && check.value
                )}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(c.id, checked as boolean)
                }
              />
            </TableCell>
            <TableCell>{c.coupon_id}</TableCell>
            <TableCell>
              {c.max_uses} / {c.times_used}
            </TableCell>
            {/* <TableCell></TableCell> */}
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
              {c.created_at} / {c.expires_at}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  }
};

export default TableBodyCheckbox;
