import { Button } from "@/components/ui/button";
import { useProductContext } from "@/context/productContext";
import { handleAddToCart } from "@/lib/userCartFn";
import { cn } from "@/lib/utils";
import { typeProduct } from "@/types/productTypes";
import { Trash2 } from "lucide-react";
import { MdOutlineAddShoppingCart } from "react-icons/md";

const AddToCartComponent = ({ item }: { item: typeProduct }) => {
  const { userId, setCartData, cartData } = useProductContext();

  const isExist = cartData.some(
    (cartItem: typeProduct) => cartItem.id === item.id,
  );

  const isOutOfStock = item.stock === 0;
  return (
    <div
      className={`w-full ${isOutOfStock ? "cursor-not-allowed" : ""}`}
      onClick={(e) => e.preventDefault()}
    >
      <Button
        disabled={isOutOfStock}
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleAddToCart({
            userId: userId || "",
            isExist,
            setCartData,
            cartData,
            item,
          });
        }}
        className={cn(
          "addProduct",
          isExist && "bg-red-900 hover:bg-[#810505]",
          !isExist && "bg-black hover:bg-black",
          isOutOfStock && "bg-red-900/75",
        )}
      >
        <span className="text-sm max-400:text-[12px]">
          {item.stock > 0
            ? isExist
              ? "Remove From Cart"
              : "Add to Cart"
            : "Out Of Stock"}
        </span>

        <span>
          {isExist ? (
            <Trash2 size={18} />
          ) : (
            <MdOutlineAddShoppingCart size={22} />
          )}
        </span>
      </Button>
    </div>
  );
};

export default AddToCartComponent;
