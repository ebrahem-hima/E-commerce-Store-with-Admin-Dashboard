"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { typeIsOpen } from "../types/productTypes";
import { typeGetCoupon } from "../types/typeAliases";
import useUserCart from "../app/FetchData/useUserCart";
import AuthFn from "@/app/FetchData/authFn";
import UserOrdersFn from "../app/FetchData/userOrdersFn";
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
  const [isOpen, setIsOpen] = useState<typeIsOpen>({
    filter: false,
    searchNavbar: false,
  });

  // -------------- Start UserId --------------

  const { isAuth, setIsAuth } = AuthFn();
  // -------------- End UserId --------------

  // -------------- Start UserOrders --------------
  const [isUserOrderUpdated, setIsUserOrderUpdated] = useState(false);
  const { userOrders } = UserOrdersFn(isUserOrderUpdated);

  // -------------- End UserOrders --------------

  // -------------- Start CartShop --------------
  const { cartData, setCartData, total, userCartLoading } = useUserCart({
    isAuth,
    userId: initialUser || "",
  });
  // -------------- End CartShop --------------

  // -------------- Start  Fetch User Profile --------------

  const [isProfileChange, setIsProfileChange] = useState({
    address: false,
    profile: false,
  });

  const { profileData, setProfileData } = GetProfile({
    isProfileChange,
    isAuth,
  });

  // -------------- End Fetch User Profile --------------

  // -------------- Start Coupon --------------
  const [getCoupon, setGetCoupon] = useState<typeGetCoupon | null>(null);
  // -------------- End Coupon --------------

  const values = {
    isOpen,
    setIsOpen,
    userId: initialUser,
    profileData,
    setProfileData,
    isProfileChange,
    setIsProfileChange,

    cartData,
    setCartData,

    // to update userOrder instantly
    isUserOrderUpdated,
    setIsUserOrderUpdated,

    userOrders,

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
