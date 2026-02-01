import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import "../Card/Card.css";
import { HiOutlineHeart } from "react-icons/hi2";
import { HiMiniHeart } from "react-icons/hi2";
import { handleAddToCart } from "@/lib/userCartFn";
import {
  addWishList,
  handleDeleteItemWishList,
  isInWishList,
} from "@/lib/userWishlistFn";
import { toast } from "sonner";
import { optionType, typeProduct } from "../../../types/productTypes";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useEffect, useState } from "react";
import { MESSAGES } from "@/lib/message";

interface Props {
  setCount: React.Dispatch<React.SetStateAction<number>>;
  count: number;
  item: typeProduct;
  userId?: string;
  cartData: typeProduct[];
  setCartData: React.Dispatch<React.SetStateAction<typeProduct[]>>;
  getOptions: optionType[];
}

const Counter = ({
  setCount,
  count,
  item,
  userId,
  cartData,
  setCartData,
  getOptions,
}: Props) => {
  const { active, stock } = item;

  const [heart, setHeart] = useState(false);
  useEffect(() => {
    isInWishList({ item, setHeart });
  }, [item]);

  const handleMaxCount = () => {
    setCount((c) => {
      if (!active) {
        toast.error("Product is out of stock");
        return c;
      }
      if (c === stock) {
        toast.info("Sorry, no more stock available");
        return c;
      }
      return c + 1;
    });
  };
  const [isExist, setIsExist] = useState(false);
  console.log("cartData", cartData);

  useEffect(() => {
    const exist = cartData.some(
      (cartItem: typeProduct) => cartItem.id === item.id,
    );
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsExist(exist);
  }, [cartData, item.id]);

  const toggleWishlist = async () => {
    if (!userId) return toast.info(MESSAGES.wishlist.loginRequired);
    if (!heart) {
      await addWishList({
        item,
        userId: userId || "",
      });
      setHeart(true);
    } else {
      await handleDeleteItemWishList(item.id, item.name);
      setHeart(false);
    }
  };
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center w-fit rounded-sm">
        <button
          onClick={() => setCount((c) => Math.max(1, c - 1))}
          className="cursor-pointer active:text-white active:border-primary active:bg-primary hover:text-white flex-center h-8 w-8 border border-[#777] hover:bg-primary hover:border-primary rounded-l-[3px] duration-200"
        >
          <Minus size={17} />
        </button>

        <span className="flex-center w-13 text-center border-t border-b h-8  border-[#777]">
          {count}
        </span>
        <button
          className="cursor-pointer active:text-white active:border-primary active:bg-primary hover:text-white flex-center h-8 w-8 border border-[#777] hover:bg-primary hover:border-primary rounded-r-[3px] duration-200"
          onClick={handleMaxCount}
        >
          <Plus size={17} />
        </button>
      </div>
      <Button
        size="sm"
        disabled={!active}
        className={`w-fit hover:opacity-85! text-[15px] px-3 rounded-sm 
          ${
            stock === 0
              ? "bg-red-900"
              : isExist
                ? "bg-red-900 hover:bg-[#9c2929] duration-200"
                : "bg-black hover:bg-[#000000ea] duration-200"
          }
          `}
        onClick={(e) => {
          e.preventDefault();
          handleAddToCart({
            userId: userId || "",
            isExist,
            setCartData,
            cartData,
            item,
            getOptions,
          });
        }}
      >
        {/* Buy Now */}
        {stock === 0 ? (
          <span>Out of Stock</span>
        ) : isExist ? (
          <div className="flex gap-2 items-center text-sm">
            <span>Remove from cart</span>
            <Trash2 />
          </div>
        ) : (
          <div className="flex gap-2 items-center text-sm">
            <span>Add to Cart</span>
            <MdOutlineAddShoppingCart className="h-5.5! w-5.5!" />
          </div>
        )}
      </Button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          toggleWishlist();
        }}
      >
        {heart ? (
          <HiMiniHeart
            size={33}
            className="text-primary cursor-pointer border border-[#777] rounded-sm p-1"
          />
        ) : (
          <HiOutlineHeart
            size={33}
            className="cursor-pointer border border-[#777] rounded-sm p-1"
          />
        )}
      </button>
    </div>
  );
};

export default Counter;
