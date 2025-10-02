"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { typeIsOpen } from "../types/productTypes";
import { chooseComponentType } from "../types/typeAliases";

interface ProductContextType {
  isOpen: typeIsOpen;
  setIsOpen: React.Dispatch<React.SetStateAction<typeIsOpen>>;

  isProductAdded: boolean;
  setIsProductAdded: Dispatch<SetStateAction<boolean>>;

  chooseComponent: chooseComponentType;
  setChooseComponent: Dispatch<SetStateAction<chooseComponentType>>;

  wishListStatus: { isAdded: boolean; isDeleted: boolean };
  setWishListStatus: Dispatch<
    SetStateAction<{ isAdded: boolean; isDeleted: boolean }>
  >;
}
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Provider
export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<typeIsOpen>({
    filter: false,
    searchNavbar: false,
  });
  // to switch between profile, address, orders
  const [chooseComponent, setChooseComponent] =
    useState<chooseComponentType>("MyProfile");
  const [isProductAdded, setIsProductAdded] = useState(false);
  const [wishListStatus, setWishListStatus] = useState({
    isAdded: false,
    isDeleted: false,
  });

  const values = {
    isOpen,
    setIsOpen,
    isProductAdded,
    setIsProductAdded,
    wishListStatus,
    setWishListStatus,
    chooseComponent,
    setChooseComponent,
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
