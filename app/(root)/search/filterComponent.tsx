"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { productOptionsType } from "@/types/type";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";

interface filterType {
  filterName: string;
  items: string[];
}

const FilterComponent = ({
  filter,
  setIsOpen,
}: {
  filter: productOptionsType[];
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const pathName = usePathname();

  const [filters, setFilters] = useState<filterType[]>([]);

  const [openFilter, setOpenFilter] = useState<{ [key: string]: boolean }>({});

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
              : filterItem,
          )
        : [...prev, { filterName: Name, items: [item] }],
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
    push(`${pathName}?query=${queryValue}`);
  };

  const handleURLSearch = () => {
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
    setIsOpen?.(false);
  };

  const searchCount = filters
    .map((fil) => fil.items.length)
    .reduce((acc, curr) => acc + curr, 0);
  return (
    <div className="px-4">
      <div className="flex-between mb-4">
        <span className="cursor-pointer text-primary font-medium">FILTER</span>
        <span onClick={handleReset} className="cursor-pointer">
          Reset
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {filter.map(({ optionTitle, values }, idx) => (
          <div key={optionTitle}>
            <div>
              <p
                onClick={() => handleOpenFilter(idx)}
                className="px-3 py-1.5 cursor-pointer border border-black w-full rounded-sm flex-between"
              >
                <span>{optionTitle}</span>
                <IoIosArrowDown
                  className={
                    openFilter[idx]
                      ? "rotate-180 duration-300"
                      : "rotate-0 duration-300"
                  }
                />
              </p>
              {/* filters */}
              {openFilter[idx] && (
                <div className="flex flex-col gap-1 mt-3 ml-4">
                  {values.map((val) => (
                    <div key={val} className="flex items-center gap-3">
                      <Checkbox
                        id={val}
                        onCheckedChange={
                          () => handleFilter(optionTitle, val)
                          // handleCountSearch(filter.filterName, item);
                        }
                        checked={filters.some((s) => s.items.includes(val))}
                        className="border-black data-[state=checked]:bg-black"
                      />
                      <Label
                        htmlFor={val}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <span className="text-sm">{val}</span>
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <Button onClick={handleURLSearch}>
          <span>Search</span>
          <span>({searchCount})</span>
        </Button>
      </div>
    </div>
  );
};

export default FilterComponent;
