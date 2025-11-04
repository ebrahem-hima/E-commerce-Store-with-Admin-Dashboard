import { useProductContext } from "@/context/productContext";
import {
  addGuestCartItems,
  AddToCart,
  handleDeleteProductCart,
} from "@/lib/userCartFn";
import { typeProduct } from "@/types/productTypes";
import { Trash2 } from "lucide-react";
import { MouseEvent } from "react";
import { MdOutlineAddShoppingCart } from "react-icons/md";

interface Props {
  isExist: boolean;
  item: typeProduct;
}

const AddToCartComponent = ({ isExist, item }: Props) => {
  const { setIsCartDataUpdated, userId, setCartData, cartData } =
    useProductContext();

  const handleAddToCart = async (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isExist) {
      await handleDeleteProductCart({
        ID: item.product_id,
        name: item.name,
        setIsCartDataUpdated,
        userId: userId || "",
        setCartData,
      });
      return;
    }
    if (userId) {
      await AddToCart({
        item,
        userId: userId || "",
        setIsCartDataUpdated,
        cartData,
        setCartData,
      });
    } else {
      addGuestCartItems({
        setCartData,
        item,
        setIsCartDataUpdated,
      });
    }
  };
  return (
    <div
      onClick={handleAddToCart}
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
