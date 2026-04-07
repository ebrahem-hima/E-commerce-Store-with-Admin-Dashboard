import { Suspense } from "react";
import HeroImageFilters from "./HeroImageWithFiltersContent";
import HeroImageLoader from "./HeroImageLoader";

const HeroImageFilter = async () => {
  return (
    <Suspense fallback={<HeroImageLoader />}>
      <HeroImageFilters />
    </Suspense>
  );
};

export default HeroImageFilter;
