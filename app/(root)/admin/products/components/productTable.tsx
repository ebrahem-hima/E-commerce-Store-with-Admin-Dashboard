import React from "react";
import TableSearch from "../../shared/TableSearch";
import {
  productSortOptions,
  productTableColumns,
} from "@/constant/admin/admin-tables/product_table";
import { getProducts } from "../services/productService";
interface Props {
  searchParams: {
    filter: string;
    search: string;
  };
}
const ProductTable = async ({ searchParams }: Props) => {
  const data = await getProducts(searchParams);
  return (
    <>
      <TableSearch
        tableWidth="min-w-[700px]"
        typeTable="products"
        selectOptions={productSortOptions}
        tableData={data || []}
        headers={productTableColumns}
        emptyMessage="There are no products to display"
      />
    </>
  );
};

export default ProductTable;
