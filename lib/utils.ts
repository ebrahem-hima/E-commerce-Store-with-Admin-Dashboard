import { optionType, typeProduct } from "@/types/productTypes";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { MESSAGES } from "./message";
import { toast } from "sonner";
import { handleUpdateQuantityProps } from "@/types/type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // شهور تبدأ من 0
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
export function formatDateForPostgres(date: string | Date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0"); // شهور تبدأ من 0
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withLock<T extends (...args: any[]) => Promise<any>>(fn: T) {
  let isRunning = false;

  return async (...args: Parameters<T>): Promise<ReturnType<T> | void> => {
    const e = args[0]?.e;
    e?.stopPropagation();
    e?.preventDefault();

    if (isRunning) return;
    isRunning = true;

    try {
      return await fn(...args);
    } finally {
      isRunning = false;
    }
  };
}

export function IfProductExist(
  cartData: typeProduct[],
  getOptions: optionType[],
  item: typeProduct,
) {
  const checkIfOptionsMatch = (
    cartItemOptions: optionType[],
    selectedOptions: optionType[],
  ) => {
    if (cartItemOptions.length !== selectedOptions.length) return false;

    return cartItemOptions.every((cartOpt) => {
      const found = selectedOptions.find(
        (selOpt) =>
          selOpt.optionTitle === cartOpt.optionTitle &&
          selOpt.values?.[0] === cartOpt.values?.[0],
      );
      return !!found;
    });
  };
  const isExist = cartData.some((cartItem: typeProduct) => {
    const isSameId = cartItem.id === item.id;
    const isSameOptions = checkIfOptionsMatch(
      cartItem.selected_options || [],
      getOptions,
    );

    return isSameId && isSameOptions;
  });
  return isExist;
}

export function handleUpdateQuantity({
  type,
  setQuantity,
  quantity,
  stock,
}: handleUpdateQuantityProps) {
  if (type === "inc") {
    if (quantity >= stock) {
      toast.info(MESSAGES.cart.maximum_stock);
      return;
    }
    setQuantity((prev: number) => prev + 1);
  } else {
    setQuantity((prev: number) => Math.max(1, prev - 1));
  }
}
