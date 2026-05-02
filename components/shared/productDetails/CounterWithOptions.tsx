import { typeProduct } from "@/types/productTypes";
import Options from "./Options";
import Counter from "./Counter";

const CounterWithOptions = ({ item }: { item: typeProduct }) => {
  return (
    <>
      <Options options={item.options || []} />
      {/* Counter + buy + wishlist */}
      <Counter item={item} />
    </>
  );
};

export default CounterWithOptions;
