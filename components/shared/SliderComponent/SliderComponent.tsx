import { SliderComponentType } from "../../../types/productTypes";
import "../Card/Card.css";
import { createClient } from "@/app/utils/supabase/server";
import SliderClientComponent from "./SliderClientComponent";

const SliderComponent = async ({
  titleComponent,
  search = false,
  categoryId,
  Product,
}: SliderComponentType) => {
  const supabase = await createClient();

  const products =
    Product ??
    (categoryId
      ? (await supabase.from("products").select().eq("category_id", categoryId))
          .data
      : undefined);

  if (products?.length === 0) return null;
  return (
    <div className="flex-center">
      <SliderClientComponent
        titleComponent={titleComponent}
        Product={products || undefined}
        search={search}
      />
    </div>
  );
};

export default SliderComponent;
