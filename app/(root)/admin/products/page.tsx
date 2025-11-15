"use client";
import { useState } from "react";
import TableSearch from "../shared/TableSearch";
import { SelectCheckBox } from "@/types/typeAliases";
import { productAdminTable } from "@/types/tabletypes";
import PageHeader from "../shared/PageHeader";

const mockProducts: productAdminTable[] = [
  {
    type: "productTable",
    id: "1",
    name: "Gaming Keyboard RGB",
    img: "/images/productImages/keyboard.webp",
    stock: 24,
    price: 799,
    options: [
      { optionTitle: "Switch Type", values: ["Red", "Blue", "Brown"] },
      { optionTitle: "Language", values: ["English", "Arabic"] },
    ],
  },
  {
    type: "productTable",
    id: "2",
    name: "Wireless Gaming Mouse",
    img: "/images/productImages/Controller.webp",
    stock: 0,
    price: 599,
    options: [{ optionTitle: "Color", values: ["Black", "White"] }],
  },
  {
    type: "productTable",
    id: "3",
    name: "Cooler",
    img: "/images/productImages/cooler.webp",
    stock: 30,
    price: 999,
    options: [{ optionTitle: "Color", values: ["Red", "Blue", "Green"] }],
  },
];

const Page = () => {
  const [selectCheckBox, setSelectCheckBox] = useState<SelectCheckBox[]>([]);
  const [searchText, setSearchText] = useState("");
  const [Loading, setLoading] = useState(false);
  const [isProductChange, setIsProductChange] = useState(false);
  const [selectFilter, setSelectFilter] = useState("");

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
    { title: "Product" },
    // { title: "Image" },
    { title: "Stock" },
    { title: "Price" },
    // { title: "Options" },
  ];

  return (
    <>
      <PageHeader
        link="/admin/products/AddProduct"
        title="Products"
        buttonText="Add Product"
      />
      <TableSearch
        typeTable="product_table"
        isTableChange={setIsProductChange}
        selectCheckBox={selectCheckBox}
        setSelectCheckBox={setSelectCheckBox}
        selectOptions={selectOptions}
        setSearchText={setSearchText}
        tableData={mockProducts}
        handleCheckboxChange={handleCheckboxChange}
        headers={headers}
        Loading={Loading}
        setSelectFilter={setSelectFilter}
        emptyMessage="There are no products to display"
      />
    </>
  );
};

export default Page;
