"use client";

import { useState } from "react";
import { SelectCheckBox } from "@/types/typeAliases";
import TableSearch from "../shared/TableSearch";
import OrdersRealtime from "./OrderRealtime";
import { typeEditValue } from "@/types/adminType";
import useOrders from "./hooks/useOrders";

const Page = () => {
  const [selectCheckBox, setSelectCheckBox] = useState<SelectCheckBox[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectFilter, setSelectFilter] = useState("");
  const [Edit, setEdit] = useState(false);
  const [EditValue, setEditValue] = useState<typeEditValue[]>([]);
  const { orders, Loading, setOrders } = useOrders({
    searchText,
    selectFilter,
  });

  const selectOptions = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
  ];

  const handleCheckboxChange = (orderCode: string, checked: boolean) => {
    setSelectCheckBox((prev) =>
      prev.some((check) => check.ID === orderCode)
        ? prev.filter((check) => check.ID !== orderCode)
        : [
            ...prev,
            {
              ID: orderCode,
              value: checked,
            },
          ]
    );
  };

  const headers = [
    { title: "Order" },
    { title: "Date" },
    { title: "Customer" },
    { title: "Payment Status" },
    { title: "Order Status" },
    { title: "Total", className: "text-right" },
  ];

  return (
    <>
      <OrdersRealtime setOrders={setOrders} />
      <TableSearch
        Edit={Edit}
        EditValue={EditValue}
        setEditValue={setEditValue}
        typeTable="user_order"
        selectCheckBox={selectCheckBox}
        setSelectCheckBox={setSelectCheckBox}
        selectOptions={selectOptions}
        setSearchText={setSearchText}
        tableData={orders}
        handleCheckboxChange={handleCheckboxChange}
        headers={headers}
        Loading={Loading}
        setSelectFilter={setSelectFilter}
        setEdit={setEdit}
        emptyMessage="There are no orders to display"
      />
    </>
  );
};

export default Page;
