import { Suspense } from "react";
import FilterComponent from "./filterComponent";
import SearchFilterMobile from "./searchFilterMobile";
import SliderClientComponent from "@/components/shared/SliderComponent/SliderClientComponent";
import SearchProduct from "./SearchProduct";
import LoadingSpinner from "@/components/Loaders/LoadingSpinner";
import { getSearchProducts } from "./services/fetchProducts";

interface SearchPageProps {
  searchParams: Promise<{
    query?: string;
    filters: { optionTitle: string; values: string };
  }>;
}

const searchPageContent = async ({ searchParams }: SearchPageProps) => {
  const resolvedParams = await searchParams;
  const querySearch = resolvedParams.query?.trim();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { query, ...filters } = resolvedParams;
  if (!querySearch) {
    return <p>No search query</p>;
  }

  const filtersArray = Object.entries(filters).map(([optionTitle, values]) => ({
    optionTitle,
    values: typeof values === "string" ? (values as string).split(",") : [],
  }));

  const { bestSellersProducts, otherProducts, mergeArray } =
    await getSearchProducts({
      querySearch,
      filters: filtersArray,
    });

  if (otherProducts.length === 0 && bestSellersProducts.length === 0) {
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

export default searchPageContent;
