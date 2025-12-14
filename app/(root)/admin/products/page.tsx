"use client";
import { useState } from "react";
import TableSearch from "../shared/TableSearch";
import { SelectCheckBox } from "@/types/typeAliases";
import PageHeader from "../shared/PageHeader";
import useProducts from "../adminHooks/useProducts";
import ProductsRealtime from "./ProductsRealtime";
import { TypeProductTable } from "@/types/adminTableCheckboxtype";

const Page = () => {
  const [selectCheckBox, setSelectCheckBox] = useState<SelectCheckBox[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectFilter, setSelectFilter] = useState("");
  const { Products, Loading, setProducts } = useProducts({
    searchText,
    selectFilter,
  });

  const selectOptions = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "Price High", value: "price_high" },
    { label: "Price Low", value: "price_low" },
  ];

  const headers = [
    { title: "Product" },
    { title: "Stock" },
    { title: "Price" },
    { title: "Category" },
    { title: "CreatedAt" },
  ];

  return (
    <>
      <ProductsRealtime setProducts={setProducts} />
      <PageHeader
        link="/admin/products/AddProduct"
        title="Products"
        buttonText="Add Product"
      />
      <TableSearch<TypeProductTable>
        tableWidth="min-w-[700px]"
        typeTable="products"
        selectCheckBox={selectCheckBox}
        setSelectCheckBox={setSelectCheckBox}
        selectOptions={selectOptions}
        setSearchText={setSearchText}
        tableData={Products}
        headers={headers}
        Loading={Loading}
        setSelectFilter={setSelectFilter}
        emptyMessage="There are no products to display"
      />
    </>
  );
};

export default Page;
