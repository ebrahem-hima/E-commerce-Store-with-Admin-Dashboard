import { Suspense } from "react";
import HeroImageFilters from "../HeroImageWithFiltersContent/HeroImageWithFiltersContent";
import LoadingSpinner from "../Loaders/LoadingSpinner";

const HeroImageFilter = async () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HeroImageFilters />
    </Suspense>
  );
};

export default HeroImageFilter;
