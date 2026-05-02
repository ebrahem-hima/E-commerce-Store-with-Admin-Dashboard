"use client";

import { handleUpdateQuantity } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface QuantityControlProps {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  stock: number;
}

const QuantityControl = ({
  quantity,
  setQuantity,
  stock,
}: QuantityControlProps) => {
  return (
    <div className="flex items-center w-fit rounded-sm">
      <button
        aria-label="Decrease quantity"
        onClick={() =>
          handleUpdateQuantity({ type: "dec", setQuantity, quantity, stock })
        }
        className="cursor-pointer active:text-white active:border-primary active:bg-primary hover:text-white flex-center h-8 w-8 border border-[#777] hover:bg-primary hover:border-primary rounded-l-[3px] duration-200"
      >
        <Minus size={17} />
      </button>

      <span className="flex-center w-13 text-center border-t border-b h-8 border-[#777]">
        {quantity}
      </span>

      <button
        aria-label="Increase quantity"
        onClick={() =>
          handleUpdateQuantity({ type: "inc", setQuantity, quantity, stock })
        }
        className="cursor-pointer active:text-white active:border-primary active:bg-primary hover:text-white flex-center h-8 w-8 border border-[#777] hover:bg-primary hover:border-primary rounded-r-[3px] duration-200"
      >
        <Plus size={17} />
      </button>
    </div>
  );
};

export default QuantityControl;
