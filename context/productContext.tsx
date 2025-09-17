"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { typeIsOpen } from "../types/productTypes";

interface ProductContextType {
  isOpen: typeIsOpen;
  setIsOpen: React.Dispatch<React.SetStateAction<typeIsOpen>>;
}
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Provider
export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<typeIsOpen>({
    filter: false,
    searchNavbar: false,
  });
  const values = { isOpen, setIsOpen };
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
