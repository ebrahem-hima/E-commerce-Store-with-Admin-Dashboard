"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { typeIsOpen } from "../types/productTypes";
import { typeGetCoupon } from "../types/typeAliases";
import useUserCart from "../components/FetchData/useUserCart";
import AuthFn from "../components/FetchData/authFn";
import UserOrdersFn from "../components/FetchData/userOrdersFn";
import GetProfile from "../components/FetchData/getProfile";
import { ProductContextType } from "@/types/contextType";

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Provider
export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<typeIsOpen>({
    filter: false,
    searchNavbar: false,
  });
  const [wishListStatus, setWishListStatus] = useState(false);

  // -------------- Start UserId --------------

  const [isAuth, setIsAuth] = useState(false);
  const { user: userId, setUser } = AuthFn({ isAuth });
  // -------------- End UserId --------------

  // -------------- Start UserOrders --------------
  const [isUserOrderUpdated, setIsUserOrderUpdated] = useState(false);
  const { userOrders } = UserOrdersFn(isUserOrderUpdated);

  // -------------- End UserOrders --------------

  // -------------- Start CartShop --------------

  const [isCartDataUpdated, setIsCartDataUpdated] = useState(false);
  const { cartData, setCartData, total } = useUserCart({
    isAuth,
    isCartDataUpdated,
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
    wishListStatus,
    setWishListStatus,
    userId,
    setUser,
    profileData,
    setProfileData,
    isProfileChange,
    setIsProfileChange,

    // to update cartData instantly
    isCartDataUpdated,
    setIsCartDataUpdated,

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
