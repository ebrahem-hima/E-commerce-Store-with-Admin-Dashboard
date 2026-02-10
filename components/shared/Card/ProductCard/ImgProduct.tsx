import Image from "next/image";
import "../Card.css";
import { typeProduct } from "@/types/productTypes";
import HeartWishListButton from "./HeartWishListButton";

interface Props {
  item: typeProduct;
  isGrid?: boolean;
  toggleProducts: (productId: string) => void;
}

const ImgProduct = ({ item, isGrid, toggleProducts }: Props) => {
  const { name, discount, price, discount_type, img } = item;
  const discountPercentage = ((discount! / price) * 100).toFixed(0);
  return (
    <div
      className={`group relative h-full w-full overflow-hidden flex-center ${
        isGrid && "w-1/2"
      } `}
    >
      <Image
        src={img}
        alt={`img-${name}`}
        width={200}
        height={200}
        className="object-contain p-6"
        sizes="100%"
        priority
        draggable={false}
      />

      <HeartWishListButton
        isProductSlider={true}
        item={item}
        toggleProducts={toggleProducts}
      />
      {discount !== 0 &&
        (discount_type === "percentage" ? (
          <span className="absolute text-[13px] px-2 py-0.5 top-2 left-2 rounded-sm bg-primary text-white">
            -{discount}%
          </span>
        ) : (
          <span className="absolute text-[13px] px-2 py-0.5 top-2 left-2 rounded-sm bg-primary text-white">
            -{discountPercentage}%
          </span>
        ))}
    </div>
  );
};

export default ImgProduct;
