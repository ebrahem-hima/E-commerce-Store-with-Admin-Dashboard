"use client";

import { useState } from "react";
import { SelectCheckBox } from "@/types/typeAliases";
import TableSearch from "../shared/TableSearch";
import PageHeader from "../shared/PageHeader";
import useCustomerFn from "../adminFn/useCustomerFn";

const Page = () => {
  const [isCustomerChange, setIsCustomerChange] = useState(false);
  const [selectCheckBox, setSelectCheckBox] = useState<SelectCheckBox[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectFilter, setSelectFilter] = useState("");
  const { Loading, customer } = useCustomerFn({
    isCustomerChange,
    searchText,
    selectFilter,
  });

  const selectOptions = ["Newest", "Oldest"];
  const handleCheckboxChange = (ID: string, checked: boolean) => {
    setSelectCheckBox((prev) =>
      prev.some((check) => check.ID === ID)
        ? prev.filter((check) => check.ID !== ID)
        : [
            ...prev,
            {
              ID,
              value: checked,
            },
          ]
    );
  };

  const headers = [
    { title: "Name" },
    { title: "Email" },
    { title: "Location" },
    { title: "orders" },
    { title: "Spent" },
  ];

  return (
    <>
      <PageHeader title="Customers" />
      <TableSearch
        typeTable="user_profile"
        isTableChange={setIsCustomerChange}
        selectCheckBox={selectCheckBox}
        setSelectCheckBox={setSelectCheckBox}
        selectOptions={selectOptions}
        setSearchText={setSearchText}
        tableData={customer}
        handleCheckboxChange={handleCheckboxChange}
        headers={headers}
        Loading={Loading}
        setSelectFilter={setSelectFilter}
        emptyMessage="There are no orders to display"
      />
    </>
  );
};

export default Page;
