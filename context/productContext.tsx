"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { typeIsOpen, typeProduct } from "../types/productTypes";

interface ProductContextType {
  isOpen: typeIsOpen;
  setIsOpen: React.Dispatch<React.SetStateAction<typeIsOpen>>;

  cartData: typeProduct[];
  setCartData: Dispatch<SetStateAction<typeProduct[]>>;
}
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Provider
export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<typeIsOpen>({
    filter: false,
    searchNavbar: false,
  });
  const [dataTable, setDataTable] = useState();
  const [cartData, setCartData] = useState<typeProduct[]>([]);
  const values = {
    isOpen,
    setIsOpen,
    dataTable,
    setDataTable,
    cartData,
    setCartData,
  };
  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
