import { Button } from "@/components/ui/button";
import { useProductContext } from "@/context/productContext";
import { handleAddToCart } from "@/lib/userCartFn";
import { cn } from "@/lib/utils";
import { typeProduct } from "@/types/productTypes";
import { Trash2 } from "lucide-react";
// import { useMemo } from "react";
import { MdOutlineAddShoppingCart } from "react-icons/md";

interface Props {
  item: typeProduct;
  isGrid: boolean;
}

const AddToCartComponent = ({ item, isGrid }: Props) => {
  const { userId, setCartData, cartData } = useProductContext();

  const isExist = cartData.some(
    (cartItem: typeProduct) => cartItem.id === item.id,
  );
  // }, [cartData, item.id]);

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
          isGrid ? "w-[60%]!" : "w-full",
          isExist && "bg-red-900 hover:bg-[#810505]",
          !isExist && "bg-black hover:bg-black",
          isOutOfStock && "bg-red-900/75",
        )}
      >
        <span className="text-sm">
          {item.stock > 0
            ? isExist
              ? "Remove From Cart"
              : "Add to Cart"
            : "Out Of Stock"}
        </span>

        <span className="shrink-0">
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
