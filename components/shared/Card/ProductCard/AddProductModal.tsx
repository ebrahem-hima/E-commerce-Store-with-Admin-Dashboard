"use client";

import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { typeProduct, optionType } from "@/types/productTypes";
import { AlertCircle } from "lucide-react";
import { MESSAGES } from "@/lib/message";
import { AddToCart } from "@/lib/userCartFn";
import { IfProductExist } from "@/lib/utils";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import PriceDisplay from "../../priceDisplay";
import QuantityControl from "@/app/(root)/productDetails/components/productDescriptionComponents/QuantityControl";

interface QuickAddModalProps {
  item: typeProduct;
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  setCartData: Dispatch<SetStateAction<typeProduct[]>>;
  cartData: typeProduct[];
}

const AddProductModal = ({
  item,
  isOpen,
  onClose,
  userId,
  setCartData,
  cartData,
}: QuickAddModalProps) => {
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);

  const handleSelectChange = (title: string, value: string) => {
    setSelections((prev) => ({
      ...prev,
      [title]: value,
    }));
  };

  const handleConfirmAdd = () => {
    const productOptions = item.options || [];
    const allSelected = productOptions.every(
      (opt) => selections[opt.optionTitle],
    );

    if (!allSelected) {
      toast.error(MESSAGES.cart.SELECT_ALL_OPTIONS, {
        icon: <AlertCircle className="text-red-500" />,
      });
      return;
    }

    const formattedOptions: optionType[] = Object.entries(selections).map(
      ([title, value]) => ({
        optionTitle: title,
        values: [value],
      }),
    );
    const isExist = IfProductExist(cartData, formattedOptions, item);
    AddToCart({
      item,
      userId,
      quantity,
      getOptions: formattedOptions,
      setCartData,
      cartData,
      isExist,
    });
    if (isExist) return;
    onClose();
    setSelections({});
    setQuantity(1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] sm:max-w-125 p-4 sm:p-6 max-h-[90vh] overflow-y-auto rounded-lg border-none">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-bold">
            Quick Select
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 py-2 sm:py-4">
          <div className="relative aspect-square w-full max-w-50 mx-auto md:max-w-none rounded-md overflow-hidden">
            <Image
              src={item.img}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-3 sm:gap-4">
            <div>
              <h3 className="font-semibold text-base sm:text-lg line-clamp-2">
                {item.name}
              </h3>
              <PriceDisplay
                price={item.price}
                discount={item.discount}
                discountType={item.discount_type}
                isProduct
              />
            </div>

            <div className="space-y-3 sm:space-y-4">
              {item.options?.map((option) => (
                <div key={option.optionTitle} className="space-y-1">
                  <label className="text-xs sm:text-sm font-medium text-gray-700">
                    {option.optionTitle}
                  </label>
                  <Select
                    onValueChange={(val) =>
                      handleSelectChange(option.optionTitle, val)
                    }
                    value={selections[option.optionTitle] || ""}
                  >
                    <SelectTrigger className="w-full h-9 sm:h-10 text-sm">
                      <SelectValue
                        placeholder={`Select ${option.optionTitle}`}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {option.values?.map((val) => (
                        <SelectItem key={val} value={val} className="text-sm">
                          {val}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row sm:items-center gap-3 mt-4">
          <QuantityControl
            quantity={quantity}
            setQuantity={setQuantity}
            stock={item.stock}
          />
          <Button
            type="button"
            onClick={handleConfirmAdd}
            className={"addProduct h-8! mt-0!"}
          >
            Add to Cart
            <MdOutlineAddShoppingCart size={22} />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
