import HeroImageFilter from "@/components/shared/HeroImageFilter";
import HomeIcons from "@/components/shared/HomeIcons";
import SliderComponent from "@/components/shared/SliderComponent/SliderComponent";
import { createClient } from "@/app/utils/supabase/server";
import CategoryComponent from "@/components/shared/SliderComponent/CategoryComponent";
const Page = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("categories").select(`name,id`);
  if (error) console.error("Error fetching categories:", error);

  if (!data || data.length === 0) return null;
  return (
    <div className="grid gap-y-18">
      {/* Filter And Hero Image */}
      <HeroImageFilter filter={data} />
      {/* Component Category */}
      <CategoryComponent
        titleComponent="Browse By Category"
        categories={data}
      />
      {data?.map((cat: { name: string; id: number }) => (
        <SliderComponent
          key={cat.id}
          categoryId={cat.id}
          titleComponent={cat.name}
        />
      ))}
      <HomeIcons />
    </div>
  );
};

export default Page;
