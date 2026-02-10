"use client";

import { optionType, typeProduct } from "@/types/productTypes";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Options from "./Options";
import Counter from "./Counter";

const CounterWithOptions = ({ item }: { item: typeProduct }) => {
  const [getOptions, setGetOptions] = useState<optionType[]>([]);
  const { replace } = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const getURl = getOptions.map(
      ({ optionTitle, values }) => `${optionTitle + "=" + values}`,
    );
    replace(`?${getURl}`, { scroll: false });
  }, [getOptions, pathName, replace]);
  return (
    <>
      <Options
        options={item.options || []}
        getOptions={getOptions}
        setGetOptions={setGetOptions}
      />
      {/* Counter + buy + wishlist */}
      <Counter item={item} getOptions={getOptions} />
    </>
  );
};

export default CounterWithOptions;
