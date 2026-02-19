"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { typeGetCoupon } from "../types/typeAliases";
import useUserCart from "../app/FetchData/useUserCart";
import AuthFn from "@/app/FetchData/authFn";
import GetProfile from "../app/FetchData/getProfile";
import { ProductContextType } from "../types/contextType";

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Provider
export const ProductProvider = ({
  initialUser,
  children,
}: {
  initialUser: string | null;
  children: ReactNode;
}) => {
  // -------------- Start Auth --------------
  const { isAuth, setIsAuth } = AuthFn();
  // -------------- End Auth --------------

  // -------------- Start CartShop --------------
  const { cartData, setCartData, total, userCartLoading } = useUserCart({
    isAuth,
    userId: initialUser || "",
  });
  // -------------- End CartShop --------------

  // -------------- Start  Fetch User Profile --------------
  const { profileData, setProfileData, profileLoading } = GetProfile({
    isAuth,
    userId: initialUser || "",
  });
  // -------------- End Fetch User Profile --------------

  // -------------- Start Coupon --------------
  const [getCoupon, setGetCoupon] = useState<typeGetCoupon | null>(null);
  // -------------- End Coupon --------------

  const values = {
    userId: initialUser,

    profileData,
    setProfileData,

    profileLoading,

    cartData,
    setCartData,

    getCoupon,
    setGetCoupon,

    isAuth,
    setIsAuth,

    total,
    userCartLoading,
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
