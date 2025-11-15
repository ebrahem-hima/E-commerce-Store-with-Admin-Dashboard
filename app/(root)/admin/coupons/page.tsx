"use client";
import { useState } from "react";
import TableSearch from "../shared/TableSearch";
import { SelectCheckBox } from "@/types/typeAliases";
import PageHeader from "../shared/PageHeader";
import useCouponFn from "../adminFn/useCouponFn";

const Page = () => {
  const [selectCheckBox, setSelectCheckBox] = useState<SelectCheckBox[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isCouponChange, setIsCouponChange] = useState(false);
  const [selectFilter, setSelectFilter] = useState("");
  // const [tableData, setTableData] = useState(mockProducts);
  const { Loading, coupon } = useCouponFn({
    isCouponChange,
    searchText,
    selectFilter,
  });

  const selectOptions = ["Newest", "Oldest", "Price High", "Price Low"];

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
    { title: "Coupon Name" },
    { title: "Usage" },
    { title: "Status" },
    { title: "Date" },
  ];

  return (
    <>
      <PageHeader
        link="/admin/coupons/createCoupon"
        title="Coupons"
        buttonText="Create coupon"
      />
      <TableSearch
        typeTable="coupons"
        isTableChange={setIsCouponChange}
        selectCheckBox={selectCheckBox}
        setSelectCheckBox={setSelectCheckBox}
        selectOptions={selectOptions}
        setSearchText={setSearchText}
        tableData={coupon}
        handleCheckboxChange={handleCheckboxChange}
        headers={headers}
        Loading={Loading}
        setSelectFilter={setSelectFilter}
        emptyMessage="There are no Coupons to display"
      />
    </>
  );
};

export default Page;
