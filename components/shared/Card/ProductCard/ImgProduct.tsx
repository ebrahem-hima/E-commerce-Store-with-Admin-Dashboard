import Image from "next/image";
import { IoEyeOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { typeProduct } from "../../../../types/productTypes";
import "../Card.css";

const ImgProduct = ({ item }: { item: typeProduct }) => {
  const { name, discount, price, discount_type, img } = item;
  const discountPercentage = ((discount! / price) * 100).toFixed(0);

  return (
    <div className="group relative h-full overflow-hidden w-full flex-center">
      <Image
        src={img}
        alt={`img-${name}`}
        className="object-cover"
        width={100}
        height={100}
      />
      <div className="flex flex-col absolute top-2 right-2">
        <CiHeart size={26} className="iconImg" />
        <IoEyeOutline size={26} className="iconImg" />
      </div>
      {discount !== 0 &&
        (discount_type === "percentage" ? (
          <span className="absolute text-[13px] px-2 py-0.5 top-2 left-2 rounded-[4px] bg-primary text-white">
            -{discount}%
          </span>
        ) : (
          <span className="absolute text-[13px] px-2 py-0.5 top-2 left-2 rounded-[4px] bg-primary text-white">
            -{discountPercentage}%
          </span>
        ))}
      <div className="addProduct group-hover:bottom-0">Add to Cart</div>
    </div>
  );
};

export default ImgProduct;
