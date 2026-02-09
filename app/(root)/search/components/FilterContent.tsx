import React from "react";
import { getSearchProducts } from "../services/fetchProducts";
import FilterComponent from "../filterComponent";

interface Props {
  querySearch: string;
  filtersArray: { optionTitle: string; values: string[] }[];
}

const FilterContent = async ({ querySearch, filtersArray }: Props) => {
  const { mergeArray } = await getSearchProducts({
    querySearch,
    filters: filtersArray,
  });
  return (
    <>
      <FilterComponent filter={mergeArray} />
    </>
  );
};

export default FilterContent;
