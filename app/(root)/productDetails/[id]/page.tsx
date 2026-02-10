import { Suspense } from "react";
import ProductDetailsContent from "../components/ProductDetailsContnet";
import SliderComponentWrapper from "../components/SliderComponentWrapper";
import { ProductDetailsSkeleton } from "../components/ProductDetailsSkeleton";
import { SliderSkeleton } from "@/components/Loaders/SliderSkeleton";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  return (
    <div className="mt-10">
      {/* productImg + imgGallery */}
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetailsContent productId={id} />
      </Suspense>
      <Suspense fallback={<SliderSkeleton />}>
        <SliderComponentWrapper productId={id} />
      </Suspense>
    </div>
  );
};

export default Page;
