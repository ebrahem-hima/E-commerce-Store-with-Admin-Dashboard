import HeroImageFilter from "@/components/shared/HeroImageFilter";
import HomeIcons from "@/components/shared/HomeIcons";
import SliderComponent from "@/components/shared/SliderComponent/SliderComponent";
import { components } from "@/constant/product";
const Page = () => {
  return (
    <div className="grid gap-y-18">
      {/* Filter And Hero Image */}
      <HeroImageFilter />
      {/* Component Category */}
      <SliderComponent
        type="category"
        titleComponent="Browse By Category"
        Product={[]}
        category=""
      />
      {components.map((component) => (
        <SliderComponent
          key={component.component_id}
          titleComponent={component.title}
          Product={component.products}
          category={component.category}
        />
      ))}

      <HomeIcons />
    </div>
  );
};

export default Page;
