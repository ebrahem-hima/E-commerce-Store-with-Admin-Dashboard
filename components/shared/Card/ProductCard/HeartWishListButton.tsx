import { Button } from "@/components/ui/button";
import { useProductContext } from "@/context/productContext";
import { MESSAGES } from "@/lib/message";
import { addWishList, isProductWishList } from "@/lib/userWishlistFn";
import { typeProduct } from "@/types/productTypes";
import { useEffect, useState } from "react";
import { HiMiniHeart, HiOutlineHeart } from "react-icons/hi2";
import { toast } from "sonner";

const HeartWishListButton = ({
  item,
  toggleProducts,
  isProductSlider,
}: {
  item: typeProduct;
  toggleProducts?: (productId: string) => void;
  isProductSlider?: boolean;
}) => {
  const { userId } = useProductContext();
  const [isWishList, setIsWishList] = useState(false);

  useEffect(() => {
    const isExist = async () => {
      const exist = await isProductWishList({ productId: item.id });
      setIsWishList(exist || false);
    };
    isExist();
  }, [item.id]);

  return (
    <div
      className={`flex flex-col ${isProductSlider ? "absolute" : ""}  items-center top-2 right-2`}
    >
      <Button
        variant="link"
        className={`${isProductSlider ? "p-0" : "p-1! border border-[#777] rounded-sm"} p-0`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!userId) return toast.info(MESSAGES.wishlist.loginRequired);
          addWishList({
            item,
            userId: userId || "",
            setHeart: setIsWishList,
          });
          // for delete product from wishlist page instantly
          toggleProducts?.(item.id);
        }}
      >
        {isWishList ? <HiMiniHeart size={25} /> : <HiOutlineHeart size={25} />}
      </Button>
    </div>
  );
};

export default HeartWishListButton;
