import HeroImageFilter from "@/components/shared/HeroImageFilter";
import HomeIcons from "@/components/shared/HomeIcons";
import CategoryComponent from "@/components/shared/SliderComponent/CategoryComponent";
import { Suspense } from "react";
import SliderComponentWrapper from "@/components/shared/SliderComponent/SliderComponentWrapper";
import { SliderSkeleton } from "@/components/Loaders/SliderSkeleton";
const Page = async () => {
  return (
    <div className="grid gap-y-18">
      {/* Filter And Hero Image */}
      <HeroImageFilter />
      <Suspense fallback={<SliderSkeleton />}>
        <CategoryComponent />
      </Suspense>
      <SliderComponentWrapper />
      <HomeIcons />
    </div>
  );
};

export default Page;
