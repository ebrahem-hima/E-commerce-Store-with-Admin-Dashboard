import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

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
}

const FilterComponent = ({
  handleReset,
  filter,
  handleOpenFilter,
  handleFilter,
  openFilter,
}: Props) => {
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
                className="px-3 py-[6px] cursor-pointer border border-black w-full rounded-[4px] flex-between"
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
