import ImgProductDetails from "@/components/shared/productDetails/ImgProductDetails";
import DescriptionProductDetails from "@/components/shared/productDetails/DescriptionProductDetails";
import SliderComponent from "@/components/shared/SliderComponent/SliderComponent";
import { createClient } from "@/app/utils/supabase/server";
import notFound from "@/app/not-found";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  const supabase = await createClient();
  const { data: productDetail } = await supabase
    .from("products")
    .select()
    .eq("id", id)
    .single();

  if (!productDetail) {
    return notFound();
  }
  const { data: relatedProductsDB } = await supabase
    .from("products")
    .select()
    .eq("category_id", productDetail.category_id);

  const relatedProducts = relatedProductsDB?.filter(
    (p) => p.id !== productDetail.id,
  );
  return (
    <div className="mt-10">
      <div className="grid grid-cols-[1fr_350px] gap-2 max-tablet:grid-cols-1! mb-6">
        {/* productImg + imgGallery */}
        <ImgProductDetails item={productDetail} />
        <DescriptionProductDetails item={productDetail} />
      </div>
      <SliderComponent
        search={false}
        titleComponent="Related Item"
        Product={relatedProducts || []}
      />
    </div>
  );
};

export default Page;
