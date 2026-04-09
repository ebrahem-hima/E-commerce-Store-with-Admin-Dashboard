import { Suspense } from "react";
import FilterContent from "./components/FilterContent";
import SliderComponentContent from "./components/SliderComponentContent";
import LoadingContentSearchPage from "./components/loadingPage/loadingContentSearchPage";

interface SearchPageProps {
  searchParams: Promise<{
    query?: string;
    sort?: string;
    filters: { optionTitle: string; values: string };
  }>;
}

const Page = async ({ searchParams }: SearchPageProps) => {
  const resolvedParams = await searchParams;
  const querySearch = resolvedParams.query?.trim();
  const sortSearch = resolvedParams.sort?.trim();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { query, sort, ...filters } = resolvedParams;
  if (!querySearch) {
    return <p>No search query</p>;
  }

  const filtersArray = Object.entries(filters).map(([optionTitle, values]) => ({
    optionTitle,
    values: typeof values === "string" ? (values as string).split(",") : [],
  }));
  return (
    <Suspense fallback={<LoadingContentSearchPage />}>
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-4">
        {/* Filter Component */}
        <div className="hidden lg:block">
          <FilterContent
            querySearch={querySearch}
            filtersArray={filtersArray}
          />
        </div>
        {/* Best Sellers */}
        <div className="relative">
          <SliderComponentContent
            sortSearch={sortSearch}
            querySearch={querySearch}
            filtersArray={filtersArray}
          />
        </div>
      </div>
    </Suspense>
  );
};

export default Page;
