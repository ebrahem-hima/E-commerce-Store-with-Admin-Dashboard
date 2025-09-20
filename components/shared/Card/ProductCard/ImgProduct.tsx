import Image from "next/image";
import { IoEyeOutline } from "react-icons/io5";
import { HiOutlineHeart } from "react-icons/hi2";
import { typeProduct } from "../../../../types/productTypes";
import "../Card.css";
import { AddToCart, addWishList } from "@/lib/utils";
import { useProductContext } from "../../../../context/productContext";
import { Trash2 } from "lucide-react";

interface Props {
  type?: string;
  item: typeProduct;
}

const ImgProduct = ({ item, type }: Props) => {
  const { name, discount, price, discount_type, img } = item;
  const discountPercentage = ((discount! / price) * 100).toFixed(0);
  const { setWishList, wishList, setCartData, cartData } = useProductContext();
  const handleDeleteItemWishList = (id: string) => {
    setWishList((prev) => prev.filter((item) => item.id !== id));
  };

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
        {type === "wishList" ? (
          <Trash2
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleDeleteItemWishList(item.id);
            }}
            className="iconImg hover:bg-primary hover:text-white duration-300 p-0.5 rounded-[4px]"
            size={23}
          />
        ) : (
          <HiOutlineHeart
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              addWishList({ type: "add", item, setWishList, wishList });
            }}
            size={24}
            className="iconImg hover:bg-primary hover:text-white duration-300 p-0.5 rounded-[4px]"
          />
        )}
        <IoEyeOutline
          size={24}
          className="iconImg hover:bg-primary hover:text-white duration-300 p-0.5 rounded-[4px]"
        />
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
      <div
        onClick={(e) => {
          e.preventDefault();
          AddToCart({ item, setCartData, cartData });
        }}
        className="addProduct group-hover:bottom-0"
      >
        Add to Cart
      </div>
    </div>
  );
};

export default ImgProduct;
