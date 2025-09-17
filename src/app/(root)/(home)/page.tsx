import HeroImageFilter from "../../../../components/shared/HeroImageFilter";
import SliderComponent from "../../../../components/shared/SliderComponent/SliderComponent";
import { components } from "../../../../constant/product";
const page = () => {
  return (
    <div className="grid gap-y-18">
      {/* Filter And Hero Image */}
      <HeroImageFilter />
      {/* <div className="mb-60"></div> */}
      {/* Component Category */}
      <SliderComponent
        type="category"
        titleComponent="Browse By Category"
        Product={[]}
        category=""
      />
      {components.map((component) => (
        <SliderComponent
          key={component.id}
          titleComponent={component.title}
          Product={component.products}
          category={component.category}
        />
      ))}
    </div>
  );
};

export default page;
