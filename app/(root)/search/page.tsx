import { Suspense } from "react";
import FilterComponent from "./filterComponent";
import SearchFilterMobile from "./searchFilterMobile";
import SliderClientComponent from "@/components/shared/SliderComponent/SliderClientComponent";
import SearchProduct from "./SearchProduct";
import { createClient } from "@/app/utils/supabase/server";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

interface SearchPageProps {
  searchParams: Promise<{
    query?: string;
  }>;
}

const Page = async ({ searchParams }: SearchPageProps) => {
  const supabase = await createClient();
  const resolvedParams = await searchParams;
  const querySearch = resolvedParams.query?.trim();

  if (!querySearch) {
    return <p>No search query</p>;
  }

  const filters = Object.entries(resolvedParams)
    .filter(([key]) => key !== "query")
    .map(([key, value]) => ({
      optionTitle: key,
      values: value.split(","),
    }));

  let query = supabase.from("products").select();

  if (querySearch) {
    query = query.ilike("search_text", `%${querySearch}%`);
  }
  // This solution is from AI until I learn SQL and write all of this in the database.
  if (filters.length > 0) {
    const orConditions: string[] = [];

    filters.forEach(({ optionTitle, values }) => {
      values.forEach((singleValue) => {
        const rawJson = JSON.stringify([
          { optionTitle, values: [singleValue] },
        ]);
        const escapedJson = rawJson.replace(/"/g, '\\"');
        const condition = `options.cs."${escapedJson}"`;
        orConditions.push(condition);
      });
    });

    if (orConditions.length > 0) {
      query = query.or(orConditions.join(","));
    }
  }
  // end solution
  const { data, error } = await query;

  if (error) {
    console.log(error);
    return;
  }

  const getFilters = data.map((product) => product.options).flat();
  const map = new Map();
  getFilters?.forEach(({ optionTitle, values }) => {
    if (!map.has(optionTitle)) {
      map.set(optionTitle, new Set(values));
    } else {
      const existing = map.get(optionTitle);
      values.forEach((val: string) => existing.add(val));
    }
  });
  const mergeArray = Array.from(map, ([optionTitle, values]) => ({
    optionTitle,
    values: [...values],
  }));

  const bestSellersProducts = data.filter((product) => product.discount > 0);
  const otherProducts = data.filter((product) => !product.discount);

  if (data.length === 0) {
    return (
      <div className="flex-center font-bold text-primary">
        There Are No Products to Show
      </div>
    );
  }
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-4">
        {/* Filter Component */}
        <div className="hidden lg:block">
          <Suspense fallback={<div>Loading...</div>}>
            <FilterComponent filter={mergeArray} />
          </Suspense>
        </div>
        {/* Best Sellers */}
        <div className="flex flex-col gap-4">
          {bestSellersProducts.length > 0 && (
            <SliderClientComponent
              titleComponent="Best Sellers"
              Product={bestSellersProducts}
              search={true}
            />
          )}
          {/* Products + Sort by */}
          {otherProducts.length > 0 && (
            <Suspense fallback={<LoadingSpinner />}>
              <SearchProduct products={otherProducts} />
            </Suspense>
          )}
        </div>
      </div>
      <SearchFilterMobile filter={mergeArray} />
    </>
  );
};

export default Page;
