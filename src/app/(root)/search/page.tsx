"use client";

import React, { Suspense, useEffect, useState } from "react";
import { firstProduct } from "../../../../constant/product";
import ProductCard from "../../../../components/shared/Card/ProductCard/ProductCard";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { IoList } from "react-icons/io5";
import { SlGrid } from "react-icons/sl";
import FilterComponent from "./filterComponent";
import SliderComponent from "../../../../components/shared/SliderComponent/SliderComponent";
import SearchFilterMobile from "./searchFilterMobile";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface filterType {
  filterName: string;
  items: string[];
}

const Page = () => {
  const pathName = usePathname();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [filters, setFilters] = useState<filterType[]>([]);
  const filter = [
    { filterName: "Colors", items: ["Red", "Black", "Green"] },
    { filterName: "Sizes", items: ["md", "lg", "sm"] },
  ];
  const [openFilter, setOpenFilter] = useState<{ [key: string]: boolean }>({});
  const [isGrid, setIsGrid] = useState(false);

  const handleOpenFilter = (ID: number) => {
    setOpenFilter((prev) => ({
      ...prev,
      [ID]: !prev[ID],
    }));
  };
  const handleFilter = (Name: string, item: string) => {
    const exist = filters.some((filter) => filter.filterName === Name);
    setFilters((prev) =>
      exist
        ? prev.map((filterItem) =>
            filterItem.filterName === Name
              ? {
                  ...filterItem,
                  items: filterItem.items.includes(item)
                    ? filterItem.items.filter((filter) => filter !== item)
                    : [...filterItem.items, item],
                }
              : filterItem
          )
        : [...prev, { filterName: Name, items: [item] }]
    );
  };
  const handleReset = () => {
    setFilters([]);
    setOpenFilter({});

    const searchParams = new URLSearchParams(window.location.search);

    const queryValue = searchParams.get("query");

    searchParams.forEach((_, key) => {
      if (key !== "query") searchParams.delete(key);
    });

    const newUrl = queryValue
      ? `${pathName}?query=${encodeURIComponent(queryValue)}`
      : pathName;

    window.history.replaceState({}, "", newUrl);
  };

  useEffect(() => {
    if (!query) return;
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set("query", query);

    filters.forEach(({ filterName, items }) => {
      if (items.length > 0) {
        searchParams.set(filterName, items.join(","));
      } else {
        searchParams.delete(filterName);
      }
    });

    push(`${pathName}?${decodeURIComponent(searchParams.toString())}`);
  }, [filters, pathName, push, query]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-4">
        {/* Filter Component */}
        <div className="hidden lg:block">
          <FilterComponent
            filter={filter}
            handleReset={handleReset}
            handleFilter={handleFilter}
            handleOpenFilter={handleOpenFilter}
            openFilter={openFilter}
          />
        </div>
        {/* Best Sellers */}
        <div className="flex flex-col gap-4">
          <SliderComponent
            type="products"
            titleComponent="Best Sellers"
            Product={firstProduct}
            search={true}
          />
          {/* Sort by */}
          <div className="flex-between">
            <div className="flex gap-2 items-center">
              <span>Sort By</span>
              <div className="w-[200px]">
                <Select>
                  <SelectTrigger className="!h-8">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="border-none">
                    <SelectItem value="high-to-low">
                      Price (High to Low)
                    </SelectItem>
                    <SelectItem value="low-to-high">
                      Price (Low to High)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <SlGrid
                onClick={() => setIsGrid(true)}
                size={19}
                className="cursor-pointer"
              />
              <IoList
                onClick={() => setIsGrid(false)}
                size={27}
                className="cursor-pointer"
              />
            </div>
          </div>
          {/* Products */}
          <div
            className={`${
              isGrid
                ? "flex flex-col"
                : "grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-400:grid-cols-1"
            } gap-4 `}
          >
            {firstProduct.map((item) => (
              <ProductCard isGrid={isGrid} key={item.product_id} item={item} />
            ))}
          </div>
        </div>
      </div>
      <SearchFilterMobile
        filter={filter}
        handleReset={handleReset}
        handleFilter={handleFilter}
        handleOpenFilter={handleOpenFilter}
        openFilter={openFilter}
      />
    </Suspense>
  );
};

export default Page;
