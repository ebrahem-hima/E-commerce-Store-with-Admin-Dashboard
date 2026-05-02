"use client";

import { optionType } from "@/types/productTypes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface Props {
  options: optionType[];
}

const Options = ({ options }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchParams.get(name) === value) {
        params.delete(name);
      } else {
        params.set(name, value);
      }

      return params.toString();
    },
    [searchParams],
  );

  const handleOptionClick = (title: string, value: string) => {
    const queryString = createQueryString(title, value);
    router.replace(`${pathName}?${queryString}`, { scroll: false });
  };
  return (
    <div className="flex flex-col gap-3">
      {options?.map((option, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <span className="font-inter font-normal text-md tracking-[0.03em]">
            {option.optionTitle}:
          </span>
          <div className="flex gap-2">
            {(option.values || []).map((value, idx) => {
              const isActive = searchParams.get(option.optionTitle) === value;
              return (
                <span
                  key={idx}
                  className={`${
                    isActive ? "bg-primary text-white border-primary!" : ""
                  } cursor-pointer duration-200 text-sm py-0.5 px-3 border border-gray-400 hover:border-primary hover:text-white hover:bg-primary rounded-sm active:bg-primary active:border-primary active:text-white`}
                  onClick={() => handleOptionClick(option.optionTitle, value)}
                >
                  {value}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Options;
