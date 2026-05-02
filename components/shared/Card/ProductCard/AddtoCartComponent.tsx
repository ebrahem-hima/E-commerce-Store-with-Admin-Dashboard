import { Button } from "@/components/ui/button";
import { useProductContext } from "@/context/productContext";
import { handleAddToCart } from "@/lib/userCartFn";
import { cn } from "@/lib/utils";
import { typeProduct } from "@/types/productTypes";
import { Trash2 } from "lucide-react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import AddProductModal from "./AddProductModal";
import { useState } from "react";

interface Props {
  item: typeProduct;
  isGrid?: boolean;
}

const AddToCartComponent = ({ item, isGrid }: Props) => {
  const { userId, setCartData, setOpenCart, cartData } = useProductContext();

  const [openProductModal, setOpenProductModal] = useState(false);

  const isOutOfStock = item.stock === 0;
  const isExist = cartData.some((cartItem) => cartItem.id === item.id);
  const hasOptions = item.options && item.options.length > 0;

  const actionType = !isExist
    ? hasOptions
      ? "openModal"
      : "add"
    : hasOptions
      ? "openModal"
      : "viewCart";

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

          if (actionType === "viewCart") {
            setOpenCart(true);
            return;
          }

          if (actionType === "openModal") {
            setOpenProductModal(true);
            return;
          }

          handleAddToCart({
            item,
            userId: userId || "",
            quantity: 1,
            getOptions: item.options || [],
            cartData,
            setCartData,
            isExist,
            setOpenProductModal,
            setOpenCart,
          });
        }}
        className={cn(
          "addProduct transition-all duration-300",
          isGrid ? "w-[80%]!" : "w-full",
          item.stock > 0
            ? "bg-black text-white hover:bg-zinc-800"
            : "bg-gray-500 text-white cursor-not-allowed",
        )}
      >
        <span className="text-sm max-400:text-[12px]">
          {item.stock > 0
            ? !isExist
              ? hasOptions
                ? "Add to Cart"
                : "Add to Cart"
              : hasOptions
                ? "Add More"
                : "View In Cart"
            : "Out Of Stock"}
        </span>

        <span className="shrink-0">
          {item.stock > 0 ? (
            <MdOutlineAddShoppingCart size={20} />
          ) : (
            <Trash2 size={22} />
          )}
        </span>
      </Button>
      {openProductModal && (
        <AddProductModal
          item={item}
          isOpen={openProductModal}
          onClose={() => setOpenProductModal(false)}
          setCartData={setCartData}
          cartData={cartData}
          userId={userId || ""}
        />
      )}
    </div>
  );
};

export default AddToCartComponent;
