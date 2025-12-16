"use client";

import { useState } from "react";
import TableSearch from "../shared/TableSearch";
import { SelectCheckBox } from "@/types/typeAliases";
import PageHeader from "../shared/PageHeader";
import useCustomerFn from "../adminHooks/useCustomerFn";
import CustomerRealTime from "./customerRealTime";
import { CustomerTableType } from "@/types/adminTableCheckboxtype";

const Page = () => {
  const [selectCheckBox, setSelectCheckBox] = useState<SelectCheckBox[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectFilter, setSelectFilter] = useState("");
  const { Loading, customer, setCustomer } = useCustomerFn({
    searchText,
    selectFilter,
  });

  const selectOptions = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
  ];

  const headers = [
    { title: "Name" },
    { title: "Email" },
    { title: "orders" },
    { title: "Spent" },
  ];

  return (
    <>
      <CustomerRealTime setCustomer={setCustomer} />
      <PageHeader title="Customers" />
      <TableSearch<CustomerTableType>
        tableWidth="min-w-[600px]"
        typeTable="user_profile"
        selectCheckBox={selectCheckBox}
        setSelectCheckBox={setSelectCheckBox}
        selectOptions={selectOptions}
        setSearchText={setSearchText}
        tableData={customer}
        headers={headers}
        Loading={Loading}
        setSelectFilter={setSelectFilter}
        emptyMessage="There are no orders to display"
      />
    </>
  );
};

export default Page;
