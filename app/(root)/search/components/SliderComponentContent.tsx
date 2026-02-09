import { getSearchProducts } from "../services/fetchProducts";
import SliderClientComponent from "@/components/shared/SliderComponent/SliderClientComponent";
import SearchProduct from "../SearchProduct";
import SearchFilterMobile from "../searchFilterMobile";
interface Props {
  querySearch: string;
  sortSearch?: string;
  filtersArray: { optionTitle: string; values: string[] }[];
}
const SliderComponentContent = async ({
  querySearch,
  filtersArray,
  sortSearch,
}: Props) => {
  const { bestSellersProducts, otherProducts, mergeArray } =
    await getSearchProducts({
      querySearch,
      filters: filtersArray,
      sort: sortSearch,
    });

  return (
    <div>
      <div className="flex flex-col gap-4">
        {bestSellersProducts.length > 0 && (
          <SliderClientComponent
            titleComponent="Best Sellers"
            Product={bestSellersProducts}
            search={true}
          />
        )}
        {/* Products + Sort by */}
        {otherProducts.length > 0 && <SearchProduct products={otherProducts} />}
      </div>
      <SearchFilterMobile filter={mergeArray} />
    </div>
  );
};

export default SliderComponentContent;
