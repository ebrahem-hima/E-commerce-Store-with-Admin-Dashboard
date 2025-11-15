import { useProductContext } from "@/context/productContext";
import { handleAddToCart } from "@/lib/userCartFn";
import { typeProduct } from "@/types/productTypes";
import { Trash2 } from "lucide-react";
import { MdOutlineAddShoppingCart } from "react-icons/md";

interface Props {
  isExist: boolean;
  item: typeProduct;
}

const AddToCartComponent = ({ isExist, item }: Props) => {
  const { setIsCartDataUpdated, userId, setCartData, cartData } =
    useProductContext();

  return (
    <div
      onClick={(e) =>
        handleAddToCart({
          e,
          userId: userId || "",
          isExist,
          setIsCartDataUpdated,
          setCartData,
          cartData,
          item,
        })
      }
      className={`addProduct ${isExist ? "bg-red-900" : "bg-black"}`}
    >
      {isExist ? (
        <div className="flex gap-2 items-center text-sm">
          <span>Remove from cart</span>
          <Trash2 />
        </div>
      ) : (
        <div className="flex gap-2 items-center text-sm">
          <span>Add to Cart</span>
          <MdOutlineAddShoppingCart size={22} />
        </div>
      )}
    </div>
  );
};

export default AddToCartComponent;
