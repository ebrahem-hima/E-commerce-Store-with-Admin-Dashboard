import { Checkbox } from "@/components/ui/checkbox";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

import { IoIosArrowDown } from "react-icons/io";

interface filterType {
  filterName: string;
  items: string[];
}

interface Props {
  handleReset: () => void;
  handleOpenFilter: (idx: number) => void;
  handleFilter: (name: string, item: string) => void;
  filter: filterType[];
  openFilter: { [key: string]: boolean };
  filters: filterType[];
  setFilters: React.Dispatch<React.SetStateAction<filterType[]>>;
  pathName: string;
}

const FilterComponent = ({
  filters,
  pathName,
  filter,
  handleOpenFilter,
  handleFilter,
  openFilter,
  handleReset,
}: Props) => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
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
    <div className="px-4">
      <div className="flex-between mb-4">
        <span className="cursor-pointer text-primary font-medium">FILTER</span>
        <span onClick={handleReset} className="cursor-pointer">
          Reset
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {filter.map((filter, idx) => (
          <div key={filter.filterName}>
            <div>
              <p
                onClick={() => handleOpenFilter(idx)}
                className="px-3 py-[6px] cursor-pointer border border-black w-full rounded-sm flex-between"
              >
                <span>{filter.filterName}</span>
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
                  {filter.items.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <Checkbox
                          id={item}
                          onCheckedChange={() =>
                            handleFilter(filter.filterName, item)
                          }
                          className="border-black data-[state=checked]:bg-black"
                        />
                        <span className="text-sm">{item}</span>
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterComponent;
