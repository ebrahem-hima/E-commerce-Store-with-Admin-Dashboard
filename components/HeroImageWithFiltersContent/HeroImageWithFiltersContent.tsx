import Filters from "./Filters";
import fetchProductsCategories from "@/app/(root)/(home)/services/fetch-products-categories";
import fetchHeroBanners from "@/app/(root)/(home)/services/fetch-hero-banners";
import HeroBanners from "./HeroBanners";

const HeroImageFilters = async () => {
  const data = await fetchProductsCategories();
  const hero_banners = await fetchHeroBanners();
  if (!data || data.length === 0) return null;

  return (
    <div className="grid gap-10 grid-cols-[280px_1fr] h-70 items-start max-lg:grid-cols-1 w-full">
      <Filters filter={data} />
      <HeroBanners hero_banners={hero_banners} />
    </div>
  );
};

export default HeroImageFilters;
