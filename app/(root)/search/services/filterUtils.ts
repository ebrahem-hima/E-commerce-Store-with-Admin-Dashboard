import { optionType } from "@/types/productTypes";

interface Product {
  options: optionType[];
}

export function extractUniqueFilters(products: Product[]) {
  const allOptions = products.map((product) => product.options).flat();
  const map = new Map<string, Set<string>>();

  allOptions?.forEach(({ optionTitle, values }) => {
    if (!map.has(optionTitle)) {
      map.set(optionTitle, new Set(values));
    } else {
      const existing = map.get(optionTitle)!;
      values?.forEach((val: string) => existing.add(val));
    }
  });

  return Array.from(map, ([optionTitle, values]) => ({
    optionTitle,
    values: [...values],
  }));
}
