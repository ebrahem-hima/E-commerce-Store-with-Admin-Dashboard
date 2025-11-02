import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import "../Card/Card.css";
import { HiOutlineHeart } from "react-icons/hi2";
import { HiMiniHeart } from "react-icons/hi2";
import { addGuestCartItems, AddToCart } from "@/lib/userCartFn";
import { addWishList } from "@/lib/userWishlistFn";
import { toast } from "sonner";
import { typeProduct } from "../../../types/productTypes";

interface Props {
  setCount: React.Dispatch<React.SetStateAction<number>>;
  count: number;
  item: typeProduct;
  setHeart: React.Dispatch<React.SetStateAction<boolean>>;
  userId?: string;
  heart: boolean;
  setIsCartDataUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  cartData: typeProduct[];
  setCartData: React.Dispatch<React.SetStateAction<typeProduct[]>>;
  getOptions: { optionTitle: string; values: string[] }[];
}

const Counter = ({
  setCount,
  count,
  item,
  userId,
  setHeart,
  heart,
  setIsCartDataUpdated,
  cartData,
  setCartData,
  getOptions,
}: Props) => {
  const { active, stock } = item;
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
        className="w-fit text-[15px] px-6 rounded-sm hover:bg-hover duration-300"
        onClick={async (e) => {
          e.preventDefault();
          if (userId) {
            await AddToCart({
              item,
              userId: userId || "",
              count,
              setIsCartDataUpdated,
              cartData,
              setCartData,
              getOptions,
            });
          } else {
            addGuestCartItems({
              setCartData,
              item,
              count,
              getOptions,
            });
          }
        }}
      >
        Buy Now
      </Button>
      <button onClick={() => setHeart((prev) => !prev)}>
        {heart ? (
          <HiMiniHeart
            size={33}
            className="text-primary cursor-pointer border border-[#777] rounded-sm p-1"
            onClick={() => addWishList(item, "remove", userId || "")}
          />
        ) : (
          <HiOutlineHeart
            size={33}
            className="cursor-pointer border border-[#777] rounded-sm p-1"
            onClick={() => addWishList(item, "add", userId || "")}
          />
        )}
      </button>
    </div>
  );
};

export default Counter;
