import React, { Suspense } from "react";
import SliderComponent from "./SliderComponent";
import fetchProductsCategories from "@/app/(root)/(home)/services/fetch-products-categories";
import { SliderSkeleton } from "@/components/Loaders/SliderSkeleton";

const SliderComponentWrapper = async () => {
  const data = await fetchProductsCategories();
  if (!data || data.length === 0) return null;
  return (
    <>
      {data?.map((cat: { name: string; id: number }) => (
        <Suspense key={cat.id} fallback={<SliderSkeleton />}>
          <SliderComponent categoryId={cat.id} titleComponent={cat.name} />
        </Suspense>
      ))}
    </>
  );
};

export default SliderComponentWrapper;
