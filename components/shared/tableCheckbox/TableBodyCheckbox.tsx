import { SelectCheckBox } from "@/types/typeAliases";
import { typeEditValue } from "@/types/adminType";
import { Dispatch, SetStateAction } from "react";
import {
  CouponTableType,
  CustomerTableType,
  InboxTableType,
  tableBodyCheckBoxType,
  TypeProductTable,
  TypeUserOrder,
} from "@/types/adminTableCheckboxtype";
import TableBodyOrder from "./TableBodyCheckbox/TableBodyOrder";
import TableBodyCustomer from "./TableBodyCheckbox/TableBodyCustomer";
import TableBodyCoupon from "./TableBodyCheckbox/TableBodyCoupon";
import TableBodyInbox from "./TableBodyCheckbox/TableBodyInbox";
import TableBodyProduct from "./TableBodyCheckbox/TableBodyProduct";

interface Props {
  Edit?: boolean;
  setEditValue?: Dispatch<SetStateAction<typeEditValue[]>>;
  dataBody: tableBodyCheckBoxType;
  handleCheckboxChange: (ID: string | number, checked: boolean) => void;
  selectCheckBox: SelectCheckBox[];
}

function isOrderTable(value: tableBodyCheckBoxType): value is TypeUserOrder[] {
  return value.length > 0 && value[0].type === "order_table";
}

function isProductTable(
  value: tableBodyCheckBoxType,
): value is TypeProductTable[] {
  return value.length > 0 && value[0].type === "productTable";
}

function isCustomerTable(
  value: tableBodyCheckBoxType,
): value is CustomerTableType[] {
  return value.length > 0 && value[0].type === "customerTable";
}

function isCouponTable(
  value: tableBodyCheckBoxType,
): value is CouponTableType[] {
  return value.length > 0 && value[0].type === "couponTable";
}

function isInboxTable(value: tableBodyCheckBoxType): value is InboxTableType[] {
  return value.length > 0 && value[0].type === "inboxTable";
}

const TableBodyCheckbox = ({
  Edit,
  setEditValue,
  dataBody,
  handleCheckboxChange,
  selectCheckBox,
}: Props) => {
  if (isOrderTable(dataBody)) {
    return (
      <TableBodyOrder
        dataBody={dataBody}
        selectCheckBox={selectCheckBox}
        handleCheckboxChange={handleCheckboxChange}
        Edit={Edit}
        setEditValue={setEditValue}
      />
    );
  }

  if (isProductTable(dataBody)) {
    return (
      <TableBodyProduct
        dataBody={dataBody}
        selectCheckBox={selectCheckBox}
        handleCheckboxChange={handleCheckboxChange}
      />
    );
  }

  if (isCustomerTable(dataBody)) {
    return (
      <TableBodyCustomer
        dataBody={dataBody}
        selectCheckBox={selectCheckBox}
        handleCheckboxChange={handleCheckboxChange}
      />
    );
  }

  if (isCouponTable(dataBody)) {
    return (
      <TableBodyCoupon
        dataBody={dataBody}
        selectCheckBox={selectCheckBox}
        handleCheckboxChange={handleCheckboxChange}
      />
    );
  }

  if (isInboxTable(dataBody)) {
    return (
      <TableBodyInbox
        dataBody={dataBody}
        selectCheckBox={selectCheckBox}
        handleCheckboxChange={handleCheckboxChange}
      />
    );
  }
  return <div>There is no data to display</div>;
};

export default TableBodyCheckbox;
